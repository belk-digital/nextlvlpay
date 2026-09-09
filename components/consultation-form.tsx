'use client';

import React, { useState, useEffect } from 'react';
import { SITE } from '@/lib/site';
import { Reveal } from './reveal';
import { CheckIcon } from './icons';

interface FormState {
  name: string;
  businessName: string;
  businessType: string;
  email: string;
  phone: string;
  helpWith: string;
}

interface ErrorsState {
  name?: string;
  businessName?: string;
  email?: string;
}

const BUSINESS_TYPES = [
  'Salon / Studio',
  'Clinic / Health',
  'Trades / Services',
  'Agency / Reseller',
  'Other',
];

const NEED_PRESETS = [
  'Full admin takeover',
  'Booking & reminders',
  'Invoicing & collections',
  'Payments & card reconciliation',
];

export function ConsultationForm() {
  const [formData, setFormData] = useState<FormState>({
    name: '',
    businessName: '',
    businessType: '',
    email: '',
    phone: '',
    helpWith: '',
  });

  const [selectedNeeds, setSelectedNeeds] = useState<string[]>([]);
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
  const [errors, setErrors] = useState<ErrorsState>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const isEndpointPlaceholder =
    !SITE.formEndpoint || (SITE.formEndpoint as string) === '[FORM_ENDPOINT]';

  useEffect(() => {
    if (isEndpointPlaceholder) {
      console.warn(
        'NextLvlPay: Consultation form is in active demonstration mode. To route submissions to an external endpoint, configure SITE.formEndpoint in lib/site.ts.'
      );
    }
  }, [isEndpointPlaceholder]);

  const validate = (): boolean => {
    const newErrors: ErrorsState = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Enter your name.';
    }

    if (!formData.businessName.trim()) {
      newErrors.businessName = 'Enter your business name.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Enter an email address we can reply to.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    validate();
  };

  const toggleNeed = (need: string) => {
    const exists = selectedNeeds.includes(need);
    const updated = exists
      ? selectedNeeds.filter((n) => n !== need)
      : [...selectedNeeds, need];

    setSelectedNeeds(updated);

    // If helpWith doesn't have custom text or just has previous presets, update it cleanly
    if (!formData.helpWith || NEED_PRESETS.some((preset) => formData.helpWith.includes(preset))) {
      setFormData((prev) => ({
        ...prev,
        helpWith: updated.length > 0 ? `Interested in: ${updated.join(', ')}` : '',
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    if (isEndpointPlaceholder) {
      // Simulate successful receipt in demo mode
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitStatus('success');
      }, 500);
      return;
    }

    try {
      const response = await fetch(SITE.formEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          businessName: formData.businessName,
          businessType: formData.businessType,
          selectedNeeds,
          email: formData.email,
          phone: formData.phone,
          helpWith: formData.helpWith,
          source: 'nextlvlpay.com',
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
      } else {
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim());

  return (
    <section id="consultation" className="py-24 md:py-36 bg-paper border-b border-soft">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="max-w-2xl">
          {/* Section Heading with Reveal */}
          <Reveal>
            <h2 className="text-[clamp(2rem,4vw,3.25rem)] font-bold tracking-[-0.02em] leading-[1.1] text-ink">
              Start with a phone call
            </h2>
            <p className="mt-5 text-lg sm:text-xl text-ink-muted leading-[1.6]">
              Tell us how you get paid today and we&apos;ll show you exactly what we&apos;d take off your hands. Fifteen minutes, no obligation.
            </p>
          </Reveal>

          {/* Form / Status Containers */}
          <Reveal delayMs={150}>
            <div className="mt-12">
              {submitStatus === 'success' ? (
                <div
                  role="status"
                  className="p-8 border border-positive bg-positive-bg text-positive rounded-xl shadow-xs"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="w-8 h-8 rounded-full bg-positive text-paper flex items-center justify-center">
                      <CheckIcon size={18} />
                    </span>
                    <h3 className="text-xl font-bold tracking-tight">
                      Request sent. We&apos;ll reply within one business day.
                    </h3>
                  </div>
                  <p className="text-sm opacity-90 pl-11">
                    Check your inbox for a confirmation. We look forward to talking through your workflow.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-6">
                  {submitStatus === 'error' && (
                    <div
                      role="alert"
                      className="p-5 border border-red-200 bg-red-50 text-red-800 text-sm rounded-lg"
                    >
                      That didn&apos;t send. Email us at{' '}
                      <a
                        href={`mailto:${SITE.email}`}
                        className="underline font-semibold hover:text-red-900"
                      >
                        {SITE.email}
                      </a>{' '}
                      and we&apos;ll pick it up from there.
                    </div>
                  )}

                  {/* Interactive Business Type Chips */}
                  <div>
                    <span className="block text-xs font-bold text-ink uppercase tracking-wider mb-2.5">
                      Business Type
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {BUSINESS_TYPES.map((type) => {
                        const isSelected = formData.businessType === type;
                        return (
                          <button
                            key={type}
                            type="button"
                            onClick={() =>
                              setFormData((prev) => ({
                                ...prev,
                                businessType: isSelected ? '' : type,
                              }))
                            }
                            className={`px-3.5 py-2 rounded-lg text-xs font-semibold border transition-all duration-150 focus-visible:ring-2 focus-visible:ring-field ${
                              isSelected
                                ? 'bg-field text-paper border-field shadow-xs'
                                : 'bg-paper text-ink-muted border-soft hover:border-ink/30 hover:text-ink'
                            }`}
                          >
                            {type}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Your name */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label
                        htmlFor="name"
                        className="block text-sm font-semibold text-ink"
                      >
                        Your name <span className="text-field">*</span>
                      </label>
                      {formData.name.trim().length > 1 && (
                        <span className="text-xs text-positive flex items-center gap-1">
                          <CheckIcon size={14} /> Ready
                        </span>
                      )}
                    </div>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onBlur={() => handleBlur('name')}
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value });
                        if (errors.name) setErrors({ ...errors, name: undefined });
                      }}
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? 'name-error' : undefined}
                      className={`w-full px-4 py-3 bg-paper border ${
                        errors.name
                          ? 'border-red-500'
                          : touched.name && formData.name.trim()
                          ? 'border-positive/60'
                          : 'border-soft'
                      } rounded-lg text-ink focus-visible:border-field text-base transition-colors`}
                    />
                    {errors.name && (
                      <p id="name-error" className="mt-1.5 text-sm text-red-600">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Business name */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label
                        htmlFor="businessName"
                        className="block text-sm font-semibold text-ink"
                      >
                        Business name <span className="text-field">*</span>
                      </label>
                      {formData.businessName.trim().length > 1 && (
                        <span className="text-xs text-positive flex items-center gap-1">
                          <CheckIcon size={14} /> Ready
                        </span>
                      )}
                    </div>
                    <input
                      type="text"
                      id="businessName"
                      name="businessName"
                      value={formData.businessName}
                      onBlur={() => handleBlur('businessName')}
                      onChange={(e) => {
                        setFormData({ ...formData, businessName: e.target.value });
                        if (errors.businessName)
                          setErrors({ ...errors, businessName: undefined });
                      }}
                      aria-invalid={Boolean(errors.businessName)}
                      aria-describedby={
                        errors.businessName ? 'businessName-error' : undefined
                      }
                      className={`w-full px-4 py-3 bg-paper border ${
                        errors.businessName
                          ? 'border-red-500'
                          : touched.businessName && formData.businessName.trim()
                          ? 'border-positive/60'
                          : 'border-soft'
                      } rounded-lg text-ink focus-visible:border-field text-base transition-colors`}
                    />
                    {errors.businessName && (
                      <p id="businessName-error" className="mt-1.5 text-sm text-red-600">
                        {errors.businessName}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label
                        htmlFor="email"
                        className="block text-sm font-semibold text-ink"
                      >
                        Email <span className="text-field">*</span>
                      </label>
                      {isEmailValid && (
                        <span className="text-xs text-positive flex items-center gap-1">
                          <CheckIcon size={14} /> Valid
                        </span>
                      )}
                    </div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onBlur={() => handleBlur('email')}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        if (errors.email) setErrors({ ...errors, email: undefined });
                      }}
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                      className={`w-full px-4 py-3 bg-paper border ${
                        errors.email
                          ? 'border-red-500'
                          : isEmailValid
                          ? 'border-positive/60'
                          : 'border-soft'
                      } rounded-lg text-ink focus-visible:border-field text-base transition-colors`}
                    />
                    {errors.email && (
                      <p id="email-error" className="mt-1.5 text-sm text-red-600">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Phone (optional) */}
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-semibold text-ink mb-2"
                    >
                      Phone <span className="text-ink-muted font-normal">(optional)</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-paper border border-soft rounded-lg text-ink focus-visible:border-field text-base transition-colors"
                    />
                  </div>

                  {/* Interactive Needs Selector Chips */}
                  <div>
                    <span className="block text-xs font-bold text-ink uppercase tracking-wider mb-2">
                      What would you like us to take over?
                    </span>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {NEED_PRESETS.map((preset) => {
                        const isSelected = selectedNeeds.includes(preset);
                        return (
                          <button
                            key={preset}
                            type="button"
                            onClick={() => toggleNeed(preset)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 focus-visible:ring-2 focus-visible:ring-field ${
                              isSelected
                                ? 'bg-ink text-paper border-ink'
                                : 'bg-paper text-ink-muted border-soft hover:border-ink/30 hover:text-ink'
                            }`}
                          >
                            {isSelected ? '✓ ' : '+ '}
                            {preset}
                          </button>
                        );
                      })}
                    </div>

                    {/* What do you need help with? (optional textarea) */}
                    <label
                      htmlFor="helpWith"
                      className="block text-sm font-semibold text-ink mb-2"
                    >
                      What do you need help with?{' '}
                      <span className="text-ink-muted font-normal">(optional)</span>
                    </label>
                    <textarea
                      id="helpWith"
                      name="helpWith"
                      rows={4}
                      value={formData.helpWith}
                      onChange={(e) =>
                        setFormData({ ...formData, helpWith: e.target.value })
                      }
                      placeholder="Tell us about your current booking or invoicing setup..."
                      className="w-full px-4 py-3 bg-paper border border-soft rounded-lg text-ink focus-visible:border-field text-base resize-y transition-colors"
                    />
                  </div>

                  {/* Submit button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-field text-paper text-base font-semibold rounded-lg hover:bg-field-hover active:scale-[0.98] transition-all duration-150 shadow-xs focus-visible:ring-2 focus-visible:ring-field disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <span className="w-4 h-4 border-2 border-paper border-t-transparent rounded-full animate-spin" />
                          Sending...
                        </span>
                      ) : (
                        'Request a call'
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
