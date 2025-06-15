import { App } from "@capacitor/app";
import { Capacitor } from "@capacitor/core";

// Fonction pour vérifier si on est sur mobile
export const isMobileApp = () => {
  return (
    Capacitor.getPlatform() === "ios" || Capacitor.getPlatform() === "android"
  );
};

// Gestionnaire de liens dynamiques
export const handleDynamicLinks = async () => {
  if (!isMobileApp()) return;

  App.addListener("appUrlOpen", async ({ url }) => {
    if (!url) return;

    // Extraire le chemin de l'URL
    const slug = url.split("zuaye.app").pop();
    if (slug) {
      // Attendre que l'application soit prête
      await new Promise((resolve) => setTimeout(resolve, 400));
      window.location.href = slug;
    }
  });
};

// Fonction pour gérer la navigation back
export const handleBackButton = (customAction?: () => void) => {
  if (!isMobileApp()) return;

  App.addListener("backButton", ({ canGoBack }) => {
    if (customAction) {
      customAction();
    } else if (canGoBack) {
      window.history.back();
    } else {
      App.exitApp();
    }
  });
};

// Fonction pour ouvrir des liens externes
export const openExternalLink = async (url: string) => {
  if (isMobileApp()) {
    const { Browser } = await import("@capacitor/browser");
    await Browser.open({ url });
  } else {
    window.open(url, "_blank");
  }
};

// Fonction pour partager du contenu
export const shareContent = async (options: {
  title: string;
  text: string;
  url: string;
}) => {
  if (isMobileApp()) {
    const { Share } = await import("@capacitor/share");
    await Share.share({
      title: options.title,
      text: options.text,
      url: options.url,
      dialogTitle: "Partager via",
    });
  } else if (navigator.share) {
    await navigator.share(options);
  }
};
