"use client";

import { motion } from "framer-motion";
import { Search, Calendar, Key } from "lucide-react";

const steps = [
  {
    icon: <Search className="w-6 h-6" />,
    title: "Recherchez",
    description:
      "Trouvez l'hôtel idéal en fonction de votre localisation et de vos préférences.",
  },
  {
    icon: <Calendar className="w-6 h-6" />,
    title: "Réservez",
    description:
      "Sélectionnez votre chambre et réservez instantanément pour la durée souhaitée.",
  },
  {
    icon: <Key className="w-6 h-6" />,
    title: "Profitez",
    description:
      "Accédez à votre chambre en toute discrétion et profitez de votre séjour.",
  },
];

export function HowItWorks() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="py-16 bg-muted/30">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <motion.div variants={itemVariants} className="lg:text-center mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Comment ça marche ?
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-muted-foreground lg:mx-auto">
            Réserver une chambre n'a jamais été aussi simple et discret
          </p>
        </motion.div>

        <div className="mt-10">
          <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
            {steps.map((step, stepIdx) => (
              <motion.div
                key={step.title}
                variants={itemVariants}
                className="relative"
              >
                <div className="relative flex flex-col items-center group">
                  {/* Numéro de l'étape */}
                  <div className="absolute -left-4 -top-4 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                    {stepIdx + 1}
                  </div>

                  {/* Icône */}
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                    <div className="text-primary">{step.icon}</div>
                  </div>

                  {/* Contenu */}
                  <div className="text-center">
                    <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>

                  {/* Ligne de connexion */}
                  {stepIdx < steps.length - 1 && (
                    <div className="hidden md:block absolute top-24 left-1/2 w-full h-0.5 bg-border" />
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
