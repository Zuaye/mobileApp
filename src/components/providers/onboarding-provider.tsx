"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { OnboardingFlow } from "../onboarding/OnboardingFlow";

interface OnboardingContextType {
  isOnboardingComplete: boolean;
  completeOnboarding: () => void;
}

const OnboardingContext = createContext<OnboardingContextType | null>(null);

export function OnboardingProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [isOnboardingComplete, setIsOnboardingComplete] = useState(false);

  useEffect(() => {
    // Vérifie si l'onboarding a déjà été complété
    const onboardingCompleted = localStorage.getItem(
      "zuaye_onboarding_completed"
    );
    if (onboardingCompleted === "true") {
      setShowOnboarding(false);
      setIsOnboardingComplete(true);
    }
  }, []);

  const completeOnboarding = () => {
    setShowOnboarding(false);
    setIsOnboardingComplete(true);
  };

  if (showOnboarding) {
    return <OnboardingFlow onComplete={completeOnboarding} />;
  }

  return (
    <OnboardingContext.Provider
      value={{ isOnboardingComplete, completeOnboarding }}
    >
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error("useOnboarding must be used within an OnboardingProvider");
  }
  return context;
}
