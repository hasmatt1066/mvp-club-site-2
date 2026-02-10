import React from 'react';
import AnimatedSection from '../shared/AnimatedSection';

const caseStudies = [
  {
    badge: 'Enterprise Engagement',
    badgeColor: 'var(--color-primary)',
    borderColor: 'var(--color-primary)',
    avatarBg: 'var(--color-primary)',
    avatarText: 'DE',
    title: 'Dual Enroll',
    description:
      'Ran a six-week embedded coaching engagement with a multi-team organization. Coached individuals through real AI adoption \u2014 from skepticism to building workflows they use every day.',
    attribution: 'Multi-team AI adoption & coaching sprint',
  },
  {
    badge: 'AI-Powered Solution',
    badgeColor: 'var(--color-accent)',
    borderColor: 'var(--color-secondary)',
    avatarBg: 'var(--color-secondary)',
    avatarText: 'NM',
    title: 'NMDP',
    description:
      'Built a massive warm lead database researcher solution powered by Claude Code. Delivered a production tool that transformed how the team identifies and qualifies leads.',
    attribution: 'Custom AI solution build with Claude Code',
  },
  {
    badge: 'Community Results',
    badgeColor: 'var(--color-primary-lifted)',
    borderColor: 'var(--color-accent)',
    avatarBg: 'var(--color-accent)',
    avatarText: 'MC',
    title: 'Community Members',
    description:
      'Dozens and dozens of community members going from Claude-curious to vibe coding and deploying real applications. iOS apps, business tools, games, consulting sites \u2014 built by non-technical people.',
    attribution: 'From curious to deploying real apps',
  },
];

const SocialProof = () => {
  return (
    <section
      id="social-proof"
      className="py-20"
      style={{ backgroundColor: 'white' }}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <AnimatedSection>
          <div className="text-center mb-12">
            <p
              className="text-xs font-semibold uppercase tracking-[0.15em] mb-3"
              style={{ color: 'var(--color-secondary)' }}
            >
              Real work, real results
            </p>
            <h2
              className="font-display text-3xl"
              style={{ color: 'var(--color-primary)' }}
            >
              What We've Been Building
            </h2>
          </div>
        </AnimatedSection>

        {/* Case study cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-[1100px] mx-auto">
          {caseStudies.map((study, index) => (
            <AnimatedSection key={study.title} delay={index * 100}>
              <div
                className="rounded-2xl p-8 relative transition-all duration-300 hover:-translate-y-1"
                style={{
                  backgroundColor: 'white',
                  boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
                  borderLeft: `4px solid ${study.borderColor}`,
                }}
              >
                {/* Badge */}
                <p
                  className="text-[0.7rem] font-semibold uppercase tracking-[0.1em] mb-3"
                  style={{ color: study.badgeColor }}
                >
                  {study.badge}
                </p>

                {/* Title */}
                <h3
                  className="font-display text-xl mb-3"
                  style={{ color: 'var(--color-primary)' }}
                >
                  {study.title}
                </h3>

                {/* Description */}
                <p className="text-[0.95rem] text-gray-500 leading-relaxed mb-4">
                  {study.description}
                </p>

                {/* Attribution */}
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm"
                    style={{ backgroundColor: study.avatarBg }}
                  >
                    {study.avatarText}
                  </div>
                  <div>
                    <div
                      className="font-semibold text-sm"
                      style={{ color: 'var(--color-primary)' }}
                    >
                      {study.title}
                    </div>
                    <div className="text-xs text-gray-400">
                      {study.attribution}
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
