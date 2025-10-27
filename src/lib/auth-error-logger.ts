/**
 * Enhanced console logging for Firebase Authentication errors
 * Provides beautiful, actionable error messages in the console
 */

export function logAuthError(errorCode: string, additionalInfo?: any) {
  const boxWidth = 60;
  const line = '═'.repeat(boxWidth);
  const currentDomain = typeof window !== 'undefined' ? window.location.hostname : '';

  console.log('\n');
  console.log('🔥 FIREBASE AUTHENTICATION ERROR 🔥');
  console.log(line);
  
  switch (errorCode) {
    case 'auth/email-already-in-use':
      console.log('❌ Error: Email Already In Use');
      console.log(line);
      console.log('\n📧 What happened:');
      console.log('   The email you entered is already registered.');
      console.log('\n✅ Solution:');
      console.log('   1. Use the SIGN IN form instead of sign up');
      console.log('   2. Or use a different email address');
      console.log('\n💡 The app will auto-switch you to sign-in mode');
      break;

    case 'auth/unauthorized-domain':
      console.log('❌ Error: Unauthorized Domain for Google Sign-In');
      console.log(line);
      console.log('\n📍 Current domain:', currentDomain);
      console.log('\n✅ Quick Fix (2 minutes):');
      console.log('   1. Copy this domain:', currentDomain);
      console.log('   2. Open: https://console.firebase.google.com/project/studio-4094080917-c3f91/authentication/settings');
      console.log('   3. Scroll to "Authorized domains" section');
      console.log('   4. Click "Add domain" button');
      console.log('   5. Paste:', currentDomain);
      console.log('   6. Click "Add" to save');
      console.log('\n💡 Tip: localhost is already authorized - this only affects custom domains');
      console.log('📚 Detailed guide: /GOOGLE_SIGNIN_DOMAIN_FIX.md');
      break;

    case 'auth/admin-restricted-operation':
    case 'auth/operation-not-allowed':
      console.log('❌ Error: Guest/Anonymous Sign-In Not Enabled');
      console.log(line);
      console.log('\n🔒 What happened:');
      console.log('   Anonymous authentication is disabled in Firebase.');
      console.log('\n✅ Quick Fix (1 minute):');
      console.log('   1. Open: https://console.firebase.google.com/project/studio-4094080917-c3f91/authentication/providers');
      console.log('   2. Find "Anonymous" in the sign-in methods list');
      console.log('   3. Click "Anonymous"');
      console.log('   4. Toggle "Enable"');
      console.log('   5. Click "Save"');
      console.log('\n💡 Alternative: Use Email/Password or Demo Mode instead');
      break;

    case 'auth/invalid-credential':
    case 'auth/user-not-found':
      console.log('❌ Error: Invalid Credentials');
      console.log(line);
      console.log('\n🔐 What happened:');
      console.log('   No account exists with these credentials.');
      console.log('\n✅ Solution:');
      console.log('   1. Click "Sign up" to create a new account');
      console.log('   2. Or check if you entered the correct email/password');
      console.log('\n💡 Tip: Make sure Email/Password auth is enabled in Firebase');
      break;

    case 'auth/wrong-password':
      console.log('❌ Error: Wrong Password');
      console.log(line);
      console.log('\n✅ Solution:');
      console.log('   1. Try entering your password again');
      console.log('   2. Use "Forgot password" if you can\'t remember it');
      break;

    case 'auth/weak-password':
      console.log('❌ Error: Weak Password');
      console.log(line);
      console.log('\n✅ Solution:');
      console.log('   Use a password with at least 6 characters');
      break;

    case 'auth/popup-blocked':
      console.log('❌ Error: Popup Blocked');
      console.log(line);
      console.log('\n✅ Solution:');
      console.log('   1. Allow popups for this site in your browser');
      console.log('   2. Try signing in with Google again');
      break;

    case 'auth/configuration-not-found':
      console.log('❌ Error: Firebase Authentication Not Configured');
      console.log(line);
      console.log('\n✅ Solution:');
      console.log('   1. Go to Firebase Console → Authentication');
      console.log('   2. Click "Get Started" to enable authentication');
      console.log('   3. Enable your desired sign-in methods');
      break;

    default:
      console.log('❌ Error:', errorCode);
      console.log(line);
      if (additionalInfo) {
        console.log('\nDetails:', additionalInfo);
      }
  }

  console.log(line);
  console.log('\n📋 Quick Links:');
  console.log('   • Sign-in Methods: https://console.firebase.google.com/project/studio-4094080917-c3f91/authentication/providers');
  console.log('   • Auth Settings: https://console.firebase.google.com/project/studio-4094080917-c3f91/authentication/settings');
  console.log('   • Error Cheatsheet: /AUTH_ERROR_CHEATSHEET.md');
  console.log(line);
  console.log('\n');
}

/**
 * Log all current auth errors at once
 */
export function logMultipleAuthErrors(errors: string[]) {
  const boxWidth = 60;
  const line = '═'.repeat(boxWidth);

  console.log('\n');
  console.log('🔥🔥🔥 MULTIPLE FIREBASE AUTH ERRORS 🔥🔥🔥');
  console.log(line);
  console.log(`Found ${errors.length} authentication error(s):`);
  console.log('');

  errors.forEach((error, index) => {
    console.log(`${index + 1}. ${error}`);
  });

  console.log('');
  console.log(line);
  console.log('💡 Run logAuthError(errorCode) for detailed fix instructions');
  console.log(line);
  console.log('\n');
}

/**
 * Log successful authentication
 */
export function logAuthSuccess(method: string, userId?: string) {
  console.log('\n✅ Authentication Successful!');
  console.log('   Method:', method);
  if (userId) {
    console.log('   User ID:', userId);
  }
  console.log('');
}

/**
 * Display a summary of all possible auth methods
 */
export function logAuthMethodsAvailable() {
  const boxWidth = 60;
  const line = '═'.repeat(boxWidth);

  console.log('\n');
  console.log('🔐 AVAILABLE AUTHENTICATION METHODS');
  console.log(line);
  console.log('✅ Email/Password - Create account or sign in');
  console.log('✅ Google - One-click sign-in (needs domain auth)');
  console.log('✅ Guest Mode - Anonymous access (needs to be enabled)');
  console.log('✅ Demo Mode - Offline testing with mock data');
  console.log(line);
  console.log('📚 Setup guide: /FIREBASE_AUTH_ERRORS_FIX.md');
  console.log(line);
  console.log('\n');
}
