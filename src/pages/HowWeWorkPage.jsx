import React from 'react';
import { X, ArrowRight, Users, Zap, Target, RefreshCw, Compass, Sparkles, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ClientOnly } from 'vite-react-ssg';
import AnimatedSection from '../components/shared/AnimatedSection';
import AnimatedValley from '../AnimatedValley';
import WorkLoop from '../WorkLoop';

const HowWeWorkPage = () => {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-background)', fontFamily: 'Inter, system-ui, sans-serif' }}>

      {/* Page Header */}
      <section className="py-24 pt-32" style={{ backgroundColor: 'var(--color-primary)' }}>
        <div className="max-w-7xl mx-auto px-6">
          <p
            className="text-lg font-semibold uppercase tracking-wider mb-4"
            style={{ color: 'var(--color-accent-lifted)' }}
          >
            Our Approach
          </p>
          <h1 className="font-display text-4xl md:text-5xl text-white mb-6">
            How We Work
          </h1>
          <p className="text-lg max-w-2xl leading-relaxed" style={{ color: 'rgba(255,255,255,0.8)' }}>
            The gap between having AI tools and getting real value from them isn't technical — it's human. Here's how we bridge it.
          </p>
        </div>
      </section>

      {/* Problem Section */}
      <section id="problem" className="py-24" style={{ backgroundColor: 'var(--color-background)' }}>
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <p
                className="text-lg font-semibold uppercase tracking-wider mb-4"
                style={{ color: 'var(--color-secondary)' }}
              >
                The AI Adoption Gap
              </p>
              <h2 className="font-display text-3xl md:text-4xl mb-6" style={{ color: 'var(--color-primary)' }}>
                You Have the Tools. Where's the Transformation?
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Organizations are investing heavily in AI-and getting surprisingly little in return.
                Not because the technology isn't ready. Because the approach is wrong.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              {
                stat: '95%',
                label: 'of AI projects fail to deliver ROI',
                subtext: 'Most see zero measurable bottom-line impact',
                color: 'var(--color-accent-soft)',
                source: 'MIT Project NANDA, 2025',
                link: 'https://mlq.ai/media/quarterly_decks/v0.1_State_of_AI_in_Business_2025_Report.pdf'
              },
              {
                stat: '42%',
                label: 'of companies abandoned AI initiatives',
                subtext: 'Up from just 17% in 2024—a 147% increase',
                color: 'var(--color-accent)',
                source: 'S&P Global Market Intelligence, 2025',
                link: 'https://www.spglobal.com/market-intelligence/en/news-insights/research/ai-experiences-rapid-adoption-but-with-mixed-outcomes-highlights-from-vote-ai-machine-learning'
              },
              {
                stat: '89%',
                label: 'of workers worry about AI impact on job security',
                subtext: 'Employee anxiety driving hesitation to adopt',
                color: 'var(--color-secondary)',
                source: 'Resume Now AI Disruption Report, 2025',
                link: 'https://www.resume-now.com/job-resources/careers/ai-disruption-report'
              }
            ].map((item, i) => (
              <AnimatedSection key={i} delay={i * 100}>
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block card-hover p-8 rounded-2xl text-center transition-all duration-200"
                  style={{ backgroundColor: 'white', textDecoration: 'none' }}
                >
                  <div
                    className="font-display text-5xl mb-3"
                    style={{ color: item.color }}
                  >
                    {item.stat}
                  </div>
                  <div className="font-semibold mb-2" style={{ color: 'var(--color-primary)' }}>
                    {item.label}
                  </div>
                  <div className="text-sm text-gray-500 mb-3">{item.subtext}</div>
                  <div className="text-xs text-gray-400 italic">Source: {item.source}</div>
                </a>
              </AnimatedSection>
            ))}
          </div>

          {/* The Real Pressure */}
          <AnimatedSection>
            <div className="text-center max-w-3xl mx-auto my-16">
              <h3 className="font-display text-2xl md:text-3xl mb-6" style={{ color: 'var(--color-primary)' }}>
                The Real Pressure: Doing More With Less
              </h3>
              <div className="grid md:grid-cols-2 gap-6 text-left">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ backgroundColor: 'var(--color-accent)' }}
                    >
                      <span className="text-white text-xs font-bold">!</span>
                    </div>
                    <div>
                      <div className="font-semibold mb-1" style={{ color: 'var(--color-primary)' }}>
                        Teams Need to See Success: Fast
                      </div>
                      <p className="text-gray-600 text-sm">
                        The question isn't "Should we do AI?" It's "How do we get value THIS MONTH?"
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ backgroundColor: 'var(--color-accent)' }}
                    >
                      <span className="text-white text-xs font-bold">!</span>
                    </div>
                    <div>
                      <div className="font-semibold mb-1" style={{ color: 'var(--color-primary)' }}>
                        Pilot first, scale what works
                      </div>
                      <p className="text-gray-600 text-sm">
                        Start with one team, prove value, then expand—no big rollouts.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ backgroundColor: 'var(--color-accent)' }}
                    >
                      <span className="text-white text-xs font-bold">!</span>
                    </div>
                    <div>
                      <div className="font-semibold mb-1" style={{ color: 'var(--color-primary)' }}>
                        Teams are too busy for "big transformation programs"
                      </div>
                      <p className="text-gray-600 text-sm">
                        They need workflows that work, not workshops that don't.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ backgroundColor: 'var(--color-accent)' }}
                    >
                      <span className="text-white text-xs font-bold">!</span>
                    </div>
                    <div>
                      <div className="font-semibold mb-1" style={{ color: 'var(--color-primary)' }}>
                        AI adoption isn't about knowledge, it's about practice
                      </div>
                      <p className="text-gray-600 text-sm">
                        Success comes from coaching through setbacks.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* The Real Problem */}
          <AnimatedSection>
            <div
              className="rounded-2xl p-8 md:p-12"
              style={{ backgroundColor: 'white' }}
            >
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="font-display text-2xl mb-4" style={{ color: 'var(--color-primary)' }}>
                    Why Traditional Approaches Fail
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Organizations treat AI like traditional software: deploy it, run a training session,
                    expect adoption. But AI isn't traditional software. It requires a fundamentally
                    different relationship-one built on practice, experimentation, and continuous learning.
                  </p>
                  <div className="space-y-3">
                    {[
                      "One-time training doesn't build lasting skills",
                      "Generic workshops don't address specific workflows",
                      "Big rollouts fail when teams are already overwhelmed",
                      "You don't need more education—you need workflows that work"
                    ].map((point, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div
                          className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                          style={{ backgroundColor: 'var(--color-accent-soft)' }}
                        >
                          <X size={12} color="white" />
                        </div>
                        <span className="text-gray-700">{point}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div
                  className="p-6 rounded-xl"
                  style={{ backgroundColor: 'white' }}
                >
                  <div className="text-center mb-4">
                    <span
                      className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider"
                      style={{ backgroundColor: 'var(--color-accent)', color: 'white' }}
                    >
                      The Transformation Required
                    </span>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="flex-1 text-right text-gray-500">Traditional Software</div>
                      <ArrowRight size={16} style={{ color: 'var(--color-accent)' }} />
                      <div className="flex-1 font-semibold" style={{ color: 'var(--color-primary)' }}>AI Systems</div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex-1 text-right text-gray-500">User operates tool</div>
                      <ArrowRight size={16} style={{ color: 'var(--color-accent)' }} />
                      <div className="flex-1 font-semibold" style={{ color: 'var(--color-primary)' }}>Manager collaborates</div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex-1 text-right text-gray-500">One-time training</div>
                      <ArrowRight size={16} style={{ color: 'var(--color-accent)' }} />
                      <div className="flex-1 font-semibold" style={{ color: 'var(--color-primary)' }}>Continuous practice</div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex-1 text-right text-gray-500">Predictable outputs</div>
                      <ArrowRight size={16} style={{ color: 'var(--color-accent)' }} />
                      <div className="flex-1 font-semibold" style={{ color: 'var(--color-primary)' }}>Creative potential</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Journey Section - Animated Valley */}
      <ClientOnly>{() => <AnimatedValley />}</ClientOnly>

      {/* Philosophy Section */}
      <section id="philosophy" className="py-24" style={{ backgroundColor: 'var(--color-background)' }}>
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <p
                className="text-lg font-semibold uppercase tracking-wider mb-4"
                style={{ color: 'var(--color-accent-lifted)' }}
              >
                Our Philosophy
              </p>
              <h2 className="font-display text-3xl md:text-4xl mb-6" style={{ color: 'var(--color-primary)' }}>
                The New Unit of Labor: Human + AI Teams
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                We believe the fundamental unit of work is shifting. Not from human to AI.
                But from individual employee to the Employee + AI Team. An inseparable
                collaboration where each brings irreplaceable strengths.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {/* Human Strengths */}
            <AnimatedSection delay={100}>
              <div
                className="p-8 rounded-2xl h-full bg-white"
                style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: 'var(--color-accent-lifted)' }}
                  >
                    <Users size={24} style={{ color: 'var(--color-primary)' }} />
                  </div>
                  <div>
                    <h3 className="font-display text-xl" style={{ color: 'var(--color-primary)' }}>Human Strengths</h3>
                    <p className="text-gray-500 text-sm">What you bring to the team</p>
                  </div>
                </div>
                <div className="space-y-3">
                  {[
                    'Strategic initiative and direction-setting',
                    'Contextual nuance and judgment',
                    'Institutional knowledge',
                    'Connecting outputs to business value',
                    'Final evaluation and refinement'
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle2 size={18} style={{ color: 'var(--color-accent)' }} className="flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            {/* AI Strengths */}
            <AnimatedSection delay={200}>
              <div
                className="p-8 rounded-2xl h-full bg-white"
                style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: 'var(--color-secondary)' }}
                  >
                    <Sparkles size={24} style={{ color: 'white' }} />
                  </div>
                  <div>
                    <h3 className="font-display text-xl" style={{ color: 'var(--color-primary)' }}>AI Strengths</h3>
                    <p className="text-gray-500 text-sm">What AI brings to the team</p>
                  </div>
                </div>
                <div className="space-y-3">
                  {[
                    'Rapid content generation at scale',
                    'Pattern recognition and insight surfacing',
                    'Unlimited ideation capacity',
                    'Quick data analysis',
                    'Tireless iteration and variation'
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <Zap size={18} style={{ color: 'var(--color-secondary)' }} className="flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>

          {/* Key Principles */}
          <div className="mt-12 grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Target,
                title: 'Practice Over Training',
                desc: 'AI mastery requires continuous practice, not one-time instruction'
              },
              {
                icon: RefreshCw,
                title: 'Experimentation is Essential',
                desc: 'Learning happens through trial, error, and iteration'
              },
              {
                icon: Compass,
                title: 'Context Matters',
                desc: 'Integration must be tailored to specific roles and workflows'
              }
            ].map((principle, i) => (
              <AnimatedSection key={i} delay={i * 100}>
                <div
                  className="p-8 rounded-2xl text-center h-full bg-white"
                  style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}
                >
                  <div
                    className="w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6"
                    style={{ backgroundColor: 'var(--color-accent)' }}
                  >
                    <principle.icon size={28} style={{ color: 'white' }} />
                  </div>
                  <h4 className="font-display text-xl mb-3" style={{ color: 'var(--color-primary)' }}>{principle.title}</h4>
                  <p className="text-gray-600 text-base leading-relaxed">{principle.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Methodology Section - The Work Loop */}
      <section id="methodology" style={{ backgroundColor: '#faf5f0' }}>
        <WorkLoop />
      </section>

      {/* CTA Section */}
      <section className="py-24" style={{ backgroundColor: 'var(--color-background)' }}>
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="font-display text-3xl md:text-4xl mb-6" style={{ color: 'var(--color-primary)' }}>
                Ready to See This in Action?
              </h2>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
                <a
                  href="https://calendly.com/d/cybv-947-s8m/discovery-call"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 rounded-lg font-semibold transition-all duration-200 hover:scale-105"
                  style={{ backgroundColor: 'var(--color-accent)', color: 'white', textDecoration: 'none' }}
                >
                  Book a Discovery Call
                </a>
                <Link
                  to="/"
                  className="px-8 py-4 rounded-lg font-semibold transition-all duration-200 hover:scale-105"
                  style={{ backgroundColor: 'var(--color-primary)', color: 'white', textDecoration: 'none' }}
                >
                  Back to Home
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default HowWeWorkPage;
