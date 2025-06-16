"use client";

import AdminContainer from "@/src/components/admin-components/admin-container";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Textarea } from "@/src/components/ui/textarea";
import { useState } from "react";
import { Badge } from "@/src/components/ui/badge";
import { X, Plus, Upload, ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function NewWomanProfilePage() {
  const [formData, setFormData] = useState({
    name: "",
    age: "18",
    description: "",
    localisation: "",
    price: "5000",
    phone: "",
    whatsapp: "",
  });

  const [languages, setLanguages] = useState<string[]>([]);
  const [newLanguage, setNewLanguage] = useState("");
  const [services, setServices] = useState<string[]>([]);
  const [newService, setNewService] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [videos, setVideos] = useState<File[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name) newErrors.name = "Le nom est requis";
    if (!formData.description)
      newErrors.description = "La description est requise";
    if (!formData.localisation)
      newErrors.localisation = "La localisation est requise";
    if (parseInt(formData.age) < 18)
      newErrors.age = "L'âge minimum est de 18 ans";
    if (parseInt(formData.price) < 5000)
      newErrors.price = "Le prix minimum est de 5000 CDF";
    if (languages.length === 0)
      newErrors.languages = "Au moins une langue est requise";
    if (services.length === 0)
      newErrors.services = "Au moins un service est requis";
    if (images.length === 0)
      newErrors.images = "Au moins une photo est requise";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      // TODO: Implement profile creation
      console.log({
        ...formData,
        age: parseInt(formData.age),
        price: parseInt(formData.price),
        languages,
        services,
        images,
        videos,
      });
    }
  };

  const handleAddLanguage = () => {
    if (newLanguage && !languages.includes(newLanguage)) {
      setLanguages([...languages, newLanguage]);
      setNewLanguage("");
      if (errors.languages) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors.languages;
          return newErrors;
        });
      }
    }
  };

  const handleRemoveLanguage = (lang: string) => {
    setLanguages(languages.filter((l) => l !== lang));
  };

  const handleAddService = () => {
    if (newService && !services.includes(newService)) {
      setServices([...services, newService]);
      setNewService("");
      if (errors.services) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors.services;
          return newErrors;
        });
      }
    }
  };

  const handleRemoveService = (service: string) => {
    setServices(services.filter((s) => s !== service));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages([...images, ...Array.from(e.target.files)]);
      if (errors.images) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors.images;
          return newErrors;
        });
      }
    }
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setVideos([...videos, ...Array.from(e.target.files)]);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link
          href="/admin/women"
          className="flex items-center gap-1 hover:text-foreground transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Retour à la liste des profils
        </Link>
      </div>

      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          Ajouter un nouveau profil
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Remplissez les informations ci-dessous pour créer un nouveau profil.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <AdminContainer>
          <h2 className="text-xl font-semibold mb-4">Informations générales</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Nom complet</label>
              <Input
                name="name"
                placeholder="Ex: Sarah Smith"
                value={formData.name}
                onChange={handleInputChange}
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Âge</label>
              <Input
                name="age"
                type="number"
                min={18}
                max={60}
                value={formData.age}
                onChange={handleInputChange}
              />
              {errors.age && (
                <p className="text-sm text-red-500">{errors.age}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Localisation</label>
              <Input
                name="localisation"
                placeholder="Ex: Gombe"
                value={formData.localisation}
                onChange={handleInputChange}
              />
              {errors.localisation && (
                <p className="text-sm text-red-500">{errors.localisation}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Prix (CDF)</label>
              <Input
                name="price"
                type="number"
                min={5000}
                value={formData.price}
                onChange={handleInputChange}
              />
              {errors.price && (
                <p className="text-sm text-red-500">{errors.price}</p>
              )}
            </div>
          </div>
        </AdminContainer>

        <AdminContainer>
          <h2 className="text-xl font-semibold mb-4">Description</h2>
          <div className="space-y-2">
            <Textarea
              name="description"
              placeholder="Décrivez le profil en détail..."
              className="min-h-[150px]"
              value={formData.description}
              onChange={handleInputChange}
            />
            <p className="text-sm text-gray-500">
              Soyez descriptif et professionnel.
            </p>
            {errors.description && (
              <p className="text-sm text-red-500">{errors.description}</p>
            )}
          </div>
        </AdminContainer>

        <AdminContainer>
          <h2 className="text-xl font-semibold mb-4">Langues parlées</h2>
          <div className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="Ajouter une langue..."
                value={newLanguage}
                onChange={(e) => setNewLanguage(e.target.value)}
              />
              <Button
                type="button"
                variant="outline"
                onClick={handleAddLanguage}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {languages.map((lang) => (
                <Badge
                  key={lang}
                  variant="secondary"
                  className="flex items-center gap-1"
                >
                  {lang}
                  <button
                    type="button"
                    onClick={() => handleRemoveLanguage(lang)}
                    className="ml-1 hover:text-red-500"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
            {errors.languages && (
              <p className="text-sm text-red-500">{errors.languages}</p>
            )}
          </div>
        </AdminContainer>

        <AdminContainer>
          <h2 className="text-xl font-semibold mb-4">Services proposés</h2>
          <div className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="Ajouter un service..."
                value={newService}
                onChange={(e) => setNewService(e.target.value)}
              />
              <Button
                type="button"
                variant="outline"
                onClick={handleAddService}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {services.map((service) => (
                <Badge
                  key={service}
                  variant="secondary"
                  className="flex items-center gap-1"
                >
                  {service}
                  <button
                    type="button"
                    onClick={() => handleRemoveService(service)}
                    className="ml-1 hover:text-red-500"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
            {errors.services && (
              <p className="text-sm text-red-500">{errors.services}</p>
            )}
          </div>
        </AdminContainer>

        <AdminContainer>
          <h2 className="text-xl font-semibold mb-4">Contact</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Numéro de téléphone</label>
              <Input
                name="phone"
                placeholder="Ex: +243 123 456 789"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">WhatsApp</label>
              <Input
                name="whatsapp"
                placeholder="Ex: +243 123 456 789"
                value={formData.whatsapp}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </AdminContainer>

        <AdminContainer>
          <h2 className="text-xl font-semibold mb-4">Médias</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium mb-2">Photos</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {images.map((image, index) => (
                  <div
                    key={index}
                    className="aspect-square rounded-lg border-2 border-dashed border-gray-200 dark:border-gray-700 relative"
                  >
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`Upload ${index + 1}`}
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setImages(images.filter((_, i) => i !== index))
                      }
                      className="absolute top-2 right-2 p-1 bg-red-500 rounded-full text-white hover:bg-red-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <label className="aspect-square rounded-lg border-2 border-dashed border-gray-200 dark:border-gray-700 flex items-center justify-center cursor-pointer hover:border-gray-300 dark:hover:border-gray-600">
                  <div className="text-center">
                    <Upload className="w-6 h-6 mx-auto text-gray-400" />
                    <span className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                      Ajouter
                    </span>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </label>
              </div>
              {errors.images && (
                <p className="text-sm text-red-500 mt-2">{errors.images}</p>
              )}
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2">Vidéos</h3>
              <div className="grid grid-cols-2 gap-4">
                {videos.map((video, index) => (
                  <div
                    key={index}
                    className="aspect-video rounded-lg border-2 border-dashed border-gray-200 dark:border-gray-700 relative"
                  >
                    <video
                      src={URL.createObjectURL(video)}
                      className="w-full h-full object-cover rounded-lg"
                      controls
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setVideos(videos.filter((_, i) => i !== index))
                      }
                      className="absolute top-2 right-2 p-1 bg-red-500 rounded-full text-white hover:bg-red-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <label className="aspect-video rounded-lg border-2 border-dashed border-gray-200 dark:border-gray-700 flex items-center justify-center cursor-pointer hover:border-gray-300 dark:hover:border-gray-600">
                  <div className="text-center">
                    <Upload className="w-6 h-6 mx-auto text-gray-400" />
                    <span className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                      Ajouter
                    </span>
                  </div>
                  <input
                    type="file"
                    accept="video/*"
                    multiple
                    className="hidden"
                    onChange={handleVideoUpload}
                  />
                </label>
              </div>
            </div>
          </div>
        </AdminContainer>

        <div className="flex justify-end gap-3">
          <Button type="button" variant="outline">
            Annuler
          </Button>
          <Button type="submit">Créer le profil</Button>
        </div>
      </form>
    </div>
  );
}
