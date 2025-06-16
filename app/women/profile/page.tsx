"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import Image from "next/image";
import { cn } from "@/src/lib/utils";
import {
  Trash2,
  Plus,
  Upload,
  VideoIcon,
  Camera,
  User,
  Heart,
  Instagram,
  Phone,
} from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Textarea } from "@/src/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/src/components/ui/tabs";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/src/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog";
import { AVAILABLE_WOMENS } from "@/src/lib/usersData/women-profile";

const LOCATIONS = [
  "Gombe",
  "Lingwala",
  "Bandal",
  "Limete",
  "Masina",
  "Ndjili",
  "Matete",
];

const LANGUAGES = ["Français", "Anglais", "Lingala", "Swahili"];

const SERVICES = [
  "Massage",
  "Accompagnement",
  "Week-end",
  "Événements",
  "Soirée",
  "Voyage",
  "Dîner en ville",
  "Soirée privée",
];

// Récupérer le profil de Deborah
const deborahProfile = AVAILABLE_WOMENS.find((profile) => profile.id === "1");

export default function EditProfilePage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [activeTab, setActiveTab] = useState("profile");
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [images, setImages] = useState<string[]>(deborahProfile?.images || []);
  const [videos, setVideos] = useState<string[]>(deborahProfile?.videos || []);
  const [profileImage, setProfileImage] = useState<string>(
    deborahProfile?.images[0] || ""
  );
  const [isProfileImageDialogOpen, setIsProfileImageDialogOpen] =
    useState(false);

  // États initialisés avec les données de Deborah
  const [profileData, setProfileData] = useState({
    name: deborahProfile?.name || "",
    age: deborahProfile?.age || 0,
    description: deborahProfile?.description || "",
    localisation: deborahProfile?.localisation || "",
    price: deborahProfile?.price || 0,
    languages: deborahProfile?.languages || [],
    services: deborahProfile?.services || [],

    whatsapp: deborahProfile?.whatsapp || "",
    phone: deborahProfile?.phone || "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    // TODO: Implémenter l'upload d'images
    console.log("Upload d'image:", e.target.files);
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    // TODO: Implémenter l'upload de vidéos
    console.log("Upload de vidéo:", e.target.files);
  };

  const handleDeleteImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleDeleteVideo = (index: number) => {
    setVideos((prev) => prev.filter((_, i) => i !== index));
  };

  const handleProfileImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // TODO: Implémenter l'upload de l'image
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
    setIsProfileImageDialogOpen(false);
  };

  return (
    <div
      className={cn(
        "min-h-screen w-full transition-colors duration-300 py-4 sm:py-8 my-16",
        isDark
          ? "bg-gradient-to-b from-pink-950 to-slate-900"
          : "bg-gradient-to-b from-pink-50 to-white"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* En-tête avec message d'accueil */}

          <div className="flex items-center justify-center gap-x-6">
            {/* Section Photo de profil simplifiée */}
            <div className="flex flex-col items-center mb-8">
              <Dialog
                open={isProfileImageDialogOpen}
                onOpenChange={setIsProfileImageDialogOpen}
              >
                <DialogTrigger asChild>
                  <div className="relative group cursor-pointer">
                    <div className="relative">
                      <Avatar className="w-32 h-32 sm:w-40 sm:h-40 border-4 border-pink-100 dark:border-pink-900 shadow-lg hover:border-pink-200 dark:hover:border-pink-800 transition-all duration-300">
                        <AvatarImage
                          src={profileImage}
                          alt="Ma photo"
                          className="object-cover"
                        />
                        <AvatarFallback className="bg-pink-100 dark:bg-pink-900">
                          <Heart className="w-12 h-12 text-pink-400" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="absolute inset-0 flex items-center justify-center bg-pink-500/30 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <div className="text-white text-center">
                          <Camera className="w-8 h-8 mx-auto mb-1" />
                          <span className="text-sm">Modifier</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </DialogTrigger>

                <DialogContent className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md">
                  <DialogHeader>
                    <DialogTitle className="text-center text-pink-600 dark:text-pink-400">
                      Ma Plus Belle Photo
                    </DialogTitle>
                    <DialogDescription className="text-center">
                      Choisissez une photo qui vous met en valeur 💖
                    </DialogDescription>
                  </DialogHeader>

                  <div className="space-y-6 py-4">
                    <div className="flex justify-center">
                      <Avatar className="w-40 h-40 border-4 border-pink-200 dark:border-pink-800">
                        <AvatarImage
                          src={profileImage}
                          alt="Ma photo actuelle"
                          className="object-cover"
                        />
                        <AvatarFallback className="bg-pink-100 dark:bg-pink-900">
                          <Heart className="w-16 h-16 text-pink-400" />
                        </AvatarFallback>
                      </Avatar>
                    </div>

                    <div className="flex flex-col gap-3">
                      <Button
                        onClick={() =>
                          document
                            .getElementById("profile-image-upload")
                            ?.click()
                        }
                        className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white shadow-md hover:shadow-lg transition-all duration-300"
                      >
                        Choisir une nouvelle photo
                      </Button>
                      <input
                        id="profile-image-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleProfileImageUpload}
                      />
                      {profileImage && (
                        <Button
                          variant="outline"
                          onClick={() => {
                            setProfileImage("");
                            setIsProfileImageDialogOpen(false);
                          }}
                          className="border-pink-200 dark:border-pink-800 text-pink-700 dark:text-pink-300 hover:bg-pink-50 dark:hover:bg-pink-900/30"
                        >
                          Retirer la photo
                        </Button>
                      )}
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            <div className="mb-6">
              <h1 className="text-2xl sm:text-3xl font-bold text-pink-800 dark:text-pink-300 mb-2">
                Mon Espace Beauté
              </h1>
              <p className="text-slate-600 dark:text-slate-300">
                Personnalisez votre profil pour qu'il vous ressemble ✨
              </p>
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-white mb-2">
            Modifier mon profil
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mb-6">
            Personnalisez votre profil et gérez votre contenu
          </p>

          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="space-y-4"
          >
            <TabsList className="w-full h-auto flex flex-wrap gap-2 bg-transparent">
              <TabsTrigger
                value="media"
                className="flex-1 min-w-[120px] text-sm sm:text-base"
              >
                Médias
              </TabsTrigger>

              <TabsTrigger
                value="services"
                className="flex-1 min-w-[120px] text-sm sm:text-base"
              >
                Services
              </TabsTrigger>
              <TabsTrigger
                value="profile"
                className="flex-1 min-w-[120px] text-sm sm:text-base"
              >
                Profil
              </TabsTrigger>
            </TabsList>

            {/* Gestion des médias */}
            <TabsContent value="media">
              <Card>
                <CardHeader>
                  <CardTitle>Photos et Vidéos</CardTitle>
                  <CardDescription>
                    Gérez vos photos et vidéos de profil
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Section Photos */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">Photos</h3>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          document.getElementById("photo-upload")?.click()
                        }
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Ajouter
                      </Button>
                      <input
                        id="photo-upload"
                        type="file"
                        accept="image/*"
                        multiple
                        className="hidden"
                        onChange={handleImageUpload}
                      />
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {images.map((image, index) => (
                        <div
                          key={index}
                          className="relative group aspect-[3/4] rounded-lg overflow-hidden"
                        >
                          <Image
                            src={image}
                            alt={`Photo ${index + 1}`}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            <div className="absolute top-2 right-2">
                              <Button
                                variant="destructive"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => handleDeleteImage(index)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Section Vidéos */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">Vidéos</h3>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          document.getElementById("video-upload")?.click()
                        }
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Ajouter
                      </Button>
                      <input
                        id="video-upload"
                        type="file"
                        accept="video/*"
                        multiple
                        className="hidden"
                        onChange={handleVideoUpload}
                      />
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {videos.map((video, index) => (
                        <div
                          key={index}
                          className="relative group aspect-video rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-800"
                        >
                          <div className="absolute inset-0 flex items-center justify-center">
                            <VideoIcon className="h-8 w-8 text-slate-400" />
                          </div>
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            <div className="absolute top-2 right-2">
                              <Button
                                variant="destructive"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => handleDeleteVideo(index)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Informations du profil */}
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Informations personnelles</CardTitle>
                  <CardDescription>
                    Modifiez vos informations de base
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Nom complet</label>
                    <Input
                      name="name"
                      value={profileData.name}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Âge</label>
                    <Input
                      type="number"
                      name="age"
                      value={profileData.age}
                      onChange={handleInputChange}
                      min="18"
                      max="60"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Description</label>
                    <Textarea
                      name="description"
                      value={profileData.description}
                      onChange={handleInputChange}
                      className="min-h-[100px]"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Localisation</label>
                    <Select
                      value={profileData.localisation}
                      onValueChange={(value) =>
                        setProfileData((prev) => ({
                          ...prev,
                          localisation: value,
                        }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez votre zone" />
                      </SelectTrigger>
                      <SelectContent>
                        {LOCATIONS.map((location) => (
                          <SelectItem key={location} value={location}>
                            {location}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Prix (FC/2h)</label>
                    <Input
                      type="number"
                      name="price"
                      value={profileData.price}
                      onChange={handleInputChange}
                      min="5000"
                      step="1000"
                    />
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        WhatsApp (optionnel)
                      </label>
                      <Input
                        name="whatsapp"
                        value={profileData.whatsapp}
                        onChange={handleInputChange}
                        placeholder="+243xxxxxxxxx"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Téléphone (optionnel)
                      </label>
                      <Input
                        name="phone"
                        value={profileData.phone}
                        onChange={handleInputChange}
                        placeholder="+243xxxxxxxxx"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Services et Langues */}
            <TabsContent value="services">
              <Card>
                <CardHeader>
                  <CardTitle>Services et Langues</CardTitle>
                  <CardDescription>
                    Gérez vos services proposés et les langues parlées
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Langues */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Langues parlées</h3>
                    <div className="flex flex-wrap gap-2">
                      {LANGUAGES.map((lang) => (
                        <Button
                          key={lang}
                          variant={
                            selectedLanguages.includes(lang)
                              ? "default"
                              : "outline"
                          }
                          size="sm"
                          onClick={() => {
                            setSelectedLanguages((prev) =>
                              prev.includes(lang)
                                ? prev.filter((l) => l !== lang)
                                : [...prev, lang]
                            );
                          }}
                        >
                          {lang}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Services */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Services proposés</h3>
                    <div className="flex flex-wrap gap-2">
                      {SERVICES.map((service) => (
                        <Button
                          key={service}
                          variant={
                            selectedServices.includes(service)
                              ? "default"
                              : "outline"
                          }
                          size="sm"
                          onClick={() => {
                            setSelectedServices((prev) =>
                              prev.includes(service)
                                ? prev.filter((s) => s !== service)
                                : [...prev, service]
                            );
                          }}
                        >
                          {service}
                        </Button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Boutons d'action */}
          <div className="flex gap-4 mt-6">
            <Button variant="outline" className="flex-1">
              Annuler
            </Button>
            <Button className="flex-1">Enregistrer les modifications</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
