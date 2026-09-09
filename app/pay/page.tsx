import { stripe } from '@/lib/stripe';
import { isAllowedReturnUrl } from '@/lib/allowedReturnOrigin';
import { PayClient } from './PayClient';

export const metadata = {
  title: 'Complete Payment',
};

export default async function PayPage({
  searchParams,
}: {
  searchParams: Promise<{ pi?: string }>;
}) {
  const { pi } = await searchParams;

  if (!pi) {
    return <ErrorState message="Missing payment reference." />;
  }

  let paymentIntent;
  try {
    paymentIntent = await stripe.paymentIntents.retrieve(pi);
  } catch {
    return <ErrorState message="We couldn't find this payment. It may have expired." />;
  }

  // The return destination lives only in the PaymentIntent's own metadata — set once, server-side,
  // when the payment was created — never trusted from anything the browser could edit in this URL.
  const returnUrl = paymentIntent.metadata?.returnUrl;
  if (!returnUrl || !isAllowedReturnUrl(returnUrl)) {
    return <ErrorState message="This payment link is invalid." />;
  }

  if (!paymentIntent.client_secret) {
    return <ErrorState message="This payment can no longer be completed." />;
  }

  return (
    <PayClient
      clientSecret={paymentIntent.client_secret}
      returnUrl={returnUrl}
      amount={paymentIntent.amount}
      currency={paymentIntent.currency}
    />
  );
}

function ErrorState({ message }: { message: string }) {
  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-sm text-center">
        <h1 className="text-xl font-semibold text-ink mb-2">Payment unavailable</h1>
        <p className="text-sm text-ink/60">{message}</p>
      </div>
    </main>
  );
}
