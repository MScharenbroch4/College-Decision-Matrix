'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { loadUserData, debouncedSave } from '@/lib/firestore';
import { useStore } from '@/lib/store';
import { DEFAULT_CATEGORIES } from '@/lib/types';
import UserMenu from '@/components/UserMenu';
import StepIndicator from '@/components/StepIndicator';
import EnterCodeModal from '@/components/EnterCodeModal';
import UpgradeModal from '@/components/UpgradeModal';
import CategoriesStep from '@/components/steps/CategoriesStep';
import WeightsStep from '@/components/steps/WeightsStep';
import SchoolsStep from '@/components/steps/SchoolsStep';
import DecisionStep from '@/components/steps/DecisionStep';

export default function DashboardPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [showCodeModal, setShowCodeModal] = useState(false);
    const [showUpgradeModal, setShowUpgradeModal] = useState(false);
    const [userId, setUserId] = useState<string>('');

    const {
        user,
        setUser,
        isPremium,
        setIsPremium,
        currentStep,
        setCurrentStep,
        selectedCategories,
        setSelectedCategories,
        weights,
        setWeights,
        schools,
        setSchools,
        ratings,
        setRatings,
        costs,
        setCosts,
    } = useStore();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                setUser(firebaseUser);
                setUserId(firebaseUser.uid);

                // Load user data from Firestore
                const userData = await loadUserData(firebaseUser.uid);

                if (userData) {
                    setIsPremium(userData.isPremium);
                    setSelectedCategories(userData.categories.length > 0 ? userData.categories : [DEFAULT_CATEGORIES[0]]);
                    setWeights(userData.weights);
                    setSchools(userData.schools);
                    setRatings(userData.ratings);
                    setCosts(userData.costs);
                } else {
                    // Initialize with Net Price as default
                    setSelectedCategories([DEFAULT_CATEGORIES[0]]);
                }

                setLoading(false);
            } else {
                router.push('/login');
            }
        });

        return () => unsubscribe();
    }, [router, setUser, setIsPremium, setSelectedCategories, setWeights, setSchools, setRatings, setCosts]);

    // Auto-save whenever data changes
    useEffect(() => {
        if (user && !loading) {
            debouncedSave(user.uid, {
                email: user.email || '',
                isPremium,
                categories: selectedCategories,
                weights,
                schools,
                ratings,
                costs,
            });
        }
    }, [user, loading, isPremium, selectedCategories, weights, schools, ratings, costs]);

    const handleCodeSuccess = () => {
        setIsPremium(true);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <Image
                        src="/logo.png"
                        alt="Loading"
                        width={80}
                        height={80}
                        className="rounded-lg mx-auto mb-4 glow-green-sm"
                    />
                    <div className="text-xl">Loading your data...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pb-16">
            {/* Header */}
            <div className="bg-gray-900 border-b border-gray-800">
                <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Image
                            src="/logo.png"
                            alt="College Decision Matrix"
                            width={50}
                            height={50}
                            className="rounded-lg"
                        />
                        <div>
                            <h1 className="text-2xl font-bold text-accent-green">College Decision Matrix</h1>
                            <p className="text-sm text-gray-400">Make confident college decisions</p>
                        </div>
                    </div>
                    <UserMenu
                        email={user?.email || ''}
                        isPremium={isPremium}
                        onEnterCode={() => setShowCodeModal(true)}
                    />
                </div>
            </div>

            {/* Main content */}
            <div className="max-w-7xl mx-auto px-4 py-8">
                <StepIndicator
                    currentStep={currentStep}
                    onStepClick={setCurrentStep}
                />

                {currentStep === 1 && (
                    <CategoriesStep
                        selectedCategories={selectedCategories}
                        onCategoriesChange={setSelectedCategories}
                        onNext={() => setCurrentStep(2)}
                    />
                )}

                {currentStep === 2 && (
                    <WeightsStep
                        categories={selectedCategories}
                        weights={weights}
                        onWeightsChange={setWeights}
                        onNext={() => setCurrentStep(3)}
                        onBack={() => setCurrentStep(1)}
                    />
                )}

                {currentStep === 3 && (
                    <SchoolsStep
                        schools={schools}
                        onSchoolsChange={setSchools}
                        onNext={() => setCurrentStep(4)}
                        onBack={() => setCurrentStep(2)}
                        isPremium={isPremium}
                        onUpgradeClick={() => setShowUpgradeModal(true)}
                    />
                )}

                {currentStep === 4 && (
                    <DecisionStep
                        schools={schools}
                        categories={selectedCategories}
                        weights={weights}
                        ratings={ratings}
                        costs={costs}
                        onRatingsChange={setRatings}
                        onCostsChange={setCosts}
                        onBack={() => setCurrentStep(3)}
                    />
                )}
            </div>

            {/* Modals */}
            <EnterCodeModal
                isOpen={showCodeModal}
                onClose={() => setShowCodeModal(false)}
                userId={userId}
                onSuccess={handleCodeSuccess}
            />

            <UpgradeModal
                isOpen={showUpgradeModal}
                onClose={() => setShowUpgradeModal(false)}
                userId={userId}
            />
        </div>
    );
}
