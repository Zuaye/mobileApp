"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/client");
  };

  return (
    <div className="min-h-screen w-full bg-white flex items-stretch md:items-center md:justify-center">
      <div className="w-full md:max-w-md relative bg-white md:rounded-[40px] md:m-4 md:shadow-xl">
        {/* Image de fond avec les feuilles */}
        <div className="absolute top-0 left-0 right-0 h-[35%] bg-[#f39200]/10 overflow-hidden">
          <div
            className="absolute inset-0 bg-[url('/images/hero/hero.jpg')] bg-cover bg-center opacity-80"
            style={{
              filter: "hue-rotate(40deg) saturate(150%)",
            }}
          />
          {/* Bouton retour */}
          <div className="absolute top-6 left-6 z-10">
            <Link href="/">
              <div className="w-10 h-10 bg-white/20 backdrop-blur-lg rounded-full flex items-center justify-center">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </div>
            </Link>
          </div>
        </div>

        {/* Courbe blanche */}
        <div className="absolute top-[42%] left-0 right-0">
          <svg
            viewBox="0 0 100 10"
            preserveAspectRatio="none"
            className="w-full h-16"
          >
            <path d="M0,10 Q50,0 100,10 L100,0 L0,0 Z" fill="white" />
          </svg>
        </div>

        {/* Contenu du formulaire */}
        <div className="relative pt-[45%]">
          <div className="px-8 pb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-10"
            >
              <h1 className="text-3xl font-semibold text-gray-800 mb-2">
                Bienvenue sur Domicon
              </h1>
              <p className="text-gray-500 text-base">
                Connectez-vous à votre compte
              </p>
            </motion.div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full h-14 bg-gray-50/50 border-gray-100 rounded-2xl px-5 text-gray-800 placeholder-gray-400 focus:ring-[#f39200]/20 focus:border-[#f39200] text-lg"
                  placeholder="Adresse email"
                  required
                />
              </div>

              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="w-full h-14 bg-gray-50/50 border-gray-100 rounded-2xl px-5 text-gray-800 placeholder-gray-400 focus:ring-[#f39200]/20 focus:border-[#f39200] pr-12 text-lg"
                  placeholder="Mot de passe"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? (
                    <EyeOff className="w-6 h-6" />
                  ) : (
                    <Eye className="w-6 h-6" />
                  )}
                </button>
              </div>

              <div className="flex items-center justify-between text-base">
                <Link
                  href="/forgot-password"
                  className="text-[#f39200] hover:text-[#f39200]/80"
                >
                  Mot de passe oublié ?
                </Link>
              </div>

              <Button
                type="submit"
                className="w-full h-14 bg-[#f39200] hover:bg-[#f39200]/90 text-white rounded-2xl font-medium transition-colors text-lg mt-2"
              >
                Se connecter
              </Button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-gray-600 text-base">
                Pas encore de compte ?{" "}
                <Link
                  href="/auth/register/client"
                  className="text-[#f39200] hover:text-[#f39200]/80 font-medium"
                >
                  S&apos;inscrire
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
