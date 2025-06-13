"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { properties } from "@/src/lib/data/propriete";
import { PropertyCard } from "@/src/components/propriete/property-card";
import { CommentDrawer } from "@/src/components/propriete/comment-drawer";
// import { BackgroundPattern } from "@/src/components/propriete/background-pattern";
import { FloatingElements } from "@/src/components/propriete/floating-elements";
import { LoaderParcelle } from "../Loader/loaderParcelle";
import { PropertyFilters } from "./property-filters";
import { useTheme } from "next-themes";
import { cn } from "@/src/lib/utils";

export default function PropertiesGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Effet pour éviter les problèmes d'hydratation avec next-themes
  useEffect(() => {
    setMounted(true);
  }, []);

  // États pour la grille principale
  const [isMobile, setIsMobile] = useState(false);
  const [visibleItems, setVisibleItems] = useState(6);
  const [isLoading, setIsLoading] = useState(false);
  const [commentDrawerOpen, setCommentDrawerOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<string | null>(null);
  const [reactions, setReactions] = useState<Record<string, string>>({});
  const [comments, setComments] = useState<
    Record<
      string,
      Array<{
        id: string;
        text: string;
        author: { name: string; avatar?: string };
        createdAt: Date;
      }>
    >
  >({});
  const [searchCriteria, setSearchCriteria] = useState({
    listingType: "rent",
    keyword: "",
    city: "",
    propertyType: "",
    location: "",
    bedrooms: "",
    priceRange: [0, 100000],
  });
  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      setVisibleItems(window.innerWidth < 768 ? 3 : 6);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  // Simulate loading more items
  const loadMore = () => {
    setIsLoading(true);
    setTimeout(() => {
      setVisibleItems((prev) => {
        const increment = isMobile ? 3 : 6;
        return Math.min(prev + increment, properties.length);
      });
      setIsLoading(false);
    }, 1000);
  };

  const handleAddComment = (propertyId: string, comment: string) => {
    setComments((prev) => ({
      ...prev,
      [propertyId]: [
        ...(prev[propertyId] || []),
        {
          id: Date.now().toString(),
          text: comment,
          author: {
            name: "Utilisateur",
            avatar: "/placeholder-avatar.png",
          },
          createdAt: new Date(),
        },
      ],
    }));
  };

  // Attendre que le thème soit chargé pour éviter les problèmes d'hydratation
  if (!mounted) {
    return null;
  }

  const isDark = theme === "dark";

  return (
    <div
      id="property"
      ref={containerRef}
      className={cn(
        "relative py-20 overflow-hidden transition-colors duration-300",
        isDark
          ? "bg-gradient-to-b from-slate-900 to-slate-800"
          : "bg-gradient-to-b from-white to-slate-100"
      )}
    >
      {/* Éléments décoratifs avec glassmorphism */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div
          className={cn(
            "absolute top-[10%] left-[5%] w-[40%] h-[40%] rounded-full blur-[100px]",
            isDark ? "bg-amber-500/10" : "bg-amber-500/5"
          )}
        ></div>
        <div
          className={cn(
            "absolute bottom-[10%] right-[5%] w-[30%] h-[30%] rounded-full blur-[80px]",
            isDark ? "bg-orange-500/10" : "bg-orange-500/5"
          )}
        ></div>
      </div>

      <PropertyFilters
        propertyType={searchCriteria.propertyType}
        setPropertyType={(type) =>
          setSearchCriteria((prev) => ({ ...prev, propertyType: type }))
        }
      />

      {/* Properties Grid with staggered animation */}
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {properties.slice(0, visibleItems).map((property, index) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: (index % 3) * 0.1, // Stagger effect based on column position
                ease: "easeOut",
              }}
            >
              <PropertyCard
                property={property}
                reactions={reactions}
                setReactions={setReactions}
                onComment={(propertyId) => {
                  setSelectedProperty(propertyId);
                  setCommentDrawerOpen(true);
                }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Load More Button with glassmorphism */}
        {visibleItems < properties.length && (
          <motion.div
            className="flex justify-center mt-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            <Button
              onClick={loadMore}
              disabled={isLoading}
              className={cn(
                "px-8 py-6 rounded-full text-white transition-all duration-500 relative overflow-hidden group",
                isDark
                  ? "bg-yellow-500/90 hover:bg-yellow-500 shadow-lg shadow-yellow-500/20 backdrop-blur-sm border border-yellow-400/30"
                  : "bg-yellow-500/90 hover:bg-yellow-500 shadow-lg shadow-yellow-500/20 backdrop-blur-sm border border-yellow-400/30"
              )}
              size="lg"
            >
              {/* Decorative gradient elements */}
              <div className="absolute inset-0 w-full h-full overflow-hidden opacity-70 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-yellow-400/50 to-yellow-500/50 group-hover:opacity-80 transition-opacity duration-500"></div>
                <div className="absolute -inset-1 bg-yellow-400/20 blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
              </div>

              <span className="relative z-10 flex items-center font-medium">
                {isLoading ? (
                  <LoaderParcelle />
                ) : (
                  <>
                    Voir plus de propriétés
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:ml-3 transition-all duration-300" />
                  </>
                )}
              </span>
            </Button>
          </motion.div>
        )}
      </div>

      {/* Comment Drawer */}
      {selectedProperty && (
        <CommentDrawer
          isOpen={commentDrawerOpen}
          onClose={() => {
            setCommentDrawerOpen(false);
            setSelectedProperty(null);
          }}
          propertyId={selectedProperty}
          propertyTitle={
            properties.find((p) => p.id === selectedProperty)?.title || ""
          }
          comments={comments[selectedProperty] || []}
          onAddComment={handleAddComment}
        />
      )}

      {/* Floating Elements */}
      <FloatingElements />
    </div>
  );
}
