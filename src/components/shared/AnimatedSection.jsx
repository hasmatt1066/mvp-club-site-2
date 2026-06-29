import React, { useState, useEffect, useRef } from 'react';

const AnimatedSection = ({ children, className = '', delay = 0 }) => {
  // Default to visible so content renders without JS, during SSR, and if the
  // IntersectionObserver never fires. JS progressively upgrades to the
  // scroll-reveal; the base state is never "hidden". This keeps the offer,
  // schedule, and CTA from disappearing for no-JS clients, crawlers, or on a
  // JS error. Starting `true` also matches the SSR markup, so there is no
  // hydration mismatch.
  const [isVisible, setIsVisible] = useState(true);
  const ref = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    // No animation when motion is reduced or the observer is unavailable:
    // leave the content in its visible base state.
    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      return;
    }

    // JS + motion OK: opt into the entrance animation. Hide now, then reveal
    // as the section scrolls into view.
    setIsVisible(false);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.05, rootMargin: '0px 0px -50px 0px' }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      } ${className}`}
    >
      {children}
    </div>
  );
};

export default AnimatedSection;
