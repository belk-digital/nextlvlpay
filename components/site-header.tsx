'use client';

import React, { useState, useEffect, useRef } from 'react';
import { SITE } from '@/lib/site';
import { MenuIcon, CloseIcon } from './icons';
import { BrandLogo } from './brand-logo';

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState<string>('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 20);

      // Calculate reading scroll progress (0 - 100%)
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        setScrollProgress(Math.min(100, Math.max(0, (scrollY / docHeight) * 100)));
      }

      // Determine active section for scrollspy
      const sections = ['handover', 'after', 'setup', 'agencies', 'faq', 'consultation'];
      const scrollPosition = scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      closeButtonRef.current?.focus();

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setMobileMenuOpen(false);
          menuButtonRef.current?.focus();
        }

        if (e.key === 'Tab' && menuContainerRef.current) {
          const focusableElements = menuContainerRef.current.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          if (focusableElements.length === 0) return;

          const firstElement = focusableElements[0];
          const lastElement = focusableElements[focusableElements.length - 1];

          if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'What we take', href: '#handover', id: 'handover' },
    { label: 'After', href: '#after', id: 'after' },
    { label: 'Setup', href: '#setup', id: 'setup' },
    { label: 'Agencies', href: '#agencies', id: 'agencies' },
  ];

  const ctaHref =
    SITE.schedulerUrl && (SITE.schedulerUrl as string) !== '[CALENDLY_OR_SIMILAR_URL]'
      ? SITE.schedulerUrl
      : '#consultation';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 ${
        isScrolled
          ? 'bg-paper/95 backdrop-blur-sm border-b border-soft text-ink shadow-xs'
          : 'bg-transparent border-b border-transparent text-paper'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 h-20 flex items-center justify-between">
        {/* Enhanced Typographic Wordmark */}
        <a
          href="#"
          className="focus-visible:ring-2 focus-visible:ring-field rounded-sm"
          aria-label="NextLvlPay home"
        >
          <BrandLogo inverted={!isScrolled} />
        </a>

        {/* Desktop Nav with Active Scrollspy Indicators */}
        <nav
          className="hidden md:flex items-center gap-7 text-[15px] font-medium"
          aria-label="Main Navigation"
        >
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;

            return (
              <a
                key={link.href}
                href={link.href}
                className={`relative transition-colors duration-150 py-1.5 px-1 ${
                  isScrolled
                    ? isActive
                      ? 'text-field font-semibold'
                      : 'text-ink/75 hover:text-ink'
                    : isActive
                    ? 'text-paper font-semibold'
                    : 'text-paper/85 hover:text-paper'
                }`}
              >
                {link.label}
                {isActive && (
                  <span
                    className={`absolute bottom-0 left-0 right-0 h-0.5 rounded-full ${
                      isScrolled ? 'bg-field' : 'bg-paper'
                    }`}
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Desktop CTA Button */}
        <div className="hidden md:flex items-center">
          <a
            href={ctaHref}
            className={`inline-flex items-center justify-center px-5 py-2.5 text-[15px] font-semibold rounded-lg active:scale-[0.98] transition-all duration-150 shadow-xs ${
              isScrolled
                ? 'bg-field text-paper hover:bg-field-hover'
                : 'bg-paper text-field hover:bg-paper/90'
            }`}
          >
            Book a call
          </a>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden items-center">
          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label="Open navigation menu"
            className="p-2 hover:opacity-80 focus-visible:ring-2 focus-visible:ring-field"
          >
            <MenuIcon size={26} />
          </button>
        </div>
      </div>

      {/* Reading Scroll Progress Bar */}
      <div
        className="absolute bottom-0 left-0 h-[2.5px] bg-field transition-all duration-75 pointer-events-none"
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      />

      {/* Full-screen Mobile Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu"
          ref={menuContainerRef}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          className="fixed inset-0 z-50 bg-paper text-ink flex flex-col px-6 py-6"
        >
          <div className="flex items-center justify-between pb-6 border-b border-soft">
            <a
              href="#"
              onClick={() => setMobileMenuOpen(false)}
              className="focus-visible:ring-2 focus-visible:ring-field rounded-sm"
              aria-label="NextLvlPay home"
            >
              <BrandLogo inverted={false} />
            </a>
            <button
              ref={closeButtonRef}
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                menuButtonRef.current?.focus();
              }}
              aria-label="Close navigation menu"
              className="p-2 text-ink hover:text-field focus-visible:ring-2 focus-visible:ring-field"
            >
              <CloseIcon size={26} />
            </button>
          </div>

          <nav
            className="flex flex-col gap-6 py-10 flex-1 justify-center"
            aria-label="Mobile Navigation"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-2xl font-bold text-ink hover:text-field transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="pt-6 border-t border-soft">
            <a
              href={ctaHref}
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center py-4 bg-field text-paper text-lg font-medium rounded-lg hover:bg-field-hover transition-colors shadow-xs"
            >
              Book a call
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
