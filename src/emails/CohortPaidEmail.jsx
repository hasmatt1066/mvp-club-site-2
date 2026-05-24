// src/emails/CohortPaidEmail.jsx
//
// React Email template for the "You're in" cohort confirmation email.
// Rendered by api/stripe-webhook.js after a successful Stripe Checkout.
// Visual source-of-truth: mockups/email-cohort-paid.html

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
  divider: '#f1f5f9',
  footerBg: '#fafafa',
  footerBorder: '#e2e8f0',
  footerText: '#94a3b8',
  detailsBg: '#fefcf8',
};

const detailRows = [
  ['Dates', COHORT.fridaysFormatted],
  ['Time', COHORT.timeET],
  ['Office Hrs', `${COHORT.officeHoursET}  (optional)`],
  ['Format', 'Live on Google Meet'],
];

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
              {detailRows.map(([label, value], i) => (
                <Section
                  key={label}
                  style={{
                    padding: '12px 0',
                    borderBottom: i === detailRows.length - 1 ? 'none' : `1px solid ${colors.divider}`,
                  }}
                >
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <tbody>
                      <tr>
                        <td style={{ width: 100, fontSize: 10, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: colors.teal, verticalAlign: 'middle' }}>{label}</td>
                        <td style={{ fontSize: 15, color: colors.navy, lineHeight: 1.4 }}>{value}</td>
                      </tr>
                    </tbody>
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
