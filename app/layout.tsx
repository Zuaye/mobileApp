import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/src/components/theme-provider";
import { Toaster } from "@/src/components/ui/sonner";
import { MobileNav } from "@/src/components/navigation/mobile-nav";
import { OnboardingProvider } from "@/src/components/providers/onboarding-provider";
import { cn } from "@/src/lib/utils";
import { AppHeader } from "@/src/components/navigation/app-header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Zuaye - Réservation de Chambres d'Hôtel à l'Heure",
  description:
    "Plateforme de réservation de chambres d'hôtel à l'heure. Trouvez rapidement une chambre confortable pour vos moments privés.",
  manifest: "/manifest.json",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.className
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <OnboardingProvider>
            <AppHeader />
            <main className="pb-16 md:pb-0">{children}</main>
            <MobileNav />
            <Toaster />
          </OnboardingProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
