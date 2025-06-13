"use client";

import { useState } from "react";
import { Camera, Save, Lock, Bell } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";

import { Card } from "../ui/card";

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  avatar?: string;
}

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<UserProfile>({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+237 6XX XXX XXX",
    city: "Douala",
    avatar: "/avatars/default.jpg",
  });

  // const handleProfileUpdate = () => {
  //   // Logique de mise à jour du profil
  //   toast.success(
  //     "Profil mis à jour Vos informations ont été mises à jour avec succès."
  //   );
  //   setIsEditing(false);
  // };

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Logique de téléchargement de l'avatar
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile((prev) => ({
          ...prev,
          avatar: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Mon Profil
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Gérez vos informations personnelles
          </p>
        </div>
        <Button
          variant={isEditing ? "default" : "outline"}
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? (
            <>
              <Save className="h-4 w-4 mr-2" />
              Enregistrer
            </>
          ) : (
            "Modifier le profil"
          )}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Informations principales */}
        <Card className="lg:col-span-2 p-6">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">
            Informations personnelles
          </h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-slate-600 dark:text-slate-400">
                  Prénom
                </label>
                <Input
                  value={profile.firstName}
                  onChange={(e) =>
                    setProfile((prev) => ({
                      ...prev,
                      firstName: e.target.value,
                    }))
                  }
                  disabled={!isEditing}
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm text-slate-600 dark:text-slate-400">
                  Nom
                </label>
                <Input
                  value={profile.lastName}
                  onChange={(e) =>
                    setProfile((prev) => ({
                      ...prev,
                      lastName: e.target.value,
                    }))
                  }
                  disabled={!isEditing}
                  className="mt-1"
                />
              </div>
            </div>
            <div>
              <label className="text-sm text-slate-600 dark:text-slate-400">
                Email
              </label>
              <Input
                value={profile.email}
                onChange={(e) =>
                  setProfile((prev) => ({ ...prev, email: e.target.value }))
                }
                disabled={!isEditing}
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-sm text-slate-600 dark:text-slate-400">
                Téléphone
              </label>
              <Input
                value={profile.phone}
                onChange={(e) =>
                  setProfile((prev) => ({ ...prev, phone: e.target.value }))
                }
                disabled={!isEditing}
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-sm text-slate-600 dark:text-slate-400">
                Ville
              </label>
              <Input
                value={profile.city}
                onChange={(e) =>
                  setProfile((prev) => ({ ...prev, city: e.target.value }))
                }
                disabled={!isEditing}
                className="mt-1"
              />
            </div>
          </div>
        </Card>

        {/* Avatar et actions rapides */}
        <div className="space-y-6">
          <Card className="p-6">
            <div className="flex flex-col items-center">
              <div className="relative">
                <Avatar className="h-32 w-32">
                  <AvatarImage src={profile.avatar} />
                  <AvatarFallback>
                    {profile.firstName[0]}
                    {profile.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                {isEditing && (
                  <label
                    htmlFor="avatar-upload"
                    className="absolute bottom-0 right-0 p-2 bg-blue-500 text-white rounded-full cursor-pointer hover:bg-blue-600"
                  >
                    <Camera className="h-4 w-4" />
                    <input
                      id="avatar-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleAvatarChange}
                    />
                  </label>
                )}
              </div>
              <h3 className="mt-4 text-lg font-medium text-slate-900 dark:text-white">
                {profile.firstName} {profile.lastName}
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                {profile.city}
              </p>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
              Actions rapides
            </h3>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <Lock className="h-4 w-4 mr-2" />
                Changer le mot de passe
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Bell className="h-4 w-4 mr-2" />
                Préférences de notification
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
