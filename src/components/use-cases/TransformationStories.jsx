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
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && activeIndex < useCases.length - 1) {
      setActiveIndex(activeIndex + 1);
    }
    if (isRightSwipe && activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    }
  };

  const goToCard = (index) => {
    setActiveIndex(index);
  };

  return (
    <div
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Only render the active card - no overflow clipping needed */}
      <div style={{ paddingBottom: '1rem' }}>
        <TransformationCard useCase={useCases[activeIndex]} />
      </div>

      {/* Dot Indicators */}
      <div className="flex justify-center gap-2 mt-6">
        {useCases.map((_, index) => (
          <button
            key={index}
            onClick={() => goToCard(index)}
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
