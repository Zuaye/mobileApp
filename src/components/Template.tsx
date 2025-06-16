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
  ].includes(pathname);

  return (
    <>
      <DesktopBlocker />
      {!shouldHideNavAndFooter && <AppHeader />}
      <main>{children}</main>
      {!shouldHideNavAndFooter && <MobileNav />}
    </>
  );
}
