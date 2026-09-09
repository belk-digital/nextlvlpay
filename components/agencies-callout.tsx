import React from 'react';
import { Reveal } from './reveal';

export function AgenciesCallout() {
  return (
    <section id="agencies" className="py-20 md:py-28 bg-paper border-b border-soft">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <Reveal>
          {/* Narrow measure, offset to the right */}
          <div className="max-w-xl md:ml-auto flex flex-col items-start border-l-2 border-soft hover:border-field transition-colors duration-200 pl-6 sm:pl-8 py-2">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-ink mb-4">
              Or sell it under your own name
            </h2>
            <p className="text-base sm:text-lg text-ink-muted leading-[1.6] mb-6">
              We run the setup and the operations; you keep the client relationship and the invoice. Partner pricing, a named contact, and nothing for you to build.
            </p>
            <a
              href="#consultation"
              className="text-base font-semibold text-field hover:underline transition-all inline-flex items-center gap-1.5 focus-visible:ring-2 focus-visible:ring-field rounded-sm"
            >
              Talk to us about partnering
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
