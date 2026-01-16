import React, { useState, useEffect, useRef } from 'react';
import TransformationCard from './TransformationCard';
import useCasesData from '../../data/useCases.json';

// Reusable animated section wrapper (matches pattern from main site)
const AnimatedSection = ({ children, className = '', delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } ${className}`}
    >
      {children}
    </div>
  );
};

const TransformationStories = () => {
  const { sectionTitle, sectionSubtitle, useCases } = useCasesData;

  return (
    <section
      id="transformations"
      className="py-24"
      style={{ backgroundColor: 'var(--color-background)' }}
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <AnimatedSection>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p
              className="text-lg font-semibold uppercase tracking-wider mb-4"
              style={{ color: 'var(--color-secondary)' }}
            >
              {sectionTitle}
            </p>
            <h2
              className="font-display text-3xl md:text-4xl mb-6"
              style={{ color: 'var(--color-primary)' }}
            >
              See What's Possible
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              {sectionSubtitle}
            </p>
          </div>
        </AnimatedSection>

        {/* Use Case Cards - Desktop: Stacked, Mobile: Carousel */}
        <div className="hidden md:block space-y-6">
          {useCases.map((useCase, index) => (
            <AnimatedSection key={useCase.id} delay={index * 100}>
              <TransformationCard useCase={useCase} />
            </AnimatedSection>
          ))}
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden">
          <MobileCarousel useCases={useCases} />
        </div>
      </div>
    </section>
  );
};

// Mobile carousel component
const MobileCarousel = ({ useCases }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);

  // Handle scroll to update active index
  const handleScroll = () => {
    if (!containerRef.current) return;
    const scrollLeft = containerRef.current.scrollLeft;
    const cardWidth = containerRef.current.offsetWidth;
    const newIndex = Math.round(scrollLeft / cardWidth);
    setActiveIndex(newIndex);
  };

  // Scroll to specific card
  const scrollToCard = (index) => {
    if (!containerRef.current) return;
    const cardWidth = containerRef.current.offsetWidth;
    containerRef.current.scrollTo({
      left: index * cardWidth,
      behavior: 'smooth',
    });
  };

  return (
    <div>
      {/* Carousel Container */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="overflow-x-auto snap-x snap-mandatory scrollbar-hide -mx-6 px-6"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        <div className="flex gap-4" style={{ width: 'max-content' }}>
          {useCases.map((useCase) => (
            <div
              key={useCase.id}
              className="snap-center flex-shrink-0"
              style={{ width: 'calc(100vw - 48px)' }}
            >
              <TransformationCard useCase={useCase} />
            </div>
          ))}
        </div>
      </div>

      {/* Dot Indicators */}
      <div className="flex justify-center gap-2 mt-6">
        {useCases.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToCard(index)}
            className={`w-2 h-2 rounded-full transition-all duration-200 ${
              index === activeIndex ? 'w-6' : ''
            }`}
            style={{
              backgroundColor:
                index === activeIndex
                  ? 'var(--color-accent)'
                  : 'var(--color-primary-tint)',
            }}
            aria-label={`Go to use case ${index + 1}`}
          />
        ))}
      </div>

      {/* Swipe Hint */}
      <p className="text-center text-sm text-gray-400 mt-4">
        Swipe to see more examples
      </p>
    </div>
  );
};

export default TransformationStories;
