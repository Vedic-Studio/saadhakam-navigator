import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email, result } = body;

        if (!email) {
            return NextResponse.json({ error: 'Email is required' }, { status: 400 });
        }

        // TODO: Integrate with your Email Service Provider (e.g., Resend, Mailchimp, Loops)
        // This is where you would trigger the "Dharmic Architect" 5-email nurture sequence

        console.log(`[Faith Finder] Lead Captured: ${email}`);
        console.log(`[Faith Finder] Result: ${result.primaryPath}`);

        // Simulate a slight delay for realism
        await new Promise(resolve => setTimeout(resolve, 800));

        return NextResponse.json({
            success: true,
            message: 'Email submitted successfully. The Dharmic Architect sequence started.'
        });
    } catch (error) {
        console.error('[Faith Finder Submit Error]:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
