import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ExternalLink, AlertCircle, CheckCircle, Info } from 'lucide-react';

interface QuickFixPanelProps {
  errors: string[];
  onShowFullGuide?: () => void;
}

export function QuickFixPanel({ errors, onShowFullGuide }: QuickFixPanelProps) {
  const hasEmailError = errors.includes('email-already-in-use');
  const hasDomainError = errors.includes('unauthorized-domain');
  const hasGuestError = errors.includes('guest-disabled');
  const currentDomain = typeof window !== 'undefined' ? window.location.hostname : '';

  if (errors.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      className="mb-4"
    >
      <Card className="border-orange-200 bg-orange-50">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-2 text-orange-900">
            <AlertCircle className="h-4 w-4" />
            {errors.length} Authentication {errors.length === 1 ? 'Error' : 'Errors'} Detected
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {/* Email Already In Use */}
          {hasEmailError && (
            <div className="flex items-start gap-2 text-xs">
              <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="font-medium text-green-900">Email Already Registered</p>
                <p className="text-green-700">Auto-handled - switched to sign-in mode</p>
              </div>
            </div>
          )}

          {/* Unauthorized Domain */}
          {hasDomainError && (
            <div className="bg-white rounded p-2 border border-purple-200">
              <div className="flex items-start gap-2 mb-2">
                <AlertCircle className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-xs font-medium text-purple-900">Google Sign-In Blocked</p>
                  <p className="text-xs text-purple-700">Add domain: <code className="bg-purple-50 px-1 rounded">{currentDomain}</code></p>
                </div>
              </div>
              <Button
                size="sm"
                variant="outline"
                className="h-6 text-xs border-purple-200 text-purple-800 w-full"
                onClick={() => window.open('https://console.firebase.google.com/project/studio-4094080917-c3f91/authentication/settings', '_blank')}
              >
                <ExternalLink className="h-3 w-3 mr-1" />
                Fix in Firebase
              </Button>
            </div>
          )}

          {/* Guest Mode Disabled */}
          {hasGuestError && (
            <div className="bg-white rounded p-2 border border-yellow-200">
              <div className="flex items-start gap-2 mb-2">
                <AlertCircle className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-xs font-medium text-yellow-900">Guest Mode Disabled</p>
                  <p className="text-xs text-yellow-700">Enable Anonymous authentication</p>
                </div>
              </div>
              <Button
                size="sm"
                variant="outline"
                className="h-6 text-xs border-yellow-200 text-yellow-800 w-full"
                onClick={() => window.open('https://console.firebase.google.com/project/studio-4094080917-c3f91/authentication/providers', '_blank')}
              >
                <ExternalLink className="h-3 w-3 mr-1" />
                Fix in Firebase
              </Button>
            </div>
          )}

          {/* View Full Guide */}
          {onShowFullGuide && (
            <Button
              size="sm"
              variant="ghost"
              className="h-6 text-xs text-orange-700 hover:text-orange-900 hover:bg-orange-100 w-full"
              onClick={onShowFullGuide}
            >
              <Info className="h-3 w-3 mr-1" />
              View Complete Fix Guide
            </Button>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
