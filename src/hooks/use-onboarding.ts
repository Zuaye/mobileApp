import { useEffect, useState } from "react";

export function useOnboardingStatus() {
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Vérifie le statut de l'onboarding au chargement
    const checkOnboardingStatus = () => {
      const status = sessionStorage.getItem("zuaye_onboarding_completed");
      setHasCompletedOnboarding(status === "true");
      setIsLoading(false);
    };

    checkOnboardingStatus();
  }, []);

  const completeOnboarding = () => {
    sessionStorage.setItem("zuaye_onboarding_completed", "true");
    setHasCompletedOnboarding(true);
  };

  const resetOnboarding = () => {
    sessionStorage.removeItem("zuaye_onboarding_completed");
    setHasCompletedOnboarding(false);
  };

  return {
    hasCompletedOnboarding,
    isLoading,
    completeOnboarding,
    resetOnboarding,
  };
}
