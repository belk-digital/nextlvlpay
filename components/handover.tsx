'use client';

import React, { useState } from 'react';
import { HANDOVER_YOU_KEEP, HANDOVER_WE_TAKE } from '@/lib/site';
import { Reveal } from './reveal';

export function Handover() {
  const [activeItem, setActiveItem] = useState<string | null>(null);

  return (
    <section id="handover" className="py-24 md:py-36 bg-paper border-b border-soft">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Heading */}
        <Reveal>
          <div className="max-w-3xl mb-16 md:mb-24">
            <h2 className="text-[clamp(2rem,4vw,3.25rem)] font-bold tracking-[-0.02em] leading-[1.1] text-ink">
              What you keep, what we take
            </h2>
          </div>
        </Reveal>

        {/* Asymmetric 2-Column Handover Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column (Columns 1-4): You keep (Short) */}
          <div className="lg:col-span-4 lg:sticky lg:top-28">
            <Reveal delayMs={100}>
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-ink mb-6 flex items-center gap-2">
                <span>You keep</span>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-soft text-ink-muted">
                  Your craft
                </span>
              </h3>

              <ul className="space-y-5 border-l-2 border-soft pl-5">
                {HANDOVER_YOU_KEEP.map((item) => (
                  <li
                    key={item}
                    className="text-lg sm:text-xl font-medium text-ink-muted leading-[1.4] transition-colors hover:text-ink cursor-default"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* Right Column (Columns 5-12): We take (Substantial, 6 Items) */}
          <div className="lg:col-span-8">
            <Reveal delayMs={200}>
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-ink mb-6 flex items-center gap-2">
                <span>We take</span>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-field/10 text-field">
                  6 operational systems
                </span>
              </h3>

              <div className="divide-y divide-soft border-t border-soft">
                {HANDOVER_WE_TAKE.map((item, index) => {
                  const isActive = activeItem === item.title;

                  return (
                    <Reveal key={item.title} delayMs={index * 60}>
                      <div
                        onMouseEnter={() => setActiveItem(item.title)}
                        onMouseLeave={() => setActiveItem(null)}
                        className={`py-8 sm:py-10 px-5 -mx-5 rounded-xl transition-all duration-200 group cursor-default ${
                          isActive
                            ? 'bg-[#F6F7FC] shadow-xs'
                            : 'hover:bg-[#FAFBFD]'
                        }`}
                      >
                        <div className="flex items-baseline justify-between gap-4 mb-3">
                          <h4 className="text-2xl sm:text-3xl font-bold text-ink tracking-tight group-hover:text-field transition-colors duration-200">
                            {item.title}
                          </h4>
                          <span
                            className={`text-xs font-medium px-2 py-0.5 rounded transition-opacity duration-200 ${
                              isActive
                                ? 'bg-field text-paper opacity-100'
                                : 'opacity-0 group-hover:opacity-100 bg-soft text-ink-muted'
                            }`}
                          >
                            NextLvlPay handles
                          </span>
                        </div>
                        <p className="text-base sm:text-lg text-ink-muted leading-[1.6] max-w-[62ch]">
                          {item.description}
                        </p>
                      </div>
                    </Reveal>
                  );
                })}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
