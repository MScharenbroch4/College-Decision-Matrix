# 🚀 College Decision Matrix - Production Deployment Guide

This guide covers everything you need to know to take your application from a local development environment to a live production app.

## 1. Preparing for GitHub

You can safely push your code to GitHub **right now**, provided you follow one rule:

> [!IMPORTANT]
> **NEVER** push your `.env.local` file to GitHub. It contains your secret API keys.

### Checklist before pushing:
*   [x] **Verify `.gitignore`**: Ensure `.env.local` is listed in your `.gitignore` file (it should be by default).
*   [ ] **Commit code**: Run `git add .`, `git commit -m "Initial commit"`, and `git push` to your repository.

Your code uses `process.env` to access variables, so the code itself is safe to share. The actual secrets live in your environment files, which stay on your machine.

---

## 2. Going Live (Production Mode)

To make your app "live," you typically deploy it to a hosting platform like **Vercel** (creators of Next.js) or **Netlify**.

### Step A: Deploy Code to Vercel
1.  Push your code to GitHub.
2.  Go to [Vercel.com](https://vercel.com) and sign up with GitHub.
3.  Click "Add New..." -> "Project" and select your `college-decision-matrix` repository.
4.  **Configuration**: Vercel will automatically detect that this is a Next.js app. The build settings (`npm run build`) are correct.

### Step B: Environment Variables (The Most Important Part)
In the Vercel project settings, you need to add the "Environment Variables". This is where you put your **LIVE** keys.

| Variable Name | Value Description |
| :--- | :--- |
| `NEXT_PUBLIC_APP_URL` | Your production URL (e.g., `https://college-decision-matrix.vercel.app`) |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | **pk_live_...** (From Stripe Dashboard > Developers > API Keys) |
| `STRIPE_SECRET_KEY` | **sk_live_...** (From Stripe Dashboard > Developers > API Keys) |
| `STRIPE_WEBHOOK_SECRET` | **whsec_...** (From Stripe Dashboard > Webhooks, see Step C) |
| `NEXT_PUBLIC_FIREBASE_API_KEY` | Same as local (unless you create a separate Prod project) |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | Same as local |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | Same as local |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | Same as local |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`| Same as local |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | Same as local |
| `NEXT_PUBLIC_DEV_CODES` | `michael,dev` (or whatever codes you want for testing in prod) |

### Step C: Stripe Configuration (Live Mode)
1.  Log in to your Stripe Dashboard.
2.  **Toggle the "Test Mode" switch to "Live Mode"** at the top right.
3.  Go to **Developers > API Keys**. Copy the `pk_live_...` and `sk_live_...` keys to Vercel.
4.  Go to **Developers > Webhooks**.
5.  Click **Add Endpoint**.
6.  **Endpoint URL**: `https://your-project-name.vercel.app/api/stripe-webhook` (Replace with your actual Vercel URL).
7.  **Select events**: Select `checkout.session.completed`.
8.  Add the endpoint.
9.  Reveal the **Signing Secret** (`whsec_...`) and add it to Vercel as `STRIPE_WEBHOOK_SECRET`.

### Step D: Firebase Security (Crucial)
1.  Go to the [Firebase Console](https://console.firebase.google.com/).
2.  **Authentication**: Ensure "Email/Password" is enabled.
3.  **Firestore Database > Rules**:
    *   Currently, your rules might be in "Test Mode" (allow read/write to everyone).
    *   **Update them to be secure**:
    ```javascript
    rules_version = '2';
    service cloud.firestore {
      match /databases/{database}/documents {
        // Users can only read/write their own data
        match /users/{userId} {
          allow read, write: if request.auth != null && request.auth.uid == userId;
        }
      }
    }
    ```
4.  **API Key Restrictions (Google Cloud Console)**:
    *   It is best practice to restrict your `NEXT_PUBLIC_FIREBASE_API_KEY` so it can only be used from your specific domains (e.g., `localhost:3000` and `your-app.vercel.app`).

---

## 3. Summary of Changes Required

*   **Code Changes**: **None!** Your code is ready. It automatically uses whatever is in `process.env`.
*   **Config Changes**:
    *   **Local**: Keep using `pk_test_...` in your `.env.local` file for development.
    *   **Production (Vercel)**: Use `pk_live_...` in the Vercel Environment Variables settings.

**You do NOT need to change your code to "live" mode.** The environment variables determine whether the app talks to Stripe's Test environment or Live environment.

## 4. Final Verification
After deploying:
1.  Visit your live URL.
2.  Sign up with a real email.
3.  Verify the green glows and logo look correct.
4.  Try the "Upgrade" flow (it will require a real credit card in Live mode, or you can use a 100% off coupon code you create in Stripe Live mode to test without being charged).
