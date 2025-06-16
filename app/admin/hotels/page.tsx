"use client";

import AdminContainer from "@/src/components/admin-components/admin-container";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { HOTELS } from "@/src/lib/usersData/hotelData";
import Link from "next/link";
import { Plus, Search, Star } from "lucide-react";

export default function HotelsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Gestion des hôtels
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            {HOTELS.length} hôtels enregistrés
          </p>
        </div>
        <Link href="/admin/hotels/new">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Ajouter un hôtel
          </Button>
        </Link>
      </div>

      <AdminContainer>
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Rechercher un hôtel..."
                className="pl-10"
              />
            </div>
            <Button variant="outline">Filtres</Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {HOTELS.map((hotel) => (
              <Link
                key={hotel.id}
                href={`/admin/hotels/${hotel.id}`}
                className="group"
              >
                <div className="relative h-48 rounded-t-lg overflow-hidden">
                  <img
                    src={
                      hotel.rooms[0]?.images[0] ||
                      "/images/placeholder-hotel.jpg"
                    }
                    alt={hotel.name}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute top-2 right-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-sm font-medium">{hotel.rating}</span>
                  </div>
                </div>
                <div className="p-4 border-x border-b rounded-b-lg bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-gray-200 dark:border-gray-700">
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                    {hotel.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {hotel.location.address}, {hotel.location.quartier}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs px-2 py-1 rounded-full bg-orange-100 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400">
                      {hotel.rooms.length} chambres
                    </span>
                    <span className="text-xs px-2 py-1 rounded-full bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400">
                      Actif
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </AdminContainer>
    </div>
  );
}
