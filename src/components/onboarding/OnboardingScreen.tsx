"use client";

import { useState } from "react";
import { OnboardingSlide } from "./OnboardingSlide";
import type { OnboardingProps } from "./types";

const slides = [
  {
    id: 1,
    title: "Réservation Instantanée",
    description:
      "Trouvez et réservez la chambre parfaite en quelques clics, 24h/24 et 7j/7.",
    image: "/images/onboarding/jeune-couple1.png",
    buttonText: "Suivant",
  },
  {
    id: 2,
    title: "Confort Premium",
    description:
      "Profitez d'un séjour confortable dans nos hôtels soigneusement sélectionnés.",
    image: "/images/onboarding/chambre.png",
    buttonText: "Suivant",
  },
  {
    id: 3,
    title: "Nos filles",
    description:
      "Profitez de nos filles de chambres disponibles issues de plusieurs communes pour vous faire plaisir.",
    image: "/images/onboarding/women.jpg",
    buttonText: "Suivant",
  },
  {
    id: 4,
    title: "Recherche rapide",
    description:
      "Faites vos recherches de meilleurs hotels à Kinshasa ave des prix competitifs",
    image: "/images/onboarding/kinshasa.jpg",
    buttonText: "Commencer",
    isLast: true,
  },
];

export function OnboardingScreen({ onComplete, onSkip }: OnboardingProps) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const handleNext = () => {
    if (currentSlideIndex === slides.length - 1) {
      onComplete();
    } else {
      setCurrentSlideIndex((prev) => prev + 1);
    }
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-background">
      {slides.map((slide, index) => (
        <OnboardingSlide
          key={slide.id}
          slide={slide}
          isActive={index === currentSlideIndex}
          onNext={handleNext}
          onSkip={onSkip}
          currentIndex={currentSlideIndex}
          totalSlides={slides.length}
        />
      ))}
    </div>
  );
}
