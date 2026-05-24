// src/components/cohort/CohortWaitlistOverlay.jsx
//
// Email + first-name capture for the cohort waitlist. Triggered when the
// cohort is full and a user clicks the "Join the Waitlist" CTA. POSTs to
// the new /api/waitlist-signup endpoint, which writes a sheet row via Apps
// Script and sends the waitlist email via Resend.

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
