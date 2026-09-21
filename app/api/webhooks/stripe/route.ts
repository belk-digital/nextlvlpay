import { stripe } from '@/lib/stripe';

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

// Fallback path for when the customer's browser never makes it back to the merchant site.
// This never sends the merchant a verdict it has to trust blindly — it only pings "check this
// order," and the merchant re-verifies the real status via an authenticated call back to our
// own /api/payments/status before finalizing anything. The one exception is the 'failed' ping,
// which the merchant only uses to cancel a still-pending order and release its reservation —
// a safe, reversible action even in the worst case of a spoofed ping. 'refunded' is the same
// kind of ping: the merchant re-reads the refunded amount from /api/payments/status itself.
//
// Resolves true when the merchant took the ping, false when it should be retried (network failure
// or a 5xx). Stripe re-delivers a webhook only if we answer with an error, so a merchant outage
// during the one moment a payment succeeded must surface as a non-2xx here — swallowing it would
// leave a paid order unrecorded until someone noticed.
async function notifyMerchant(orderId: string, eventType: 'succeeded' | 'failed' | 'refunded'): Promise<boolean> {
  const helixBaseUrl = process.env.HELIXBIO_BASE_URL;
  const secret = process.env.NEXTLVLPAY_API_SECRET;
  if (!helixBaseUrl || !secret) {
    console.error('Cannot notify merchant: HELIXBIO_BASE_URL or NEXTLVLPAY_API_SECRET not set');
    return true; // Misconfiguration — retrying the same event cannot fix it.
  }

  try {
    const res = await fetch(`${helixBaseUrl}/api/webhooks/nextlvlpay`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${secret}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ orderId, eventType }),
    });
    if (res.status >= 500) {
      console.error(`Merchant answered ${res.status} for order ${orderId} (${eventType}); asking Stripe to retry`);
      return false;
    }
    return true;
  } catch (err) {
    console.error(`Failed to notify merchant for order ${orderId}:`, err);
    return false;
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const signature = req.headers.get('stripe-signature') as string;

    let event: any;
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret as string);
    } catch (err: any) {
      console.error('Webhook signature verification failed.', err.message);
      return new Response(`Webhook Error: ${err.message}`, { status: 400 });
    }

    if (event.type === 'payment_intent.succeeded' || event.type === 'payment_intent.payment_failed') {
      const paymentIntent = event.data.object;
      const orderId = paymentIntent.metadata?.helixOrderId;
      if (orderId) {
        const delivered = await notifyMerchant(
          String(orderId),
          event.type === 'payment_intent.succeeded' ? 'succeeded' : 'failed',
        );
        if (!delivered) return new Response('Merchant unavailable, retry', { status: 503 });
      }
    }

    // A refund issued from the Stripe dashboard. The Charge object carries no PaymentIntent
    // metadata, so look the PaymentIntent up to learn which merchant order it belongs to.
    if (event.type === 'charge.refunded') {
      const charge = event.data.object;
      const paymentIntentId = typeof charge.payment_intent === 'string' ? charge.payment_intent : charge.payment_intent?.id;
      if (paymentIntentId) {
        const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
        const orderId = paymentIntent.metadata?.helixOrderId;
        if (orderId) {
          const delivered = await notifyMerchant(String(orderId), 'refunded');
          if (!delivered) return new Response('Merchant unavailable, retry', { status: 503 });
        }
      }
    }

    return new Response('Webhook handled successfully', { status: 200 });
  } catch (error: any) {
    console.error('Webhook error:', error);
    return new Response(`Webhook Error: ${error.message}`, { status: 400 });
  }
}
