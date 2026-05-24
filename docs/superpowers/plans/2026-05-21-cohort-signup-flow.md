# AI Summer Camp Cohort Signup Flow — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Wire `/ai-summer-camp` to a real signup flow: one CTA that swaps between a Stripe Payment Link (when seats remain) and a waitlist email-capture overlay (when full). Cohort signups (paid and waitlist) record rows in the existing Apps Script sheet pipeline. Confirmation emails — "You're in" and "You're on the waitlist" — are sent via Resend using branded React Email templates. Also: remove the stale `REGISTRATION_OPENS_AT` countdown gate that's now in the past.

**Architecture:** Vercel edge function checks Stripe for paid seat count and tells the page which CTA state to render (cached 60s, fail-open). Stripe Payment Link enforces the 15-seat cap. Stripe webhook posts a sheet row to the existing Google Apps Script and sends the "You're in" email via Resend. Waitlist overlay POSTs to a new `/api/waitlist-signup` endpoint that does the same dual-write (sheet via Apps Script + email via Resend).

**Tech Stack:** Astro 5 + React 18, Vercel serverless functions (existing `api/chat.js` pattern), Stripe SDK v18, Resend SDK + React Email components, Google Apps Script (existing sheet pipeline — emails for cohort sources are now Resend's job, not Apps Script's).

**Spec:** `docs/superpowers/specs/2026-05-21-cohort-signup-flow-design.md` (rev 2026-05-24, Resend amendment)

**Approved email designs:** `mockups/email-cohort-paid.html`, `mockups/email-cohort-waitlist.html` — source-of-truth visual/copy.

**Verification strategy:** No unit tests. Verification is (a) curl-based smoke checks of each API endpoint as we build it, and (b) full local e2e via Stripe CLI + Stripe test-mode + real Resend sends to your own email (covered in Task 15). This matches the codebase convention (no test framework present).

---

## File map

**New (server-side):**
- `api/cohort-status.js` — Vercel edge function. GET → `{ status, remaining }`. Cached 60s.
- `api/stripe-webhook.js` — Vercel node function. POST webhook receiver. Verifies signature, writes sheet row via Apps Script, sends paid email via Resend.
- `api/waitlist-signup.js` — Vercel node function. POST receiver for the waitlist overlay. Writes sheet row via Apps Script, sends waitlist email via Resend.

**New (config / source of truth):**
- `src/data/cohort.ts` — capacity, Stripe Payment Link URL, product ID, dates, dismiss key.
- `.env.example` — documents required environment variables.

**New (email templates):**
- `src/emails/CohortPaidEmail.jsx` — React Email component for "You're in." Rendered to HTML at send time.
- `src/emails/CohortWaitlistEmail.jsx` — React Email component for "You're on the waitlist."

**New (frontend):**
- `src/components/cohort/CohortWaitlistOverlay.jsx` — email + name capture, POSTs to `/api/waitlist-signup`.
- `src/components/cohort/CohortCTA.jsx` — dual-state CTA.
- `src/pages/ai-summer-camp/welcome.astro` — static "You're in" landing page.

**Modified:**
- `src/pages/AISummerCampPage.jsx` — replace inline CTAs with `<CohortCTA />`, remove `REGISTRATION_URL` constant + TODO + stale `REGISTRATION_OPENS_AT` countdown gate + `useCountdown` helper.
- `package.json` — add `stripe`, `resend`, `@react-email/components`.
- `docs/email-workflow.md` — document new sources (`cohort_paid`, `cohort_waitlist`) and the Resend-based email pipeline.

**Out of repo (manual configuration):**
- Stripe dashboard — create product, Payment Link, configure webhook endpoint. (Verified 2026-05-24: no existing cohort product, link, or webhook.)
- Google Apps Script — add `cohort_paid` and `cohort_waitlist` branches that **only write rows** (no email send for these sources) + idempotency check.
- Vercel environment variables — `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `COHORT_01_PRODUCT_ID`, `APPS_SCRIPT_URL`, `RESEND_API_KEY` (the last already in place as of 2026-05-24).

---

## Prerequisites

Before starting, the engineer needs:
- Node 18+ (Vercel functions require it).
- Vercel CLI installed globally: `npm install -g vercel` (used for local dev).
- Stripe CLI installed: `scoop install stripe` (Windows) or equivalent. Used for webhook forwarding in local e2e.
- Access to Matt's Stripe dashboard (Matt will provide credentials/SSO when needed in Tasks 12 and 15).
- Access to the Google Apps Script that owns the existing email pipeline (described in `docs/email-workflow.md`).
- Resend access — already set up. Domain `mvpclub.ai` verified. API key "MVP Club Site - Cohort Signup" (sending access) is already in Vercel env vars as `RESEND_API_KEY` and in local `.env`.

---

## Task 1: Install Stripe SDK, Resend SDK, and React Email

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json` (auto-updated)

- [ ] **Step 1: Install dependencies**

Run:
```bash
npm install stripe@^18.0.0 resend@^4.0.0 @react-email/components@^1.0.12
```

Expected: adds three new entries to `package.json` dependencies and updates `package-lock.json`. No errors.

- [ ] **Step 2: Verify the installs**

Run:
```bash
node -e "console.log(typeof require('stripe'), typeof require('resend').Resend, typeof require('@react-email/components').render)"
```

Expected: prints `function function function` — confirms all three packages loaded.

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "deps: add stripe, resend, react-email for cohort signup flow"
```

---

## Task 2: Create the cohort config source of truth

**Files:**
- Create: `src/data/cohort.ts`

- [ ] **Step 1: Create the config file**

```ts
// src/data/cohort.ts
//
// Single source of truth for the active cohort. Edit this file to roll over
// to the next cohort. Imported by:
//   - src/pages/AISummerCampPage.jsx
//   - src/components/cohort/CohortCTA.jsx
//   - src/components/cohort/CohortWaitlistOverlay.jsx
//   - src/pages/ai-summer-camp/welcome.astro
//   - src/components/homepage/CohortCallout.jsx
//   - src/components/layout/CohortAnnouncementBar.astro
//   - src/emails/CohortPaidEmail.jsx
//   - src/emails/CohortWaitlistEmail.jsx
//   - api/cohort-status.js
//   - api/stripe-webhook.js
//   - api/waitlist-signup.js
//
// ROLLOVER CHECKLIST (when launching the next cohort):
//   1. Bump COHORT_ID and COHORT_LABEL
//   2. Update DATES (startISO, endISO, fridays array, officeHoursWeekday)
//   3. Create a NEW Stripe product + Payment Link, update STRIPE_PRODUCT_ID
//      and STRIPE_PAYMENT_LINK_URL
//   4. Bump CALLOUT_DISMISS_KEY so previously-dismissed users see the bar again
//   5. Verify Stripe webhook still subscribes to the new product's
//      checkout.session.completed (if it filters by product)

export const COHORT = {
  // Identity
  id: 'cohort_01',
  label: 'Cohort 01',
  shortLabel: 'AI Summer Camp · Cohort 01',

  // Capacity
  capacity: 15,

  // Stripe
  stripeProductId: 'prod_REPLACE_ME_AFTER_CREATING_IN_STRIPE',
  stripePaymentLinkUrl: 'https://buy.stripe.com/REPLACE_ME_AFTER_CREATING_LINK',
  priceUSD: 99,

  // Schedule
  startISO: '2026-06-05',
  endISO: '2026-06-26',
  fridaysFormatted: 'Fri Jun 5, 12, 19, 26',
  timeET: '2–3 PM ET',
  officeHoursET: 'Tue 1–2 PM ET',
} as const;

export type CohortStatus = 'open' | 'full';
```

- [ ] **Step 2: Verify the TypeScript compiles**

```bash
npx astro check
```

Expected: no new errors related to `src/data/cohort.ts`.

- [ ] **Step 3: Commit**

```bash
git add src/data/cohort.ts
git commit -m "feat: add src/data/cohort.ts as cohort config source of truth"
```

---

## Task 3: Build the cohort-status API endpoint

**Files:**
- Create: `api/cohort-status.js`

- [ ] **Step 1: Create the edge function**

```js
// api/cohort-status.js
//
// Vercel edge function. Returns the live capacity status of the active cohort.
//
//   GET /api/cohort-status
//   200 OK
//   Cache-Control: public, s-maxage=60, stale-while-revalidate=300
//   { "status": "open" | "full", "remaining": number | null, "fallback"?: true }
//
// FAILURE MODE: any error (missing env, Stripe timeout, malformed response)
// returns { status: 'open', remaining: null, fallback: true }.

import Stripe from 'stripe';

export const config = { runtime: 'edge' };

const CAPACITY = 15;

export default async function handler(req) {
  const headers = {
    'Content-Type': 'application/json',
    'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
  };

  try {
    const secretKey = process.env.STRIPE_SECRET_KEY;
    const productId = process.env.COHORT_01_PRODUCT_ID;

    if (!secretKey || !productId) {
      return new Response(
        JSON.stringify({ status: 'open', remaining: null, fallback: true }),
        { status: 200, headers }
      );
    }

    const stripe = new Stripe(secretKey, { apiVersion: '2024-06-20' });

    const sessions = await stripe.checkout.sessions.list({
      limit: 100,
      expand: ['data.line_items'],
    });

    const paidCount = sessions.data.filter((session) => {
      if (session.payment_status !== 'paid') return false;
      const items = session.line_items?.data ?? [];
      return items.some((item) => item.price?.product === productId);
    }).length;

    const remaining = Math.max(0, CAPACITY - paidCount);
    const status = remaining > 0 ? 'open' : 'full';

    return new Response(JSON.stringify({ status, remaining }), {
      status: 200,
      headers,
    });
  } catch (err) {
    console.error('[cohort-status] error:', err?.message ?? err);
    return new Response(
      JSON.stringify({ status: 'open', remaining: null, fallback: true }),
      { status: 200, headers }
    );
  }
}
```

- [ ] **Step 2: Smoke-check locally**

```bash
vercel dev --listen 3000
```

In another terminal:
```bash
curl -i http://localhost:3000/api/cohort-status
```

Expected: HTTP 200 with body `{"status":"open","remaining":null,"fallback":true}` (env vars not yet set).

- [ ] **Step 3: Commit**

```bash
git add api/cohort-status.js
git commit -m "feat: add /api/cohort-status edge function"
```

---

## Task 4: Build the React Email templates

**Files:**
- Create: `src/emails/CohortPaidEmail.jsx`
- Create: `src/emails/CohortWaitlistEmail.jsx`

The mockups in `mockups/email-cohort-paid.html` and `mockups/email-cohort-waitlist.html` are the approved visual/copy source. Port them into React Email components that produce email-safe HTML at render time. Both Vercel endpoints (Task 5 and Task 6) import these.

- [ ] **Step 1: Open the mockup files for reference**

Open both `mockups/email-cohort-paid.html` and `mockups/email-cohort-waitlist.html` in your editor. The mockups use modern CSS for browser preview; the React Email components below use the equivalent email-safe primitives (tables, inline styles, web-safe fallbacks).

- [ ] **Step 2: Create `src/emails/CohortPaidEmail.jsx`**

```jsx
// src/emails/CohortPaidEmail.jsx
//
// React Email template for the "You're in" cohort confirmation email.
// Rendered by api/stripe-webhook.js after a successful Stripe Checkout.
// Visual source-of-truth: mockups/email-cohort-paid.html

import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import { COHORT } from '../data/cohort.ts';

const colors = {
  navy: '#1a365d',
  teal: '#115e59',
  gold: '#d97706',
  bg: '#c9dce6',
  surface: '#ffffff',
  bodyText: '#475569',
  muted: '#64748b',
  divider: '#f1f5f9',
  footerBg: '#fafafa',
  footerBorder: '#e2e8f0',
  footerText: '#94a3b8',
  detailsBg: '#fefcf8',
};

export default function CohortPaidEmail({ firstName = 'there' }) {
  return (
    <Html>
      <Head />
      <Preview>You're in. Welcome to AI Summer Camp Cohort 01.</Preview>
      <Body style={{ margin: 0, padding: '40px 16px 80px', background: colors.bg, fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif", color: colors.navy }}>
        <Container style={{ maxWidth: 600, margin: '0 auto', background: colors.surface, borderRadius: 10, overflow: 'hidden', boxShadow: '0 20px 50px rgba(26,54,93,0.15)' }}>
          <Section style={{ padding: '48px 44px 40px' }}>
            <Text style={{ margin: '0 0 36px 0', fontFamily: "'Zilla Slab', Georgia, serif", fontWeight: 500, fontSize: 13, letterSpacing: '0.18em', textTransform: 'uppercase', color: colors.navy }}>
              <span style={{ color: colors.gold, marginRight: 8 }}>&#9733;</span> MVP Club
            </Text>

            <Text style={{ margin: '0 0 14px 0', fontSize: 11, fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: colors.gold }}>
              You're in
            </Text>
            <Text style={{ margin: '0 0 14px 0', fontFamily: "'Zilla Slab', Georgia, serif", fontWeight: 400, fontSize: 36, lineHeight: 1.08, color: colors.navy, letterSpacing: '-0.015em' }}>
              Welcome to <em style={{ fontStyle: 'italic', color: colors.teal }}>{COHORT.label}.</em>
            </Text>
            <Text style={{ margin: '0 0 32px 0', fontFamily: "'Zilla Slab', Georgia, serif", fontStyle: 'italic', fontSize: 18, color: colors.teal, lineHeight: 1.4 }}>
              Four Fridays in June. You, Claude, and a handful of other working professionals.
            </Text>

            <Section style={{ background: colors.detailsBg, borderLeft: `4px solid ${colors.gold}`, borderRadius: 4, padding: '8px 24px', marginBottom: 32 }}>
              {[
                ['Dates', COHORT.fridaysFormatted],
                ['Time', COHORT.timeET],
                ['Office Hrs', `${COHORT.officeHoursET}  (optional)`],
                ['Format', 'Live on Google Meet'],
              ].map(([label, value], i, arr) => (
                <Section key={label} style={{ padding: '12px 0', borderBottom: i === arr.length - 1 ? 'none' : `1px solid ${colors.divider}` }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <tr>
                      <td style={{ width: 100, fontSize: 10, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: colors.teal, verticalAlign: 'middle' }}>{label}</td>
                      <td style={{ fontSize: 15, color: colors.navy, lineHeight: 1.4 }}>{value}</td>
                    </tr>
                  </table>
                </Section>
              ))}
            </Section>

            <Text style={{ fontSize: 15, color: colors.bodyText, lineHeight: 1.65, margin: '0 0 18px 0' }}>Hi {firstName},</Text>
            <Text style={{ fontSize: 15, color: colors.bodyText, lineHeight: 1.65, margin: '0 0 18px 0' }}>
              You did it. Your seat in {COHORT.label} is locked in.
            </Text>
            <Text style={{ fontSize: 15, color: colors.bodyText, lineHeight: 1.65, margin: '0 0 18px 0' }}>
              What happens next: about a week before <strong style={{ color: colors.navy }}>Friday, June 5</strong>, we'll send you a Google Meet link and a calendar invite. Until then, there's nothing you need to do.
            </Text>
            <Text style={{ fontSize: 15, color: colors.bodyText, lineHeight: 1.65, margin: '0 0 18px 0' }}>
              One thing worth doing in the meantime: notice a real problem from your actual work. Something you do every week that takes too long, or that you've never quite figured out how to delegate. Week 1 is about getting Claude into that problem with you.
            </Text>
            <Text style={{ fontSize: 15, color: colors.bodyText, lineHeight: 1.65, margin: '0 0 18px 0' }}>
              Questions? Just reply to this email. Matt, Jill, and Ryan all see it.
            </Text>
            <Text style={{ fontSize: 15, color: colors.bodyText, lineHeight: 1.65, margin: '0 0 18px 0' }}>
              See you June 5.
            </Text>

            <Text style={{ fontFamily: "'Zilla Slab', Georgia, serif", fontSize: 17, color: colors.navy, marginTop: 36, marginBottom: 4, lineHeight: 1.3 }}>
              Matt, Jill, and Ryan
            </Text>
            <Text style={{ fontSize: 12, color: colors.muted, letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 600, margin: 0 }}>
              MVP Club
            </Text>
          </Section>
          <Section style={{ borderTop: `1px solid ${colors.footerBorder}`, padding: '22px 44px', background: colors.footerBg, textAlign: 'center' }}>
            <Text style={{ fontSize: 12, color: colors.footerText, margin: 0 }}>
              <Link href="https://mvpclub.ai" style={{ color: colors.footerText, textDecoration: 'none' }}>mvpclub.ai</Link>
              &nbsp;&nbsp;&middot;&nbsp;&nbsp;
              <Link href="mailto:info@mvpclub.ai" style={{ color: colors.footerText, textDecoration: 'none' }}>info@mvpclub.ai</Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
```

- [ ] **Step 3: Create `src/emails/CohortWaitlistEmail.jsx`**

```jsx
// src/emails/CohortWaitlistEmail.jsx
//
// React Email template for the "You're on the waitlist" email.
// Rendered by api/waitlist-signup.js when the overlay form is submitted.
// Visual source-of-truth: mockups/email-cohort-waitlist.html

import {
  Body,
  Container,
  Head,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import { COHORT } from '../data/cohort.ts';

const colors = {
  navy: '#1a365d',
  teal: '#115e59',
  gold: '#d97706',
  bg: '#c9dce6',
  surface: '#ffffff',
  bodyText: '#475569',
  muted: '#64748b',
  footerBg: '#fafafa',
  footerBorder: '#e2e8f0',
  footerText: '#94a3b8',
  ctaSub: '#94a3b8',
};

export default function CohortWaitlistEmail({ firstName = 'there' }) {
  return (
    <Html>
      <Head />
      <Preview>You're on the AI Summer Camp Cohort 01 waitlist.</Preview>
      <Body style={{ margin: 0, padding: '40px 16px 80px', background: colors.bg, fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif", color: colors.navy }}>
        <Container style={{ maxWidth: 600, margin: '0 auto', background: colors.surface, borderRadius: 10, overflow: 'hidden', boxShadow: '0 20px 50px rgba(26,54,93,0.15)' }}>
          <Section style={{ padding: '48px 44px 40px' }}>
            <Text style={{ margin: '0 0 36px 0', fontFamily: "'Zilla Slab', Georgia, serif", fontWeight: 500, fontSize: 13, letterSpacing: '0.18em', textTransform: 'uppercase', color: colors.navy }}>
              <span style={{ color: colors.gold, marginRight: 8 }}>&#9733;</span> MVP Club
            </Text>

            <Text style={{ margin: '0 0 14px 0', fontSize: 11, fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: colors.teal }}>
              You're on the list
            </Text>
            <Text style={{ margin: '0 0 14px 0', fontFamily: "'Zilla Slab', Georgia, serif", fontWeight: 400, fontSize: 36, lineHeight: 1.08, color: colors.navy, letterSpacing: '-0.015em' }}>
              {COHORT.label} is full.
            </Text>
            <Text style={{ margin: '0 0 32px 0', fontFamily: "'Zilla Slab', Georgia, serif", fontStyle: 'italic', fontSize: 18, color: colors.teal, lineHeight: 1.4 }}>
              Fifteen seats, and they found their people faster than we expected.
            </Text>

            <Text style={{ fontSize: 15, color: colors.bodyText, lineHeight: 1.65, margin: '0 0 18px 0' }}>Hi {firstName},</Text>
            <Text style={{ fontSize: 15, color: colors.bodyText, lineHeight: 1.65, margin: '0 0 18px 0' }}>
              You're on the waitlist for AI Summer Camp {COHORT.label}. If a seat opens before <strong style={{ color: colors.navy }}>Friday, June 5</strong> (someone refunds, life happens), we'll email you immediately so you can grab it.
            </Text>
            <Text style={{ fontSize: 15, color: colors.bodyText, lineHeight: 1.65, margin: '0 0 18px 0' }}>
              Either way, you're first in line for Cohort 02 later this summer. We'll send the registration link to your inbox before it goes anywhere else.
            </Text>
            <Text style={{ fontSize: 15, color: colors.bodyText, lineHeight: 1.65, margin: '0 0 18px 0' }}>
              In the meantime: come hang out in the MVP Club community while you wait. We run weekly live sessions there with the same coaches you'd meet in the cohort.
            </Text>

            <Section style={{ margin: '28px 0 20px', textAlign: 'center' }}>
              <Link href="https://mvp-club.mn.co/" style={{ display: 'inline-block', padding: '13px 26px', border: `1.5px solid ${colors.navy}`, borderRadius: 6, background: colors.surface, color: colors.navy, fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 600, textDecoration: 'none', letterSpacing: '0.01em' }}>
                Try the community <span style={{ marginLeft: 6, color: colors.gold }}>&rarr;</span>
              </Link>
              <Text style={{ marginTop: 10, fontSize: 12.5, color: colors.ctaSub, fontStyle: 'italic' }}>
                Two-week free trial
              </Text>
            </Section>

            <Text style={{ fontSize: 15, color: colors.bodyText, lineHeight: 1.65, margin: '0 0 18px 0' }}>
              Questions? Just reply. We read everything.
            </Text>

            <Text style={{ fontFamily: "'Zilla Slab', Georgia, serif", fontSize: 17, color: colors.navy, marginTop: 36, marginBottom: 4, lineHeight: 1.3 }}>
              Matt, Jill, and Ryan
            </Text>
            <Text style={{ fontSize: 12, color: colors.muted, letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 600, margin: 0 }}>
              MVP Club
            </Text>
          </Section>
          <Section style={{ borderTop: `1px solid ${colors.footerBorder}`, padding: '22px 44px', background: colors.footerBg, textAlign: 'center' }}>
            <Text style={{ fontSize: 12, color: colors.footerText, margin: 0 }}>
              <Link href="https://mvpclub.ai" style={{ color: colors.footerText, textDecoration: 'none' }}>mvpclub.ai</Link>
              &nbsp;&nbsp;&middot;&nbsp;&nbsp;
              <Link href="mailto:info@mvpclub.ai" style={{ color: colors.footerText, textDecoration: 'none' }}>info@mvpclub.ai</Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
```

- [ ] **Step 4: Verify components render without errors**

The simplest verification is to import them — they'll throw at render time if there's a syntax error. Save a quick test script as `scripts/preview-emails.js`:

```js
import { render } from '@react-email/components';
import CohortPaidEmail from '../src/emails/CohortPaidEmail.jsx';
import CohortWaitlistEmail from '../src/emails/CohortWaitlistEmail.jsx';

const paid = await render(<CohortPaidEmail firstName="Sarah" />);
const waitlist = await render(<CohortWaitlistEmail firstName="Sarah" />);
console.log('paid length:', paid.length, 'waitlist length:', waitlist.length);
```

(You may need a `.mjs` extension and to add a node loader for JSX; alternatively just trust the syntax and let the e2e test in Task 15 catch issues.)

- [ ] **Step 5: Commit**

```bash
git add src/emails/CohortPaidEmail.jsx src/emails/CohortWaitlistEmail.jsx
git commit -m "feat: add React Email templates for cohort paid + waitlist"
```

---

## Task 5: Build the Stripe webhook receiver (with Resend send)

**Files:**
- Create: `api/stripe-webhook.js`

Receives `checkout.session.completed` events from Stripe. Verifies the signature, writes a sheet row via Apps Script, then sends the "You're in" email via Resend. **Node runtime (not edge)** — signature verification needs the raw request body.

- [ ] **Step 1: Create the webhook handler**

```js
// api/stripe-webhook.js
//
// Stripe webhook receiver. Subscribes to checkout.session.completed.
// Verifies the Stripe signature, then:
//   1. POSTs to Google Apps Script (source='cohort_paid') to record sheet row
//   2. Sends "You're in" email via Resend using CohortPaidEmail template
//
// Node runtime (not edge) is required because signature verification needs
// the raw request body. Vercel's default node functions give us the raw body
// via the `req` stream (when bodyParser is disabled).

import Stripe from 'stripe';
import { Resend } from 'resend';
import { render } from '@react-email/components';
import CohortPaidEmail from '../src/emails/CohortPaidEmail.jsx';

export const config = {
  api: {
    bodyParser: false,
  },
};

async function readRawBody(req) {
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'method not allowed' });
    return;
  }

  const secretKey = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const appsScriptUrl = process.env.APPS_SCRIPT_URL;
  const resendApiKey = process.env.RESEND_API_KEY;

  if (!secretKey || !webhookSecret || !appsScriptUrl || !resendApiKey) {
    console.error('[stripe-webhook] missing env vars');
    res.status(500).json({ error: 'misconfigured' });
    return;
  }

  const stripe = new Stripe(secretKey, { apiVersion: '2024-06-20' });
  const resend = new Resend(resendApiKey);

  let event;
  try {
    const rawBody = await readRawBody(req);
    const signature = req.headers['stripe-signature'];
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (err) {
    console.error('[stripe-webhook] signature verification failed:', err?.message ?? err);
    res.status(400).json({ error: 'invalid signature' });
    return;
  }

  if (event.type !== 'checkout.session.completed') {
    res.status(200).json({ received: true, ignored: event.type });
    return;
  }

  const session = event.data.object;

  if (session.payment_status !== 'paid') {
    res.status(200).json({ received: true, status: session.payment_status });
    return;
  }

  const email = session.customer_details?.email || session.customer_email;
  const fullName = session.customer_details?.name || '';
  const firstName = fullName.trim().split(/\s+/)[0] || '';

  if (!email) {
    console.error('[stripe-webhook] session has no email:', session.id);
    res.status(200).json({ received: true, error: 'no email' });
    return;
  }

  // 1. Record sheet row via Apps Script (best-effort, log on failure).
  try {
    const appsRes = await fetch(appsScriptUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName,
        email,
        timestamp: new Date().toISOString(),
        source: 'cohort_paid',
      }),
    });
    if (!appsRes.ok) {
      console.error('[stripe-webhook] apps script returned', appsRes.status);
    }
  } catch (err) {
    console.error('[stripe-webhook] apps script forward failed:', err?.message ?? err);
  }

  // 2. Send "You're in" email via Resend with idempotency key = Stripe event ID.
  try {
    const html = await render(CohortPaidEmail({ firstName: firstName || 'there' }));
    const sendRes = await resend.emails.send(
      {
        from: 'MVP Club <info@mvpclub.ai>',
        to: email,
        subject: "You're in. Welcome to AI Summer Camp Cohort 01.",
        html,
        reply_to: 'info@mvpclub.ai',
      },
      {
        idempotencyKey: event.id,
      }
    );
    if (sendRes.error) {
      console.error('[stripe-webhook] resend error:', sendRes.error);
    }
  } catch (err) {
    console.error('[stripe-webhook] resend send failed:', err?.message ?? err);
  }

  // Always 200 to Stripe — we don't want endless retries on a transient hiccup.
  // Failures are logged for manual investigation.
  res.status(200).json({ received: true });
}
```

- [ ] **Step 2: Smoke-check the endpoint exists**

With `vercel dev` running:
```bash
curl -i -X GET http://localhost:3000/api/stripe-webhook
```

Expected: HTTP 405 with body `{"error":"method not allowed"}`.

- [ ] **Step 3: Commit**

```bash
git add api/stripe-webhook.js
git commit -m "feat: add /api/stripe-webhook with Apps Script + Resend"
```

---

## Task 6: Build the waitlist-signup API endpoint

**Files:**
- Create: `api/waitlist-signup.js`

Server endpoint for the `CohortWaitlistOverlay` form. Receives `{firstName, email}` from the browser, writes a sheet row via Apps Script, sends the waitlist email via Resend.

- [ ] **Step 1: Create the endpoint**

```js
// api/waitlist-signup.js
//
// Vercel node function. Receives waitlist form submissions from the
// CohortWaitlistOverlay component. Writes a sheet row via Apps Script
// (source='cohort_waitlist') and sends the "You're on the waitlist" email
// via Resend using CohortWaitlistEmail template.
//
// This endpoint exists (vs. POST-from-browser-direct-to-Apps-Script) because
// the Resend API key must stay server-side.

import { Resend } from 'resend';
import { render } from '@react-email/components';
import CohortWaitlistEmail from '../src/emails/CohortWaitlistEmail.jsx';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'method not allowed' });
    return;
  }

  const appsScriptUrl = process.env.APPS_SCRIPT_URL;
  const resendApiKey = process.env.RESEND_API_KEY;

  if (!appsScriptUrl || !resendApiKey) {
    console.error('[waitlist-signup] missing env vars');
    res.status(500).json({ error: 'misconfigured' });
    return;
  }

  let body;
  try {
    body = req.body && typeof req.body === 'object' ? req.body : JSON.parse(req.body || '{}');
  } catch (_) {
    res.status(400).json({ error: 'invalid json' });
    return;
  }

  const firstName = (body.firstName || '').toString().trim();
  const email = (body.email || '').toString().trim().toLowerCase();

  if (!email || !email.includes('@')) {
    res.status(400).json({ error: 'invalid email' });
    return;
  }

  const resend = new Resend(resendApiKey);

  // 1. Record sheet row via Apps Script (best-effort).
  try {
    const appsRes = await fetch(appsScriptUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName,
        email,
        timestamp: new Date().toISOString(),
        source: 'cohort_waitlist',
      }),
    });
    if (!appsRes.ok) {
      console.error('[waitlist-signup] apps script returned', appsRes.status);
    }
  } catch (err) {
    console.error('[waitlist-signup] apps script forward failed:', err?.message ?? err);
  }

  // 2. Send waitlist email via Resend with idempotency key.
  try {
    const html = await render(CohortWaitlistEmail({ firstName: firstName || 'there' }));
    const sendRes = await resend.emails.send(
      {
        from: 'MVP Club <info@mvpclub.ai>',
        to: email,
        subject: "You're on the AI Summer Camp Cohort 01 waitlist.",
        html,
        reply_to: 'info@mvpclub.ai',
      },
      {
        idempotencyKey: `cohort_waitlist:${email}`,
      }
    );
    if (sendRes.error) {
      console.error('[waitlist-signup] resend error:', sendRes.error);
    }
  } catch (err) {
    console.error('[waitlist-signup] resend send failed:', err?.message ?? err);
  }

  res.status(200).json({ received: true });
}
```

- [ ] **Step 2: Smoke-check**

With `vercel dev` running:
```bash
curl -i -X POST http://localhost:3000/api/waitlist-signup \
  -H "Content-Type: application/json" \
  -d '{}'
```

Expected: HTTP 400 with `{"error":"invalid email"}` (empty body → no email).

Then:
```bash
curl -i -X POST http://localhost:3000/api/waitlist-signup \
  -H "Content-Type: application/json" \
  -d '{"firstName":"Test","email":"your-own-email@example.com"}'
```

(Replace with your real email if testing real Resend send.) Expected: HTTP 200 `{"received":true}`. Check that an email arrives if env vars are set.

- [ ] **Step 3: Commit**

```bash
git add api/waitlist-signup.js
git commit -m "feat: add /api/waitlist-signup endpoint"
```

---

## Task 7: Update the Google Apps Script (manual, outside repo)

**Files:**
- Modify: Google Apps Script attached to the email-collection Google Sheet (info@mvpclub.ai Drive).

For the cohort sources, Apps Script's job is now **sheet writing only** — no email sending. The existing `sendWelcomeEmail` path for other sources is preserved.

- [ ] **Step 1: Open the script editor**

Follow `docs/email-workflow.md` ("Deployment Instructions"): open the Google Sheet in the info@mvpclub.ai Drive, then Extensions → Apps Script.

- [ ] **Step 2: Replace `doPost` with the branching version**

```js
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = JSON.parse(e.postData.contents);

  // Idempotency: skip if a row already exists for this email + source.
  if (alreadyRecorded(sheet, data.email, data.source)) {
    return ContentService.createTextOutput(JSON.stringify({status: 'duplicate'}))
      .setMimeType(ContentService.MimeType.JSON);
  }

  // Save to sheet (columns: firstName, email, timestamp, source)
  sheet.appendRow([data.firstName, data.email, data.timestamp, data.source]);

  // Branch on source.
  // Cohort sources: sheet write only. Emails are sent by Vercel functions via Resend.
  // All other sources: use existing welcome email pipeline.
  if (data.source === 'cohort_paid' || data.source === 'cohort_waitlist') {
    // intentionally no email send here
  } else {
    sendWelcomeEmail(data.email, data.firstName);
  }

  return ContentService.createTextOutput(JSON.stringify({status: 'success'}))
    .setMimeType(ContentService.MimeType.JSON);
}

function alreadyRecorded(sheet, email, source) {
  if (!email || !source) return false;
  var range = sheet.getDataRange().getValues();
  // Columns: 0=firstName, 1=email, 2=timestamp, 3=source
  for (var i = 1; i < range.length; i++) {
    if (String(range[i][1]).toLowerCase() === String(email).toLowerCase() &&
        String(range[i][3]) === String(source)) {
      return true;
    }
  }
  return false;
}
```

- [ ] **Step 3: Save**

Ctrl+S. No deployment step needed — Apps Script web-app deployments use the existing endpoint URL. Code changes take effect immediately on subsequent POSTs.

> Do NOT add `sendCohortPaidEmail` or `sendCohortWaitlistEmail` functions. Those were in the 2026-05-21 design but are now Resend's job, not Apps Script's.

> No git commit for this task — the change lives in Google's infrastructure.

---

## Task 8: Build the cohort waitlist overlay

**Files:**
- Create: `src/components/cohort/CohortWaitlistOverlay.jsx`

Modeled on `src/WaitlistOverlay.jsx` but **POSTs to `/api/waitlist-signup`** (not Apps Script direct).

- [ ] **Step 1: Read the existing WaitlistOverlay for pattern reference**

```bash
cat src/WaitlistOverlay.jsx
```

Note the visual styling, success state, localStorage pattern. We mirror those.

- [ ] **Step 2: Create the cohort waitlist overlay**

```jsx
// src/components/cohort/CohortWaitlistOverlay.jsx

import React, { useState } from 'react';
import { COHORT } from '../../data/cohort.ts';

export default function CohortWaitlistOverlay({ open, onClose }) {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!open) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await fetch('/api/waitlist-signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, email }),
      });
      try {
        localStorage.setItem('mvpclub_cohort_waitlist_email', email);
      } catch (_) {}
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'cohort_waitlist_submit', {
          event_category: 'conversion',
          event_label: COHORT.id,
        });
      }
      setSubmitted(true);
    } catch (_err) {
      // If the endpoint truly errors, the sheet row + email won't happen, but
      // showing "submitted" anyway keeps UX consistent. Real failures show in
      // Vercel function logs.
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cohort-waitlist-title"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        background: 'rgba(26,54,93,0.6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'white',
          borderRadius: '10px',
          maxWidth: '480px',
          width: '100%',
          padding: '40px 36px 32px',
          boxShadow: '0 20px 50px rgba(0,0,0,0.25)',
          position: 'relative',
        }}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            position: 'absolute',
            top: 14,
            right: 14,
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--color-primary)',
            padding: 8,
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>

        {!submitted ? (
          <>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--color-accent)', marginBottom: 14 }}>
              {COHORT.label} · Waitlist
            </div>
            <h2 id="cohort-waitlist-title" style={{ fontFamily: 'Zilla Slab, Georgia, serif', fontSize: 28, lineHeight: 1.15, color: 'var(--color-primary)', marginBottom: 10, fontWeight: 400 }}>
              Cohort 01 is full. Get on the list.
            </h2>
            <p style={{ fontSize: 14.5, color: '#475569', lineHeight: 1.55, marginBottom: 22 }}>
              We'll email you if a seat opens before June 5, and you'll be first to know about Cohort 02.
            </p>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First name"
                autoComplete="given-name"
                required
                style={{ display: 'block', width: '100%', padding: '12px 14px', borderRadius: 6, border: '1px solid #cbd5e1', fontSize: 15, marginBottom: 10 }}
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                autoComplete="email"
                required
                style={{ display: 'block', width: '100%', padding: '12px 14px', borderRadius: 6, border: '1px solid #cbd5e1', fontSize: 15, marginBottom: 16 }}
              />
              <button
                type="submit"
                disabled={submitting}
                style={{ display: 'block', width: '100%', padding: '14px', borderRadius: 8, border: 'none', background: 'var(--color-accent)', color: 'white', fontWeight: 600, fontSize: 15, cursor: submitting ? 'wait' : 'pointer' }}
              >
                {submitting ? 'Adding…' : 'Join the waitlist →'}
              </button>
            </form>
          </>
        ) : (
          <>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--color-secondary)', marginBottom: 14 }}>
              You're on the list
            </div>
            <h2 style={{ fontFamily: 'Zilla Slab, Georgia, serif', fontSize: 28, lineHeight: 1.15, color: 'var(--color-primary)', marginBottom: 12, fontWeight: 400 }}>
              Confirmation on its way.
            </h2>
            <p style={{ fontSize: 14.5, color: '#475569', lineHeight: 1.55, marginBottom: 20 }}>
              Check your inbox in a minute or two. If a seat opens before June 5, we'll email you. Either way, you're first in line for Cohort 02.
            </p>
            <button
              onClick={onClose}
              style={{ display: 'inline-block', padding: '10px 22px', borderRadius: 6, border: '1px solid var(--color-primary)', background: 'white', color: 'var(--color-primary)', fontWeight: 600, fontSize: 14, cursor: 'pointer' }}
            >
              Close
            </button>
          </>
        )}
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/cohort/CohortWaitlistOverlay.jsx
git commit -m "feat: add CohortWaitlistOverlay (posts to /api/waitlist-signup)"
```

---

## Task 9: Build the dual-state CTA component

**Files:**
- Create: `src/components/cohort/CohortCTA.jsx`

Fetches `/api/cohort-status` on mount and renders either a Stripe Payment Link or a "Join the Waitlist" button.

- [ ] **Step 1: Create the component**

```jsx
// src/components/cohort/CohortCTA.jsx

import React, { useEffect, useState } from 'react';
import { COHORT } from '../../data/cohort.ts';
import CohortWaitlistOverlay from './CohortWaitlistOverlay.jsx';

export default function CohortCTA({ variant, location }) {
  const [status, setStatus] = useState('open');
  const [loading, setLoading] = useState(true);
  const [waitlistOpen, setWaitlistOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch('/api/cohort-status')
      .then((r) => r.json())
      .then((data) => {
        if (cancelled) return;
        setStatus(data.status === 'full' ? 'full' : 'open');
        setLoading(false);
      })
      .catch(() => {
        if (cancelled) return;
        setStatus('open');
        setLoading(false);
      });
    return () => { cancelled = true; };
  }, []);

  const handleStripeClick = () => {
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'cohort_registration_click', {
        event_category: 'conversion',
        event_label: location || variant,
        link_url: COHORT.stripePaymentLinkUrl,
      });
    }
  };

  const handleWaitlistOpen = () => {
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'cohort_waitlist_open', {
        event_category: 'conversion',
        event_label: location || variant,
      });
    }
    setWaitlistOpen(true);
  };

  const showWaitlistCTA = !loading && status === 'full';

  if (variant === 'hero') {
    return (
      <>
        {showWaitlistCTA ? (
          <button
            type="button"
            onClick={handleWaitlistOpen}
            className="asc-deal-button"
            style={{ background: 'var(--color-secondary)' }}
          >
            Cohort full — join the waitlist →
          </button>
        ) : (
          <a
            href={COHORT.stripePaymentLinkUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleStripeClick}
            className="asc-deal-button"
          >
            Reserve Your Spot →
          </a>
        )}
        <div className="asc-deal-finepoint">
          {showWaitlistCTA
            ? 'Cohort 01 is full. Get on the list for Cohort 02.'
            : 'Registration closes when full.'}
        </div>
        <CohortWaitlistOverlay open={waitlistOpen} onClose={() => setWaitlistOpen(false)} />
      </>
    );
  }

  return (
    <>
      {showWaitlistCTA ? (
        <button
          type="button"
          onClick={handleWaitlistOpen}
          className="asc-postcard-cta"
          style={{ background: 'var(--color-secondary)', border: 'none', cursor: 'pointer' }}
        >
          Cohort full — join the waitlist →
        </button>
      ) : (
        <a
          href={COHORT.stripePaymentLinkUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleStripeClick}
          className="asc-postcard-cta"
        >
          Save My Seat →
        </a>
      )}
      <CohortWaitlistOverlay open={waitlistOpen} onClose={() => setWaitlistOpen(false)} />
    </>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/cohort/CohortCTA.jsx
git commit -m "feat: add dual-state CohortCTA component"
```

---

## Task 10: Wire CohortCTA into the camp page (and remove stale countdown)

**Files:**
- Modify: `src/pages/AISummerCampPage.jsx`

Remove the `REGISTRATION_URL` constant, the `REGISTRATION_OPENS_AT` stale countdown gate, the `useCountdown` helper, and replace both inline CTAs with `<CohortCTA />`.

- [ ] **Step 1: Strip the obsolete header**

Open `src/pages/AISummerCampPage.jsx`. Replace lines 1-57 (everything from the file start through the `const AISummerCampPage = () => {` declaration, but NOT including that line) with:

```jsx
import React from 'react';
import AnimatedSection from '../components/shared/AnimatedSection';
import CohortCTA from '../components/cohort/CohortCTA.jsx';
import '../styles/ai-summer-camp.css';

const AISummerCampPage = () => {
```

This removes: `REGISTRATION_URL`, the `REGISTRATION_OPENS_AT` constant, `trackRegistrationClick`, and `useCountdown`. Also removes the `useState, useEffect` imports if they were only used by the countdown — check first; the page may use them elsewhere. (Currently they're only used by `useCountdown`.)

- [ ] **Step 2: Remove the countdown gate around the hero CTA**

Find the block that uses `registrationOpen ? (...stripe link...) : (...countdown...)`. Replace the entire `{registrationOpen ? ( ... ) : ( ... )}` JSX block AND the `<div className="asc-deal-finepoint">` line that follows with a single line:

```jsx
            <CohortCTA variant="hero" location="hero_deal" />
```

- [ ] **Step 3: Remove the destructured useCountdown call**

Inside the function body, remove the line:
```jsx
const { isPast: registrationOpen, display: countdownDisplay } = useCountdown(REGISTRATION_OPENS_AT);
```

- [ ] **Step 4: Replace the closing-postcard CTA**

Find the `<a href={REGISTRATION_URL} ... className="asc-postcard-cta">Save My Seat →</a>` block in the closing postcard section. Replace with:

```jsx
              <CohortCTA variant="postcard" location="closing_postcard" />
```

- [ ] **Step 5: Verify the page still renders**

```bash
npm run dev
```

Visit `http://localhost:4321/ai-summer-camp` in a browser.

Expected:
- Hero deal card shows "Reserve Your Spot →" (no countdown).
- Closing postcard shows "Save My Seat →".
- Browser console: no errors. Network tab: a GET to `/api/cohort-status` may show 404 because `npm run dev` is Astro-only — that's expected at this stage, the component falls back to optimistic 'open'.

> Stripe link won't fully work yet because `cohort.ts` has a placeholder URL. That gets fixed in Task 12.

- [ ] **Step 6: Stop dev server and commit**

```bash
git add src/pages/AISummerCampPage.jsx
git commit -m "feat: replace inline CTAs with CohortCTA, remove stale countdown"
```

---

## Task 11: Build the welcome (post-payment) page

**Files:**
- Create: `src/pages/ai-summer-camp/welcome.astro`

Fully static. No client-side fetches, no `session_id` reading, no email firing.

- [ ] **Step 1: Create the welcome page**

```astro
---
import PageLayout from '../../layouts/PageLayout.astro';
import { COHORT } from '../../data/cohort.ts';
---

<PageLayout
  title="You're in — AI Summer Camp Cohort 01"
  description="Welcome to AI Summer Camp Cohort 01. Here's everything you need for the four Fridays in June."
  path="/ai-summer-camp/welcome"
  noLeadMagnet={true}
>
  <div
    style="background-color: var(--asc-page-bg, #c9dce6); padding: 64px 24px 88px; min-height: 80vh;"
  >
    <div style="max-width: 760px; margin: 0 auto;">
      <div
        style="background: white; border-radius: 10px; border-left: 5px solid var(--color-accent); padding: 48px 44px; box-shadow: 0 20px 44px rgba(26,54,93,0.13);"
      >
        <div
          style="font-size: 11px; font-weight: 700; letter-spacing: 0.25em; text-transform: uppercase; color: var(--color-accent); margin-bottom: 16px;"
        >
          You're in
        </div>
        <h1
          style="font-family: 'Zilla Slab', Georgia, serif; font-weight: 400; font-size: 44px; line-height: 1.08; color: var(--color-primary); letter-spacing: -0.015em; margin-bottom: 12px;"
        >
          Welcome to <em style="color: var(--color-secondary); font-style: italic;">{COHORT.label}.</em>
        </h1>
        <p
          style="font-family: 'Zilla Slab', Georgia, serif; font-style: italic; font-size: 19px; color: var(--color-secondary); line-height: 1.35; margin-bottom: 32px;"
        >
          Four Fridays in June. You, Claude, and a handful of other working professionals.
        </p>

        <div
          style="border-top: 1px solid #e2e8f0; border-bottom: 1px solid #e2e8f0; padding: 18px 0; margin-bottom: 28px;"
        >
          <div style="display: grid; grid-template-columns: 110px 1fr; gap: 16px; padding: 10px 0; border-bottom: 1px solid #f1f5f9;">
            <div style="font-size: 11px; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: var(--color-secondary);">Dates</div>
            <div style="font-size: 15px; color: var(--color-primary); line-height: 1.4;">{COHORT.fridaysFormatted}</div>
          </div>
          <div style="display: grid; grid-template-columns: 110px 1fr; gap: 16px; padding: 10px 0; border-bottom: 1px solid #f1f5f9;">
            <div style="font-size: 11px; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: var(--color-secondary);">Time</div>
            <div style="font-size: 15px; color: var(--color-primary); line-height: 1.4;">{COHORT.timeET}</div>
          </div>
          <div style="display: grid; grid-template-columns: 110px 1fr; gap: 16px; padding: 10px 0; border-bottom: 1px solid #f1f5f9;">
            <div style="font-size: 11px; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: var(--color-secondary);">Office Hrs</div>
            <div style="font-size: 15px; color: var(--color-primary); line-height: 1.4;">{COHORT.officeHoursET} <span style="color: #64748b; font-weight: 400; font-size: 13px;">(optional)</span></div>
          </div>
          <div style="display: grid; grid-template-columns: 110px 1fr; gap: 16px; padding: 10px 0;">
            <div style="font-size: 11px; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: var(--color-secondary);">Format</div>
            <div style="font-size: 15px; color: var(--color-primary); line-height: 1.4;">Live on Google Meet</div>
          </div>
        </div>

        <h2
          style="font-family: 'Zilla Slab', Georgia, serif; font-weight: 400; font-size: 22px; color: var(--color-primary); margin-bottom: 10px;"
        >
          What happens next
        </h2>
        <p style="font-size: 15px; color: #475569; line-height: 1.6; margin-bottom: 16px;">
          You'll get a welcome email at the address you used for checkout, plus a separate Stripe receipt. About a week before <strong style="color: var(--color-primary);">Friday, June 5</strong>, we'll send the Google Meet link and a calendar invite.
        </p>
        <p style="font-size: 15px; color: #475569; line-height: 1.6; margin-bottom: 16px;">
          In the meantime, start thinking about <em style="color: var(--color-secondary); font-style: italic;">a real problem from your actual work</em>. Week 1 is about getting Claude into that problem with you.
        </p>
        <p style="font-size: 15px; color: #475569; line-height: 1.6; margin-bottom: 28px;">
          Questions? Reply to the welcome email (it's monitored by all three of us — Matt, Jill, and Ryan).
        </p>

        <a
          href="/"
          style="display: inline-block; padding: 12px 22px; border-radius: 6px; border: 1px solid var(--color-primary); background: white; color: var(--color-primary); font-weight: 600; font-size: 14px; text-decoration: none;"
        >
          ← Back to mvpclub.ai
        </a>
      </div>
    </div>
  </div>
</PageLayout>
```

- [ ] **Step 2: Verify the welcome page renders**

```bash
npm run dev
```

Visit `http://localhost:4321/ai-summer-camp/welcome`.

Expected: clean "You're in" landing page, no errors.

- [ ] **Step 3: Commit**

```bash
git add src/pages/ai-summer-camp/welcome.astro
git commit -m "feat: add /ai-summer-camp/welcome static landing page"
```

---

## Task 12: Configure Stripe (manual, needs Matt's account)

Verified 2026-05-24: no existing cohort product, link, or webhook in this Stripe account. All of the below is new creation.

- [ ] **Step 1: Get into Stripe**

Matt: log in to https://dashboard.stripe.com.

- [ ] **Step 2: Create the test-mode product**

Toggle to **test mode** (top right).

Products → Add a product:
- **Name:** `MVP Club AI Summer Camp — Cohort 01`
- **Description:** `A guided 4-week program for working professionals. Four Fridays in June 2026 — June 5, 12, 19, 26 — 2–3 PM ET on Google Meet.`
- **Price:** `99 USD`, **one-time**
- **Metadata:** add `cohort` = `cohort_01`
- Save

Copy the **Product ID** (`prod_...`).

- [ ] **Step 3: Set inventory cap to 15**

Open the product → Pricing tab → Manage inventory. Set the limit to `15`.

- [ ] **Step 4: Create the Payment Link**

Stripe dashboard → Payment Links → New:
- **Product:** select the one you just made
- **Confirmation page:** "After payment, redirect customers to your website"
- **Redirect URL:** `http://localhost:3000/ai-summer-camp/welcome` (test mode)
- **Customer information:** Collect name and email
- **Receipt:** Add custom message: `Welcome to AI Summer Camp Cohort 01! You'll get a separate welcome email from us shortly with what to expect. — The MVP Club Team`

Save and copy the **Payment Link URL** (`https://buy.stripe.com/test_...`).

- [ ] **Step 5: Update cohort.ts with the test values**

```ts
stripeProductId: 'prod_REPLACE_ME_AFTER_CREATING_IN_STRIPE',  // → real test product ID
stripePaymentLinkUrl: 'https://buy.stripe.com/REPLACE_ME_AFTER_CREATING_LINK',  // → real test link
```

- [ ] **Step 6: Configure the test-mode webhook**

For local testing we'll use `stripe listen` in Task 15. For Vercel preview deploys, optionally add an endpoint at `https://<preview-url>/api/stripe-webhook` subscribing to `checkout.session.completed`. Copy the signing secret if you do.

- [ ] **Step 7: Get the test secret key**

Developers → API keys → reveal the **Secret key** (`sk_test_...`). Copy it.

- [ ] **Step 8: Repeat for LIVE mode (do not skip, but defer the link until launch)**

Toggle to **live mode**. Repeat steps 2–4:
- Same product config, same inventory cap.
- Payment Link redirect: `https://www.mvpclub.ai/ai-summer-camp/welcome`.
- Webhook endpoint: `https://www.mvpclub.ai/api/stripe-webhook` subscribing to `checkout.session.completed`. Copy the live signing secret.
- Copy the live product ID, Payment Link URL, and `sk_live_...` secret key.

- [ ] **Step 9: Commit the cohort.ts update**

```bash
git add src/data/cohort.ts
git commit -m "config: wire Stripe product ID and Payment Link in cohort.ts"
```

---

## Task 13: Set up environment variables and .env.example

**Files:**
- Create: `.env.example` (committed)
- Modify: local `.env` (not committed)
- Configure: Vercel project environment variables

- [ ] **Step 1: Confirm .env is gitignored**

```bash
git check-ignore .env
```

Expected: prints `.env`.

- [ ] **Step 2: Create .env.example**

```bash
# .env.example
#
# Local development environment variables. Copy to `.env` and fill in.
# Vercel reads these from the project's Environment Variables settings.

# Anthropic API Key (existing — for chat / use case generator)
ANTHROPIC_API_KEY=sk-ant-api03-REPLACE_ME

# Stripe — get from https://dashboard.stripe.com/test/apikeys (test)
STRIPE_SECRET_KEY=sk_test_REPLACE_ME

# Stripe webhook signing secret — from `stripe listen` for local dev
STRIPE_WEBHOOK_SECRET=whsec_REPLACE_ME

# Cohort product ID from Stripe dashboard
COHORT_01_PRODUCT_ID=prod_REPLACE_ME

# Google Apps Script web app URL (existing — see docs/email-workflow.md)
APPS_SCRIPT_URL=https://script.google.com/macros/s/AKfycbyNGVQSbxcSDZUf5K-2sWrnqdy08GE9BkPw8C0K1qRzMXnZVLVMBS6ggH4QnLZCOtBo/exec

# Resend API key (sending access, scoped to mvpclub.ai)
# Already in Vercel as RESEND_API_KEY. Same value for preview and production.
RESEND_API_KEY=re_REPLACE_ME
```

- [ ] **Step 3: Verify local .env has all values**

Open `.env`. Make sure these are filled in with real values:
- `ANTHROPIC_API_KEY` (already there)
- `RESEND_API_KEY` (already there as of 2026-05-24)
- `STRIPE_SECRET_KEY` (paste from Task 12 Step 7)
- `STRIPE_WEBHOOK_SECRET` (skip until Task 15 — fills in from `stripe listen`)
- `COHORT_01_PRODUCT_ID` (paste from Task 12 Step 2)
- `APPS_SCRIPT_URL` (paste from `src/SignupOverlay.jsx` or `src/WaitlistOverlay.jsx`)

- [ ] **Step 4: Add Vercel project env vars**

In Vercel dashboard → project → Settings → Environment Variables, for **Preview** environment:
- `STRIPE_SECRET_KEY` = test mode key
- `COHORT_01_PRODUCT_ID` = test mode product ID
- `APPS_SCRIPT_URL`
- `RESEND_API_KEY` (same as local)
- (Optional) `STRIPE_WEBHOOK_SECRET` if a permanent test webhook was set up

For **Production** environment, add the **live** equivalents.

- [ ] **Step 5: Commit .env.example**

```bash
git add .env.example
git commit -m "config: add .env.example for cohort signup env vars"
```

---

## Task 14: Document the changes in email-workflow.md

**Files:**
- Modify: `docs/email-workflow.md`

- [ ] **Step 1: Add the two new source values**

Add rows to the sources table:

```
| cohort_paid     | Server-side (Vercel webhook)         | Fired by api/stripe-webhook.js after a successful Stripe Checkout for the AI Summer Camp cohort. Apps Script writes a row only — email is sent by Resend via the Vercel function. |
| cohort_waitlist | CohortWaitlistOverlay → Vercel API   | Fired when the overlay form is submitted. api/waitlist-signup.js writes the sheet row via Apps Script and sends the waitlist email via Resend. |
```

- [ ] **Step 2: Document the updated doPost branching**

Replace the Apps Script code sample with the new version from Task 7. Add note: "As of 2026-05-24, `cohort_paid` and `cohort_waitlist` are sheet-write-only on the Apps Script side. Emails for these sources are sent server-side by Vercel functions via Resend, not by Apps Script."

- [ ] **Step 3: Add a Resend section**

Below the existing Apps Script section, add:

```
## Resend (cohort emails)

Cohort signup confirmations (`cohort_paid`, `cohort_waitlist`) are sent via Resend, not Apps Script.

- **Dashboard:** https://resend.com/emails
- **Domain:** mvpclub.ai (verified, region us-east-1)
- **API key:** "MVP Club Site - Cohort Signup", sending access only
- **From address:** info@mvpclub.ai (replies route to the existing inbox)
- **Templates:** `src/emails/CohortPaidEmail.jsx`, `src/emails/CohortWaitlistEmail.jsx`
- **Idempotency:** Stripe event ID for paid sends, `cohort_waitlist:${email}` for waitlist sends

Other (non-cohort) email flows still use the Gmail/Apps Script pipeline. Migration of those is out of scope for V1.
```

- [ ] **Step 4: Add a change-log entry**

```
| 2026-05-24 | Migrated cohort emails (cohort_paid, cohort_waitlist) to Resend. Apps Script now sheet-write-only for these sources. New /api/waitlist-signup endpoint introduced. Other email flows unchanged. |
```

- [ ] **Step 5: Commit**

```bash
git add docs/email-workflow.md
git commit -m "docs: document Resend cohort email pipeline in email-workflow.md"
```

---

## Task 15: Local end-to-end test

**Files:** none — verification only.

- [ ] **Step 1: Reset local env**

Confirm `.env` has: `STRIPE_SECRET_KEY` (test), `COHORT_01_PRODUCT_ID` (test), `APPS_SCRIPT_URL`, `RESEND_API_KEY`. Leave `STRIPE_WEBHOOK_SECRET` blank for now.

- [ ] **Step 2: Start vercel dev**

Terminal 1:
```bash
vercel dev --listen 3000
```

- [ ] **Step 3: Start the Stripe webhook listener**

Terminal 2:
```bash
stripe listen --forward-to localhost:3000/api/stripe-webhook
```

Copy the webhook signing secret (`whsec_...`) it prints.

- [ ] **Step 4: Add the webhook secret and restart vercel dev**

In `.env`, set `STRIPE_WEBHOOK_SECRET` to the value. Restart Terminal 1.

- [ ] **Step 5: Verify status endpoint with real Stripe data**

Terminal 3:
```bash
curl http://localhost:3000/api/cohort-status
```

Expected: `{"status":"open","remaining":15}` — no `fallback: true`.

- [ ] **Step 6: Walk the happy path**

In a browser:
1. Visit `http://localhost:3000/ai-summer-camp`. CTA: "Reserve Your Spot →".
2. Click → Stripe Checkout (test mode).
3. Pay with `4242 4242 4242 4242`, future expiry, any CVC, **using your own email**.
4. Redirected to `/ai-summer-camp/welcome`.

- [ ] **Step 7: Verify the webhook fired and the email sent**

In Terminal 2 (Stripe CLI): `--> checkout.session.completed [evt_...]` and `<-- [200] POST localhost:3000/api/stripe-webhook`.

In Terminal 1: no errors.

Verify:
- Email-collection Google Sheet has a new row: your email + `cohort_paid` in column D.
- Your inbox: the Stripe receipt arrives AND the branded "You're in" email from MVP Club arrives. The MVP Club email should visually match `mockups/email-cohort-paid.html`.
- https://resend.com/emails shows the send with `Delivered` status.

- [ ] **Step 8: Verify capacity decremented**

```bash
curl http://localhost:3000/api/cohort-status
```

Expected: `{"status":"open","remaining":14}`. (Wait 60s if you see 15 — edge cache.)

- [ ] **Step 9: Test the waitlist path**

Temporarily edit `src/data/cohort.ts`: `capacity: 1` (not 15). Hot-reload.

`curl http://localhost:3000/api/cohort-status` should return `{"status":"full","remaining":0}`.

Visit `/ai-summer-camp` — both CTAs now say "Cohort full — join the waitlist →".

Click → overlay opens → submit with a test name + email (your own again).

Verify:
- Overlay flips to "You're on the list" success state.
- Vercel function logs (Terminal 1) show a POST to `/api/waitlist-signup` succeeded.
- Sheet has a new row with `cohort_waitlist` in column D.
- Your inbox: the "You're on the AI Summer Camp Cohort 01 waitlist." email arrives. Visually matches `mockups/email-cohort-waitlist.html`.
- https://resend.com/emails shows the second send.

- [ ] **Step 10: Restore capacity and tear down**

Edit `src/data/cohort.ts` back to `capacity: 15`. Do NOT commit this change — Task 2 already committed the file with capacity 15.

Stop terminals 1 and 2 (Ctrl+C).

- [ ] **Step 11: Final sanity commit (only if any docs changed)**

If you discovered edge cases during testing that warrant additions to the spec or plan, commit them. Otherwise, this task produces no commit.

---

## Going to production (post-implementation)

1. In Vercel, confirm **production** env vars are populated with **live** Stripe values (`sk_live_...`, live webhook secret, live product ID). `RESEND_API_KEY` is the same value as preview/dev.
2. In Stripe (live mode), confirm the webhook endpoint `https://www.mvpclub.ai/api/stripe-webhook` is subscribed to `checkout.session.completed`.
3. Edit `src/data/cohort.ts` to use **live** Payment Link URL and **live** product ID. Commit and push.
4. Vercel auto-deploys. Watch the first paid signup in Resend dashboard + Google Sheet.

---

## Self-review

**Spec coverage:** Walked through `2026-05-21-cohort-signup-flow-design.md` (rev 2026-05-24) section by section.

- ✅ FCFS selection model → enforced by Stripe inventory + cohort-status check.
- ✅ Stripe Payment Link → Task 12.
- ✅ Dual-state CTA → Task 9.
- ✅ `/api/cohort-status` (cached, fail-open) → Task 3.
- ✅ `/api/stripe-webhook` (signature verify, Apps Script + Resend) → Task 5.
- ✅ `/api/waitlist-signup` (NEW endpoint, Apps Script + Resend) → Task 6.
- ✅ React Email templates → Task 4.
- ✅ Apps Script sheet-only branches + idempotency → Task 7.
- ✅ Waitlist overlay (POST to /api/waitlist-signup) → Task 8.
- ✅ Welcome page (static) → Task 11.
- ✅ `src/data/cohort.ts` config → Task 2.
- ✅ Modify `AISummerCampPage.jsx` + remove stale countdown → Task 10.
- ✅ Stripe dashboard config → Task 12.
- ✅ Vercel env vars + `.env.example` (RESEND_API_KEY documented) → Task 13.
- ✅ `docs/email-workflow.md` update (Resend section + sources) → Task 14.
- ✅ Local e2e test plan (verifies Resend deliveries) → Task 15.

**Placeholder scan:** No "TBD"/"TODO"/"implement later" in any task. Replace-me strings in code samples are deliberate and get filled by Task 12.

**Type consistency:**
- `COHORT.label`, `COHORT.fridaysFormatted`, `COHORT.timeET`, `COHORT.officeHoursET`, `COHORT.stripePaymentLinkUrl` all defined in Task 2 and consumed in Tasks 4 (email templates), 9 (CTA), 11 (welcome page).
- `cohort_paid` / `cohort_waitlist` source strings consistent across Task 5 (webhook), Task 6 (waitlist endpoint), Task 7 (Apps Script), Task 8 (overlay), Task 14 (docs).
- Idempotency keys: Stripe event ID in Task 5, `cohort_waitlist:${email}` in Task 6.

**Out-of-repo ordering:** Task 7 (Apps Script) and Task 12 (Stripe) need account access. They're placed between code tasks so the engineer can pause and coordinate.
