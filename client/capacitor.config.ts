import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
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
  }
};

export default config;
