"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Search, Home, Map } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/src/components/ui/tabs";
import { Label } from "@/src/components/ui/label";
import { Input } from "@/src/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { Button } from "@/src/components/ui/button";
import { LoaderParcelle } from "../ui/loader-parcelle";
import { CommentDrawer } from "./comment-drawer";
import { congoCities } from "@/src/lib/data/congoCities";
import { propertyTypes } from "@/src/lib/data/propertyTypes";

interface PropertySearchProps {
  onSearch: (criteria: {
    listingType: string;
    city: string;
    propertyType: string;
    location: string;
    bedrooms: string;
    priceRange: string;
  }) => void;
  isLoading: boolean;
}

export function PropertySearch({ onSearch, isLoading }: PropertySearchProps) {
  // États locaux pour les critères de recherche

  const [listingType, setListingType] = useState("rent");
  const [city, setCity] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [location, setLocation] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [priceRange, setPriceRange] = useState("");
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

  // Fonction pour envoyer les critères de recherche
  const handleSearch = () => {
    onSearch({
      listingType,
      city,
      propertyType,
      location,
      bedrooms,
      priceRange,
    });
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

  return (
    <>
      <div id="search" className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          <div className="backdrop-blur-xl bg-slate-800/90 p-8 rounded-3xl shadow-lg border border-white/20">
            {/* <div className="backdrop-blur-xl bg-white/30 dark:bg-slate-800/30 p-8 rounded-3xl shadow-lg border border-white/20"> */}
            <div className="mb-8">
              <Tabs
                defaultValue={listingType}
                className="w-full"
                onValueChange={setListingType}
              >
                <TabsList className="grid w-full grid-cols-2 bg-white/20 dark:bg-slate-700/20 p-1 rounded-xl">
                  <TabsTrigger
                    value="rent"
                    className="data-[state=active]:bg-[#f39200]  text-white/  data-[state=active]:text-white rounded-lg transition-all duration-300"
                  >
                    <Home className="w-4 h-4 mr-2" />À louer
                  </TabsTrigger>
                  <TabsTrigger
                    value="sale"
                    className="data-[state=active]:bg-[#f39200] text-white  data-[state=active]:text-white rounded-lg transition-all duration-300"
                  >
                    <Map className="w-4 h-4 mr-2" />À vendre
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
              >
                <Label htmlFor="propertyType" className="text-white mb-2 block">
                  Type de propriété
                </Label>
                <Select onValueChange={setPropertyType} value={propertyType}>
                  <SelectTrigger
                    id="propertyType"
                    className="w-full bg-white/50 dark:bg-slate-700/50 border-slate-200 dark:border-slate-600 focus:ring-[#f39200] focus:ring-offset-0 text-slate-900 dark:text-white"
                  >
                    <SelectValue
                      placeholder="Sélectionnez un type"
                      className="text-slate-500 dark:text-slate-400"
                    />
                  </SelectTrigger>
                  <SelectContent
                    className="z-50 w-full bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 shadow-lg"
                    position="popper"
                    sideOffset={5}
                  >
                    {propertyTypes.map((type) => (
                      <SelectItem
                        key={type}
                        value={type}
                        className="cursor-pointer py-2 px-3 text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700 focus:bg-slate-100 dark:focus:bg-slate-700"
                      >
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <Label htmlFor="city" className="text-white mb-2 block">
                  Ville
                </Label>
                <Select onValueChange={setCity} value={city}>
                  <SelectTrigger
                    id="city"
                    className="w-full bg-white/50 dark:bg-slate-700/50 border-slate-200 dark:border-slate-600 focus:ring-[#f39200] focus:ring-offset-0 text-slate-900 dark:text-white"
                  >
                    <SelectValue
                      placeholder="Sélectionnez une ville"
                      className="text-slate-500 dark:text-slate-400"
                    />
                  </SelectTrigger>
                  <SelectContent
                    className="z-50 w-full bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 shadow-lg"
                    position="popper"
                    sideOffset={5}
                  >
                    {congoCities.map((city) => (
                      <SelectItem
                        key={city}
                        value={city}
                        className="cursor-pointer py-2 px-3 text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700 focus:bg-slate-100 dark:focus:bg-slate-700"
                      >
                        {city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
              >
                <Label htmlFor="location" className="text-white mb-2 block">
                  Quartier
                </Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                  <Input
                    id="location"
                    placeholder="Nom du quartier..."
                    className="pl-10 bg-white/50 dark:bg-slate-700/50 border-slate-200 dark:border-slate-600 focus:border-[#f39200] focus:ring-[#f39200]"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.5 }}
              >
                <Label htmlFor="bedrooms" className="text-white mb-2 block">
                  Chambres
                </Label>
                <Select onValueChange={setBedrooms} value={bedrooms}>
                  <SelectTrigger
                    id="bedrooms"
                    className="w-full bg-white/50 dark:bg-slate-700/50 border-slate-200 dark:border-slate-600 focus:ring-[#f39200] focus:ring-offset-0 text-slate-900 dark:text-white"
                  >
                    <SelectValue
                      placeholder="Nombre de chambres"
                      className="text-slate-500 dark:text-slate-400"
                    />
                  </SelectTrigger>
                  <SelectContent
                    className="z-50 w-full bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 shadow-lg"
                    position="popper"
                    sideOffset={5}
                  >
                    {[1, 2, 3, 4, 5, "5+"].map((num) => (
                      <SelectItem
                        key={num}
                        value={num.toString()}
                        className="cursor-pointer py-2 px-3 text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700 focus:bg-slate-100 dark:focus:bg-slate-700"
                      >
                        {num}{" "}
                        {num === "5+"
                          ? "chambres ou plus"
                          : num === 1
                          ? "chambre"
                          : "chambres"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.6 }}
              >
                <Label htmlFor="price" className="text-white mb-2 block">
                  Budget (USD)
                </Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                  <Input
                    id="price"
                    placeholder="Budget "
                    className="pl-10 bg-white/50 dark:bg-slate-700/50 border-slate-200 dark:border-slate-600 focus:border-[#f39200] focus:ring-[#f39200]"
                    value={priceRange}
                    onChange={(e) => setPriceRange(e.target.value)}
                  />
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.7 }}
              className="mt-8 flex justify-between items-center"
            >
              <Button
                className="bg-[#f39200] hover:bg-[#f39200]/90 text-white px-8"
                onClick={handleSearch}
                disabled={isLoading}
              >
                {isLoading ? (
                  <LoaderParcelle />
                ) : (
                  <>
                    <Search className="w-4 h-4 mr-2" />
                    Rechercher
                  </>
                )}
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {selectedProperty && (
        <CommentDrawer
          isOpen={commentDrawerOpen}
          onClose={() => {
            setCommentDrawerOpen(false);
            setSelectedProperty(null);
          }}
          propertyId={selectedProperty}
          propertyTitle="Titre de la propriété" // À remplacer par le vrai titre
          comments={comments[selectedProperty] || []}
          onAddComment={handleAddComment}
        />
      )}
    </>
  );
}
