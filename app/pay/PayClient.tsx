'use client';

import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { PaymentForm } from './PaymentForm';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

export function PayClient({
  clientSecret,
  returnUrl,
  amount,
  currency,
}: {
  clientSecret: string;
  returnUrl: string;
  amount: number;
  currency: string;
}) {
  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-field mb-2">
            NextLvlPay Secure Checkout
          </p>
          <p className="text-2xl font-bold text-ink">
            {(amount / 100).toLocaleString('en-US', {
              style: 'currency',
              currency: currency.toUpperCase(),
            })}
          </p>
        </div>
        <Elements stripe={stripePromise} options={{ clientSecret, appearance: { theme: 'stripe' } }}>
          <PaymentForm returnUrl={returnUrl} />
        </Elements>
      </div>
    </main>
  );
}
