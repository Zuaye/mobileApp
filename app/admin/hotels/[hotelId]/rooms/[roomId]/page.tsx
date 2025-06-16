"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import AdminContainer from "@/src/components/admin-components/admin-container";
import { Button } from "@/src/components/ui/button";
import { HOTELS } from "@/src/lib/usersData/hotelData";
import Link from "next/link";
import {
  ArrowLeft,
  Star,
  Users,
  Ruler,
  Clock,
  ChevronLeft,
  ChevronRight,
  Edit,
} from "lucide-react";

export default function RoomDetailsPage() {
  const { hotelId, roomId } = useParams();
  const router = useRouter();
  const hotel = HOTELS.find((h) => h.id === hotelId);
  const room = hotel?.rooms.find((r) => r.id === roomId);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!hotel || !room) {
    return (
      <div className="p-8">
        <h2 className="text-2xl font-bold text-red-600">Chambre non trouvée</h2>
        <Link
          href={`/admin/hotels/${hotelId}`}
          className="text-blue-600 hover:underline mt-4 inline-block"
        >
          Retour aux détails de l'hôtel
        </Link>
      </div>
    );
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === room.images.length - 1 ? 0 : prev + 1
    );
  };

  const previousImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? room.images.length - 1 : prev - 1
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href={`/admin/hotels/${hotelId}`}>
            <Button variant="outline" size="icon">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              {room.title}
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              {hotel.name}
            </p>
          </div>
        </div>
        <Link href={`/admin/hotels/${hotelId}/rooms/${roomId}/edit`}>
          <Button>
            <Edit className="w-4 h-4 mr-2" />
            Modifier la chambre
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <AdminContainer className="lg:col-span-2">
          <div className="relative h-[400px] rounded-lg overflow-hidden group">
            <img
              src={room.images[currentImageIndex]}
              alt={`${room.title} - Image ${currentImageIndex + 1}`}
              className="w-full h-full object-cover"
            />

            {room.images.length > 1 && (
              <>
                <button
                  onClick={previousImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            <div className="absolute bottom-4 right-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              <span className="text-lg font-semibold">{room.rating}</span>
            </div>
          </div>

          {room.images.length > 1 && (
            <div className="grid grid-cols-6 gap-2 mt-4">
              {room.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`relative h-20 rounded-lg overflow-hidden ${
                    currentImageIndex === index
                      ? "ring-2 ring-orange-500"
                      : "opacity-70 hover:opacity-100"
                  }`}
                >
                  <img
                    src={image}
                    alt={`${room.title} - Miniature ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Description
                </h3>
                <p className="mt-1">{room.description}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Type de chambre
                </h3>
                <p className="mt-1 capitalize">{room.type}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-orange-500" />
                  <span>{room.capacity} personnes</span>
                </div>
                <div className="flex items-center gap-2">
                  <Ruler className="w-5 h-5 text-orange-500" />
                  <span>{room.size}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-orange-500" />
                  <span>{room.duration}h</span>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Prix
                </h3>
                <p className="mt-1 text-2xl font-bold text-orange-600 dark:text-orange-400">
                  {new Intl.NumberFormat("fr-CD", {
                    style: "currency",
                    currency: "CDF",
                  }).format(room.price)}
                </p>
              </div>
            </div>
          </div>
        </AdminContainer>

        <AdminContainer>
          <h2 className="text-xl font-semibold mb-4">Équipements</h2>
          <div className="space-y-3">
            {room.amenities.map((amenity, index) => (
              <div
                key={index}
                className="p-3 rounded-lg bg-orange-50 dark:bg-orange-900/10 text-orange-600 dark:text-orange-400"
              >
                {amenity}
              </div>
            ))}
          </div>

          <h2 className="text-xl font-semibold mb-4 mt-6">
            Caractéristiques spéciales
          </h2>
          <div className="space-y-3">
            {room.features.map((feature, index) => (
              <div
                key={index}
                className="p-3 rounded-lg bg-purple-50 dark:bg-purple-900/10 text-purple-600 dark:text-purple-400"
              >
                {feature}
              </div>
            ))}
          </div>
        </AdminContainer>
      </div>
    </div>
  );
}
