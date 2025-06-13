"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import {
  ArrowRight,
  MapPin,
  Heart,
  ThumbsUp,
  ThumbsDown,
  Share2,
  Bed,
  Home,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { cn } from "@/src/lib/utils";

interface Property {
  id: string;
  title: string;
  type: string;
  listingType: string;
  price: string | number;
  bedrooms?: number;
  size?: string;
  location: string;
  city: string;
  images: string[];
  features: string[];
}

interface PropertyCardProps {
  property: Property;
  reactions?: Record<string, string>;
  setReactions?: (reactions: Record<string, string>) => void;
  onComment?: (propertyId: string) => void;
}

export function PropertyCard({
  property,
  reactions = {},
  setReactions,
  onComment,
}: PropertyCardProps) {
  const handleReaction = (propertyId: string, reactionType: string) => {
    if (setReactions) {
      setReactions({
        ...reactions,
        [propertyId]:
          reactionType === reactions[propertyId] ? "" : reactionType,
      });
      toast.success(
        reactionType === reactions[propertyId]
          ? "Réaction retirée"
          : `Vous avez réagi avec "${reactionType}" à cette propriété`
      );
    }
  };

  const handleShare = async (propertyId: string) => {
    const url = `${window.location.origin}/property/${propertyId}`;
    try {
      if (navigator.share) {
        await navigator.share({
          title: property.title,
          text: `Découvrez cette propriété : ${property.title}`,
          url,
        });
      } else {
        await navigator.clipboard.writeText(url);
        toast.success("Lien copié dans le presse-papier");
      }
    } catch {
      toast.error("Erreur lors du partage");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="group relative backdrop-blur-sm bg-white/80 dark:bg-slate-800/70 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 border border-white/20 dark:border-slate-700/50"
      whileHover={{ y: -5 }}
    >
      {/* Decorative gradient elements */}
      <div className="absolute -z-10 inset-0 overflow-hidden opacity-40 pointer-events-none">
        <div className="absolute top-[10%] left-[5%] w-[40%] h-[40%] bg-blue-500/20 dark:bg-green-500/15 rounded-full blur-[50px]"></div>
        <div className="absolute bottom-[10%] right-[5%] w-[30%] h-[30%] bg-orange-500/15 dark:bg-orange-500/10 rounded-full blur-[40px]"></div>
      </div>

      <Link href={`/property/${property.id}`} className="cursor-pointer">
        <div className="relative h-56 overflow-hidden">
          <Image
            src={property.images[0] || "/placeholder.svg"}
            alt={property.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

          {/* Badge with glassmorphism */}
          <div className="absolute top-4 left-4 z-10">
            <span className="px-3 py-1.5 bg-[#f39200]/80 backdrop-blur-md text-white text-xs font-medium rounded-full shadow-sm border border-white/20">
              {property.listingType === "rent" ? "À louer" : "À vendre"}
            </span>
          </div>

          {/* Price overlay with glassmorphism */}
          <div className="absolute bottom-4 right-4 z-10">
            <div className="px-3 py-1.5 bg-black/40 backdrop-blur-md text-white text-sm font-semibold rounded-lg shadow-sm border border-white/10">
              {property.listingType === "rent" ? (
                <>${property.price}/mois</>
              ) : (
                <>${property.price.toLocaleString()}</>
              )}
            </div>
          </div>

          {/* Image counter with glassmorphism */}
          {property.images.length > 1 && (
            <div className="absolute bottom-4 left-4 z-10">
              <div className="px-2 py-1 bg-black/40 backdrop-blur-md text-white text-xs rounded-lg shadow-sm border border-white/10 flex items-center">
                <span className="mr-1">{property.images.length}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </svg>
              </div>
            </div>
          )}
        </div>

        {/* Thumbnails row with glassmorphism */}
        {property.images.length > 1 && (
          <div className="relative px-2 -mt-3 z-20">
            <div className="flex gap-1.5 overflow-hidden justify-center bg-white/30 dark:bg-slate-800/30 backdrop-blur-md rounded-lg p-1.5 border border-white/20 dark:border-slate-700/50 shadow-sm">
              {property.images.slice(0, 4).map((image, index) => (
                <div
                  key={index}
                  className={cn(
                    "relative h-10 w-14 rounded-md overflow-hidden transition-all duration-300",
                    index === 0
                      ? "ring-1 ring-[#f39200] shadow-sm"
                      : "opacity-80 hover:opacity-100"
                  )}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${property.title} - Image ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                  {index === 3 && property.images.length > 4 && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white text-xs font-medium">
                      +{property.images.length - 4}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="p-5 pt-4">
          {/* Property title with hover effect */}
          <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-3 group-hover:text-[#f39200] transition-colors duration-300 line-clamp-1">
            {property.title}
          </h3>

          {/* Location with icon */}
          <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-sm mb-4">
            <MapPin className="w-3.5 h-3.5 text-[#f39200]/70 dark:text-yellow-400/70" />
            <span className="truncate">
              {property.location}, {property.city}
            </span>
          </div>

          {/* Property specs with modern styling */}
          <div className="flex items-center gap-4 mb-5">
            {property.bedrooms && (
              <div className="flex items-center gap-1.5 px-2.5 py-1 bg-white/50 dark:bg-slate-700/50 backdrop-blur-sm rounded-lg border border-slate-200/50 dark:border-slate-600/50 text-xs">
                <Bed className="w-3.5 h-3.5 text-[#f39200] dark:text-yellow-400" />
                <span className="text-slate-700 dark:text-slate-300 font-medium">
                  {property.bedrooms}{" "}
                  {property.bedrooms > 1 ? "chambres" : "chambre"}
                </span>
              </div>
            )}
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-white/50 dark:bg-slate-700/50 backdrop-blur-sm rounded-lg border border-slate-200/50 dark:border-slate-600/50 text-xs">
              <Home className="w-3.5 h-3.5 text-[#f39200] dark:text-yellow-400" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">
                {property.size}
              </span>
            </div>
          </div>

          {/* Features with glassmorphism */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {property.features.slice(0, 3).map((feature, index) => (
              <span
                key={index}
                className="px-2.5 py-1 bg-white/40 dark:bg-slate-700/40 backdrop-blur-sm text-slate-700 dark:text-slate-300 text-xs rounded-lg border border-slate-200/50 dark:border-slate-600/50"
              >
                {feature}
              </span>
            ))}
          </div>

          {/* Call to action with animation */}
          <div className="flex justify-end items-center mt-2">
            <div className="flex items-center text-[#f39200] dark:text-yellow-400 text-sm font-medium group-hover:translate-x-1 transition-transform duration-300">
              Voir détails
              <ArrowRight className="ml-1.5 h-4 w-4 group-hover:ml-2.5 transition-all duration-300" />
            </div>
          </div>
        </div>
      </Link>

      {/* Reactions Bar with glassmorphism */}
      <div className="px-5 py-3 border-t border-white/20 dark:border-slate-700/50 bg-white/30 dark:bg-slate-800/30 backdrop-blur-sm">
        <div className="flex justify-between items-center">
          <div className="flex space-x-1.5">
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "h-8 w-8 rounded-full bg-white/40 dark:bg-slate-700/40 border border-white/20 dark:border-slate-600/30 backdrop-blur-sm",
                reactions[property.id] === "like"
                  ? "text-blue-500 shadow-sm shadow-blue-500/20"
                  : "text-slate-600 dark:text-slate-300 hover:text-blue-500 hover:bg-blue-50/50 dark:hover:bg-blue-900/20"
              )}
              onClick={(e) => {
                e.preventDefault();
                handleReaction(property.id, "like");
              }}
            >
              <ThumbsUp className="h-3.5 w-3.5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "h-8 w-8 rounded-full bg-white/40 dark:bg-slate-700/40 border border-white/20 dark:border-slate-600/30 backdrop-blur-sm",
                reactions[property.id] === "love"
                  ? "text-red-500 shadow-sm shadow-red-500/20"
                  : "text-slate-600 dark:text-slate-300 hover:text-red-500 hover:bg-red-50/50 dark:hover:bg-red-900/20"
              )}
              onClick={(e) => {
                e.preventDefault();
                handleReaction(property.id, "love");
              }}
            >
              <Heart className="h-3.5 w-3.5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "h-8 w-8 rounded-full bg-white/40 dark:bg-slate-700/40 border border-white/20 dark:border-slate-600/30 backdrop-blur-sm",
                reactions[property.id] === "dislike"
                  ? "text-slate-900 dark:text-white shadow-sm"
                  : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/50 dark:hover:bg-slate-600/30"
              )}
              onClick={(e) => {
                e.preventDefault();
                handleReaction(property.id, "dislike");
              }}
            >
              <ThumbsDown className="h-3.5 w-3.5" />
            </Button>
          </div>
          <div className="flex space-x-1.5">
            {onComment && (
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full bg-white/40 dark:bg-slate-700/40 border border-white/20 dark:border-slate-600/30 backdrop-blur-sm text-slate-600 dark:text-slate-300 hover:text-[#f39200] hover:bg-yellow-50/50 dark:hover:bg-yellow-900/20"
                onClick={(e) => {
                  e.preventDefault();
                  onComment(property.id);
                }}
              >
                <MessageCircle className="h-3.5 w-3.5" />
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full bg-white/40 dark:bg-slate-700/40 border border-white/20 dark:border-slate-600/30 backdrop-blur-sm text-slate-600 dark:text-slate-300 hover:text-[#f39200] hover:bg-yellow-50/50 dark:hover:bg-yellow-900/20"
              onClick={(e) => {
                e.preventDefault();
                handleShare(property.id);
              }}
            >
              <Share2 className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
