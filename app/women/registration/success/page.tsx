"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { cn } from "@/src/lib/utils";
import { CheckCircle } from "lucide-react";
import { Button } from "@/src/components/ui/button";

export default function RegistrationSuccessPage() {
  const router = useRouter();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    // Redirection automatique après 5 secondes
    const timer = setTimeout(() => {
      router.push("/women");
    }, 5000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div
      className={cn(
        "min-h-screen w-full transition-colors duration-300 flex items-center justify-center py-16",
        isDark
          ? "bg-gradient-to-b from-slate-900 to-slate-800"
          : "bg-gradient-to-b from-slate-50 to-white"
      )}
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-md mx-auto text-center"
        >
          <div className="bg-white/10 dark:bg-black/20 backdrop-blur-lg rounded-xl p-8 shadow-lg">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="mb-6 flex justify-center"
            >
              <CheckCircle className="h-20 w-20 text-green-500" />
            </motion.div>

            <h1 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">
              Inscription Réussie !
            </h1>

            <p className="text-slate-600 dark:text-slate-300 mb-6">
              Votre profil a été créé avec succès. Notre équipe va examiner vos
              informations et vous contactera prochainement.
            </p>

            <div className="space-y-4">
              <Button onClick={() => router.push("/women")} className="w-full">
                Retour à l'accueil
              </Button>

              <p className="text-sm text-slate-500 dark:text-slate-400">
                Redirection automatique dans quelques secondes...
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
