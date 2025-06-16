"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Heart,
  Share2,
  MapPin,
  Star,
  Clock,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  Instagram,
  Phone,
  Library,
} from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import { cn } from "@/src/lib/utils";

interface WomanProfileProps {
  profile: {
    id: string;
    name: string;
    age: number;
    description: string;
    localisation: string;
    price: number;
    rating: number;
    statut: string;
    languages: string[];
    images: string[];
    videos: string[];
    services: string[];
    instagram?: string;
    whatsapp?: string;
    phone?: string;
  };
}

export function WomanProfile({ profile }: WomanProfileProps) {
  const router = useRouter();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const nextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % profile.images.length);
  };

  const prevImage = () => {
    setActiveImageIndex(
      (prev) => (prev - 1 + profile.images.length) % profile.images.length
    );
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-900 mt-16">
      {/* Image carousel */}
      <div className="relative h-[60vh] md:h-[70vh]">
        <Button
          variant="ghost"
          className="absolute top-4 left-4 z-10 bg-black/20 hover:bg-black/40 text-white rounded-full p-2"
          onClick={() => router.back()}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>

        <div className="absolute top-4 right-4 z-10 flex gap-2">
          <Button
            variant="ghost"
            className="bg-black/20 hover:bg-black/40 text-white rounded-full p-2"
            onClick={() => setIsLiked(!isLiked)}
          >
            <Heart
              className={`h-6 w-6 ${
                isLiked ? "fill-red-500 text-red-500" : ""
              }`}
            />
          </Button>
        </div>

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
              src={profile.images[activeImageIndex]}
              alt={`${profile.name} - Image ${activeImageIndex + 1}`}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
          </motion.div>
        </AnimatePresence>

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

        {/* Image indicators */}
        <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-1 sm:gap-2 z-10">
          {profile.images.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveImageIndex(index)}
              className={cn(
                "h-1 sm:h-1.5 rounded-full transition-all duration-300",
                activeImageIndex === index
                  ? "w-6 sm:w-8 bg-primary"
                  : "w-3 sm:w-4 bg-white/50 hover:bg-white/70"
              )}
            />
          ))}
        </div>
      </div>

      {/* Thumbnails */}
      <div className="container mx-auto px-4 -mt-6 relative z-10">
        <div className="bg-white/10 dark:bg-black/20 backdrop-blur-lg rounded-xl p-3 flex gap-2 overflow-x-auto hide-scrollbar">
          {profile.images.map((image, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveImageIndex(index)}
              className={cn(
                "relative h-12 w-16 sm:h-16 sm:w-24 flex-shrink-0 rounded-lg overflow-hidden transition-all duration-300",
                activeImageIndex === index
                  ? "ring-2 ring-primary -translate-y-2"
                  : "ring-1 ring-white/20 hover:-translate-y-1"
              )}
            >
              <Image
                src={image}
                alt={`Miniature ${index + 1}`}
                fill
                className="object-cover"
              />
              {activeImageIndex === index && (
                <div className="absolute inset-0 bg-primary/20" />
              )}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Informations principales */}
      <div className="px-4 py-6 space-y-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold">
              {profile.name}, {profile.age}
            </h1>
            <div className="flex items-center gap-2 mt-1 text-slate-600">
              <MapPin className="w-4 h-4" />
              <span>{profile.localisation}</span>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-full">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium text-yellow-700">
                {profile.rating}
              </span>
            </div>
            <Badge variant="outline" className="mt-2">
              <Clock className="w-3 h-3 mr-1" />
              {profile.statut}
            </Badge>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {profile.languages.map((lang, index) => (
            <Badge key={index} variant="secondary">
              {lang}
            </Badge>
          ))}
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-lg p-4">
          <h2 className="font-semibold mb-2">À propos de moi</h2>
          <p className="text-slate-600 dark:text-slate-300">
            {profile.description}
          </p>
        </div>

        {/* Services */}
        <div className="bg-white dark:bg-slate-800 rounded-lg p-4">
          <h2 className="font-semibold mb-3">Services</h2>
          <div className="flex flex-wrap gap-2">
            {profile.services.map((service, index) => (
              <Badge key={index} variant="outline">
                {service}
              </Badge>
            ))}
          </div>
        </div>

        {/* Prix */}
        <div className="bg-white dark:bg-slate-800 rounded-lg p-4">
          <h2 className="font-semibold mb-2">Tarifs</h2>
          <div className="text-2xl font-bold text-primary">
            {profile.price.toLocaleString()} FC
            <span className="text-sm font-normal text-slate-600 dark:text-slate-400">
              /2h
            </span>
          </div>
        </div>
      </div>

      {/* Boutons de contact fixes en bas */}
      <div className="bg-white dark:bg-slate-800 border-t dark:border-slate-700 p-4 flex gap-2 mb-20">
        {profile.instagram && (
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => window.open(profile.instagram, "_blank")}
          >
            <Instagram className="w-5 h-5" />
          </Button>
        )}
        {profile.whatsapp && (
          <Button
            variant="outline"
            className="flex-1"
            onClick={() =>
              window.open(`https://wa.me/${profile.whatsapp}`, "_blank")
            }
          >
            <Library className="w-5 h-5" />
          </Button>
        )}
        {profile.phone && (
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => window.open(`tel:${profile.phone}`)}
          >
            <Phone className="w-5 h-5" />
          </Button>
        )}
        <Button className="flex-1">
          <MessageCircle className="w-5 h-5 mr-2" />
          Message
        </Button>
      </div>
    </div>
  );
}
