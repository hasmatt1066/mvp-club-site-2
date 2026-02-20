import React from 'react';
import { Building2, MessageCircle, CheckCircle2 } from 'lucide-react';
import AnimatedSection from './AnimatedSection';

const trackJoinClick = (location) => {
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'join_community_click', {
      event_category: 'conversion',
      event_label: location,
      link_url: 'https://mvp-club.mn.co/',
    });
  }
};

const SharedCTA = () => {
  return (
    <section id="contact" className="py-24" style={{ backgroundColor: 'var(--color-background)' }}>
      <div className="max-w-7xl mx-auto px-6">
        <AnimatedSection>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="font-display text-3xl md:text-4xl mb-6" style={{ color: 'var(--color-primary)' }}>
              Ready to Transform How You Work with AI?
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Whether you're transforming an organization or developing your own skills,
              we have a path for you. Choose what fits your situation.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* B2B Path */}
          <AnimatedSection delay={100}>
            <div className="bg-white p-8 rounded-2xl h-full flex flex-col">
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-6"
                style={{ backgroundColor: 'var(--color-accent-lifted)' }}
              >
                <Building2 size={28} style={{ color: 'var(--color-primary)' }} />
              </div>
              <h3 className="font-display text-xl mb-3" style={{ color: 'var(--color-primary)' }}>
                For Organizations
              </h3>
              <p className="text-gray-600 mb-6 flex-grow leading-relaxed">
                Start small. Prove value fast. Scale what works.
                <br /><br />
                4-week pilot sprint for one team, one workflow, one problem.
                No big rollout. No company-wide program.
                Just real work getting done faster with AI.
                <br /><br />
                <strong>If it works, we scale. If it doesn't, we stop.</strong>
              </p>
              <div className="space-y-3 mb-6">
                {['15-minute workflow diagnostic', 'Pilot one team—expand if it works', 'Immediate productivity gains'].map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle2 size={16} style={{ color: 'var(--color-secondary)' }} />
                    <span className="text-sm text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
              <a
                href="https://calendly.com/d/cybv-947-s8m/discovery-call"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-4 rounded-lg font-semibold text-center transition-all duration-200 hover:scale-105"
                style={{ backgroundColor: 'var(--color-primary)', color: 'white' }}
              >
                Book a Discovery Call
              </a>
            </div>
          </AnimatedSection>

          {/* B2C Path */}
          <AnimatedSection delay={200}>
            <div className="bg-white p-8 rounded-2xl h-full flex flex-col">
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-6"
                style={{ backgroundColor: 'var(--color-secondary)' }}
              >
                <MessageCircle size={28} style={{ color: 'white' }} />
              </div>
              <h3 className="font-display text-xl mb-3" style={{ color: 'var(--color-primary)' }}>
                For Practitioners
              </h3>
              <p className="text-gray-600 mb-6 flex-grow">
                Join our community of AI-first practitioners. Access live events,
                embedded coaching, and a supportive community to build your skills
                through practice.
              </p>
              <div className="space-y-3 mb-6">
                {['Immediate community access', 'Embedded coaching support', 'Live workshops & events'].map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle2 size={16} style={{ color: 'var(--color-secondary)' }} />
                    <span className="text-sm text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
              <a
                href="https://mvp-club.mn.co/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackJoinClick('shared_cta')}
                className="block w-full py-4 rounded-lg font-semibold text-center transition-all duration-200 hover:scale-105"
                style={{ backgroundColor: 'var(--color-accent)', color: 'white', textDecoration: 'none' }}
              >
                Join the Community
              </a>
            </div>
          </AnimatedSection>
        </div>

        <AnimatedSection delay={300}>
          <p className="text-center text-gray-500 mt-8">
            Prefer email?{' '}
            <a
              href="mailto:info@mvpclub.ai"
              className="font-medium underline transition-colors"
              style={{ color: 'var(--color-primary)' }}
            >
              info@mvpclub.ai
            </a>
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default SharedCTA;
