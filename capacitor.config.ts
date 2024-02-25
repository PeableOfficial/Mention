import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'earth.mention.app',
  appName: 'Mention',
  webDir: 'public',
  server: {
    androidScheme: 'https'
  }
};

export default config;
