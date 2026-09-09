import React from 'react';

interface BrandLogoProps {
  /** Inverted style for dark backgrounds (e.g. over ultramarine field in hero) */
  inverted?: boolean;
  className?: string;
  showIcon?: boolean;
}

/**
 * Unified Precision Lockup for NextLvlPay.
 * Rendered using Space Grotesk modernist display typography for a distinctive, high-tech fintech character.
 */
export function BrandLogo({
  inverted = false,
  className = '',
  showIcon = true,
}: BrandLogoProps) {
  return (
    <div
      className={`inline-flex items-center gap-2.5 sm:gap-3 select-none ${className}`}
      aria-label="NextLvlPay home"
    >
      {showIcon && (
        <div className="shrink-0 flex items-center justify-center">
          <svg
            width="30"
            height="30"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="rounded-[9px] shadow-xs"
            aria-hidden="true"
          >
            {/* Precision Squircle */}
            <rect
              width="32"
              height="32"
              rx="9"
              fill={inverted ? '#FFFFFF' : '#1B24D8'}
            />
            {/* Geometric Ascending Monogram */}
            <path
              d="M8 23.5V8.5H12.2L19.8 18.5V8.5H24V23.5H19.8L12.2 13.5V23.5H8Z"
              fill={inverted ? '#1B24D8' : '#FFFFFF'}
            />
          </svg>
        </div>
      )}

      {/* Bespoke Wordmark set in Space Grotesk */}
      <span
        style={{ fontFamily: 'var(--font-logo)' }}
        className={`text-[21px] sm:text-[22px] font-bold tracking-[-0.035em] leading-none inline-flex items-baseline ${
          inverted ? 'text-paper' : 'text-ink'
        }`}
      >
        <span>NextLvl</span>
        <span className={inverted ? 'text-paper' : 'text-field'}>
          Pay
        </span>
      </span>
    </div>
  );
}
