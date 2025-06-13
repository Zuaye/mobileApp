import {
  DollarSign,
  HelpCircle,
  Home,
  Layers2,
  SearchIcon,
} from "lucide-react";

export const NavbarItem = [
  {
    href: "/",
    title: "Accueil",
    icon: (
      <Home className="h-full w-full text-neutral-500 dark:text-neutral-300" />
    ),
  },
  {
    href: "/#search",
    title: "Chercher",
    icon: (
      <SearchIcon className="h-full w-full text-neutral-500 dark:text-neutral-300" />
    ),
  },
  {
    href: "/#pricing",
    title: "Tarifs",
    icon: (
      <DollarSign className="h-full w-full text-neutral-500 dark:text-neutral-300" />
    ),
  },
  {
    href: "/demo",
    title: "Fonctionnalités",
    icon: (
      <Layers2 className="h-full w-full text-neutral-500 dark:text-neutral-300" />
    ),
  },
  {
    href: "/#faq",
    title: "Faq",
    icon: (
      <HelpCircle className="h-full w-full text-neutral-500 dark:text-neutral-300" />
    ),
  },
];
