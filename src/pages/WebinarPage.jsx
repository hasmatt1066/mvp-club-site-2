import React from 'react';
import { Calendar, Clock, Video } from 'lucide-react';
import AnimatedSection from '../components/shared/AnimatedSection';
import SEO from '../components/SEO';

const FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSeVW3k4ouJw5ttXKqlN_qY5l9RtMrZdr5-JeYqFKOP1NKqgWA/viewform?usp=header';

const trackRsvpClick = (label) => {
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'webinar_rsvp_click', {
      event_category: 'conversion',
      event_label: label,
      link_url: FORM_URL,
    });
  }
};

const eventJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Event',
  name: 'MVP Club Live Webinar: AI for Your Work',
  description: "In one hour, you'll build two real AI tools — a spreadsheet that runs scripts and a reusable AI process.",
  startDate: '2026-03-29T16:00:00-04:00',
  endDate: '2026-03-29T17:00:00-04:00',
  eventStatus: 'https://schema.org/EventScheduled',
  eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode',
  location: {
    '@type': 'VirtualLocation',
    url: FORM_URL,
  },
  organizer: {
    '@type': 'Organization',
    name: 'MVP Club',
    url: 'https://mvpclub.ai',
  },
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
    availability: 'https://schema.org/InStock',
    url: FORM_URL,
  },
};

const WebinarPage = () => {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-background)', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <SEO
        title="Live Webinar: AI for Your Work — March 29"
        description="Join MVP Club's free live webinar. In one hour, you'll build two real AI tools — a spreadsheet that runs scripts and a reusable AI process. March 29, 4–5 PM ET."
        path="/webinar"
        jsonLd={eventJsonLd}
      />

      {/* Hero */}
      <section className="pt-32 pb-16" style={{ backgroundColor: 'var(--color-primary)' }}>
        <div className="max-w-5xl mx-auto px-6">
          <AnimatedSection>
            <div className="grid md:grid-cols-5 gap-10 items-start">
              {/* Left column */}
              <div className="md:col-span-3">
                <p
                  className="text-xs font-bold uppercase tracking-[0.2em] mb-6"
                  style={{ color: 'var(--color-accent)' }}
                >
                  MVP Club &middot; Live Webinar
                </p>
                <h1 className="font-display text-4xl md:text-5xl text-white mb-6 leading-tight">
                  Everyone's talking about AI. You still don't know what it means for <em>your</em> work.
                </h1>
                <p className="text-lg text-white/70 leading-relaxed">
                  In one hour, we'll change that. You'll see it. You'll build with it.{' '}
                  <strong className="text-white">Come see what it can do for you!</strong>
                </p>
              </div>

              {/* Right column — logistics card */}
              <div className="md:col-span-2">
                <div
                  className="rounded-xl p-6"
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                >
                  <div className="space-y-5 mb-6">
                    <div className="flex items-center gap-3">
                      <Calendar size={18} style={{ color: 'var(--color-accent)' }} />
                      <div>
                        <div className="text-xs uppercase tracking-wider text-white/40">Date</div>
                        <div className="text-lg font-bold text-white">March 29</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock size={18} style={{ color: 'var(--color-accent)' }} />
                      <div>
                        <div className="text-xs uppercase tracking-wider text-white/40">Time</div>
                        <div className="text-lg font-bold text-white">4 &ndash; 5 PM ET</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Video size={18} style={{ color: 'var(--color-accent)' }} />
                      <div>
                        <div className="text-xs uppercase tracking-wider text-white/40">Format</div>
                        <div className="text-lg font-bold text-white">Live</div>
                      </div>
                    </div>
                  </div>
                  <a
                    href={FORM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackRsvpClick('hero')}
                    className="block w-full text-center px-6 py-4 rounded-lg font-semibold text-white transition-all duration-200 hover:scale-105"
                    style={{ backgroundColor: 'var(--color-accent)', textDecoration: 'none' }}
                  >
                    Save Your Spot
                  </a>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* This is for you if */}
      <section className="py-16" style={{ backgroundColor: 'var(--color-background)' }}>
        <div className="max-w-3xl mx-auto px-6">
          <AnimatedSection>
            <p
              className="text-xs font-semibold uppercase tracking-[0.15em] mb-3"
              style={{ color: 'var(--color-secondary)' }}
            >
              This is for you if
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              You're good at your job but AI still feels like someone else's thing.
              You're not against it — you just{' '}
              <strong style={{ color: 'var(--color-primary)' }}>haven't had your moment yet.</strong>{' '}
              This is that moment.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Community photo */}
      <section className="py-12" style={{ backgroundColor: 'var(--color-background)' }}>
        <div className="max-w-4xl mx-auto px-6">
          <AnimatedSection>
            <div className="rounded-xl overflow-hidden">
              <img
                src="/communitypicture.png"
                alt="MVP Club members in a live vibe coding webinar session"
                className="w-full h-auto"
              />
            </div>
            <p className="text-center text-sm text-gray-500 mt-3">
              A getting-started MVP Club live session
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Two Builds */}
      <section className="py-16" style={{ backgroundColor: 'var(--color-primary)' }}>
        <div className="max-w-5xl mx-auto px-6">
          <AnimatedSection>
            <h2 className="font-display text-3xl md:text-4xl text-white mb-3 leading-tight">
              In one hour, you'll build <span style={{ color: 'var(--color-accent)' }}>two real workplace solutions</span>
            </h2>
            <p className="text-white/50 text-lg mb-10">
              Not demos. Not slides. Tools you'll actually use.
            </p>
          </AnimatedSection>
          <div className="grid md:grid-cols-2 gap-8">
            <AnimatedSection delay={0}>
              <div
                className="rounded-xl p-8 h-full"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.08)',
                  borderLeft: '3px solid var(--color-accent)',
                }}
              >
                <p
                  className="text-xs font-bold uppercase tracking-wider mb-3"
                  style={{ color: 'var(--color-accent)' }}
                >
                  Build 1
                </p>
                <h3 className="font-display text-2xl md:text-3xl text-white mb-3">
                  A spreadsheet that runs scripts
                </h3>
                <p className="text-white/60 text-base leading-relaxed mb-5">
                  Automate part of a workflow you already do.
                </p>
                <p
                  className="text-base italic font-semibold"
                  style={{ color: 'var(--color-accent)' }}
                >
                  "Wait I just made that?"
                </p>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={100}>
              <div
                className="rounded-xl p-8 h-full"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.08)',
                  borderLeft: '3px solid var(--color-accent)',
                }}
              >
                <p
                  className="text-xs font-bold uppercase tracking-wider mb-3"
                  style={{ color: 'var(--color-accent)' }}
                >
                  Build 2
                </p>
                <h3 className="font-display text-2xl md:text-3xl text-white mb-3">
                  A reusable AI process
                </h3>
                <p className="text-white/60 text-base leading-relaxed mb-5">
                  Turn a repeated workflow into something AI runs for you.
                </p>
                <p
                  className="text-base italic font-semibold"
                  style={{ color: 'var(--color-accent)' }}
                >
                  "I can see how this works."
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="py-16" style={{ backgroundColor: 'var(--color-background)' }}>
        <div className="max-w-xl mx-auto px-6 text-center">
          <AnimatedSection>
            <a
              href={FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackRsvpClick('bottom')}
              className="block w-full text-center px-8 py-4 rounded-lg font-semibold text-white text-lg transition-all duration-200 hover:scale-105 mb-4"
              style={{ backgroundColor: 'var(--color-accent)', textDecoration: 'none' }}
            >
              Save Your Spot
            </a>
            <p
              className="font-display italic text-base"
              style={{ color: 'var(--color-secondary)' }}
            >
              Real tools. Real workflows. No slides, no theory.
            </p>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default WebinarPage;
