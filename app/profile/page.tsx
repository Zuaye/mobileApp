"use client";

import { motion } from "framer-motion";
import { Button } from "@/src/components/ui/button";
import {
  Clock,
  CreditCard,
  Heart,
  HelpCircle,
  LogOut,
  Settings,
  User,
} from "lucide-react";

const menuItems = [
  {
    icon: Clock,
    label: "Mes réservations",
    href: "/profile/bookings",
  },
  {
    icon: Heart,
    label: "Favoris",
    href: "/profile/favorites",
  },
  {
    icon: CreditCard,
    label: "Paiements",
    href: "/profile/payments",
  },
  {
    icon: Settings,
    label: "Paramètres",
    href: "/profile/settings",
  },
  {
    icon: HelpCircle,
    label: "Aide",
    href: "/help",
  },
];

export default function ProfilePage() {
  return (
    <div className="min-h-screen p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        {/* En-tête du profil */}
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
            <User className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Mon Profil</h1>
            <p className="text-muted-foreground">
              Connectez-vous pour continuer
            </p>
          </div>
        </div>

        {/* Menu du profil */}
        <div className="space-y-2">
          {menuItems.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Button
                variant="ghost"
                className="w-full justify-start text-base font-normal h-12"
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.label}
              </Button>
            </motion.div>
          ))}
        </div>

        {/* Bouton de déconnexion */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Button
            variant="destructive"
            className="w-full justify-start text-base font-normal h-12 mt-4"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Déconnexion
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
