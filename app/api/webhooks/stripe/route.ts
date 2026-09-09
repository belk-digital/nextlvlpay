import { stripe } from '@/lib/stripe';

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

// Fallback path for when the customer's browser never makes it back to the merchant site.
// This never sends the merchant a verdict it has to trust blindly — it only pings "check this
// order," and the merchant re-verifies the real status via an authenticated call back to our
// own /api/payments/status before finalizing anything. The one exception is the 'failed' ping,
// which the merchant only uses to cancel a still-pending order and release its reservation —
// a safe, reversible action even in the worst case of a spoofed ping.
async function notifyMerchant(orderId: string, eventType: 'succeeded' | 'failed') {
  const helixBaseUrl = process.env.HELIXBIO_BASE_URL;
  const secret = process.env.NEXTLVLPAY_API_SECRET;
  if (!helixBaseUrl || !secret) {
    console.error('Cannot notify merchant: HELIXBIO_BASE_URL or NEXTLVLPAY_API_SECRET not set');
    return;
  }

  try {
    await fetch(`${helixBaseUrl}/api/webhooks/nextlvlpay`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${secret}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ orderId, eventType }),
    });
  } catch (err) {
    console.error(`Failed to notify merchant for order ${orderId}:`, err);
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
        await notifyMerchant(
          String(orderId),
          event.type === 'payment_intent.succeeded' ? 'succeeded' : 'failed',
        );
      }
    }

    return new Response('Webhook handled successfully', { status: 200 });
  } catch (error: any) {
    console.error('Webhook error:', error);
    return new Response(`Webhook Error: ${error.message}`, { status: 400 });
  }
}
