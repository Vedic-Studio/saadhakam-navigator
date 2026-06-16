/**
 * Daily vara email cron endpoint — builds the day's "Aaj ka Sadhaka" vara email
 * and sends it to every active Resend contact.
 *
 * GET /api/cron/daily-vara-email
 * Headers: Authorization: Bearer <CRON_SECRET>   (Vercel cron sends a GET)
 * Returns: { sent, failed } (or an error JSON)
 *
 * DORMANT BY DESIGN. There is NO `crons` entry in `vercel.json`, so this route
 * never auto-fires. To activate it later, set CRON_SECRET (and the Resend env)
 * and add a `crons` entry pointing at this path on the desired schedule. Until
 * then it only responds to a manually-issued authenticated request.
 *
 * Auth and the batched-send loop mirror `POST /api/newsletter/send`.
 */

import { NextResponse } from "next/server";
import { resend } from "@/lib/resend";
import { buildVaraEmail } from "@/lib/email/varaEmail";

export async function GET(request: Request) {
  try {
    // ── Auth gate ──────────────────────────────────────────────────────
    const secret = process.env.CRON_SECRET;
    if (!secret) {
      return NextResponse.json({ error: "CRON_SECRET not configured" }, { status: 500 });
    }

    const authHeader = request.headers.get("authorization");
    if (!authHeader || authHeader !== `Bearer ${secret}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!resend) {
      return NextResponse.json({ error: "RESEND_API_KEY not configured" }, { status: 500 });
    }

    const audienceId = process.env.RESEND_AUDIENCE_ID;
    if (!audienceId) {
      return NextResponse.json({ error: "RESEND_AUDIENCE_ID not configured" }, { status: 500 });
    }

    // ── Fetch subscribers ──────────────────────────────────────────────
    const { data: contactsData, error: contactsError } = await resend.contacts.list({
      audienceId,
    });

    if (contactsError) {
      console.error("[Daily Vara Cron] Failed to fetch contacts:", contactsError);
      return NextResponse.json({ error: "Failed to fetch subscriber list" }, { status: 500 });
    }

    const contacts = (contactsData?.data || []).filter((c) => !c.unsubscribed);

    if (contacts.length === 0) {
      return NextResponse.json({ sent: 0, failed: 0, message: "No active subscribers" });
    }

    // ── Build today's email ────────────────────────────────────────────
    const { subject, html } = buildVaraEmail(new Date());
    const fromEmail = process.env.VARA_FROM_EMAIL || "Sadhaka <newsletter@opensadhaka.com>";

    // ── Send to each subscriber (batched to respect rate limits) ────────
    let sent = 0;
    let failed = 0;

    const BATCH_SIZE = 10;
    for (let i = 0; i < contacts.length; i += BATCH_SIZE) {
      const batch = contacts.slice(i, i + BATCH_SIZE);
      const results = await Promise.allSettled(
        batch.map((contact) =>
          resend.emails.send({
            from: fromEmail,
            to: contact.email,
            subject,
            html,
            tags: [{ name: "source", value: "daily-vara" }],
          }),
        ),
      );

      for (const result of results) {
        if (result.status === "fulfilled" && !result.value.error) {
          sent++;
        } else {
          failed++;
          if (result.status === "rejected") {
            console.error("[Daily Vara Cron] Email failed:", result.reason);
          } else if (result.value.error) {
            console.error("[Daily Vara Cron] Email rejected:", result.value.error.message);
          }
        }
      }
    }

    console.log(`[Daily Vara Cron] Complete: ${sent} sent, ${failed} failed, ${contacts.length} total subscribers`);

    return NextResponse.json({ sent, failed, total: contacts.length, subject });
  } catch (error) {
    console.error("[Daily Vara Cron Error]:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
