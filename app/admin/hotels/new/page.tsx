"use client";

import { useState } from "react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Card } from "@/src/components/ui/card";
import { ArrowLeft, Plus, Minus } from "lucide-react";
import Link from "next/link";

interface AmenityInput {
  id: string;
  value: string;
}

export default function NewHotelPage() {
  const [amenities, setAmenities] = useState<AmenityInput[]>([
    { id: "1", value: "" },
  ]);

  const addAmenity = () => {
    setAmenities([...amenities, { id: Date.now().toString(), value: "" }]);
  };

  const removeAmenity = (id: string) => {
    if (amenities.length > 1) {
      setAmenities(amenities.filter((amenity) => amenity.id !== id));
    }
  };

  const updateAmenity = (id: string, value: string) => {
    setAmenities(
      amenities.map((amenity) =>
        amenity.id === id ? { ...amenity, value } : amenity
      )
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Ici, nous ajouterons la logique pour sauvegarder l'hôtel
    console.log("Formulaire soumis");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/hotels">
          <Button variant="outline" size="icon">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          Ajouter un nouvel hôtel
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg">
          <h3 className="text-xl font-semibold mb-4">Informations générales</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Nom de l'hôtel
              </label>
              <Input
                type="text"
                placeholder="Ex: Hôtel Pullman Kinshasa"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Note
              </label>
              <Input
                type="number"
                min="0"
                max="5"
                step="0.1"
                placeholder="Ex: 4.5"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Adresse
              </label>
              <Input type="text" placeholder="Ex: 4 Avenue Batetela" required />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Quartier
              </label>
              <Input type="text" placeholder="Ex: Gombe" required />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Commune
              </label>
              <Input type="text" placeholder="Ex: Gombe" required />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Description
              </label>
              <textarea
                className="w-full px-3 py-2 border rounded-md border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:border-gray-700 dark:bg-gray-900"
                rows={3}
                placeholder="Description de l'hôtel..."
                required
              />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg">
          <h3 className="text-xl font-semibold mb-4">Contact</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Téléphone
              </label>
              <Input type="tel" placeholder="Ex: +243 999 888 777" required />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Email
              </label>
              <Input
                type="email"
                placeholder="Ex: contact@hotel.com"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Heure de check-in
              </label>
              <Input type="time" required />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Heure de check-out
              </label>
              <Input type="time" required />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold">Équipements</h3>
            <Button type="button" onClick={addAmenity} variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              Ajouter un équipement
            </Button>
          </div>

          <div className="space-y-4">
            {amenities.map((amenity) => (
              <div key={amenity.id} className="flex items-center gap-4">
                <Input
                  type="text"
                  value={amenity.value}
                  onChange={(e) => updateAmenity(amenity.id, e.target.value)}
                  placeholder="Ex: Restaurant gastronomique"
                  required
                />
                {amenities.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => removeAmenity(amenity.id)}
                    className="text-red-600 dark:text-red-400"
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>
        </Card>

        <div className="flex justify-end gap-4">
          <Link href="/admin/hotels">
            <Button variant="outline">Annuler</Button>
          </Link>
          <Button type="submit">Créer l'hôtel</Button>
        </div>
      </form>
    </div>
  );
}
