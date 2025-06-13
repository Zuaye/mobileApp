"use client";

import { HotelSearch } from "@/src/components/hotel/hotel-search";
import { motion } from "framer-motion";

export default function SearchPage() {
  return (
    <div className="min-h-screen p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <h1 className="text-2xl font-bold">Rechercher</h1>
        <HotelSearch />
      </motion.div>
    </div>
  );
}
