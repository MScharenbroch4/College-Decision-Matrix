# College Decision Matrix

A web application to help high school students make informed college decisions using a weighted decision matrix system.

## Features

- **Weighted Decision Analysis**: Assign custom weights to factors that matter most
- **Cost Analysis**: Calculate true net price with built-in financial aid tracking
- **Compare Schools**: Compare up to 2 schools (free) or 10 schools (premium)
- **Auto-Save**: Your progress is automatically saved to the cloud
- **Data-Driven**: Objective comparison with automatic composite score calculation

## Getting Started

### Prerequisites

- Node.js 18+ installed
- Firebase account (for authentication and database)
- Stripe account (for payment processing)

### Installation

1. Clone this repository or download the files

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
   - Copy `.env.local.template` to `.env.local`
   - Fill in your Firebase configuration
   - Add your Stripe API keys
   - The dev codes for premium access are already set to: `michael`, `dev`

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Configuration

### Firebase Setup

1. Create a new Firebase project at [https://console.firebase.google.com](https://console.firebase.google.com)
2. Enable Email/Password authentication
3. Create a Firestore database
4. Copy your Firebase config to `.env.local`

### Stripe Setup

1. Create a Stripe account at [https://stripe.com](https://stripe.com)
2. Get your API keys from the Stripe dashboard
3. Add them to `.env.local`
4. For webhooks, use the Stripe CLI or set up webhooks in the dashboard pointing to `/api/stripe-webhook`

### Environment Variables

Create a `.env.local` file with the following variables:

```env
# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Dev Access Codes
NEXT_PUBLIC_DEV_CODES=michael,dev

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Usage

### For Students

1. **Sign Up**: Create an account with your email
2. **Select Categories**: Choose factors important to your decision (Net Price, Major, Campus, etc.)
3. **Assign Weights**: Distribute 100% across your categories based on importance
4. **Add Schools**: Search from Division I schools or add custom schools
5. **Rate & Compare**: Rate each school on each category and view the results
6. **Cost Analysis**: Input detailed costs and financial aid for accurate net price calculations

### For Developers

- Dev codes "michael" and "dev" grant premium access for testing
- Use Stripe test mode for payment testing
- Firestore rules should be configured for production use

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: Firebase Firestore
- **Authentication**: Firebase Auth
- **Payments**: Stripe
- **State Management**: Zustand

## Deployment

### Vercel Deployment

1. Push your code to GitHub
2. Import the repository in Vercel
3. Add all environment variables in Vercel settings
4. Deploy!

### Firebase Rules

Make sure to set up proper Firestore security rules in production:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## License

This project is for educational purposes.

## Support

For issues or questions, please create an issue in the repository.
