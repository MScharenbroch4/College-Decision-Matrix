import { loadStripe } from '@stripe/stripe-js';

export const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export const PREMIUM_PRICE_ID = 'price_premium'; // You'll need to set this to your actual Stripe price ID
