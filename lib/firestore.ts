import {
    doc,
    getDoc,
    setDoc,
    updateDoc,
    serverTimestamp
} from 'firebase/firestore';
import { db } from './firebase';
import { UserData, Category, School, CostData } from './types';

/**
 * Load user data from Firestore
 */
export async function loadUserData(userId: string): Promise<UserData | null> {
    console.log('📥 Loading user data for:', userId);

    try {
        const userDoc = await getDoc(doc(db, 'users', userId));

        if (userDoc.exists()) {
            const data = userDoc.data();
            console.log('📦 Raw data from Firestore:', {
                hasCategories: !!data.categories,
                categoriesLength: data.categories?.length || 0,
                hasWeights: !!data.weights,
                hasSchools: !!data.schools,
                schoolsLength: data.schools?.length || 0,
            });

            const result = {
                userId,
                email: data.email || '',
                isPremium: data.isPremium || false,
                categories: data.categories || [],
                weights: data.weights || {},
                schools: data.schools || [],
                ratings: data.ratings || {},
                costs: data.costs || {},
                createdAt: parseDate(data.createdAt),
                updatedAt: parseDate(data.updatedAt),
            };

            console.log('✅ Loaded user data:', {
                categoriesCount: result.categories.length,
                schoolsCount: result.schools.length,
            });

            return result;
        }

        console.log('⚠️ No user document found in Firestore');
        return null;
    } catch (error: any) {
        console.error('❌ Error loading user data:', error.code, error.message);
        return null;
    }
}

/**
 * Helper to safely parse dates from Firestore which might be Timestamps, strings, or numbers
 */
function parseDate(value: any): Date {
    if (!value) return new Date();
    if (typeof value.toDate === 'function') return value.toDate();
    return new Date(value);
}

/**
 * Save user data to Firestore
 */
export async function saveUserData(
    userId: string,
    data: Partial<Omit<UserData, 'userId' | 'createdAt' | 'updatedAt'>>
): Promise<void> {
    // Log exactly what we're trying to save
    const categoryNames = data.categories?.map(c => c.name) || [];
    console.log('💾 Saving to Firestore:', {
        userId,
        categoriesCount: data.categories?.length,
        categoryNames,
        schoolsCount: data.schools?.length,
    });

    // Safety check: refuse to save if categories is empty (would overwrite good data)
    if (data.categories && data.categories.length === 0) {
        console.error('🛑 REFUSING TO SAVE: categories array is empty! This would erase user data.');
        return;
    }

    try {
        const userRef = doc(db, 'users', userId);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
            await updateDoc(userRef, {
                ...data,
                updatedAt: serverTimestamp(),
            });
            console.log('✅ User data updated successfully');
        } else {
            await setDoc(userRef, {
                ...data,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
            });
            console.log('✅ User data created successfully');
        }
    } catch (error: any) {
        console.error('❌ Error saving user data:', error.code, error.message);
        throw error;
    }
}

/**
 * Update premium status
 */
export async function updatePremiumStatus(userId: string, isPremium: boolean): Promise<void> {
    try {
        const userRef = doc(db, 'users', userId);
        await updateDoc(userRef, {
            isPremium,
            updatedAt: serverTimestamp(),
        });
    } catch (error) {
        console.error('Error updating premium status:', error);
        throw error;
    }
}

/**
 * Debounced save function for auto-save functionality
 */
let saveTimeout: NodeJS.Timeout | null = null;

export function debouncedSave(
    userId: string,
    data: Partial<Omit<UserData, 'userId' | 'createdAt' | 'updatedAt'>>,
    delay: number = 1000
): void {
    if (saveTimeout) {
        clearTimeout(saveTimeout);
    }

    saveTimeout = setTimeout(async () => {
        try {
            await saveUserData(userId, data);
        } catch (error: any) {
            console.error('❌ Debounced save failed:', error.code, error.message);
        }
    }, delay);
}
