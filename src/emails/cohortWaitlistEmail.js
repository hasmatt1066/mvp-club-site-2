// src/emails/cohortWaitlistEmail.js
//
// HTML template for the "You're on the waitlist" email.
// Called by api/waitlist-signup.js when the overlay form is submitted.
// Visual source-of-truth: mockups/email-cohort-waitlist.html

import { COHORT } from '../data/cohort.js';

const c = {
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

const FONT_LINK = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Zilla+Slab:ital,wght@0,400;0,500;0,600;1,400;1,500&display=swap';

export function cohortWaitlistEmail({ firstName = 'there' } = {}) {
  const name = String(firstName || 'there');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>You're on the waitlist — MVP Club ${COHORT.label}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="${FONT_LINK}" rel="stylesheet">
</head>
<body style="margin: 0; padding: 40px 16px 80px; background: ${c.bg}; font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; color: ${c.navy}; -webkit-font-smoothing: antialiased;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; background: ${c.surface}; border-radius: 10px; overflow: hidden; box-shadow: 0 20px 50px rgba(26,54,93,0.15); border-collapse: collapse;">
          <tr>
            <td style="padding: 48px 44px 40px;">
              <div style="font-family: 'Zilla Slab', Georgia, serif; font-weight: 500; font-size: 13px; letter-spacing: 0.18em; text-transform: uppercase; color: ${c.navy}; margin-bottom: 36px;">
                <span style="color: ${c.gold}; margin-right: 8px;">&#9733;</span> MVP Club
              </div>

              <div style="font-size: 11px; font-weight: 700; letter-spacing: 0.25em; text-transform: uppercase; color: ${c.teal}; margin-bottom: 14px;">You're on the list</div>
              <h1 style="font-family: 'Zilla Slab', Georgia, serif; font-weight: 400; font-size: 36px; line-height: 1.08; color: ${c.navy}; letter-spacing: -0.015em; margin: 0 0 14px 0;">${COHORT.label} is full.</h1>
              <p style="font-family: 'Zilla Slab', Georgia, serif; font-style: italic; font-size: 18px; color: ${c.teal}; line-height: 1.4; margin: 0 0 32px 0;">Fifteen seats, and they found their people faster than we expected.</p>

              <p style="font-size: 15px; color: ${c.bodyText}; line-height: 1.65; margin: 0 0 18px 0;">Hi ${name},</p>
              <p style="font-size: 15px; color: ${c.bodyText}; line-height: 1.65; margin: 0 0 18px 0;">
                You're on the waitlist for AI Summer Camp ${COHORT.label}. If a seat opens before <strong style="color: ${c.navy};">Friday, June 5</strong> (someone refunds, life happens), we'll email you immediately so you can grab it.
              </p>
              <p style="font-size: 15px; color: ${c.bodyText}; line-height: 1.65; margin: 0 0 18px 0;">Either way, you're first in line for Cohort 02 later this summer. We'll send the registration link to your inbox before it goes anywhere else.</p>
              <p style="font-size: 15px; color: ${c.bodyText}; line-height: 1.65; margin: 0 0 18px 0;">In the meantime: come hang out in the MVP Club community while you wait. We run weekly live sessions there with the same coaches you'd meet in the cohort.</p>

              <div style="margin: 28px 0 20px; text-align: center;">
                <a href="https://mvp-club.mn.co/" style="display: inline-block; padding: 13px 26px; border: 1.5px solid ${c.navy}; border-radius: 6px; background: ${c.surface}; color: ${c.navy}; font-family: 'Inter', sans-serif; font-size: 14px; font-weight: 600; text-decoration: none; letter-spacing: 0.01em;">
                  Try the community <span style="margin-left: 6px; color: ${c.gold};">&rarr;</span>
                </a>
                <div style="margin-top: 10px; font-size: 12.5px; color: ${c.ctaSub}; font-style: italic;">Two-week free trial</div>
              </div>

              <p style="font-size: 15px; color: ${c.bodyText}; line-height: 1.65; margin: 0 0 18px 0;">Questions? Just reply. We read everything.</p>

              <div style="font-family: 'Zilla Slab', Georgia, serif; font-size: 17px; color: ${c.navy}; margin-top: 36px; line-height: 1.3;">Matt, Jill, and Ryan</div>
              <div style="font-size: 12px; color: ${c.muted}; letter-spacing: 0.18em; text-transform: uppercase; font-weight: 600; margin-top: 4px;">MVP Club</div>
            </td>
          </tr>
          <tr>
            <td style="border-top: 1px solid ${c.footerBorder}; padding: 22px 44px; background: ${c.footerBg}; text-align: center;">
              <div style="font-size: 12px; color: ${c.footerText};">
                <a href="https://mvpclub.ai" style="color: ${c.footerText}; text-decoration: none;">mvpclub.ai</a>
                &nbsp;&nbsp;&middot;&nbsp;&nbsp;
                <a href="mailto:info@mvpclub.ai" style="color: ${c.footerText}; text-decoration: none;">info@mvpclub.ai</a>
              </div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
