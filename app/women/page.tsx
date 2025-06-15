"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { cn } from "@/src/lib/utils";
import {
  Search,
  MapPin,
  Star,
  Clock,
  Filter,
  SlidersHorizontal,
  Languages,
} from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import { Input } from "@/src/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { AVAILABLE_WOMENS } from "@/src/lib/usersData/women-profile";
import { LoaderView } from "@/src/components/Loader/loader-view";

export default function WomensPages() {
  const router = useRouter();
  const { theme } = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [priceRange, setPriceRange] = useState("all");

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || isLoading) {
    return <LoaderView />;
  }

  const isDark = theme === "dark";

  // Obtenir les localisations uniques
  const locations = [
    ...new Set(AVAILABLE_WOMENS.map((profile) => profile.localisation)),
  ];

  // Filtrer les profils
  const filteredProfiles = AVAILABLE_WOMENS.filter((profile) => {
    const matchesSearch =
      profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      profile.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation =
      selectedLocation === "all" || profile.localisation === selectedLocation;
    const matchesPriceRange =
      priceRange === "all" ||
      (priceRange === "low"
        ? profile.price <= 15000
        : priceRange === "medium"
        ? profile.price > 15000 && profile.price <= 25000
        : profile.price > 25000);

    return matchesSearch && matchesLocation && matchesPriceRange;
  });

  return (
    <div
      className={cn(
        "min-h-screen w-full transition-colors duration-300 my-16",
        isDark
          ? "bg-gradient-to-b from-slate-900 to-slate-800"
          : "bg-gradient-to-b from-slate-50 to-white"
      )}
    >
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[5%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[10%] right-[5%] w-[30%] h-[30%] bg-primary/15 rounded-full blur-[80px]"></div>
      </div>

      {/* Header section */}
      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-4">
            Découvrez nos Profils
          </h1>
          <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Trouvez la personne idéale pour un moment agréable parmi notre
            sélection de profils vérifiés
          </p>
        </div>

        {/* Search and filters */}
        <div className="bg-white/10 dark:bg-black/20 backdrop-blur-lg rounded-xl p-4 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative col-span-2">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Rechercher par nom ou description..."
                className="pl-10 bg-white/20 dark:bg-black/20 border-white/20"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select
              value={selectedLocation}
              onValueChange={setSelectedLocation}
            >
              <SelectTrigger className="bg-white/20 dark:bg-black/20 border-white/20">
                <MapPin className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Localisation" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les localisations</SelectItem>
                {locations.map((loc) => (
                  <SelectItem key={loc} value={loc}>
                    {loc}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={priceRange} onValueChange={setPriceRange}>
              <SelectTrigger className="bg-white/20 dark:bg-black/20 border-white/20">
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Fourchette de prix" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les prix</SelectItem>
                <SelectItem value="low">Moins de 15,000 FC</SelectItem>
                <SelectItem value="medium">15,000 - 25,000 FC</SelectItem>
                <SelectItem value="high">Plus de 25,000 FC</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Profiles grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProfiles.map((profile) => (
            <motion.div
              key={profile.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
              onClick={() => router.push(`/women/${profile.id}`)}
              className="cursor-pointer"
            >
              <div className="bg-white/10 dark:bg-black/20 backdrop-blur-lg rounded-xl overflow-hidden border border-white/10 hover:border-primary/50 transition-all duration-300">
                <div className="relative h-48">
                  <Image
                    src={profile.images[0]}
                    alt={profile.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <Badge className="absolute top-4 right-4 bg-white/90 text-primary">
                    <Clock className="w-3 h-3 mr-1" />
                    {profile.statut}
                  </Badge>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold text-lg">
                        {profile.name}
                        <span className="text-sm text-slate-400 ml-2">
                          {profile.age} ans
                        </span>
                      </h3>
                      <div className="flex items-center text-sm text-slate-500">
                        <MapPin className="h-4 w-4 mr-1" />
                        {profile.localisation}
                      </div>
                    </div>
                    <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-full">
                      <Star className="h-3 w-3 text-yellow-500 fill-yellow-500 mr-1" />
                      <span className="text-xs font-medium text-yellow-700">
                        {profile.rating}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <Languages className="h-4 w-4 text-primary/70" />
                    <div className="flex gap-1 flex-wrap">
                      {profile.languages.map((lang, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="text-[10px] px-1.5 py-0 bg-primary/5 border-primary/10 text-primary/70"
                        >
                          {lang}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-primary">
                      {profile.price.toLocaleString()} FC
                      <span className="text-xs text-slate-400 ml-1">/2h</span>
                    </span>
                    <Button
                      size="sm"
                      className="bg-primary/90 hover:bg-primary"
                    >
                      Voir le profil
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredProfiles.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-600 dark:text-slate-300">
              Aucun profil ne correspond à vos critères de recherche.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
