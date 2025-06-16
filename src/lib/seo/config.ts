export const seoConfig = {
  default: {
    title: "Zuaye - Réservation de Chambres d'Hôtel à l'Heure",
    description:
      "Plateforme de réservation de chambres d'hôtel à l'heure. Trouvez rapidement une chambre confortable pour vos moments privés.",
    url: "https://zuaye.netlify.app",
    viewport: {
      width: "device-width",
      initialScale: 1,
      maximumScale: 1,
      userScalable: false,
    },
    themeColor: "#000000",
    siteName: "Zuaye",
    type: "website" as const,
    keywords: [
      "Chambre à louer",
      "Chambre",
      "Filles",
      "Reservation",
      "Kinshasa",
      "Espace à vivre",
      "Hotel RDC",
      "Hotel",
    ],
    locale: "fr_FR",
    icons: {
      icon: "/images/favicon.png",
      // apple: "/apple-icon.png",
      shortcut: "/images/favicon.png",
    },
    authors: [{ name: "Zuaye Teams" }],
    images: {
      og: {
        url: "/images/openGraph/EcranGraph.png",
        title: "Zuaye - Réservation de Chambres d'Hôtel à l'Heure",
        width: 1080,
        height: 1080,
      },
      twitter: {
        url: "/images/openGraph/EcranGraph.png",
        title: "Zuaye - Réservation de Chambres d'Hôtel à l'Heure",
        width: 1200,
        height: 675,
      },
    },
    twitter: {
      card: "summary_large_image",
      site: "@zuaye_rdc",
      creator: "@zuaye_rdc",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },

    category: "Reservation chamber",
  },
};
