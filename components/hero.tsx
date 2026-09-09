'use client';

import React, { useState, useEffect } from 'react';
import { SITE } from '@/lib/site';
import { StrikeList } from './strike-list';

export function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const primaryCtaHref =
    SITE.schedulerUrl && (SITE.schedulerUrl as string) !== '[CALENDLY_OR_SIMILAR_URL]'
      ? SITE.schedulerUrl
      : '#consultation';

  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center pt-32 pb-24 md:pt-40 md:pb-32 bg-field text-paper overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column (Columns 1-7): Oversized H1, Sub, and CTA Button with Entrance Animation */}
          <div className="lg:col-span-7 flex flex-col items-start">
            <h1
              className={`text-[clamp(2.75rem,6.5vw,5.5rem)] font-extrabold tracking-[-0.03em] leading-[0.96] text-paper max-w-[14ch] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none motion-reduce:transform-none motion-reduce:opacity-100 ${
                mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              Nobody started a business to chase invoices.
            </h1>

            <p
              style={{ transitionDelay: '120ms' }}
              className={`mt-8 text-lg sm:text-xl text-paper/90 leading-[1.6] max-w-[54ch] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none motion-reduce:transform-none motion-reduce:opacity-100 ${
                mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              NextLvlPay takes over your booking, invoicing, collections, and payments — sets it all up, then runs it. You go back to the work you actually do.
            </p>

            <div
              style={{ transitionDelay: '240ms' }}
              className={`mt-10 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none motion-reduce:transform-none motion-reduce:opacity-100 ${
                mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              <a
                href={primaryCtaHref}
                className="inline-flex items-center justify-center px-7 py-4 bg-paper text-field text-base sm:text-lg font-semibold rounded-lg hover:bg-paper/90 active:scale-[0.98] transition-all duration-150 shadow-sm focus-visible:ring-2 focus-visible:ring-paper focus-visible:ring-offset-2 focus-visible:ring-offset-field"
              >
                Book a 15-minute call
              </a>
            </div>
          </div>

          {/* Right Column (Columns 8-12): The Type-Only Animated Strike-List */}
          <div
            style={{ transitionDelay: '360ms' }}
            className={`lg:col-span-5 w-full pt-4 lg:pt-8 flex flex-col justify-center transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none motion-reduce:transform-none motion-reduce:opacity-100 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <StrikeList />
          </div>
        </div>
      </div>
    </section>
  );
}
