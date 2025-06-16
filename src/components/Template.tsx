"use client";

import { usePathname } from "next/navigation";
import { AppHeader } from "./navigation/app-header";
import { MobileNav } from "./navigation/mobile-nav";
import { DesktopBlocker } from "./DesktopBlocker";

interface TemplateProps {
  children: React.ReactNode;
}

export function Template({ children }: TemplateProps) {
  const pathname = usePathname();

  // Pages où on ne veut pas afficher la navbar et le footer
  const shouldHideNavAndFooter = [
    "/auth/login",
    "/auth/register/client",
    "/admin",
  ].includes(pathname);

  // Vérifie si on est sur une page d'administration
  const isAdminPage = pathname.startsWith("/admin");

  return (
    <>
      {!isAdminPage && <DesktopBlocker />}
      {!shouldHideNavAndFooter && <AppHeader />}
      <main>{children}</main>
      {!shouldHideNavAndFooter && <MobileNav />}
    </>
  );
}
