import React, { useState, useEffect } from 'react';
import { FileText, Sparkles, Zap, ArrowRight } from 'lucide-react';

// Sample transformation data for carousel
const transformations = [
  {
    id: 'marketing-content',
    title: 'Marketing Content Machine',
    oldWay: {
      text: 'Write content separately for each channel. Manual formatting. Inconsistent brand voice across platforms.',
    },
    coaching: {
      text: 'We help you scope an omnichannel workflow, show what\'s possible with AI tools, and get you started with your first template',
    },
    newWay: {
      text: 'Single brief → all channels. AI maintains your brand voice. Automated formatting.',
    },
  },
  {
    id: 'weekly-reports',
    title: 'Weekly Report Creation',
    oldWay: {
      text: 'Hours spent gathering data from multiple tools. Manual compilation. Formatting from scratch each week.',
    },
    coaching: {
      text: 'We help you identify which data sources to connect, show the art of the possible, and motivate practice building your automated workflow',
    },
    newWay: {
      text: 'AI aggregates all metrics automatically. Pre-formatted draft ready to review. Just add context and send.',
    },
  },
  {
    id: 'client-research',
    title: 'Client Research Summaries',
    oldWay: {
      text: 'Manual web scraping. Taking scattered notes. Hours synthesizing information into briefing documents.',
    },
    coaching: {
      text: 'We ground you in valuable use cases, help scope your research assistant workflow, and get you started so you can bring it across the finish line',
    },
    newWay: {
      text: 'AI compiles comprehensive briefs from multiple sources. Structured format. Ready to review in minutes.',
    },
  },
];

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = transformations.length;

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, [totalSlides]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="mb-6">
      {/* Label */}
      <div className="text-center mb-3">
        <p className="text-white/60 text-xs font-medium uppercase tracking-wide">
          Real transformation examples ↓
        </p>
      </div>

      {/* Carousel Container */}
      <div
        className="relative h-80 overflow-hidden rounded-2xl bg-white"
        style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}
      >
        {transformations.map((transformation, index) => (
          <div
            key={transformation.id}
            className={`absolute inset-0 px-6 py-7 flex items-center transition-opacity duration-600 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* Desktop: 3-Column Layout */}
            <div className="hidden md:grid md:grid-cols-[2.5fr_32px_2fr_32px_2.5fr] gap-2 w-full items-stretch">
              {/* Old Way */}
              <div
                className="p-5 rounded-xl flex flex-col min-h-0"
                style={{ backgroundColor: 'var(--color-background-dark)' }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <FileText size={18} className="text-gray-400 flex-shrink-0" />
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-500">
                    The Old Way
                  </span>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed overflow-y-auto">
                  {transformation.oldWay.text}
                </p>
              </div>

              {/* Arrow 1 */}
              <div className="flex items-center justify-center">
                <ArrowRight size={22} style={{ color: 'var(--color-secondary)' }} />
              </div>

              {/* MVP Club Coaching */}
              <div
                className="p-4 rounded-xl flex flex-col items-center justify-center text-center min-h-0"
                style={{ backgroundColor: 'var(--color-secondary)' }}
              >
                <Sparkles size={24} className="text-white mb-2" />
                <span className="text-[10px] font-semibold uppercase tracking-wider text-white/90 mb-2">
                  MVP Club Coaching
                </span>
                <p className="text-xs text-white/85 leading-snug overflow-y-auto">
                  {transformation.coaching.text}
                </p>
              </div>

              {/* Arrow 2 */}
              <div className="flex items-center justify-center">
                <ArrowRight size={22} style={{ color: 'var(--color-accent)' }} />
              </div>

              {/* New Way */}
              <div
                className="p-5 rounded-xl flex flex-col min-h-0"
                style={{
                  backgroundColor: 'var(--color-accent-tint)',
                  border: '2px solid var(--color-accent)',
                }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <Zap size={18} style={{ color: 'var(--color-accent)' }} className="flex-shrink-0" />
                  <span
                    className="text-[11px] font-semibold uppercase tracking-wider"
                    style={{ color: 'var(--color-accent)' }}
                  >
                    The New Way
                  </span>
                </div>
                <p className="text-sm leading-relaxed overflow-y-auto" style={{ color: 'var(--color-primary)' }}>
                  {transformation.newWay.text}
                </p>
              </div>
            </div>

            {/* Mobile: Stacked Layout */}
            <div className="md:hidden w-full space-y-4 overflow-y-auto max-h-full">
              {/* Old Way */}
              <div
                className="p-4 rounded-xl"
                style={{ backgroundColor: 'var(--color-background-dark)' }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <FileText size={16} className="text-gray-400" />
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-500">
                    The Old Way
                  </span>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {transformation.oldWay.text}
                </p>
              </div>

              {/* MVP Club Coaching */}
              <div
                className="p-4 rounded-xl text-center"
                style={{ backgroundColor: 'var(--color-secondary)' }}
              >
                <Sparkles size={20} className="text-white mx-auto mb-2" />
                <span className="text-[10px] font-semibold uppercase tracking-wider text-white/90 block mb-2">
                  MVP Club Coaching
                </span>
                <p className="text-xs text-white/85 leading-snug">
                  {transformation.coaching.text}
                </p>
              </div>

              {/* New Way */}
              <div
                className="p-4 rounded-xl"
                style={{
                  backgroundColor: 'var(--color-accent-tint)',
                  border: '2px solid var(--color-accent)',
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Zap size={16} style={{ color: 'var(--color-accent)' }} />
                  <span
                    className="text-[11px] font-semibold uppercase tracking-wider"
                    style={{ color: 'var(--color-accent)' }}
                  >
                    The New Way
                  </span>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-primary)' }}>
                  {transformation.newWay.text}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dots Navigation */}
      <div className="flex justify-center gap-2 mt-3">
        {transformations.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'w-6'
                : 'w-2'
            }`}
            style={{
              backgroundColor: index === currentSlide ? 'var(--color-accent)' : 'rgba(255,255,255,0.2)',
            }}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
