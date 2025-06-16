"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardFooter } from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import { Clock, Users, Star, MapPin, Bed } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useMemo } from "react";
import {
  getAvailableRooms,
  formatPrice,
  HOTELS,
  type Room,
  type Hotel,
} from "@/src/lib/usersData/hotelData";

type FilterType = "all" | "standard" | "passage" | "deluxe";

export function AvailableRooms() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const availableRooms = getAvailableRooms();

  // Filtres disponibles
  const filters: { type: FilterType; label: string }[] = [
    { type: "all", label: "Tous" },
    { type: "passage", label: "passage" },
    { type: "standard", label: "Standard" },
    { type: "deluxe", label: "Deluxe" },
  ];

  // Filtrer les chambres en fonction du filtre actif
  const filteredRooms = useMemo(() => {
    if (activeFilter === "all") return availableRooms;
    return availableRooms.filter((room) =>
      room.type.toLowerCase().includes(activeFilter.toLowerCase())
    );
  }, [availableRooms, activeFilter]);

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
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const handleSeeAll = () => {
    router.push("/rooms");
  };

  const handleRoomClick = (roomId: string) => {
    router.push(`/rooms/${roomId}`);
  };

  return (
    <section className="w-full mt-10 px-4 mb-8">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-2xl font-bold">Chambres Disponibles</h2>
          <p className="text-sm text-muted-foreground">
            Réservez immédiatement
          </p>
        </div>
      </div>

      {/* Système de filtres */}
      <div className="flex gap-2 mb-4 overflow-x-auto pb-2 hide-scrollbar">
        {filters.map((filter) => (
          <Badge
            key={filter.type}
            variant={activeFilter === filter.type ? "default" : "outline"}
            className={`cursor-pointer transition-all ${
              activeFilter === filter.type
                ? "bg-primary text-primary-foreground"
                : "hover:bg-primary/10"
            }`}
            onClick={() => setActiveFilter(filter.type)}
          >
            {filter.label}
          </Badge>
        ))}
      </div>

      <div className="relative">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex overflow-x-auto pb-4 gap-4 snap-x snap-mandatory hide-scrollbar"
        >
          {filteredRooms.map((room: Room) => {
            const hotel = HOTELS.find((h: Hotel) => h.rooms.includes(room));
            if (!hotel) return null;

            return (
              <motion.div
                key={room.id}
                variants={itemVariants}
                className="flex-none w-[300px] snap-center"
                onClick={() => handleRoomClick(room.id)}
              >
                <Card className="h-full overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer">
                  <div className="relative h-40">
                    <img
                      src={room.images[0]}
                      alt={room.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2">
                      <Badge variant="secondary" className="bg-white/90">
                        {room.availableFrom}
                      </Badge>
                    </div>
                    <div className="absolute bottom-2 left-2">
                      <Badge className="bg-primary/90">
                        {formatPrice(room.price)}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-3">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-base line-clamp-1">
                        {room.title}
                      </h3>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <span className="text-sm font-medium">
                          {room.rating}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center text-xs text-muted-foreground mb-2">
                      <MapPin className="w-3 h-3 mr-1" />
                      <span className="line-clamp-1">
                        {hotel.name} - {hotel.location.quartier}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {room.duration}h
                      </div>
                      <div className="flex items-center gap-1">
                        <Bed className="w-3 h-3" />
                        {room.type}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {room.capacity}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="p-3 pt-0">
                    <Button size="sm" className="w-full">
                      Réserver maintenant
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Indicateur de défilement et bouton Voir tout */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex gap-1">
            {filteredRooms.map((_, index) => (
              <div key={index} className="w-1 h-1 rounded-full bg-primary/20" />
            ))}
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-primary font-medium hover:text-primary/80"
            onClick={handleSeeAll}
          >
            Voir toutes les chambres
          </Button>
        </div>
      </div>
    </section>
  );
}
