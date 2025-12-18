'use client';

import { useState } from 'react';
import { stripePromise } from '@/lib/stripe';

interface UpgradeModalProps {
    isOpen: boolean;
    onClose: () => void;
    userId: string;
}

export default function UpgradeModal({ isOpen, onClose, userId }: UpgradeModalProps) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    if (!isOpen) return null;

    const handleUpgrade = async () => {
        setLoading(true);
        setError('');

        try {
            const response = await fetch('/api/create-checkout-session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId }),
            });

            const { sessionId } = await response.json();

            const stripe = await stripePromise;
            if (stripe) {
                await stripe.redirectToCheckout({ sessionId });
            }
        } catch (err) {
            setError('Failed to start checkout. Please try again.');
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-black bg-opacity-70"
                onClick={onClose}
            />

            <div className="relative bg-gray-900 border border-primary rounded-xl p-8 max-w-lg w-full">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-bold text-accent-green">Upgrade to Premium</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="mb-6">
                    <div className="text-center mb-6">
                        <div className="text-5xl font-bold text-white mb-2">$9.99</div>
                        <div className="text-gray-400">One-time payment</div>
                    </div>

                    <div className="space-y-3 mb-6">
                        <div className="flex items-start gap-3">
                            <svg className="w-6 h-6 text-accent-green flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <div>
                                <div className="font-semibold">Compare up to 10 schools</div>
                                <div className="text-sm text-gray-400">Instead of just 2 schools</div>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <svg className="w-6 h-6 text-accent-green flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <div>
                                <div className="font-semibold">Unlimited custom categories</div>
                                <div className="text-sm text-gray-400">Create any criteria you want to track</div>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <svg className="w-6 h-6 text-accent-green flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <div>
                                <div className="font-semibold">Advanced cost analysis</div>
                                <div className="text-sm text-gray-400">Detailed financial breakdowns</div>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <svg className="w-6 h-6 text-accent-green flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <div>
                                <div className="font-semibold">Lifetime access</div>
                                <div className="text-sm text-gray-400">One payment, use forever</div>
                            </div>
                        </div>
                    </div>
                </div>

                {error && (
                    <div className="bg-red-900/30 border border-red-500 text-red-200 px-4 py-3 rounded-lg mb-4">
                        {error}
                    </div>
                )}

                <button
                    onClick={handleUpgrade}
                    disabled={loading}
                    className="w-full btn-primary text-lg py-4 disabled:opacity-50"
                >
                    {loading ? 'Processing...' : 'Upgrade Now'}
                </button>

                <div className="mt-4 text-center text-sm text-gray-400">
                    Secure payment powered by Stripe
                </div>
            </div>
        </div>
    );
}
