"use client";

import { useParams, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/src/lib/utils";
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  Heart,
  Share2,
  Check,
  Calendar,
  Phone,
  Mail,
  Clock,
  Wifi,
  Coffee,
  Tv,
  ArrowLeft,
  Star,
} from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/src/components/ui/tabs";
import { getAllRooms, formatPrice, HOTELS } from "@/src/lib/utils";
import { LoaderView } from "@/src/components/Loader/loader-view";

export default function RoomDetail() {
  const params = useParams();
  const router = useRouter();
  const { theme } = useTheme();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  // Trouver la chambre et l'hôtel correspondants
  const roomId = params.id as string;
  const allRooms = getAllRooms();
  const room = allRooms.find((r) => r.id === roomId);
  const hotel = room ? HOTELS.find((h) => h.rooms.includes(room)) : null;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || isLoading) {
    return <LoaderView />;
  }

  if (!room || !hotel) {
    return (
      <div className="min-h-[80vh] mt-24 w-full rounded-3xl mx-auto max-w-[96%] bg-slate-900 flex flex-col items-center justify-center text-white p-4">
        <h1 className="text-3xl font-bold mb-4">Chambre non trouvée</h1>
        <p className="mb-8">
          Désolé, nous n'avons pas pu trouver la chambre que vous recherchez.
        </p>
        <Button
          onClick={() => router.push("/rooms")}
          className="bg-primary hover:bg-primary/90 text-white"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour aux chambres
        </Button>
      </div>
    );
  }

  const nextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % room.images.length);
  };

  const prevImage = () => {
    setActiveImageIndex(
      (prev) => (prev - 1 + room.images.length) % room.images.length
    );
  };

  const isDark = theme === "dark";

  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case "wifi haut débit":
      case "wifi gratuit":
        return <Wifi className="h-5 w-5" />;
      case "service de chambre":
      case "room service":
        return <Coffee className="h-5 w-5" />;
      case "tv led 4k":
      case "tv led":
        return <Tv className="h-5 w-5" />;
      default:
        return <Check className="h-5 w-5" />;
    }
  };

  return (
    <div
      className={cn(
        "min-h-screen w-full transition-colors duration-300 mt-18",
        isDark
          ? "bg-gradient-to-b from-slate-900 to-slate-800"
          : "bg-gradient-to-b from-slate-50 to-white"
      )}
    >
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[5%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[10%] right-[5%] w-[30%] h-[30%] bg-primary/15 rounded-full blur-[80px]"></div>
      </div>

      {/* Image carousel */}
      <div className="relative w-full h-[40vh] sm:h-[50vh] md:h-[60vh] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeImageIndex}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0"
          >
            <Image
              src={room.images[activeImageIndex]}
              alt={`${room.title} - Image ${activeImageIndex + 1}`}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30"></div>
          </motion.div>
        </AnimatePresence>

        {/* Status badge */}
        <div className="absolute top-4 left-4 z-10">
          <Badge className="bg-primary hover:bg-primary/90">
            {room.availableFrom}
          </Badge>
        </div>

        {/* Price overlay */}
        <div className="absolute bottom-4 right-4 z-10">
          <div className="bg-black/50 backdrop-blur-sm px-3 py-2 rounded-lg">
            <span className="text-lg sm:text-xl font-bold text-primary">
              {formatPrice(room.price)}
            </span>
            <span className="text-white text-sm ml-1">/ {room.duration}h</span>
          </div>
        </div>

        {/* Navigation arrows */}
        <button
          onClick={prevImage}
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 backdrop-blur-md text-white p-2 sm:p-3 rounded-full transition-all duration-300 border border-white/20"
        >
          <ChevronLeft className="h-4 w-4 sm:h-6 sm:w-6" />
        </button>
        <button
          onClick={nextImage}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 backdrop-blur-md text-white p-2 sm:p-3 rounded-full transition-all duration-300 border border-white/20"
        >
          <ChevronRight className="h-4 w-4 sm:h-6 sm:w-6" />
        </button>

        {/* Image indicators */}
        <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-1 sm:gap-2 z-10">
          {room.images.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveImageIndex(index)}
              className={cn(
                "h-1 sm:h-1.5 rounded-full transition-all duration-300",
                activeImageIndex === index
                  ? "w-6 sm:w-8 bg-primary"
                  : "w-3 sm:w-4 bg-white/50 hover:bg-white/70"
              )}
            />
          ))}
        </div>
      </div>

      {/* Room title section */}
      <div className="container mx-auto px-4 pt-4 pb-2 relative z-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-3xl font-bold text-slate-800 dark:text-white mb-1">
              {room.title}
            </h1>
            <div className="flex items-center text-slate-600 dark:text-slate-300 text-sm sm:text-base">
              <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
              <span className="truncate">
                {hotel.name} - {hotel.location.quartier},{" "}
                {hotel.location.commune}
              </span>
            </div>
          </div>
          <div className="flex mt-3 md:mt-0 space-x-2">
            <Button
              variant="outline"
              size="sm"
              className="rounded-full bg-white/10 dark:bg-black/20 border-white/20 dark:border-white/10"
            >
              <Heart className="h-4 w-4 mr-1" />
              <span className="text-xs sm:text-sm">Favoris</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="rounded-full bg-white/10 dark:bg-black/20 border-white/20 dark:border-white/10"
            >
              <Share2 className="h-4 w-4 mr-1" />
              <span className="text-xs sm:text-sm">Partager</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Thumbnails */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="bg-white/10 dark:bg-black/20 backdrop-blur-lg rounded-xl p-3 flex gap-2 overflow-x-auto hide-scrollbar">
          {room.images.map((image, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveImageIndex(index)}
              className={cn(
                "relative h-12 w-16 sm:h-16 sm:w-24 flex-shrink-0 rounded-lg overflow-hidden transition-all duration-300",
                activeImageIndex === index
                  ? "ring-2 ring-primary -translate-y-2"
                  : "ring-1 ring-white/20 hover:-translate-y-1"
              )}
            >
              <Image
                src={image}
                alt={`Thumbnail ${index + 1}`}
                fill
                className="object-cover"
              />
              {activeImageIndex === index && (
                <div className="absolute inset-0 bg-primary/20"></div>
              )}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column - Details */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="backdrop-blur-md bg-white/10 dark:bg-black/20 rounded-xl overflow-hidden border border-white/10"
            >
              <Tabs defaultValue="details" className="w-full">
                <TabsList className="w-full bg-white/10 dark:bg-black/30 p-0 h-auto">
                  <TabsTrigger
                    value="details"
                    className="flex-1 py-3 data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
                  >
                    Détails
                  </TabsTrigger>
                  <TabsTrigger
                    value="amenities"
                    className="flex-1 py-3 data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
                  >
                    Équipements
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="details" className="mt-0 p-6">
                  <h3 className="text-xl font-bold mb-4">Description</h3>
                  <p className="text-slate-600 dark:text-slate-300 mb-6">
                    {room.description}
                  </p>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-white/20 dark:bg-white/5 backdrop-blur-sm p-4 rounded-lg">
                      <div className="text-primary mb-1 text-sm">Type</div>
                      <div className="font-semibold">{room.type}</div>
                    </div>
                    <div className="bg-white/20 dark:bg-white/5 backdrop-blur-sm p-4 rounded-lg">
                      <div className="text-primary mb-1 text-sm">Surface</div>
                      <div className="font-semibold">{room.size}</div>
                    </div>
                    <div className="bg-white/20 dark:bg-white/5 backdrop-blur-sm p-4 rounded-lg">
                      <div className="text-primary mb-1 text-sm">Capacité</div>
                      <div className="font-semibold">
                        {room.capacity} personnes
                      </div>
                    </div>
                    <div className="bg-white/20 dark:bg-white/5 backdrop-blur-sm p-4 rounded-lg">
                      <div className="text-primary mb-1 text-sm">Durée</div>
                      <div className="font-semibold">{room.duration}h</div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="amenities" className="mt-0 p-6">
                  <h3 className="text-xl font-bold mb-4">Équipements</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {room.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center gap-2">
                        {getAmenityIcon(amenity)}
                        <span>{amenity}</span>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </motion.div>
          </div>

          {/* Right column - Booking */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="backdrop-blur-md bg-white/10 dark:bg-black/20 p-6 rounded-xl sticky top-4 border border-white/10"
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <Badge className="mb-2 bg-primary">{room.type}</Badge>
                  <h2 className="text-2xl font-bold mb-2">Réservation</h2>
                  <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{room.duration}h</span>
                    </div>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 mr-1 text-yellow-400 fill-current" />
                      <span>{room.rating}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-b border-slate-200 dark:border-slate-700 py-6 my-6">
                <div className="text-3xl font-bold text-primary mb-2">
                  {formatPrice(room.price)}
                </div>
                <div className="flex items-center text-slate-600 dark:text-slate-300 text-sm">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>Disponible {room.availableFrom}</span>
                </div>
              </div>

              <div className="space-y-4">
                <Button className="w-full bg-primary hover:bg-primary/90 text-white">
                  Réserver maintenant
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-primary text-primary hover:bg-primary/10"
                >
                  <Phone className="h-4 w-4 mr-2" />
                  {hotel.contact.phone}
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-slate-300 dark:border-slate-600"
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Contacter par email
                </Button>
              </div>

              <div className="mt-6 bg-white/20 dark:bg-white/5 backdrop-blur-sm p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Hôtel</h3>
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-full bg-primary/20 mr-3"></div>
                  <div>
                    <div className="font-medium">{hotel.name}</div>
                    <div className="text-sm text-slate-600 dark:text-slate-300">
                      {hotel.location.address}, {hotel.location.quartier}
                    </div>
                  </div>
                </div>
                <div className="mt-3 text-sm text-slate-600 dark:text-slate-300">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>
                      Check-in: {hotel.checkIn} - Check-out: {hotel.checkOut}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
