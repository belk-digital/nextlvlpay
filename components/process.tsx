import React from 'react';
import { SETUP_STEPS } from '@/lib/site';
import { Reveal } from './reveal';

export function Process() {
  return (
    <section id="setup" className="py-16 md:py-24 bg-paper border-b border-soft">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <Reveal>
          {/* Section Heading */}
          <div className="mb-10 md:mb-14">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-ink">
              From first call to live
            </h2>
          </div>
        </Reveal>

        {/* Compressed 3 Steps Band */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 pb-10 border-b border-soft">
          {SETUP_STEPS.map((step, index) => (
            <Reveal key={step.number} delayMs={index * 120}>
              <div className="flex flex-col group p-5 -m-5 rounded-xl border border-transparent hover:border-soft hover:bg-[#FAFBFD] transition-all duration-200 cursor-default">
                <span className="text-xs font-extrabold text-field tracking-wider mb-3">
                  0{step.number}
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-ink tracking-tight mb-2 group-hover:text-field transition-colors">
                  {step.title}
                </h3>
                <p className="text-sm sm:text-base text-ink-muted leading-[1.55]">
                  {step.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Beneath Line */}
        <Reveal delayMs={240}>
          <div className="pt-6">
            <p className="text-sm font-medium text-ink-muted">
              Most businesses are through all three inside a week.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
