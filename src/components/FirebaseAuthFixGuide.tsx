import { motion } from 'motion/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Alert, AlertDescription } from './ui/alert';
import { Badge } from './ui/badge';
import { CheckCircle2, AlertCircle, Settings, User, Mail, ExternalLink } from 'lucide-react';
import { Button } from './ui/button';

export function FirebaseAuthFixGuide() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto p-6 space-y-6"
    >
      <Card className="border-orange-200 bg-orange-50">
        <CardHeader>
          <div className="flex items-center gap-3">
            <AlertCircle className="h-6 w-6 text-orange-600" />
            <div>
              <CardTitle className="text-orange-900">Firebase Authentication Setup Required</CardTitle>
              <CardDescription className="text-orange-700">
                Follow these steps to enable authentication in MoneyMigo
              </CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Error Explanations */}
      <div className="space-y-3">
        <Alert className="border-red-200 bg-red-50">
          <AlertCircle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-900">
            <strong>auth/invalid-credential:</strong> No user account exists with these credentials. You need to create an account first.
          </AlertDescription>
        </Alert>

        <Alert className="border-yellow-200 bg-yellow-50">
          <AlertCircle className="h-4 w-4 text-yellow-600" />
          <AlertDescription className="text-yellow-900">
            <strong>auth/admin-restricted-operation:</strong> Anonymous (guest) sign-in is not enabled in your Firebase project.
          </AlertDescription>
        </Alert>

        <Alert className="border-purple-200 bg-purple-50">
          <AlertCircle className="h-4 w-4 text-purple-600" />
          <AlertDescription className="text-purple-900">
            <strong>auth/unauthorized-domain:</strong> This domain is not authorized for Google sign-in. Add it to Firebase Console.
          </AlertDescription>
        </Alert>
      </div>

      {/* Step-by-step Fix Guide */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-primary-600" />
            Quick Fix Guide
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Step 1: Enable Email/Password */}
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Badge className="bg-primary-100 text-primary-700 mt-1">Step 1</Badge>
              <div className="flex-1">
                <h3 className="font-medium text-primary-900 mb-2 flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Enable Email/Password Authentication
                </h3>
                <ol className="text-sm text-text-secondary space-y-2 list-decimal list-inside">
                  <li>Go to <a href="https://console.firebase.google.com" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">Firebase Console</a></li>
                  <li>Select your project: <code className="bg-gray-100 px-2 py-0.5 rounded text-xs">studio-4094080917-c3f91</code></li>
                  <li>Navigate to <strong>Authentication</strong> in the left sidebar</li>
                  <li>Click <strong>Get Started</strong> if you haven't enabled Authentication yet</li>
                  <li>Go to the <strong>Sign-in method</strong> tab</li>
                  <li>Click <strong>Email/Password</strong></li>
                  <li>Toggle <strong>Enable</strong> and click <strong>Save</strong></li>
                </ol>
              </div>
            </div>
          </div>

          {/* Step 2: Enable Anonymous Auth */}
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Badge className="bg-primary-100 text-primary-700 mt-1">Step 2</Badge>
              <div className="flex-1">
                <h3 className="font-medium text-primary-900 mb-2 flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Enable Anonymous Authentication (Guest Mode)
                </h3>
                <ol className="text-sm text-text-secondary space-y-2 list-decimal list-inside">
                  <li>In the same <strong>Sign-in method</strong> tab</li>
                  <li>Find and click <strong>Anonymous</strong></li>
                  <li>Toggle <strong>Enable</strong> and click <strong>Save</strong></li>
                </ol>
              </div>
            </div>
          </div>

          {/* Step 3: Enable Google Sign-In (Optional) */}
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Badge className="bg-purple-100 text-purple-700 mt-1">Step 3</Badge>
              <div className="flex-1">
                <h3 className="font-medium text-primary-900 mb-2 flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  Enable Google Sign-In & Authorize Domain
                </h3>
                <ol className="text-sm text-text-secondary space-y-2 list-decimal list-inside">
                  <li>In the <strong>Sign-in method</strong> tab, click <strong>Google</strong></li>
                  <li>Toggle <strong>Enable</strong> and add a support email</li>
                  <li>Click <strong>Save</strong></li>
                  <li>Go to <strong>Settings</strong> tab (or <a href="https://console.firebase.google.com/project/studio-4094080917-c3f91/authentication/settings" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">click here</a>)</li>
                  <li>Scroll to <strong>Authorized domains</strong></li>
                  <li>Click <strong>Add domain</strong></li>
                  <li>Add your current domain: <code className="bg-gray-100 px-1 py-0.5 rounded text-xs" id="currentDomain">{typeof window !== 'undefined' ? window.location.hostname : 'your-domain.com'}</code></li>
                  <li>Click <strong>Add</strong></li>
                </ol>
                <p className="text-xs text-text-secondary mt-2 bg-blue-50 p-2 rounded">
                  💡 <strong>Tip:</strong> localhost and *.firebaseapp.com are pre-authorized. You only need to add custom domains.
                </p>
              </div>
            </div>
          </div>

          {/* Step 4: Create Account */}
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Badge className="bg-primary-100 text-primary-700 mt-1">Step 4</Badge>
              <div className="flex-1">
                <h3 className="font-medium text-primary-900 mb-2 flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4" />
                  Create Your Account
                </h3>
                <p className="text-sm text-text-secondary">
                  After enabling the sign-in methods, come back to this page and:
                </p>
                <ul className="text-sm text-text-secondary space-y-1 list-disc list-inside mt-2">
                  <li>Click <strong>"Don't have an account? Sign up"</strong></li>
                  <li>Enter your email and password (min 6 characters)</li>
                  <li>Click <strong>Create Account</strong></li>
                  <li>Or click <strong>Google</strong> to sign in with Google (after Step 3)</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Alternative Options */}
      <Card className="border-green-200 bg-green-50">
        <CardHeader>
          <CardTitle className="text-green-900">Alternative Options</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-sm text-green-800">
            <strong>Option 1:</strong> Click "Continue as Guest" after enabling Anonymous authentication (Step 2 above)
          </p>
          <p className="text-sm text-green-800">
            <strong>Option 2:</strong> Use Demo Mode - The app will work with local storage only (no cloud sync)
          </p>
        </CardContent>
      </Card>

      {/* Current Project Info */}
      <Card>
        <CardContent className="pt-6 space-y-4">
          <div className="text-sm text-text-secondary space-y-1">
            <p><strong>Your Firebase Project:</strong></p>
            <p className="font-mono text-xs bg-gray-100 p-2 rounded">
              Project ID: studio-4094080917-c3f91<br />
              Auth Domain: studio-4094080917-c3f91.firebaseapp.com
            </p>
          </div>
          
          <div className="flex gap-2">
            <Button
              onClick={() => window.open('https://console.firebase.google.com/project/studio-4094080917-c3f91/authentication/providers', '_blank')}
              className="flex-1 bg-primary-600 hover:bg-primary-700"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Open Firebase Console
            </Button>
            <Button
              variant="outline"
              onClick={() => window.open('/QUICK_FIX_AUTH.md', '_blank')}
            >
              Quick Guide
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
