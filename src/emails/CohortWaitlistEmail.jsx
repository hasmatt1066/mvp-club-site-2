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
