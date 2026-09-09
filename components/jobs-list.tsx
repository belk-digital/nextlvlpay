'use client';

import React, { useState } from 'react';
import { JOBS_LIST } from '@/lib/site';
import { Reveal } from './reveal';

export function JobsList() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-24 md:py-36 bg-paper border-b border-soft">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="max-w-3xl flex flex-col gap-6 sm:gap-8">
          {JOBS_LIST.map((line, index) => {
            const isLast = index === JOBS_LIST.length - 1;
            const isHovered = hoveredIndex === index;
            const isAnyHovered = hoveredIndex !== null;

            return (
              <Reveal key={line} delayMs={index * 90}>
                <div
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className={`group relative p-3.5 -m-3.5 rounded-xl transition-all duration-200 cursor-default ${
                    isHovered
                      ? 'bg-[#F4F5F9]'
                      : isAnyHovered && !isLast
                      ? 'opacity-50'
                      : 'opacity-100'
                  }`}
                >
                  <p
                    className={`text-[clamp(1.35rem,2.5vw,1.85rem)] font-medium leading-[1.45] tracking-tight transition-colors duration-200 ${
                      isLast
                        ? 'text-ink font-bold pt-2'
                        : isHovered
                        ? 'text-ink font-semibold'
                        : 'text-ink-muted'
                    }`}
                  >
                    {line}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
