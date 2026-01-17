import React, { useState } from 'react';
import HeroCarousel from './HeroCarousel';
import HeroGeneratorForm from './HeroGeneratorForm';
import TransformationCard from '../use-cases/TransformationCard';

const HeroSection = ({ scrollToSection, setShowWaitlist }) => {
  const [generatedOutput, setGeneratedOutput] = useState(null);
  const [error, setError] = useState('');

  // Generate session ID for rate limiting
  const getSessionId = () => {
    let sessionId = sessionStorage.getItem('mvp-club-session-id');
    if (!sessionId) {
      sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      sessionStorage.setItem('mvp-club-session-id', sessionId);
    }
    return sessionId;
  };

  const handleGenerate = async ({ workflow, category }) => {
    setError('');
    setGeneratedOutput(null);

    try {
      const response = await fetch('/api/generate-usecase', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          workflow: workflow.trim(),
          category: category || undefined,
          sessionId: getSessionId(),
        }),
      });

      const data = await response.json();

      if (data.success && data.transformation) {
        setGeneratedOutput(data.transformation);

        // Scroll to output after a brief delay
        setTimeout(() => {
          const outputEl = document.getElementById('hero-generated-output');
          if (outputEl) {
            outputEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 300);
      } else {
        setError(data.message || 'Could not generate transformation. Try describing your workflow differently.');
      }
    } catch (err) {
      console.error('Generator error:', err);
      setError('Something went wrong. Please try again.');
    }
  };

  const handleReset = () => {
    setGeneratedOutput(null);
    setError('');
    // Scroll back to generator
    const generatorEl = document.getElementById('hero');
    if (generatorEl) {
      generatorEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const formatOutputForCard = (apiOutput) => ({
    id: 'generated',
    title: apiOutput.title,
    currentState: {
      headline: 'The Old Way',
      description: apiOutput.currentState.description,
      icon: 'FileText',
      painPoints: apiOutput.currentState.painPoints,
    },
    transformation: {
      headline: 'MVP Club Coaching',
      description: apiOutput.transformation.description,
      icon: 'Sparkles',
    },
    futureState: {
      headline: 'The New Way',
      description: apiOutput.futureState.description,
      icon: 'Zap',
      wins: apiOutput.futureState.wins,
    },
    // No outcome - we don't show fake KPIs
  });

  return (
    <>
      {/* Hero Section */}
      <section
        id="hero"
        className="min-h-screen flex items-center relative"
        style={{ backgroundColor: 'var(--color-primary)' }}
      >
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute top-20 right-10 w-96 h-96 rounded-full opacity-10 animate-float"
            style={{ backgroundColor: 'var(--color-secondary)' }}
          />
          <div
            className="absolute bottom-20 left-10 w-64 h-64 rounded-full opacity-10 animate-float"
            style={{ backgroundColor: 'var(--color-accent)', animationDelay: '-2s' }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 pt-32 pb-20 relative z-10 w-full">
          <div className="grid lg:grid-cols-[40%_60%] gap-12 lg:gap-16 items-start">
            {/* Left: Value Prop */}
            <div>
              <p
                className="text-base font-semibold uppercase tracking-wider mb-5"
                style={{ color: 'var(--color-accent-lifted)' }}
              >
                Strategic AI Transformation
              </p>

              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-6">
                Turn AI Access Into{' '}
                <span className="gradient-text">Genuine Capability</span>
              </h1>

              <p className="text-lg text-white/80 mb-8 leading-relaxed">
                We coach your team to bring an AI-first mindset to real work and implement AI workflows.
                Get measurable productivity gains in 4 weeks by doing actual work, not sitting through programs.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => scrollToSection('organizations')}
                  className="px-8 py-4 rounded-xl text-white font-semibold transition-all duration-200 hover:scale-105"
                  style={{
                    backgroundColor: 'var(--color-accent)',
                    boxShadow: '0 4px 12px rgba(217, 119, 6, 0.3)',
                  }}
                >
                  Start a 4-Week Pilot
                </button>
                <a
                  href="https://mvp-club.mn.co/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-8 py-4 rounded-xl font-semibold transition-all duration-200 hover:scale-105"
                  style={{
                    backgroundColor: 'transparent',
                    border: '2px solid rgba(255,255,255,0.3)',
                    color: 'white',
                    textDecoration: 'none'
                  }}
                >
                  Join the Community
                </a>
              </div>
            </div>

            {/* Right: Carousel + Generator */}
            <div>
              <HeroCarousel />
              <HeroGeneratorForm onGenerate={handleGenerate} />

              {/* Error Display */}
              {error && (
                <div className="mt-4 p-4 rounded-xl bg-red-500/20 border border-red-500/30 flex items-start gap-2">
                  <span className="text-red-200 text-sm">{error}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Generated Output Section */}
      {generatedOutput && (
        <section
          id="hero-generated-output"
          className="py-16"
          style={{ backgroundColor: 'var(--color-primary)' }}
        >
          <div className="max-w-7xl mx-auto px-6">
            <h3 className="text-white font-display text-2xl md:text-3xl mb-8 text-center">
              Your Custom Transformation
            </h3>

            <TransformationCard useCase={formatOutputForCard(generatedOutput)} />

            {/* CTA */}
            <div
              className="mt-8 p-8 rounded-2xl text-center max-w-4xl mx-auto"
              style={{ backgroundColor: 'white', boxShadow: '0 4px 24px rgba(0,0,0,0.1)' }}
            >
              <p className="text-gray-600 mb-6 text-lg">
                Want to make this transformation real?
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://calendly.com/d/cybv-947-s8m/discovery-call"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 rounded-xl font-semibold transition-all duration-200 hover:scale-105 inline-flex items-center justify-center gap-2"
                  style={{
                    backgroundColor: 'var(--color-primary)',
                    color: 'white',
                  }}
                >
                  Book a Discovery Call
                </a>
                <button
                  onClick={handleReset}
                  className="px-8 py-4 rounded-xl font-medium transition-all duration-200 hover:bg-gray-100"
                  style={{
                    border: '2px solid var(--color-primary-tint)',
                    color: 'var(--color-primary)',
                  }}
                >
                  Try Another Workflow
                </button>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default HeroSection;
