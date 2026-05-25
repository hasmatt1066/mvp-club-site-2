import React from 'react';
import AnimatedSection from '../shared/AnimatedSection';

const trackCallout = (label) => {
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'cohort_callout_click', {
      event_category: 'conversion',
      event_label: label,
      link_url: '/ai-summer-camp',
    });
  }
};

const CohortCallout = () => (
  <section
    style={{
      backgroundColor: '#fffbeb',
      borderTop: '1px solid #fed7aa',
      borderBottom: '1px solid #fed7aa',
      padding: '40px 24px',
    }}
  >
    <div className="max-w-6xl mx-auto">
      <AnimatedSection>
        <a
          href="/ai-summer-camp"
          onClick={() => trackCallout('homepage_callout')}
          style={{ textDecoration: 'none', display: 'block' }}
        >
          <div
            className="grid items-center"
            style={{
              gridTemplateColumns: 'auto 1fr auto',
              gap: '32px',
            }}
          >
            {/* LEFT — date stack */}
            <div
              className="hidden md:flex flex-col items-center justify-center"
              style={{
                background: 'white',
                border: '1.5px solid var(--color-primary)',
                borderRadius: '8px',
                padding: '14px 22px',
                minWidth: '96px',
                boxShadow: '0 4px 12px rgba(26,54,93,0.08)',
              }}
            >
              <div
                style={{
                  fontSize: '10px',
                  fontWeight: 700,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'var(--color-accent)',
                }}
              >
                Starts
              </div>
              <div
                style={{
                  fontFamily: 'Zilla Slab, Georgia, serif',
                  fontSize: '36px',
                  lineHeight: 0.95,
                  color: 'var(--color-primary)',
                  marginTop: '2px',
                }}
              >
                Jun 5
              </div>
              <div
                style={{
                  fontSize: '10px',
                  color: '#64748b',
                  marginTop: '4px',
                  letterSpacing: '0.05em',
                }}
              >
                4 Fridays
              </div>
            </div>

            {/* MIDDLE — copy */}
            <div>
              <div
                style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: 'var(--color-accent)',
                  marginBottom: '8px',
                }}
              >
                Now Enrolling &middot; Cohort 01
              </div>
              <h3
                style={{
                  fontFamily: 'Zilla Slab, Georgia, serif',
                  fontSize: 'clamp(22px, 3vw, 30px)',
                  lineHeight: 1.1,
                  color: 'var(--color-primary)',
                  marginBottom: '6px',
                  fontWeight: 400,
                }}
              >
                AI Summer Camp &mdash;{' '}
                <em style={{ color: 'var(--color-secondary)', fontStyle: 'italic' }}>
                  become the AI person at work.
                </em>
              </h3>
              <p
                style={{
                  fontSize: '14.5px',
                  color: '#475569',
                  lineHeight: 1.5,
                  margin: 0,
                }}
              >
                A guided 4-week cohort for working professionals. Live with Claude. Capped at 15.
                <span style={{ color: 'var(--color-secondary)', fontWeight: 600 }}>
                  {' '}
                  $99 &middot; first month of community included.
                </span>
              </p>
            </div>

            {/* RIGHT — CTA */}
            <div
              className="hidden sm:block"
              style={{
                backgroundColor: 'var(--color-accent)',
                color: 'white',
                padding: '14px 26px',
                borderRadius: '8px',
                fontWeight: 600,
                fontSize: '15px',
                whiteSpace: 'nowrap',
                boxShadow: '0 4px 12px rgba(217,119,6,0.25)',
              }}
            >
              Reserve Your Spot &rarr;
            </div>
          </div>

          {/* Mobile CTA — full width below */}
          <div
            className="sm:hidden mt-5"
            style={{
              backgroundColor: 'var(--color-accent)',
              color: 'white',
              padding: '14px',
              borderRadius: '8px',
              fontWeight: 600,
              fontSize: '15px',
              textAlign: 'center',
              boxShadow: '0 4px 12px rgba(217,119,6,0.25)',
            }}
          >
            Reserve Your Spot &rarr;
          </div>
        </a>
      </AnimatedSection>
    </div>
  </section>
);

export default CohortCallout;
