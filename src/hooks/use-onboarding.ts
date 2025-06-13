import { useEffect, useState } from "react";

export function useOnboardingStatus() {
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Vérifie le statut de l'onboarding au chargement
    const checkOnboardingStatus = () => {
      const status = localStorage.getItem("zuaye_onboarding_completed");
      setHasCompletedOnboarding(status === "true");
      setIsLoading(false);
    };

    checkOnboardingStatus();
  }, []);

  const completeOnboarding = () => {
    localStorage.setItem("zuaye_onboarding_completed", "true");
    setHasCompletedOnboarding(true);
  };

  const resetOnboarding = () => {
    localStorage.removeItem("zuaye_onboarding_completed");
    setHasCompletedOnboarding(false);
  };

  return {
    hasCompletedOnboarding,
    isLoading,
    completeOnboarding,
    resetOnboarding,
  };
}
