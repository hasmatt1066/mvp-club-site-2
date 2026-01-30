import React, { useState, useEffect } from 'react';
import { X, ArrowRight, Sparkles, Calendar } from 'lucide-react';
import logoImage from './mvp-club-logo.jpeg';

// Google Apps Script in mvpclub.ai workspace - sends to Sheet and triggers welcome email from info@mvpclub.ai
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbx6Y6HWGpOddcXmPRfYjpN3RFLHlHNx5hKiZmcgsOtZYV4OGljlwqRyljaLWempXi4ocg/exec';

const WaitlistOverlay = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  // Fade in on mount
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);

    try {
      if (GOOGLE_SCRIPT_URL) {
        await fetch(GOOGLE_SCRIPT_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            timestamp: new Date().toISOString(),
            source: 'community_waitlist'
          }),
        });
      }

      setIsSubmitted(true);
      localStorage.setItem('mvpclub_waitlist_email', email);

    } catch (err) {
      // no-cors mode doesn't return response status, but email likely went through
      setIsSubmitted(true);
      localStorage.setItem('mvpclub_waitlist_email', email);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center transition-all duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{ backgroundColor: 'var(--color-primary)' }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-20 right-20 w-80 h-80 rounded-full opacity-10"
          style={{
            backgroundColor: 'var(--color-secondary)',
            animation: 'float 6s ease-in-out infinite'
          }}
        />
        <div
          className="absolute bottom-20 left-20 w-64 h-64 rounded-full opacity-10"
          style={{
            backgroundColor: 'var(--color-accent)',
            animation: 'float 6s ease-in-out infinite',
            animationDelay: '-3s'
          }}
        />
      </div>

      {/* Close button */}
      <button
        onClick={handleClose}
        className="absolute top-6 right-6 p-2 rounded-full transition-all duration-200 hover:scale-110"
        style={{
          color: 'rgba(255,255,255,0.6)',
          backgroundColor: 'rgba(255,255,255,0.1)'
        }}
        aria-label="Close"
      >
        <X size={24} />
      </button>

      {/* Main content */}
      <div className="relative z-10 max-w-lg w-full mx-6 text-center">
        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <div className="flex items-center gap-3">
            <img
              src={logoImage}
              alt="MVP Club"
              className="h-14 w-14 rounded-xl object-cover"
              style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.3)' }}
            />
            <span
              className="font-display text-2xl font-medium"
              style={{
                color: 'var(--color-accent-lifted)',
                fontFamily: "'Zilla Slab', serif"
              }}
            >
              MVP Club
            </span>
          </div>
        </div>

        {!isSubmitted ? (
          <>
            {/* Launch date badge */}
            <div className="mb-6 flex justify-center">
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
                style={{ backgroundColor: 'var(--color-accent)' }}
              >
                <Calendar size={18} color="white" />
                <span className="text-white font-semibold">Launching January 19th</span>
              </div>
            </div>

            {/* Headline */}
            <h1
              className="text-3xl md:text-4xl lg:text-5xl font-medium mb-4 leading-tight"
              style={{
                color: 'white',
                fontFamily: "'Zilla Slab', serif"
              }}
            >
              The Community is{' '}
              <span style={{ color: 'var(--color-accent-lifted)' }}>
                Coming Soon
              </span>
            </h1>

            {/* Subheadline */}
            <p
              className="text-lg md:text-xl mb-8 leading-relaxed"
              style={{ color: 'rgba(255,255,255,0.8)' }}
            >
              We're putting the finishing touches on our AI-first practitioner community.
              Join the waitlist to get notified the moment we launch.
            </p>

            {/* Email form */}
            <form onSubmit={handleSubmit} className="mb-6">
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-5 py-4 rounded-lg text-base outline-none transition-all duration-200"
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.95)',
                    color: 'var(--color-primary)',
                    border: '2px solid transparent',
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'var(--color-accent)'}
                  onBlur={(e) => e.target.style.borderColor = 'transparent'}
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-4 rounded-lg font-semibold transition-all duration-200 hover:scale-105 disabled:opacity-70 disabled:hover:scale-100 flex items-center justify-center gap-2"
                  style={{
                    backgroundColor: 'var(--color-accent)',
                    color: 'white',
                  }}
                >
                  {isSubmitting ? (
                    <span className="animate-pulse">Joining...</span>
                  ) : (
                    <>
                      Notify Me <ArrowRight size={18} />
                    </>
                  )}
                </button>
              </div>
              {error && (
                <p className="mt-3 text-sm" style={{ color: '#f87171' }}>
                  {error}
                </p>
              )}
            </form>

            {/* Trust signals */}
            <div
              className="flex flex-wrap items-center justify-center gap-4 text-sm mb-8"
              style={{ color: 'rgba(255,255,255,0.6)' }}
            >
              <span className="flex items-center gap-1">
                <Sparkles size={14} style={{ color: 'var(--color-accent-lifted)' }} />
                Early access
              </span>
              <span>•</span>
              <span>No spam</span>
              <span>•</span>
              <span>Unsubscribe anytime</span>
            </div>

            {/* Back link */}
            <button
              onClick={handleClose}
              className="text-sm transition-colors duration-200"
              style={{ color: 'rgba(255,255,255,0.5)' }}
              onMouseEnter={(e) => e.target.style.color = 'rgba(255,255,255,0.8)'}
              onMouseLeave={(e) => e.target.style.color = 'rgba(255,255,255,0.5)'}
            >
              ← Back to site
            </button>
          </>
        ) : (
          /* Success state */
          <div className="py-8">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
              style={{ backgroundColor: 'var(--color-accent)' }}
            >
              <Sparkles size={36} color="white" />
            </div>
            <h2
              className="text-3xl md:text-4xl font-medium mb-4"
              style={{
                color: 'white',
                fontFamily: "'Zilla Slab', serif"
              }}
            >
              You're on the list!
            </h2>
            <p
              className="text-lg mb-8"
              style={{ color: 'rgba(255,255,255,0.8)' }}
            >
              We'll notify you when the community launches on January 19th.
            </p>
            <button
              onClick={handleClose}
              className="px-8 py-4 rounded-lg font-semibold transition-all duration-200 hover:scale-105"
              style={{
                backgroundColor: 'var(--color-accent)',
                color: 'white',
              }}
            >
              Back to Site
            </button>
          </div>
        )}
      </div>

      {/* Keyframe animation */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(3deg); }
        }
      `}</style>
    </div>
  );
};

export default WaitlistOverlay;
