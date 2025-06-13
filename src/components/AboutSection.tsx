"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import Image from "next/image";

const aboutData = [
  {
    title: "Notre Vision",
    content:
      "Chez Domicon, nous aspirons à redéfinir l`expérience immobilière au Congo en offrant un service d`excellence et une transparence totale dans chaque transaction.",
    icon: "🏢",
  },
  {
    title: "Notre Expertise",
    content:
      "Plus de 10 ans d`expertise dans l`immobilier congolais, avec une équipe de professionnels qualifiés et une connaissance approfondie du marché local.",
    icon: "⭐",
  },
  {
    title: "Nos Services",
    content:
      "De la vente à la location, en passant par la gestion de patrimoine et le conseil en investissement, nous vous accompagnons dans tous vos projets immobiliers.",
    icon: "🔑",
  },
  {
    title: "Notre Engagement",
    content:
      "Nous nous engageons à vous offrir un service personnalisé et à vous accompagner à chaque étape de votre projet immobilier.",
    icon: "🤝",
  },
];

export const AboutSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-white dark:from-slate-900 via-slate-50 dark:via-slate-800 to-slate-100 dark:to-slate-700 opacity-90" />
        <Image
          src="/images/hero/hero4.jpg"
          alt="Background pattern"
          fill
          className="object-cover opacity-10"
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="container mx-auto px-4 relative z-10"
      >
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            <span className="text-[#f39200]">Découvrez</span>{" "}
            <span className="text-slate-800 dark:text-white">
              Notre Excellence
            </span>
          </h2>
          <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Une expertise immobilière unique au service de vos projets au Congo
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            variants={itemVariants}
            className="bg-white/30 dark:bg-slate-800/30 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-slate-200 dark:border-slate-700"
          >
            <Accordion type="single" collapsible className="space-y-4">
              {aboutData.map((item, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border-b border-slate-200/50 dark:border-slate-700/50 hover:bg-white/40 dark:hover:bg-slate-700/40 transition-all duration-300"
                >
                  <AccordionTrigger className="text-slate-800 dark:text-white hover:text-[#f39200]">
                    <span className="flex items-center gap-3">
                      <span className="text-2xl">{item.icon}</span>
                      <span className="font-medium">{item.title}</span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600 dark:text-slate-300">
                    {item.content}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-6">
            <div className="bg-[#f39200]/10 dark:bg-[#f39200]/20 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-slate-200 dark:border-slate-700">
              <h3 className="text-2xl font-semibold text-[#f39200] mb-4">
                Nos Chiffres Clés
              </h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <p className="text-4xl font-bold text-slate-800 dark:text-white">
                    500+
                  </p>
                  <p className="text-slate-600 dark:text-slate-300">
                    Propriétés Vendues
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-bold text-slate-800 dark:text-white">
                    1000+
                  </p>
                  <p className="text-slate-600 dark:text-slate-300">
                    Clients Satisfaits
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-bold text-slate-800 dark:text-white">
                    15+
                  </p>
                  <p className="text-slate-600 dark:text-slate-300">
                    Années d`Expérience
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-bold text-slate-800 dark:text-white">
                    5
                  </p>
                  <p className="text-slate-600 dark:text-slate-300">
                    Villes Couvertes
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-slate-800/90 dark:bg-slate-900/90 backdrop-blur-md rounded-2xl p-8 shadow-xl text-white border border-slate-700">
              <h3 className="text-2xl font-semibold text-[#f39200] mb-4">
                Notre Présence
              </h3>
              <p className="mb-4 text-slate-300">
                Nous sommes présents dans les provinces du congo ci-dessus:
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <span className="text-[#f39200]">▶</span> Kinshasa
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#f39200]">▶</span> Kongo-centarl
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#f39200]">▶</span> Equateur
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#f39200]">▶</span> Goma
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#f39200]">▶</span> Kasai
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};
