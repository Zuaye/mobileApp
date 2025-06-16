"use client";

import AdminContainer from "@/src/components/admin-components/admin-container";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { AVAILABLE_WOMENS } from "@/src/lib/usersData/women-profile";
import Link from "next/link";
import {
  Plus,
  Search,
  Star,
  MapPin,
  Languages,
  Clock,
  Phone,
  ChevronLeft,
} from "lucide-react";
import { Badge } from "@/src/components/ui/badge";

export default function WomenProfilesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link
          href="/admin"
          className="flex items-center gap-1 hover:text-foreground transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Retour au tableau de bord
        </Link>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Gestion des profils
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            {AVAILABLE_WOMENS.length} profils enregistrés
          </p>
        </div>
        <Link href="/admin/women/new">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Ajouter un profil
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
                placeholder="Rechercher un profil..."
                className="pl-10"
              />
            </div>
            <Button variant="outline">Filtres</Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {AVAILABLE_WOMENS.map((profile) => (
              <Link
                key={profile.id}
                href={`/admin/women/${profile.id}`}
                className="group"
              >
                <div className="relative h-[300px] rounded-t-lg overflow-hidden">
                  <img
                    src={profile.images[0]}
                    alt={profile.name}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <h3 className="text-xl font-semibold text-white">
                      {profile.name}
                    </h3>
                    <div className="flex items-center gap-2 text-white/80 mt-1">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">{profile.localisation}</span>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 flex flex-col gap-2">
                    <Badge
                      variant="default"
                      className="bg-orange-500 text-white font-semibold"
                    >
                      {new Intl.NumberFormat("fr-CD", {
                        style: "currency",
                        currency: "CDF",
                      }).format(profile.price)}
                    </Badge>
                    <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span className="text-sm font-medium">
                        {profile.rating}
                      </span>
                    </div>
                  </div>
                  <div className="absolute top-4 left-4">
                    <Badge
                      variant="default"
                      className={`${
                        profile.statut.toLowerCase().includes("maintenant")
                          ? "bg-green-500"
                          : "bg-orange-500"
                      }`}
                    >
                      {profile.statut}
                    </Badge>
                  </div>
                </div>
                <div className="p-4 border-x border-b rounded-b-lg bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        {profile.age} ans
                      </span>
                    </div>
                    {profile.phone && (
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600 dark:text-gray-300">
                          Disponible
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {profile.languages.map((lang, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400"
                      >
                        <Languages className="w-3 h-3" />
                        {lang}
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 line-clamp-2 text-sm text-gray-500 dark:text-gray-400">
                    {profile.description}
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
