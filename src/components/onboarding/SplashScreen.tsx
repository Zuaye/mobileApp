"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const startTime = Date.now();
    const duration = 3000;

    const updateProgress = () => {
      const currentTime = Date.now();
      const elapsed = currentTime - startTime;
      const newProgress = Math.min((elapsed / duration) * 100, 100);

      if (elapsed >= duration) {
        onComplete();
      } else {
        setProgress(newProgress);
        requestAnimationFrame(updateProgress);
      }
    };

    const animationFrame = requestAnimationFrame(updateProgress);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex min-h-screen flex-col items-center justify-center bg-primary text-white"
    >
      <div className="relative flex flex-col items-center">
        {/* Logo animation */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            duration: 0.5,
            ease: "easeOut",
          }}
          className="mb-4"
        >
          <Image
            src="images/logo/zuaye.svg"
            alt="Zuaye Logo"
            width={120}
            height={120}
            className="rounded-2xl"
          />
        </motion.div>

        {/* Text animation */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            delay: 0.3,
            duration: 0.5,
            ease: "easeOut",
          }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold mb-2">Zuaye</h1>
          <p className="text-lg opacity-90">Votre confort, notre priorité</p>
        </motion.div>

        {/* Loading indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="absolute -bottom-16"
        >
          <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin" />
        </motion.div>
      </div>
    </motion.div>
  );
}
