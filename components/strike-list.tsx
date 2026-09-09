'use client';

import React, { useState, useEffect, useCallback } from 'react';

const ITEMS = [
  'Confirming Tuesday.',
  'Rewriting the invoice.',
  'Chasing the deposit.',
  "Reconciling Friday's card batch.",
];

export function StrikeList() {
  const [struckCount, setStruckCount] = useState(0);
  const [isHoveredIndex, setIsHoveredIndex] = useState<number | null>(null);

  const startSequence = useCallback(() => {
    // Honor prefers-reduced-motion immediately
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setStruckCount(ITEMS.length);
      return;
    }

    setStruckCount(0);
    const timers: NodeJS.Timeout[] = [];
    const baseDelay = 600;
    const interval = 450;

    ITEMS.forEach((_, index) => {
      const timer = setTimeout(() => {
        setStruckCount(index + 1);
      }, baseDelay + index * interval);
      timers.push(timer);
    });

    return () => {
      timers.forEach((t) => clearTimeout(t));
    };
  }, []);

  useEffect(() => {
    const cleanup = startSequence();
    return () => {
      if (cleanup) cleanup();
    };
  }, [startSequence]);

  const toggleItem = (index: number) => {
    if (index < struckCount) {
      // Temporarily unstrike or re-strike
      setStruckCount(index);
    } else {
      setStruckCount(index + 1);
    }
  };

  return (
    <div className="w-full max-w-xl">
      <p className="sr-only">
        Administrative tasks eliminated by NextLvlPay: Confirming Tuesday, Rewriting the invoice, Chasing the deposit, Reconciling Friday&apos;s card batch.
      </p>

      <ul className="flex flex-col gap-3.5 sm:gap-4 text-left" aria-label="Eliminated administrative chores">
        {ITEMS.map((item, index) => {
          const isStruck = index < struckCount;
          const isHovered = isHoveredIndex === index;

          return (
            <li
              key={item}
              onMouseEnter={() => setIsHoveredIndex(index)}
              onMouseLeave={() => setIsHoveredIndex(null)}
              onClick={() => toggleItem(index)}
              title="Click to toggle"
              className={`relative text-xl sm:text-2xl font-medium tracking-tight transition-all duration-300 inline-block w-fit cursor-pointer select-none rounded px-1 -mx-1 ${
                isStruck ? 'opacity-45 text-paper' : 'opacity-100 text-paper font-semibold'
              } ${isHovered ? 'bg-paper/10' : ''}`}
            >
              <span className="relative inline-block">
                {item}
                {/* Strike-through rule */}
                <span
                  className="absolute left-0 top-1/2 -translate-y-1/2 h-[2px] bg-paper transition-all duration-300 ease-out pointer-events-none"
                  style={{
                    width: isStruck ? '100%' : '0%',
                  }}
                />
              </span>
            </li>
          );
        })}
      </ul>

      {/* Interactive Replay Trigger */}
      <div className="mt-6 flex items-center gap-3">
        <button
          type="button"
          onClick={startSequence}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-paper/70 hover:text-paper hover:bg-paper/10 px-2.5 py-1 rounded border border-paper/20 hover:border-paper/40 transition-all focus-visible:ring-2 focus-visible:ring-paper"
          aria-label="Replay chore elimination animation"
        >
          <span className="text-sm leading-none" aria-hidden="true">↺</span>
          <span>Replay strike</span>
        </button>
        <span className="text-xs text-paper/50 font-normal">
          Click any line to toggle
        </span>
      </div>
    </div>
  );
}
