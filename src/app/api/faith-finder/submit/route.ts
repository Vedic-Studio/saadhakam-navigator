import { NextResponse } from 'next/server';
import { createFaithFinderSubmission } from "@/lib/faithFinderStorage";
import { Resend } from 'resend';
import { pathMetadata } from '@/data/faithFinderQuiz';

const resend = new Resend(process.env.RESEND_API_KEY || 're_12345678');

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email, result } = body;

        if (!email) {
            return NextResponse.json({ error: 'Email is required' }, { status: 400 });
        }

        const validPaths = ['inquiry', 'devotion', 'ritual', 'discipline'];
        if (!result || !validPaths.includes(result.primaryPath)) {
            return NextResponse.json({ error: 'Invalid quiz result' }, { status: 400 });
        }

        const submission = await createFaithFinderSubmission({ email, result });

        console.log(`[Faith Finder] Lead Captured: ${email}`);
        console.log(`[Faith Finder] Result: ${result.primaryPath}`);
        console.log(`[Faith Finder] Submission ID: ${submission.id}`);

        if (process.env.RESEND_API_KEY) {
            try {
                const metadata = pathMetadata[result.primaryPath as keyof typeof pathMetadata];

                // Construct the absolute URL, assuming window origin or a base URL in env
                const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://www.sadhaka.com';
                const shareableUrl = `${baseUrl}/faith-finder/results/${submission.id}`;

                await resend.emails.send({
                    from: 'Sadhaka <hello@sadhaka.com>', // Update with a verified domain
                    to: email,
                    subject: `Your Faith Finder Results: ${metadata.name}`,
                    html: `
                        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
                            <h2>Your Spiritual Path is: ${metadata.name}</h2>
                            <p><strong>${metadata.archetype}</strong>: <em>"${metadata.slogan}"</em></p>
                            <p>${metadata.longDescription}</p>
                            <br/>
                            <a href="${shareableUrl}" style="display: inline-block; padding: 12px 24px; background: #ea580c; color: #fff; text-decoration: none; border-radius: 6px; font-weight: bold;">View Your Full Report</a>
                            <br/><br/>
                            <p>Warmly,<br/>The Sadhaka Team</p>
                        </div>
                    `
                });
                console.log(`[Faith Finder] Email sent successfully to ${email}`);
            } catch (emailErr) {
                console.error('[Faith Finder] Email delivery failed:', emailErr);
            }
        } else {
            console.log('[Faith Finder] RESEND_API_KEY missing - skipping email delivery.');
        }

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
