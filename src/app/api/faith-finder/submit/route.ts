import { NextResponse } from 'next/server';
import { createFaithFinderSubmission } from "@/lib/faithFinderStorage";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email, result } = body;

        if (!email) {
            return NextResponse.json({ error: 'Email is required' }, { status: 400 });
        }

        const submission = await createFaithFinderSubmission({ email, result });

        // TODO: Integrate with your Email Service Provider (e.g., Resend, Mailchimp, Loops)
        // This is where you would trigger the "Dharmic Architect" 5-email nurture sequence.

        console.log(`[Faith Finder] Lead Captured: ${email}`);
        console.log(`[Faith Finder] Result: ${result?.primaryPath}`);
        console.log(`[Faith Finder] Submission ID: ${submission.id}`);

        // Simulate a slight delay for realism
        await new Promise(resolve => setTimeout(resolve, 400));

        return NextResponse.json({
            success: true,
            id: submission.id,
            message: 'Email submitted successfully. Your full report is ready.'
        });
    } catch (error) {
        console.error('[Faith Finder Submit Error]:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
