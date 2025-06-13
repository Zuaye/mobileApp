"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Home } from "lucide-react";
import { AvatarHero } from "./avatarHero";

export function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false);
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.9]);
  const y = useTransform(scrollY, [0, 300], [0, 100]);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="w-full min-h-screen flex items-center justify-center mt-10 dark:bg-slate-900">
      <div className="relative w-full rounded-3xl  max-w-[96%] h-[85vh] md:h-[80vh] overflow-hidden">
        {/* Background Image with Soft Light Effect */}
        <div className="absolute inset-0 z-0">
          <motion.div className="absolute inset-0 bg-gradient-to-r from-yellow-900 to-yellow-800 opacity-80" />
          <motion.div className="absolute inset-0 bg-[url('/images/hero/hero7.jpeg')] bg-cover bg-center brightness-70" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/50 to-transparent" />
        </div>

        {/* Main Hero Content */}
        <motion.div
          style={{ opacity, scale, y }}
          className="relative z-10 h-full flex flex-col justify-center px-6 md:px-16 lg:px-24"
        >
          <div className="grid w-full gap-8 md:grid-cols-2 md:gap-12 lg:gap-16">
            <motion.div
              className="flex flex-col justify-center"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.h1
                className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <span className="block">
                  {/* Trouvez votre bien immobilier en toute simplicité */}
                  Cherchez, achetez ou louez en un clic
                </span>
              </motion.h1>

              <motion.p
                className="mt-6 max-w-lg text-xl text-slate-200"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Notre plateforme vous accompagne dans toutes vos démarches pour
                rechercher, acheter ou louer une maison soit une parcelle.{" "}
              </motion.p>

              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={isLoaded ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.9 }}
                className="mt-8 flex flex-col sm:flex-row gap-4"
              >
                <Link
                  href="#property"
                  className="px-8 py-2 rounded-lg bg-[#f39200] text-white font-medium hover:bg-[#e67e00] transition-colors shadow-md"
                >
                  Découvrir nos propriétés
                </Link>
                <Link
                  href="/contact"
                  className="px-8 py-2 rounded-lg bg-white/15 backdrop-blur-md border border-white/30 text-white font-medium hover:bg-white/25 transition-colors shadow-md"
                >
                  Nous contacter
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Card - Glassmorphism Effect */}
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={isLoaded ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="absolute bottom-30 right-12 z-20 max-w-md w-full rounded-xl overflow-hidden backdrop-blur-md bg-white/10 border border-white/20 shadow-xl md:flex hidden"
          >
            <div className="p-6 w-full">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-bold text-white">
                    Terrain vide
                  </h3>
                  <p className="text-white/80 mt-1">Espace vide à Zongo</p>
                </div>
                <div className="px-3 py-1 rounded-full bg-[#f39200]/90 text-white text-sm font-medium">
                  À Vendre
                </div>
              </div>

              <div className="flex mt-4 gap-4">
                <div className="w-24 h-24 relative rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src="/images/parcelles/image47.jpg?height=200&width=200"
                    alt="Résidence Élégance"
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <Home className="h-5 w-5 text-white/80" />
                    <span className="text-white/80">250m²</span>
                  </div>
                  <span className="text-xl font-bold text-white">10.000 $</span>

                  <Link href="/property/terrain3">
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      className="mt-2 w-full py-3 rounded-lg bg-[#f39200] text-white font-medium hover:bg-[#e67e00] transition-colors"
                    >
                      Voir maintenant
                    </motion.button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Les avatars partenaires */}
          <AvatarHero />
        </div>
      </div>
    </div>
  );
}
