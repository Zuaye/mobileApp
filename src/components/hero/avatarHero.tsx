"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { avatarImages } from "@/src/lib/data/avatarImage";

export function AvatarHero() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1.5 }}
      className="absolute md:bottom-15 bottom-10 right-30 flex items-center"
    >
      <div className="flex justify-center items-center gap-x-2">
        <div className="flex -space-x-2 mr-3">
          {avatarImages.map((avatar, key) => (
            <div
              key={key}
              className="w-8 h-8 rounded-full border-2 border-white/20 dark:border-white/10 overflow-hidden shadow-lg"
            >
              <Image
                src={avatar.images[0]}
                alt={`image Avatar ${avatar.nom}`}
                width={32}
                height={32}
                className="object-cover"
              />
            </div>
          ))}
        </div>
        <p className="text-white/90 dark:text-white/80 text-sm font-medium">
          Nos partenaires
        </p>
      </div>
    </motion.div>
  );
}
