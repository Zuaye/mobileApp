"use client";

import { useState } from "react";
import { AppHeader } from "@/src/components/navigation/app-header";
import { Card, CardContent, CardFooter } from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { Clock, Bed, Users, Search, SlidersHorizontal } from "lucide-react";

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
  rating: number;
  features: string[];
}

// Données de test étendues
const ALL_ROOMS: Room[] = [
  {
    id: "1",
    hotelName: "Hôtel Le Luxe",
    type: "Suite Junior",
    price: 15000,
    image: "/images/rooms/room-1.jpg",
    capacity: 2,
    availableFrom: "Maintenant",
    duration: 3,
    rating: 4.8,
    features: ["Climatisation", "WiFi", "Mini-bar"],
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
    rating: 4.5,
    features: ["Vue ville", "WiFi", "Room service"],
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
    rating: 4.7,
    features: ["Balcon", "WiFi", "Jacuzzi"],
  },
  // Ajout de plus de chambres
  {
    id: "4",
    hotelName: "Hôtel Le Luxe",
    type: "Suite Royale",
    price: 25000,
    image: "/images/rooms/room-4.jpg",
    capacity: 3,
    availableFrom: "Dans 2h",
    duration: 4,
    rating: 4.9,
    features: ["Vue panoramique", "WiFi", "Spa privé"],
  },
  {
    id: "5",
    hotelName: "Confort Plus",
    type: "Chambre Standard",
    price: 8000,
    image: "/images/rooms/room-5.jpg",
    capacity: 2,
    availableFrom: "Maintenant",
    duration: 2,
    rating: 4.3,
    features: ["WiFi", "TV Cable"],
  },
];

export default function RoomsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [priceFilter, setPriceFilter] = useState("all");
  const [availabilityFilter, setAvailabilityFilter] = useState("all");

  // Filtrage des chambres
  const filteredRooms = ALL_ROOMS.filter((room) => {
    const matchesSearch =
      room.hotelName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPrice =
      priceFilter === "all" ||
      (priceFilter === "low" && room.price <= 10000) ||
      (priceFilter === "medium" && room.price > 10000 && room.price <= 15000) ||
      (priceFilter === "high" && room.price > 15000);
    const matchesAvailability =
      availabilityFilter === "all" ||
      (availabilityFilter === "now" && room.availableFrom === "Maintenant") ||
      (availabilityFilter === "soon" && room.availableFrom.includes("30min")) ||
      (availabilityFilter === "later" && room.availableFrom.includes("h"));
    return matchesSearch && matchesPrice && matchesAvailability;
  });

  return (
    <>
      <AppHeader />
      <main className="min-h-screen pt-14 px-4 pb-20">
        <div className="max-w-7xl mx-auto">
          {/* En-tête et filtres */}
          <div className="py-6">
            <h1 className="text-2xl font-bold mb-2">Chambres Disponibles</h1>
            <p className="text-muted-foreground mb-6">
              Trouvez la chambre parfaite pour votre séjour
            </p>

            {/* Barre de recherche et filtres */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher un hôtel ou type de chambre..."
                  className="pl-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Select value={priceFilter} onValueChange={setPriceFilter}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Prix" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les prix</SelectItem>
                    <SelectItem value="low">{"< 10,000 FCFA"}</SelectItem>
                    <SelectItem value="medium">10,000 - 15,000 FCFA</SelectItem>
                    <SelectItem value="high">{"> 15,000 FCFA"}</SelectItem>
                  </SelectContent>
                </Select>
                <Select
                  value={availabilityFilter}
                  onValueChange={setAvailabilityFilter}
                >
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Disponibilité" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes</SelectItem>
                    <SelectItem value="now">Maintenant</SelectItem>
                    <SelectItem value="soon">Dans 30min</SelectItem>
                    <SelectItem value="later">Plus tard</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Grille de chambres */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRooms.map((room) => (
              <Card
                key={room.id}
                className="overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative h-48">
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
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-lg">{room.type}</h3>
                    <span className="text-lg font-medium text-primary">
                      {room.price.toLocaleString()} FCFA
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    {room.hotelName}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {room.duration}h
                    </div>
                    <div className="flex items-center gap-1">
                      <Bed className="w-4 h-4" />
                      {room.type}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {room.capacity}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {room.features.map((feature) => (
                      <Badge key={feature} variant="outline">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button className="w-full">Réserver maintenant</Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* Message si aucun résultat */}
          {filteredRooms.length === 0 && (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">
                Aucune chambre ne correspond à vos critères
              </p>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
