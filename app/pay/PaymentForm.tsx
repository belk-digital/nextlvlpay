'use client';

import { useState } from 'react';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';

export function PaymentForm({ returnUrl }: { returnUrl: string }) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsProcessing(true);
    setError(null);

    // Required before confirmPayment — validates and collects the Payment Element's state.
    const { error: submitError } = await elements.submit();
    if (submitError) {
      setError(submitError.message || 'Please check your payment details.');
      setIsProcessing(false);
      return;
    }

    // No redirect: 'if_required' here — this page's only job is to collect payment and hand
    // the customer back to the merchant site, so we always want Stripe to redirect on completion.
    const { error: confirmError } = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: returnUrl },
    });

    if (confirmError) {
      setError(confirmError.message || 'Something went wrong. Please try again.');
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <PaymentElement options={{ layout: 'tabs' }} />

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={!stripe || isProcessing}
        className="w-full h-14 rounded-full bg-field text-paper font-semibold text-sm tracking-wide uppercase shadow-md hover:-translate-y-0.5 transition-transform disabled:opacity-50 disabled:hover:translate-y-0"
      >
        {isProcessing ? 'Processing…' : 'Pay now'}
      </button>
      <p className="text-center text-xs text-ink/40">
        Payments are securely processed by NextLvlPay via Stripe.
      </p>
    </form>
  );
}
