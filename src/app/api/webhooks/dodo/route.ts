import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

// Verify Dodo webhook signature
function verifyWebhookSignature(
  payload: string,
  signature: string,
  secret: string
): boolean {
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');
  
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  );
}

export async function POST(request: Request) {
  try {
    const payload = await request.text();
    const signature = request.headers.get('x-dodo-signature') || '';
    const webhookSecret = process.env.DODO_WEBHOOK_SECRET;

    // Verify signature in production
    if (webhookSecret && process.env.NODE_ENV === 'production') {
      if (!verifyWebhookSignature(payload, signature, webhookSecret)) {
        console.error('Invalid webhook signature');
        return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
      }
    }

    const event = JSON.parse(payload);
    console.log('Dodo webhook received:', event.type);

    switch (event.type) {
      case 'subscription.active':
      case 'subscription.created':
        await handleSubscriptionCreated(event.data);
        break;
      
      case 'subscription.updated':
        await handleSubscriptionUpdated(event.data);
        break;
      
      case 'subscription.cancelled':
      case 'subscription.expired':
        await handleSubscriptionCancelled(event.data);
        break;
      
      case 'payment.succeeded':
        await handlePaymentSucceeded(event.data);
        break;
      
      case 'payment.failed':
        await handlePaymentFailed(event.data);
        break;
      
      default:
        console.log('Unhandled event type:', event.type);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}

async function handleSubscriptionCreated(data: any) {
  const { customer, subscription, product } = data;
  
  // Find user by email
  const { data: profile, error: findError } = await supabase
    .from('profiles')
    .select('id')
    .eq('email', customer.email)
    .single();

  if (findError || !profile) {
    console.error('User not found for email:', customer.email);
    return;
  }

  // Update profile with subscription info
  const { error: updateError } = await supabase
    .from('profiles')
    .update({
      is_subscribed: true,
      subscription_id: subscription.id,
      subscription_status: 'active',
      subscription_product: product.id,
      subscription_currency: data.currency || 'USD',
      subscription_started_at: new Date().toISOString(),
      subscription_current_period_end: subscription.current_period_end,
    })
    .eq('id', profile.id);

  if (updateError) {
    console.error('Failed to update subscription:', updateError);
    return;
  }

  console.log('Subscription created for user:', profile.id);
}

async function handleSubscriptionUpdated(data: any) {
  const { subscription } = data;

  const { error } = await supabase
    .from('profiles')
    .update({
      subscription_status: subscription.status,
      subscription_current_period_end: subscription.current_period_end,
    })
    .eq('subscription_id', subscription.id);

  if (error) {
    console.error('Failed to update subscription:', error);
  }
}

async function handleSubscriptionCancelled(data: any) {
  const { subscription } = data;

  const { error } = await supabase
    .from('profiles')
    .update({
      is_subscribed: false,
      subscription_status: 'cancelled',
      subscription_cancelled_at: new Date().toISOString(),
    })
    .eq('subscription_id', subscription.id);

  if (error) {
    console.error('Failed to cancel subscription:', error);
  }
}

async function handlePaymentSucceeded(data: any) {
  const { payment, customer } = data;
  
  // Log successful payment
  console.log('Payment succeeded:', payment.id, 'for', customer.email);
  
  // Optionally record in a payments table
  // await supabase.from('payments').insert({ ... });
}

async function handlePaymentFailed(data: any) {
  const { payment, customer } = data;
  
  // Log failed payment
  console.error('Payment failed:', payment.id, 'for', customer.email);
  
  // Optionally send notification to user
  // await sendPaymentFailedEmail(customer.email);
}
