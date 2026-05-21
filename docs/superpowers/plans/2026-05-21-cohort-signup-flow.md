# AI Summer Camp Cohort Signup Flow — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Wire `/ai-summer-camp` to a real signup flow: one CTA that swaps between a Stripe Payment Link (when seats remain) and a waitlist email-capture overlay (when full), backed by a Stripe webhook that fires a custom "You're in" welcome email.

**Architecture:** Vercel edge function checks Stripe for paid seat count and tells the page which CTA state to render (cached 60s, fail-open). Stripe Payment Link enforces the 15-seat cap. Stripe webhook posts to the existing Google Apps Script pipeline with `source: 'cohort_paid'` to send the welcome email. Waitlist form reuses the same Apps Script pipeline with `source: 'cohort_waitlist'`.

**Tech Stack:** Astro 5 + React 18, Vercel serverless functions (existing `api/chat.js` pattern), Stripe SDK v18, Google Apps Script (existing email pipeline).

**Spec:** `docs/superpowers/specs/2026-05-21-cohort-signup-flow-design.md`

**Verification strategy:** No unit tests. Verification is (a) curl-based smoke checks of each API endpoint as we build it, and (b) full local e2e via Stripe CLI + Stripe test-mode (covered in Task 13). This matches the codebase convention (no test framework present) and the user's stated preference for local e2e testing.

---

## File map

**New (server-side):**
- `api/cohort-status.js` — Vercel edge function. GET → `{ status, remaining }`. Cached 60s.
- `api/stripe-webhook.js` — Vercel node function. POST webhook receiver. Verifies signature, forwards to Apps Script.

**New (config / source of truth):**
- `src/data/cohort.ts` — capacity, Stripe Payment Link URL, product ID, dates, dismiss key. Single source of truth.
- `.env.example` — documents required environment variables.

**New (frontend):**
- `src/components/cohort/CohortWaitlistOverlay.jsx` — email + name capture, POSTs to Apps Script.
- `src/components/cohort/CohortCTA.jsx` — dual-state CTA (Reserve → Stripe, or Join Waitlist → overlay).
- `src/pages/ai-summer-camp/welcome.astro` — static "You're in" landing page.

**Modified:**
- `src/pages/AISummerCampPage.jsx` — replace inline CTAs with `<CohortCTA />`, remove `REGISTRATION_URL` constant + TODO.
- `package.json` — add `stripe` dependency.
- `docs/email-workflow.md` — document new sources (`cohort_paid`, `cohort_waitlist`).

**Out of repo (manual configuration, done by Matt with my guidance):**
- Stripe dashboard — create product, Payment Link, configure webhook endpoint.
- Google Apps Script — add `cohort_paid` and `cohort_waitlist` branches + idempotency check.
- Vercel environment variables — `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `COHORT_01_PRODUCT_ID`, `APPS_SCRIPT_URL`.

---

## Prerequisites

Before starting, the engineer needs:
- Node 18+ (Vercel functions require it).
- Vercel CLI installed globally: `npm install -g vercel` (used for local dev).
- Stripe CLI installed: `scoop install stripe` (Windows) or equivalent. Used for webhook forwarding in local e2e.
- Access to Matt's Stripe dashboard (Matt will provide credentials/SSO when needed in Tasks 3 and 10).
- Access to the Google Apps Script that owns the existing email pipeline (described in `docs/email-workflow.md`; uses the `info@mvpclub.ai` Google account).

---

## Task 1: Install Stripe SDK

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json` (auto-updated)

- [ ] **Step 1: Install the Stripe Node SDK**

Run:
```bash
npm install stripe@^18.0.0
```

Expected: adds `"stripe": "^18.x.x"` to dependencies in `package.json` and updates `package-lock.json`. No errors.

- [ ] **Step 2: Verify the install**

Run:
```bash
node -e "console.log(require('stripe'))"
```

Expected: prints `[Function: Stripe]` (or similar — confirms the package loads).

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "deps: add stripe SDK for cohort signup flow"
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
//   - api/cohort-status.js
//   - api/stripe-webhook.js
//
// ROLLOVER CHECKLIST (when launching the next cohort):
//   1. Bump COHORT_ID and COHORT_LABEL
//   2. Update DATES (startISO, endISO, fridays array, officeHoursWeekday)
//   3. Create a NEW Stripe product + Payment Link, update STRIPE_PRODUCT_ID
//      and STRIPE_PAYMENT_LINK_URL
//   4. Bump CALLOUT_DISMISS_KEY so previously-dismissed users see the bar again
//      (current value 'cohort_bar_dismissed_2026_06' lives in
//      src/components/layout/CohortAnnouncementBar.astro)
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

Run:
```bash
npx astro check
```

Expected: no new errors related to `src/data/cohort.ts`. Pre-existing errors elsewhere are fine.

- [ ] **Step 3: Commit**

```bash
git add src/data/cohort.ts
git commit -m "feat: add src/data/cohort.ts as cohort config source of truth"
```

> Note: `stripeProductId` and `stripePaymentLinkUrl` are placeholders. They get filled in during Task 10 once the Stripe product is created. The site won't be production-functional until then, but `/api/cohort-status` will still work because it fails-open if the product ID doesn't match anything in Stripe.

---

## Task 3: Build the cohort-status API endpoint

**Files:**
- Create: `api/cohort-status.js`

Stripe credentials are needed for this endpoint to return real numbers, but it must fail open if the key is missing or Stripe is unreachable. We can ship and test it before the Stripe product exists.

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
// returns { status: 'open', remaining: null, fallback: true }. We always
// prefer false-positive 'open' over false-positive 'full' — Stripe's own
// inventory cap is the real backstop.

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

    // Count paid Checkout Sessions whose line items include our product.
    // We list up to 100 paid sessions and filter client-side. At 15 seats
    // this is comfortably under the limit even if the product had multiple
    // line items per session.
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
    // Log to Vercel function logs but always respond with fail-open
    console.error('[cohort-status] error:', err?.message ?? err);
    return new Response(
      JSON.stringify({ status: 'open', remaining: null, fallback: true }),
      { status: 200, headers }
    );
  }
}
```

- [ ] **Step 2: Smoke-check locally without Stripe configured**

Run (in one terminal):
```bash
vercel dev --listen 3000
```

In another terminal:
```bash
curl -i http://localhost:3000/api/cohort-status
```

Expected: HTTP 200 with body `{"status":"open","remaining":null,"fallback":true}` (since `STRIPE_SECRET_KEY` and `COHORT_01_PRODUCT_ID` aren't set yet). Also a `Cache-Control` header. This proves the fail-open path works.

- [ ] **Step 3: Stop `vercel dev`**

Ctrl+C in the terminal running `vercel dev`. We'll restart it later with env vars set.

- [ ] **Step 4: Commit**

```bash
git add api/cohort-status.js
git commit -m "feat: add /api/cohort-status edge function"
```

---

## Task 4: Build the Stripe webhook receiver

**Files:**
- Create: `api/stripe-webhook.js`

This endpoint receives `checkout.session.completed` events from Stripe and forwards the customer's name + email to the existing Google Apps Script pipeline. **This must be a Node function (not edge)** — Stripe's signature verification needs the raw request body, which is tricky to get right on edge runtimes.

- [ ] **Step 1: Create the webhook handler**

```js
// api/stripe-webhook.js
//
// Stripe webhook receiver. Subscribes to checkout.session.completed.
// Verifies the Stripe signature, extracts the customer's name + email
// from the session, and POSTs to the existing Google Apps Script
// with source='cohort_paid'. The Apps Script handles email send
// and idempotency.
//
// Node runtime (not edge) is required because signature verification
// needs the raw request body. Vercel's default node functions give us
// the raw body via the `req` stream.
//
// Vercel config: this file disables the default body parser so we
// can pass the raw payload to Stripe's verification helper.

import Stripe from 'stripe';

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

  if (!secretKey || !webhookSecret || !appsScriptUrl) {
    console.error('[stripe-webhook] missing env vars');
    res.status(500).json({ error: 'misconfigured' });
    return;
  }

  const stripe = new Stripe(secretKey, { apiVersion: '2024-06-20' });

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
    // Ack other events we happen to receive but don't process.
    res.status(200).json({ received: true, ignored: event.type });
    return;
  }

  const session = event.data.object;

  // Only act on paid sessions (the event also fires for async payment methods
  // that haven't cleared yet — skip those for now).
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

  // Forward to Apps Script. Identical JSON shape to the existing
  // frontend signup pipeline so the script can branch on `source`.
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
      // Still 200 to Stripe — we don't want endless retries on a script
      // hiccup. Real failures should be caught in the Vercel function logs.
    }
  } catch (err) {
    console.error('[stripe-webhook] forward to apps script failed:', err?.message ?? err);
  }

  res.status(200).json({ received: true });
}
```

- [ ] **Step 2: Smoke-check the endpoint exists**

With `vercel dev` running (from Task 3, restart if stopped):
```bash
curl -i -X GET http://localhost:3000/api/stripe-webhook
```

Expected: HTTP 405 with body `{"error":"method not allowed"}`. This just proves the route exists. We can't test the POST path until Stripe is configured (Task 10) and `stripe listen` is forwarding events.

- [ ] **Step 3: Commit**

```bash
git add api/stripe-webhook.js
git commit -m "feat: add /api/stripe-webhook receiver"
```

---

## Task 5: Update the Google Apps Script (manual, outside repo)

**Files:**
- Modify: Google Apps Script attached to the email-collection Google Sheet (info@mvpclub.ai Drive). See `docs/email-workflow.md` for access instructions.

This is a manual step in the Google Apps Script editor — not a code change in this repo. Engineer needs Matt to grant access to the company Google account, or to share an incognito session.

- [ ] **Step 1: Open the script editor**

Follow the steps in `docs/email-workflow.md` ("Deployment Instructions" section): open the Google Sheet in the info@mvpclub.ai Drive, then Extensions → Apps Script (use incognito if there's a redirect loop).

- [ ] **Step 2: Replace `doPost` with the branching version**

Paste over the existing `doPost`:

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

  // Branch on source to send the right email.
  if (data.source === 'cohort_paid') {
    sendCohortPaidEmail(data.email, data.firstName);
  } else if (data.source === 'cohort_waitlist') {
    sendCohortWaitlistEmail(data.email, data.firstName);
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

- [ ] **Step 3: Add `sendCohortPaidEmail` function**

Append below `sendWelcomeEmail`:

```js
function sendCohortPaidEmail(email, firstName) {
  var name = firstName || "there";
  var subject = "You're in. Welcome to AI Summer Camp Cohort 01.";

  var body = `Hi ${name},

You did it. Cohort 01 of AI Summer Camp is yours.

Here's what's coming:

DATES
Four Fridays: June 5, 12, 19, 26 — 2 to 3 PM ET on Google Meet
Optional Tuesday office hours: 1 to 2 PM ET

WHAT TO DO NOW
Nothing yet. We'll send the Google Meet link and your calendar invites
about a week before Friday June 5. Bring a real problem from your actual
work — Week 1 is about getting Claude into that problem.

WHO ELSE IS COMING
Other working professionals who are good at their jobs and want to be
the AI person on their team. You'll meet them on Day 1.

QUESTIONS
Reply to this email. Matt, Jill, and Ryan all see it.

See you June 5.

—The MVP Club Team
`;

  GmailApp.sendEmail(email, subject, body, {
    name: "The MVP Club Team"
  });
}
```

- [ ] **Step 4: Add `sendCohortWaitlistEmail` function**

Append below `sendCohortPaidEmail`:

```js
function sendCohortWaitlistEmail(email, firstName) {
  var name = firstName || "there";
  var subject = "You're on the AI Summer Camp waitlist";

  var body = `Hi ${name},

You're on the waitlist for AI Summer Camp Cohort 01. Cohort 01 capped
at 15 and filled fast — sorry we couldn't fit you in this round.

If a seat opens before June 5 (someone refunds, life happens), we'll
email you immediately. Either way, you're first in line for Cohort 02
later this summer.

Want to do something in the meantime? Come hang out in the MVP Club
community while you wait: https://mvp-club.mn.co/ (two-week free trial)
— we run weekly live sessions there with the same coaches.

—The MVP Club Team
`;

  GmailApp.sendEmail(email, subject, body, {
    name: "The MVP Club Team"
  });
}
```

- [ ] **Step 5: Save and test**

In the Apps Script editor: Ctrl+S to save. Then click "Run" with `testFullFlow` selected to confirm the existing path still works (sends a test welcome email to mhasting1066@gmail.com per the existing test function).

- [ ] **Step 6: Add a manual test for the new branches**

Add to the bottom of the Apps Script file:

```js
function testCohortPaidEmail() {
  sendCohortPaidEmail("mhasting1066@gmail.com", "Matt");
}

function testCohortWaitlistEmail() {
  sendCohortWaitlistEmail("mhasting1066@gmail.com", "Matt");
}
```

Run each manually in the Apps Script editor. Verify both emails arrive at mhasting1066@gmail.com.

- [ ] **Step 7: Save**

No deployment step needed — Apps Script web-app deployments use the existing endpoint URL. Code changes take effect immediately on subsequent POSTs.

> No git commit for this task — the change lives in Google's infrastructure, not the repo. Documenting it in `docs/email-workflow.md` happens in Task 12.

---

## Task 6: Build the cohort waitlist overlay

**Files:**
- Create: `src/components/cohort/CohortWaitlistOverlay.jsx`

Modeled on the existing `src/WaitlistOverlay.jsx` pattern. Open the existing file to crib visual styling — but don't generalize that component; this is a separate flow with its own copy and source tag.

- [ ] **Step 1: Read the existing WaitlistOverlay for pattern reference**

Run:
```bash
cat src/WaitlistOverlay.jsx
```

Note: the URL constant, the fetch pattern, the localStorage usage, the success state structure. We're mirroring those.

- [ ] **Step 2: Create the cohort waitlist overlay**

```jsx
// src/components/cohort/CohortWaitlistOverlay.jsx
//
// Email + first-name capture for the cohort waitlist. Triggered when the
// cohort is full and a user clicks the "Join the Waitlist" CTA. POSTs to
// the existing Google Apps Script pipeline with source='cohort_waitlist'.
// The script writes a row and sends the waitlist confirmation email.

import React, { useState } from 'react';
import { COHORT } from '../../data/cohort.ts';

// Same endpoint as the existing SignupOverlay / WaitlistOverlay components.
// Documented in docs/email-workflow.md.
const APPS_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbyNGVQSbxcSDZUf5K-2sWrnqdy08GE9BkPw8C0K1qRzMXnZVLVMBS6ggH4QnLZCOtBo/exec';

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
      // Match the existing src/WaitlistOverlay.jsx pattern exactly:
      // no-cors + application/json. We can't read the response (opaque),
      // so we treat both success and error as submitted — the row will
      // appear in the sheet either way. This is the established convention.
      await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName,
          email,
          timestamp: new Date().toISOString(),
          source: 'cohort_waitlist',
        }),
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
      // no-cors opaque responses can't surface errors; assume submitted.
      // (Matches WaitlistOverlay.jsx behavior.)
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
git commit -m "feat: add CohortWaitlistOverlay component"
```

---

## Task 7: Build the dual-state CTA component

**Files:**
- Create: `src/components/cohort/CohortCTA.jsx`

The component fetches `/api/cohort-status` on mount and renders either a Stripe Payment Link or a "Join the Waitlist" button based on the response. It takes a `variant` prop so it can wear two different visual skins — the hero deal card uses `"hero"` (orange filled), the closing postcard uses `"postcard"` (navy filled).

- [ ] **Step 1: Create the component**

```jsx
// src/components/cohort/CohortCTA.jsx
//
// Single CTA that switches between Stripe Payment Link (when seats remain)
// and a waitlist overlay (when cohort is full). Used by AISummerCampPage
// in two locations (hero deal card + closing postcard) — the `variant` prop
// switches visual styling, the underlying logic is shared.
//
// Fetches /api/cohort-status on mount. If the request fails or times out,
// the page falls back to the 'open' state — we'd rather show a Reserve CTA
// to a small number of late buyers (who'd then hit Stripe's sold-out page)
// than block real paying customers because of an infrastructure hiccup.

import React, { useEffect, useState } from 'react';
import { COHORT } from '../../data/cohort.ts';
import CohortWaitlistOverlay from './CohortWaitlistOverlay.jsx';

export default function CohortCTA({ variant, location }) {
  const [status, setStatus] = useState('open');     // optimistic default
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
        // Fail open
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

  // While loading, render the optimistic "open" CTA — don't flash a spinner.
  // The 60s edge cache means most visits resolve instantly anyway.
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

  // 'postcard' variant
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

## Task 8: Wire CohortCTA into the camp page

**Files:**
- Modify: `src/pages/AISummerCampPage.jsx`

- [ ] **Step 1: Remove the placeholder URL constant and the tracking helper**

Open `src/pages/AISummerCampPage.jsx`. Lines 1–17 currently look like:

```jsx
import React from 'react';
import AnimatedSection from '../components/shared/AnimatedSection';
import '../styles/ai-summer-camp.css';

// TODO: Matt will provide the real registration URL (Google Form / Stripe / Mighty Networks).
// When ready, swap this single constant.
const REGISTRATION_URL = '#';

const trackRegistrationClick = (location) => {
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'cohort_registration_click', {
      event_category: 'conversion',
      event_label: location,
      link_url: REGISTRATION_URL,
    });
  }
};

const AISummerCampPage = () => {
```

Replace lines 1–18 with:

```jsx
import React from 'react';
import AnimatedSection from '../components/shared/AnimatedSection';
import CohortCTA from '../components/cohort/CohortCTA.jsx';
import '../styles/ai-summer-camp.css';

const AISummerCampPage = () => {
```

- [ ] **Step 2: Replace the hero deal-card CTA**

Find the block in the hero (currently lines 87–96 — `<a href={REGISTRATION_URL} ... className="asc-deal-button"> Reserve Your Spot →</a>` followed by `<div className="asc-deal-finepoint">Registration closes when full.</div>`):

```jsx
            <a
              href={REGISTRATION_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackRegistrationClick('hero_deal')}
              className="asc-deal-button"
            >
              Reserve Your Spot →
            </a>
            <div className="asc-deal-finepoint">Registration closes when full.</div>
```

Replace with:

```jsx
            <CohortCTA variant="hero" location="hero_deal" />
```

(The CohortCTA component renders both the button and the fine-point text.)

- [ ] **Step 3: Replace the closing-postcard CTA**

Find the block in the closing postcard (currently lines 372–380 — `<a href={REGISTRATION_URL} ... className="asc-postcard-cta"> Save My Seat →</a>`):

```jsx
              <a
                href={REGISTRATION_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackRegistrationClick('closing_postcard')}
                className="asc-postcard-cta"
              >
                Save My Seat →
              </a>
```

Replace with:

```jsx
              <CohortCTA variant="postcard" location="closing_postcard" />
```

- [ ] **Step 4: Verify the page still renders**

Run:
```bash
npm run dev
```

Visit `http://localhost:4321/ai-summer-camp` in a browser.

Expected:
- Hero deal card shows "Reserve Your Spot →" with the existing orange styling. Fine-point line below it says "Registration closes when full."
- Closing postcard shows "Save My Seat →" with the existing navy styling.
- Browser console: no errors. Network tab: a GET to `/api/cohort-status` may show 404 because `npm run dev` is Astro-only and doesn't run the API endpoints — that's expected at this stage, the component falls back to optimistic 'open'.

> The full Stripe link won't work yet because `cohort.ts` has a placeholder URL. That gets fixed in Task 10.

- [ ] **Step 5: Stop dev server and commit**

Ctrl+C, then:
```bash
git add src/pages/AISummerCampPage.jsx
git commit -m "feat: replace inline CTAs with CohortCTA in AISummerCampPage"
```

---

## Task 9: Build the welcome (post-payment) page

**Files:**
- Create: `src/pages/ai-summer-camp/welcome.astro`

Fully static. No client-side fetches, no `session_id` reading, no email firing. The webhook handles the email; this page is the visual "you made it in" confirmation.

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

Expected: a clean "You're in" landing page with cohort details, no errors in the browser console.

- [ ] **Step 3: Stop dev server and commit**

Ctrl+C, then:
```bash
git add src/pages/ai-summer-camp/welcome.astro
git commit -m "feat: add /ai-summer-camp/welcome static landing page"
```

---

## Task 10: Configure Stripe (manual, needs Matt's account)

This is dashboard configuration in Stripe — needs Matt's account access. Matt will provide credentials or run the steps interactively.

- [ ] **Step 1: Get into Stripe**

Matt: log in to https://dashboard.stripe.com (or grant access to the engineer for this session). Confirm you're in the **right account** — the receipt/payout email should match what mvpclub.ai uses for billing.

- [ ] **Step 2: Create the test-mode product**

Toggle to **test mode** (toggle in top right of Stripe dashboard).

Products → Add a product:
- **Name:** `MVP Club AI Summer Camp — Cohort 01`
- **Description:** `A guided 4-week program for working professionals. Four Fridays in June 2026 — June 5, 12, 19, 26 — 2–3 PM ET on Google Meet.`
- **Price:** `99 USD`, **one-time**
- **Metadata:** add `cohort` = `cohort_01`
- Save

Copy the **Product ID** (looks like `prod_QwertyAbcd1234`) — you'll need it for env vars.

- [ ] **Step 3: Set inventory cap to 15**

Open the product → Pricing tab → Manage inventory (or in newer Stripe UI: "Limit purchases of this product to a set number"). Set the limit to `15`.

> If your Stripe account doesn't expose product-level inventory caps, use the equivalent setting on the Payment Link (Stripe sometimes scopes inventory to the Payment Link rather than the product). The behavior is the same — at 15 paid sessions the link self-disables.

- [ ] **Step 4: Create the Payment Link**

Stripe dashboard → Payment Links → New:
- **Product:** select the one you just made
- **Confirmation page:** "After payment, redirect customers to your website"
- **Redirect URL:** `http://localhost:3000/ai-summer-camp/welcome` (test mode allows HTTP localhost)
- **Customer information:** Collect name and email (Stripe checks "always collect email" by default; check the name box too)
- **Receipt:** Add a custom message: `Welcome to AI Summer Camp Cohort 01! You'll get a separate welcome email from us shortly with what to expect. — The MVP Club Team`

Save and copy the **Payment Link URL** (looks like `https://buy.stripe.com/test_aBcD1234...`).

- [ ] **Step 5: Update cohort.ts with the test values**

For now, paste the test-mode product ID and Payment Link URL into `src/data/cohort.ts` so local dev works:

```ts
stripeProductId: 'prod_QwertyAbcd1234',  // test mode
stripePaymentLinkUrl: 'https://buy.stripe.com/test_aBcD1234...',  // test mode
```

> We'll swap these for the live values via env-var override (Step 9 of this task) or a separate `cohort.ts` edit immediately before pushing to prod.

- [ ] **Step 6: Configure the test-mode webhook**

Stripe dashboard (still in test mode) → Developers → Webhooks → Add endpoint:
- **Endpoint URL:** for local testing we'll use the Stripe CLI in Task 13. For a Vercel preview deploy, the URL would be `https://<your-preview-deployment>.vercel.app/api/stripe-webhook`. **Skip adding a hosted endpoint for now** — we'll use Stripe CLI's `stripe listen` in Task 13 instead.

If you want a permanent test endpoint anyway (e.g., for preview branch testing), add it here and subscribe to `checkout.session.completed`. Copy the **signing secret** (`whsec_...`).

- [ ] **Step 7: Get the test secret key**

Stripe dashboard → Developers → API keys → reveal the **Secret key** (`sk_test_...`). Copy it.

- [ ] **Step 8: Repeat for LIVE mode (do not skip this — but defer the link until you're ready to launch)**

Toggle to **live mode** in Stripe. Repeat steps 2–4:
- Same product, same price, same inventory cap (15).
- Payment Link redirect URL: `https://www.mvpclub.ai/ai-summer-camp/welcome` (HTTPS required for live).
- Same receipt message.
- For the live webhook endpoint, **add** an endpoint at `https://www.mvpclub.ai/api/stripe-webhook` subscribing to `checkout.session.completed`. Copy the live signing secret.
- Copy the live product ID, Payment Link URL, and `sk_live_...` secret key.

> You'll wire these into Vercel production env vars in Task 11.

- [ ] **Step 9: Commit the cohort.ts update**

```bash
git add src/data/cohort.ts
git commit -m "config: wire real Stripe product ID and Payment Link in cohort.ts"
```

---

## Task 11: Set up environment variables and .env.example

**Files:**
- Create: `.env.example` (committed)
- Create / update: `.env` (local, **not committed** — add to `.gitignore` if not already)
- Configure: Vercel project environment variables (dashboard)

- [ ] **Step 1: Confirm .env is gitignored**

Run:
```bash
git check-ignore .env
```

Expected: prints `.env` (meaning it IS ignored). If it prints nothing, add `.env` to `.gitignore` and commit that.

- [ ] **Step 2: Create .env.example**

```bash
# .env.example
#
# Local development environment variables. Copy to `.env` and fill in.
# Vercel reads these from the project's Environment Variables settings
# in production and preview deployments.

# Stripe — get from https://dashboard.stripe.com/test/apikeys (test) or
# https://dashboard.stripe.com/apikeys (live)
STRIPE_SECRET_KEY=sk_test_REPLACE_ME

# Stripe webhook signing secret — for local dev, this is printed by
# `stripe listen --forward-to localhost:3000/api/stripe-webhook`.
# For deployed environments, copy from the webhook endpoint settings.
STRIPE_WEBHOOK_SECRET=whsec_REPLACE_ME

# Cohort product ID from the Stripe dashboard (Products → your product → ID)
COHORT_01_PRODUCT_ID=prod_REPLACE_ME

# Google Apps Script web app URL (already in use by frontend components).
# See docs/email-workflow.md.
APPS_SCRIPT_URL=https://script.google.com/macros/s/AKfycbyNGVQSbxcSDZUf5K-2sWrnqdy08GE9BkPw8C0K1qRzMXnZVLVMBS6ggH4QnLZCOtBo/exec
```

- [ ] **Step 3: Create local .env**

```bash
cp .env.example .env
```

Fill in the test-mode values from Task 10 steps 2, 7, and skip `STRIPE_WEBHOOK_SECRET` for now (we'll get it from `stripe listen` in Task 13).

- [ ] **Step 4: Add the Vercel project env vars**

In the Vercel dashboard for the project → Settings → Environment Variables, add for **Preview** environment:
- `STRIPE_SECRET_KEY` = test mode key (`sk_test_...`)
- `STRIPE_WEBHOOK_SECRET` = test mode webhook secret (only needed if you set up a permanent test webhook in Task 10 step 6 — otherwise skip)
- `COHORT_01_PRODUCT_ID` = test mode product ID
- `APPS_SCRIPT_URL` = the existing URL

For **Production** environment, add the **live** equivalents:
- `STRIPE_SECRET_KEY` = `sk_live_...`
- `STRIPE_WEBHOOK_SECRET` = live webhook signing secret (from Task 10 step 8)
- `COHORT_01_PRODUCT_ID` = live product ID
- `APPS_SCRIPT_URL` = same URL

> Vercel scopes env vars by environment — test keys never leak into production deploys.

- [ ] **Step 5: Commit .env.example**

```bash
git add .env.example
git commit -m "config: add .env.example for cohort signup env vars"
```

---

## Task 12: Document the changes in email-workflow.md

**Files:**
- Modify: `docs/email-workflow.md`

- [ ] **Step 1: Add the two new source values to the sources table**

In `docs/email-workflow.md`, find the table under "Frontend Components" / "How Each Component Works" / "Data Sent to Script" — the part that lists `source` values. Add two new rows / values:

```
| cohort_paid     | Server-side (Vercel webhook) | Fired by api/stripe-webhook.js after a successful Stripe Checkout for the AI Summer Camp cohort. |
| cohort_waitlist | CohortWaitlistOverlay        | Fired when the cohort is full and a user submits the waitlist form on /ai-summer-camp. |
```

- [ ] **Step 2: Document the updated doPost branching**

Replace the old Apps Script code sample in `docs/email-workflow.md` with the new branching version from Task 5 (steps 2–4). Note in the doc: "The script now branches on the `source` field to send different emails. `cohort_paid` and `cohort_waitlist` were added 2026-05-21."

- [ ] **Step 3: Add a change-log entry**

In the "Change Log" table at the bottom, add:

```
| 2026-05-21 | Added cohort_paid and cohort_waitlist branches to doPost. New idempotency check via alreadyRecorded() helper. Triggered by api/stripe-webhook.js (cohort_paid) and CohortWaitlistOverlay.jsx (cohort_waitlist). |
```

- [ ] **Step 4: Commit**

```bash
git add docs/email-workflow.md
git commit -m "docs: document cohort signup sources in email-workflow.md"
```

---

## Task 13: Local end-to-end test

**Files:** none — verification only.

This is the test the user explicitly asked for: spin up the full flow on localhost and prove it works.

- [ ] **Step 1: Reset local env**

Confirm `.env` has `STRIPE_SECRET_KEY` (test mode) and `COHORT_01_PRODUCT_ID` (test mode) and `APPS_SCRIPT_URL`. Leave `STRIPE_WEBHOOK_SECRET` blank for now.

- [ ] **Step 2: Start vercel dev**

Terminal 1:
```bash
vercel dev --listen 3000
```

Wait until it prints `Ready! Available at http://localhost:3000`.

- [ ] **Step 3: Start the Stripe webhook listener**

Terminal 2:
```bash
stripe listen --forward-to localhost:3000/api/stripe-webhook
```

Stripe CLI prints a webhook signing secret on startup (`whsec_...`). Copy it.

- [ ] **Step 4: Add the webhook secret and restart vercel dev**

In `.env`, set `STRIPE_WEBHOOK_SECRET` to the value from Step 3.

Restart `vercel dev` (Ctrl+C in terminal 1, run again) so it picks up the updated env var.

- [ ] **Step 5: Verify status endpoint with real Stripe data**

Terminal 3:
```bash
curl http://localhost:3000/api/cohort-status
```

Expected: `{"status":"open","remaining":15}` — no `fallback: true` flag this time, since the env vars are wired.

- [ ] **Step 6: Walk the happy path**

In a browser:
1. Visit `http://localhost:3000/ai-summer-camp`. CTA should say "Reserve Your Spot →".
2. Click it. Land on Stripe Checkout (test mode).
3. Pay with `4242 4242 4242 4242`, any future expiry (e.g., `12/34`), any CVC (`123`).
4. Get redirected to `http://localhost:3000/ai-summer-camp/welcome`. Verify the page shows cohort dates.

- [ ] **Step 7: Verify the webhook fired and the email sent**

In Terminal 2 (Stripe CLI), look for the line `--> checkout.session.completed [evt_...]` and `<-- [200] POST http://localhost:3000/api/stripe-webhook`.

In Terminal 1 (vercel dev), no errors logged from the webhook handler.

Open the email-collection Google Sheet (Drive → info@mvpclub.ai). The most recent row should have your test email + `cohort_paid` in column D.

Check the inbox of the test card's billing email (you'll have set this in Stripe Checkout). Two emails should arrive:
- Stripe receipt (automatic).
- Custom "You're in. Welcome to AI Summer Camp Cohort 01." from info@mvpclub.ai.

- [ ] **Step 8: Verify capacity decremented**

```bash
curl http://localhost:3000/api/cohort-status
```

Expected: `{"status":"open","remaining":14}`.

> If you still see `remaining: 15`, wait 60 seconds for the edge cache to expire, or restart `vercel dev` to clear it.

- [ ] **Step 9: Test the waitlist path**

To exercise the full-cohort branch without buying 14 more test seats: temporarily edit `src/data/cohort.ts` and change `capacity: 15` to `capacity: 1`. Hot-reload the page.

`http://localhost:3000/api/cohort-status` should now return `{"status":"full","remaining":0}`.

`http://localhost:3000/ai-summer-camp` should now show "Cohort full — join the waitlist →" in both CTA locations.

Click the waitlist CTA → overlay opens. Submit with a test name + email.

Verify:
- The overlay flips to the "You're on the list" success state.
- The Google Sheet has a new row with `cohort_waitlist` in column D.
- The test email inbox receives the "You're on the AI Summer Camp waitlist" email.

- [ ] **Step 10: Restore capacity and tear down**

Edit `src/data/cohort.ts` back to `capacity: 15`. Do NOT commit this — Task 10 already committed the file with capacity 15.

Stop terminals 1 and 2 (Ctrl+C in each).

- [ ] **Step 11: Final sanity commit (only if any docs changed during testing)**

If you discovered edge cases during testing that warrant additions to the spec or plan, commit them. Otherwise, this task produces no commit — verification only.

---

## Going to production (post-implementation)

Once Tasks 1–13 are done and e2e tested, going live is a config flip — not a code change:

1. In Vercel, confirm the **production** environment vars are populated with the **live** Stripe values (Task 11 Step 4).
2. In Stripe (live mode), confirm the webhook endpoint `https://www.mvpclub.ai/api/stripe-webhook` is created and subscribed to `checkout.session.completed`.
3. Edit `src/data/cohort.ts` to use the **live** Payment Link URL (`https://buy.stripe.com/...` without `test_` in the path) and the **live** product ID. Commit and push.
4. Vercel auto-deploys to production. Watch the first paid signup come through (it'll be Matt, probably).

---

## Self-review

**Spec coverage:** Walked through `2026-05-21-cohort-signup-flow-design.md` section by section.

- ✅ FCFS selection model → enforced by Stripe inventory + cohort-status check.
- ✅ Stripe Payment Link → Task 10 creates it; Task 8 wires it via `CohortCTA`.
- ✅ Dual-state CTA → Task 7 `CohortCTA.jsx`.
- ✅ `/api/cohort-status` (cached, fail-open) → Task 3.
- ✅ `/api/stripe-webhook` (signature verify, forward to Apps Script) → Task 4.
- ✅ Apps Script branches + idempotency → Task 5.
- ✅ Waitlist overlay → Task 6.
- ✅ Welcome page (static) → Task 9.
- ✅ `src/data/cohort.ts` config → Task 2.
- ✅ Modify `AISummerCampPage.jsx` → Task 8.
- ✅ Stripe dashboard config → Task 10.
- ✅ Vercel env vars + `.env.example` → Task 11.
- ✅ `docs/email-workflow.md` update → Task 12.
- ✅ Local e2e test plan → Task 13.

**Placeholder scan:** No "TBD"/"TODO"/"implement later" in any task. Replace-me strings in code samples (`prod_REPLACE_ME...`) are deliberate placeholders that get filled by Task 10.

**Type consistency:**
- `COHORT.stripePaymentLinkUrl` used consistently in Task 2 (defined), Task 7 (consumed in CohortCTA).
- `COHORT.label`, `COHORT.fridaysFormatted`, `COHORT.timeET`, `COHORT.officeHoursET` all defined in Task 2 and consumed in Task 9 (welcome.astro).
- `cohort_paid` / `cohort_waitlist` source strings consistent across Task 4 (webhook), Task 5 (Apps Script), Task 6 (waitlist overlay), Task 12 (docs).
- `CohortStatus` exported from cohort.ts (Task 2) — not consumed directly yet, but available for future typing of the API response.

**Out-of-repo step ordering:** Task 5 (Apps Script) and Task 10 (Stripe dashboard) require Matt's account access. They sit between code tasks deliberately so the engineer can pause and coordinate. Task 13 (e2e) is the final verification.
