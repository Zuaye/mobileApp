"use client";

import { motion } from "framer-motion";
import { Check, ChevronRight, X } from "lucide-react";
import { cn } from "@/src/lib/utils";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

type PlanFeature = {
  name: string;
  free: boolean | string;
  pro: boolean | string;
  business: boolean | string;
};

type Plan = {
  name: string;
  color: string;
  lightColor: string;
  darkColor: string;
  price: string;
  description: string;
  features: PlanFeature[];
  cta: string;
  highlight?: boolean;
  emoji: string;
};

export function Pricing() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Effet pour éviter les problèmes d'hydratation avec next-themes
  useEffect(() => {
    setMounted(true);
  }, []);

  const features: PlanFeature[] = [
    {
      name: "Nombre d'annonces actives",
      free: "3",
      pro: "25",
      business: "Illimité",
    },
    {
      name: "Durée de publication des annonces",
      free: "15 jours",
      pro: "30 jours",
      business: "90 jours",
    },
    {
      name: "Visibilité dans les résultats",
      free: "Faible",
      pro: "Moyenne (Boost x1)",
      business: "Élevée (Boost x2)",
    },
    {
      name: "Nombre d'images par annonce",
      free: "3 max",
      pro: "10 max",
      business: "Illimité",
    },
    {
      name: "Types de biens autorisés",
      free: "Maison / Parcelle uniquement",
      pro: "Tous types (Maisons, Appartements, Terrains, etc.)",
      business: "Tous types",
    },
    {
      name: "Messagerie directe client",
      free: false,
      pro: true,
      business: "Oui + WhatsApp intégré",
    },
    {
      name: "Statistiques sur les annonces",
      free: false,
      pro: "Vues & clics",
      business: "Vues, clics + prospects",
    },
    {
      name: "Profil public personnalisé",
      free: "Basique",
      pro: "Pro avec logo et bio",
      business: "Page Pro complète",
    },
    {
      name: "Badge de vérification",
      free: false,
      pro: "Optionnel",
      business: "Inclus",
    },
    {
      name: "Support technique",
      free: "Email standard",
      pro: "Email prioritaire",
      business: "Chat direct + priorité",
    },
    {
      name: "Accès aux leads qualifiés",
      free: false,
      pro: "Limité",
      business: "Complet",
    },
  ];

  const plans: Plan[] = [
    {
      name: "Gratuit",
      emoji: "🟢",
      color: "green",
      lightColor: "green-500",
      darkColor: "green-400",
      price: "0",
      description: "Pour les particuliers et les débutants",
      features: features,
      cta: "Commencer gratuitement",
    },
    {
      name: "Pro",
      emoji: "🔵",
      color: "blue",
      lightColor: "blue-500",
      darkColor: "blue-400",
      price: "15",
      description: "Pour les agents immobiliers indépendants",
      features: features,
      cta: "Essayer Pro",
      highlight: true,
    },
    {
      name: "Business",
      emoji: "🟣",
      color: "purple",
      lightColor: "purple-500",
      darkColor: "purple-400",
      price: "30",
      description: "Pour les agences et les professionnels",
      features: features,
      cta: "Contacter les ventes",
    },
  ];

  // Attendre que le thème soit chargé pour éviter les problèmes d'hydratation
  if (!mounted) {
    return null;
  }

  const isDark = theme === "dark";

  return (
    <div
      id="pricing"
      className={cn(
        "relative py-24 overflow-hidden transition-colors duration-300",
        isDark
          ? "bg-gradient-to-b from-slate-900 to-slate-800"
          : "bg-gradient-to-b from-slate-50 to-white"
      )}
    >
      {/* Éléments décoratifs avec glassmorphism */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[5%] w-[40%] h-[40%] bg-green-500/20 dark:bg-green-500/15 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[10%] right-[5%] w-[30%] h-[30%] bg-blue-500/15 dark:bg-blue-500/10 rounded-full blur-[80px]"></div>
        <div className="absolute top-[40%] right-[15%] w-[20%] h-[20%] bg-purple-500/10 dark:bg-purple-500/5 rounded-full blur-[60px]"></div>
      </div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600 dark:from-blue-400 dark:to-purple-500">
              Nos
            </span>{" "}
            <span className={isDark ? "text-white" : "text-slate-800"}>
              forfaits
            </span>
          </h2>
          <p
            className={
              isDark
                ? "text-slate-300"
                : "text-slate-600" + " max-w-2xl mx-auto text-lg"
            }
          >
            Choisissez le plan qui correspond le mieux à vos besoins
          </p>
        </motion.div>

        {/* Plans de tarification */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {plans.map((plan, planIndex) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: planIndex * 0.1 }}
              className="relative h-full"
            >
              <div
                className={cn(
                  "h-full flex flex-col rounded-2xl backdrop-blur-sm border transition-all duration-300",
                  isDark
                    ? plan.highlight
                      ? "bg-white/[0.08] border-blue-400/50 shadow-lg shadow-blue-500/10"
                      : "bg-white/[0.03] border-white/10"
                    : plan.highlight
                    ? "bg-white/90 border-blue-200 shadow-lg shadow-blue-100/50"
                    : "bg-white/80 border-slate-200"
                )}
              >
                {plan.highlight && (
                  <div className="absolute -top-3 left-0 right-0 mx-auto w-max">
                    <div className="bg-blue-500 dark:bg-blue-600 text-white text-xs px-3 py-1 rounded-full font-medium">
                      Recommandé
                    </div>
                  </div>
                )}

                <div className="p-6 flex-grow">
                  <div className="flex justify-between items-center mb-4">
                    <h3
                      className={
                        isDark
                          ? "text-xl font-bold text-white"
                          : "text-xl font-bold text-slate-800"
                      }
                    >
                      {plan.emoji} {plan.name}
                    </h3>
                  </div>

                  <div className="flex items-baseline mb-4">
                    <span
                      className={
                        isDark
                          ? "text-4xl font-bold text-white"
                          : "text-4xl font-bold text-slate-800"
                      }
                    >
                      {plan.price}€
                    </span>
                    {plan.price !== "0" && (
                      <span
                        className={
                          isDark
                            ? "text-slate-400"
                            : "text-slate-500" + " ml-1 text-sm"
                        }
                      >
                        / mois
                      </span>
                    )}
                  </div>

                  <p
                    className={
                      isDark ? "text-slate-300" : "text-slate-600" + " mb-6"
                    }
                  >
                    {plan.description}
                  </p>

                  <div className="space-y-4">
                    {features.map((feature, index) => {
                      const value =
                        plan.name === "Gratuit"
                          ? feature.free
                          : plan.name === "Pro"
                          ? feature.pro
                          : feature.business;

                      return (
                        <div key={index} className="flex items-start">
                          {value === false ? (
                            <X className="h-5 w-5 text-red-400 dark:text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                          ) : (
                            <Check
                              className={cn(
                                "h-5 w-5 mr-3 mt-0.5 flex-shrink-0",
                                plan.name === "Gratuit"
                                  ? "text-green-500 dark:text-green-400"
                                  : plan.name === "Pro"
                                  ? "text-blue-500 dark:text-blue-400"
                                  : "text-purple-500 dark:text-purple-400"
                              )}
                            />
                          )}
                          <div>
                            <p
                              className={
                                isDark
                                  ? "text-slate-300"
                                  : "text-slate-700" + " text-sm"
                              }
                            >
                              {feature.name}
                            </p>
                            {value !== true && value !== false && (
                              <p
                                className={
                                  isDark
                                    ? "text-white"
                                    : "text-slate-800" + " text-xs mt-1"
                                }
                              >
                                {value}
                              </p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="p-6 pt-0 mt-auto">
                  <Link
                    href="/auth/register/commisionnaire"
                    className={cn(
                      "inline-flex items-center justify-center w-full px-6 py-3 text-sm font-medium rounded-xl transition-colors",
                      plan.name === "Gratuit"
                        ? "text-white bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600"
                        : plan.name === "Pro"
                        ? "text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                        : "text-white bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600"
                    )}
                  >
                    {plan.cta}
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
