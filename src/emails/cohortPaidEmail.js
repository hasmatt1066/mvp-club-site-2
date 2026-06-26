// src/emails/cohortPaidEmail.js
//
// HTML template for the "You're in" cohort confirmation email.
// Called by api/stripe-webhook.js after a successful Stripe Checkout.
// Visual source-of-truth: mockups/email-cohort-paid.html
//
// Returns an HTML string (Node-friendly — no JSX, no React Email runtime).
// firstName is the only required parameter; cohort details come from COHORT
// in src/data/cohort.js so rollover is a single-file edit.

import { COHORT } from '../data/cohort.js';

const c = {
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

const FONT_LINK = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Zilla+Slab:ital,wght@0,400;0,500;0,600;1,400;1,500&display=swap';

function detailRow(label, value, isLast) {
  const borderBottom = isLast ? 'none' : `1px solid ${c.divider}`;
  return `
    <tr>
      <td style="padding: 12px 0; border-bottom: ${borderBottom};">
        <table role="presentation" width="100%" style="border-collapse: collapse;">
          <tr>
            <td style="width: 100px; font-size: 10px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: ${c.teal}; vertical-align: middle;">${label}</td>
            <td style="font-size: 15px; color: ${c.navy}; line-height: 1.4;">${value}</td>
          </tr>
        </table>
      </td>
    </tr>
  `;
}

export function cohortPaidEmail({ firstName = 'there' } = {}) {
  const name = String(firstName || 'there');
  const rows = [
    ['Dates', COHORT.fridaysFormatted],
    ['Time', COHORT.timeET],
    ['Office Hrs', `${COHORT.officeHoursET}  (optional)`],
    ['Format', 'Live on Google Meet'],
  ];
  const rowsHtml = rows.map(([label, value], i) => detailRow(label, value, i === rows.length - 1)).join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>You're in — MVP Club ${COHORT.label}</title>
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

              <div style="font-size: 11px; font-weight: 700; letter-spacing: 0.25em; text-transform: uppercase; color: ${c.gold}; margin-bottom: 14px;">You're in</div>
              <h1 style="font-family: 'Zilla Slab', Georgia, serif; font-weight: 400; font-size: 36px; line-height: 1.08; color: ${c.navy}; letter-spacing: -0.015em; margin: 0 0 14px 0;">
                Welcome to <em style="font-style: italic; color: ${c.teal};">${COHORT.label}.</em>
              </h1>
              <p style="font-family: 'Zilla Slab', Georgia, serif; font-style: italic; font-size: 18px; color: ${c.teal}; line-height: 1.4; margin: 0 0 32px 0;">
                Four Fridays in July. You, Claude, and a handful of other working professionals.
              </p>

              <div style="background: ${c.detailsBg}; border-left: 4px solid ${c.gold}; border-radius: 4px; padding: 8px 24px; margin-bottom: 32px;">
                <table role="presentation" width="100%" style="border-collapse: collapse;">
                  ${rowsHtml}
                </table>
              </div>

              <p style="font-size: 15px; color: ${c.bodyText}; line-height: 1.65; margin: 0 0 18px 0;">Hi ${name},</p>
              <p style="font-size: 15px; color: ${c.bodyText}; line-height: 1.65; margin: 0 0 18px 0;">You did it. Your seat in ${COHORT.label} is locked in.</p>
              <p style="font-size: 15px; color: ${c.bodyText}; line-height: 1.65; margin: 0 0 18px 0;">
                What happens next: about a week before <strong style="color: ${c.navy};">Friday, July 10</strong>, we'll send you a Google Meet link and a calendar invite. Until then, please make sure you have downloaded the Claude desktop app and have the minimum Pro subscription.
              </p>
              <p style="font-size: 15px; color: ${c.bodyText}; line-height: 1.65; margin: 0 0 18px 0;">
                One thing worth doing in the meantime: notice a real problem from your actual work. Something you do every week that takes too long, or that you've never quite figured out how to delegate. Week 1 is about getting Claude into that problem with you.
              </p>
              <p style="font-size: 15px; color: ${c.bodyText}; line-height: 1.65; margin: 0 0 18px 0;">Questions? Just reply to this email. Matt, Jill, and Ryan all see it.</p>
              <p style="font-size: 15px; color: ${c.bodyText}; line-height: 1.65; margin: 0 0 18px 0;">See you July 10.</p>

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
