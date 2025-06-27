"use client";

import { useState, useEffect } from "react";
import { OnboardingSlide } from "./OnboardingSlide";
import type { OnboardingProps } from "./types";
import { cn } from "@/src/lib/utils";
import { motion, AnimatePresence, PanInfo } from "framer-motion";

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
    title: "Accompagnement",
    description:
      " Connectez-vous aux femmes libres et ouvertes d’esprit de Kinshasa,prêtes à partager des moments de plaisir, de détente et deliberté.",
    image: "/images/women/jessica2.jpg",
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

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

export function OnboardingScreen({ onComplete, onSkip }: OnboardingProps) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [[page, direction], setPage] = useState([0, 0]);

  const paginate = (newDirection: number) => {
    const nextIndex = currentSlideIndex + newDirection;
    if (nextIndex >= 0 && nextIndex < slides.length) {
      setCurrentSlideIndex(nextIndex);
      setPage([page + newDirection, newDirection]);
    }
  };

  const handleDragEnd = (
    event: MouseEvent | TouchEvent | PointerEvent,
    { offset, velocity }: PanInfo
  ) => {
    const swipe = swipePower(offset.x, velocity.x);

    if (swipe < -swipeConfidenceThreshold) {
      paginate(1);
    } else if (swipe > swipeConfidenceThreshold) {
      paginate(-1);
    }
  };

  const handleNext = () => {
    if (currentSlideIndex === slides.length - 1) {
      onComplete();
    } else {
      paginate(1);
    }
  };

  const handleDotClick = (index: number) => {
    const direction = index > currentSlideIndex ? 1 : -1;
    setCurrentSlideIndex(index);
    setPage([index, direction]);
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-background">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={page}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={handleDragEnd}
          className="absolute w-full h-full"
        >
          <OnboardingSlide
            slide={slides[currentSlideIndex]}
            isActive={true}
            onNext={handleNext}
            onSkip={onSkip}
            currentIndex={currentSlideIndex}
            totalSlides={slides.length}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
