import { motion } from 'motion/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Alert, AlertDescription } from './ui/alert';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ExternalLink, Copy, CheckCircle2, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner@2.0.3';

export function GoogleSignInDomainHelper() {
  const [copied, setCopied] = useState(false);
  const currentDomain = typeof window !== 'undefined' ? window.location.hostname : '';

  const copyDomain = () => {
    if (currentDomain) {
      navigator.clipboard.writeText(currentDomain);
      setCopied(true);
      toast.success('Domain copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto p-6 space-y-6"
    >
      {/* Header Alert */}
      <Alert className="border-purple-200 bg-purple-50">
        <AlertCircle className="h-5 w-5 text-purple-600" />
        <AlertDescription className="text-purple-900">
          <strong className="block mb-1">Google Sign-In Blocked</strong>
          Your current domain needs to be added to Firebase authorized domains.
        </AlertDescription>
      </Alert>

      {/* Current Domain Display */}
      <Card className="border-purple-200">
        <CardHeader>
          <CardTitle className="text-lg">Your Current Domain</CardTitle>
          <CardDescription>
            This domain needs to be authorized in Firebase
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <code className="flex-1 bg-gray-100 px-4 py-3 rounded-lg font-mono text-sm">
              {currentDomain}
            </code>
            <Button
              variant="outline"
              size="sm"
              onClick={copyDomain}
              className="flex items-center gap-2"
            >
              {copied ? (
                <>
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  Copy
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Step-by-Step Fix */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ExternalLink className="h-5 w-5 text-primary-600" />
            Quick Fix (2 minutes)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Step 1 */}
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Badge className="bg-purple-100 text-purple-700 mt-1">1</Badge>
              <div className="flex-1">
                <h3 className="font-medium text-primary-900 mb-2">
                  Open Firebase Authentication Settings
                </h3>
                <Button
                  onClick={() => window.open('https://console.firebase.google.com/project/studio-4094080917-c3f91/authentication/settings', '_blank')}
                  className="w-full bg-primary-600 hover:bg-primary-700"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Open Firebase Console Settings
                </Button>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Badge className="bg-purple-100 text-purple-700 mt-1">2</Badge>
              <div className="flex-1">
                <h3 className="font-medium text-primary-900 mb-2">
                  Find Authorized Domains Section
                </h3>
                <p className="text-sm text-text-secondary">
                  Scroll down on the Settings page until you see <strong>"Authorized domains"</strong>
                </p>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Badge className="bg-purple-100 text-purple-700 mt-1">3</Badge>
              <div className="flex-1">
                <h3 className="font-medium text-primary-900 mb-2">
                  Add Your Domain
                </h3>
                <ol className="text-sm text-text-secondary space-y-2 list-decimal list-inside">
                  <li>Click the <strong>"Add domain"</strong> button</li>
                  <li>Paste this domain: <code className="bg-gray-100 px-2 py-0.5 rounded text-xs">{currentDomain}</code></li>
                  <li>Click <strong>"Add"</strong> to save</li>
                </ol>
              </div>
            </div>
          </div>

          {/* Step 4 */}
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Badge className="bg-green-100 text-green-700 mt-1">4</Badge>
              <div className="flex-1">
                <h3 className="font-medium text-primary-900 mb-2 flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4" />
                  Done! Try Google Sign-In Again
                </h3>
                <p className="text-sm text-text-secondary">
                  Come back to this page and click the Google sign-in button. It should work now!
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pre-Authorized Domains Info */}
      <Card className="border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="text-sm text-blue-900">ℹ️ Already Authorized Domains</CardTitle>
        </CardHeader>
        <CardContent className="text-xs text-blue-800 space-y-1">
          <p>These domains are pre-authorized and don't need to be added:</p>
          <ul className="list-disc list-inside space-y-0.5 ml-2">
            <li><code className="bg-blue-100 px-1 py-0.5 rounded">localhost</code></li>
            <li><code className="bg-blue-100 px-1 py-0.5 rounded">127.0.0.1</code></li>
            <li><code className="bg-blue-100 px-1 py-0.5 rounded">studio-4094080917-c3f91.firebaseapp.com</code></li>
            <li><code className="bg-blue-100 px-1 py-0.5 rounded">studio-4094080917-c3f91.web.app</code></li>
          </ul>
        </CardContent>
      </Card>

      {/* Alternative Options */}
      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle className="text-sm">Alternative Sign-In Methods</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-text-secondary space-y-2">
          <p>If you can't access Firebase Console, you can:</p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Use <strong>Email/Password</strong> sign-in instead (click "Sign up")</li>
            <li>Use <strong>Guest mode</strong> for anonymous access</li>
            <li>Use <strong>Demo mode</strong> for offline testing</li>
          </ul>
        </CardContent>
      </Card>
    </motion.div>
  );
}
