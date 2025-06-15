"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { Card, CardContent, CardFooter } from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";
import { Clock, Search, Users, Bed, MapPin, Star } from "lucide-react";
import {
  getAllRooms,
  formatPrice,
  HOTELS,
  type Room,
  type Hotel,
} from "@/src/lib/usersData/hotelData";

type PriceRange = "all" | "low" | "medium" | "high";

export default function RoomsPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCommune, setSelectedCommune] = useState<string | null>(null);
  const [selectedQuartier, setSelectedQuartier] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<PriceRange>("all");

  // Extraire les communes et quartiers uniques
  const communes = Array.from(
    new Set(HOTELS.map((hotel: Hotel) => hotel.location.commune))
  ).sort();
  const quartiers = Array.from(
    new Set(HOTELS.map((hotel: Hotel) => hotel.location.quartier))
  ).sort();

  // Obtenir toutes les chambres
  const allRooms = getAllRooms();

  // Filtrer les chambres
  const filteredRooms = allRooms.filter((room: Room) => {
    const hotel = HOTELS.find((h: Hotel) => h.rooms.includes(room));
    if (!hotel) return false;

    const matchesSearch =
      room.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.type.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCommune =
      selectedCommune && selectedCommune !== "all"
        ? hotel.location.commune === selectedCommune
        : true;

    const matchesQuartier =
      selectedQuartier && selectedQuartier !== "all"
        ? hotel.location.quartier === selectedQuartier
        : true;

    let matchesPrice = true;
    if (priceRange === "low") {
      matchesPrice = room.price <= 100000;
    } else if (priceRange === "medium") {
      matchesPrice = room.price > 100000 && room.price <= 200000;
    } else if (priceRange === "high") {
      matchesPrice = room.price > 200000;
    }

    return matchesSearch && matchesCommune && matchesQuartier && matchesPrice;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const handleRoomClick = (roomId: string) => {
    router.push(`/rooms/${roomId}`);
  };

  return (
    <div className="container mx-auto px-4 py-8 my-16">
      {/* Filtres */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Rechercher une chambre..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <Select
            value={selectedCommune || undefined}
            onValueChange={(value) => setSelectedCommune(value || null)}
          >
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Commune" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les communes</SelectItem>
              {communes.map((commune) => (
                <SelectItem key={commune} value={commune}>
                  {commune}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={selectedQuartier || undefined}
            onValueChange={(value) => setSelectedQuartier(value || null)}
          >
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Quartier" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les quartiers</SelectItem>
              {quartiers.map((quartier) => (
                <SelectItem key={quartier} value={quartier}>
                  {quartier}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={priceRange}
            onValueChange={(value: PriceRange) => setPriceRange(value)}
          >
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Prix" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les prix</SelectItem>
              <SelectItem value="low">{"< 100,000 CDF"}</SelectItem>
              <SelectItem value="medium">100,000 - 200,000 CDF</SelectItem>
              <SelectItem value="high">{"> 200,000 CDF"}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Résultats */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        {filteredRooms.map((room) => {
          const hotel = HOTELS.find((h) => h.rooms.includes(room));
          if (!hotel) return null;

          return (
            <motion.div
              key={room.id}
              variants={itemVariants}
              onClick={() => handleRoomClick(room.id)}
              className="cursor-pointer group"
            >
              <Card className="h-full overflow-hidden hover:shadow-xl transition-all duration-300 group-hover:scale-[1.02]">
                <div className="relative h-48">
                  <img
                    src={room.images[0]}
                    alt={room.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge
                      variant="secondary"
                      className="bg-white/90 text-primary"
                    >
                      {room.availableFrom}
                    </Badge>
                  </div>
                  <div className="absolute bottom-2 left-2">
                    <Badge className="bg-primary/90">
                      {formatPrice(room.price)}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-lg line-clamp-1">
                      {room.title}
                    </h3>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="ml-1 text-sm font-medium">
                        {room.rating}
                      </span>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground mb-3">
                    <div className="flex items-center mb-2">
                      <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                      <span className="line-clamp-1">
                        {hotel.name} - {hotel.location.quartier},{" "}
                        {hotel.location.commune}
                      </span>
                    </div>
                    <p className="line-clamp-2 text-sm">{room.description}</p>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {room.duration}h
                    </div>
                    <div className="flex items-center">
                      <Bed className="h-4 w-4 mr-1" />
                      {room.type}
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {room.capacity}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button className="w-full bg-primary hover:bg-primary/90">
                    Réserver maintenant
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Message si aucun résultat */}
      {filteredRooms.length === 0 && (
        <div className="text-center py-8">
          <p className="text-lg text-muted-foreground">
            Aucune chambre ne correspond à vos critères de recherche.
          </p>
        </div>
      )}
    </div>
  );
}
