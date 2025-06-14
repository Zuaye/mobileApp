"use client";

import { motion } from "framer-motion";
import { OnboardingSlideProps } from "./types";
import { Button } from "../ui/button";
import { ChevronRight, Users, Briefcase, Star, Search } from "lucide-react";

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
    scale: 0.95,
    filter: "blur(10px)",
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
    scale: 0.95,
    filter: "blur(10px)",
  }),
};

const getIcon = (slideId: number) => {
  switch (slideId) {
    case 1:
      return <Users className="w-6 h-6 text-primary" />;
    case 2:
      return <Briefcase className="w-6 h-6 text-primary" />;
    case 3:
      return <Star className="w-6 h-6 text-primary" />;
    default:
      return <Search className="w-6 h-6 text-primary" />;
  }
};

export function OnboardingSlide({
  slide,
  isActive,
  onNext,
  onSkip,
  currentIndex,
  totalSlides,
}: OnboardingSlideProps) {
  if (!isActive) return null;

  return (
    <motion.div
      key={slide.id}
      custom={1}
      variants={slideVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{
        x: { type: "spring", stiffness: 200, damping: 25 },
        opacity: { duration: 0.4, ease: "easeInOut" },
        scale: { duration: 0.4, ease: "easeInOut" },
        filter: { duration: 0.3 },
      }}
      className="absolute inset-0 flex flex-col justify-end items-start p-4 sm:p-6 md:p-8 lg:p-12"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div
          className="w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${slide.image})`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/95" />
        {/* <div className="absolute inset-0 backdrop-blur-[1px]" /> */}
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl text-left">
        {/* Icon */}
        <motion.div
          initial={{ scale: 0, y: 20, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
          className="mb-4 sm:mb-6 md:mb-8 flex justify-start"
        >
          <div className="p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl">
            {getIcon(slide.id)}
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4 leading-tight tracking-tight"
        >
          {slide.title}
        </motion.h1>

        {/* Subtitle */}
        {slide.subtitle && (
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
            className="text-base sm:text-lg text-blue-300 mb-4 sm:mb-6 font-semibold tracking-wide"
          >
            {slide.subtitle}
          </motion.h2>
        )}

        {/* Description */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
          className="text-sm sm:text-base text-gray-100 mb-6 sm:mb-8 md:mb-10 leading-relaxed max-w-xs sm:max-w-sm md:max-w-lg"
        >
          {slide.description}
        </motion.p>

        {/* Progress Indicators */}
        <motion.div
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
          className="flex justify-start space-x-2 sm:space-x-3 mb-6 sm:mb-8 md:mb-6"
        >
          {Array.from({ length: totalSlides }, (_, index) => (
            <div
              key={index}
              className={`h-1 sm:h-1.5 rounded-full transition-all duration-500 ease-out ${
                index === currentIndex
                  ? "w-8 sm:w-12 bg-gradient-to-r from-orange-400 to-yellow-500 shadow-lg shadow-blue-400/50"
                  : "w-1 sm:w-1.5 bg-white/40 hover:bg-white/60"
              }`}
            />
          ))}
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8, ease: "easeOut" }}
          className="flex sm:flex-row gap-3 sm:gap-4 justify-start items-start mb-10"
        >
          <Button
            onClick={onNext}
            className="bg-gradient-to-r from-orange-500 to-yellow-600 hover:from-orange-600 hover:to-yellow-700 hover:scale-[1.02] transition-all duration-300 px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl text-sm sm:text-base text-white font-semibold shadow-xl shadow-primary/25 group border-0 backdrop-blur-sm"
          >
            {slide.buttonText}
            <ChevronRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </Button>

          {onSkip && !slide.isLast && (
            <Button
              onClick={onSkip}
              variant="ghost"
              className="text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300 px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl text-sm sm:text-base backdrop-blur-sm border border-white/20"
            >
              Ignorer
            </Button>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}
