"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardFooter } from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import { Clock, Bed, Users } from "lucide-react";
import { useRouter } from "next/navigation";

// Types
interface Womens {
  id: string;
  name: string;
  localisation: string;
  price: number;
  image: string;
  statut: string;
}

// Données de test
const AVAILABLE_WOMENS: Womens[] = [
  {
    id: "1",
    name: "Jessica Moke",
    price: 15000,
    image: "/images/rooms/room-1.jpg",
    statut: "Maintenant",
    localisation: "Bandal",
  },
  {
    id: "2",
    name: "Deborah Mande",
    price: 12000,
    image: "/images/rooms/room-2.jpg",
    statut: "Dans 30min",
    localisation: "Lingwala",
  },
  {
    id: "3",
    name: "Eunice Yenga",
    price: 18000,
    image: "/images/rooms/room-3.jpg",
    statut: "Dans 1h",
    localisation: "Gombe",
  },
];

export function AvailableWomens() {
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

  const handleRoomClick = (roomId: string) => {
    router.push(`/rooms/${roomId}`);
  };

  return (
    <section className="w-full mt-8 px-4 mb-8 bg-primary py-5">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-50">
            Filles de chambres Disponibles
          </h2>
          <p className="text-sm  text-slate-200">
            Optez pour une fille propre et contactez-la
          </p>
        </div>
      </div>
      <div className="relative">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex overflow-x-auto pb-4 gap-4 snap-x snap-mandatory hide-scrollbar"
        >
          {AVAILABLE_WOMENS.map((room) => (
            <motion.div
              key={room.id}
              variants={itemVariants}
              className="flex-none w-[280px] snap-center"
              onClick={() => handleRoomClick(room.id)}
            >
              <Card className="h-full overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer">
                <div className="relative h-20">
                  <img
                    src={room.image}
                    alt={room.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge variant="secondary" className="bg-white/90">
                      {room.statut}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-3">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-base line-clamp-1">
                      {room.localisation}
                    </h3>
                    <span className="text-sm font-medium text-primary">
                      {room.price.toLocaleString()} FC/2h
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-3 line-clamp-1">
                    {room.name}
                  </p>
                </CardContent>
                <CardFooter className="p-3 pt-0">
                  <Button size="sm" className="w-full">
                    contactez maintenant
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Indicateur de défilement et bouton Voir tout */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex gap-1">
            {AVAILABLE_WOMENS.map((_, index) => (
              <div key={index} className="w-1 h-1 rounded-full bg-primary/20" />
            ))}
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-slate-50 font-medium hover:text-primary/80"
            onClick={handleSeeAll}
          >
            Voir toutes les filles
          </Button>
        </div>
      </div>
    </section>
  );
}
