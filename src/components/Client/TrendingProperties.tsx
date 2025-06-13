"use client";

import { motion } from "framer-motion";
import { Heart, MapPin, TrendingUp } from "lucide-react";
import Image from "next/image";

import { Button } from "@/src/components/ui/button";
import { Card } from "../ui/card";

interface Property {
  id: string;
  title: string;
  location: string;
  price: number;
  area: number;
  image: string;
  views: number;
  likes: number;
  trending: boolean;
}

export default function TrendingProperties() {
  // Données de test
  const properties: Property[] = [
    {
      id: "1",
      title: "Parcelle à vendre à Douala",
      location: "Douala, Akwa",
      price: 25000000,
      area: 500,
      image: "/properties/parcel1.jpg",
      views: 1200,
      likes: 45,
      trending: true,
    },
    {
      id: "2",
      title: "Terrain constructible à Yaoundé",
      location: "Yaoundé, Bastos",
      price: 35000000,
      area: 750,
      image: "/properties/parcel2.jpg",
      views: 980,
      likes: 32,
      trending: true,
    },
    // Ajoutez d'autres propriétés ici
  ];

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat("fr-CM", {
      style: "currency",
      currency: "XAF",
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Tendances
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Découvrez les parcelles les plus populaires
          </p>
        </div>
        <Button variant="outline" className="gap-2">
          <TrendingUp className="h-4 w-4" />
          <span>Filtrer par popularité</span>
        </Button>
      </div>

      {/* Grille des propriétés */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property, index) => (
          <motion.div
            key={property.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <div className="relative w-full h-48">
                  <Image
                    src={property.image}
                    alt={property.title}
                    fill
                    className="object-cover"
                  />
                </div>
                {property.trending && (
                  <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                    Tendance
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                  {property.title}
                </h3>
                <div className="flex items-center text-slate-600 dark:text-slate-400 mb-2">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="text-sm">{property.location}</span>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-bold text-slate-900 dark:text-white">
                    {formatPrice(property.price)}
                  </span>
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    {property.area} m²
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-400">
                  <div className="flex items-center gap-4">
                    <span>{property.views} vues</span>
                    <span>{property.likes} likes</span>
                  </div>
                  <Button variant="ghost" size="icon">
                    <Heart className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
