'use client';

import React, { useState, useMemo } from 'react';
import { FAQ_ITEMS } from '@/lib/site';
import { ChevronDownIcon, SearchIcon } from './icons';
import { Reveal } from './reveal';

export function Faq() {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandAll, setExpandAll] = useState(false);

  const filteredFaqs = useMemo(() => {
    if (!searchQuery.trim()) return FAQ_ITEMS;
    const query = searchQuery.toLowerCase();
    return FAQ_ITEMS.filter(
      (item) =>
        item.question.toLowerCase().includes(query) ||
        item.answer.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  return (
    <section id="faq" className="py-24 md:py-36 bg-paper border-b border-soft">
      <div className="max-w-4xl mx-auto px-6 sm:px-8">
        <Reveal>
          {/* Full-width Section Heading above the list with Interactive Controls */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10 md:mb-12">
            <div>
              <h2 className="text-[clamp(2rem,4vw,3.25rem)] font-bold tracking-[-0.02em] leading-[1.1] text-ink">
                Questions
              </h2>
              <p className="mt-3 text-base text-ink-muted">
                Clear answers on operations, migration, pricing, and timelines.
              </p>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setExpandAll(!expandAll)}
                className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-soft hover:border-ink/30 bg-paper text-ink transition-colors focus-visible:ring-2 focus-visible:ring-field"
              >
                {expandAll ? 'Collapse all' : 'Expand all'}
              </button>
            </div>
          </div>

          {/* Interactive Search / Filter Bar */}
          <div className="relative mb-8">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-ink/40">
              <SearchIcon size={18} />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search questions (e.g. pricing, banks, timing, software)..."
              className="w-full pl-10 pr-16 py-2.5 text-sm bg-paper border border-soft rounded-lg text-ink placeholder:text-ink/40 focus-visible:border-field transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-xs font-semibold text-ink-muted hover:text-ink"
              >
                Clear
              </button>
            )}
          </div>
        </Reveal>

        {/* Native Accordion with Search & Staggered Reveal */}
        <div className="divide-y divide-soft border-y border-soft">
          {filteredFaqs.length === 0 ? (
            <div className="py-12 text-center text-ink-muted text-base">
              No questions matching &ldquo;{searchQuery}&rdquo;. Email us directly or request a call.
            </div>
          ) : (
            filteredFaqs.map((item, index) => (
              <Reveal key={item.question} delayMs={index * 50}>
                <details
                  open={expandAll || index === 0}
                  className="group py-6 md:py-8 cursor-pointer focus-within:outline-none"
                >
                  <summary className="flex items-center justify-between text-lg md:text-xl font-bold text-ink hover:text-field transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-field pr-2">
                    <span className="pr-6 tracking-tight">{item.question}</span>
                    <span className="shrink-0 text-ink/40 group-hover:text-field transition-transform duration-200 group-open:rotate-180">
                      <ChevronDownIcon size={20} />
                    </span>
                  </summary>

                  <div className="mt-4 pr-6 text-base sm:text-lg text-ink-muted leading-[1.6] max-w-[64ch]">
                    {item.answer}
                  </div>
                </details>
              </Reveal>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
