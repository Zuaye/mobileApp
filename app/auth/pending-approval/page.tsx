"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Clock, Mail, ArrowLeft, CheckCircle2 } from "lucide-react";
import { Button } from "@/src/components/ui/button";

export default function PendingApproval() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 py-12 mt-20">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white mb-6 transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour à l&apos;accueil
            </Link>
          </div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-xl backdrop-blur-sm"
          >
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#f39200]/10 mb-6">
                <Clock className="h-8 w-8 text-[#f39200]" />
              </div>

              <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                Demande en cours d&apos;examen
              </h1>

              <p className="text-slate-600 dark:text-slate-400 mb-8">
                Votre demande d&apos;inscription est actuellement en cours
                d&apos;examen par notre équipe. Nous vérifions vos informations
                et documents pour assurer la sécurité de notre plateforme.
              </p>

              <div className="space-y-6 mb-8">
                <div className="flex items-start space-x-4 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg">
                  <Mail className="h-5 w-5 text-[#f39200] mt-1" />
                  <div className="text-left">
                    <h3 className="font-medium text-slate-900 dark:text-white mb-1">
                      Vous recevrez un email
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Nous vous enverrons un email dès que votre compte sera
                      approuvé. Veuillez vérifier régulièrement votre boîte de
                      réception.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg">
                  <CheckCircle2 className="h-5 w-5 text-[#f39200] mt-1" />
                  <div className="text-left">
                    <h3 className="font-medium text-slate-900 dark:text-white mb-1">
                      Délai de traitement
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Le délai de traitement est généralement de 24 à 48 heures
                      ouvrées. Nous vous remercions de votre patience.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <Link href="/">
                  <Button
                    variant="outline"
                    className="w-full border-slate-200 dark:border-slate-700"
                  >
                    Retour à l&apos;accueil
                  </Button>
                </Link>
                <Link href="/agent/login">
                  <Button
                    variant="ghost"
                    className="w-full text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  >
                    Déjà un compte ? Connectez-vous
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Footer */}
          <div className="text-center mt-8">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Si vous avez des questions, n&apos;hésitez pas à{" "}
              <Link href="/contact" className="text-[#f39200] hover:underline">
                nous contacter
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
