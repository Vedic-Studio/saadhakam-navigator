# Faith Finder Reliability + Email Rollout Plan

## Goal
Ensure Faith Finder completes reliably after email submit, always lands users on results, and sends a transactional email when configured.

## Provider Decision
**Primary provider: Resend**

Why:
- already integrated in the Next.js app
- simple transactional API from route handlers
- faster production setup than raw SMTP/Nodemailer
- good deliverability tooling for a small team

## Integration Blueprint

### 1) Submission flow (server)
1. Validate payload (`email`, `result.primaryPath`)
2. Attempt durable save (`createFaithFinderSubmission`)
3. If save fails, generate signed stateless result id fallback
4. Send transactional email via Resend if `RESEND_API_KEY` exists
5. Return `{ success, id }` in all non-fatal cases so UI redirects to result page

### 2) Result retrieval (server)
- If id is stateless signed token, decode and return embedded result
- Else, resolve by persisted submission id

### 3) Frontend behavior
- Redirect to `/faith-finder/results/:id` on success response
- Show API message when submit fails (invalid email, bad payload, etc.)

## Required Environment Variables
- `RESEND_API_KEY`
- `FAITH_FINDER_FROM_EMAIL="Faith Finder <guidance@opensadhaka.com>"`
- `NEXT_PUBLIC_SITE_URL="https://opensadhaka.com"`
- `FAITH_FINDER_RESULT_TOKEN_SECRET` (strong random secret)

## Test Tasks

### Unit
- [ ] token create/parse success
- [ ] token tamper rejection
- [ ] non-token id rejection

### API integration
- [ ] valid payload returns success + id
- [ ] invalid email returns 400 + readable error
- [ ] invalid result path returns 400
- [ ] storage failure still returns success with stateless id
- [ ] result route can resolve stateless id

### E2E smoke (staging/prod)
- [ ] complete quiz → submit email → lands on result page
- [ ] receives transactional email with working result URL
- [ ] verify sender domain + SPF/DKIM alignment in Resend

## Reliability Level-Up Tasks

### P0
- [ ] replace filesystem JSON storage with Postgres/Supabase/Neon
- [ ] add server-side rate limiting for submit endpoint
- [ ] remove any remaining “PDF report” claims unless actually generated

### P1
- [ ] add Resend webhook endpoint (delivered, bounced, complained)
- [ ] persist email delivery status + provider message id
- [ ] add retry strategy for transient send failures

### P2
- [ ] move nurture sequence to queue/cron backed by DB jobs
- [ ] template versioning and A/B testing hooks

## Analytics Level-Up Tasks (GA4)
- [ ] `faith_finder_email_submit_attempt`
- [ ] `faith_finder_email_submit_success`
- [ ] `faith_finder_email_submit_failure`
- [ ] `faith_finder_email_delivered` (from webhook)
- [ ] `faith_finder_email_bounced` (from webhook)

## Rollout Checklist
- [ ] configure env vars in deployment target
- [ ] verify Resend domain (`opensadhaka.com`) and sender identity
- [ ] run smoke test with real inbox
- [ ] monitor errors and delivery rate for 48 hours
