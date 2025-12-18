import { create } from 'zustand';
import { Category, School, CostData } from './types';

interface AppState {
    // User state
    user: any | null;
    isPremium: boolean;
    setUser: (user: any) => void;
    setIsPremium: (isPremium: boolean) => void;

    // Current step
    currentStep: number;
    setCurrentStep: (step: number) => void;

    // Categories
    selectedCategories: Category[];
    setSelectedCategories: (categories: Category[]) => void;
    addCategory: (category: Category) => void;
    removeCategory: (categoryId: string) => void;

    // Weights
    weights: Record<string, number>;
    setWeights: (weights: Record<string, number>) => void;
    setWeight: (categoryId: string, weight: number) => void;

    // Schools
    schools: School[];
    setSchools: (schools: School[]) => void;
    addSchool: (school: School) => void;
    removeSchool: (schoolId: string) => void;

    // Ratings
    ratings: Record<string, Record<string, number>>;
    setRatings: (ratings: Record<string, Record<string, number>>) => void;
    setRating: (schoolId: string, categoryId: string, rating: number) => void;

    // Cost Analysis
    costs: Record<string, CostData>;
    setCosts: (costs: Record<string, CostData>) => void;
    setCost: (schoolId: string, costs: CostData) => void;

    // Reset all data
    resetData: () => void;
}

const initialCostData: CostData = {
    tuition: 0,
    housing: 0,
    food: 0,
    travel: 0,
    other: 0,
    scholarships: 0,
};

export const useStore = create<AppState>((set) => ({
    // User state
    user: null,
    isPremium: false,
    setUser: (user) => set({ user }),
    setIsPremium: (isPremium) => set({ isPremium }),

    // Current step
    currentStep: 1,
    setCurrentStep: (step) => set({ currentStep: step }),

    // Categories
    selectedCategories: [],
    setSelectedCategories: (categories) => set({ selectedCategories: categories }),
    addCategory: (category) =>
        set((state) => ({ selectedCategories: [...state.selectedCategories, category] })),
    removeCategory: (categoryId) =>
        set((state) => ({
            selectedCategories: state.selectedCategories.filter(c => c.id !== categoryId)
        })),

    // Weights
    weights: {},
    setWeights: (weights) => set({ weights }),
    setWeight: (categoryId, weight) =>
        set((state) => ({
            weights: { ...state.weights, [categoryId]: weight }
        })),

    // Schools
    schools: [],
    setSchools: (schools) => set({ schools }),
    addSchool: (school) =>
        set((state) => ({ schools: [...state.schools, school] })),
    removeSchool: (schoolId) =>
        set((state) => ({
            schools: state.schools.filter(s => s.id !== schoolId),
            ratings: Object.fromEntries(
                Object.entries(state.ratings).filter(([id]) => id !== schoolId)
            ),
            costs: Object.fromEntries(
                Object.entries(state.costs).filter(([id]) => id !== schoolId)
            ),
        })),

    // Ratings
    ratings: {},
    setRatings: (ratings) => set({ ratings }),
    setRating: (schoolId, categoryId, rating) =>
        set((state) => ({
            ratings: {
                ...state.ratings,
                [schoolId]: {
                    ...(state.ratings[schoolId] || {}),
                    [categoryId]: rating,
                },
            },
        })),

    // Cost Analysis
    costs: {},
    setCosts: (costs) => set({ costs }),
    setCost: (schoolId, costs) =>
        set((state) => ({
            costs: {
                ...state.costs,
                [schoolId]: costs,
            },
        })),

    // Reset
    resetData: () => set({
        currentStep: 1,
        selectedCategories: [],
        weights: {},
        schools: [],
        ratings: {},
        costs: {},
    }),
}));
