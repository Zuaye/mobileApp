"use client";

import type React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  Smartphone,
  Building,
  Check,
  ChevronDown,
  ChevronUp,
  Shield,
  CreditCard,
  CheckCircle2,
  Clock,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

export default function PaymentClient() {
  const searchParams = useSearchParams();
  const period = searchParams.get("period") || "1month";

  const [paymentMethod, setPaymentMethod] = useState<"mobile" | "bank">(
    "mobile"
  );
  const [mobileProvider, setMobileProvider] = useState<
    "mpesa" | "airtel" | "orange"
  >("mpesa");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [bankDetails, setBankDetails] = useState({
    accountName: "",
    accountNumber: "",
  });
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);

  const periodNames = {
    "1month": "1 mois",
    "3months": "3 mois",
    "6months": "6 mois",
    annually: "1 année",
  };

  const prices = {
    "1month": "59",
    "3months": "52",
    "6months": "49",
    annually: "45",
  };

  const getTotalPrice = () => {
    const basePrice = Number(prices[period as keyof typeof prices]);

    if (period === "3months") {
      return basePrice * 3;
    } else if (period === "6months") {
      return basePrice * 6;
    } else if (period === "annually") {
      return basePrice * 12;
    }

    return basePrice;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simuler un traitement de paiement
    setTimeout(() => {
      setIsProcessing(false);
      setStep(2);
    }, 2000);
  };

  return (
    <div className="min-h-screen mt-10 bg-white">
      {/* Éléments décoratifs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[5%] left-[5%] w-[30%] h-[30%] bg-[#f39200]/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[5%] right-[5%] w-[25%] h-[25%] bg-[#f39200]/5 rounded-full blur-[100px]"></div>
        <div className="absolute top-[40%] right-[15%] w-[15%] h-[15%] bg-amber-400/5 rounded-full blur-[60px]"></div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-5xl relative z-10">
        <Link
          href="/"
          className="inline-flex items-center text-slate-600 hover:text-slate-900 mb-8 transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Finaliser votre achat
          </h1>
          <p className="text-slate-600">
            Choisissez votre méthode de paiement préférée
          </p>

          {/* Indicateur d`étape */}
          <div className="flex items-center justify-center mt-8 max-w-md mx-auto">
            <div className="flex items-center w-full">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step >= 1
                    ? "bg-[#f39200] text-white"
                    : "bg-slate-200 text-slate-500"
                }`}
              >
                1
              </div>
              <div
                className={`h-1 flex-1 ${
                  step >= 2 ? "bg-[#f39200]" : "bg-slate-200"
                }`}
              ></div>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step >= 2
                    ? "bg-[#f39200] text-white"
                    : "bg-slate-200 text-slate-500"
                }`}
              >
                2
              </div>
            </div>
          </div>
          <div className="flex justify-between max-w-md mx-auto mt-2 text-xs text-slate-500">
            <span>Paiement</span>
            <span>Confirmation</span>
          </div>
        </motion.div>

        {/* Le reste du contenu de la page de paiement... */}
        {/* Pour éviter de dupliquer tout le code, nous incluons ici une référence au contenu existant */}
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {/* Formulaire de paiement */}
              <div className="md:col-span-2">
                <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-lg">
                  <div className="p-6 border-b border-slate-100 bg-slate-50">
                    <h2 className="text-xl font-semibold text-slate-900">
                      Méthode de paiement
                    </h2>
                  </div>

                  <div className="p-6">
                    <div className="flex space-x-4 mb-8">
                      <button
                        onClick={() => setPaymentMethod("mobile")}
                        className={`flex-1 p-4 rounded-xl flex flex-col items-center justify-center transition-all duration-300 ${
                          paymentMethod === "mobile"
                            ? "bg-gradient-to-r from-amber-50 to-orange-50 border border-[#f39200]/30 shadow-md"
                            : "bg-white border border-slate-200 hover:border-slate-300"
                        }`}
                      >
                        <Smartphone
                          className={`h-6 w-6 mb-2 ${
                            paymentMethod === "mobile"
                              ? "text-[#f39200]"
                              : "text-slate-400"
                          }`}
                        />
                        <span
                          className={
                            paymentMethod === "mobile"
                              ? "text-slate-900 font-medium"
                              : "text-slate-600"
                          }
                        >
                          Mobile Money
                        </span>
                      </button>
                      <button
                        onClick={() => setPaymentMethod("bank")}
                        className={`flex-1 p-4 rounded-xl flex flex-col items-center justify-center transition-all duration-300 ${
                          paymentMethod === "bank"
                            ? "bg-gradient-to-r from-amber-50 to-orange-50 border border-[#f39200]/30 shadow-md"
                            : "bg-white border border-slate-200 hover:border-slate-300"
                        }`}
                      >
                        <Building
                          className={`h-6 w-6 mb-2 ${
                            paymentMethod === "bank"
                              ? "text-[#f39200]"
                              : "text-slate-400"
                          }`}
                        />
                        <span
                          className={
                            paymentMethod === "bank"
                              ? "text-slate-900 font-medium"
                              : "text-slate-600"
                          }
                        >
                          RawbANK
                        </span>
                      </button>
                    </div>

                    <form onSubmit={handleSubmit}>
                      <AnimatePresence mode="wait">
                        {paymentMethod === "mobile" && (
                          <motion.div
                            key="mobile"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-6 overflow-hidden"
                          >
                            <div className="grid grid-cols-3 gap-4 mb-6">
                              <button
                                type="button"
                                onClick={() => setMobileProvider("mpesa")}
                                className={`p-3 rounded-xl flex flex-col items-center justify-center transition-all duration-300 ${
                                  mobileProvider === "mpesa"
                                    ? "bg-gradient-to-r from-amber-50 to-orange-50 border border-[#f39200]/30 shadow-md"
                                    : "bg-white border border-slate-200 hover:border-slate-300"
                                }`}
                              >
                                <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mb-2 overflow-hidden">
                                  {/* Emplacement pour logo M-PESA */}
                                  <span className="text-green-600 font-bold text-sm">
                                    M-PESA
                                  </span>
                                </div>
                                <span
                                  className={
                                    mobileProvider === "mpesa"
                                      ? "text-slate-900 text-sm font-medium"
                                      : "text-slate-600 text-sm"
                                  }
                                >
                                  M-PESA
                                </span>
                              </button>
                              <button
                                type="button"
                                onClick={() => setMobileProvider("airtel")}
                                className={`p-3 rounded-xl flex flex-col items-center justify-center transition-all duration-300 ${
                                  mobileProvider === "airtel"
                                    ? "bg-gradient-to-r from-amber-50 to-orange-50 border border-[#f39200]/30 shadow-md"
                                    : "bg-white border border-slate-200 hover:border-slate-300"
                                }`}
                              >
                                <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mb-2 overflow-hidden">
                                  {/* Emplacement pour logo Airtel */}
                                  <span className="text-red-600 font-bold text-sm">
                                    Airtel
                                  </span>
                                </div>
                                <span
                                  className={
                                    mobileProvider === "airtel"
                                      ? "text-slate-900 text-sm font-medium"
                                      : "text-slate-600 text-sm"
                                  }
                                >
                                  Airtel Money
                                </span>
                              </button>
                              <button
                                type="button"
                                onClick={() => setMobileProvider("orange")}
                                className={`p-3 rounded-xl flex flex-col items-center justify-center transition-all duration-300 ${
                                  mobileProvider === "orange"
                                    ? "bg-gradient-to-r from-amber-50 to-orange-50 border border-[#f39200]/30 shadow-md"
                                    : "bg-white border border-slate-200 hover:border-slate-300"
                                }`}
                              >
                                <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mb-2 overflow-hidden">
                                  {/* Emplacement pour logo Orange */}
                                  <span className="text-orange-600 font-bold text-sm">
                                    Orange
                                  </span>
                                </div>
                                <span
                                  className={
                                    mobileProvider === "orange"
                                      ? "text-slate-900 text-sm font-medium"
                                      : "text-slate-600 text-sm"
                                  }
                                >
                                  Orange Money
                                </span>
                              </button>
                            </div>

                            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
                              <div className="flex items-start">
                                <div className="bg-amber-100 rounded-full p-1 mr-3 mt-0.5">
                                  <Check className="h-4 w-4 text-amber-600" />
                                </div>
                                <div>
                                  <p className="text-amber-800 text-sm">
                                    Vous recevrez un message sur votre téléphone
                                    pour confirmer le paiement. Assurez-vous que
                                    votre téléphone est allumé et a du réseau.
                                  </p>
                                </div>
                              </div>
                            </div>

                            <div>
                              <label
                                htmlFor="phone"
                                className="block text-sm font-medium text-slate-700 mb-2"
                              >
                                Numéro de téléphone
                              </label>
                              <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
                                  +243
                                </span>
                                <input
                                  type="tel"
                                  id="phone"
                                  value={phoneNumber}
                                  onChange={(e) =>
                                    setPhoneNumber(e.target.value)
                                  }
                                  className="w-full py-3 pl-12 pr-4 bg-white border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#f39200]/50 focus:border-transparent"
                                  placeholder="9XXXXXXXX"
                                  required
                                />
                              </div>
                              <p className="mt-2 text-sm text-slate-500">
                                Vous recevrez une notification sur votre
                                téléphone pour confirmer le paiement.
                              </p>
                            </div>
                          </motion.div>
                        )}

                        {paymentMethod === "bank" && (
                          <motion.div
                            key="bank"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-6 overflow-hidden"
                          >
                            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm mb-6">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center mr-3 overflow-hidden">
                                    {/* Emplacement pour logo RawbANK */}
                                    <span className="text-[#f39200] font-bold text-sm">
                                      RB
                                    </span>
                                  </div>
                                  <div>
                                    <h3 className="text-slate-900 font-medium">
                                      RawbANK
                                    </h3>
                                    <p className="text-slate-500 text-sm">
                                      Banque officielle partenaire
                                    </p>
                                  </div>
                                </div>
                                <button
                                  type="button"
                                  onClick={() =>
                                    setIsDetailsOpen(!isDetailsOpen)
                                  }
                                  className="text-slate-500 hover:text-slate-700"
                                >
                                  {isDetailsOpen ? (
                                    <ChevronUp className="h-5 w-5" />
                                  ) : (
                                    <ChevronDown className="h-5 w-5" />
                                  )}
                                </button>
                              </div>

                              <AnimatePresence>
                                {isDetailsOpen && (
                                  <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="mt-4 pt-4 border-t border-slate-200 overflow-hidden"
                                  >
                                    <p className="text-slate-700 text-sm mb-2">
                                      Pour effectuer un paiement via RawbANK,
                                      veuillez utiliser les informations
                                      suivantes :
                                    </p>
                                    <ul className="space-y-2 text-sm bg-slate-50 p-3 rounded-lg">
                                      <li className="flex justify-between">
                                        <span className="text-slate-600">
                                          Numéro de compte :
                                        </span>
                                        <span className="text-slate-900 font-medium">
                                          RB-IMMO-2023
                                        </span>
                                      </li>
                                      <li className="flex justify-between">
                                        <span className="text-slate-600">
                                          Bénéficiaire :
                                        </span>
                                        <span className="text-slate-900 font-medium">
                                          ImmoAgence RDC
                                        </span>
                                      </li>
                                      <li className="flex justify-between">
                                        <span className="text-slate-600">
                                          Référence :
                                        </span>
                                        <span className="text-slate-900 font-medium">{`PREMIUM-${period.substring(
                                          0,
                                          3
                                        )}`}</span>
                                      </li>
                                    </ul>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>

                            <div>
                              <label
                                htmlFor="accountName"
                                className="block text-sm font-medium text-slate-700 mb-2"
                              >
                                Nom du titulaire du compte
                              </label>
                              <input
                                type="text"
                                id="accountName"
                                value={bankDetails.accountName}
                                onChange={(e) =>
                                  setBankDetails({
                                    ...bankDetails,
                                    accountName: e.target.value,
                                  })
                                }
                                className="w-full py-3 px-4 bg-white border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#f39200]/50 focus:border-transparent"
                                placeholder="Votre nom complet"
                                required
                              />
                            </div>

                            <div>
                              <label
                                htmlFor="accountNumber"
                                className="block text-sm font-medium text-slate-700 mb-2"
                              >
                                Numéro de compte RawbANK
                              </label>
                              <input
                                type="text"
                                id="accountNumber"
                                value={bankDetails.accountNumber}
                                onChange={(e) =>
                                  setBankDetails({
                                    ...bankDetails,
                                    accountNumber: e.target.value,
                                  })
                                }
                                className="w-full py-3 px-4 bg-white border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#f39200]/50 focus:border-transparent"
                                placeholder="RB-XXXXX-XXXX"
                                required
                              />
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <div className="mt-8">
                        <button
                          type="submit"
                          disabled={isProcessing}
                          className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-amber-500 to-[#f39200] text-white font-medium hover:shadow-lg hover:shadow-[#f39200]/20 transition-all duration-300 flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                          {isProcessing ? (
                            <>
                              <svg
                                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <circle
                                  className="opacity-25"
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                ></circle>
                                <path
                                  className="opacity-75"
                                  fill="currentColor"
                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                              </svg>
                              Traitement en cours...
                            </>
                          ) : (
                            <>Finaliser le paiement</>
                          )}
                        </button>
                        <div className="mt-4 flex items-center justify-center gap-4">
                          <div className="flex items-center text-sm text-slate-500">
                            <Shield className="h-4 w-4 mr-1 text-slate-400" />{" "}
                            Paiement sécurisé
                          </div>
                          <div className="flex items-center text-sm text-slate-500">
                            <CreditCard className="h-4 w-4 mr-1 text-slate-400" />{" "}
                            Données cryptées
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>

              {/* Récapitulatif de commande */}
              <div>
                <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-lg sticky top-8">
                  <div className="p-6 border-b border-slate-100 bg-slate-50">
                    <h2 className="text-xl font-semibold text-slate-900">
                      Récapitulatif
                    </h2>
                  </div>

                  <div className="p-6">
                    <div className="mb-6">
                      <div className="flex items-center mb-4">
                        <div className="w-10 h-10 rounded-full bg-[#f39200]/10 flex items-center justify-center mr-3">
                          <span className="text-[#f39200] font-bold">P</span>
                        </div>
                        <div>
                          <h3 className="text-slate-900 font-medium">
                            Forfait Premium
                          </h3>
                          <p className="text-slate-500 text-sm">
                            Agent personnel
                          </p>
                        </div>
                      </div>

                      <div className="bg-slate-50 rounded-xl p-4 space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-500">Durée</span>
                          <span className="text-slate-900">
                            {periodNames[period as keyof typeof periodNames]}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-500">Prix unitaire</span>
                          <span className="text-slate-900">
                            {prices[period as keyof typeof prices]}€ / mois
                          </span>
                        </div>
                        {period !== "1month" && (
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-500">Période</span>
                            <span className="text-slate-900">
                              {period === "3months"
                                ? "3 mois"
                                : period === "6months"
                                ? "6 mois"
                                : "12 mois"}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="border-t border-slate-100 pt-4 mb-6">
                      <div className="flex justify-between mb-2">
                        <span className="text-slate-600">Sous-total</span>
                        <span className="text-slate-900">
                          {getTotalPrice()}€
                        </span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span className="text-slate-600">TVA (16%)</span>
                        <span className="text-slate-900">
                          {(getTotalPrice() * 0.16).toFixed(2)}€
                        </span>
                      </div>
                      <div className="flex justify-between font-medium text-lg mt-4 pt-4 border-t border-slate-100">
                        <span className="text-slate-900">Total</span>
                        <span className="text-[#f39200]">
                          {(getTotalPrice() * 1.16).toFixed(2)}€
                        </span>
                      </div>
                    </div>

                    <div className="bg-slate-50 rounded-xl p-4">
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-slate-700 text-sm">
                            Accès immédiat après paiement
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-slate-700 text-sm">
                            Support client 24/7
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-slate-700 text-sm">
                            Annulation sans frais pendant 14 jours
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="max-w-2xl mx-auto"
            >
              {/* Contenu de la confirmation */}
              <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-lg">
                <div className="p-8 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-6">
                    <CheckCircle2 className="h-8 w-8 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">
                    Paiement en cours de traitement
                  </h2>
                  <p className="text-slate-600 mb-8 max-w-md mx-auto">
                    Votre demande de paiement a été enregistrée avec succès et
                    est en cours de traitement.
                  </p>

                  <div className="bg-slate-50 rounded-xl p-6 mb-8 max-w-md mx-auto">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-slate-600">Statut</span>
                      <div className="flex items-center text-amber-600 bg-amber-50 px-3 py-1 rounded-full">
                        <Clock className="h-4 w-4 mr-1" />
                        <span className="text-sm font-medium">En attente</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-slate-600">Méthode</span>
                      <span className="text-slate-900 font-medium">
                        {paymentMethod === "mobile"
                          ? `${
                              mobileProvider === "mpesa"
                                ? "M-PESA"
                                : mobileProvider === "airtel"
                                ? "Airtel Money"
                                : "Orange Money"
                            }`
                          : "RawbANK"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-slate-600">Montant</span>
                      <span className="text-slate-900 font-medium">
                        {(getTotalPrice() * 1.16).toFixed(2)}€
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600">Référence</span>
                      <span className="text-slate-900 font-medium">
                        PREMIUM-{period.substring(0, 3).toUpperCase()}-
                        {Math.floor(Math.random() * 10000)
                          .toString()
                          .padStart(4, "0")}
                      </span>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-8 max-w-md mx-auto">
                    <div className="flex items-start">
                      <div className="bg-blue-100 rounded-full p-1 mr-3 mt-0.5">
                        <Check className="h-4 w-4 text-blue-600" />
                      </div>
                      <div className="text-left">
                        <p className="text-blue-800 text-sm">
                          {paymentMethod === "mobile"
                            ? "Veuillez vérifier votre téléphone pour confirmer le paiement. Une fois confirmé, votre compte sera activé immédiatement."
                            : "Veuillez effectuer le virement bancaire avec les informations fournies. Votre compte sera activé dès réception du paiement."}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                      href="/"
                      className="px-6 py-3 rounded-xl bg-white border border-slate-300 text-slate-700 font-medium hover:bg-slate-50 transition-colors"
                    >
                      Retour à l`accueil
                    </Link>
                    <Link
                      href="/dashboard"
                      className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-[#f39200] text-white font-medium hover:shadow-lg hover:shadow-[#f39200]/20 transition-all flex items-center justify-center"
                    >
                      Accéder à mon espace
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
