import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Types pour les hôtels et les chambres
export interface Room {
  id: string;
  title: string;
  type: string;
  price: number;
  priceUnit: string;
  size: string;
  capacity: number;
  images: string[];
  description: string;
  amenities: string[];
  available: boolean;
  availableFrom: string;
  duration: number;
  rating: number;
  features: string[];
}

export interface Hotel {
  id: string;
  name: string;
  description: string;
  location: {
    address: string;
    quartier: string;
    commune: string;
    city: string;
    country: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  rating: number;
  images: string[];
  amenities: string[];
  rooms: Room[];
  contact: {
    phone: string;
    email: string;
    website?: string;
  };
  checkIn: string;
  checkOut: string;
}

// Données de test pour les hôtels
export const HOTELS: Hotel[] = [
  {
    id: "hotel-1",
    name: "Hôtel Pullman Kinshasa",
    description:
      "Un établissement de luxe au cœur de Kinshasa, offrant une expérience unique avec une vue imprenable sur le fleuve Congo.",
    location: {
      address: "4 Avenue Batetela",
      quartier: "Gombe",
      commune: "Gombe",
      city: "Kinshasa",
      country: "RD Congo",
      coordinates: {
        lat: -4.3097,
        lng: 15.2962,
      },
    },
    rating: 4.8,
    images: [
      "/images/hotels/pullman-1.jpg",
      "/images/hotels/pullman-2.jpg",
      "/images/hotels/pullman-3.jpg",
    ],
    amenities: [
      "Piscine",
      "Spa",
      "Restaurant",
      "Bar",
      "Salle de sport",
      "WiFi gratuit",
      "Service de chambre 24/7",
      "Navette aéroport",
    ],
    rooms: [
      {
        id: "room-1",
        title: "Suite Exécutive Vue Fleuve",
        type: "Suite",
        price: 250000,
        priceUnit: "CDF",
        size: "45m²",
        capacity: 2,
        images: [
          "/images/rooms/suite-1.jpg",
          "/images/rooms/suite-2.jpg",
          "/images/rooms/suite-3.jpg",
        ],
        description:
          "Suite élégante avec vue panoramique sur le fleuve Congo, parfaite pour les voyageurs d'affaires exigeants.",
        amenities: [
          "Lit King Size",
          "Salle de bain luxueuse",
          "Climatisation",
          "TV LED 4K",
          "Mini-bar",
          "Coffre-fort",
          "Bureau de travail",
          "Accès au Lounge Exécutif",
        ],
        available: true,
        availableFrom: "Maintenant",
        duration: 3,
        rating: 4.9,
        features: [
          "Vue sur le fleuve",
          "Room Service 24/7",
          "Internet haut débit",
          "Petit-déjeuner inclus",
        ],
      },
      {
        id: "room-2",
        title: "Chambre Deluxe",
        type: "Deluxe",
        price: 180000,
        priceUnit: "CDF",
        size: "35m²",
        capacity: 2,
        images: ["/images/rooms/deluxe-1.jpg", "/images/rooms/deluxe-2.jpg"],
        description:
          "Chambre moderne et confortable avec vue sur la ville, équipée pour répondre aux besoins des voyageurs modernes.",
        amenities: [
          "Lit Queen Size",
          "Salle de bain privée",
          "Climatisation",
          "TV LED",
          "Mini-bar",
          "WiFi haut débit",
        ],
        available: true,
        availableFrom: "Maintenant",
        duration: 3,
        rating: 4.7,
        features: [
          "Vue ville",
          "Room Service",
          "WiFi gratuit",
          "Petit-déjeuner disponible",
        ],
      },
    ],
    contact: {
      phone: "+243 815 555 555",
      email: "contact@pullmankinshasa.cd",
      website: "www.pullmankinshasa.cd",
    },
    checkIn: "14:00",
    checkOut: "12:00",
  },
  {
    id: "hotel-2",
    name: "Résidence Matonge",
    description:
      "Un havre de paix moderne dans le quartier vibrant de Matonge, proposant des chambres confortables et un service personnalisé.",
    location: {
      address: "17 Avenue du Commerce",
      quartier: "Matonge",
      commune: "Kalamu",
      city: "Kinshasa",
      country: "RD Congo",
      coordinates: {
        lat: -4.325,
        lng: 15.3139,
      },
    },
    rating: 4.5,
    images: ["/images/hotels/matonge-1.jpg", "/images/hotels/matonge-2.jpg"],
    amenities: [
      "Restaurant",
      "Bar",
      "WiFi gratuit",
      "Parking sécurisé",
      "Service de chambre",
      "Générateur 24/7",
    ],
    rooms: [
      {
        id: "room-3",
        title: "Chambre Standard Confort",
        type: "Standard",
        price: 100000,
        priceUnit: "CDF",
        size: "25m²",
        capacity: 2,
        images: [
          "/images/rooms/standard-1.jpg",
          "/images/rooms/standard-2.jpg",
        ],
        description:
          "Chambre confortable idéale pour les voyageurs cherchant un bon rapport qualité-prix au cœur de Matonge.",
        amenities: [
          "Lit Double",
          "Salle de bain privée",
          "Climatisation",
          "TV",
          "Bureau",
          "WiFi",
        ],
        available: true,
        availableFrom: "Maintenant",
        duration: 3,
        rating: 4.3,
        features: ["Quartier animé", "WiFi gratuit", "Sécurité 24/7"],
      },
      {
        id: "room-4",
        title: "Suite Familiale",
        type: "Suite",
        price: 150000,
        priceUnit: "CDF",
        size: "50m²",
        capacity: 4,
        images: ["/images/rooms/family-1.jpg", "/images/rooms/family-2.jpg"],
        description:
          "Spacieuse suite adaptée aux familles avec deux chambres séparées et un salon commun.",
        amenities: [
          "2 Chambres",
          "2 Salles de bain",
          "Climatisation",
          "TV LED",
          "Kitchenette",
          "Salon",
          "Salle à manger",
        ],
        available: true,
        availableFrom: "Demain",
        duration: 3,
        rating: 4.6,
        features: [
          "Idéal pour familles",
          "Room Service",
          "WiFi gratuit",
          "Petit-déjeuner disponible",
        ],
      },
    ],
    contact: {
      phone: "+243 819 999 999",
      email: "info@residencematonge.cd",
    },
    checkIn: "13:00",
    checkOut: "11:00",
  },
  {
    id: "hotel-3",
    name: "Hôtel Memling",
    description:
      "Un établissement historique rénové offrant le parfait mélange entre charme colonial et confort moderne au cœur de Gombe.",
    location: {
      address: "5 Avenue du Port",
      quartier: "Gombe",
      commune: "Gombe",
      city: "Kinshasa",
      country: "RD Congo",
      coordinates: {
        lat: -4.3111,
        lng: 15.2947,
      },
    },
    rating: 4.6,
    images: [
      "/images/hotels/memling-1.jpg",
      "/images/hotels/memling-2.jpg",
      "/images/hotels/memling-3.jpg",
    ],
    amenities: [
      "Piscine",
      "Restaurant gastronomique",
      "Bar lounge",
      "Centre d'affaires",
      "WiFi gratuit",
      "Salle de conférence",
      "Service de blanchisserie",
    ],
    rooms: [
      {
        id: "room-5",
        title: "Chambre Business",
        type: "Business",
        price: 200000,
        priceUnit: "CDF",
        size: "30m²",
        capacity: 2,
        images: [
          "/images/rooms/business-1.jpg",
          "/images/rooms/business-2.jpg",
        ],
        description:
          "Chambre élégante avec espace de travail dédié, parfaite pour les voyageurs d'affaires.",
        amenities: [
          "Lit Queen Size",
          "Bureau ergonomique",
          "Fauteuil de travail",
          "Climatisation",
          "TV LED",
          "Coffre-fort",
          "Mini-bar",
        ],
        available: true,
        availableFrom: "Maintenant",
        duration: 3,
        rating: 4.7,
        features: [
          "Vue sur la ville",
          "Accès au Business Center",
          "WiFi haut débit",
          "Petit-déjeuner inclus",
        ],
      },
    ],
    contact: {
      phone: "+243 817 777 777",
      email: "reservations@memling.cd",
      website: "www.memling.cd",
    },
    checkIn: "14:00",
    checkOut: "11:00",
  },
];

// Helper functions
export function getHotelById(id: string): Hotel | undefined {
  return HOTELS.find((hotel) => hotel.id === id);
}

export function getRoomById(hotelId: string, roomId: string): Room | undefined {
  const hotel = getHotelById(hotelId);
  return hotel?.rooms.find((room) => room.id === roomId);
}

export function getAllRooms(): Room[] {
  return HOTELS.flatMap((hotel) => hotel.rooms);
}

export function getAvailableRooms(): Room[] {
  return getAllRooms().filter((room) => room.available);
}

export function formatPrice(price: number, currency: string = "CDF"): string {
  return `${price.toLocaleString()} ${currency}`;
}

// Fonction pour obtenir les hôtels par commune
export function getHotelsByCommune(commune: string): Hotel[] {
  return HOTELS.filter(
    (hotel) => hotel.location.commune.toLowerCase() === commune.toLowerCase()
  );
}

// Fonction pour obtenir les hôtels par quartier
export function getHotelsByQuartier(quartier: string): Hotel[] {
  return HOTELS.filter(
    (hotel) => hotel.location.quartier.toLowerCase() === quartier.toLowerCase()
  );
}

// Fonction pour obtenir les chambres par gamme de prix
export function getRoomsByPriceRange(
  minPrice: number,
  maxPrice: number
): Room[] {
  return getAllRooms().filter(
    (room) => room.price >= minPrice && room.price <= maxPrice
  );
}
