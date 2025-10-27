import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  signInAnonymously,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import { auth, isFirebaseConfigured, isAuthEnabled } from '../lib/firebase';
import { toast } from 'sonner@2.0.3';
import { logAuthError, logAuthSuccess } from '../lib/auth-error-logger';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isDemo: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signInAsGuest: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const isDemo = !isAuthEnabled();

  useEffect(() => {
    // Check if authentication is properly enabled
    if (!isAuthEnabled()) {
      console.log('🔧 Running in demo mode - Firebase Authentication not enabled or configured');
      // In demo mode, create a mock user
      const demoUser = {
        uid: 'demo-user-id',
        email: 'demo@moneymigo.app',
        isAnonymous: false,
        emailVerified: true,
        displayName: 'Demo User'
      } as User;
      
      setUser(demoUser);
      setLoading(false);
      return;
    }

    console.log('🔥 Setting up Firebase auth listener');
    
    try {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        console.log('🔥 Auth state changed:', user ? `User logged in: ${user.uid}` : 'User logged out');
        setUser(user);
        setLoading(false);
      });

      return unsubscribe;
    } catch (error) {
      console.error('❌ Error setting up auth listener:', error);
      // If there's an error with auth, fall back to demo mode
      const demoUser = {
        uid: 'demo-user-id',
        email: 'demo@moneymigo.app',
        isAnonymous: false,
        emailVerified: true,
        displayName: 'Demo User'
      } as User;
      
      setUser(demoUser);
      setLoading(false);
    }
  }, []);

  const signIn = async (email: string, password: string) => {
    if (!isAuthEnabled()) {
      toast.error('Authentication not available - Firebase Auth needs to be enabled in your Firebase console');
      return;
    }
    
    try {
      console.log('🔐 Attempting to sign in user:', email);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      logAuthSuccess('Email/Password', userCredential.user.uid);
      toast.success('Welcome back! 👋');
    } catch (error: any) {
      console.error('❌ Sign in error:', error);
      logAuthError(error.code, error.message);
      
      // Handle specific authentication errors
      let errorMessage = 'Failed to sign in';
      let description = undefined;
      
      if (error.code === 'auth/configuration-not-found') {
        errorMessage = 'Firebase Authentication is not enabled';
        description = 'Go to Firebase Console → Authentication → Get Started to enable auth features';
      } else if (error.code === 'auth/invalid-credential') {
        errorMessage = 'Invalid email or password';
        description = '💡 No account found. Click "Sign up" to create an account, or try Guest mode';
      } else if (error.code === 'auth/user-not-found') {
        errorMessage = 'No account found with this email';
        description = '💡 Please sign up first or check your email address';
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = 'Incorrect password';
        description = 'Please try again or reset your password';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email address';
        description = 'Please enter a valid email address';
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = 'Too many failed attempts';
        description = 'Please try again later or reset your password';
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      toast.error(errorMessage, description ? { duration: 5000, description } : undefined);
      throw error;
    }
  };

  const signUp = async (email: string, password: string) => {
    if (!isAuthEnabled()) {
      toast.error('Authentication not available - Firebase Auth needs to be enabled in your Firebase console');
      return;
    }
    
    try {
      console.log('🔐 Attempting to create account for:', email);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('✅ Account created successfully:', userCredential.user.uid);
      logAuthSuccess('Email/Password (Sign Up)', userCredential.user.uid);
      toast.success('Account created successfully! 🎉');
    } catch (error: any) {
      console.error('❌ Sign up error:', error);
      logAuthError(error.code, error.message);
      
      // Handle specific Firebase auth errors
      let errorMessage = 'Failed to create account';
      if (error.code === 'auth/configuration-not-found') {
        errorMessage = 'Firebase Authentication is not enabled. Please enable Authentication in your Firebase console.';
        toast.error(errorMessage, { 
          duration: 6000,
          description: 'Go to Firebase Console → Authentication → Get Started to enable auth features'
        });
      } else if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'Email already registered';
        toast.error(errorMessage, { 
          duration: 6000,
          description: '👉 This email already has an account. Try signing in instead.',
          action: {
            label: 'Sign In',
            onClick: () => {
              // This will be handled by the LoginForm component
              window.dispatchEvent(new CustomEvent('switch-to-signin'));
            }
          }
        });
        throw error;
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'Password should be at least 6 characters.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Please enter a valid email address.';
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      // Only show toast if we haven't already shown a custom one
      if (error.code !== 'auth/configuration-not-found' && error.code !== 'auth/email-already-in-use') {
        toast.error(errorMessage);
      }
      throw error;
    }
  };

  const signInAsGuest = async () => {
    if (!isAuthEnabled()) {
      toast.success('Welcome to MoneyMigo Demo! 👋');
      return;
    }
    
    try {
      console.log('🔐 Signing in as guest...');
      const userCredential = await signInAnonymously(auth);
      logAuthSuccess('Guest/Anonymous', userCredential.user.uid);
      toast.success('Welcome! You\'re using MoneyMigo as a guest 👋');
    } catch (error: any) {
      console.error('❌ Guest sign in error:', error);
      logAuthError(error.code, error.message);
      
      let errorMessage = 'Failed to sign in as guest';
      let description = undefined;
      
      if (error.code === 'auth/configuration-not-found') {
        errorMessage = 'Firebase Authentication not enabled';
        description = 'Go to Firebase Console → Authentication → Get Started';
      } else if (error.code === 'auth/admin-restricted-operation' || error.code === 'auth/operation-not-allowed') {
        errorMessage = 'Guest mode not enabled';
        description = '👉 Enable Anonymous authentication in Firebase Console';
        
        // Beautiful console log for developers
        console.log('\n🔧 GUEST MODE FIX NEEDED 🔧');
        console.log('═'.repeat(50));
        console.log('❌ Error: Guest/Anonymous sign-in not enabled');
        console.log('\n✅ Quick Fix (1 minute):');
        console.log('1. Open: https://console.firebase.google.com/project/studio-4094080917-c3f91/authentication/providers');
        console.log('2. Find "Anonymous" in the sign-in methods list');
        console.log('3. Click "Anonymous"');
        console.log('4. Toggle "Enable"');
        console.log('5. Click "Save"');
        console.log('═'.repeat(50));
        console.log('💡 Alternative: Use Email/Password or Demo Mode instead\n');
      }
      
      toast.error(errorMessage, description ? { 
        duration: 10000, 
        description,
        action: {
          label: 'Fix Now',
          onClick: () => window.open('https://console.firebase.google.com/project/studio-4094080917-c3f91/authentication/providers', '_blank')
        }
      } : undefined);
      throw error;
    }
  };

  const signInWithGoogle = async () => {
    if (!isAuthEnabled()) {
      toast.error('Firebase authentication not available in demo mode');
      return;
    }
    
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      logAuthSuccess('Google', userCredential.user.uid);
      toast.success('Welcome! Signed in with Google 🎉');
    } catch (error: any) {
      console.error('Google sign in error:', error);
      logAuthError(error.code, error.message);
      
      let errorMessage = 'Failed to sign in with Google';
      let description = undefined;
      
      if (error.code === 'auth/unauthorized-domain') {
        errorMessage = 'Domain not authorized for Google sign-in';
        description = '👉 Add this domain to authorized domains in Firebase Console';
        
        // Get current domain
        const currentDomain = window.location.hostname;
        console.log('\n🔧 GOOGLE SIGN-IN FIX NEEDED 🔧');
        console.log('═'.repeat(50));
        console.log('❌ Error: Unauthorized domain');
        console.log('📍 Current domain:', currentDomain);
        console.log('\n✅ Quick Fix:');
        console.log('1. Copy this domain:', currentDomain);
        console.log('2. Open: https://console.firebase.google.com/project/studio-4094080917-c3f91/authentication/settings');
        console.log('3. Scroll to "Authorized domains"');
        console.log('4. Click "Add domain"');
        console.log('5. Paste:', currentDomain);
        console.log('6. Click "Add"');
        console.log('═'.repeat(50));
        console.log('📚 Detailed guide: /GOOGLE_SIGNIN_DOMAIN_FIX.md\n');
        
        toast.error(errorMessage, { 
          duration: 10000, 
          description: `Add "${currentDomain}" to Firebase Console → Authentication → Settings → Authorized domains`,
          action: {
            label: 'Fix Now',
            onClick: () => window.open('https://console.firebase.google.com/project/studio-4094080917-c3f91/authentication/settings', '_blank')
          }
        });
      } else if (error.code === 'auth/popup-blocked') {
        errorMessage = 'Popup was blocked';
        description = 'Please allow popups for this site and try again';
        toast.error(errorMessage, description ? { duration: 5000, description } : undefined);
      } else if (error.code === 'auth/popup-closed-by-user') {
        errorMessage = 'Sign-in cancelled';
        description = 'You closed the sign-in window';
        toast.info(errorMessage, description ? { duration: 3000, description } : undefined);
      } else if (error.code === 'auth/cancelled-popup-request') {
        // Don't show error for cancelled popup (user opened multiple popups)
        return;
      } else {
        toast.error(errorMessage);
      }
      
      throw error;
    }
  };

  const logout = async () => {
    if (!isAuthEnabled()) {
      toast.info('Demo session ended');
      window.location.reload();
      return;
    }
    
    try {
      await signOut(auth);
      toast.success('Signed out successfully');
    } catch (error: any) {
      console.error('Logout error:', error);
      toast.error('Failed to sign out');
      throw error;
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    isDemo,
    signIn,
    signUp,
    signInAsGuest,
    signInWithGoogle,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};