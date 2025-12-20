'use client';

import { useState, useEffect } from 'react';
import type { Category } from '@/lib/types';
import { getTotalWeight } from '@/lib/calculations';

interface WeightsStepProps {
    categories: Category[];
    weights: Record<string, number>;
    onWeightsChange: (weights: Record<string, number>) => void;
    onNext: () => void;
    onBack: () => void;
}

export default function WeightsStep({ categories, weights, onWeightsChange, onNext, onBack }: WeightsStepProps) {
    const [localWeights, setLocalWeights] = useState<Record<string, number>>(weights);

    useEffect(() => {
        setLocalWeights(weights);
    }, [weights]);

    const totalWeight = getTotalWeight(localWeights);
    // Allow a small margin of error for floating point math (99.9 - 100.1 is valid)
    const isValid = Math.abs(totalWeight - 100) < 0.2;

    const handleSliderChange = (categoryId: string, value: number) => {
        const newWeights = { ...localWeights, [categoryId]: value };
        setLocalWeights(newWeights);
        onWeightsChange(newWeights);
    };

    const handleInputChange = (categoryId: string, value: string) => {
        // Allow empty string to clear the input
        if (value === '') {
            const newWeights = { ...localWeights, [categoryId]: 0 };
            setLocalWeights(newWeights);
            onWeightsChange(newWeights);
            return;
        }

        const numValue = parseFloat(value);
        if (isNaN(numValue)) return;

        // Clamp between 0 and 100
        const clampedValue = Math.max(0, Math.min(100, numValue));
        const newWeights = { ...localWeights, [categoryId]: clampedValue };
        setLocalWeights(newWeights);
        onWeightsChange(newWeights);
    };

    const distributeEvenly = () => {
        const evenWeight = Math.floor((100 / categories.length) * 10) / 10;
        const newWeights: Record<string, number> = {};

        categories.forEach((cat, index) => {
            if (index === 0) {
                // Give the first category the remainder to ensure total is exactly 100
                newWeights[cat.id] = 100 - (evenWeight * (categories.length - 1));
            } else {
                newWeights[cat.id] = evenWeight;
            }
        });

        setLocalWeights(newWeights);
        onWeightsChange(newWeights);
    };

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-0">
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">Assign Category Weights</h2>
            <p className="text-sm sm:text-base text-gray-400 mb-6 sm:mb-8">
                Distribute 100% across your selected categories based on their importance to your decision. Use the sliders or type exact values.
            </p>

            <div className="space-y-6 mb-8">
                {categories.map(category => {
                    const weight = localWeights[category.id] || 0;
                    const displayPercentage = weight.toFixed(1);

                    return (
                        <div key={category.id} className="card card-glow">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex-1">
                                    <h3 className="font-semibold text-lg">{category.name}</h3>
                                    <p className="text-sm text-gray-400">{category.description}</p>
                                </div>
                                <div
                                    className="text-3xl font-bold ml-4"
                                    style={{
                                        color: weight > 0 ? '#22c55e' : '#6b7280',
                                    }}
                                >
                                    {displayPercentage}%
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    step="0.1"
                                    value={weight}
                                    onChange={(e) => handleSliderChange(category.id, parseFloat(e.target.value))}
                                    className="flex-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                                    style={{
                                        background: `linear-gradient(to right, #22c55e 0%, #22c55e ${weight}%, #374151 ${weight}%, #374151 100%)`,
                                    }}
                                />
                                <input
                                    type="number"
                                    min="0"
                                    max="100"
                                    step="0.1"
                                    value={weight || ''}
                                    onChange={(e) => handleInputChange(category.id, e.target.value)}
                                    className="w-24 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-center focus:outline-none focus:border-primary"
                                    placeholder="0"
                                />
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Total weight indicator */}
            <div className="card border-primary bg-primary/5 mb-8">
                <div className="flex items-center justify-between mb-3">
                    <span className="font-semibold text-lg">TOTAL WEIGHT</span>
                    <span
                        className={`text-3xl font-bold ${isValid ? 'text-accent-green' : 'text-red-400'}`}
                    >
                        {totalWeight.toFixed(1)}%
                    </span>
                </div>

                <div className="relative h-3 bg-gray-700 rounded-full overflow-hidden">
                    <div
                        className={`absolute left-0 top-0 h-full transition-all duration-300 ${isValid ? 'bg-accent-green' : totalWeight > 100 ? 'bg-red-500' : 'bg-yellow-500'
                            }`}
                        style={{ width: `${Math.min(totalWeight, 100)}%` }}
                    />
                </div>

                {!isValid && (
                    <div className="mt-3 text-sm text-red-400">
                        {totalWeight < 100
                            ? `Add ${(100 - totalWeight).toFixed(1)}% more to reach 100%`
                            : `Reduce by ${(totalWeight - 100).toFixed(1)}% to reach 100%`
                        }
                    </div>
                )}
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 mt-6">
                <div className="flex flex-col xs:flex-row gap-2 sm:gap-3">
                    <button onClick={onBack} className="btn-secondary flex-1 xs:flex-initial">
                        ← Back
                    </button>
                    <button onClick={distributeEvenly} className="btn-secondary flex-1 xs:flex-initial">
                        Distribute Evenly
                    </button>
                </div>
                <button
                    onClick={onNext}
                    disabled={!isValid}
                    className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed hover-glow-green w-full sm:w-auto"
                >
                    Continue to Schools →
                </button>
            </div>
        </div>
    );
}
