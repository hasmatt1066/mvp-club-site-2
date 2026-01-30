import React, { useState, useEffect } from 'react';
import { X, ArrowRight, Download, CheckCircle } from 'lucide-react';

const STORAGE_KEY = 'mvpclub_leadmagnet_shown';
const POPUP_DELAY_MS = 20000; // 20 seconds

// Same Google Script URL as SignupOverlay
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwhtkf5MnX4Tl3Z2LyO60Ki01la72MmLqPuALMQhvkm2yXvpNYyE9FKJ09v1LmYONJr/exec';

const LeadMagnetPopup = ({ onDismiss }) => {
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

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem(STORAGE_KEY, Date.now().toString());
    setTimeout(onDismiss, 300);
  };

  const handleDownload = () => {
    // Open the lead magnet in a new tab
    window.open('/lead-magnet.html', '_blank');
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
      // Submit to Google Sheets
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
            source: 'lead_magnet_popup'
          }),
        });
      }

      setIsSubmitted(true);
      localStorage.setItem(STORAGE_KEY, Date.now().toString());
      localStorage.setItem('mvpclub_leadmagnet_email', email);

    } catch (err) {
      // Even if fetch fails, show success (no-cors mode)
      setIsSubmitted(true);
      localStorage.setItem(STORAGE_KEY, Date.now().toString());
      localStorage.setItem('mvpclub_leadmagnet_email', email);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-all duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleDismiss}
      />

      {/* Modal */}
      <div
        className={`relative max-w-md w-full rounded-2xl p-8 transition-all duration-300 ${
          isVisible ? 'scale-100' : 'scale-95'
        }`}
        style={{
          backgroundColor: 'var(--color-primary)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
        }}
      >
        {/* Close button */}
        <button
          onClick={handleDismiss}
          className="absolute top-4 right-4 p-1 rounded-full transition-colors"
          style={{ color: 'rgba(255,255,255,0.5)' }}
          onMouseEnter={(e) => e.target.style.color = 'rgba(255,255,255,0.9)'}
          onMouseLeave={(e) => e.target.style.color = 'rgba(255,255,255,0.5)'}
          aria-label="Close"
        >
          <X size={20} />
        </button>

        {isSubmitted ? (
          /* Success state */
          <div className="text-center py-4">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ backgroundColor: 'var(--color-accent)' }}
            >
              <CheckCircle size={32} color="white" />
            </div>
            <h3
              className="text-2xl font-medium mb-2"
              style={{ color: 'white', fontFamily: "'Zilla Slab', serif" }}
            >
              You're in!
            </h3>
            <p className="mb-6" style={{ color: 'rgba(255,255,255,0.7)' }}>
              Your guide is ready. Click below to download it now.
            </p>
            <button
              onClick={handleDownload}
              className="w-full py-4 rounded-lg font-semibold transition-all duration-200 hover:scale-105 flex items-center justify-center gap-2"
              style={{ backgroundColor: 'var(--color-accent)', color: 'white' }}
            >
              <Download size={20} />
              Download Your Guide
            </button>
            <p className="mt-4 text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
              We've also sent a copy to your inbox.
            </p>
          </div>
        ) : (
          <>
            {/* Badge */}
            <div className="text-center mb-4">
              <span
                className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider"
                style={{
                  backgroundColor: 'var(--color-accent)',
                  color: 'white'
                }}
              >
                Free Guide
              </span>
            </div>

            {/* Headline */}
            <h2
              className="text-2xl md:text-3xl font-medium mb-3 text-center leading-tight"
              style={{ color: 'white', fontFamily: "'Zilla Slab', serif" }}
            >
              Ready to Build Something Real with AI?
            </h2>

            {/* Subhead */}
            <p
              className="text-center mb-6"
              style={{ color: 'rgba(255,255,255,0.7)' }}
            >
              Get our free step-by-step guide and go from "I should try AI" to "I just built something" — no coding required.
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                className="w-full px-4 py-3 rounded-lg text-base outline-none mb-3 transition-all duration-200"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  color: 'white',
                  border: '1px solid rgba(255,255,255,0.2)',
                }}
                onFocus={(e) => e.target.style.borderColor = 'var(--color-accent)'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.2)'}
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-lg font-semibold transition-all duration-200 hover:scale-105 disabled:opacity-70 disabled:hover:scale-100 flex items-center justify-center gap-2"
                style={{ backgroundColor: 'var(--color-accent)', color: 'white' }}
              >
                {isSubmitting ? (
                  <span className="animate-pulse">Sending...</span>
                ) : (
                  <>
                    Get the Free Guide <ArrowRight size={18} />
                  </>
                )}
              </button>
              {error && (
                <p className="mt-3 text-sm text-center" style={{ color: '#f87171' }}>
                  {error}
                </p>
              )}
            </form>

            <p className="text-center mt-4 text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>
              No spam, ever. Unsubscribe anytime.
            </p>

            {/* What's inside */}
            <div className="mt-6 pt-6" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
              <p className="text-xs text-center mb-3" style={{ color: 'rgba(255,255,255,0.5)' }}>
                What's inside:
              </p>
              <div className="flex flex-wrap justify-center gap-2 text-xs">
                {['Project ideas', 'Opening prompts', 'Conversation guide', 'Build steps'].map((item) => (
                  <span
                    key={item}
                    className="px-2 py-1 rounded"
                    style={{
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      color: 'rgba(255,255,255,0.7)'
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// Hook to manage lead magnet popup display
export const useLeadMagnetPopup = () => {
  const [shouldShow, setShouldShow] = useState(false);

  useEffect(() => {
    // Check if already shown recently (within 7 days)
    const lastShown = localStorage.getItem(STORAGE_KEY);
    if (lastShown) {
      const daysSinceShown = (Date.now() - parseInt(lastShown)) / (1000 * 60 * 60 * 24);
      if (daysSinceShown < 7) {
        return; // Don't show if shown within last 7 days
      }
    }

    // Also don't show if they've already seen the main signup overlay
    const signupDismissed = localStorage.getItem('mvpclub_overlay_dismissed');
    if (!signupDismissed) {
      // Wait for the signup overlay to be dismissed first
      return;
    }

    // Time-based trigger
    const timer = setTimeout(() => {
      setShouldShow(true);
    }, POPUP_DELAY_MS);

    // Exit intent trigger
    const handleMouseLeave = (e) => {
      if (e.clientY <= 0) {
        setShouldShow(true);
      }
    };
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const dismiss = () => setShouldShow(false);

  return { shouldShow, dismiss };
};

export default LeadMagnetPopup;
