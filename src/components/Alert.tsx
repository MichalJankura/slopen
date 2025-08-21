import React, { useEffect, useState } from 'react';

interface AlertProps {
  message: string;
  durationMs?: number; // default 7000
  onClose?: () => void;
  offsetTopClass?: string; // e.g. 'top-14' to place below navbar
}

// A top-of-page dismissing alert bar matching the site's red palette.
const Alert: React.FC<AlertProps> = ({ message, durationMs = 7000, onClose, offsetTopClass = 'top-0' }) => {
  const [visible, setVisible] = useState(true);
  const [fullyHidden, setFullyHidden] = useState(false);

  useEffect(() => {
    const hideTimer = setTimeout(() => setVisible(false), durationMs);
    return () => clearTimeout(hideTimer);
  }, [durationMs]);

  // After transition ends, unmount visually
  useEffect(() => {
    if (!visible) {
      const timer = setTimeout(() => {
        setFullyHidden(true);
        onClose && onClose();
      }, 400); // match transition duration
      return () => clearTimeout(timer);
    }
  }, [visible, onClose]);

  if (fullyHidden) return null;

  return (
    <div
      role="alert"
      aria-live="polite"
      className={`fixed left-0 right-0 ${offsetTopClass} z-40 pointer-events-none`}
    >
      <div
        className={`pointer-events-auto w-full rounded-none shadow-card border-y md:border-y md:rounded-none border-primary/60 bg-gradient-to-r from-accent via-primary to-accent text-white text-sm md:text-base font-medium tracking-wide py-2.5 md:py-3 px-4 md:px-6 transition-all duration-400 relative ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}
      >
        <span className="hidden sm:inline-block absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 backdrop-blur px-2 py-1 rounded text-[10px] md:text-xs font-bold tracking-wider uppercase">Info</span>
        <span className="block text-center leading-snug px-2 md:px-12">{message}</span>
        <button
          onClick={() => setVisible(false)}
          aria-label="Zavrieť upozornenie"
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-black/30 focus:outline-none focus:ring-2 focus:ring-white/40 transition-colors"
        >
          <svg viewBox="0 0 20 20" className="h-4 w-4" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Alert;
