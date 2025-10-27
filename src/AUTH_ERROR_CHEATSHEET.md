# 🚨 Firebase Auth Errors - Quick Cheat Sheet

## 4 Common Errors & Their Fixes

---

### 1️⃣ `auth/email-already-in-use`
```
✗ What: Email already has an account
✓ Fix: Use sign-in instead of sign-up
⏱️  Time: Instant (auto-switched)
```

---

### 2️⃣ `auth/invalid-credential`
```
✗ What: No account exists
✓ Fix: Click "Sign up" to create account
⏱️  Time: 30 seconds
```

---

### 3️⃣ `auth/admin-restricted-operation`
```
✗ What: Guest mode disabled
✓ Fix: Enable Anonymous auth in Firebase
⏱️  Time: 1 minute
🔗 Link: https://console.firebase.google.com/project/studio-4094080917-c3f91/authentication/providers
```

**Steps:**
1. Open link above
2. Click "Anonymous"
3. Toggle "Enable"
4. Save

---

### 4️⃣ `auth/unauthorized-domain`
```
✗ What: Domain not authorized for Google sign-in
✓ Fix: Add domain to Firebase authorized list
⏱️  Time: 2 minutes
🔗 Link: https://console.firebase.google.com/project/studio-4094080917-c3f91/authentication/settings
```

**Steps:**
1. Copy your domain (shown in error)
2. Open link above
3. Scroll to "Authorized domains"
4. Click "Add domain"
5. Paste domain
6. Click "Add"

---

## 📱 In-App Help

### From Login Screen:
- Click error alert buttons
- "Show Fix Guide" for visual walkthrough
- "Open Firebase" for direct console access
- "Having trouble?" link at bottom

### Toast Notifications:
- "Fix Now" button → Opens Firebase Console
- Copy domain with one click
- Step-by-step instructions

---

## 🔗 Quick Links

| Need | Link |
|------|------|
| Sign-in Methods | [Open](https://console.firebase.google.com/project/studio-4094080917-c3f91/authentication/providers) |
| Authorized Domains | [Open](https://console.firebase.google.com/project/studio-4094080917-c3f91/authentication/settings) |
| All Users | [Open](https://console.firebase.google.com/project/studio-4094080917-c3f91/authentication/users) |

---

## 🎯 Can't Access Firebase?

**Alternative options:**
1. ✅ Use **Email/Password** → Click "Sign up"
2. ✅ Use **Guest Mode** → After enabling Anonymous auth
3. ✅ Use **Demo Mode** → Works offline, no Firebase needed

---

## 📚 Full Documentation

- **Quick Fix:** `/QUICK_FIX_AUTH.md`
- **Google Domain:** `/GOOGLE_SIGNIN_DOMAIN_FIX.md`
- **Complete Guide:** `/FIREBASE_AUTH_ERRORS_FIX.md`
- **All Fixes Summary:** `/ALL_AUTH_ERRORS_FIXED.md`

---

**Project ID:** `studio-4094080917-c3f91`
