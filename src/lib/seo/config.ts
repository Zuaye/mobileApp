export const seoConfig = {
  default: {
    title: "Domicon - Plateforme Immobilière",
    description:
      "Découvrez Domicon, votre partenaire immobilier de confiance en République Démocratique du Congo. Achetez, vendez ou louez des biens immobiliers de qualité.",
    url: "https://domicon.com",
    siteName: "Domicon",
    type: "website" as const,
    keywords: [
      "immobilier RDC",
      "propriétés à vendre",
      "location immobilière",
      "biens immobiliers Congo",
      "maisons à vendre",
      "appartements à louer",
      "agence immobilière RDC",
      "investissement immobilier",
    ],
    locale: "fr_FR",
    icons: {
      icon: "/images/favicon.png",
      // apple: "/apple-icon.png",
      shortcut: "/images/favicon.png",
    },
    authors: [{ name: "Domicon Immobilier" }],
    images: {
      og: {
        url: "/images/openGraph/EcranGraph.jpg",
        alt: "Domicon - Plateforme Immobilière",
        width: 1080,
        height: 1080,
      },
      twitter: {
        url: "/images/openGraph/EcranGraph.jpg",
        alt: "Domicon - Plateforme Immobilière",
        width: 1200,
        height: 675,
      },
    },
    twitter: {
      card: "summary_large_image",
      site: "@domicon_rdc",
      creator: "@domicon_rdc",
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

    category: "Real Estate",
  },
};
