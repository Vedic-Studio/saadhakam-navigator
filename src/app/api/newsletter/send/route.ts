/**
 * Newsletter send endpoint — fetches subscribers from Resend audience
 * and sends the newsletter individually to each contact.
 *
 * POST /api/newsletter/send
 * Headers: Authorization: Bearer <NEWSLETTER_API_SECRET>
 * Body: { title, subtitle, author, date, readTime, body, footnotes?, webUrl? }
 */

import { NextResponse } from 'next/server';
import { resend } from '@/lib/resend';
import { buildNewsletterEmail, buildNewsletterSubject } from '@/lib/email/newsletterEmail';
import type { NewsletterContent } from '@/lib/email/newsletterEmail';

export async function POST(request: Request) {
  try {
    // ── Auth gate ──────────────────────────────────────────────────────
    const secret = process.env.NEWSLETTER_API_SECRET;
    if (!secret) {
      return NextResponse.json({ error: 'NEWSLETTER_API_SECRET not configured' }, { status: 500 });
    }

    const authHeader = request.headers.get('authorization');
    if (!authHeader || authHeader !== `Bearer ${secret}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // ── Validate body ──────────────────────────────────────────────────
    const body = await request.json();
    const { title, subtitle, author, date, readTime, body: essayBody, footnotes, webUrl } = body;

    if (!title || !subtitle || !author || !date || !readTime || !essayBody) {
      return NextResponse.json(
        { error: 'Missing required fields: title, subtitle, author, date, readTime, body' },
        { status: 400 }
      );
    }

    if (!resend) {
      return NextResponse.json({ error: 'RESEND_API_KEY not configured' }, { status: 500 });
    }

    const audienceId = process.env.RESEND_AUDIENCE_ID;
    if (!audienceId) {
      return NextResponse.json({ error: 'RESEND_AUDIENCE_ID not configured' }, { status: 500 });
    }

    // ── Fetch subscribers ──────────────────────────────────────────────
    const { data: contactsData, error: contactsError } = await resend.contacts.list({
      audienceId,
    });

    if (contactsError) {
      console.error('[Newsletter Send] Failed to fetch contacts:', contactsError);
      return NextResponse.json({ error: 'Failed to fetch subscriber list' }, { status: 500 });
    }

    const contacts = (contactsData?.data || []).filter((c) => !c.unsubscribed);

    if (contacts.length === 0) {
      return NextResponse.json({ success: true, sent: 0, failed: 0, message: 'No active subscribers' });
    }

    // ── Build email ────────────────────────────────────────────────────
    const content: NewsletterContent = {
      title,
      subtitle,
      author,
      date,
      readTime,
      body: essayBody,
      footnotes,
      webUrl,
    };

    const html = buildNewsletterEmail(content);
    const subject = buildNewsletterSubject(title);
    const fromEmail = process.env.NEWSLETTER_FROM_EMAIL || 'Sadhaka <newsletter@opensadhaka.com>';

    // ── Send to each subscriber ────────────────────────────────────────
    let sent = 0;
    let failed = 0;

    // Send in batches of 10 to respect rate limits
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
            tags: [
              { name: 'source', value: 'newsletter' },
              { name: 'edition', value: title.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 50) },
            ],
          })
        )
      );

      for (const result of results) {
        if (result.status === 'fulfilled' && !result.value.error) {
          sent++;
        } else {
          failed++;
          if (result.status === 'rejected') {
            console.error('[Newsletter Send] Email failed:', result.reason);
          } else if (result.value.error) {
            console.error('[Newsletter Send] Email rejected:', result.value.error.message);
          }
        }
      }
    }

    console.log(`[Newsletter Send] Complete: ${sent} sent, ${failed} failed, ${contacts.length} total subscribers`);

    return NextResponse.json({
      success: true,
      sent,
      failed,
      total: contacts.length,
      subject,
    });
  } catch (error) {
    console.error('[Newsletter Send Error]:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
