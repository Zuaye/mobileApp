import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.zuaye.app",
  appName: "Zuaye",
  webDir: "out",
  bundledWebRuntime: false,
  server: {
    androidScheme: "https",
    cleartext: true,
    allowNavigation: ["*"],
  },
  android: {
    allowMixedContent: true,
  },
  ios: {
    limitsNavigationsToAppBoundDomains: true,
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 3000,
      backgroundColor: "#6366f1",
      androidSplashResourceName: "splash",
      androidScaleType: "CENTER_CROP",
      showSpinner: true,
      androidSpinnerStyle: "large",
      iosSpinnerStyle: "small",
      spinnerColor: "#ffffff",
      splashFullScreen: true,
      splashImmersive: true,
    },
  },
};

export default config;
