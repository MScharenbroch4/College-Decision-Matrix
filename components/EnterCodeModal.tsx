'use client';

import { useState } from 'react';
import { updatePremiumStatus } from '@/lib/firestore';

interface EnterCodeModalProps {
    isOpen: boolean;
    onClose: () => void;
    userId: string;
    onSuccess: () => void;
}

const DEV_CODES = (process.env.NEXT_PUBLIC_DEV_CODES || '').split(',').map(c => c.trim());

export default function EnterCodeModal({ isOpen, onClose, userId, onSuccess }: EnterCodeModalProps) {
    const [code, setCode] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            if (DEV_CODES.includes(code)) {
                await updatePremiumStatus(userId, true);
                onSuccess();
                onClose();
            } else {
                setError('Invalid code. Please try again.');
            }
        } catch (err) {
            setError('Failed to apply code. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-black bg-opacity-70"
                onClick={onClose}
            />

            <div className="relative bg-gray-900 border border-gray-700 rounded-xl p-6 max-w-md w-full">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">Enter Premium Code</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <p className="text-gray-400 mb-6">
                    Enter your premium access code to unlock the ability to compare up to 10 schools.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {error && (
                        <div className="bg-red-900/30 border border-red-500 text-red-200 px-4 py-3 rounded-lg">
                            {error}
                        </div>
                    )}

                    <input
                        type="text"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        className="input-field"
                        placeholder="Enter your code"
                        required
                    />

                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 btn-secondary"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 btn-primary disabled:opacity-50"
                        >
                            {loading ? 'Applying...' : 'Apply Code'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
