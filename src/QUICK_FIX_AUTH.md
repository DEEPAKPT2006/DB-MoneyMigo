# 🚨 Quick Fix: Firebase Authentication Errors

## Common Errors:
```
❌ auth/invalid-credential - No account exists
❌ auth/admin-restricted-operation - Guest mode not enabled
❌ auth/unauthorized-domain - Domain not authorized for Google sign-in
```

## 4 Quick Solutions:

### 🔧 For Google Sign-In Error (unauthorized-domain):
1. Go to: https://console.firebase.google.com/project/studio-4094080917-c3f91/authentication/settings
2. Scroll to "Authorized domains"
3. Click "Add domain"
4. Enter your current domain (shown in error message)
5. Click "Add"
✅ Done! Try Google sign-in again

---

## Other Solutions:

### 1️⃣ Create an Account (5 seconds)
1. Click "Don't have an account? Sign up"
2. Enter email + password (6+ chars)
3. Click "Create Account"
✅ Done!

### 2️⃣ Enable Guest Mode (2 minutes)
1. Go to: https://console.firebase.google.com/project/studio-4094080917-c3f91/authentication/providers
2. Click "Anonymous"
3. Toggle "Enable" → Save
4. Come back and click "Continue as Guest"
✅ Done!

### 3️⃣ Use Demo Mode (instant)
1. Click "Try Demo Mode"
✅ Done! (works offline, no cloud sync)

---

## Why This Happened:

- **Invalid Credential**: You tried to sign in but no account exists yet
- **Guest Restricted**: Anonymous auth is disabled in Firebase

## Which Option Should I Choose?

| Option | Best For | Pros | Cons |
|--------|----------|------|------|
| Create Account | Regular use | Full features, cloud sync | Requires email |
| Guest Mode | Testing/Trial | No email needed | May lose data |
| Demo Mode | Quick test | Works instantly | No cloud sync |

---

## Firebase Console Quick Link:
👉 https://console.firebase.google.com/project/studio-4094080917-c3f91/authentication

Project ID: `studio-4094080917-c3f91`
