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
