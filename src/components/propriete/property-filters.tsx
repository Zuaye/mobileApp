"use client"

import { Button } from "@/src/components/ui/button"
import { cn } from "@/src/lib/utils"
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface PropertyFiltersProps {
  propertyType: string
  setPropertyType: (type: string) => void
}

export function PropertyFilters({ propertyType, setPropertyType }: PropertyFiltersProps) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Effet pour éviter les problèmes d'hydratation avec next-themes
  useEffect(() => {
    setMounted(true);
  }, []);
  // Attendre que le thème soit chargé pour éviter les problèmes d'hydratation
  if (!mounted) {
    return null;
  }

  const isDark = theme === 'dark';

  return (
    <div className="container mx-auto px-4 mb-10 z-10">
      <div className={cn(
        "flex flex-wrap justify-center gap-4 p-4 rounded-2xl backdrop-blur-sm transition-all duration-300",
        isDark 
          ? "bg-slate-800/30 border border-slate-700/50" 
          : "bg-white/30 shadow-sm"
      )}>
        <Button
          variant="outline"
          className={cn(
            "rounded-full transition-all duration-300",
            isDark
              ? (propertyType === "all"
                ? "bg-amber-500 text-white border-amber-500 hover:bg-amber-600 hover:border-amber-600"
                : "border-amber-500/70 text-amber-400 hover:bg-amber-500/20")
              : (propertyType === "all"
                ? "bg-[#f39200] text-white border-[#f39200] hover:bg-[#f39200]/90"
                : "border-[#f39200] text-[#f39200] hover:bg-[#f39200] hover:text-white")
          )}
          onClick={() => setPropertyType("all")}
        >
          Tous les biens
        </Button>
        <Button
          variant="outline"
          className={cn(
            "rounded-full transition-all duration-300",
            isDark
              ? (propertyType === "Parcelle"
                ? "bg-slate-700 text-white border-slate-600 hover:bg-slate-600"
                : "border-slate-600 text-slate-300 hover:bg-slate-700/50")
              : (propertyType === "Parcelle"
                ? "bg-slate-800 text-white border-slate-800 hover:bg-slate-700"
                : "border-slate-300 text-slate-700 hover:bg-slate-100")
          )}
          onClick={() => setPropertyType("Parcelle")}
        >
          Parcelles
        </Button>
        <Button
          variant="outline"
          className={cn(
            "rounded-full transition-all duration-300",
            isDark
              ? (propertyType === "Maison"
                ? "bg-slate-700 text-white border-slate-600 hover:bg-slate-600"
                : "border-slate-600 text-slate-300 hover:bg-slate-700/50")
              : (propertyType === "Maison"
                ? "bg-slate-800 text-white border-slate-800 hover:bg-slate-700"
                : "border-slate-300 text-slate-700 hover:bg-slate-100")
          )}
          onClick={() => setPropertyType("Maison")}
        >
          Maisons
        </Button>
        <Button
          variant="outline"
          className={cn(
            "rounded-full transition-all duration-300",
            isDark
              ? (propertyType === "Terrain"
                ? "bg-slate-700 text-white border-slate-600 hover:bg-slate-600"
                : "border-slate-600 text-slate-300 hover:bg-slate-700/50")
              : (propertyType === "Terrain"
                ? "bg-slate-800 text-white border-slate-800 hover:bg-slate-700"
                : "border-slate-300 text-slate-700 hover:bg-slate-100")
          )}
          onClick={() => setPropertyType("Terrain")}
        >
          Terrains agricoles
        </Button>
      </div>
    </div>
  )
}
