export interface School {
    id: string;
    name: string;
    location: string;
    isCustom: boolean;
}

export interface Category {
    id: string;
    name: string;
    description: string;
    isCustom: boolean;
}

export interface CostData {
    tuition: number;
    housing: number;
    food: number;
    travel: number;
    other: number;
    scholarships: number;
}

export interface UserData {
    userId: string;
    email: string;
    isPremium: boolean;
    categories: Category[];
    weights: Record<string, number>;
    schools: School[];
    ratings: Record<string, Record<string, number>>; // schoolId -> categoryId -> rating
    costs: Record<string, CostData>; // schoolId -> CostData
    createdAt: Date;
    updatedAt: Date;
}

export const DEFAULT_CATEGORIES: Category[] = [
    {
        id: 'net-price',
        name: 'Net Price',
        description: 'Total annual cost after scholarships and financial aid',
        isCustom: false,
    },
    {
        id: 'major',
        name: 'Major',
        description: 'Strength and reputation of your intended major program',
        isCustom: false,
    },
    {
        id: 'ranking',
        name: 'Ranking',
        description: 'Overall academic ranking and prestige',
        isCustom: false,
    },
    {
        id: 'career-entry',
        name: 'Career Entry',
        description: 'Job placement rates and career support services',
        isCustom: false,
    },
    {
        id: 'campus',
        name: 'Campus',
        description: 'Campus facilities, location, and overall environment',
        isCustom: false,
    },
    {
        id: 'weather',
        name: 'Weather',
        description: 'Climate and weather conditions throughout the year',
        isCustom: false,
    },
    {
        id: 'sports',
        name: 'Sports',
        description: 'Athletic programs and sports culture',
        isCustom: false,
    },
    {
        id: 'party-scene',
        name: 'Party Scene',
        description: 'Social life and party culture',
        isCustom: false,
    },
    {
        id: 'dorms',
        name: 'Dorms',
        description: 'Housing quality and living conditions',
        isCustom: false,
    },
];
