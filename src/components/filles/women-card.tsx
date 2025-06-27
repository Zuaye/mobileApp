import { useState } from "react";
import { cn } from "@/src/lib/utils";
import { Card } from "../ui/card";
import { Clock, Heart, MapPin, Star } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { AVAILABLE_WOMENS } from "@/src/lib/usersData/women-profile";

interface ProfileCardProps {
  profile: (typeof AVAILABLE_WOMENS)[0];
  onProfileClick: (id: string) => void;
}

export const ProfileCard = ({ profile, onProfileClick }: ProfileCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      className={cn(
        "group relative overflow-hidden transition-all duration-500 ease-out cursor-pointer",
        "bg-gradient-to-b from-transparent to-black/50",
        "border-0 rounded-2xl h-[420px] w-[280px] md:w-[320px]"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onProfileClick(profile.id)}
    >
      {/* Image de fond avec effet de zoom au hover */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={profile.images[0]}
          alt={profile.name}
          className={cn(
            "w-full h-full object-cover transition-transform duration-500",
            isHovered ? "scale-110" : "scale-100"
          )}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/90" />
      </div>

      {/* Badge de statut */}
      <div className="absolute top-4 left-4 z-10">
        <Badge
          variant="secondary"
          className="bg-white/90 text-primary shadow-lg backdrop-blur-sm"
        >
          <Clock className="w-3 h-3 mr-1" />
          {profile.statut}
        </Badge>
      </div>

      {/* Bouton favori */}
      <button className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/20 hover:bg-primary/90 transition-colors">
        <Heart className="w-4 h-4 text-white" />
      </button>

      {/* Contenu principal */}
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-10">
        <div className="space-y-4">
          {/* En-tête du profil */}
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold">{profile.name}</h3>
              <p className="text-sm text-gray-300">{profile.age} ans</p>
            </div>
          </div>

          {/* Informations de localisation et prix */}
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span className="text-gray-200">{profile.localisation}</span>
            </div>
            <div className="flex items-center gap-1 bg-white/10 px-2 py-1 rounded-full backdrop-blur-sm">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{profile.rating}</span>
            </div>
          </div>

          {/* Langues */}
          <div className="flex flex-wrap gap-2">
            {profile.languages.map((lang, index) => (
              <Badge
                key={index}
                variant="outline"
                className="bg-white/10 border-white/20 text-white backdrop-blur-sm"
              >
                {lang}
              </Badge>
            ))}
          </div>

          {/* Bouton de contact */}
          <Button
            className={cn(
              "w-full bg-primary/90 hover:bg-primary transition-colors",
              "group-hover:translate-y-0 translate-y-2 transition-transform duration-500"
            )}
          >
            Contacter maintenant
          </Button>
        </div>
      </div>
    </Card>
  );
};
