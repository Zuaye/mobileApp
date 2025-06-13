"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  User,
  Mail,
  Lock,
  Phone,
  MapPin,
  Upload,
  Loader2,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { AvatarHero } from "@/src/components/hero/avatarHero";
import { avatarImages } from "@/src/lib/data/avatarImage";

interface ClientRegistrationData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  city: string;
  profileImage: File | null;
  profileImagePreview: string | null;
}

export default function ClientRegister() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<ClientRegistrationData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    city: "",
    profileImage: null,
    profileImagePreview: null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfileImageChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("L    `image de profil ne doit pas dépasser 5MB");
      return;
    }

    if (!file.type.startsWith("image/")) {
      toast.error("Veuillez sélectionner une image valide");
      return;
    }

    const preview = URL.createObjectURL(file);
    setFormData((prev) => ({
      ...prev,
      profileImage: file,
      profileImagePreview: preview,
    }));
  };

  const nextStep = () => {
    if (step === 1) {
      // Vérifier les champs du premier formulaire
      if (
        !formData.firstName ||
        !formData.lastName ||
        !formData.email ||
        !formData.phone ||
        !formData.city
      ) {
        toast.error("Veuillez remplir tous les champs obligatoires");
        return;
      }

      // Validation simple de l    `email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        toast.error("Veuillez entrer une adresse email valide");
        return;
      }

      // Validation simple du numéro de téléphone
      if (formData.phone.length < 8) {
        toast.error("Veuillez entrer un numéro de téléphone valide");
        return;
      }
    }

    if (step === 2) {
      // Vérifier les mots de passe
      if (!formData.password || !formData.confirmPassword) {
        toast.error("Veuillez remplir tous les champs de mot de passe");
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        toast.error("Les mots de passe ne correspondent pas");
        return;
      }

      // Vérifier la force du mot de passe
      if (formData.password.length < 8) {
        toast.error("Le mot de passe doit contenir au moins 8 caractères");
        return;
      }
    }

    setStep((prev) => prev + 1);
    window.scrollTo(0, 0);
  };

  const prevStep = () => {
    setStep((prev) => prev - 1);
    window.scrollTo(0, 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Vérifier les champs obligatoires
      if (
        !formData.firstName ||
        !formData.lastName ||
        !formData.email ||
        !formData.password ||
        !formData.confirmPassword ||
        !formData.phone ||
        !formData.city
      ) {
        toast.error("Veuillez remplir tous les champs obligatoires");
        setIsLoading(false);
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        toast.error("Les mots de passe ne correspondent pas");
        setIsLoading(false);
        return;
      }

      // Simuler l    `envoi des données
      await new Promise((resolve) => setTimeout(resolve, 2000));

      toast.success("Votre compte a été créé avec succès !");
      router.push("/client/dashboard");
    } catch {
      toast.error("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden">
      {/* Background with soft light and gradient effects */}
      <div className="absolute inset-0 z-0">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-yellow-900 to-yellow-800 opacity-80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ duration: 1 }}
        />
        <motion.div
          className="absolute inset-0 bg-[url(    `/images/hero/hero.jpg    `)] bg-cover bg-center brightness-70"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/50 to-transparent" />
      </div>

      {/* Content Container */}
      <div className="container mx-auto px-4 sm:px-6 relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 sm:gap-10 lg:gap-12 py-6 sm:py-8 lg:py-10">
        {/* Left Side - Welcome Text */}
        <motion.div
          className="lg:w-1/2 text-white text-center lg:text-left"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Link
            href="/"
            className="inline-flex items-center text-white dark:text-slate-400 hover:text-yellow-600 dark:hover:text-white mb-4 sm:mb-6 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour à l&apos;accueil
          </Link>

          <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold mb-3 sm:mb-4 lg:mb-6">
            Créez votre compte{" "}
            <span className="bg-gradient-to-r from-[#f39210] to-[#f39200] bg-clip-text text-transparent">
              Domicon
            </span>
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-slate-200 mb-5 sm:mb-6 lg:mb-8">
            Rejoignez notre communauté pour trouver votre bien immobilier idéal.
          </p>
          <div className="flex lg:hidden items-center justify-center gap-3 sm:gap-4 mb-6 sm:mb-8">
            <AvatarHero />
            <p className="text-slate-200 text-sm sm:text-base">
              Rejoignez plus de{" "}
              <span className="font-bold text-[#f39200]">2000+</span> clients
            </p>
          </div>
          <div className="hidden lg:flex items-center gap-6 sm:gap-8 mt-8 sm:mt-10 lg:mt-12">
            <div className="flex -space-x-4">
              {avatarImages.map((avatar, key) => (
                <div
                  key={key}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-white overflow-hidden"
                >
                  <Image
                    src={avatar.images[0]}
                    alt={avatar.nom}
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
            <p className="text-slate-200 text-sm sm:text-base">
              Rejoignez plus de{" "}
              <span className="font-bold text-[#f39200]">2000+</span> clients
              satisfaits
            </p>
          </div>
        </motion.div>

        {/* Right Side - Registration Form */}
        <motion.div
          className="lg:w-[550px] w-full max-w-xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="backdrop-blur-xl bg-white/10 p-5 sm:p-6 lg:p-8 rounded-2xl border border-white/20 shadow-xl">
            {/* Progress Steps */}
            <div className="mb-6">
              <div className="relative">
                <div className="h-1 bg-white/10 w-full absolute top-1/2 transform -translate-y-1/2 rounded-full"></div>
                <div
                  className="h-1 bg-[#f39200] absolute top-1/2 transform -translate-y-1/2 transition-all duration-300 rounded-full"
                  style={{ width: `${((step - 1) / 2) * 100}%` }}
                ></div>
                <div className="flex justify-between relative">
                  {[1, 2, 3].map((stepNumber) => (
                    <div
                      key={stepNumber}
                      className={`w-8 h-8 rounded-full flex items-center justify-center relative z-10 transition-all duration-300 ${
                        step >= stepNumber
                          ? "bg-[#f39200] text-white"
                          : "bg-white/10 text-white/60"
                      }`}
                    >
                      {stepNumber}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-xs text-white/70">Informations</span>
                <span className="text-xs text-white/70">Sécurité</span>
                <span className="text-xs text-white/70">Finalisation</span>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-5"
              >
                {step === 1 && (
                  <>
                    <h2 className="text-xl font-semibold text-white mb-5">
                      Informations personnelles
                    </h2>

                    {/* Name Fields */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                      <div className="space-y-1.5">
                        <Label className="text-white font-medium text-sm">
                          Prénom
                        </Label>
                        <div className="relative h-11">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                          <Input
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            className="h-full bg-white/5 border-white/10 text-white placeholder-slate-400 focus:ring-2 focus:ring-[#f39200]/20 pl-10"
                            placeholder="Votre prénom"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <Label className="text-white font-medium text-sm">
                          Nom
                        </Label>
                        <div className="relative h-11">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                          <Input
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            className="h-full bg-white/5 border-white/10 text-white placeholder-slate-400 focus:ring-2 focus:ring-[#f39200]/20 pl-10"
                            placeholder="Votre nom"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    {/* Email Field */}
                    <div className="space-y-1.5">
                      <Label className="text-white font-medium text-sm">
                        Email
                      </Label>
                      <div className="relative h-11">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="h-full bg-white/5 border-white/10 text-white placeholder-slate-400 focus:ring-2 focus:ring-[#f39200]/20 pl-10"
                          placeholder="votre.email@exemple.com"
                          required
                        />
                      </div>
                    </div>

                    {/* Phone and City Fields */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                      <div className="space-y-1.5">
                        <Label className="text-white font-medium text-sm">
                          Téléphone
                        </Label>
                        <div className="relative h-11">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                          <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleChange}
                            className="h-full bg-white/5 border-white/10 text-white placeholder-slate-400 focus:ring-2 focus:ring-[#f39200]/20 pl-10"
                            placeholder="+243 123 456 789"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <Label className="text-white font-medium text-sm">
                          Ville
                        </Label>
                        <div className="relative h-11">
                          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                          <Input
                            id="city"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            className="h-full bg-white/5 border-white/10 text-white placeholder-slate-400 focus:ring-2 focus:ring-[#f39200]/20 pl-10"
                            placeholder="Votre ville"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {step === 2 && (
                  <>
                    <h2 className="text-xl font-semibold text-white mb-5">
                      Sécurité de votre compte
                    </h2>

                    {/* Password Fields */}
                    <div className="space-y-1.5">
                      <Label className="text-white font-medium text-sm">
                        Mot de passe
                      </Label>
                      <div className="relative h-11">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <Input
                          id="password"
                          name="password"
                          type="password"
                          value={formData.password}
                          onChange={handleChange}
                          className="h-full bg-white/5 border-white/10 text-white placeholder-slate-400 focus:ring-2 focus:ring-[#f39200]/20 pl-10"
                          placeholder="••••••••"
                          required
                        />
                      </div>
                      <p className="text-xs text-white/70 mt-1">
                        Le mot de passe doit contenir au moins 8 caractères
                      </p>
                    </div>

                    <div className="space-y-1.5">
                      <Label className="text-white font-medium text-sm">
                        Confirmer le mot de passe
                      </Label>
                      <div className="relative h-11">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <Input
                          id="confirmPassword"
                          name="confirmPassword"
                          type="password"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          className="h-full bg-white/5 border-white/10 text-white placeholder-slate-400 focus:ring-2 focus:ring-[#f39200]/20 pl-10"
                          placeholder="••••••••"
                          required
                        />
                      </div>
                    </div>

                    <div className="bg-white/5 rounded-lg p-4 mt-4">
                      <h3 className="text-white font-medium mb-2">
                        Conseils de sécurité
                      </h3>
                      <ul className="text-sm text-white/70 space-y-1 list-disc pl-5">
                        <li>
                          Utilisez un mot de passe unique pour chaque site
                        </li>
                        <li>
                          Combinez lettres, chiffres et caractères spéciaux
                        </li>
                        <li>
                          Évitez d `utiliser des informations personnelles
                        </li>
                        <li>Changez régulièrement votre mot de passe</li>
                      </ul>
                    </div>
                  </>
                )}

                {step === 3 && (
                  <>
                    <h2 className="text-xl font-semibold text-white mb-5">
                      Finalisation de votre profil
                    </h2>

                    {/* Profile Image Upload */}
                    <div className="space-y-1.5">
                      <Label className="text-white font-medium text-sm">
                        Photo de profil (optionnel)
                      </Label>
                      <div className="border border-dashed border-white/20 rounded-xl p-4 sm:p-5 text-center bg-white/5">
                        {formData.profileImagePreview ? (
                          <div className="relative">
                            <div className="relative mx-auto w-20 h-20 sm:w-24 sm:h-24">
                              <Image
                                src={formData.profileImagePreview}
                                alt="Profile preview"
                                fill
                                className="rounded-full object-cover"
                              />
                            </div>
                            <button
                              type="button"
                              onClick={() => {
                                setFormData((prev) => ({
                                  ...prev,
                                  profileImage: null,
                                  profileImagePreview: null,
                                }));
                              }}
                              className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
                            >
                              ×
                            </button>
                          </div>
                        ) : (
                          <>
                            <div className="mx-auto w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/10 flex items-center justify-center mb-3">
                              <Upload className="h-7 w-7 text-slate-300" />
                            </div>
                            <p className="text-slate-300 mb-3 text-sm">
                              Téléchargez une photo pour votre profil
                            </p>
                            <Input
                              type="file"
                              accept="image/*"
                              onChange={handleProfileImageChange}
                              className="hidden"
                              id="profile-image"
                            />
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() =>
                                document
                                  .getElementById("profile-image")
                                  ?.click()
                              }
                              className="border-white/20 text-white hover:bg-white/10"
                            >
                              Choisir une image
                            </Button>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Terms and Conditions */}
                    <div className="border border-white/20 rounded-lg p-3 sm:p-4 bg-white/5">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="terms"
                          className="h-4 w-4 rounded border-white/20 bg-white/5 text-[#f39200]"
                          required
                        />
                        <label
                          htmlFor="terms"
                          className="ml-2 text-sm text-slate-300"
                        >
                          J&apos;accepte les{" "}
                          <Link
                            href="/terms"
                            className="text-[#f39200] hover:underline"
                          >
                            conditions d&apos;utilisation
                          </Link>{" "}
                          et la{" "}
                          <Link
                            href="/privacy"
                            className="text-[#f39200] hover:underline"
                          >
                            politique de confidentialité
                          </Link>
                        </label>
                      </div>
                    </div>
                  </>
                )}
              </motion.div>

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8">
                {step > 1 ? (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={prevStep}
                    className="border-white/20 text-white hover:bg-white/10"
                  >
                    Précédent
                  </Button>
                ) : (
                  <Link href="/">
                    <Button
                      type="button"
                      variant="outline"
                      className="border-white/20 text-white hover:bg-white/10"
                    >
                      Annuler
                    </Button>
                  </Link>
                )}

                {step < 3 ? (
                  <Button
                    type="button"
                    onClick={nextStep}
                    className="bg-[#f39200] hover:bg-[#f39200]/90 text-white"
                  >
                    Suivant
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className="bg-[#f39200] hover:bg-[#f39200]/90 text-white"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Création en cours...
                      </>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        Créer mon compte
                        <ArrowRight className="w-5 h-5" />
                      </span>
                    )}
                  </Button>
                )}
              </div>
            </form>

            {/* Login Link */}
            <div className="mt-5 text-center">
              <p className="text-slate-300">
                Vous avez déjà un compte ?{" "}
                <Link
                  href="/auth/login"
                  className="text-[#f39200] hover:text-[#f39200]/80 transition-colors font-medium"
                >
                  Connectez-vous
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
