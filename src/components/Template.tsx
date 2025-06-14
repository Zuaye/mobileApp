"use client";

import { usePathname } from "next/navigation";
import { AppHeader } from "./navigation/app-header";
import { MobileNav } from "./navigation/mobile-nav";

interface TemplateProps {
  children: React.ReactNode;
}

export function Template({ children }: TemplateProps) {
  const pathname = usePathname();

  // Pages where we don't want to show navbar and footer
  const shouldHideNavAndFooter = ["/auth/login", "/auth/register"].includes(
    pathname
  );

  return (
    <>
      {!shouldHideNavAndFooter && <AppHeader />}
      <main>{children}</main>
      {!shouldHideNavAndFooter && <MobileNav />}
    </>
  );
}
