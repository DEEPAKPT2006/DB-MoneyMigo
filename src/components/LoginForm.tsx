import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Separator } from './ui/separator';
import { useAuth } from './AuthProvider';
import { isAuthEnabled } from '../lib/firebase';
import { AuthSetupGuide } from './AuthSetupGuide';
import { Mail, Lock, Eye, EyeOff, Chrome, UserCheck, Settings, AlertCircle, Info } from 'lucide-react';
import { FirebaseAuthFixGuide } from './FirebaseAuthFixGuide';
import { GoogleSignInDomainHelper } from './GoogleSignInDomainHelper';

export const LoginForm: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showSetupGuide, setShowSetupGuide] = useState(false);
  const [showDomainHelper, setShowDomainHelper] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const isFirebaseSetup = isAuthEnabled();
  
  const { signIn, signUp, signInAsGuest, signInWithGoogle } = useAuth();

  // Listen for custom event to switch to sign-in mode
  useEffect(() => {
    const handleSwitchToSignIn = () => {
      setIsSignUp(false);
      setAuthError('email-already-in-use');
    };

    window.addEventListener('switch-to-signin', handleSwitchToSignIn);
    return () => window.removeEventListener('switch-to-signin', handleSwitchToSignIn);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setAuthError(null);

    try {
      if (isSignUp) {
        await signUp(email, password);
      } else {
        await signIn(email, password);
      }
    } catch (error: any) {
      // Store error for display
      if (error.code === 'auth/invalid-credential' || error.code === 'auth/user-not-found') {
        setAuthError('invalid-credential');
      } else if (error.code === 'auth/email-already-in-use') {
        setAuthError('email-already-in-use');
        setIsSignUp(false); // Switch to sign-in mode
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGuestSignIn = async () => {
    setLoading(true);
    setAuthError(null);
    try {
      await signInAsGuest();
    } catch (error: any) {
      // Store error for display
      if (error.code === 'auth/admin-restricted-operation' || error.code === 'auth/operation-not-allowed') {
        setAuthError('guest-disabled');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setAuthError(null);
    try {
      await signInWithGoogle();
    } catch (error: any) {
      // Store error for display
      if (error.code === 'auth/unauthorized-domain') {
        setAuthError('unauthorized-domain');
      }
    } finally {
      setLoading(false);
    }
  };

  // Show setup guide if Firebase Auth is not enabled OR if user requested it
  if (!isFirebaseSetup) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 p-4">
        <AuthSetupGuide />
      </div>
    );
  }

  // Show domain helper if unauthorized domain error
  if (showDomainHelper) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 p-4 overflow-auto">
        <div className="max-w-4xl mx-auto py-8">
          <Button
            variant="outline"
            onClick={() => {
              setShowDomainHelper(false);
              setAuthError(null);
            }}
            className="mb-4"
          >
            ← Back to Login
          </Button>
          <GoogleSignInDomainHelper />
        </div>
      </div>
    );
  }

  // Show auth fix guide if user clicked to see it
  if (showSetupGuide) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 p-4 overflow-auto">
        <div className="max-w-4xl mx-auto py-8">
          <Button
            variant="outline"
            onClick={() => setShowSetupGuide(false)}
            className="mb-4"
          >
            ← Back to Login
          </Button>
          <FirebaseAuthFixGuide />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
              <CardTitle className="text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                MoneyMigo
              </CardTitle>
              <CardDescription>
                {isSignUp ? 'Create your account' : 'Welcome back'}
              </CardDescription>
            </motion.div>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {/* Auth Error Alerts */}
            {authError === 'invalid-credential' && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                <div className="flex items-start gap-2 mb-2">
                  <AlertCircle className="h-4 w-4 text-red-600 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-red-900">Account Not Found</p>
                    <p className="text-xs text-red-700 mt-1">
                      No account exists with these credentials. Please create an account first.
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs h-7 border-red-200 text-red-800"
                    onClick={() => setIsSignUp(true)}
                  >
                    Create Account
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs h-7 border-red-200 text-red-800"
                    onClick={() => setShowSetupGuide(true)}
                  >
                    <Info className="h-3 w-3 mr-1" />
                    Setup Guide
                  </Button>
                </div>
              </div>
            )}
            
            {authError === 'email-already-in-use' && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                <div className="flex items-start gap-2 mb-2">
                  <AlertCircle className="h-4 w-4 text-blue-600 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-blue-900">Email Already Registered</p>
                    <p className="text-xs text-blue-700 mt-1">
                      An account with <strong>{email}</strong> already exists. Please sign in instead.
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs h-7 border-blue-200 text-blue-800"
                  onClick={() => {
                    setAuthError(null);
                    setIsSignUp(false);
                  }}
                >
                  Switch to Sign In
                </Button>
              </div>
            )}

            {authError === 'guest-disabled' && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
                <div className="flex items-start gap-2 mb-2">
                  <AlertCircle className="h-4 w-4 text-yellow-600 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-yellow-900">Guest Mode Not Enabled</p>
                    <p className="text-xs text-yellow-700 mt-1">
                      Anonymous authentication needs to be enabled in Firebase Console.
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs h-7 border-yellow-200 text-yellow-800"
                    onClick={() => window.open('https://console.firebase.google.com/project/studio-4094080917-c3f91/authentication/providers', '_blank')}
                  >
                    Fix Now
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs h-7 border-yellow-200 text-yellow-800"
                    onClick={() => setShowSetupGuide(true)}
                  >
                    <Info className="h-3 w-3 mr-1" />
                    Guide
                  </Button>
                </div>
              </div>
            )}
            
            {authError === 'unauthorized-domain' && (
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 mb-4">
                <div className="flex items-start gap-2 mb-2">
                  <AlertCircle className="h-4 w-4 text-purple-600 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-purple-900">Domain Not Authorized</p>
                    <p className="text-xs text-purple-700 mt-1">
                      Add <code className="bg-purple-100 px-1 py-0.5 rounded">{window.location.hostname}</code> to authorized domains in Firebase.
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs h-7 border-purple-200 text-purple-800"
                    onClick={() => setShowDomainHelper(true)}
                  >
                    <Info className="h-3 w-3 mr-1" />
                    Show Fix Guide
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs h-7 border-purple-200 text-purple-800"
                    onClick={() => window.open('https://console.firebase.google.com/project/studio-4094080917-c3f91/authentication/settings', '_blank')}
                  >
                    Open Firebase
                  </Button>
                </div>
              </div>
            )}
            
            {!isFirebaseSetup && (
              <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-3 mb-4">
                <div className="flex items-center gap-2 text-orange-800 dark:text-orange-200 mb-2">
                  <AlertCircle className="h-4 w-4" />
                  <span className="text-sm font-medium">Firebase Not Configured</span>
                </div>
                <p className="text-xs text-orange-700 dark:text-orange-300 mb-2">
                  Authentication features are disabled. The app will run in demo mode.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs h-7 border-orange-200 dark:border-orange-700 text-orange-800 dark:text-orange-200"
                  onClick={() => window.open('/FIREBASE_SETUP.md', '_blank')}
                >
                  <Settings className="h-3 w-3 mr-1" />
                  Setup Guide
                </Button>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-500" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-500" />
                    )}
                  </Button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                disabled={loading || !isFirebaseSetup}
              >
                {loading ? 'Please wait...' : (isSignUp ? 'Create Account' : 'Sign In')}
              </Button>
            </form>

            <div className="space-y-3">
              <div className="relative">
                <Separator />
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-2 text-xs text-muted-foreground">
                  or continue with
                </span>
              </div>

              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={handleGoogleSignIn}
                disabled={loading || !isFirebaseSetup}
              >
                <Chrome className="mr-2 h-4 w-4" />
                Google
              </Button>

              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={handleGuestSignIn}
                disabled={loading}
              >
                <UserCheck className="mr-2 h-4 w-4" />
                {isFirebaseSetup ? 'Continue as Guest' : 'Try Demo Mode'}
              </Button>

              {/* Show setup guide link if auth errors detected */}
              {(authError === 'invalid-credential' || authError === 'guest-disabled' || authError === 'unauthorized-domain') && (
                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => {
                      if (authError === 'unauthorized-domain') {
                        setShowDomainHelper(true);
                      } else {
                        setShowSetupGuide(true);
                      }
                    }}
                    className="text-sm text-primary-600 hover:text-primary-700 underline"
                  >
                    Need help? View {authError === 'unauthorized-domain' ? 'domain fix' : 'setup'} guide →
                  </button>
                </div>
              )}
            </div>

            <div className="text-center text-sm space-y-2">
              <button
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
              >
                {isSignUp
                  ? 'Already have an account? Sign in'
                  : "Don't have an account? Sign up"}
              </button>
              
              {/* Help link */}
              <div>
                <button
                  type="button"
                  onClick={() => setShowSetupGuide(true)}
                  className="text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                >
                  Having trouble? View setup guide
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};