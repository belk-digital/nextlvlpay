import { stripe } from '@/lib/stripe';
import { isAuthorizedPartnerRequest } from '@/lib/partnerAuth';
import { isAllowedReturnUrl } from '@/lib/allowedReturnOrigin';

// Called server-to-server by a merchant site (e.g. HelixBio) after it has already created its
// own pending order. The amount is trusted here because this endpoint is only ever reachable
// with the shared partner secret — never from a customer's browser — mirroring how HelixBio's
// own CircoFlows integration POSTs a trusted amount straight to that gateway.
export async function POST(req: Request) {
  if (!isAuthorizedPartnerRequest(req)) {
    return new Response('Unauthorized', { status: 401 });
  }

  try {
    const body = await req.json();
    const { orderId, amount, currency, returnUrl } = body || {};

    if (!orderId || typeof amount !== 'number' || amount <= 0 || !currency || !returnUrl) {
      return new Response('Missing or invalid fields', { status: 400 });
    }

    if (!isAllowedReturnUrl(returnUrl)) {
      return new Response('returnUrl is not an allowed origin', { status: 400 });
    }

    const amountInCents = Math.round(amount * 100);
    if (amountInCents < 50) {
      return new Response('Amount too low for Stripe processing (minimum $0.50)', { status: 400 });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency,
      automatic_payment_methods: { enabled: true },
      metadata: {
        helixOrderId: String(orderId),
        returnUrl,
      },
    });

    return Response.json({ paymentIntentId: paymentIntent.id });
  } catch (error: any) {
    console.error('nextlvlpay payments/create error:', error);
    return new Response(error.message || 'Failed to create payment', { status: 500 });
  }
}
