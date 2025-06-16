import "./globals.css";
import { OnboardingProvider } from "@/src/components/providers/onboarding-provider";
import { cn } from "@/src/lib/utils";
import { Toaster } from "@/src/components/ui/sonner";
import { Template } from "@/src/components/Template";
import localFont from "next/font/local";
import { ThemeProvider } from "@/src/components/ThemeComponents/theme-provider";
import { generateMetadata } from "@/src/lib/seo/generateMetadata";

export const metadata = generateMetadata({});

const myFont = localFont({
  src: "./fonts/NexaRegular.ttf",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-backgroundfont-sans antialiased",
          myFont.className
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <OnboardingProvider>
            <Toaster position="top-right" richColors />
            <Template>{children}</Template>
          </OnboardingProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
