import React from 'react';
import { Wrench, Users, Rocket, Calendar, CheckCircle2 } from 'lucide-react';
import AnimatedSection from '../components/shared/AnimatedSection';

const trackJoinClick = (location) => {
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'join_community_click', {
      event_category: 'conversion',
      event_label: location,
      link_url: 'https://mvp-club.mn.co/',
    });
  }
};

const CommunityPage = () => {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-background)', fontFamily: 'Inter, system-ui, sans-serif' }}>

      {/* Hero Section */}
      <section className="pt-32 py-24" style={{ backgroundColor: 'var(--color-background)' }}>
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <h1 className="font-display text-4xl md:text-5xl mb-6 max-w-3xl" style={{ color: 'var(--color-primary)' }}>
              Build Real AI Skills With a Community That Gets It
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl leading-relaxed">
              AI is changing how we work — but figuring it out alone is slow and frustrating.
              The MVP Club is a community of practitioners who learn by doing: exploring new tools together,
              helping each other through real projects, and sharing what they're building with AI.
            </p>
            <a
              href="https://mvp-club.mn.co/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackJoinClick('community_hero')}
              className="inline-block px-8 py-4 rounded-lg font-semibold transition-all duration-200 hover:scale-105"
              style={{ backgroundColor: 'var(--color-secondary)', color: 'white', textDecoration: 'none' }}
            >
              Join the Community
            </a>
          </AnimatedSection>
        </div>
      </section>

      {/* Weekly Events Section */}
      <section className="py-24" style={{ backgroundColor: 'white' }}>
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <div className="flex items-center gap-3 mb-4">
              <Calendar size={24} style={{ color: 'var(--color-secondary)' }} />
              <p
                className="text-lg font-semibold uppercase tracking-wider"
                style={{ color: 'var(--color-secondary)' }}
              >
                Weekly Events
              </p>
            </div>
            <h2 className="font-display text-3xl md:text-4xl mb-4 max-w-2xl" style={{ color: 'var(--color-primary)' }}>
              Something Happening Every Week
            </h2>
            <p className="text-lg text-gray-600 mb-12 max-w-2xl leading-relaxed">
              This isn't a course you watch alone. It's a community you show up to.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: Wrench,
                title: 'New Tool Exploration Mondays',
                desc: 'Every Monday we dive into the latest AI tools together. No one has to figure them out alone — we explore side by side, share what works, and skip what doesn\'t.',
              },
              {
                icon: Users,
                title: 'Getting Unstuck Sessions',
                desc: 'Hosted during the workday for practical help on real projects. Bring your actual work, get hands-on guidance from the community, and leave with a solution.',
              },
              {
                icon: Rocket,
                title: 'Build in Public Wednesdays',
                desc: 'Share and demo what you\'re building with AI. See how others are using these tools in their work. Get feedback, steal ideas, and stay inspired.',
              }
            ].map((event, i) => (
              <AnimatedSection key={i} delay={i * 100}>
                <div className="card-hover bg-white border border-gray-100 p-8 rounded-2xl h-full">
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-6"
                    style={{ backgroundColor: 'var(--color-secondary)' }}
                  >
                    <event.icon size={28} style={{ color: 'white' }} />
                  </div>
                  <h3 className="font-display text-xl mb-3" style={{ color: 'var(--color-primary)' }}>
                    {event.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{event.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* What You Get Section */}
      <section className="py-24" style={{ backgroundColor: 'var(--color-background)' }}>
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <h2 className="font-display text-3xl md:text-4xl mb-12 max-w-2xl" style={{ color: 'var(--color-primary)' }}>
              What You Get as a Member
            </h2>
          </AnimatedSection>
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl">
            {[
              'Weekly live events — tool explorations, getting unstuck sessions, and build demos',
              'A community of practitioners who are actually using AI in their work',
              'Practical help when you\'re stuck on a real project',
              'Early access to new frameworks and approaches we\'re developing',
              'A place to share your wins and learn from others\' experiments',
            ].map((item, i) => (
              <AnimatedSection key={i} delay={i * 50}>
                <div className="flex items-start gap-3">
                  <CheckCircle2 size={20} style={{ color: 'var(--color-secondary)' }} className="flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 leading-relaxed">{item}</span>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24" style={{ backgroundColor: 'var(--color-background)' }}>
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <div
              className="p-8 md:p-12 rounded-2xl text-center"
              style={{ backgroundColor: 'var(--color-secondary)' }}
            >
              <h3 className="font-display text-2xl md:text-3xl text-white mb-4">
                Stop Figuring Out AI Alone
              </h3>
              <p className="text-white/80 mb-8 max-w-xl mx-auto leading-relaxed">
                Join a community of practitioners who are building real skills together —
                through practice, not theory.
              </p>
              <a
                href="https://mvp-club.mn.co/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackJoinClick('community_bottom_cta')}
                className="inline-block px-8 py-4 rounded-lg font-semibold transition-all duration-200 hover:scale-105"
                style={{ backgroundColor: 'var(--color-accent-lifted)', color: 'var(--color-primary)', textDecoration: 'none' }}
              >
                Join the Community
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default CommunityPage;
