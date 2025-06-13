"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  MessageSquare,
  Heart,
  Search,
  TrendingUp,
  Bell,
} from "lucide-react";
import { Button } from "@/src/components/ui/button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";

const navigation = [
  {
    name: "Accueil",
    href: "/client",
    icon: Home,
  },
  {
    name: "Rechercher",
    href: "/client/search",
    icon: Search,
  },
  {
    name: "Messages",
    href: "/client/messages",
    icon: MessageSquare,
  },
  {
    name: "Favoris",
    href: "/client/favorites",
    icon: Heart,
  },
  {
    name: "Tendances",
    href: "/client/trending",
    icon: TrendingUp,
  },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="hidden md:block bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 fixed w-full top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/client" className="flex items-center space-x-2">
              <span className="text-xl font-bold text-[#f39200]">DomiCon</span>
            </Link>

            {/* Navigation desktop */}
            <div className="flex items-center space-x-4">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? "text-[#f39200] bg-[#f39200]/10"
                        : "text-slate-600 dark:text-slate-400 hover:text-[#f39200]"
                    }`}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full" />
              </Button>

              <Link href="/client/profile">
                <Avatar className="h-8 w-8 cursor-pointer">
                  <AvatarImage src="/avatars/default.jpg" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 z-50">
        <div className="flex justify-around items-center h-16">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex flex-col items-center justify-center w-full h-full transition-colors ${
                  isActive
                    ? "text-[#f39200]"
                    : "text-slate-600 dark:text-slate-400"
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span className="text-xs mt-1">{item.name}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 z-40">
        <div className="flex items-center justify-between h-16 px-4">
          <Link href="/client" className="flex items-center space-x-2">
            <span className="text-xl font-bold text-[#f39200]">DomiCon</span>
          </Link>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full" />
            </Button>
            <Link href="/client/profile">
              <Avatar className="h-8 w-8 cursor-pointer">
                <AvatarImage src="/avatars/default.jpg" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
