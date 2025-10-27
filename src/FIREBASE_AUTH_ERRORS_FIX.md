# Firebase Authentication Errors - Quick Fix Guide

## 🔴 Common Errors

### Error 1: `auth/invalid-credential`
**What it means:** You're trying to sign in with credentials that don't exist in Firebase.

**Solution:** Create an account first!

### Error 2: `auth/admin-restricted-operation`
**What it means:** Anonymous (guest) authentication is not enabled in your Firebase project.

**Solution:** Enable Anonymous authentication in Firebase Console.

### Error 3: `auth/unauthorized-domain`
**What it means:** The current domain is not authorized for Google sign-in.

**Solution:** Add your domain to authorized domains in Firebase Console.
- **Quick Fix:** [Go to Settings](https://console.firebase.google.com/project/studio-4094080917-c3f91/authentication/settings) → Authorized domains → Add domain
- **Detailed Guide:** See [GOOGLE_SIGNIN_DOMAIN_FIX.md](./GOOGLE_SIGNIN_DOMAIN_FIX.md)

---

## ✅ Step-by-Step Fix

### Option 1: Enable Email/Password Sign-In

1. **Go to Firebase Console**
   - Visit: https://console.firebase.google.com
   - Select project: `studio-4094080917-c3f91`

2. **Enable Authentication**
   - Click "Authentication" in the left sidebar
   - Click "Get Started" (if not already enabled)
   - Go to "Sign-in method" tab

3. **Enable Email/Password**
   - Click on "Email/Password"
   - Toggle "Enable" to ON
   - Click "Save"

4. **Create Your Account**
   - Go back to the MoneyMigo app
   - Click "Don't have an account? Sign up"
   - Enter your email and password (minimum 6 characters)
   - Click "Create Account"

### Option 2: Enable Guest Mode (Recommended for Testing)

1. **Go to Firebase Console**
   - Visit: https://console.firebase.google.com
   - Select project: `studio-4094080917-c3f91`

2. **Navigate to Authentication**
   - Click "Authentication" in the left sidebar
   - Go to "Sign-in method" tab

3. **Enable Anonymous Sign-In**
   - Find "Anonymous" in the list
   - Click on it
   - Toggle "Enable" to ON
   - Click "Save"

4. **Use Guest Mode**
   - Go back to the MoneyMigo app
   - Click "Continue as Guest"
   - You'll be signed in anonymously

### Option 3: Use Demo Mode (No Firebase Setup Required)

Just click "Try Demo Mode" and the app will work with local storage only.
**Note:** Your data won't sync across devices in demo mode.

---

## 🎯 Quick Links

- **Firebase Console:** https://console.firebase.google.com/project/studio-4094080917-c3f91
- **Authentication Settings:** https://console.firebase.google.com/project/studio-4094080917-c3f91/authentication/users
- **Sign-in Methods:** https://console.firebase.google.com/project/studio-4094080917-c3f91/authentication/providers

---

## 📊 Your Firebase Project Info

```
Project ID: studio-4094080917-c3f91
Auth Domain: studio-4094080917-c3f91.firebaseapp.com
Region: Default (US)
```

---

## 🆘 Still Having Issues?

### Common Solutions:

1. **Clear browser cache and cookies**
2. **Make sure you're using the correct email/password**
3. **Check that Firebase Authentication is enabled in console**
4. **Verify your project ID matches: `studio-4094080917-c3f91`**

### Error Messages Explained:

| Error Code | What it Means | How to Fix |
|------------|---------------|------------|
| `auth/invalid-credential` | Wrong email/password or account doesn't exist | Create account or check credentials |
| `auth/admin-restricted-operation` | Anonymous auth not enabled | Enable in Firebase Console |
| `auth/email-already-in-use` | Email already registered | App auto-switches to sign-in mode |
| `auth/unauthorized-domain` | Domain not authorized for Google sign-in | Add domain in Firebase Console → Settings |
| `auth/popup-blocked` | Browser blocked the Google sign-in popup | Allow popups and try again |
| `auth/user-not-found` | No account with this email | Sign up first |
| `auth/wrong-password` | Incorrect password | Try again or reset password |
| `auth/weak-password` | Password too short | Use 6+ characters |

---

## 💡 Recommended Setup for MoneyMigo

For the best experience, enable these sign-in methods:

- ✅ **Email/Password** - For permanent accounts
- ✅ **Anonymous** - For guest/trial users
- ⭕ **Google** (Optional) - For quick sign-in

This gives users multiple options to access your app!

---

## 🔐 Security Notes

- Never share your Firebase API keys publicly
- Use Firebase Security Rules to protect user data
- Enable app check for production apps
- Regularly review authentication logs

---

## 📱 App Features After Authentication

Once signed in, you'll have access to:

- 💰 Expense tracking with AI insights
- 📊 Real-time financial timeline
- 🎯 Goals & budget management
- 🔮 Predictive insights with Gemini AI
- 💾 Cloud data sync (not available in demo mode)
- 📈 Advanced analytics and reports

---

**Need more help?** Check the in-app setup guide by clicking the "Setup Guide" button on the login screen.
