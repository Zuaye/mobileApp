"use client";

import { useState } from "react";
import { SplashScreen } from "./SplashScreen";
import { OnboardingScreen } from "./OnboardingScreen";

interface OnboardingFlowProps {
  onComplete: () => void;
}

export function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const [currentStep, setCurrentStep] = useState<"splash" | "onboarding">("splash");

  const handleSplashComplete = () => {
    setCurrentStep("onboarding");
  };

  const handleOnboardingComplete = () => {
    localStorage.setItem("zuaye_onboarding_completed", "true");
    onComplete();
  };

  const handleSkip = () => {
    localStorage.setItem("zuaye_onboarding_completed", "true");
    onComplete();
  };

  if (currentStep === "splash") {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  return (
    <OnboardingScreen
      onComplete={handleOnboardingComplete}
      onSkip={handleSkip}
    />
  );
}
