import { NextResponse } from 'next/server';
import { resend } from '@/lib/resend';

function isValidEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email } = body;

        if (!email || typeof email !== "string" || !isValidEmail(email)) {
            return NextResponse.json({ error: 'A valid email is required' }, { status: 400 });
        }

        if (resend) {
            try {
                await resend.contacts.create({
                    email,
                    unsubscribed: false,
                    // @ts-expect-error - Resend SDK types may not include all properties
                    properties: {
                        source: 'newsletter',
                        subscribedAt: new Date().toISOString(),
                    },
                });
                console.log(`[Newsletter] Subscriber added: ${email}`);
            } catch (contactErr) {
                console.error('[Newsletter] Contact creation failed:', contactErr);
                // Resend returns error for duplicates - still treat as success for UX
            }
        } else {
            console.log(`[Newsletter] RESEND_API_KEY missing - logged subscription for ${email}`);
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('[Newsletter Subscribe Error]:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
