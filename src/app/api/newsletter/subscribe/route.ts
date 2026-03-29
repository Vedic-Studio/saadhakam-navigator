import { NextResponse } from 'next/server';
import { resend } from '@/lib/resend';
import { buildWaitlistWelcomeEmail, WAITLIST_WELCOME_SUBJECT } from '@/lib/email/waitlistWelcomeEmail';

function isValidEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function splitName(name: string): { firstName: string; lastName: string } {
    const trimmed = (name || '').trim();
    if (!trimmed) return { firstName: '', lastName: '' };
    const spaceIdx = trimmed.indexOf(' ');
    if (spaceIdx === -1) return { firstName: trimmed, lastName: '' };
    return { firstName: trimmed.slice(0, spaceIdx), lastName: trimmed.slice(spaceIdx + 1).trim() };
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email, name, interest } = body;

        if (!email || typeof email !== "string" || !isValidEmail(email)) {
            return NextResponse.json({ error: 'A valid email is required' }, { status: 400 });
        }

        const { firstName, lastName } = splitName(name);

        if (interest) {
            console.log(`[Newsletter] Interest noted for ${email}: ${interest}`);
        }

        const audienceId = process.env.RESEND_AUDIENCE_ID;

        if (resend && audienceId) {
            try {
                await resend.contacts.create({
                    audienceId,
                    email,
                    unsubscribed: false,
                    firstName,
                    lastName,
                });
                console.log(`[Newsletter] Subscriber added: ${email}`);
            } catch (contactErr) {
                console.error('[Newsletter] Contact creation failed:', contactErr);
                // Resend returns error for duplicates - still treat as success for UX
            }
        } else {
            console.log(`[Newsletter] ${!resend ? 'RESEND_API_KEY' : 'RESEND_AUDIENCE_ID'} missing - logged subscription for ${email}`);
        }

        // Send welcome email
        if (resend) {
            try {
                const fromEmail = process.env.FAITH_FINDER_FROM_EMAIL || 'Sadhaka <guidance@register.opensadhaka.com>';
                const sendResult = await resend.emails.send({
                    from: fromEmail,
                    to: email,
                    replyTo: 'hello@opensadhaka.com',
                    subject: WAITLIST_WELCOME_SUBJECT,
                    html: buildWaitlistWelcomeEmail(firstName || 'there'),
                    tags: [{ name: 'source', value: 'waitlist' }],
                });
                if (sendResult.error) {
                    console.error('[Newsletter] Welcome email rejected:', sendResult.error.message);
                } else {
                    console.log(`[Newsletter] Welcome email sent to ${email} (id: ${sendResult.data?.id})`);
                }
            } catch (emailErr) {
                console.error('[Newsletter] Welcome email failed:', emailErr);
            }
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('[Newsletter Subscribe Error]:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
