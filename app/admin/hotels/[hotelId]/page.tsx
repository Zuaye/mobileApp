"use client";

import { useParams, useRouter } from "next/navigation";
import AdminContainer from "@/src/components/admin-components/admin-container";
import { Button } from "@/src/components/ui/button";
import { HOTELS } from "@/src/lib/usersData/hotelData";
import Link from "next/link";
import {
  ArrowLeft,
  Star,
  MapPin,
  Phone,
  Mail,
  Clock,
  Plus,
  Building2,
} from "lucide-react";

export default function HotelDetailsPage() {
  const { hotelId } = useParams();
  const router = useRouter();
  const hotel = HOTELS.find((h) => h.id === hotelId);

  if (!hotel) {
    return (
      <div className="p-8">
        <h2 className="text-2xl font-bold text-red-600">Hôtel non trouvé</h2>
        <Link
          href="/admin/hotels"
          className="text-blue-600 hover:underline mt-4 inline-block"
        >
          Retour à la liste des hôtels
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/hotels">
            <Button variant="outline" size="icon">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              {hotel.name}
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              {hotel.location.address}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link href={`/admin/hotels/${hotelId}/edit`}>
            <Button variant="outline">Modifier</Button>
          </Link>
          <Link href={`/admin/hotels/${hotelId}/rooms/new`}>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Ajouter une chambre
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <AdminContainer className="lg:col-span-2">
          <div className="relative h-[300px] rounded-lg overflow-hidden mb-6">
            <img
              src={hotel.rooms[0]?.images[0] || "/images/placeholder-hotel.jpg"}
              alt={hotel.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              <span className="text-lg font-semibold">{hotel.rating}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Adresse complète
                </h3>
                <p className="mt-1 flex items-start gap-2">
                  <MapPin className="w-5 h-5 text-orange-500 flex-shrink-0" />
                  <span>
                    {hotel.location.address}, {hotel.location.quartier},{" "}
                    {hotel.location.commune}
                  </span>
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Contact
                </h3>
                <div className="mt-1 space-y-2">
                  <p className="flex items-center gap-2">
                    <Phone className="w-5 h-5 text-orange-500" />
                    {hotel.contact.phone}
                  </p>
                  <p className="flex items-center gap-2">
                    <Mail className="w-5 h-5 text-orange-500" />
                    {hotel.contact.email}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Horaires
                </h3>
                <div className="mt-1 space-y-2">
                  <p className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-orange-500" />
                    Check-in: {hotel.checkIn} - Check-out: {hotel.checkOut}
                  </p>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Description
                </h3>
                <p className="mt-1">{hotel.description}</p>
              </div>
            </div>
          </div>
        </AdminContainer>

        <AdminContainer>
          <div className="flex items-center gap-2 mb-4">
            <Building2 className="w-5 h-5 text-orange-500" />
            <h2 className="text-xl font-semibold">Chambres</h2>
          </div>
          <div className="space-y-6">
            {hotel.rooms.map((room) => (
              <div
                key={room.id}
                className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors space-y-4"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">{room.title}</h3>
                  <span className="text-sm text-gray-500">{room.type}</span>
                </div>

                {/* Image gallery */}
                <div className="relative h-48 rounded-lg overflow-hidden group">
                  <img
                    src={room.images[0]}
                    alt={room.title}
                    className="w-full h-full object-cover"
                  />
                  {room.images.length > 1 && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <p className="text-white text-sm">
                        +{room.images.length - 1} photos
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-4">
                    <span>{room.size}</span>
                    <span>{room.capacity} personnes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span>{room.rating}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-lg font-semibold text-orange-600 dark:text-orange-400">
                    {new Intl.NumberFormat("fr-CD", {
                      style: "currency",
                      currency: "CDF",
                    }).format(room.price)}
                  </p>
                  <Link href={`/admin/hotels/${hotelId}/rooms/${room.id}`}>
                    <Button variant="outline" size="sm">
                      Voir les détails
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </AdminContainer>
      </div>

      <AdminContainer>
        <h2 className="text-xl font-semibold mb-4">Équipements</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {hotel.amenities.map((amenity, index) => (
            <div
              key={index}
              className="p-3 rounded-lg bg-orange-50 dark:bg-orange-900/10 text-orange-600 dark:text-orange-400"
            >
              {amenity}
            </div>
          ))}
        </div>
      </AdminContainer>
    </div>
  );
}
