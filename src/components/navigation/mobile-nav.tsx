"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Home, Search, MapPin, Heart, User } from "lucide-react";
import { cn } from "@/src/lib/utils";

const navItems = [
  {
    name: "Accueil",
    href: "/",
    icon: Home,
  },
  {
    name: "Recherche",
    href: "/search",
    icon: Search,
  },
  {
    name: "Favoris",
    href: "/favorites",
    icon: Heart,
  },
  {
    name: "Profil",
    href: "/profile",
    icon: User,
  },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 block md:hidden">
      {/* Effet de flou derrière la barre */}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-lg" />

      {/* Barre de navigation */}
      <div className="relative border-t border-border">
        <div className="flex items-center justify-around h-16 px-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex flex-col items-center justify-center flex-1 h-full gap-1 p-1 transition-colors",
                  isActive ? "text-primary" : "text-muted-foreground"
                )}
              >
                <div className="relative">
                  {isActive && (
                    <motion.div
                      layoutId="bubble"
                      className="absolute -inset-1 bg-primary/10 rounded-full"
                      transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 0.6,
                      }}
                    />
                  )}
                  <item.icon className="relative w-6 h-6" />
                </div>
                <span className="text-xs font-medium">{item.name}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Indicateur de sécurité pour iPhone */}
      <div className="absolute bottom-0 left-0 right-0 h-[env(safe-area-inset-bottom)] bg-background/80 backdrop-blur-lg" />
    </nav>
  );
}
