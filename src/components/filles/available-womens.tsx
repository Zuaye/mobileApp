"use client";

import { motion } from "framer-motion";
import { Button } from "@/src/components/ui/button";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { AVAILABLE_WOMENS } from "@/src/lib/usersData/women-profile";
import { cn } from "@/src/lib/utils";
import { ProfileCard } from "./women-card";

export function AvailableWomens() {
  const router = useRouter();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const handleSeeAll = () => router.push("/women");
  const handleProfileClick = (profileId: string) =>
    router.push(`/women/${profileId}`);

  return (
    <section className="w-full py-8 px-4 md:px-6 bg-background">
      {/* En-tête de la section */}
      <div className="max-w-7xl md:mx-auto mb-8">
        <div className="flex flex-col md:flex-row items-start md:items-center md:justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-primary-foreground bg-clip-text text-transparent">
              Filles de chambres
            </h2>
            <p className="text-muted-foreground">
              Trouvez un partenaire pour un moment de plaisir
            </p>
          </div>

          <Button
            variant="ghost"
            className="flex items-center gap-2 hover:bg-primary/10 mt-5"
            onClick={handleSeeAll}
          >
            Voir tous les profils
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Conteneur des cartes avec défilement horizontal */}
      <div className="relative max-w-7xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory hide-scrollbar"
        >
          {AVAILABLE_WOMENS.map((profile) => (
            <motion.div
              key={profile.id}
              variants={itemVariants}
              className="flex-none snap-center first:pl-4 last:pr-4"
            >
              <ProfileCard
                profile={profile}
                onProfileClick={handleProfileClick}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Indicateurs de navigation mobile */}
        <div className="md:hidden flex justify-center gap-2 mt-4">
          {AVAILABLE_WOMENS.map((_, index) => (
            <div
              key={index}
              className={cn(
                "w-2 h-2 rounded-full transition-colors",
                index === 0 ? "bg-primary" : "bg-primary/20"
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
