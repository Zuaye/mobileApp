"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import { Label } from "@/src/components/ui/label";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/src/components/ui/avatar";
import { motion } from "framer-motion";
import Link from "next/link";
import { ClientRegistrationData } from "@/src/types/client";

export default function ClientRegistration() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<ClientRegistrationData>({
    fullName: "",
    email: "",
    phoneNumber: "",
  });
  const [profilePreview, setProfilePreview] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, profilePicture: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // TODO: Implement API call to register client
      console.log("Form data:", formData);
      router.push("/auth/login");
    } catch (error) {
      console.error("Registration error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative w-full bg-[#fafafa] flex items-center justify-center">
      <div className="w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-8"
        >
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full rounded-bl-2xl rounded-br-2xl h-15 bg-gradient-to-r from-orange-500 to-yellow-500" />

          {/* Back button */}
          <div className="absolute top-2 left-4">
            <Link href="/">
              <Button className="p-2 border border-gray-200/30 rounded-full">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </Button>
            </Link>
          </div>

          {/* Header */}

          <div className="flex items-center justify-center">
            <div className="mb-8 mt-16">
              <h1 className="text-2xl font-bold text-gray-900">
                Créer votre compte
              </h1>
              <p className="text-gray-500 mt-2">
                Rejoignez-nous pour une expérience personnalisée
              </p>
            </div>

            {/* Profile Picture Upload */}
            <div className="flex flex-col items-center">
              <div className="group relative">
                <Avatar className="w-24 h-24 ring-4 ring-gray-50 group-hover:ring-gray-100 transition-all duration-300">
                  <AvatarImage
                    src={profilePreview || "/default-avatar.png"}
                    alt="Photo de profil"
                    className="object-cover"
                  />
                  <AvatarFallback className="bg-gray-100 text-gray-400">
                    CN
                  </AvatarFallback>
                </Avatar>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Label
                    htmlFor="profilePicture"
                    className="cursor-pointer text-sm text-white bg-black/50 px-3 py-1 rounded-full backdrop-blur-sm"
                  >
                    Modifier
                  </Label>
                </div>
              </div>
              <Input
                id="profilePicture"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>
          </div>
          {/* <div className="text-center mb-8 mt-4">
            <h1 className="text-2xl font-bold text-gray-900">
              Créer votre compte
            </h1>
            <p className="text-gray-500 mt-2">
              Rejoignez-nous pour une expérience personnalisée
            </p>
          </div> */}

          {/* Profile Picture Upload */}
          {/* <div className="flex flex-col items-center mb-8">
            <div className="group relative">
              <Avatar className="w-24 h-24 ring-4 ring-gray-50 group-hover:ring-gray-100 transition-all duration-300">
                <AvatarImage
                  src={profilePreview || "/default-avatar.png"}
                  alt="Photo de profil"
                  className="object-cover"
                />
                <AvatarFallback className="bg-gray-100 text-gray-400">
                  CN
                </AvatarFallback>
              </Avatar>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Label
                  htmlFor="profilePicture"
                  className="cursor-pointer text-sm text-white bg-black/50 px-3 py-1 rounded-full backdrop-blur-sm"
                >
                  Modifier
                </Label>
              </div>
            </div>
            <Input
              id="profilePicture"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </div> */}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-gray-700">
                Nom complet
              </Label>
              <Input
                id="fullName"
                name="fullName"
                type="text"
                required
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="Entrez votre nom complet"
                className="h-12 bg-gray-50 border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                placeholder="vous@exemple.com"
                className="h-12 bg-gray-50 border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phoneNumber" className="text-gray-700">
                Numéro de téléphone
              </Label>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                required
                value={formData.phoneNumber}
                onChange={handleInputChange}
                placeholder="+243 85 13 165"
                className="h-12 bg-gray-50 border-gray-200 focus:border-orange-500 focus:ring-yellow-500 rounded-xl"
              />
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-gradient-to-r  from-orange-500 to-yellow-500 hover:from-orange-700 hover:to-yellow-600 text-white rounded-xl font-medium text-lg transition-all duration-300 transform hover:scale-[1.02]"
              disabled={isLoading}
            >
              {isLoading ? "Inscription en cours..." : "S'inscrire"}
            </Button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Déjà un compte ?{" "}
              <Link
                href="/auth/login"
                className="text-blue-500 hover:text-blue-600 font-medium"
              >
                Se connecter
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
