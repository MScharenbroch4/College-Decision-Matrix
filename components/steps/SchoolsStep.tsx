'use client';

import { useState } from 'react';
import type { School } from '@/lib/types';
import { searchSchools, type SchoolData } from '@/lib/schools';

interface SchoolsStepProps {
    schools: School[];
    onSchoolsChange: (schools: School[]) => void;
    onNext: () => void;
    onBack: () => void;
    isPremium: boolean;
    onUpgradeClick: () => void;
}

export default function SchoolsStep({
    schools,
    onSchoolsChange,
    onNext,
    onBack,
    isPremium,
    onUpgradeClick
}: SchoolsStepProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<SchoolData[]>([]);
    const [showCustomInput, setShowCustomInput] = useState(false);
    const [customName, setCustomName] = useState('');
    const [customCity, setCustomCity] = useState('');
    const [customState, setCustomState] = useState('');

    const maxSchools = isPremium ? 10 : 2;
    const canAddMore = schools.length < maxSchools;

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        if (query.trim().length >= 2) {
            const results = searchSchools(query);
            setSearchResults(results);
        } else {
            setSearchResults([]);
        }
    };

    const addSchool = (schoolData: SchoolData) => {
        if (!canAddMore) {
            onUpgradeClick();
            return;
        }

        const school: School = {
            id: `school-${Date.now()}`,
            name: schoolData.name,
            location: `${schoolData.city}, ${schoolData.state}`,
            isCustom: false,
        };

        onSchoolsChange([...schools, school]);
        setSearchQuery('');
        setSearchResults([]);
    };

    const addCustomSchool = () => {
        if (!canAddMore) {
            onUpgradeClick();
            return;
        }

        if (!customName.trim()) return;

        const school: School = {
            id: `custom-school-${Date.now()}`,
            name: customName.trim(),
            location: `${customCity.trim()}, ${customState.trim()}`.replace(/^,\s*|,\s*$/g, ''),
            isCustom: true,
        };

        onSchoolsChange([...schools, school]);
        setCustomName('');
        setCustomCity('');
        setCustomState('');
        setShowCustomInput(false);
    };

    const removeSchool = (schoolId: string) => {
        onSchoolsChange(schools.filter(s => s.id !== schoolId));
    };

    return (
        <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-2">Select Schools to Compare</h2>
            <p className="text-gray-400 mb-8">
                Choose up to {maxSchools} colleges you're considering. Search from Division I schools or add your own.
            </p>

            {/* Search bar */}
            <div className="mb-6">
                <div className="relative">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => handleSearch(e.target.value)}
                        placeholder="Search for a college..."
                        className="input-field input-with-search"
                    />
                    <svg
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>

                {/* Search results */}
                {searchResults.length > 0 && (
                    <div className="mt-2 bg-gray-900 border border-gray-700 rounded-lg max-h-64 overflow-y-auto">
                        {searchResults.map((school, index) => {
                            const isAlreadyAdded = schools.some(s => s.name === school.name);

                            return (
                                <button
                                    key={index}
                                    onClick={() => !isAlreadyAdded && addSchool(school)}
                                    disabled={isAlreadyAdded}
                                    className={`
                    w-full text-left px-4 py-3 border-b border-gray-800 last:border-b-0
                    ${isAlreadyAdded ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-800 cursor-pointer'}
                  `}
                                >
                                    <div className="font-medium">{school.name}</div>
                                    <div className="text-sm text-gray-400">
                                        {school.city}, {school.state}
                                        {school.conference && ` • ${school.conference}`}
                                    </div>
                                    {isAlreadyAdded && (
                                        <div className="text-xs text-accent-green mt-1">✓ Already added</div>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Add custom school button */}
            <div className="mb-8">
                {!showCustomInput ? (
                    <button
                        onClick={() => {
                            if (!canAddMore) {
                                onUpgradeClick();
                                return;
                            }
                            setShowCustomInput(true);
                        }}
                        className="w-full card border-dashed hover:border-primary hover:bg-primary/5 flex items-center justify-center py-4"
                    >
                        <span className="font-semibold">+ Add Custom School</span>
                    </button>
                ) : (
                    <div className="card">
                        <h3 className="font-semibold mb-4">Add Custom School</h3>
                        <div className="space-y-3">
                            <input
                                type="text"
                                value={customName}
                                onChange={(e) => setCustomName(e.target.value)}
                                placeholder="School name"
                                className="input-field"
                                autoFocus
                            />
                            <div className="grid grid-cols-2 gap-3">
                                <input
                                    type="text"
                                    value={customCity}
                                    onChange={(e) => setCustomCity(e.target.value)}
                                    placeholder="City"
                                    className="input-field"
                                />
                                <input
                                    type="text"
                                    value={customState}
                                    onChange={(e) => setCustomState(e.target.value)}
                                    placeholder="State"
                                    className="input-field"
                                    maxLength={2}
                                />
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => {
                                        setShowCustomInput(false);
                                        setCustomName('');
                                        setCustomCity('');
                                        setCustomState('');
                                    }}
                                    className="flex-1 btn-secondary"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={addCustomSchool}
                                    disabled={!customName.trim()}
                                    className="flex-1 btn-primary disabled:opacity-50 hover-glow-green"
                                >
                                    Add School
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Selected schools */}
            {schools.length > 0 && (
                <div className="mb-8">
                    <h3 className="font-semibold text-lg mb-4">Selected Schools ({schools.length}/{maxSchools})</h3>
                    <div className="space-y-3">
                        {schools.map(school => (
                            <div key={school.id} className="card border-primary bg-primary/5 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="text-3xl">🎓</div>
                                    <div>
                                        <div className="font-semibold">{school.name}</div>
                                        <div className="text-sm text-gray-400">{school.location}</div>
                                    </div>
                                </div>
                                <button
                                    onClick={() => removeSchool(school.id)}
                                    className="w-10 h-10 rounded-full bg-red-500/20 hover:bg-red-500/30 text-red-400 flex items-center justify-center transition-all"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Premium limit notice */}
            {!isPremium && schools.length >= 2 && (
                <div className="mb-8 card border-accent-green bg-accent-green/5">
                    <div className="flex items-start gap-3">
                        <svg className="w-6 h-6 text-accent-green flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div>
                            <div className="font-semibold mb-1">Free plan limit reached</div>
                            <div className="text-sm text-gray-400 mb-3">
                                You've added the maximum of 2 schools. Upgrade to premium to compare up to 10 schools.
                            </div>
                            <button onClick={onUpgradeClick} className="btn-primary text-sm hover-glow-green">
                                Upgrade to Premium
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="flex justify-between items-center">
                <button onClick={onBack} className="btn-secondary">
                    ← Back
                </button>
                <button
                    onClick={onNext}
                    disabled={schools.length === 0}
                    className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed hover-glow-green"
                >
                    Continue to Decision Matrix →
                </button>
            </div>
        </div>
    );
}
