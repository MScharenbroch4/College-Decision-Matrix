'use client';

import { useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import { useStore } from '@/lib/store';
import { saveUserData } from '@/lib/firestore';

interface UserMenuProps {
    email: string;
    isPremium: boolean;
    onEnterCode?: () => void;
}

export default function UserMenu({ email, isPremium, onEnterCode }: UserMenuProps) {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const store = useStore();

    const handleLogout = async () => {
        // Force save before logout
        if (store.user) {
            try {
                await saveUserData(store.user.uid, {
                    email: store.user.email || '',
                    isPremium: store.isPremium,
                    categories: store.selectedCategories,
                    weights: store.weights,
                    schools: store.schools,
                    ratings: store.ratings,
                    costs: store.costs,
                });
            } catch (error) {
                console.error('Error saving data on logout:', error);
            }
        }

        await signOut(auth);
        store.resetData(); // Clear local store
        router.push('/');
    };

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-all"
            >
                <div className="text-sm">
                    <div className="font-medium">{isPremium ? 'Premium User' : 'Free User'}</div>
                    <div className="text-gray-400 text-xs">{email}</div>
                </div>
                <svg
                    className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {isOpen && (
                <>
                    <div
                        className="fixed inset-0 z-10"
                        onClick={() => setIsOpen(false)}
                    />
                    <div className="absolute right-0 mt-2 w-56 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-20">
                        <div className="p-4 border-b border-gray-700">
                            <div className="text-sm font-medium">{email}</div>
                            <div className="text-xs text-gray-400 mt-1">
                                {isPremium ? '✓ Premium Account' : 'Free Account'}
                            </div>
                        </div>

                        <div className="py-2">
                            {!isPremium && onEnterCode && (
                                <button
                                    onClick={() => {
                                        onEnterCode();
                                        setIsOpen(false);
                                    }}
                                    className="w-full text-left px-4 py-2 hover:bg-gray-700 transition-colors text-accent-green"
                                >
                                    Enter Code
                                </button>
                            )}

                            <button
                                onClick={handleLogout}
                                className="w-full text-left px-4 py-2 hover:bg-gray-700 transition-colors text-red-400"
                            >
                                Log Out
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
