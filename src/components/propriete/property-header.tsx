"use client"

import { motion } from "framer-motion"

export function PropertyHeader() {
  return (
    <motion.div
      className="relative z-10 container mx-auto px-4 mb-16 text-center"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="inline-block mb-4">
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="h-1 w-10 bg-[#f39200]"></div>
          <span className="text-[#f39200] uppercase text-sm font-bold tracking-wider">
            Découvrez
          </span>
          <div className="h-1 w-10 bg-[#f39200]"></div>
        </div>
      </div>
      <h2 className="text-4xl md:text-5xl font-bold mb-6 dark:text-slate-100 text-slate-800">
        Trouvez votre bien idéal
      </h2>
      <p className="max-w-2xl mx-auto text-lg dark:text-slate-400 text-slate-600 mb-8">
        Explorez notre sélection exclusive de parcelles et maisons au Congo
        Kinshasa. Des opportunités uniques pour construire votre avenir dans un
        pays en plein essor.
      </p>
    </motion.div>
  );
}
