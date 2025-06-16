"use client";

import { useState, useEffect } from "react";
import AdminSidebar from "@/src/components/admin-components/admin-sidebar";
import AdminHeader from "@/src/components/admin-components/admin-header";
import { ThemeProvider } from "next-themes";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    // Sync with localStorage
    const savedCollapsed = localStorage.getItem("sidebarCollapsed");
    if (savedCollapsed) {
      setSidebarCollapsed(JSON.parse(savedCollapsed));
    }

    // Listen for storage events
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "sidebarCollapsed") {
        setSidebarCollapsed(JSON.parse(e.newValue || "false"));
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <AdminSidebar />
        <div
          className={`
            min-h-screen
            transition-all duration-300 ease-in-out
            ${sidebarCollapsed ? "ml-20" : "ml-64"}
          `}
        >
          <AdminHeader />
          <main className="p-8">
            <div className="max-w-7xl mx-auto">{children}</div>
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
}
