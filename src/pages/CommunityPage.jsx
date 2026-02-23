import React from 'react';
import { Wrench, Users, Rocket, Calendar, CheckCircle2 } from 'lucide-react';
import AnimatedSection from '../components/shared/AnimatedSection';
import SEO from '../components/SEO';

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
      <SEO
        title="Community"
        description="Join the MVP Club community of AI practitioners. Weekly workshops, tool exploration sessions, and a peer network to help you build real AI skills through practice."
        path="/community"
      />

      {/* Hero Section */}
      <section className="pt-32 py-24" style={{ backgroundColor: 'var(--color-background)' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <h1 className="font-display text-4xl md:text-5xl mb-6" style={{ color: 'var(--color-primary)' }}>
                Build Real AI Skills With a Community That Gets It
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
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
                Start Your Free Trial
              </a>
              <p className="text-sm text-gray-500 mt-3">
                2 weeks free, then $20/month. An investment in your career growth — not another free group you'll forget about.
              </p>
            </AnimatedSection>
            <AnimatedSection delay={200}>
              <div className="rounded-2xl overflow-hidden shadow-lg">
                <img
                  src="/community-session-vibe-coding.png"
                  alt="MVP Club members in a live Intro to Vibe Coding session"
                  className="w-full h-auto"
                  loading="eager"
                />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Weekly Events Section */}
      <section className="py-24" style={{ backgroundColor: 'white' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
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
              <h2 className="font-display text-3xl md:text-4xl mb-4" style={{ color: 'var(--color-primary)' }}>
                Something Happening Every Week
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                This isn't a course you watch alone. It's a community you show up to.
              </p>
            </AnimatedSection>
            <AnimatedSection delay={200}>
              <div className="rounded-2xl overflow-hidden shadow-lg">
                <img
                  src="/community-session-demo.png"
                  alt="MVP Club Demo Day — members presenting their AI projects live"
                  className="w-full h-auto"
                />
              </div>
            </AnimatedSection>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
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

      {/* Why $20/month Section */}
      <section className="py-24" style={{ backgroundColor: 'white' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <AnimatedSection>
              <h2 className="font-display text-3xl md:text-4xl mb-6" style={{ color: 'var(--color-primary)' }}>
                $20/month — An Investment in Your Career Growth
              </h2>
              <p className="text-lg font-semibold mb-6" style={{ color: 'var(--color-secondary)' }}>
                Try it free for 2 weeks. No commitment, cancel anytime.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                We charge because it works. People pay attention to what they pay for. Our members show up, engage, and actually build things — because they're invested.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                We've all been in free Slack groups and Discord servers that go quiet after a week. That's not this. $20/month keeps our community active, our events full, and our members getting real value — not just another notification you mute.
              </p>
            </AnimatedSection>
            <AnimatedSection delay={100}>
              <div className="grid sm:grid-cols-3 gap-6">
                {[
                  { stat: '3+', label: 'Live events every week' },
                  { stat: '100%', label: 'Practitioner-led, not lecture-based' },
                  { stat: '$0.66', label: 'Per day for career growth' },
                ].map((item, i) => (
                  <div key={i} className="text-center p-6 rounded-xl" style={{ backgroundColor: 'var(--color-background)' }}>
                    <div className="font-display text-2xl mb-1" style={{ color: 'var(--color-secondary)' }}>
                      {item.stat}
                    </div>
                    <div className="text-sm text-gray-600">{item.label}</div>
                  </div>
                ))}
              </div>
            </AnimatedSection>
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
                Start Your Free Trial
              </a>
              <p className="text-white/60 text-sm mt-3">
                Start with a 2-week free trial. Cancel anytime.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default CommunityPage;
