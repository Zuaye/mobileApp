"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Phone,
  Mail,
  Share2,
  Heart,
  ChevronLeft,
  ChevronRight,
  Check,
} from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/src/components/ui/tabs";
import { properties } from "@/src/lib/data/propriete"; // Adjust the import path as necessary
import { cn } from "@/src/lib/utils";
import { LoaderView } from "@/src/components/Loader/loaderView";
import { SimilarProperties } from "@/src/components/propriete/similarProperties";
import { useTheme } from "next-themes";

export default function PropertyDetail() {
  const params = useParams();
  const router = useRouter();
  const { theme } = useTheme();

  const id = params.id as string;
  const property = properties.find((p) => p.id === id);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  // Effect to handle theme hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || isLoading) {
    return <LoaderView />;
  }

  if (!property) {
    return (
      <div className="min-h-[80vh] mt-24 w-full rounded-3xl mx-auto max-w-[96%] bg-slate-900 flex flex-col items-center justify-center text-white p-4">
        <h1 className="text-3xl font-bold mb-4">Propriété non trouvée</h1>
        <p className="mb-8">
          Désolé, nous n`avons pas pu trouver la propriété que vous recherchez.
        </p>
        <Button
          onClick={() => router.push("/")}
          className="bg-blue-500 hover:bg-blue-600 text-white"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour à l`accueil
        </Button>
      </div>
    );
  }

  const nextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % property.images.length);
  };

  const prevImage = () => {
    setActiveImageIndex(
      (prev) => (prev - 1 + property.images.length) % property.images.length
    );
  };

  const isDark = theme === "dark";

  return (
    <div
      className={cn(
        "min-h-screen w-full transition-colors duration-300 mt-18",
        isDark
          ? "bg-gradient-to-b from-slate-900 to-slate-800"
          : "bg-gradient-to-b from-slate-50 to-white"
      )}
    >
      {/* Decorative elements with glassmorphism */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[5%] w-[40%] h-[40%] bg-green-500/20 dark:bg-green-500/15 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[10%] right-[5%] w-[30%] h-[30%] bg-blue-500/15 dark:bg-blue-500/10 rounded-full blur-[80px]"></div>
        <div className="absolute top-[40%] right-[15%] w-[20%] h-[20%] bg-purple-500/10 dark:bg-purple-500/5 rounded-full blur-[60px]"></div>
      </div>

      {/* Full-width image carousel */}
      <div className="relative w-full h-[40vh] sm:h-[50vh] md:h-[60vh] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeImageIndex}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0"
          >
            <Image
              src={property.images[activeImageIndex] || "/placeholder.svg"}
              alt={`${property.title} - Image ${activeImageIndex + 1}`}
              fill
              className="object-cover"
              priority
            />
            {/* Gradient overlay for better text visibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30"></div>
          </motion.div>
        </AnimatePresence>

        {/* Small badge overlay */}
        <div className="absolute top-4 left-4 z-10">
          <Badge className="bg-yellow-600 hover:bg-yellow-700 text-xs sm:text-sm">
            {property.type}
          </Badge>
        </div>

        {/* Price overlay */}
        <div className="absolute bottom-4 right-4 z-10">
          <div className="bg-black/50 backdrop-blur-sm px-3 py-2 rounded-lg">
            <span className="text-lg sm:text-xl font-bold text-yellow-400">
              {property.price}
            </span>
          </div>
        </div>

        {/* Navigation arrows */}
        <button
          onClick={prevImage}
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 backdrop-blur-md text-white p-2 sm:p-3 rounded-full transition-all duration-300 border border-white/20"
        >
          <ChevronLeft className="h-4 w-4 sm:h-6 sm:w-6" />
        </button>
        <button
          onClick={nextImage}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 backdrop-blur-md text-white p-2 sm:p-3 rounded-full transition-all duration-300 border border-white/20"
        >
          <ChevronRight className="h-4 w-4 sm:h-6 sm:w-6" />
        </button>

        {/* Progress indicator */}
        <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-1 sm:gap-2 z-10">
          {property.images.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveImageIndex(index)}
              className={cn(
                "h-1 sm:h-1.5 rounded-full transition-all duration-300",
                activeImageIndex === index
                  ? "w-6 sm:w-8 bg-yellow-500"
                  : "w-3 sm:w-4 bg-white/50 hover:bg-white/70"
              )}
            />
          ))}
        </div>
      </div>

      {/* Property title section */}
      <div className="container mx-auto px-4 pt-4 pb-2 relative z-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-3xl font-bold text-slate-800 dark:text-white mb-1">
              {property.title}
            </h1>
            <div className="flex items-center text-slate-600 dark:text-slate-300 text-sm sm:text-base">
              <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
              <span className="truncate">{property.location}</span>
            </div>
          </div>
          <div className="flex mt-3 md:mt-0 space-x-2">
            <Button
              variant="outline"
              size="sm"
              className="rounded-full bg-white/10 dark:bg-black/20 border-white/20 dark:border-white/10"
            >
              <Heart className="h-4 w-4 mr-1 text-slate-800 dark:text-white" />
              <span className="text-xs sm:text-sm">Favoris</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="rounded-full bg-white/10 dark:bg-black/20 border-white/20 dark:border-white/10"
            >
              <Share2 className="h-4 w-4 mr-1 text-slate-800 dark:text-white" />
              <span className="text-xs sm:text-sm">Partager</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Thumbnails in a horizontal row below the main image */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="bg-white/10 dark:bg-black/20 backdrop-blur-lg rounded-xl p-3 flex gap-2 overflow-x-auto scrollbar-thin scrollbar-thumb-yellow-500 scrollbar-track-transparent">
          {property.images.map((image, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveImageIndex(index)}
              className={cn(
                "relative h-12 w-16 sm:h-16 sm:w-24 flex-shrink-0 rounded-lg overflow-hidden transition-all duration-300",
                activeImageIndex === index
                  ? "ring-2 ring-yellow-500 -translate-y-2"
                  : "ring-1 ring-white/20 hover:-translate-y-1"
              )}
            >
              <Image
                src={image || "/placeholder.svg"}
                alt={`Thumbnail ${index + 1}`}
                fill
                className="object-cover"
              />
              {activeImageIndex === index && (
                <div className="absolute inset-0 bg-yellow-500/20"></div>
              )}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 py-8 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column - Details */}
          <div className="lg:col-span-2">
            {/* Property details tabs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="backdrop-blur-md bg-white/10 dark:bg-black/20 rounded-xl overflow-hidden border border-white/10 dark:border-white/5"
            >
              <Tabs defaultValue="details" className="w-full">
                <TabsList className="w-full bg-white/10 dark:bg-black/30 p-0 h-auto">
                  <TabsTrigger
                    value="details"
                    className="flex-1 py-3 text-slate-800 dark:text-white data-[state=active]:bg-yellow-500/10 data-[state=active]:text-yellow-600 dark:data-[state=active]:text-yellow-400"
                  >
                    Détails
                  </TabsTrigger>
                  <TabsTrigger
                    value="features"
                    className="flex-1 py-3 text-slate-800 dark:text-white data-[state=active]:bg-yellow-500/10 data-[state=active]:text-yellow-600 dark:data-[state=active]:text-yellow-400"
                  >
                    Caractéristiques
                  </TabsTrigger>
                </TabsList>

                <TabsContent
                  value="details"
                  className="mt-0 p-6 text-slate-800 dark:text-white"
                >
                  <h3 className="text-xl font-bold mb-4">Description</h3>
                  <p className="text-slate-600 dark:text-slate-300 mb-6">
                    {property.description}
                  </p>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-white/20 dark:bg-white/5 backdrop-blur-sm p-4 rounded-lg">
                      <div className="text-yellow-600 dark:text-yellow-400 mb-1 text-sm">
                        Type
                      </div>
                      <div className="font-semibold">{property.type}</div>
                    </div>
                    <div className="bg-white/20 dark:bg-white/5 backdrop-blur-sm p-4 rounded-lg">
                      <div className="text-yellow-600 dark:text-yellow-400 mb-1 text-sm">
                        Surface
                      </div>
                      <div className="font-semibold">{property.size}</div>
                    </div>
                    <div className="bg-white/20 dark:bg-white/5 backdrop-blur-sm p-4 rounded-lg">
                      <div className="text-yellow-600 dark:text-yellow-400 mb-1 text-sm">
                        Dimensions
                      </div>
                      <div className="font-semibold">{property.dimensions}</div>
                    </div>
                    <div className="bg-white/20 dark:bg-white/5 backdrop-blur-sm p-4 rounded-lg">
                      <div className="text-yellow-600 dark:text-yellow-400 mb-1 text-sm">
                        Disponibilité
                      </div>
                      <div className="font-semibold">{property.available}</div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent
                  value="features"
                  className="mt-0 p-6 text-slate-800 dark:text-white"
                >
                  <h3 className="text-xl font-bold mb-4">Caractéristiques</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {property.features.map((feature, index) => (
                      <div key={index} className="flex items-center">
                        <Check className="h-5 w-5 text-yellow-500 dark:text-yellow-400 mr-2" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </motion.div>
          </div>

          {/* Right column - Price and contact */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="backdrop-blur-md bg-white/10 dark:bg-black/20 p-6 rounded-xl text-slate-800 dark:text-white sticky top-4 border border-white/10 dark:border-white/5"
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <Badge className="mb-2 bg-yellow-600 hover:bg-yellow-700">
                    {property.type}
                  </Badge>
                  <h2 className="text-2xl font-bold mb-2">Résumé</h2>
                  <div className="flex items-center text-slate-600 dark:text-slate-300">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{property.location}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full bg-white/10 dark:bg-black/20 border-white/20 dark:border-white/10"
                  >
                    <Heart className="h-4 w-4 text-slate-800 dark:text-white" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full bg-white/10 dark:bg-black/20 border-white/20 dark:border-white/10"
                  >
                    <Share2 className="h-4 w-4 text-slate-800 dark:text-white" />
                  </Button>
                </div>
              </div>

              <div className="border-t border-b border-slate-200 dark:border-slate-700 py-6 my-6">
                <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400 mb-2">
                  {property.price}
                </div>
                <div className="flex items-center text-slate-600 dark:text-slate-300 text-sm">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>Disponible {property.available}</span>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4">Contactez-nous</h3>
                <div className="space-y-4">
                  <Button className="w-full bg-yellow-600 hover:bg-yellow-700 text-white">
                    Demander une visite
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-yellow-500 text-yellow-600 dark:text-yellow-400 hover:bg-yellow-500/10"
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    +243 123 456 789
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-slate-300 dark:border-slate-600 text-slate-800 dark:text-white hover:bg-white/10"
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Envoyer un message
                  </Button>
                </div>
              </div>

              <div className="bg-white/20 dark:bg-white/5 backdrop-blur-sm p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Agent immobilier</h3>
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-full bg-yellow-100 dark:bg-yellow-900 mr-3"></div>
                  <div>
                    <div className="font-medium">Jean Mutombo</div>
                    <div className="text-sm text-slate-600 dark:text-slate-300">
                      Agent Senior
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Similar properties */}
        <div className="mt-16 border-t border-slate-200 dark:border-slate-700 pt-16">
          <SimilarProperties property={property} />
        </div>
      </div>
    </div>
  );
}
