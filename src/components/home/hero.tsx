"use client";

import { Button } from "@/src/components/ui/button";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <div className="relative w-full min-h-[80vh] flex items-center justify-center">
      {/* Background Image avec overlay */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/50 z-10" />
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8 }}
          src="/images/hero/hero.jpg"
          alt="Chambre d'hôtel luxueuse"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Contenu */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            <span className="block">Trouvez votre</span>
            <span className="block text-primary">Moment de Détente</span>
          </h1>
          <p className="mt-6 max-w-lg mx-auto text-xl text-gray-300 sm:max-w-3xl">
            Réservez une chambre d'hôtel à l'heure en toute discrétion. Des
            chambres confortables disponibles 24/7 dans les meilleurs hôtels.
          </p>

          <div className="mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center gap-4">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <Button
                variant="outline"
                size="lg"
                className="mt-3 sm:mt-0 w-full sm:w-auto px-8 py-3 text-base font-medium bg-white/10 hover:bg-white/20 text-white border-white/30"
              >
                Rechercher
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          delay: 1,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2" />
        </div>
      </motion.div>
    </div>
  );
}
