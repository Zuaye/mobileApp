"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { cn } from "@/src/lib/utils";
import { Instagram, Phone, Upload, MessageCircle } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Textarea } from "@/src/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";

const LOCATIONS = [
  "Gombe",
  "Lingwala",
  "Bandal",
  "Limete",
  "Masina",
  "Ndjili",
  "Matete",
];

const LANGUAGES = ["Français", "Anglais", "Lingala", "Swahili"];

const SERVICES = [
  "Moment de plaisir",
  "Massage",
  "Accompagnement",
  "Week-end",
  "Événements",
  "Soirée",
  "Soirée privée",
];

export default function RegistrationPage() {
  const router = useRouter();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [formData, setFormData] = useState({
    name: "",
    age: "18",
    description: "",
    localisation: "",
    price: "5000",
    languages: [] as string[],
    services: [] as string[],
    instagram: "",
    whatsapp: "",
    phone: "",
    images: [] as string[],
    videos: [] as string[],
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleArrayItem = (name: string, item: string) => {
    setFormData((prev) => {
      const array = prev[name as keyof typeof prev] as string[];
      return {
        ...prev,
        [name]: array.includes(item)
          ? array.filter((i) => i !== item)
          : [...array, item],
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // TODO: Implémenter la logique d'envoi des données
      console.log("Données du formulaire:", formData);
      router.push("/women/registration/success");
    } catch (error) {
      console.error("Erreur lors de l'inscription:", error);
    }
  };

  return (
    <div
      className={cn(
        "min-h-screen w-full transition-colors duration-300 py-16",
        isDark
          ? "bg-gradient-to-b from-slate-900 to-slate-800"
          : "bg-gradient-to-b from-slate-50 to-white"
      )}
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-4">
              Inscription Profil
            </h1>
            <p className="text-slate-600 dark:text-slate-300">
              Créez votre profil pour rejoindre notre communauté
            </p>
          </div>

          <div className="bg-white/10 dark:bg-black/20 backdrop-blur-lg rounded-xl p-6 shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Informations de base */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Nom complet
                  </label>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Votre nom"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Âge</label>
                  <Input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    min="18"
                    max="60"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Description
                  </label>
                  <Textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Décrivez-vous en quelques phrases..."
                    className="min-h-[100px]"
                  />
                </div>
              </div>

              {/* Localisation et Prix */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Localisation
                  </label>
                  <Select
                    value={formData.localisation}
                    onValueChange={(value) =>
                      handleSelectChange("localisation", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez votre zone" />
                    </SelectTrigger>
                    <SelectContent>
                      {LOCATIONS.map((location) => (
                        <SelectItem key={location} value={location}>
                          {location}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Prix (FC/2h)
                  </label>
                  <Input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    min="5000"
                    step="1000"
                  />
                </div>
              </div>

              {/* Langues et Services */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Langues parlées
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {LANGUAGES.map((lang) => (
                      <Button
                        key={lang}
                        type="button"
                        variant={
                          formData.languages.includes(lang)
                            ? "default"
                            : "outline"
                        }
                        size="sm"
                        onClick={() => toggleArrayItem("languages", lang)}
                      >
                        {lang}
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Services proposés
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {SERVICES.map((service) => (
                      <Button
                        key={service}
                        type="button"
                        variant={
                          formData.services.includes(service)
                            ? "default"
                            : "outline"
                        }
                        size="sm"
                        onClick={() => toggleArrayItem("services", service)}
                      >
                        {service}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Contacts */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Instagram (optionnel)
                  </label>
                  <div className="relative">
                    <Instagram className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                      name="instagram"
                      value={formData.instagram}
                      onChange={handleInputChange}
                      className="pl-10"
                      placeholder="URL Instagram"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    WhatsApp (optionnel)
                  </label>
                  <div className="relative">
                    <MessageCircle className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                      name="whatsapp"
                      value={formData.whatsapp}
                      onChange={handleInputChange}
                      className="pl-10"
                      placeholder="+243xxxxxxxxx"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Téléphone (optionnel)
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="pl-10"
                      placeholder="+243xxxxxxxxx"
                    />
                  </div>
                </div>
              </div>

              {/* Images et Vidéos */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Photos
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      className="h-32 flex flex-col items-center justify-center gap-2"
                    >
                      <Upload className="h-6 w-6" />
                      <span className="text-sm">Ajouter une photo</span>
                    </Button>
                  </div>
                  <p className="text-sm text-slate-500 mt-2">
                    Ajoutez au moins une photo de profil
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Vidéos (optionnel)
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      className="h-32 flex flex-col items-center justify-center gap-2"
                    >
                      <Upload className="h-6 w-6" />
                      <span className="text-sm">Ajouter une vidéo</span>
                    </Button>
                  </div>
                  <p className="text-sm text-slate-500 mt-2">
                    Vous pouvez ajouter des vidéos de présentation
                  </p>
                </div>
              </div>

              {/* Bouton de soumission */}
              <Button type="submit" className="w-full">
                Créer mon profil
              </Button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
