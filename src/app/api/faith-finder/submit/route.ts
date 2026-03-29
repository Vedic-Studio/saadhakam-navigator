import { NextResponse } from 'next/server';
import { createFaithFinderSubmission } from "@/lib/faithFinderStorage";
import { createStatelessFaithFinderResultId } from '@/lib/faithFinderResultToken';
import { resend } from '@/lib/resend';
import { buildEmail, getSubject, DRIP_SCHEDULE_DAYS } from '@/lib/email/faithFinderEmails';

function isValidEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email, result } = body;

        if (!email || typeof email !== "string" || !isValidEmail(email)) {
            return NextResponse.json({ error: 'A valid email is required' }, { status: 400 });
        }

        const validPaths = ['inquiry', 'devotion', 'ritual', 'discipline'];
        if (!result || !validPaths.includes(result.primaryPath)) {
            return NextResponse.json({ error: 'Invalid quiz result' }, { status: 400 });
        }

        let submissionId = "";
        let createdAt = new Date().toISOString();

        try {
            const submission = await createFaithFinderSubmission({ email, result });
            submissionId = submission.id;
            createdAt = submission.createdAt;
        } catch (storageErr) {
            console.error('[Faith Finder] Storage failed, using stateless result id fallback:', storageErr);
            submissionId = createStatelessFaithFinderResultId(result, createdAt);
        }

        console.log(`[Faith Finder] Lead Captured: ${email}`);
        console.log(`[Faith Finder] Result: ${result.primaryPath}`);
        console.log(`[Faith Finder] Submission ID: ${submissionId}`);

        let emailsSent = 0;
        let emailsFailed = 0;

        if (resend) {
            const fromEmail = process.env.FAITH_FINDER_FROM_EMAIL || 'Faith Finder <guidance@register.opensadhaka.com>';

            // Schedule all 6 drip emails
            for (let i = 0; i < DRIP_SCHEDULE_DAYS.length; i++) {
                try {
                    const html = buildEmail(i, result);
                    const subject = getSubject(i, result.primaryPath);
                    if (!html) continue;

                    const daysFromNow = DRIP_SCHEDULE_DAYS[i];
                    const sendOptions: Record<string, unknown> = {
                        from: fromEmail,
                        to: email,
                        subject,
                        html,
                        tags: [
                            { name: 'source', value: 'faith-finder' },
                            { name: 'sequence', value: `drip-${i}` },
                            { name: 'path', value: result.primaryPath },
                        ],
                    };

                    // Email 0 sends immediately; others are scheduled
                    if (daysFromNow > 0) {
                        const scheduledDate = new Date();
                        scheduledDate.setDate(scheduledDate.getDate() + daysFromNow);
                        // Set to 9am UTC for a reasonable delivery time
                        scheduledDate.setUTCHours(9, 0, 0, 0);
                        sendOptions.scheduled_at = scheduledDate.toISOString();
                    }

                    const sendResult = await resend.emails.send(sendOptions as Parameters<typeof resend.emails.send>[0]);
                    if (sendResult.error) {
                        emailsFailed++;
                        console.error(`[Faith Finder] Email ${i} rejected by Resend:`, sendResult.error.message);
                    } else {
                        emailsSent++;
                        console.log(`[Faith Finder] Email ${i} ${daysFromNow > 0 ? `scheduled for day ${daysFromNow}` : 'sent immediately'} to ${email} (id: ${sendResult.data?.id})`);
                    }
                } catch (emailErr) {
                    emailsFailed++;
                    console.error(`[Faith Finder] Email ${i} delivery/scheduling failed:`, emailErr);
                    // Continue sending remaining emails even if one fails
                }
            }

            // Add contact to Resend for newsletter pipeline
            const audienceId = process.env.RESEND_AUDIENCE_ID;
            if (audienceId) {
                try {
                    await resend.contacts.create({
                        audienceId,
                        email,
                        unsubscribed: false,
                        firstName: '',
                        lastName: '',
                    });
                    console.log(`[Faith Finder] Contact created in Resend: ${email}`);
                } catch (contactErr) {
                    // Non-fatal: contact creation failure shouldn't block the flow
                    console.error('[Faith Finder] Contact creation failed:', contactErr);
                }
            } else {
                console.log('[Faith Finder] RESEND_AUDIENCE_ID missing - skipping contact creation.');
            }
        } else {
            console.log('[Faith Finder] RESEND_API_KEY missing - skipping email delivery.');
        }

        return NextResponse.json({
            success: true,
            id: submissionId,
            emailsSent,
            emailsFailed,
            message: 'Email submitted successfully. Your full results are ready.'
        });
    } catch (error) {
        console.error('[Faith Finder Submit Error]:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
