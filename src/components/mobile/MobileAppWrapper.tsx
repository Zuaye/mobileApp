"use client";

import { useEffect } from "react";
import {
  handleDynamicLinks,
  handleBackButton,
} from "@/src/lib/utils/navigation";
import { App } from "@capacitor/app";
import { StatusBar, Style } from "@capacitor/status-bar";
import { SplashScreen } from "@capacitor/splash-screen";
import { isMobileApp } from "@/src/lib/utils/navigation";

interface MobileAppWrapperProps {
  children: React.ReactNode;
}

export function MobileAppWrapper({ children }: MobileAppWrapperProps) {
  useEffect(() => {
    const initializeApp = async () => {
      if (!isMobileApp()) return;

      try {
        // Initialiser les gestionnaires de navigation
        await handleDynamicLinks();
        handleBackButton();

        // Configurer la barre de statut
        await StatusBar.setStyle({ style: Style.Dark });
        await StatusBar.setBackgroundColor({ color: "#6366f1" });

        // Masquer le splash screen après le chargement
        await SplashScreen.hide();

        // Gérer la mise en pause/reprise de l'app
        App.addListener("appStateChange", ({ isActive }) => {
          if (isActive) {
            // L'app reprend au premier plan
            // Rafraîchir les données si nécessaire
          }
        });
      } catch (error) {
        console.error("Erreur lors de l'initialisation de l'app:", error);
      }
    };

    initializeApp();

    return () => {
      // Nettoyage des listeners si nécessaire
      if (isMobileApp()) {
        App.removeAllListeners();
      }
    };
  }, []);

  return <>{children}</>;
}
