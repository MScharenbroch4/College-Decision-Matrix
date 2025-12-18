'use client';

import { useState } from 'react';
import { DEFAULT_CATEGORIES } from '@/lib/types';
import type { Category } from '@/lib/types';

interface CategoriesStepProps {
    selectedCategories: Category[];
    onCategoriesChange: (categories: Category[]) => void;
    onNext: () => void;
}

export default function CategoriesStep({ selectedCategories, onCategoriesChange, onNext }: CategoriesStepProps) {
    const [showCustomInput, setShowCustomInput] = useState(false);
    const [customName, setCustomName] = useState('');
    const [customDescription, setCustomDescription] = useState('');

    const isSelected = (categoryId: string) => {
        return selectedCategories.some(c => c.id === categoryId);
    };

    const toggleCategory = (category: Category) => {
        if (category.id === 'net-price') return; // Net Price is mandatory

        if (isSelected(category.id)) {
            onCategoriesChange(selectedCategories.filter(c => c.id !== category.id));
        } else {
            onCategoriesChange([...selectedCategories, category]);
        }
    };

    const addCustomCategory = () => {
        if (!customName.trim()) return;

        const customCategory: Category = {
            id: `custom-${Date.now()}`,
            name: customName.trim(),
            description: customDescription.trim() || 'Custom category',
            isCustom: true,
        };

        onCategoriesChange([...selectedCategories, customCategory]);
        setCustomName('');
        setCustomDescription('');
        setShowCustomInput(false);
    };

    const canProceed = selectedCategories.some(c => c.id === 'net-price');

    return (
        <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-2">Select Your Decision Criteria</h2>
            <p className="text-gray-400 mb-8">
                Choose the factors that matter most to you when comparing colleges. Net Price is mandatory and will be calculated from your cost breakdown.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {DEFAULT_CATEGORIES.map(category => {
                    const selected = isSelected(category.id);
                    const isMandatory = category.id === 'net-price';

                    return (
                        <button
                            key={category.id}
                            onClick={() => toggleCategory(category)}
                            disabled={isMandatory}
                            className={`
                card card-glow text-left transition-all
                ${selected ? 'border-primary bg-primary/10' : 'border-gray-800 hover:border-primary/50'}
                ${isMandatory ? 'opacity-100' : ''}
              `}
                        >
                            <div className="flex items-start justify-between mb-2">
                                <h3 className="font-semibold text-lg">{category.name}</h3>
                                <div className={`
                  w-6 h-6 rounded border-2 flex items-center justify-center
                  ${selected ? 'border-primary bg-primary' : 'border-gray-600'}
                `}>
                                    {selected && (
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                        </svg>
                                    )}
                                </div>
                            </div>
                            <p className="text-sm text-gray-400">{category.description}</p>
                            {isMandatory && (
                                <div className="mt-2 text-xs text-accent-green">(Required)</div>
                            )}
                        </button>
                    );
                })}

                {/* Custom categories */}
                {selectedCategories
                    .filter(c => c.isCustom)
                    .map(category => (
                        <div
                            key={category.id}
                            className="card border-primary bg-primary/10 text-left relative"
                        >
                            <button
                                onClick={() => onCategoriesChange(selectedCategories.filter(c => c.id !== category.id))}
                                className="absolute top-4 right-4 text-gray-400 hover:text-red-400"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                            <h3 className="font-semibold text-lg mb-2 pr-8">{category.name}</h3>
                            <p className="text-sm text-gray-400">{category.description}</p>
                            <div className="mt-2 text-xs text-accent-green">(Custom)</div>
                        </div>
                    ))}

                {/* Add custom category button */}
                {!showCustomInput && (
                    <button
                        onClick={() => setShowCustomInput(true)}
                        className="card border-dashed border-gray-600 hover:border-primary hover:bg-primary/5 flex items-center justify-center min-h-[140px]"
                    >
                        <div className="text-center">
                            <div className="text-3xl mb-2">+</div>
                            <div className="font-semibold">Add Custom Category</div>
                        </div>
                    </button>
                )}

                {/* Custom category input */}
                {showCustomInput && (
                    <div className="card border-primary">
                        <input
                            type="text"
                            value={customName}
                            onChange={(e) => setCustomName(e.target.value)}
                            placeholder="Category name"
                            className="input-field mb-3"
                            autoFocus
                        />
                        <input
                            type="text"
                            value={customDescription}
                            onChange={(e) => setCustomDescription(e.target.value)}
                            placeholder="Description (optional)"
                            className="input-field mb-3"
                        />
                        <div className="flex gap-2">
                            <button
                                onClick={() => {
                                    setShowCustomInput(false);
                                    setCustomName('');
                                    setCustomDescription('');
                                }}
                                className="flex-1 btn-secondary text-sm py-2"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={addCustomCategory}
                                disabled={!customName.trim()}
                                className="flex-1 btn-primary text-sm py-2 disabled:opacity-50"
                            >
                                Add
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <div className="flex justify-between items-center mt-8">
                <div className="text-gray-400">
                    {selectedCategories.length} {selectedCategories.length === 1 ? 'category' : 'categories'} selected
                </div>
                <button
                    onClick={onNext}
                    disabled={!canProceed}
                    className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed hover-glow-green"
                >
                    Continue to Weights →
                </button>
            </div>
        </div>
    );
}
