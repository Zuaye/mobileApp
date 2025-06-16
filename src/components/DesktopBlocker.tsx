"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function DesktopBlocker() {
  return (
    // Cette div ne sera visible que sur les écrans larges (desktop)
    <div className="hidden scroll-none md:flex fixed inset-0 z-50  min-h-screen bg-black/80 backdrop-blur-sm w-full items-center justify-center p-4">
      {/* <div className="hidden md:flex fixed inset-0 z-50 bg-gradient-to-br from-background via-background to-blue-900/80 min-h-screen w-full items-center justify-center p-4"> */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full text-center space-y-8"
      >
        {/* Logo */}
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex justify-center"
        >
          <div className="relative w-32 h-32">
            <Image
              src="/images/logo/zuaye.png"
              alt="Zuaye Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
        </motion.div>

        {/* Texte */}
        <div className="space-y-4">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-4xl font-bold tracking-tighter bg-gradient-to-r from-primary to-primary-foreground bg-clip-text text-transparent"
          >
            Version Mobile Uniquement
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-white text-lg"
          >
            Zuaye est conçu pour une expérience mobile optimale. Veuillez
            accéder à l'application depuis votre smartphone.
          </motion.p>
        </div>

        {/* Box d'information */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-primary/5 backdrop-blur-md border border-primary/10 rounded-2xl p-6 shadow-lg"
        >
          <p className="text-white text-lg mb-2">Scannez ou visitez</p>
          <p className="text-primary text-xl font-semibold">
            zuaye.netlify.app
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
