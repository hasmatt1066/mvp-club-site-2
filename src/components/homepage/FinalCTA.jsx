import React from 'react';
import AnimatedSection from '../shared/AnimatedSection';

const trackJoinClick = (location) => {
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'join_community_click', {
      event_category: 'conversion',
      event_label: location,
      link_url: 'https://mvp-club.mn.co/',
    });
  }
};

const FinalCTA = () => {
  return (
    <section
      id="final-cta"
      className="py-20"
      style={{ backgroundColor: 'var(--color-background)' }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <AnimatedSection>
          <div
            className="max-w-4xl mx-auto text-center bg-white rounded-2xl p-12"
            style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}
          >
            <h2
              className="font-display text-3xl mb-3"
              style={{ color: 'var(--color-primary)' }}
            >
              It's Better to Go Through This Moment Together Than Alone.
            </h2>

            <p className="text-sm text-gray-400 mb-4 italic">
              &mdash; Matt Hastings, Co-Founder
            </p>

            <p className="text-lg text-gray-500 leading-relaxed mb-8 max-w-[500px] mx-auto">
              No pitch deck. No pressure. Just a 15-minute conversation about where you are
              and how we might help.
            </p>

            <div className="flex gap-4 justify-center flex-wrap">
              <a
                href="https://calendly.com/d/cybv-947-s8m/discovery-call"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-8 py-4 rounded-xl text-white font-semibold text-base transition-all duration-200 hover:opacity-90 no-underline"
                style={{
                  backgroundColor: 'var(--color-primary)',
                }}
              >
                Book a Discovery Call
              </a>
              <a
                href="https://mvp-club.mn.co/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackJoinClick('homepage_final_cta')}
                className="inline-block px-8 py-4 rounded-xl font-semibold text-base transition-all duration-200 no-underline"
                style={{
                  backgroundColor: 'transparent',
                  border: '2px solid var(--color-primary)',
                  color: 'var(--color-primary)',
                }}
              >
                Join the Community — Free for 2 Weeks
              </a>
            </div>

            <p className="text-gray-400 text-sm mt-6">
              Prefer email?{' '}
              <a
                href="mailto:info@mvpclub.ai"
                className="font-medium underline transition-colors"
                style={{ color: 'var(--color-primary)' }}
              >
                info@mvpclub.ai
              </a>
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default FinalCTA;
