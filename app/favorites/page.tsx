"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export default function FavoritesPage() {
  return (
    <div className="min-h-screen p-4  mt-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <h1 className="text-2xl font-bold">Mes Favoris</h1>

        {/* État vide */}
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="w-16 h-16 mb-4 rounded-full bg-primary/10 flex items-center justify-center"
          >
            <Heart className="w-8 h-8 text-primary" />
          </motion.div>
          <h2 className="text-xl font-semibold mb-2">Aucun favori</h2>
          <p className="text-muted-foreground">
            Les hôtels que vous ajoutez à vos favoris apparaîtront ici
          </p>
        </div>
      </motion.div>
    </div>
  );
}
