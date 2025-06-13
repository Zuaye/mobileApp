"use client";

import Link from "next/link";
import {
  Facebook,
  Twitter,
  Instagram,
  Mail,
  Phone,
  MapPin,
  ArrowUp,
} from "lucide-react";
import { Button } from "@/src/components/ui/button";

const footerLinks = {
  company: [
    { name: "À propos", href: "/about" },
    { name: "Carrières", href: "/careers" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ],
  legal: [
    { name: "Conditions d'utilisation", href: "/terms" },
    { name: "Politique de confidentialité", href: "/privacy" },
    { name: "Cookies", href: "/cookies" },
  ],
  support: [
    { name: "Centre d'aide", href: "/help" },
    { name: "FAQ", href: "/faq" },
    { name: "Support", href: "/support" },
  ],
};

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo et description */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
                DomiCon
              </span>
            </Link>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Votre plateforme de confiance pour trouver la propriété de vos
              rêves au Cameroun.
            </p>
            <div className="flex space-x-4">
              <Link
                href="#"
                className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400"
              >
                <Facebook className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400"
              >
                <Twitter className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400"
              >
                <Instagram className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Liens rapides */}
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">
              Entreprise
            </h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Légal */}
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">
              Légal
            </h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">
              Contact
            </h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2 text-sm text-slate-600 dark:text-slate-400">
                <Mail className="h-4 w-4" />
                <span>contact@domicon.cm</span>
              </li>
              <li className="flex items-center space-x-2 text-sm text-slate-600 dark:text-slate-400">
                <Phone className="h-4 w-4" />
                <span>+237 6XX XXX XXX</span>
              </li>
              <li className="flex items-center space-x-2 text-sm text-slate-600 dark:text-slate-400">
                <MapPin className="h-4 w-4" />
                <span>Douala, Cameroun</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright et retour en haut */}
        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            © {new Date().getFullYear()} DomiCon. Tous droits réservés.
          </p>
          <Button
            variant="ghost"
            size="icon"
            className="mt-4 md:mt-0"
            onClick={scrollToTop}
          >
            <ArrowUp className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </footer>
  );
}
