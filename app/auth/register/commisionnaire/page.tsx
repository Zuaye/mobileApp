"use client";

import { useState } from "react";
import Link from "next/link";
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
  FileText,
} from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { toast } from "sonner";
import Image from "next/image";

interface IdentityDocument {
  type: "carte_electeur" | "passport" | "permis" | "carte_identite";
  file: File | null;
  preview: string | null;
}

interface AgentRegistrationData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  city: string;
  selectedDocumentType: IdentityDocument["type"] | null;
  identityDocument: IdentityDocument;
  profileImage: File | null;
  profileImagePreview: string | null;
}

export default function AgentRegister() {
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<AgentRegistrationData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    city: "",
    selectedDocumentType: null,
    identityDocument: {
      type: "carte_identite",
      file: null,
      preview: null,
    },
    profileImage: null,
    profileImagePreview: null,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDocumentTypeChange = (type: IdentityDocument["type"]) => {
    setFormData((prev) => ({
      ...prev,
      selectedDocumentType: type,
      identityDocument: {
        type,
        file: null,
        preview: null,
      },
    }));
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Vérifier la taille du fichier (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Le fichier ne doit pas dépasser 5MB");
      return;
    }

    // Vérifier le type de fichier
    if (!file.type.startsWith("image/")) {
      toast.error("Veuillez sélectionner une image valide");
      return;
    }

    const preview = URL.createObjectURL(file);
    setFormData((prev) => ({
      ...prev,
      identityDocument: {
        ...prev.identityDocument,
        file,
        preview,
      },
    }));
  };

  const handleProfileImageChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("L'image de profil ne doit pas dépasser 5MB");
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Vérifier que le document est présent
      if (!formData.identityDocument.file) {
        toast.error("Veuillez fournir un document d'identité valide");
        setIsLoading(false);
        return;
      }

      // Simuler l'envoi des données
      await new Promise((resolve) => setTimeout(resolve, 2000));

      toast.success(
        "Votre demande a été soumise avec succès. Vous recevrez un email une fois votre compte approuvé."
      );
      window.location.href = "/auth/pending-approval";
    } catch {
      toast.error("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  };

  const nextStep = () => {
    if (step === 1) {
      // Vérifier les champs du premier formulaire
      if (
        !formData.firstName ||
        !formData.lastName ||
        !formData.email ||
        !formData.password ||
        !formData.confirmPassword ||
        !formData.phone
      ) {
        toast.error("Veuillez remplir tous les champs obligatoires");
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        toast.error("Les mots de passe ne correspondent pas");
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 py-12 mt-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white mb-6 transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour à l&apos;accueil
            </Link>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
              Inscription Agent Immobilier
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              Créez votre compte agent pour commencer à publier vos annonces
              immobilières.
            </p>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center mb-8">
            <div className="flex-1">
              <div className="relative">
                <div className="h-1 bg-slate-200 dark:bg-slate-700 w-full absolute top-1/2 transform -translate-y-1/2"></div>
                <div
                  className="h-1 bg-[#f39200] absolute top-1/2 transform -translate-y-1/2 transition-all duration-300"
                  style={{ width: `${((step - 1) / 2) * 100}%` }}
                ></div>
                <div className="flex justify-between relative">
                  {[1, 2, 3].map((stepNumber) => (
                    <div
                      key={stepNumber}
                      className={`w-8 h-8 rounded-full flex items-center justify-center relative z-10 transition-all duration-300 ${
                        step >= stepNumber
                          ? "bg-[#f39200] text-white"
                          : "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400"
                      }`}
                    >
                      {stepNumber}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-xs text-slate-600 dark:text-slate-400">
                  Informations personnelles
                </span>
                <span className="text-xs text-slate-600 dark:text-slate-400">
                  Document d&apos;identité
                </span>
                <span className="text-xs text-slate-600 dark:text-slate-400">
                  Finalisation
                </span>
              </div>
            </div>
          </div>

          {/* Form */}
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-slate-800 rounded-xl p-6 md:p-8 shadow-xl backdrop-blur-sm"
          >
            <form onSubmit={handleSubmit}>
              {step === 1 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-6">
                    Informations personnelles
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Prénom</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                        <Input
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          className="pl-10 bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700"
                          placeholder="Votre prénom"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="lastName">Nom</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                        <Input
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          className="pl-10 bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700"
                          placeholder="Votre nom"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="pl-10 bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700"
                        placeholder="votre.email@exemple.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Téléphone</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        className="pl-10 bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700"
                        placeholder="+243 123 456 789"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="city">Ville</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                        <Input
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          className="pl-10 bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700"
                          placeholder="Votre ville"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="password">Mot de passe</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                        <Input
                          id="password"
                          name="password"
                          type="password"
                          value={formData.password}
                          onChange={handleChange}
                          className="pl-10 bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700"
                          placeholder="••••••••"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">
                        Confirmer le mot de passe
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                        <Input
                          id="confirmPassword"
                          name="confirmPassword"
                          type="password"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          className="pl-10 bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700"
                          placeholder="••••••••"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-6">
                    Document d&apos;identité
                  </h2>

                  <div className="space-y-4">
                    <Label>Type de document</Label>
                    <Select
                      value={formData.selectedDocumentType || ""}
                      onValueChange={handleDocumentTypeChange}
                    >
                      <SelectTrigger className="bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700">
                        <SelectValue placeholder="Sélectionnez un document" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="carte_electeur">
                          Carte d&apos;électeur
                        </SelectItem>
                        <SelectItem value="passport">Passport</SelectItem>
                        <SelectItem value="permis">
                          Permis de conduire
                        </SelectItem>
                        <SelectItem value="carte_identite">
                          Carte d&apos;identité
                        </SelectItem>
                      </SelectContent>
                    </Select>

                    {formData.selectedDocumentType && (
                      <div className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-lg p-4">
                        {formData.identityDocument.preview ? (
                          <div className="relative">
                            <Image
                              src={formData.identityDocument.preview}
                              alt="Document preview"
                              fill
                              className="h-32 object-cover rounded-lg"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                setFormData((prev) => ({
                                  ...prev,
                                  identityDocument: {
                                    ...prev.identityDocument,
                                    file: null,
                                    preview: null,
                                  },
                                }));
                              }}
                              className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                            >
                              ×
                            </button>
                          </div>
                        ) : (
                          <div className="text-center">
                            <FileText className="mx-auto h-8 w-8 text-slate-400 mb-2" />
                            <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                              Téléchargez votre document d&apos;identité
                            </p>
                            <Input
                              type="file"
                              accept="image/*"
                              onChange={handleFileChange}
                              className="hidden"
                              id="identity-document"
                            />
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() =>
                                document
                                  .getElementById("identity-document")
                                  ?.click()
                              }
                              className="border-slate-200 dark:border-slate-700"
                            >
                              Choisir un fichier
                            </Button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-6">
                    Finalisation de votre profil
                  </h2>

                  <div className="space-y-4">
                    <Label>Photo de profil</Label>
                    <div className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl p-8 text-center">
                      {formData.profileImagePreview ? (
                        <div className="relative">
                          <Image
                            src={formData.profileImagePreview}
                            alt="Profile preview"
                            className="mx-auto rounded-full object-cover"
                            width={24}
                            height={24}
                          />
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
                          <div className="mx-auto w-24 h-24 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center mb-4">
                            <Upload className="h-8 w-8 text-slate-400" />
                          </div>
                          <p className="text-slate-600 dark:text-slate-400 mb-4">
                            Téléchargez une photo professionnelle pour votre
                            profil
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
                              document.getElementById("profile-image")?.click()
                            }
                            className="border-slate-200 dark:border-slate-700"
                          >
                            Choisir une image
                          </Button>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="border border-slate-200 dark:border-slate-700 rounded-lg p-4 bg-slate-50 dark:bg-slate-900/50">
                    <h3 className="font-medium text-slate-900 dark:text-white mb-2">
                      Conditions d&apos;utilisation
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                      En créant un compte, vous acceptez nos conditions
                      d&apos;utilisation et notre politique de confidentialité.
                      Vous vous engagez également à respecter les règles de
                      publication d&apos;annonces sur notre plateforme.
                    </p>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="terms"
                        className="h-4 w-4 rounded border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-[#f39200]"
                        required
                      />
                      <label
                        htmlFor="terms"
                        className="ml-2 text-sm text-slate-600 dark:text-slate-400"
                      >
                        J&apos;accepte les conditions d&apos;utilisation et la
                        politique de confidentialité
                      </label>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-between mt-8">
                {step > 1 ? (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={prevStep}
                    className="border-slate-200 dark:border-slate-700"
                  >
                    Précédent
                  </Button>
                ) : (
                  <Link href="/">
                    <Button
                      type="button"
                      variant="outline"
                      className="border-slate-200 dark:border-slate-700"
                    >
                      Annuler
                    </Button>
                  </Link>
                )}

                {step < 3 ? (
                  <Button
                    type="button"
                    onClick={nextStep}
                    className="bg-[#f39200] hover:bg-[#d37e00] text-white"
                  >
                    Suivant
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className="bg-[#f39200] hover:bg-[#d37e00] text-white"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Soumission en cours...
                      </>
                    ) : (
                      "Soumettre ma demande"
                    )}
                  </Button>
                )}
              </div>
            </form>
          </motion.div>

          {/* Login Link */}
          <div className="text-center mt-8">
            <p className="text-slate-600 dark:text-slate-400">
              Vous avez déjà un compte ?{" "}
              <Link
                href="/auth/login"
                className="text-[#f39200] hover:underline"
              >
                Connectez-vous
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
