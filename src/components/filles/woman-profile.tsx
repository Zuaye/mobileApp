"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  Heart,
  Share2,
  MapPin,
  Star,
  Clock,
  ChevronLeft,
  MessageCircle,
  Instagram,
  Phone,
  Image as ImageIcon,
  PlayCircle,
  Library,
} from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/src/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/src/components/ui/dialog";

interface WomanProfileProps {
  profile: {
    id: string;
    name: string;
    age: number;
    description: string;
    localisation: string;
    price: number;
    rating: number;
    statut: string;
    languages: string[];
    images: string[];
    videos: string[];
    services: string[];
    instagram?: string;
    whatsapp?: string;
    phone?: string;
  };
}

export function WomanProfile({ profile }: WomanProfileProps) {
  const router = useRouter();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 mt-16">
      {/* Header avec image principale */}
      <div className="relative h-[70vh] md:h-[60vh]">
        <Button
          variant="ghost"
          className="absolute top-4 left-4 z-10 bg-black/20 hover:bg-black/40 text-white rounded-full p-2"
          onClick={() => router.back()}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>

        <div className="absolute top-4 right-4 z-10 flex gap-2">
          <Button
            variant="ghost"
            className="bg-black/20 hover:bg-black/40 text-white rounded-full p-2"
            onClick={() => setIsLiked(!isLiked)}
          >
            <Heart
              className={`h-6 w-6 ${
                isLiked ? "fill-red-500 text-red-500" : ""
              }`}
            />
          </Button>
        </div>

        <motion.img
          key={currentImageIndex}
          src={profile.images[currentImageIndex]}
          alt={profile.name}
          className="w-full h-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />

        {/* Indicateurs de navigation des photos */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1">
          {profile.images.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentImageIndex ? "bg-white w-4" : "bg-white/50"
              }`}
              onClick={() => setCurrentImageIndex(index)}
            />
          ))}
        </div>
      </div>

      {/* Informations principales */}
      <div className="px-4 py-6 space-y-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold">
              {profile.name}, {profile.age}
            </h1>
            <div className="flex items-center gap-2 mt-1 text-slate-600">
              <MapPin className="w-4 h-4" />
              <span>{profile.localisation}</span>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-full">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium text-yellow-700">
                {profile.rating}
              </span>
            </div>
            <Badge variant="outline" className="mt-2">
              <Clock className="w-3 h-3 mr-1" />
              {profile.statut}
            </Badge>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {profile.languages.map((lang, index) => (
            <Badge key={index} variant="secondary">
              {lang}
            </Badge>
          ))}
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-lg p-4">
          <h2 className="font-semibold mb-2">À propos de moi</h2>
          <p className="text-slate-600 dark:text-slate-300">
            {profile.description}
          </p>
        </div>

        {/* Tabs pour Photos et Vidéos */}
        <Tabs defaultValue="photos" className="w-full">
          <TabsList className="w-full">
            <TabsTrigger value="photos" className="flex-1">
              <ImageIcon className="w-4 h-4 mr-2" />
              Photos
            </TabsTrigger>
            <TabsTrigger value="videos" className="flex-1">
              <PlayCircle className="w-4 h-4 mr-2" />
              Vidéos
            </TabsTrigger>
          </TabsList>

          <TabsContent value="photos" className="mt-4">
            <div className="grid grid-cols-3 gap-1">
              {profile.images.map((image, index) => (
                <Dialog key={index}>
                  <DialogTrigger>
                    <div className="aspect-square overflow-hidden rounded-lg">
                      <img
                        src={image}
                        alt={`${profile.name} ${index + 1}`}
                        className="w-full h-full object-cover hover:scale-110 transition-transform"
                      />
                    </div>
                  </DialogTrigger>
                  <DialogContent className="max-w-full sm:max-w-[90vw] h-[90vh] p-0">
                    <img
                      src={image}
                      alt={`${profile.name} ${index + 1}`}
                      className="w-full h-full object-contain"
                    />
                  </DialogContent>
                </Dialog>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="videos" className="mt-4">
            <div className="grid grid-cols-2 gap-2">
              {profile.videos.map((video, index) => (
                <div
                  key={index}
                  className="aspect-video rounded-lg overflow-hidden"
                >
                  <video
                    src={video}
                    controls
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Services */}
        <div className="bg-white dark:bg-slate-800 rounded-lg p-4">
          <h2 className="font-semibold mb-3">Services</h2>
          <div className="flex flex-wrap gap-2">
            {profile.services.map((service, index) => (
              <Badge key={index} variant="outline">
                {service}
              </Badge>
            ))}
          </div>
        </div>

        {/* Prix */}
        <div className="bg-white dark:bg-slate-800 rounded-lg p-4">
          <h2 className="font-semibold mb-2">Tarifs</h2>
          <div className="text-2xl font-bold text-primary">
            {profile.price.toLocaleString()} FC
            <span className="text-sm font-normal text-slate-600 dark:text-slate-400">
              /2h
            </span>
          </div>
        </div>
      </div>

      {/* Boutons de contact fixes en bas */}
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-800 border-t dark:border-slate-700 p-4 flex gap-2">
        {profile.instagram && (
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => window.open(profile.instagram, "_blank")}
          >
            <Instagram className="w-5 h-5" />
          </Button>
        )}
        {profile.whatsapp && (
          <Button
            variant="outline"
            className="flex-1"
            onClick={() =>
              window.open(`https://wa.me/${profile.whatsapp}`, "_blank")
            }
          >
            <Library className="w-5 h-5" />
          </Button>
        )}
        {profile.phone && (
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => window.open(`tel:${profile.phone}`)}
          >
            <Phone className="w-5 h-5" />
          </Button>
        )}
        <Button className="flex-1">
          <MessageCircle className="w-5 h-5 mr-2" />
          Message
        </Button>
      </div>
    </div>
  );
}
