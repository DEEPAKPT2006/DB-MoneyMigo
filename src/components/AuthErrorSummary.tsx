import { motion } from 'motion/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Alert, AlertDescription } from './ui/alert';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ExternalLink, AlertCircle, CheckCircle2, XCircle } from 'lucide-react';

export function AuthErrorSummary() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto p-6 space-y-6"
    >
      {/* Header */}
      <Alert className="border-red-200 bg-red-50">
        <AlertCircle className="h-5 w-5 text-red-600" />
        <AlertDescription className="text-red-900">
          <strong className="block mb-1">3 Firebase Authentication Errors Detected</strong>
          Follow the fixes below to enable all authentication features.
        </AlertDescription>
      </Alert>

      {/* Error 1: Email Already In Use */}
      <Card className="border-blue-200">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3">
              <Badge className="bg-blue-100 text-blue-700 mt-1">Error 1</Badge>
              <div>
                <CardTitle className="text-lg text-blue-900">
                  Email Already In Use
                </CardTitle>
                <CardDescription className="text-blue-700 mt-1">
                  <code className="bg-blue-100 px-2 py-0.5 rounded text-xs">auth/email-already-in-use</code>
                </CardDescription>
              </div>
            </div>
            <XCircle className="h-5 w-5 text-blue-600" />
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="bg-blue-50 p-3 rounded-lg">
            <p className="text-sm text-blue-900 mb-2">
              <strong>What happened:</strong> You tried to create an account with an email that already exists.
            </p>
            <p className="text-sm text-blue-800">
              <strong>Solution:</strong> Use the sign-in form instead of sign-up.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-blue-700">
            <CheckCircle2 className="h-4 w-4" />
            <span>This is not an error - the app will auto-switch you to sign-in mode</span>
          </div>
        </CardContent>
      </Card>

      {/* Error 2: Unauthorized Domain */}
      <Card className="border-purple-200">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3">
              <Badge className="bg-purple-100 text-purple-700 mt-1">Error 2</Badge>
              <div>
                <CardTitle className="text-lg text-purple-900">
                  Google Sign-In: Unauthorized Domain
                </CardTitle>
                <CardDescription className="text-purple-700 mt-1">
                  <code className="bg-purple-100 px-2 py-0.5 rounded text-xs">auth/unauthorized-domain</code>
                </CardDescription>
              </div>
            </div>
            <XCircle className="h-5 w-5 text-purple-600" />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-purple-50 p-3 rounded-lg">
            <p className="text-sm text-purple-900 mb-2">
              <strong>What happened:</strong> Your current domain is not authorized for Google sign-in.
            </p>
            <p className="text-sm text-purple-800 mb-2">
              <strong>Current domain:</strong> <code className="bg-purple-100 px-2 py-0.5 rounded text-xs">{typeof window !== 'undefined' ? window.location.hostname : ''}</code>
            </p>
          </div>
          
          <div className="space-y-2">
            <p className="text-sm font-medium text-purple-900">Quick Fix (2 minutes):</p>
            <ol className="text-sm text-purple-800 space-y-2 list-decimal list-inside ml-2">
              <li>Click the button below to open Firebase Settings</li>
              <li>Scroll to <strong>"Authorized domains"</strong> section</li>
              <li>Click <strong>"Add domain"</strong></li>
              <li>Paste: <code className="bg-purple-100 px-1 py-0.5 rounded text-xs">{typeof window !== 'undefined' ? window.location.hostname : ''}</code></li>
              <li>Click <strong>"Add"</strong> to save</li>
            </ol>
          </div>

          <Button
            onClick={() => window.open('https://console.firebase.google.com/project/studio-4094080917-c3f91/authentication/settings', '_blank')}
            className="w-full bg-purple-600 hover:bg-purple-700"
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Open Firebase Settings
          </Button>
        </CardContent>
      </Card>

      {/* Error 3: Guest Mode Disabled */}
      <Card className="border-yellow-200">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3">
              <Badge className="bg-yellow-100 text-yellow-700 mt-1">Error 3</Badge>
              <div>
                <CardTitle className="text-lg text-yellow-900">
                  Guest Mode Not Enabled
                </CardTitle>
                <CardDescription className="text-yellow-700 mt-1">
                  <code className="bg-yellow-100 px-2 py-0.5 rounded text-xs">auth/admin-restricted-operation</code>
                </CardDescription>
              </div>
            </div>
            <XCircle className="h-5 w-5 text-yellow-600" />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-yellow-50 p-3 rounded-lg">
            <p className="text-sm text-yellow-900 mb-2">
              <strong>What happened:</strong> Anonymous (guest) sign-in is disabled in Firebase.
            </p>
            <p className="text-sm text-yellow-800">
              <strong>Solution:</strong> Enable Anonymous authentication in Firebase Console.
            </p>
          </div>
          
          <div className="space-y-2">
            <p className="text-sm font-medium text-yellow-900">Quick Fix (1 minute):</p>
            <ol className="text-sm text-yellow-800 space-y-2 list-decimal list-inside ml-2">
              <li>Click the button below to open Firebase sign-in methods</li>
              <li>Find <strong>"Anonymous"</strong> in the list</li>
              <li>Click on <strong>"Anonymous"</strong></li>
              <li>Toggle <strong>"Enable"</strong></li>
              <li>Click <strong>"Save"</strong></li>
            </ol>
          </div>

          <Button
            onClick={() => window.open('https://console.firebase.google.com/project/studio-4094080917-c3f91/authentication/providers', '_blank')}
            className="w-full bg-yellow-600 hover:bg-yellow-700"
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Open Firebase Sign-in Methods
          </Button>
        </CardContent>
      </Card>

      {/* Alternative Options */}
      <Card className="border-green-200 bg-green-50">
        <CardHeader>
          <CardTitle className="text-lg text-green-900 flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5" />
            Alternative: Use Demo Mode
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-green-800">
            If you can't access Firebase Console or want to test the app immediately, you can use Demo Mode.
          </p>
          <ul className="text-sm text-green-800 space-y-1 list-disc list-inside ml-2">
            <li>✅ Works offline without any Firebase setup</li>
            <li>✅ Full app functionality with mock data</li>
            <li>✅ Perfect for testing and development</li>
            <li>⚠️ Data is stored locally (not synced across devices)</li>
          </ul>
          <div className="bg-green-100 p-2 rounded text-xs text-green-900">
            💡 <strong>Tip:</strong> Look for the "Try Demo Mode" button on the login screen.
          </div>
        </CardContent>
      </Card>

      {/* Summary Status */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">📊 Error Status Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-2 bg-blue-50 rounded">
              <span className="text-sm text-blue-900">Email Already In Use</span>
              <Badge className="bg-blue-100 text-blue-700">Auto-handled ✓</Badge>
            </div>
            <div className="flex items-center justify-between p-2 bg-purple-50 rounded">
              <span className="text-sm text-purple-900">Google Domain</span>
              <Badge className="bg-purple-100 text-purple-700">Needs fix</Badge>
            </div>
            <div className="flex items-center justify-between p-2 bg-yellow-50 rounded">
              <span className="text-sm text-yellow-900">Guest Mode</span>
              <Badge className="bg-yellow-100 text-yellow-700">Needs fix</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Project Info */}
      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle className="text-sm">Firebase Project Info</CardTitle>
        </CardHeader>
        <CardContent className="text-xs text-text-secondary space-y-1">
          <p><strong>Project ID:</strong> <code className="bg-gray-100 px-1 py-0.5 rounded">studio-4094080917-c3f91</code></p>
          <p><strong>Auth Domain:</strong> <code className="bg-gray-100 px-1 py-0.5 rounded">studio-4094080917-c3f91.firebaseapp.com</code></p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
