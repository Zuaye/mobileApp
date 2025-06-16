"use client";

import AdminContainer from "@/src/components/admin-components/admin-container";
import { Button } from "@/src/components/ui/button";
import { AVAILABLE_WOMENS } from "@/src/lib/usersData/women-profile";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Star,
  MapPin,
  Languages,
  Clock,
  Phone,
  MessageCircle,
  Video,
  Image as ImageIcon,
  Edit2,
  Trash2,
  ChevronLeft,
} from "lucide-react";
import { Badge } from "@/src/components/ui/badge";
import Image from "next/image";

export default function WomanProfilePage({
  params,
}: {
  params: { id: string };
}) {
  const profile = AVAILABLE_WOMENS.find((w) => w.id === params.id);

  if (!profile) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link
          href="/admin/women"
          className="flex items-center gap-1 hover:text-foreground transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Retour à la liste des profils
        </Link>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            {profile.name}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Profil #{profile.id}
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Edit2 className="w-4 h-4 mr-2" />
            Modifier
          </Button>
          <Button variant="destructive">
            <Trash2 className="w-4 h-4 mr-2" />
            Supprimer
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <AdminContainer>
            <h2 className="text-xl font-semibold mb-4">
              Informations générales
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <p className="text-sm text-gray-500 dark:text-gray-400">Âge</p>
                <p className="font-medium">{profile.age} ans</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Localisation
                </p>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <p className="font-medium">{profile.localisation}</p>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Langues parlées
                </p>
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
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Services proposés
                </p>
                <div className="flex flex-wrap gap-2">
                  {profile.services.map((service, index) => (
                    <Badge key={index} variant="secondary">
                      {service}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </AdminContainer>

          <AdminContainer>
            <h2 className="text-xl font-semibold mb-4">Description</h2>
            <p className="text-gray-600 dark:text-gray-300">
              {profile.description}
            </p>
          </AdminContainer>

          <AdminContainer>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Galerie photos</h2>
              <Badge variant="outline" className="flex items-center gap-1">
                <ImageIcon className="w-4 h-4" />
                {profile.images.length} photos
              </Badge>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {profile.images.map((image, index) => (
                <div
                  key={index}
                  className="aspect-square rounded-lg overflow-hidden relative group"
                >
                  <img
                    src={image}
                    alt={`${profile.name} - Photo ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button variant="secondary" size="sm">
                      Voir
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </AdminContainer>

          {profile.videos.length > 0 && (
            <AdminContainer>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Vidéos</h2>
                <Badge variant="outline" className="flex items-center gap-1">
                  <Video className="w-4 h-4" />
                  {profile.videos.length} vidéos
                </Badge>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {profile.videos.map((video, index) => (
                  <div
                    key={index}
                    className="aspect-video rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 relative group"
                  >
                    <video
                      src={video}
                      className="w-full h-full object-cover"
                      controls
                    />
                  </div>
                ))}
              </div>
            </AdminContainer>
          )}
        </div>

        <div className="space-y-6">
          <AdminContainer>
            <h2 className="text-xl font-semibold mb-4">Statut</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-300">
                  Disponibilité
                </span>
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
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-300">Note</span>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span className="font-medium">{profile.rating}/5</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-300">Tarif</span>
                <Badge variant="default" className="bg-orange-500">
                  {new Intl.NumberFormat("fr-CD", {
                    style: "currency",
                    currency: "CDF",
                  }).format(profile.price)}
                </Badge>
              </div>
            </div>
          </AdminContainer>

          <AdminContainer>
            <h2 className="text-xl font-semibold mb-4">Contact</h2>
            <div className="space-y-4">
              {profile.phone && (
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600 dark:text-gray-300">
                    {profile.phone}
                  </span>
                </div>
              )}
              {profile.whatsapp && (
                <div className="flex items-center gap-3">
                  <MessageCircle className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600 dark:text-gray-300">
                    {profile.whatsapp}
                  </span>
                </div>
              )}
            </div>
          </AdminContainer>
        </div>
      </div>
    </div>
  );
}
