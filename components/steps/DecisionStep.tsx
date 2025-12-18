'use client';

import { useState } from 'react';
import type { School, Category, CostData } from '@/lib/types';
import { calculateCompositeScore, calculateNetPrice, netPriceToRating } from '@/lib/calculations';

interface DecisionStepProps {
    schools: School[];
    categories: Category[];
    weights: Record<string, number>;
    ratings: Record<string, Record<string, number>>;
    costs: Record<string, CostData>;
    onRatingsChange: (ratings: Record<string, Record<string, number>>) => void;
    onCostsChange: (costs: Record<string, CostData>) => void;
    onBack: () => void;
}

export default function DecisionStep({
    schools,
    categories,
    weights,
    ratings,
    costs,
    onRatingsChange,
    onCostsChange,
    onBack,
}: DecisionStepProps) {
    const [activeTab, setActiveTab] = useState<'matrix' | 'cost'>('matrix');

    const setRating = (schoolId: string, categoryId: string, rating: number) => {
        const newRatings = {
            ...ratings,
            [schoolId]: {
                ...(ratings[schoolId] || {}),
                [categoryId]: rating,
            },
        };
        onRatingsChange(newRatings);
    };

    const setCost = (schoolId: string, field: keyof CostData, value: number) => {
        const schoolCosts = costs[schoolId] || {
            tuition: 0,
            housing: 0,
            food: 0,
            travel: 0,
            other: 0,
            scholarships: 0,
        };

        const newCosts = {
            ...costs,
            [schoolId]: {
                ...schoolCosts,
                [field]: value,
            },
        };

        onCostsChange(newCosts);
    };

    // Calculate composite scores and rank schools
    const schoolsWithScores = schools
        .map(school => {
            const schoolRatings = ratings[school.id] || {};
            const compositeScore = calculateCompositeScore(schoolRatings, weights);
            return {
                ...school,
                compositeScore,
            };
        })
        .sort((a, b) => b.compositeScore - a.compositeScore);

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold">College Decision Matrix</h2>
                <button onClick={handlePrint} className="btn-secondary flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                    </svg>
                    Print Table
                </button>
            </div>

            {/* Tabs */}
            <div className="flex gap-4 mb-6 border-b border-gray-800">
                <button
                    onClick={() => setActiveTab('matrix')}
                    className={`px-6 py-3 font-semibold transition-all ${activeTab === 'matrix'
                        ? 'text-white border-b-2 border-primary'
                        : 'text-gray-400 hover:text-white'
                        }`}
                >
                    Decision Matrix
                </button>
                <button
                    onClick={() => setActiveTab('cost')}
                    className={`px-6 py-3 font-semibold transition-all ${activeTab === 'cost'
                        ? 'text-white border-b-2 border-primary'
                        : 'text-gray-400 hover:text-white'
                        }`}
                >
                    Cost Analysis
                </button>
            </div>

            {/* Decision Matrix Tab */}
            {activeTab === 'matrix' && (
                <div className="space-y-6">
                    <div className="bg-blue-900/20 border border-blue-500/50 rounded-lg p-4">
                        <p className="text-sm text-blue-200">
                            <strong>Note:</strong> Rate each school on each category from 0-10. For Net Price, manually assign a 0-10 rating based on cost data from the Cost Analysis tab. Schools are auto-sorted by composite score.
                        </p>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-gray-900">
                                    <th className="border border-gray-700 px-4 py-3 text-left font-semibold">RANK</th>
                                    <th className="border border-gray-700 px-4 py-3 text-left font-semibold">SCHOOL</th>
                                    {categories.map(category => (
                                        <th key={category.id} className="border border-gray-700 px-4 py-3 text-center font-semibold">
                                            <div>{category.name.toUpperCase()}</div>
                                            <div className="text-xs text-accent-green">({weights[category.id]?.toFixed(1) || 0}%)</div>
                                        </th>
                                    ))}
                                    <th className="border border-gray-700 px-4 py-3 text-center font-semibold bg-primary/20">
                                        COMPOSITE<br />SCORE
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {schoolsWithScores.map((school, index) => (
                                    <tr key={school.id} className="hover:bg-gray-900/50">
                                        <td className="border border-gray-700 px-4 py-3 text-center">
                                            <div className="text-xl font-bold text-accent-green">#{index + 1}</div>
                                        </td>
                                        <td className="border border-gray-700 px-4 py-3">
                                            <div className="flex items-center gap-2">
                                                <div className="text-2xl">🎓</div>
                                                <div>
                                                    <div className="font-semibold">{school.name}</div>
                                                    <div className="text-sm text-gray-400">{school.location}</div>
                                                </div>
                                            </div>
                                        </td>
                                        {categories.map(category => {
                                            const rating = ratings[school.id]?.[category.id] || 0;
                                            const weight = weights[category.id] || 0;
                                            const contribution = (rating * weight) / 100;
                                            const isNetPrice = category.id === 'net-price';
                                            const netPrice = isNetPrice ? calculateNetPrice(costs[school.id] || {
                                                tuition: 0, housing: 0, food: 0, travel: 0, other: 0, scholarships: 0
                                            }) : null;

                                            return (
                                                <td key={category.id} className="border border-gray-700 px-2 py-3">
                                                    <div className="flex flex-col items-center gap-1">
                                                        <input
                                                            type="number"
                                                            min="0"
                                                            max="10"
                                                            step="0.1"
                                                            value={rating || ''}
                                                            placeholder="0"
                                                            onChange={(e) => {
                                                                const val = parseFloat(e.target.value) || 0;
                                                                const clamped = Math.max(0, Math.min(10, val));
                                                                setRating(school.id, category.id, clamped);
                                                            }}
                                                            onBlur={(e) => {
                                                                // Ensure value is in range when user leaves the field
                                                                const val = parseFloat(e.target.value) || 0;
                                                                const clamped = Math.max(0, Math.min(10, val));
                                                                if (val !== clamped) {
                                                                    setRating(school.id, category.id, clamped);
                                                                }
                                                            }}
                                                            className="w-16 bg-gray-800 border border-gray-600 rounded px-2 py-1 text-center focus:outline-none focus:border-primary"
                                                        />
                                                        {isNetPrice && netPrice !== null && (
                                                            <div className="text-xs text-gray-400">
                                                                ${netPrice.toLocaleString()}
                                                            </div>
                                                        )}
                                                        <div className="text-xs text-gray-500">
                                                            = {contribution.toFixed(2)}
                                                        </div>
                                                    </div>
                                                </td>
                                            );
                                        })}
                                        <td className="border border-gray-700 px-4 py-3 text-center bg-primary/10">
                                            <div className="text-2xl font-bold text-accent-green">
                                                {school.compositeScore.toFixed(2)}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Cost Analysis Tab */}
            {activeTab === 'cost' && (
                <div className="space-y-8">
                    {schools.map(school => {
                        const schoolCosts = costs[school.id] || {
                            tuition: 0,
                            housing: 0,
                            food: 0,
                            travel: 0,
                            other: 0,
                            scholarships: 0,
                        };
                        const netPrice = calculateNetPrice(schoolCosts);
                        const netPriceRating = netPriceToRating(netPrice);

                        return (
                            <div key={school.id} className="card">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="text-4xl">🎓</div>
                                    <h3 className="text-2xl font-bold">{school.name}</h3>
                                </div>

                                {/* Annual Costs */}
                                <div className="mb-6">
                                    <h4 className="font-semibold text-lg mb-4">ANNUAL COSTS</h4>
                                    <div className="grid md:grid-cols-5 gap-4">
                                        {(['tuition', 'housing', 'food', 'travel', 'other'] as const).map(field => (
                                            <div key={field}>
                                                <label className="block text-sm font-medium mb-2 capitalize">
                                                    {field}
                                                </label>
                                                <div className="relative">
                                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">$</span>
                                                    <input
                                                        type="number"
                                                        min="0"
                                                        value={schoolCosts[field] || ''}
                                                        placeholder="0"
                                                        onChange={(e) => setCost(school.id, field, parseFloat(e.target.value) || 0)}
                                                        className="input-field input-with-dollar"
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Financial Aid */}
                                <div className="mb-6">
                                    <h4 className="font-semibold text-lg mb-4 text-accent-green">
                                        FINANCIAL AID (SUBTRACT FROM TOTAL)
                                    </h4>
                                    <div className="max-w-xs">
                                        <label className="block text-sm font-medium mb-2">
                                            Scholarships & Grants
                                        </label>
                                        <div className="relative">
                                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">$</span>
                                            <input
                                                type="number"
                                                min="0"
                                                value={schoolCosts.scholarships || ''}
                                                placeholder="0"
                                                onChange={(e) => setCost(school.id, 'scholarships', parseFloat(e.target.value) || 0)}
                                                className="input-field input-with-dollar border-accent-green focus:border-accent-green"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Total Net Price */}
                                <div className="border-t border-gray-700 pt-6">
                                    <div>
                                        <div className="text-lg font-semibold mb-2">TOTAL NET PRICE</div>
                                        <div className="text-5xl font-bold text-accent-green">
                                            ${netPrice.toLocaleString()}
                                        </div>
                                        <div className="text-sm text-gray-400 mt-3">
                                            Use this value to inform your Net Price rating in the Decision Matrix tab
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-800">
                <button onClick={onBack} className="btn-secondary">
                    ← Back
                </button>
                <div className="text-gray-400 text-sm">
                    Your progress is automatically saved
                </div>
            </div>
        </div>
    );
}
