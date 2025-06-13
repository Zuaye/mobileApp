"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { OnboardingSlide } from "./OnboardingSlide";
import type { OnboardingProps } from "./types";

const slides = [
  {
    id: 1,
    title: "Réservation Instantanée",
    description: "Trouvez et réservez la chambre parfaite en quelques clics, 24h/24 et 7j/7.",
    image: "/onboarding/instant-booking.jpg",
    buttonText: "Suivant",
  },
  {
    id: 2,
    title: "Paiement Sécurisé",
    description: "Effectuez vos paiements en toute sécurité avec nos systèmes de paiement cryptés.",
    image: "/onboarding/secure-payment.jpg",
    buttonText: "Suivant",
  },
  {
    id: 3,
    title: "Confort Premium",
    description: "Profitez d'un séjour confortable dans nos hôtels soigneusement sélectionnés.",
    image: "/onboarding/comfort.jpg",
    buttonText: "Suivant",
  },
  {
    id: 4,
    title: "Service Client 24/7",
    description: "Notre équipe est disponible à tout moment pour vous assister pendant votre séjour.",
    image: "/onboarding/support.jpg",
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
