"use client";

import { useState } from "react";
import { PropertyHeader } from "./property-header";
import { PropertySearch } from "./property-search";
import { propertyType } from "@/src/types/globalTypes";
import { properties } from "@/src/lib/data/propriete";
import { SearchResultsModal } from "./search-results-modal";

function PropertyLayout() {
  const [isLoading, setIsLoading] = useState(false);
  // États pour la recherche et le modal
  const [searchResults, setSearchResults] = useState<propertyType[]>([]);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [searchCriteria, setSearchCriteria] = useState({
    listingType: "rent",
    city: "",
    propertyType: "",
    location: "",
    bedrooms: "",
    priceRange: "",
  });

  const handleSearch = (criteria: typeof searchCriteria) => {
    setIsLoading(true);

    const results = properties.filter((property) => {
      let score = 0;
      const maxScore = Object.keys(criteria).length;

      // Type de propriété - correspondance partielle
      if (criteria.propertyType) {
        if (
          property.type
            .toLowerCase()
            .includes(criteria.propertyType.toLowerCase())
        ) {
          score++;
        }
      } else {
        score++; // Si aucun type n'est spécifié
      }

      // Location (quartier) - correspondance partielle
      if (criteria.location) {
        if (
          property.location
            .toLowerCase()
            .includes(criteria.location.toLowerCase())
        ) {
          score++;
        }
      } else {
        score++;
      }

      // Ville - correspondance partielle
      if (criteria.city) {
        if (
          property.city?.toLowerCase().includes(criteria.city.toLowerCase())
        ) {
          score++;
        }
      } else {
        score++;
      }

      // Nombre de chambres - tolérance de ±1
      if (criteria.bedrooms && property.bedrooms) {
        const targetBedrooms = Number.parseInt(criteria.bedrooms);
        if (
          property.bedrooms >= targetBedrooms - 1 &&
          property.bedrooms <= targetBedrooms + 1
        ) {
          score++;
        }
      } else {
        score++;
      }

      // Prix - tolérance de ±20%
      let numericPrice: number;
      if (typeof property.price === "string") {
        const priceString = property.price as string;
        numericPrice = Number.parseInt(priceString.replace(/[^0-9]/g, "")) || 0;
      } else {
        numericPrice = property.price as number;
      }

      const minPrice = 0;
      const maxPrice = 100000;

      const priceTolerance = (maxPrice - minPrice) * 0.2; // 20% de tolérance

      if (
        numericPrice >= minPrice - priceTolerance &&
        numericPrice <= maxPrice + priceTolerance
      ) {
        score++;
      }

      // Type d'annonce (location/vente) - plus souple
      if (criteria.listingType === "rent") {
        if (property.type !== "parcelle") {
          score++;
        }
      } else if (criteria.listingType === "sale") {
        if (
          property.type === "parcelle" ||
          property.type.toLowerCase().includes("vente")
        ) {
          score++;
        }
      }

      // On retourne true si le score est suffisamment élevé (au moins 80% de correspondance)
      const minimumScore = maxScore * 0.8;
      return score >= minimumScore;
    }) as propertyType[];

    // Tri des résultats par pertinence (à implémenter si nécessaire)
    setSearchResults(results);
    setSearchCriteria(criteria);
    setIsSearchModalOpen(true);
    setIsLoading(false);
  };
  return (
    <div>
      {/* Section Header */}
      <PropertyHeader />

      {/* Property Search */}
      <PropertySearch onSearch={handleSearch} isLoading={isLoading} />

      {/* Search Results Modal */}
      <SearchResultsModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        results={searchResults}
        searchCriteria={searchCriteria}
      />
    </div>
  );
}

export default PropertyLayout;
