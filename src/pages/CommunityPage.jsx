import React from 'react';
import { GraduationCap, Users, Calendar, CheckCircle2 } from 'lucide-react';
import AnimatedSection from '../components/shared/AnimatedSection';
import SharedCTA from '../components/shared/SharedCTA';

const CommunityPage = () => {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-background)', fontFamily: 'Inter, system-ui, sans-serif' }}>

      {/* For Practitioners Section */}
      <section id="practitioners" className="pt-32 py-24" style={{ backgroundColor: 'var(--color-background)' }}>
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <div className="flex items-center gap-3 mb-4">
              <GraduationCap size={24} style={{ color: 'var(--color-secondary)' }} />
              <p
                className="text-lg font-semibold uppercase tracking-wider"
                style={{ color: 'var(--color-secondary)' }}
              >
                For Practitioners
              </p>
            </div>
            <h2 className="font-display text-3xl md:text-4xl mb-6 max-w-2xl" style={{ color: 'var(--color-primary)' }}>
              Join the AI-First Practitioner Community
            </h2>
            <p className="text-lg text-gray-600 mb-12 max-w-2xl leading-relaxed">
              Not ready for enterprise transformation? Join a community of practitioners
              building real AI skills through guided practice, shared learning, and expert support.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-8 mb-16 max-w-4xl mx-auto">
            {[
              {
                icon: Users,
                title: 'Active Community',
                desc: 'Learn alongside others on the same journey. Share wins, troubleshoot challenges, build together.',
                features: ['Weekly community discussions', 'Peer feedback on your work', 'Collaborative problem-solving']
              },
              {
                icon: Calendar,
                title: 'Live Events',
                desc: 'Regular workshops, Q&As, and guest sessions to deepen your practice and expand your network.',
                features: ['Monthly live workshops', 'Office hours with coaches', 'Special guest practitioners']
              }
            ].map((offering, i) => (
              <AnimatedSection key={i} delay={i * 100}>
                <div className="card-hover bg-white p-8 rounded-2xl h-full">
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-6"
                    style={{ backgroundColor: 'var(--color-secondary)' }}
                  >
                    <offering.icon size={28} style={{ color: 'white' }} />
                  </div>
                  <h3 className="font-display text-xl mb-3" style={{ color: 'var(--color-primary)' }}>
                    {offering.title}
                  </h3>
                  <p className="text-gray-600 mb-6">{offering.desc}</p>
                  <div className="space-y-2">
                    {offering.features.map((feature, j) => (
                      <div key={j} className="flex items-start gap-2">
                        <CheckCircle2 size={16} style={{ color: 'var(--color-secondary)' }} className="flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {/* Community CTA */}
          <AnimatedSection>
            <div
              className="p-8 md:p-12 rounded-2xl text-center"
              style={{ backgroundColor: 'var(--color-secondary)' }}
            >
              <h3 className="font-display text-2xl text-white mb-4">
                Start Building Real AI Skills Today
              </h3>
              <p className="text-white/80 mb-8 max-w-xl mx-auto">
                Join a community of practitioners who are actively developing their Human + AI
                collaboration skills through practice, not just theory.
              </p>
              <a
                href="https://mvp-club.mn.co/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-8 py-4 rounded-lg font-semibold transition-all duration-200 hover:scale-105"
                style={{ backgroundColor: 'var(--color-accent-lifted)', color: 'var(--color-primary)', textDecoration: 'none' }}
              >
                Join the Community
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Shared CTA */}
      <SharedCTA />
    </div>
  );
};

export default CommunityPage;
