"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Card } from "@/src/components/ui/card";
import { ArrowLeft, Plus, Minus, Upload } from "lucide-react";
import Link from "next/link";
import { HOTELS } from "@/src/lib/usersData/hotelData";

interface FeatureInput {
  id: string;
  value: string;
}

interface ImageInput {
  id: string;
  url: string;
}

export default function NewRoomPage() {
  const { hotelId } = useParams();
  const router = useRouter();
  const hotel = HOTELS.find((h) => h.id === hotelId);

  const [features, setFeatures] = useState<FeatureInput[]>([
    { id: "1", value: "" },
  ]);
  const [amenities, setAmenities] = useState<FeatureInput[]>([
    { id: "1", value: "" },
  ]);
  const [images, setImages] = useState<ImageInput[]>([{ id: "1", url: "" }]);

  const addItem = (items: any[], setItems: Function) => {
    setItems([...items, { id: Date.now().toString(), value: "" }]);
  };

  const removeItem = (items: any[], setItems: Function, id: string) => {
    if (items.length > 1) {
      setItems(items.filter((item) => item.id !== id));
    }
  };

  const updateItem = (
    items: any[],
    setItems: Function,
    id: string,
    value: string
  ) => {
    setItems(items.map((item) => (item.id === id ? { ...item, value } : item)));
  };

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Ici, nous ajouterons la logique pour sauvegarder la chambre
    console.log("Formulaire soumis");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href={`/admin/hotels/${hotelId}`}>
          <Button variant="outline" size="icon">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Ajouter une nouvelle chambre
          </h2>
          <p className="text-gray-500 dark:text-gray-400">{hotel.name}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg">
          <h3 className="text-xl font-semibold mb-4">Informations générales</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Titre de la chambre
              </label>
              <Input
                type="text"
                placeholder="Ex: Suite Présidentielle"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Type
              </label>
              <Input type="text" placeholder="Ex: deluxe" required />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Prix
              </label>
              <Input type="number" placeholder="Ex: 350000" required />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Taille (m²)
              </label>
              <Input type="text" placeholder="Ex: 65" required />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Capacité (personnes)
              </label>
              <Input type="number" min="1" placeholder="Ex: 2" required />
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

            <div className="col-span-2 space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Description
              </label>
              <textarea
                className="w-full px-3 py-2 border rounded-md border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:border-gray-700 dark:bg-gray-900"
                rows={3}
                placeholder="Description de la chambre..."
                required
              />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold">Images</h3>
            <Button
              type="button"
              onClick={() => addItem(images, setImages)}
              variant="outline"
            >
              <Plus className="w-4 h-4 mr-2" />
              Ajouter une image
            </Button>
          </div>

          <div className="space-y-4">
            {images.map((image) => (
              <div key={image.id} className="flex items-center gap-4">
                <div className="flex-1 relative">
                  <Input
                    type="text"
                    value={image.url}
                    onChange={(e) =>
                      updateItem(images, setImages, image.id, e.target.value)
                    }
                    placeholder="URL de l'image"
                    required
                  />
                  <Upload className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                </div>
                {images.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => removeItem(images, setImages, image.id)}
                    className="text-red-600 dark:text-red-400"
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold">Équipements</h3>
            <Button
              type="button"
              onClick={() => addItem(amenities, setAmenities)}
              variant="outline"
            >
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
                  onChange={(e) =>
                    updateItem(
                      amenities,
                      setAmenities,
                      amenity.id,
                      e.target.value
                    )
                  }
                  placeholder="Ex: Lit King Size Premium"
                  required
                />
                {amenities.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() =>
                      removeItem(amenities, setAmenities, amenity.id)
                    }
                    className="text-red-600 dark:text-red-400"
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold">
              Caractéristiques spéciales
            </h3>
            <Button
              type="button"
              onClick={() => addItem(features, setFeatures)}
              variant="outline"
            >
              <Plus className="w-4 h-4 mr-2" />
              Ajouter une caractéristique
            </Button>
          </div>

          <div className="space-y-4">
            {features.map((feature) => (
              <div key={feature.id} className="flex items-center gap-4">
                <Input
                  type="text"
                  value={feature.value}
                  onChange={(e) =>
                    updateItem(
                      features,
                      setFeatures,
                      feature.id,
                      e.target.value
                    )
                  }
                  placeholder="Ex: Vue panoramique"
                  required
                />
                {features.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() =>
                      removeItem(features, setFeatures, feature.id)
                    }
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
          <Link href={`/admin/hotels/${hotelId}`}>
            <Button variant="outline">Annuler</Button>
          </Link>
          <Button type="submit">Créer la chambre</Button>
        </div>
      </form>
    </div>
  );
}
