import React from 'react';
import { SITE } from '@/lib/site';
import { BrandLogo } from './brand-logo';

export function SiteFooter() {
  const navLinks = [
    { label: 'What we take', href: '#handover' },
    { label: 'After', href: '#after' },
    { label: 'Setup', href: '#setup' },
    { label: 'Agencies', href: '#agencies' },
  ];

  return (
    <footer className="bg-paper border-t border-soft py-16 md:py-24 text-ink">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-soft">
          {/* Col 1-5: Brand & Contact */}
          <div className="md:col-span-5 flex flex-col items-start">
            <a
              href="#"
              className="mb-4 focus-visible:ring-2 focus-visible:ring-field rounded-sm"
              aria-label="NextLvlPay home"
            >
              <BrandLogo inverted={false} />
            </a>
            <p className="text-sm text-ink-muted leading-[1.6] max-w-[36ch] mb-6">
              NextLvlPay takes over your booking, invoicing, collections, and payments — sets it all up, then runs it.
            </p>
            <div className="flex flex-col gap-2 text-sm text-ink font-medium">
              <a
                href={`mailto:${SITE.email}`}
                className="hover:text-field transition-colors"
              >
                {SITE.email}
              </a>
            </div>
          </div>

          {/* Col 6-12: Navigation Links */}
          <div className="md:col-span-7 flex flex-col md:items-end justify-start">
            <nav className="flex flex-wrap gap-x-8 gap-y-4" aria-label="Footer Navigation">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-ink-muted hover:text-ink transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
        </div>

        {/* Bottom Legal & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs text-ink-muted">
          <p>© 2026 NextLvlPay LLC</p>
          <p className="max-w-xl text-left md:text-right">
            NextLvlPay LLC is a financial operations technology provider and merchant services administrator, not an FDIC-insured bank. Banking and payment processing services are provided by licensed partner financial institutions and registered merchant acquiring banks.
          </p>
        </div>
      </div>
    </footer>
  );
}
