"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardFooter } from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import { Clock, Bed, Users } from "lucide-react";
import { useRouter } from "next/navigation";

// Types
interface Room {
  id: string;
  hotelName: string;
  type: string;
  price: number;
  image: string;
  capacity: number;
  availableFrom: string;
  duration: number;
}

// Données de test
const AVAILABLE_ROOMS: Room[] = [
  {
    id: "1",
    hotelName: "Hôtel Le Luxe",
    type: "Suite Junior",
    price: 15000,
    image: "/images/rooms/room-1.jpg",
    capacity: 2,
    availableFrom: "Maintenant",
    duration: 3,
  },
  {
    id: "2",
    hotelName: "Confort Plus",
    type: "Chambre Deluxe",
    price: 12000,
    image: "/images/rooms/room-2.jpg",
    capacity: 2,
    availableFrom: "Dans 30min",
    duration: 2,
  },
  {
    id: "3",
    hotelName: "Le Petit Palace",
    type: "Suite Executive",
    price: 18000,
    image: "/images/rooms/room-3.jpg",
    capacity: 2,
    availableFrom: "Dans 1h",
    duration: 4,
  },
];

export function AvailableRooms() {
  const router = useRouter();

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

  return (
    <div className="relative">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex overflow-x-auto pb-4 gap-4 snap-x snap-mandatory hide-scrollbar"
      >
        {AVAILABLE_ROOMS.map((room) => (
          <motion.div
            key={room.id}
            variants={itemVariants}
            className="flex-none w-[280px] snap-center"
          >
            <Card className="h-full overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="relative h-36">
                <img
                  src={room.image}
                  alt={room.type}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2">
                  <Badge variant="secondary" className="bg-white/90">
                    {room.availableFrom}
                  </Badge>
                </div>
              </div>
              <CardContent className="p-3">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold text-base line-clamp-1">
                    {room.type}
                  </h3>
                  <span className="text-sm font-medium text-primary">
                    {room.price.toLocaleString()} FCFA
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mb-3 line-clamp-1">
                  {room.hotelName}
                </p>
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
        ))}
      </motion.div>

      {/* Indicateur de défilement et bouton Voir tout */}
      <div className="flex items-center justify-between mt-4">
        <div className="flex gap-1">
          {AVAILABLE_ROOMS.map((_, index) => (
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
  );
}
