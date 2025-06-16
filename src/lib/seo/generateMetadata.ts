import { Metadata } from "next";
import { seoConfig } from "./config";

type PropsMetadata = {
  title?: string;
  description?: string;
  image?: {
    url: string;
    alt: string;
    width?: number;
    height?: number;
  };
  keywords?: string[];
  canonical?: string;
  locale?: string;
  type?: "website" | "article" | "profile" | "book";
  siteName?: string;
  publishedTime?: string;
  modifiedTime?: string;
  authors?: { name: string; url?: string }[];
  section?: string;
  tags?: string[];
};

export function generateMetadata({
  title,
  description,
  image,
  keywords,
  locale,
  type,
  siteName,
  publishedTime,
  modifiedTime,
  authors,
  section,
  tags,
}: PropsMetadata): Metadata {
  const { default: defaultConfig } = seoConfig;

  // Page metadata
  const pageTitle = title || defaultConfig.title;
  const pageDescription = description || defaultConfig.description;
  const pageImage = image || defaultConfig.images.og;
  const pageKeywords = keywords || defaultConfig.keywords;
  const pageLocale = locale || defaultConfig.locale;
  const pageType = type || defaultConfig.type;
  const pageSiteName = siteName || defaultConfig.siteName;
  const pageAuthors = authors || defaultConfig.authors;

  // Construct full URL for OpenGraph image
  const ogImageUrl = pageImage.url.startsWith("http")
    ? pageImage.url
    : `${defaultConfig.url}${pageImage.url}`;

  return {
    // Basic metadata
    title: pageTitle,
    description: pageDescription,
    keywords: pageKeywords,

    // Authors
    authors: pageAuthors,

    // Icons
    icons: {
      // icon: defaultConfig.icons.icon,
      // apple: defaultConfig.icons.apple,
      shortcut: defaultConfig.icons.shortcut,
    },

    // OpenGraph metadata
    openGraph: {
      type: pageType,
      title: pageTitle,
      description: pageDescription,
      siteName: pageSiteName,
      locale: pageLocale,

      images: [
        {
          url: ogImageUrl,
          width: pageImage.width || 1200,
          height: pageImage.height || 630,
        },
      ],
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
      ...(section && { section }),
      ...(tags && { tags }),
    },

    // Twitter metadata
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
      creator: "@domicon_rdc",
      images: [
        {
          url: defaultConfig.images.twitter?.url || ogImageUrl,
          width: defaultConfig.images.twitter?.width || 1200,
          height: defaultConfig.images.twitter?.height || 675,
        },
      ],
    },

    // Robots - Simplified to match Next.js Metadata API
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },

    // Category
    category: defaultConfig.category,
  };
}
