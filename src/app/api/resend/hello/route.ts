import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST() {
    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
        return NextResponse.json(
            {
                error:
                    'Missing RESEND_API_KEY. Add it to your environment and replace `re_xxxxxxxxx` with your real API key.',
            },
            { status: 500 }
        );
    }

    const resend = new Resend(apiKey);

    try {
        const response = await resend.emails.send({
            from: process.env.FAITH_FINDER_FROM_EMAIL || 'onboarding@resend.dev',
            to: 'ankit.m303@gmail.com',
            subject: 'Hello World',
            html: '<p>Congrats on sending your <strong>first email</strong>!</p>',
        });

        if (response.error) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Resend send failed',
                    details: response.error.message,
                    resendError: response.error,
                },
                { status: 502 }
            );
        }

        return NextResponse.json({ success: true, data: response.data });
    } catch (error) {
        return NextResponse.json(
            {
                error: 'Resend send failed',
                details: error instanceof Error ? error.message : 'Unknown error',
            },
            { status: 500 }
        );
    }
}
