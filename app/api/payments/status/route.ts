import { stripe } from '@/lib/stripe';
import { isAuthorizedPartnerRequest } from '@/lib/partnerAuth';

// The merchant's own status-check fallback (mirrors HelixBio's syncCircoFlowsPaymentStatus):
// it never trusts a webhook body's claim about the payment outcome, and instead asks this
// endpoint for the real, current state of the PaymentIntent straight from Stripe.
export async function POST(req: Request) {
  if (!isAuthorizedPartnerRequest(req)) {
    return new Response('Unauthorized', { status: 401 });
  }

  try {
    const { paymentIntentId } = (await req.json()) || {};
    if (!paymentIntentId) {
      return new Response('Missing paymentIntentId', { status: 400 });
    }

    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    return Response.json({
      status: paymentIntent.status,
      amount: paymentIntent.amount,
      currency: paymentIntent.currency,
      metadata: paymentIntent.metadata,
    });
  } catch (error: any) {
    console.error('nextlvlpay payments/status error:', error);
    return new Response(error.message || 'Failed to retrieve payment status', { status: 500 });
  }
}
