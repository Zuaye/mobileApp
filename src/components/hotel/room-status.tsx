"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import {
  Clock,
  MapPin,
  Star,
  Wifi,
  Coffee,
  Users,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/src/lib/utils";
import {
  Room,
  AVAILABLE_ROOMS,
  formatPrice,
} from "@/src/lib/usersData/hotelData";

interface RoomWithStatus extends Room {
  isViewed: boolean;
  status: "available" | "occupied" | "maintenance" | "cleaning";
  lastUpdatedBy: string;
  timestamp: string;
}

// Conversion des chambres disponibles en chambres avec statut
const roomsWithStatus: RoomWithStatus[] = AVAILABLE_ROOMS.map((room) => ({
  ...room,
  isViewed: false,
  status: room.available ? "available" : "occupied",
  lastUpdatedBy: "Admin System",
  timestamp: "Il y a 5 minutes",
}));

interface StatusDetailModalProps {
  room: RoomWithStatus;
  onClose: () => void;
}

function StatusDetailModal({ room, onClose }: StatusDetailModalProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) =>
      prev === 0 ? room.images.length - 1 : prev - 1
    );
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) =>
      prev === room.images.length - 1 ? 0 : prev + 1
    );
  };

  const getStatusBadgeStyle = (status: RoomWithStatus["status"]) => {
    switch (status) {
      case "available":
        return "bg-green-500/90 text-white";
      case "occupied":
        return "bg-red-500/90 text-white";
      case "maintenance":
        return "bg-yellow-500/90 text-white";
      case "cleaning":
        return "bg-blue-500/90 text-white";
      default:
        return "bg-gray-500/90 text-white";
    }
  };

  const getStatusText = (status: RoomWithStatus["status"]) => {
    switch (status) {
      case "available":
        return "Disponible";
      case "occupied":
        return "Occupée";
      case "maintenance":
        return "En maintenance";
      case "cleaning":
        return "En nettoyage";
      default:
        return status;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-100 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className={cn(
          "relative w-full h-full overflow-hidden cursor-pointer",
          "bg-gradient-to-b from-transparent to-black/50 backdrop-blur-sm"
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image de fond avec effet de zoom */}
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src={room.images[currentImageIndex]}
            alt={room.title}
            fill
            className={cn(
              "object-cover transition-transform duration-500",
              isHovered ? "scale-110" : "scale-100"
            )}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/90" />
        </div>

        {/* Boutons de navigation */}
        <button
          onClick={handlePrevImage}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/20 hover:bg-white/20 transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        <button
          onClick={handleNextImage}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/20 hover:bg-white/20 transition-colors"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>

        {/* Badge de statut */}
        <div className="absolute top-8 left-8 z-10">
          <Badge
            variant="secondary"
            className={cn(
              "text-sm py-2 px-4 shadow-lg backdrop-blur-sm",
              getStatusBadgeStyle(room.status)
            )}
          >
            <Clock className="w-4 h-4 mr-2" />
            {getStatusText(room.status)}
          </Badge>
        </div>

        {/* Bouton fermer */}
        <button
          onClick={onClose}
          className="absolute top-8 right-8 z-10 p-3 rounded-full bg-black/20 hover:bg-white/20 transition-colors"
        >
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Contenu principal */}
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white z-10">
          <div className="space-y-6 max-w-3xl mx-auto">
            {/* En-tête */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold">{room.title}</h2>
                <div className="flex items-center gap-4 mt-2 text-gray-300">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>
                      {room.location.quartier}, {room.location.commune}
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-300">Prix par nuit</p>
                <p className="text-2xl font-bold">{formatPrice(room.price)}</p>
              </div>
            </div>

            {/* Informations de mise à jour */}
            <div className="flex items-center justify-between text-sm text-gray-300 pt-4 border-t border-white/20">
              <span>{room.timestamp}</span>
            </div>

            {/* Bouton d'action */}
            {room.status === "available" && (
              <Button
                className={cn(
                  "w-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm",
                  "transition-all duration-300 transform hover:scale-[1.02]"
                )}
              >
                Réserver maintenant
              </Button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function RoomStatus() {
  const [rooms, setRooms] = useState<RoomWithStatus[]>(roomsWithStatus);
  const [selectedRoom, setSelectedRoom] = useState<RoomWithStatus | null>(null);

  const getStatusColor = (status: RoomWithStatus["status"]) => {
    switch (status) {
      case "available":
        return "bg-green-500";
      case "occupied":
        return "bg-red-500";
      case "maintenance":
        return "bg-yellow-500";
      case "cleaning":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <>
      <section className="py-2">
        <div className="container mx-auto px-4">
          <div className="flex gap-1 pb-3 mt-1">
            {rooms.map((room) => (
              <motion.div
                key={room.id}
                whileHover={{ scale: 1.05 }}
                className="flex-shrink-0 w-20 space-y-2 cursor-pointer"
                onClick={() => setSelectedRoom(room)}
              >
                <div className="relative">
                  <div
                    className={`size-16 rounded-full overflow-hidden ${
                      !room.isViewed ? "ring-2 ring-orange-500/60" : ""
                    }`}
                  >
                    <Image
                      src={room.images[0]}
                      alt={room.title}
                      width={80}
                      height={80}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div
                    className={`absolute bottom-0 right-2 size-5 ${getStatusColor(
                      room.status
                    )} rounded-full border-2 border-white`}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selectedRoom && (
          <StatusDetailModal
            room={selectedRoom}
            onClose={() => setSelectedRoom(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
