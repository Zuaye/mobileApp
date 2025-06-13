"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Eye, EyeOff, ArrowRight, Home, ArrowLeft } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Checkbox } from "@/src/components/ui/checkbox";
import { AvatarHero } from "@/src/components/hero/avatarHero";
import { avatarImages } from "@/src/lib/data/avatarImage";

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
          className="absolute inset-0 bg-[url('/images/hero/hero.jpg')] bg-cover bg-center brightness-70"
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
            <span className="bg-gradient-to-r from-[#f39210] to-[#f39200] bg-clip-text text-transparent">
              Domicon
            </span>
          </h1>
          <p className="hidden text-base md:block sm:text-lg lg:text-xl text-slate-200 mb-5 sm:mb-6 lg:mb-8">
            Votre portail immobilier de confiance. Connectez-vous pour accéder à
            votre espace personnel.
          </p>
          <div className="flex lg:hidden items-center justify-center gap-3 sm:gap-4 sm:mb-8">
            <AvatarHero />
            <p className="text-slate-200 text-sm sm:text-base">
              Rejoignez plus de{" "}
              <span className="font-bold text-[#f39200]">2000+</span>{" "}
              utilisateurs
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
              <span className="font-bold text-[#f39200]">2000+</span>{" "}
              utilisateurs
            </p>
          </div>
        </motion.div>

        {/* Right Side - Login Form */}
        <motion.div
          className="lg:w-[450px] w-full max-w-xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="backdrop-blur-xl bg-white/10 p-5 sm:p-6 lg:p-8 rounded-2xl border border-white/20 shadow-xl">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1.5">
                <Label className="text-white font-medium text-sm">
                  Adresse email
                </Label>
                <div className="relative h-11">
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="h-full bg-white/5 border-white/10 text-white placeholder-slate-400 focus:ring-2 focus:ring-[#f39200]/20"
                    placeholder="exemple@domicon.com"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label className="text-white font-medium text-sm">
                  Mot de passe
                </Label>
                <div className="relative h-11">
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    className="h-full bg-white/5 border-white/10 text-white placeholder-slate-400 focus:ring-2 focus:ring-[#f39200]/20 pr-10"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2">
                  <Checkbox className="border-white/20 bg-white/5 data-[state=checked]:bg-[#f39200] data-[state=checked]:border-[#f39200]" />
                  <span className="text-sm text-slate-200">
                    Se souvenir de moi
                  </span>
                </label>
                <Link
                  href="/forgot-password"
                  className="text-sm text-[#f39200] hover:text-[#f39200]/80 transition-colors"
                >
                  Mot de passe oublié ?
                </Link>
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-[#f39200] hover:bg-[#f39200]/90 text-white shadow-lg shadow-[#f39200]/20"
              >
                <span className="flex items-center justify-center gap-2">
                  Se connecter
                  <ArrowRight className="w-5 h-5" />
                </span>
              </Button>
            </form>

            <div className="mt-5 text-center">
              <p className="text-slate-300">
                Pas encore de compte ?{" "}
                <Link
                  href="/auth/register/client"
                  className="text-[#f39200] hover:text-[#f39200]/80 transition-colors font-medium"
                >
                  Créer un compte
                </Link>
              </p>
            </div>
          </div>

          {/* Property Card - Mobile Version */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-5 sm:mt-6 lg:mt-8 p-4 sm:p-5 backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl shadow-lg"
          >
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-14 h-14 sm:w-16 sm:h-16 relative rounded-lg overflow-hidden flex-shrink-0">
                <Image
                  src="/images/hero/hero4.jpg"
                  alt="Featured Property"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="text-white font-medium text-sm sm:text-base">
                  Accédez à des propriétés exclusives
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Plus de 1000 biens disponibles
                </p>
              </div>
              <Home className="w-5 h-5 sm:w-6 sm:h-6 text-[#f39200] ml-auto flex-shrink-0" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
