/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: "export",
  eslint: {
    // Désactiver ESLint pendant le build
    ignoreDuringBuilds: true,
  },
  // images: {
  //   unoptimized: true,
  //   domains: ["*"],
  // },
  // trailingSlash: true,
  // // Désactiver le strict mode en production pour de meilleures performances
  // reactStrictMode: process.env.NODE_ENV === "development",
  // // Configuration pour les liens dynamiques
  experimental: {
    scrollRestoration: true,
  },
};

module.exports = nextConfig;
