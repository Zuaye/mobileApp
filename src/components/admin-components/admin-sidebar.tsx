"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Building2,
  Users,
  CreditCard,
  Settings,
  UserCircle,
  MessageSquare,
  Home,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const navigationItems = [
  { name: "Dashboard", href: "/admin", icon: Home },
  { name: "Hôtels", href: "/admin/hotels", icon: Building2 },
  { name: "Femmes", href: "/admin/women", icon: UserCircle },
  { name: "Utilisateurs", href: "/admin/users", icon: Users },
  { name: "Paiements", href: "/admin/payments", icon: CreditCard },
  { name: "Messages", href: "/admin/messages", icon: MessageSquare },
  { name: "Paramètres", href: "/admin/settings", icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Restore sidebar state from localStorage
  useEffect(() => {
    const savedCollapsed = localStorage.getItem("sidebarCollapsed");
    if (savedCollapsed) {
      setIsCollapsed(JSON.parse(savedCollapsed));
    }
  }, []);

  // Save sidebar state to localStorage
  const toggleSidebar = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    localStorage.setItem("sidebarCollapsed", JSON.stringify(newState));
  };

  return (
    <aside
      className={`
        fixed top-0 left-0 z-40
        ${isCollapsed ? "w-20" : "w-64"}
        h-screen
        bg-white/80 dark:bg-gray-800/80
        backdrop-blur-xl
        p-4
        border-r border-gray-200 dark:border-gray-700
        transition-all duration-300 ease-in-out
        shadow-lg
        group
        flex flex-col
        overflow-hidden
      `}
    >
      <div className="flex items-center justify-between mb-8 flex-shrink-0">
        <div className="flex items-center gap-2">
          <div className="relative w-10 h-10 flex-shrink-0">
            <Image
              src="/images/logo/zuaye.png"
              alt="Zuaye Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          {!isCollapsed && (
            <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-orange-700 bg-clip-text text-transparent truncate">
              Zuaye
            </h1>
          )}
        </div>
        <button
          onClick={toggleSidebar}
          className="p-1.5 rounded-full hover:bg-orange-100 dark:hover:bg-gray-700 transition-colors"
          aria-label={isCollapsed ? "Étendre le menu" : "Réduire le menu"}
        >
          {isCollapsed ? (
            <ChevronRight className="w-5 h-5 text-orange-600" />
          ) : (
            <ChevronLeft className="w-5 h-5 text-orange-600" />
          )}
        </button>
      </div>

      <nav className="flex-1 space-y-2 overflow-hidden hover:overflow-y-auto">
        {navigationItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`
                flex items-center gap-3 
                px-3 py-2.5 
                rounded-lg 
                transition-all 
                group
                relative
                ${
                  isActive
                    ? "bg-orange-600/10 text-orange-600 dark:text-orange-400"
                    : "text-gray-700 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-gray-700/50 hover:text-orange-600 dark:hover:text-orange-400"
                }
              `}
              title={isCollapsed ? item.name : ""}
            >
              <Icon className={`w-5 h-5 ${isCollapsed ? "mx-auto" : ""}`} />
              {!isCollapsed && <span className="truncate">{item.name}</span>}

              {/* Tooltip for collapsed state */}
              {isCollapsed && (
                <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 bg-white dark:bg-gray-800 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <p className="text-sm whitespace-nowrap text-gray-700 dark:text-gray-300">
                    {item.name}
                  </p>
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      <div
        className={`
        flex-shrink-0
        px-4 
        py-4
        text-xs 
        text-gray-500 dark:text-gray-400
        ${isCollapsed ? "text-center" : ""}
        border-t border-gray-200 dark:border-gray-700
      `}
      >
        {!isCollapsed && "Version"} v1.0
      </div>
    </aside>
  );
}
