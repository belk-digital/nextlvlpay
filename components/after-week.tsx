'use client';

import React, { useState, useEffect, useRef } from 'react';
import { AFTER_WEEK_DAYS } from '@/lib/site';
import { Reveal } from './reveal';

export function AfterWeek() {
  const [activeDay, setActiveDay] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const playIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Automatic week walk-through simulation
  useEffect(() => {
    if (isPlaying) {
      let currentIndex = 0;
      setActiveDay(AFTER_WEEK_DAYS[0].day);

      playIntervalRef.current = setInterval(() => {
        currentIndex = (currentIndex + 1) % AFTER_WEEK_DAYS.length;
        setActiveDay(AFTER_WEEK_DAYS[currentIndex].day);
      }, 1400);
    } else {
      if (playIntervalRef.current) {
        clearInterval(playIntervalRef.current);
      }
    }

    return () => {
      if (playIntervalRef.current) clearInterval(playIntervalRef.current);
    };
  }, [isPlaying]);

  const handleSelectDay = (day: string) => {
    setIsPlaying(false);
    setActiveDay(activeDay === day ? null : day);
  };

  return (
    <section id="after" className="py-24 md:py-36 bg-field text-paper">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Heading */}
        <Reveal>
          <div className="max-w-3xl mb-10 md:mb-14">
            <h2 className="text-[clamp(2rem,4vw,3.25rem)] font-bold tracking-[-0.02em] leading-[1.1] text-paper">
              What the week does on its own
            </h2>
            <p className="mt-4 text-lg text-paper/80">
              Monday through Friday running automatically without your manual intervention.
            </p>
          </div>
        </Reveal>

        {/* Day Quick-Selector Tabs & Play Button */}
        <Reveal delayMs={100}>
          <div className="flex flex-wrap items-center gap-2 mb-8">
            {AFTER_WEEK_DAYS.map((item) => {
              const isSelected = activeDay === item.day;
              return (
                <button
                  key={item.day}
                  type="button"
                  onClick={() => handleSelectDay(item.day)}
                  className={`px-3.5 py-1.5 rounded-lg text-sm font-semibold transition-all duration-150 focus-visible:ring-2 focus-visible:ring-paper ${
                    isSelected
                      ? 'bg-paper text-field shadow-sm'
                      : 'bg-paper/10 text-paper hover:bg-paper/20'
                  }`}
                >
                  {item.day.slice(0, 3)}
                </button>
              );
            })}

            <button
              type="button"
              onClick={() => setIsPlaying(!isPlaying)}
              className="sm:ml-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-paper/15 hover:bg-paper/25 text-paper transition-colors focus-visible:ring-2 focus-visible:ring-paper"
              aria-label={isPlaying ? 'Pause week simulation' : 'Play automated week timeline'}
            >
              <span>{isPlaying ? '⏸ Pause' : '▶ Simulate week'}</span>
            </button>
          </div>
        </Reveal>

        {/* Interactive Monday through Friday Timeline */}
        <Reveal delayMs={150}>
          <div className="max-w-4xl divide-y divide-paper/20 border-y border-paper/20">
            {AFTER_WEEK_DAYS.map((item) => {
              const isActive = activeDay === item.day;

              return (
                <div
                  key={item.day}
                  onMouseEnter={() => {
                    if (!isPlaying) setActiveDay(item.day);
                  }}
                  onMouseLeave={() => {
                    if (!isPlaying) setActiveDay(null);
                  }}
                  onClick={() => handleSelectDay(item.day)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleSelectDay(item.day);
                    }
                  }}
                  className={`py-7 sm:py-9 px-4 sm:px-6 -mx-4 sm:-mx-6 rounded-xl transition-all duration-200 cursor-pointer grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-8 items-baseline ${
                    isActive
                      ? 'bg-paper/15 shadow-inner'
                      : 'hover:bg-paper/5'
                  }`}
                >
                  {/* Day Label */}
                  <div className="sm:col-span-3 text-lg font-medium tracking-tight flex items-center gap-3">
                    <span
                      className={`w-2.5 h-2.5 rounded-full transition-all duration-200 ${
                        isActive ? 'bg-positive scale-125' : 'bg-paper/40'
                      }`}
                      aria-hidden="true"
                    />
                    <span className={isActive ? 'text-paper font-bold' : 'text-paper/70'}>
                      {item.day}
                    </span>
                  </div>

                  {/* Event Description */}
                  <div
                    className={`sm:col-span-9 text-xl sm:text-2xl font-bold tracking-tight leading-[1.35] transition-opacity duration-200 ${
                      isActive ? 'text-paper opacity-100' : 'text-paper/90'
                    }`}
                  >
                    {item.event}
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>

        {/* Closing Line */}
        <Reveal delayMs={250}>
          <div className="mt-12 max-w-4xl">
            <p className="text-lg sm:text-xl font-medium text-paper/85">
              Your part of that week was showing up and doing the work.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
