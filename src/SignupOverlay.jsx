import React, { useState, useEffect } from 'react';
import { X, ArrowRight, Sparkles } from 'lucide-react';
import logoImage from './mvp-club-logo.jpeg';

const STORAGE_KEY = 'mvpclub_overlay_dismissed';

/**
 * GOOGLE SHEETS INTEGRATION
 *
 * To connect this form to a Google Sheet:
 *
 * 1. Create a new Google Sheet with columns: Email, Timestamp, Source
 *
 * 2. Go to Extensions > Apps Script
 *
 * 3. Replace the code with:
 *
 *    function doPost(e) {
 *      var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
 *      var data = JSON.parse(e.postData.contents);
 *      sheet.appendRow([data.email, data.timestamp, data.source]);
 *      return ContentService.createTextOutput(JSON.stringify({status: 'success'}))
 *        .setMimeType(ContentService.MimeType.JSON);
 *    }
 *
 * 4. Click Deploy > New deployment
 *    - Select type: Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 *    - Click Deploy
 *
 * 5. Copy the Web app URL and paste it below
 *
 * 6. The form will now save emails to your Google Sheet!
 */
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwhtkf5MnX4Tl3Z2LyO60Ki01la72MmLqPuALMQhvkm2yXvpNYyE9FKJ09v1LmYONJr/exec'; // Paste your Google Apps Script Web App URL here

const SignupOverlay = ({ onDismiss }) => {
  const [firstName, setFirstName] = useState('');
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
    localStorage.setItem(STORAGE_KEY, 'true');
    setTimeout(onDismiss, 300);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!firstName.trim()) {
      setError('Please enter your first name');
      return;
    }

    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);

    try {
      // If Google Script URL is configured, submit to it
      if (GOOGLE_SCRIPT_URL) {
        await fetch(GOOGLE_SCRIPT_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            firstName,
            email,
            timestamp: new Date().toISOString(),
            source: 'landing_overlay'
          }),
        });
      }

      // Mark as submitted and store locally as backup
      setIsSubmitted(true);
      localStorage.setItem(STORAGE_KEY, 'true');
      localStorage.setItem('mvpclub_signup_email', email);
      localStorage.setItem('mvpclub_signup_firstname', firstName);

      // Auto-dismiss after showing success
      setTimeout(() => {
        setIsVisible(false);
        setTimeout(onDismiss, 300);
      }, 2500);

    } catch (err) {
      // Even if fetch fails, we store locally and show success
      // (no-cors mode doesn't return response status)
      setIsSubmitted(true);
      localStorage.setItem(STORAGE_KEY, 'true');
      localStorage.setItem('mvpclub_signup_email', email);
      localStorage.setItem('mvpclub_signup_firstname', firstName);

      setTimeout(() => {
        setIsVisible(false);
        setTimeout(onDismiss, 300);
      }, 2500);
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
        <div
          className="absolute top-1/2 left-1/4 w-48 h-48 rounded-full opacity-5"
          style={{
            backgroundColor: 'var(--color-accent-lifted)',
            animation: 'float 8s ease-in-out infinite',
            animationDelay: '-1.5s'
          }}
        />
      </div>

      {/* Dismiss button */}
      <button
        onClick={handleDismiss}
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
            {/* Headline */}
            <h1
              className="text-3xl md:text-4xl lg:text-5xl font-medium mb-4 leading-tight"
              style={{
                color: 'white',
                fontFamily: "'Zilla Slab', serif"
              }}
            >
              Build Real AI Skills,{' '}
              <span style={{ color: 'var(--color-accent-lifted)' }}>
                Not Just Knowledge
              </span>
            </h1>

            {/* Subheadline */}
            <p
              className="text-lg md:text-xl mb-8 leading-relaxed"
              style={{ color: 'rgba(255,255,255,0.8)' }}
            >
              Join practitioners learning to work with AI through practice,
              not just theory. Get updates on workshops and community events.
            </p>

            {/* Email form */}
            <form onSubmit={handleSubmit} className="mb-6">
              <div className="flex flex-col gap-3 max-w-md mx-auto">
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="First name"
                  className="w-full px-5 py-4 rounded-lg text-base outline-none transition-all duration-200"
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.95)',
                    color: 'var(--color-primary)',
                    border: '2px solid transparent',
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'var(--color-accent)'}
                  onBlur={(e) => e.target.style.borderColor = 'transparent'}
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  className="w-full px-5 py-4 rounded-lg text-base outline-none transition-all duration-200"
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
                  className="w-full px-6 py-4 rounded-lg font-semibold transition-all duration-200 hover:scale-105 disabled:opacity-70 disabled:hover:scale-100 flex items-center justify-center gap-2"
                  style={{
                    backgroundColor: 'var(--color-accent)',
                    color: 'white',
                  }}
                >
                  {isSubmitting ? (
                    <span className="animate-pulse">Joining...</span>
                  ) : (
                    <>
                      Join <ArrowRight size={18} />
                    </>
                  )}
                </button>
              </div>
              {error && (
                <p className="mt-3 text-sm text-center" style={{ color: '#f87171' }}>
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
                Free workshops
              </span>
              <span>•</span>
              <span>No spam, ever</span>
              <span>•</span>
              <span>Unsubscribe anytime</span>
            </div>

            {/* Skip link */}
            <button
              onClick={handleDismiss}
              className="text-sm transition-colors duration-200"
              style={{ color: 'rgba(255,255,255,0.5)' }}
              onMouseEnter={(e) => e.target.style.color = 'rgba(255,255,255,0.8)'}
              onMouseLeave={(e) => e.target.style.color = 'rgba(255,255,255,0.5)'}
            >
              Skip for now, take me to the site →
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
              You're in{firstName ? `, ${firstName}` : ''}!
            </h2>
            <p
              className="text-lg"
              style={{ color: 'rgba(255,255,255,0.8)' }}
            >
              Welcome to the community. We'll be in touch soon.
            </p>
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

// Hook to check if overlay should be shown
export const useSignupOverlay = () => {
  const [shouldShow, setShouldShow] = useState(false);

  useEffect(() => {
    // Check if user has already dismissed or signed up
    const dismissed = localStorage.getItem(STORAGE_KEY);
    if (!dismissed) {
      // Small delay before showing for smoother experience
      const timer = setTimeout(() => setShouldShow(true), 500);
      return () => clearTimeout(timer);
    }
  }, []);

  const dismiss = () => setShouldShow(false);

  return { shouldShow, dismiss };
};

export default SignupOverlay;
