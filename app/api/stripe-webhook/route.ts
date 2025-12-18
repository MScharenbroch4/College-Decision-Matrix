import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { updatePremiumStatus } from '@/lib/firestore';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2024-11-20.acacia',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: NextRequest) {
    const body = await request.text();
    const signature = request.headers.get('stripe-signature');

    if (!signature) {
        return NextResponse.json({ error: 'No signature' }, { status: 400 });
    }

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err: any) {
        console.error('Webhook signature verification failed:', err.message);
        return NextResponse.json({ error: err.message }, { status: 400 });
    }

    // Handle the checkout.session.completed event
    if (event.type === 'checkout.session.completed') {
        const session = event.data.object as Stripe.Checkout.Session;
        const userId = session.metadata?.userId || session.client_reference_id;

        if (userId) {
            try {
                // Update user's premium status in Firestore
                await updatePremiumStatus(userId, true);
                console.log(`Premium status updated for user: ${userId}`);
            } catch (error) {
                console.error('Error updating premium status:', error);
                return NextResponse.json({ error: 'Failed to update premium status' }, { status: 500 });
            }
        }
    }

    return NextResponse.json({ received: true });
}
