"use client";

import { useState } from "react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { RoomType } from "@/src/types";

export function HotelSearch() {
  const [location, setLocation] = useState("");
  const [duration, setDuration] = useState("1");
  const [roomType, setRoomType] = useState<RoomType>(RoomType.STANDARD);

  const handleSearch = () => {
    // Implement search logic
    console.log({ location, duration, roomType });
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-card rounded-lg shadow-lg p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="space-y-2">
          <Label htmlFor="location">Localisation</Label>
          <Input
            id="location"
            placeholder="Quartier, ville..."
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="duration">Durée (heures)</Label>
          <Select value={duration} onValueChange={setDuration}>
            <SelectTrigger>
              <SelectValue placeholder="Sélectionnez la durée" />
            </SelectTrigger>
            <SelectContent>
              {[1, 2, 3, 4, 5, 6].map((hours) => (
                <SelectItem key={hours} value={hours.toString()}>
                  {hours} heure{hours > 1 ? "s" : ""}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="room-type">Type de chambre</Label>
          <Select
            value={roomType}
            onValueChange={(value) => setRoomType(value as RoomType)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Sélectionnez le type" />
            </SelectTrigger>
            <SelectContent>
              {Object.values(RoomType).map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="mt-6 flex justify-center">
        <Button
          size="lg"
          className="w-full md:w-auto px-8"
          onClick={handleSearch}
        >
          Rechercher une chambre
        </Button>
      </div>
    </div>
  );
}
