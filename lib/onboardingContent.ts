/**
 * Centralized content for the Decision Matrix onboarding popup and tooltips.
 * Keeping this separate makes it easy to update text without touching component code.
 */

export const ONBOARDING_CONTENT = {
    title: "How to Use the Decision Matrix",

    sections: [
        {
            heading: "Step 1: Rate Each School",
            content: `For each school, go through every category and rate how well that school fits YOU on a scale from 0 to 10.

• **0** means the school is a very poor fit in that category
• **10** means the school is an excellent fit

Use outside resources to support your ratings, such as U.S. News & World Report, school websites, or campus visits.`,
            examples: [
                "If Georgia Tech is highly ranked and well-known for your intended major, you might give it a **9/10** for \"Major.\"",
                "If Harvard is very expensive for you (check the Cost Analysis tab), you might give it a **2/10** for \"Net Price.\""
            ]
        },
        {
            heading: "Step 2: Automatic Scoring",
            content: `Once you rate every school in every category, the app automatically:

1. **Applies your category weights** (the percentages you chose earlier)
2. **Calculates a composite score** for each school
3. **Ranks schools** from best overall fit (#1) to worst fit`,
        },
        {
            heading: "Understanding the Numbers",
            content: `**Category Weights** show how important each factor is to YOU. For example, if Net Price has a weight of 50% and Weather has 10%, that means cost matters 5x more than weather in your final ranking.

**Composite Score** is your personalized "fit score" for each school. It combines all your ratings with your weights to give one number that represents how well each school matches YOUR priorities.

**Important:** The "best" school is the best FOR YOU based on what YOU said matters most — not necessarily the most prestigious or popular school overall.`
        }
    ],

    dismissButtonText: "Got it!",
    localStorageKey: "decision-onboarding-seen"
};

export const TOOLTIP_CONTENT = {
    category: "A category is a factor you're using to compare schools, like cost, academics, or campus life.",

    weight: "The weight shows how important this category is to your decision. Higher percentages mean this factor matters more in determining your final ranking.",

    rating: "Rate how well this school fits you in this category on a scale from 0 (worst) to 10 (best).",

    compositeScore: "This is your personalized 'fit score' — it combines all your ratings with your weights to show which school is the best match for YOUR priorities.",

    rank: "Schools are automatically ranked from best fit (#1) to worst fit based on their composite scores.",

    netPrice: "Your total annual cost after subtracting scholarships and financial aid. Enter costs in the Cost Analysis tab."
};
