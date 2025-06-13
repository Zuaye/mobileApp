import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { PropertyCard } from "./property-card";
import { useState } from "react";
import { CommentDrawer } from "./comment-drawer";
import { propertyType } from "@/src/types/globalTypes";

interface SearchResultsModalProps {
  isOpen: boolean;
  onClose: () => void;
  results: propertyType[];
  searchCriteria: {
    listingType: string;
    city: string;
    propertyType: string;
    location: string;
    bedrooms: string;
    priceRange: string;
  };
}

export function SearchResultsModal({
  isOpen,
  onClose,
  results,
  searchCriteria,
}: SearchResultsModalProps) {
  const [reactions, setReactions] = useState<Record<string, string>>({});
  const [commentDrawerOpen, setCommentDrawerOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<string | null>(null);
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

  if (!isOpen) return null;

  const formatCriteria = () => {
    const criteria = [];
    if (searchCriteria.listingType) {
      criteria.push(
        searchCriteria.listingType === "rent" ? "À louer" : "À vendre"
      );
    }
    if (searchCriteria.propertyType) {
      criteria.push(searchCriteria.propertyType);
    }
    if (searchCriteria.city) {
      criteria.push(`à ${searchCriteria.city}`);
    }
    if (searchCriteria.location) {
      criteria.push(`dans ${searchCriteria.location}`);
    }
    if (searchCriteria.bedrooms) {
      criteria.push(
        `${searchCriteria.bedrooms} ${
          searchCriteria.bedrooms === "1" ? "chambre" : "chambres"
        }`
      );
    }
    return criteria.join(" • ");
  };

  return (
    <>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl w-full max-w-6xl max-h-[90vh] overflow-hidden"
          >
            <div className="p-6 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">
                  {results.length > 0
                    ? `${results.length} propriété${
                        results.length > 1 ? "s trouvées" : " trouvée"
                      }`
                    : "Aucune propriété trouvée"}
                </h2>
                <p className="text-slate-500 dark:text-slate-400 mt-1">
                  {formatCriteria()}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full"
              >
                <X className="h-6 w-6" />
              </Button>
            </div>

            <div className="p-6 overflow-auto max-h-[calc(90vh-100px)]">
              {results.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {results.map((property) => (
                    <PropertyCard
                      key={property.id}
                      property={property}
                      reactions={reactions}
                      setReactions={setReactions}
                      onComment={(propertyId) => {
                        setSelectedProperty(propertyId);
                        setCommentDrawerOpen(true);
                      }}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-slate-500 dark:text-slate-400 text-lg">
                    Aucune propriété ne correspond à vos critères de recherche.
                  </p>
                  <p className="text-slate-400 dark:text-slate-500 mt-2">
                    Essayez de modifier vos filtres pour voir plus de résultats.
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {selectedProperty && (
        <CommentDrawer
          isOpen={commentDrawerOpen}
          onClose={() => {
            setCommentDrawerOpen(false);
            setSelectedProperty(null);
          }}
          propertyId={selectedProperty}
          propertyTitle={
            results.find((p) => p.id === selectedProperty)?.title || ""
          }
          comments={comments[selectedProperty] || []}
          onAddComment={handleAddComment}
        />
      )}
    </>
  );
}
