import { NextResponse } from 'next/server';
import { createFaithFinderSubmission } from "@/lib/faithFinderStorage";
import { Resend } from 'resend';
import { pathMetadata } from '@/data/faithFinderQuiz';
import { createStatelessFaithFinderResultId } from '@/lib/faithFinderResultToken';

const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

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
            // Durable storage may fail on serverless FS. Keep user flow alive with a signed, stateless result id.
            console.error('[Faith Finder] Storage failed, using stateless result id fallback:', storageErr);
            submissionId = createStatelessFaithFinderResultId(result, createdAt);
        }

        console.log(`[Faith Finder] Lead Captured: ${email}`);
        console.log(`[Faith Finder] Result: ${result.primaryPath}`);
        console.log(`[Faith Finder] Submission ID: ${submissionId}`);

        if (resend) {
            try {
                const metadata = pathMetadata[result.primaryPath as keyof typeof pathMetadata];

                const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_APP_URL || 'https://opensadhaka.com';
                const shareableUrl = `${baseUrl}/faith-finder/results/${submissionId}`;
                const fromEmail = process.env.FAITH_FINDER_FROM_EMAIL || 'Faith Finder <guidance@opensadhaka.com>';

                await resend.emails.send({
                    from: fromEmail,
                    to: email,
                    subject: `Your Faith Finder Results: ${metadata.name}`,
                    html: `
                        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
                            <h2>Your Spiritual Path is: ${metadata.name}</h2>
                            <p><strong>${metadata.archetype}</strong>: <em>"${metadata.slogan}"</em></p>
                            <p>${metadata.longDescription}</p>
                            <a href="${shareableUrl}" style="display: inline-block; padding: 12px 24px; background: #ea580c; color: #fff; text-decoration: none; border-radius: 6px; font-weight: bold;">View Your Full Results</a>
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
            id: submissionId,
            message: 'Email submitted successfully. Your full results are ready.'
        });
    } catch (error) {
        console.error('[Faith Finder Submit Error]:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
