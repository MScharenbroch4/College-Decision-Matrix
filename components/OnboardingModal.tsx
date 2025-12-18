'use client';

import { useEffect } from 'react';
import { ONBOARDING_CONTENT } from '@/lib/onboardingContent';

interface OnboardingModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function OnboardingModal({ isOpen, onClose }: OnboardingModalProps) {
    // Prevent body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    // Handle escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) {
            window.addEventListener('keydown', handleEscape);
        }
        return () => window.removeEventListener('keydown', handleEscape);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const handleDismiss = () => {
        // No localStorage - popup shows every time user visits Decision page
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black bg-opacity-80"
                onClick={handleDismiss}
                aria-hidden="true"
            />

            {/* Modal - centered with proper margins */}
            <div
                className="relative bg-gray-900 border border-primary rounded-xl w-full max-w-2xl mx-auto max-h-[85vh] overflow-y-auto shadow-2xl"
                role="dialog"
                aria-modal="true"
                aria-labelledby="onboarding-title"
            >
                {/* Header */}
                <div className="sticky top-0 bg-gray-900 border-b border-gray-800 px-6 py-4 flex justify-between items-center">
                    <h2 id="onboarding-title" className="text-2xl font-bold text-accent-green">
                        {ONBOARDING_CONTENT.title}
                    </h2>
                    <button
                        onClick={handleDismiss}
                        className="text-gray-400 hover:text-white transition-colors p-1"
                        aria-label="Close"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Content */}
                <div className="px-6 py-6 space-y-6">
                    {ONBOARDING_CONTENT.sections.map((section, index) => (
                        <div key={index} className="space-y-3">
                            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                                <span className="w-7 h-7 rounded-full bg-primary/30 text-primary flex items-center justify-center text-sm font-bold">
                                    {index + 1}
                                </span>
                                {section.heading}
                            </h3>
                            <div className="text-gray-300 leading-relaxed whitespace-pre-line pl-9">
                                {section.content.split('**').map((part, i) =>
                                    i % 2 === 0 ? part : <strong key={i} className="text-white">{part}</strong>
                                )}
                            </div>
                            {section.examples && (
                                <div className="pl-9 space-y-2">
                                    <div className="text-sm font-medium text-gray-400">Examples:</div>
                                    {section.examples.map((example, i) => (
                                        <div key={i} className="text-sm text-gray-400 pl-4 border-l-2 border-gray-700">
                                            {example.split('**').map((part, j) =>
                                                j % 2 === 0 ? part : <strong key={j} className="text-accent-green">{part}</strong>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}

                    {/* Visual tip */}
                    <div className="bg-blue-900/20 border border-blue-500/50 rounded-lg p-4">
                        <p className="text-sm text-blue-200">
                            <strong>💡 Pro Tip:</strong> Look for the <span className="inline-flex items-center justify-center w-5 h-5 bg-gray-700 rounded-full text-xs font-bold mx-1">?</span> icons throughout the page for quick explanations of each element.
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <div className="sticky bottom-0 bg-gray-900 border-t border-gray-800 px-6 py-4">
                    <button
                        onClick={handleDismiss}
                        className="w-full btn-primary text-lg py-3 hover-glow-green"
                    >
                        {ONBOARDING_CONTENT.dismissButtonText}
                    </button>
                </div>
            </div>
        </div>
    );
}
