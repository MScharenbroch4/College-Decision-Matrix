import { CostData } from './types';

/**
 * Calculate the composite score for a school based on ratings and weights
 */
export function calculateCompositeScore(
    ratings: Record<string, number>,
    weights: Record<string, number>
): number {
    let totalScore = 0;

    Object.entries(ratings).forEach(([categoryId, rating]) => {
        const weight = weights[categoryId] || 0;
        totalScore += (rating * weight) / 100;
    });

    return Math.round(totalScore * 100) / 100;
}

/**
 * Calculate total net price from cost data
 */
export function calculateNetPrice(costs: CostData): number {
    const totalCost = costs.tuition + costs.housing + costs.food + costs.travel + costs.other;
    return Math.max(0, totalCost - costs.scholarships);
}

/**
 * Convert net price to a 0-10 rating
 * Lower cost = higher rating
 * This is a simple linear scale, can be adjusted based on typical college costs
 */
export function netPriceToRating(netPrice: number): number {
    // Assume $0 = 10, $80,000+ = 0
    const maxCost = 80000;
    const rating = 10 - (netPrice / maxCost) * 10;
    return Math.max(0, Math.min(10, Math.round(rating * 10) / 10));
}

/**
 * Validate that weights sum to 100%
 */
export function validateWeights(weights: Record<string, number>): boolean {
    const total = Object.values(weights).reduce((sum, weight) => sum + weight, 0);
    return Math.abs(total - 100) < 0.01; // Allow small floating point errors
}

/**
 * Get the total of all weights
 */
export function getTotalWeight(weights: Record<string, number>): number {
    return Object.values(weights).reduce((sum, weight) => sum + weight, 0);
}
