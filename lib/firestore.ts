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
    try {
        const userDoc = await getDoc(doc(db, 'users', userId));

        if (userDoc.exists()) {
            const data = userDoc.data();
            return {
                userId,
                email: data.email || '',
                isPremium: data.isPremium || false,
                categories: data.categories || [],
                weights: data.weights || {},
                schools: data.schools || [],
                ratings: data.ratings || {},
                costs: data.costs || {},
                createdAt: data.createdAt?.toDate() || new Date(),
                updatedAt: data.updatedAt?.toDate() || new Date(),
            };
        }

        return null;
    } catch (error) {
        console.error('Error loading user data:', error);
        return null;
    }
}

/**
 * Save user data to Firestore
 */
export async function saveUserData(
    userId: string,
    data: Partial<Omit<UserData, 'userId' | 'createdAt' | 'updatedAt'>>
): Promise<void> {
    try {
        const userRef = doc(db, 'users', userId);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
            await updateDoc(userRef, {
                ...data,
                updatedAt: serverTimestamp(),
            });
        } else {
            await setDoc(userRef, {
                ...data,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
            });
        }
    } catch (error) {
        console.error('Error saving user data:', error);
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

    saveTimeout = setTimeout(() => {
        saveUserData(userId, data);
    }, delay);
}
