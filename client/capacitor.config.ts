import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.codereader.android',  // Unique package name for Play Store
  appName: 'CodeReader',
  webDir: 'out',
  server: {
    // Allow connections to the API
    allowNavigation: [
      'api.codereader.app',
      '*.firebaseapp.com',
      '*.googleapis.com',
      '*.google.com'
    ]
  },
  android: {
    allowMixedContent: true
  },
  plugins: {
    CapacitorHttp: {
      enabled: true  // Use native HTTP instead of WebView fetch
    }
  }
};

export default config;
