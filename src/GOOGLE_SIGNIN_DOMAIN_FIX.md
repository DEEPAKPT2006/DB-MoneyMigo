# 🔧 Fix: Google Sign-In Unauthorized Domain Error

## 🚨 Error
```
auth/unauthorized-domain
Firebase: Error (auth/unauthorized-domain)
```

## 🎯 What This Means

Firebase is blocking Google sign-in because your current domain is not in the list of authorized domains.

**Your current domain:** Check the error message or look at your browser's address bar

## ✅ Quick Fix (2 minutes)

### Step 1: Get Your Domain
1. Look at your browser address bar
2. Copy the domain part (e.g., `example.com` or `app.figma.com`)
3. Note: Ignore `http://` or `https://` - just the domain name

### Step 2: Add to Firebase Console

#### Option A: Direct Link (Fastest)
1. **Click this link:** [Firebase Authentication Settings](https://console.firebase.google.com/project/studio-4094080917-c3f91/authentication/settings)
2. Scroll down to **"Authorized domains"** section
3. Click **"Add domain"**
4. Paste your domain
5. Click **"Add"**
6. ✅ Done! Try Google sign-in again

#### Option B: Manual Navigation
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select project: `studio-4094080917-c3f91`
3. Click **Authentication** in left sidebar
4. Click **Settings** tab (top of page)
5. Scroll to **Authorized domains** section
6. Click **Add domain**
7. Enter your domain
8. Click **Add**

### Step 3: Test
1. Go back to MoneyMigo
2. Refresh the page
3. Click **Google** sign-in button
4. It should work now! 🎉

---

## 📋 Common Domains

### Pre-Authorized (No Action Needed)
These domains are **already authorized** by Firebase:
- ✅ `localhost` (for local development)
- ✅ `127.0.0.1` (localhost IP)
- ✅ `studio-4094080917-c3f91.firebaseapp.com` (your Firebase hosting)
- ✅ `studio-4094080917-c3f91.web.app` (your Firebase hosting)

### Need to Add Manually
- Figma Make preview domains (e.g., `*.figma.com`)
- Custom domains (e.g., `moneymigo.com`)
- Vercel/Netlify deployments (e.g., `*.vercel.app`, `*.netlify.app`)
- Other hosting providers

---

## 🔍 How to Find Your Current Domain

### Method 1: Browser Address Bar
Look at the URL in your browser:
```
https://example-app.figma.com/page
         ^^^^^^^^^^^^^^^^^^^^
         This is your domain
```

### Method 2: Console (Developer Tools)
1. Press F12 or right-click → Inspect
2. Go to Console tab
3. Type: `window.location.hostname`
4. Press Enter
5. The result is your domain

### Method 3: Error Message
The error toast should show your domain:
```
Add "your-domain.com" to Firebase Console...
```

---

## 🎨 Visual Guide

```
Firebase Console
└── Authentication
    └── Settings (tab)
        └── Authorized domains
            └── [Add domain] ← Click here
                └── Enter: your-domain.com
                └── [Add] ← Click to save
```

---

## 🚀 Advanced: Wildcard Domains

Firebase **does NOT support** wildcard domains like `*.figma.com`.

**Solution:** You must add each specific subdomain:
```
✅ app.figma.com
✅ preview.figma.com
✅ staging.figma.com
❌ *.figma.com (not supported)
```

---

## 🛡️ Security Note

**Why does Firebase require this?**

Firebase restricts domains to prevent unauthorized websites from using your Firebase authentication. This protects your users from phishing attacks.

**Best practices:**
- Only add domains you control
- Remove unused domains
- Use different Firebase projects for dev/staging/production

---

## ❓ Troubleshooting

### "I added the domain but it still doesn't work"

1. **Wait 1-2 minutes** - Firebase needs time to propagate changes
2. **Refresh the page** - Clear cache (Ctrl+Shift+R or Cmd+Shift+R)
3. **Check the domain** - Make sure you added the exact domain (no http://, no trailing slash)
4. **Try incognito mode** - Rules out cache/cookie issues

### "The Add Domain button is disabled"

- You might not have owner/editor permissions on the Firebase project
- Contact your Firebase project admin

### "I don't have access to Firebase Console"

**Option 1:** Use Email/Password sign-in instead
- Click "Don't have an account? Sign up"
- Create account with email

**Option 2:** Use Guest mode
- Click "Continue as Guest"

**Option 3:** Use Demo mode
- Click "Try Demo Mode"

---

## 📊 Current Project Info

```
Project ID: studio-4094080917-c3f91
Auth Domain: studio-4094080917-c3f91.firebaseapp.com
Console Link: https://console.firebase.google.com/project/studio-4094080917-c3f91
Settings Link: https://console.firebase.google.com/project/studio-4094080917-c3f91/authentication/settings
```

---

## 🔗 Quick Links

- [Firebase Authentication Settings](https://console.firebase.google.com/project/studio-4094080917-c3f91/authentication/settings) - Add authorized domains here
- [Firebase Documentation - Authorized Domains](https://firebase.google.com/docs/auth/web/redirect-best-practices#appendix:-authorized-domains)
- [MoneyMigo Setup Guide](./FIREBASE_AUTH_ERRORS_FIX.md) - Full authentication setup

---

## ✨ After Fixing

Once you've added the domain, you'll be able to:
- ✅ Sign in with Google
- ✅ Quick one-click authentication
- ✅ No password to remember
- ✅ Auto-sync across devices

---

**Need more help?** Click "View setup guide" on the login screen for comprehensive instructions.
