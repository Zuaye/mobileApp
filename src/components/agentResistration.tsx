"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, UserPlus, Building, ChevronRight } from "lucide-react";
import { Button } from "@/src/components/ui/button";

export default function AgentRegistrationCTA() {
  return (
    <section className="relative py-24 bg-slate-900 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="agentPattern"
              patternUnits="userSpaceOnUse"
              width="100"
              height="100"
              patternTransform="rotate(30)"
            >
              <rect width="100" height="100" fill="none" />
              <circle
                cx="50"
                cy="50"
                r="30"
                stroke="#f39200"
                strokeWidth="1"
                strokeDasharray="5,5"
                fill="none"
              />
              <circle
                cx="50"
                cy="50"
                r="15"
                stroke="#f39200"
                strokeWidth="1"
                fill="none"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#agentPattern)" />
        </svg>
      </div>

      <div className="container mx-auto px-4">
        <div className="relative z-10 bg-slate-800 rounded-2xl overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#f39200] to-blue-600"></div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Left Column - Text Content */}
            <div className="p-8 md:p-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#f39200]/10 text-[#f39200] text-sm font-medium mb-6">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Espace Agents Immobiliers
                </div>

                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  Publiez vos annonces et développez votre activité
                </h2>

                <p className="text-slate-300 mb-8">
                  Rejoignez notre plateforme et bénéficiez d`une visibilité
                  maximale pour vos biens immobiliers. Notre espace agent vous 
                  permet de gérer facilement vos annonces et de toucher une
                  clientèle qualifiée.
                </p>

                <div className="space-y-4 mb-8">
                  {[
                    "Publication illimitée d`annonces",
                    "Tableau de bord personnalisé",
                    "Gestion des demandes clients",
                    "Statistiques détaillées",
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <ChevronRight className="w-5 h-5 text-[#f39200] mr-2" />
                      <span className="text-white">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/agent/register">
                    <Button className="bg-[#f39200] hover:bg-[#d37e00] text-slate-900 w-full sm:w-auto">
                      S`inscrire comme agent
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/agent/login">
                    <Button
                      variant="outline"
                      className="border-slate-500 text-white hover:bg-white/10 w-full sm:w-auto"
                    >
                      Se connecter
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </div>

            {/* Right Column - Image/Illustration */}
            <motion.div
              className="relative bg-gradient-to-br from-slate-700 to-slate-900 p-8 md:p-12 flex items-center justify-center"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full bg-[#f39200]/20 flex items-center justify-center mb-6">
                  <Building className="w-12 h-12 text-[#f39200]" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  Espace Agent
                </h3>
                <p className="text-slate-300 mb-6 max-w-xs">
                  Accédez à votre tableau de bord pour gérer vos annonces et
                  votre profil professionnel.
                </p>
                <div className="grid grid-cols-2 gap-4 w-full max-w-xs">
                  <div className="bg-slate-800/50 p-4 rounded-lg text-center">
                    <div className="text-[#f39200] font-bold text-2xl">
                      +500
                    </div>
                    <div className="text-slate-400 text-sm">Agents actifs</div>
                  </div>
                  <div className="bg-slate-800/50 p-4 rounded-lg text-center">
                    <div className="text-[#f39200] font-bold text-2xl">
                      +2000
                    </div>
                    <div className="text-slate-400 text-sm">Propriétés</div>
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-10 right-10 w-20 h-20 rounded-full bg-blue-500/10 animate-pulse"></div>
              <div className="absolute bottom-10 left-10 w-16 h-16 rounded-full bg-[#f39200]/10 animate-pulse delay-700"></div>
              <div className="absolute top-1/2 left-1/4 w-12 h-12 rounded-full bg-green-500/10 animate-pulse delay-500"></div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
