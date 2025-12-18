# Environment Variables Setup Guide

## Quick Start

You need to create a `.env.local` file in the root of your project with your Firebase and Stripe credentials.

**Important:** The `.env.local` file is blocked by `.gitignore` for security (which is correct). You need to create it manually.

---

## Step 1: Create the .env.local File

In the project root (`C:/Users/mgsch/PROJECTS/College Decision 2/`), create a file named `.env.local` with the following content:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

# Stripe Configuration
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=

# Premium Access Dev Codes (already configured)
NEXT_PUBLIC_DEV_CODES=michael,dev

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## Step 2: Get Firebase Credentials

### 2.1 Create a Firebase Project

1. Go to [https://console.firebase.google.com](https://console.firebase.google.com)
2. Click **"Add project"** or **"Create a project"**
3. Enter a project name (e.g., "college-decision-matrix")
4. Disable Google Analytics (optional)
5. Click **"Create project"**

### 2.2 Enable Authentication

1. In your Firebase project, click **"Authentication"** in the left sidebar
2. Click **"Get started"**
3. Click on **"Email/Password"** under Sign-in method
4. Enable **"Email/Password"**
5. Click **"Save"**

### 2.3 Create Firestore Database

1. Click **"Firestore Database"** in the left sidebar
2. Click **"Create database"**
3. Select **"Start in test mode"** for now
4. Choose a location (use the closest to your users)
5. Click **"Enable"**

### 2.4 Get Your Firebase Config

1. Click the **gear icon** next to "Project Overview"
2. Click **"Project settings"**
3. Scroll down to **"Your apps"**
4. Click the **"</>"** (Web) icon
5. Register your app with a nickname (e.g., "College Decision Matrix Web")
6. **Don't** check "Also set up Firebase Hosting"
7. Click **"Register app"**
8. Copy the `firebaseConfig` object values

**Copy these values to your `.env.local`:**

```javascript
const firebaseConfig = {
  apiKey: "AIza...",                    // → NEXT_PUBLIC_FIREBASE_API_KEY
  authDomain: "project.firebaseapp.com", // → NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
  projectId: "project-id",               // → NEXT_PUBLIC_FIREBASE_PROJECT_ID
  storageBucket: "project.appspot.com",  // → NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
  messagingSenderId: "123456789",        // → NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
  appId: "1:123:web:abc123"             // → NEXT_PUBLIC_FIREBASE_APP_ID
};
```

---

## Step 3: Get Stripe Credentials

### 3.1 Create a Stripe Account

1. Go to [https://stripe.com](https://stripe.com)
2. Click **"Sign up"**
3. Complete the registration

### 3.2 Get API Keys

1. In the Stripe Dashboard, click **"Developers"** in the top nav
2. Click **"API keys"** in the left sidebar
3. You'll see two keys in **Test mode**:
   - **Publishable key** (starts with `pk_test_`)
   - **Secret key** (starts with `sk_test_`)

**Copy these to your `.env.local`:**

```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_51Ab...
STRIPE_SECRET_KEY=sk_test_51Ab...
```

### 3.3 Set Up Webhook (for local testing)

**Option A: Stripe CLI (Recommended for development)**

1. Install Stripe CLI: [https://stripe.com/docs/stripe-cli](https://stripe.com/docs/stripe-cli)
2. Run this command:
   ```bash
   stripe login
   ```
3. Then run:
   ```bash
   stripe listen --forward-to localhost:3000/api/stripe-webhook
   ```
4. Copy the webhook signing secret that appears (starts with `whsec_`)
5. Add it to `.env.local`:
   ```env
   STRIPE_WEBHOOK_SECRET=whsec_...
   ```

**Option B: For now, use a placeholder**

If you just want to test without payments, use this placeholder:

```env
STRIPE_WEBHOOK_SECRET=whsec_placeholder_for_testing
```

---

## Step 4: Your Complete .env.local File

After filling in all the values, your `.env.local` should look like this:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyC_example_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=college-matrix-123.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=college-matrix-123
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=college-matrix-123.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789012
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789012:web:abc123def456

# Stripe Configuration
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_51AbCdEf...
STRIPE_SECRET_KEY=sk_test_51AbCdEf...
STRIPE_WEBHOOK_SECRET=whsec_ABC123...

# Premium Access Dev Codes
NEXT_PUBLIC_DEV_CODES=michael,dev

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## Step 5: Restart the Development Server

After creating/updating `.env.local`:

1. **Stop the server** (Ctrl+C in the terminal)
2. **Start it again**:
   ```bash
   npm run dev
   ```
3. Open [http://localhost:3000](http://localhost:3000)

---

## Testing Your Setup

### Test Authentication

1. Go to [http://localhost:3000](http://localhost:3000)
2. Click **"Create Account"**
3. Enter an email and password
4. If it works, you'll be redirected to the dashboard ✅

### Test Premium Access

1. Log in to the dashboard
2. Click on your email in the top-right
3. Click **"Enter Code"**
4. Enter either **"michael"** or **"dev"**
5. You should now see "Premium User" ✅

### Test Data Persistence

1. Go through the 4 steps and add some data
2. Refresh the page
3. Your data should still be there ✅

---

## Common Issues

### "Firebase: Error (auth/invalid-api-key)"
- Check that your Firebase API key is correct
- Make sure there are no extra spaces in `.env.local`

### "Module not found: Can't resolve '@/lib/firebase'"
- Make sure you've restarted the dev server after creating `.env.local`

### Stripe checkout not working
- For development, you can skip Stripe setup initially
- The app will still work, you just can't test payments
- Use dev codes "michael" or "dev" instead

---

## Production Deployment

When deploying to Vercel:

1. **Don't** commit `.env.local` to Git
2. Add all environment variables in Vercel Dashboard:
   - Project Settings → Environment Variables
3. Change `NEXT_PUBLIC_APP_URL` to your production URL
4. For webhooks, set up a production webhook in Stripe Dashboard pointing to:
   ```
   https://your-domain.com/api/stripe-webhook
   ```

---

## Security Notes

✅ **DO:**
- Keep `.env.local` in `.gitignore`
- Use test mode for Stripe during development
- Use Firebase test mode rules initially

❌ **DON'T:**
- Commit `.env.local` to version control
- Share your secret keys publicly
- Use production Stripe keys during development

---

## Need Help?

If you run into issues:

1. Check the browser console for errors
2. Check the terminal for server errors
3. Verify all environment variables are set correctly
4. Make sure you restarted the dev server after changes
