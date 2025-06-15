"use client";

import { Button } from "@/src/components/ui/button";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

export function Hero() {
  return (
    <div className="relative w-full min-h-[30vh] flex items-center justify-center">
      {/* Background Image avec overlay */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-black/60 z-10" />
        <motion.img
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          src="/images/hero/hero.jpg"
          alt="Chambre d'hôtel"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Contenu */}
      <div className="relative z-20 w-full px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <h1 className="text-3xl font-bold text-white">
            <span className="block mb-1">Trouvez votre</span>
            <span className="block text-primary">Chambre Idéale</span>
          </h1>

          <p className="text-sm text-gray-300 max-w-xs mx-auto">
            Réservez une chambre en toute discrétion, 24/7
          </p>
        </motion.div>
      </div>
    </div>
  );
}
