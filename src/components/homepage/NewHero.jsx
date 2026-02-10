import React from 'react';
import { Link } from 'react-router-dom';
import MosaicBackground from '../shared/MosaicBackground';
import AnimatedSection from '../shared/AnimatedSection';

const NewHero = () => {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center relative overflow-hidden"
      style={{ backgroundColor: 'var(--color-primary)' }}
    >
      {/* Mosaic background */}
      <MosaicBackground />

      <div className="max-w-7xl mx-auto px-6 pt-32 pb-20 relative z-10 w-full">
        <div className="max-w-[800px] mx-auto text-center">
          <AnimatedSection>
            <p
              className="text-sm font-semibold uppercase tracking-[0.15em] mb-6"
              style={{ color: 'var(--color-accent-lifted)' }}
            >
              Stop learning AI. Start building with it.
            </p>

            <h1 className="font-display text-4xl md:text-5xl lg:text-[clamp(2.5rem,5vw,4rem)] text-white leading-[1.15] mb-6">
              AI Adoption Isn't a Training Problem.
              <br />
              It's a <span className="gradient-text">Coaching Problem.</span>
            </h1>

            <p className="text-xl text-white/80 leading-relaxed mb-10 max-w-[640px] mx-auto">
              Most people aren't stuck because they lack knowledge. They're stuck because AI feels
              intimidating, they don't have time to figure it out, and nobody's in their corner while they learn.
              We coach alongside people through the hard part &mdash; practicing on real work until it clicks.
            </p>

            <div className="flex gap-4 justify-center flex-wrap">
              <a
                href="https://calendly.com/d/cybv-947-s8m/discovery-call"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-8 py-4 rounded-xl text-white font-semibold text-base transition-all duration-200 hover:-translate-y-0.5"
                style={{
                  backgroundColor: 'var(--color-accent)',
                  boxShadow: '0 4px 12px rgba(217, 119, 6, 0.3)',
                }}
              >
                Book a Discovery Call
              </a>
              <Link
                to="/how-we-work"
                className="inline-block px-8 py-4 rounded-xl font-semibold text-base text-white transition-all duration-200 hover:border-white/60"
                style={{
                  backgroundColor: 'transparent',
                  border: '2px solid rgba(255,255,255,0.3)',
                  textDecoration: 'none',
                }}
              >
                See How We Work
              </Link>
            </div>

            <p className="text-white/50 text-sm mt-6">
              Prefer email?{' '}
              <a
                href="mailto:info@mvpclub.ai"
                className="font-medium underline transition-colors text-white/70 hover:text-white"
              >
                info@mvpclub.ai
              </a>
            </p>
          </AnimatedSection>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 text-xs uppercase tracking-widest flex flex-col items-center gap-2">
        <span>Scroll</span>
        <div
          className="w-5 h-5 border-r-2 border-b-2 border-white/40 rotate-45"
          style={{ animation: 'bounce 2s infinite' }}
        />
      </div>
    </section>
  );
};

export default NewHero;
