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
  hotelName: string;
  location: {
    quartier: string;
    commune: string;
  };
}

export interface Hotel {
  id: string;
  name: string;
  location: {
    address: string;
    quartier: string;
    commune: string;
  };
  description: string;
  rating: number;
  contact: {
    phone: string;
    email: string;
  };
  checkIn: string;
  checkOut: string;
  rooms: Room[];
  amenities: string[];
}

// Données des chambres
export const AVAILABLE_ROOMS: Room[] = [
  {
    id: "vip-pullman-1",
    title: "Suite Présidentielle Pullman",
    type: "VIP",
    price: 350000,
    priceUnit: "CDF",
    size: "65m²",
    capacity: 2,
    images: [
      "/images/hotels/pullman.jpg",
      "/images/hotels/pullman1.jpg",
      "/images/hotels/pullman2.jpg",
    ],
    description:
      "Suite présidentielle luxueuse avec vue panoramique sur le fleuve Congo. Décoration raffinée, espace de vie séparé et services VIP inclus.",
    amenities: [
      "Lit King Size Premium",
      "Salon privé",
      "Salle de bain en marbre",
      "Baignoire jacuzzi",
      "TV LED 65 pouces",
      "Mini-bar premium",
      "Bureau de travail",
      "Service majordome 24/7",
    ],
    available: true,
    availableFrom: "Immédiatement",
    duration: 12,
    rating: 4.9,
    features: [
      "Vue panoramique",
      "Service VIP",
      "Petit-déjeuner gourmet",
      "Accès Lounge Exécutif",
    ],
    hotelName: "Hôtel Pullman Kinshasa",
    location: {
      quartier: "Gombe",
      commune: "Gombe",
    },
  },
  {
    id: "elegance-1",
    title: "Chambre Élégance",
    type: "Passage",
    price: 80000,
    priceUnit: "CDF",
    size: "28m²",
    capacity: 2,
    images: [
      "/images/hotels/frontiere.jpg",
      "/images/hotels/frontiere1.jpg",
      "/images/hotels/frontiere3.jpg",
    ],
    description:
      "Chambre moderne et confortable, idéale pour un séjour discret et agréable. Design contemporain et ambiance chaleureuse.",
    amenities: [
      "Lit Queen Size",
      "Salle de bain privée",
      "Climatisation",
      "TV LED 43 pouces",
      "Mini-bar",
      "WiFi haut débit",
    ],
    available: true,
    availableFrom: "Maintenant",
    duration: 3,
    rating: 4.5,
    features: ["Check-in rapide", "Intimité garantie", "Service discret"],
    hotelName: "Résidence Élégance",
    location: {
      quartier: "Matonge",
      commune: "Kalamu",
    },
  },
  {
    id: "elegance-2",
    title: "Chambre passage",
    type: "Passage",
    price: 12000,
    priceUnit: "CDF",
    size: "35m²",
    capacity: 2,
    images: [
      "/images/hotels/elegance.jpg",
      "/images/hotels/elegance1.jpg",
      "/images/hotels/elegance3.jpg",
    ],
    description:
      "Suite élégante avec espace salon séparé, parfaite pour un moment de détente dans un cadre raffiné et discret.",
    amenities: [
      "Lit King Size",
      "Salon privé",
      "Douche à effet pluie",
      "TV LED 50 pouces",
      "Mini-bar garni",
      "Machine à café",
      "WiFi ultra-rapide",
    ],
    available: true,
    availableFrom: "Maintenant",
    duration: 4,
    rating: 4.7,
    features: ["Entrée privée", "Service en chambre", "Insonorisation premium"],
    hotelName: "Résidence Élégance",
    location: {
      quartier: "Matonge",
      commune: "Kalamu",
    },
  },
  {
    id: "memling-business",
    title: "Chambre Business Memling",
    type: "Intermédiaire",
    price: 150000,
    priceUnit: "CDF",
    size: "32m²",
    capacity: 2,
    images: [
      "/images/hotels/memling.jpg",
      "/images/rooms/memling1.jpg",
    ],
    description:
      "Chambre business moderne avec espace de travail ergonomique. Parfait équilibre entre confort et fonctionnalité.",
    amenities: [
      "Lit Queen Size",
      "Bureau ergonomique",
      "Fauteuil de travail",
      "TV LED 55 pouces",
      "Station de charge",
      "Coffre-fort digital",
      "Mini-bar select",
    ],
    available: true,
    availableFrom: "Maintenant",
    duration: 6,
    rating: 4.6,
    features: [
      "Vue ville",
      "Accès fitness",
      "Petit-déjeuner inclus",
      "WiFi haute vitesse",
    ],
    hotelName: "Hôtel Memling",
    location: {
      quartier: "Gombe",
      commune: "Gombe",
    },
  },
];

// Données des hôtels
export const HOTELS: Hotel[] = [
  {
    id: "pullman",
    name: "Hôtel Pullman Kinshasa",
    location: {
      address: "4 Avenue Batetela",
      quartier: "Gombe",
      commune: "Gombe",
    },
    description: "Hôtel de luxe 5 étoiles avec vue sur le fleuve Congo",
    rating: 4.8,
    contact: {
      phone: "+243 999 888 777",
      email: "contact@pullmankinshasa.com",
    },
    checkIn: "14:00",
    checkOut: "12:00",
    rooms: [AVAILABLE_ROOMS[0]], // Suite Présidentielle Pullman
    amenities: [
      "Restaurant gastronomique",
      "Spa & bien-être",
      "Piscine",
      "Salle de sport",
      "Business center",
      "Service voiturier",
    ],
  },
  {
    id: "elegance",
    name: "Résidence Élégance",
    location: {
      address: "15 Avenue du Commerce",
      quartier: "Matonge",
      commune: "Kalamu",
    },
    description: "Établissement discret offrant confort et intimité",
    rating: 4.6,
    contact: {
      phone: "+243 888 777 666",
      email: "info@residenceelegance.cd",
    },
    checkIn: "13:00",
    checkOut: "11:00",
    rooms: [AVAILABLE_ROOMS[1], AVAILABLE_ROOMS[2]], // Chambres Élégance
    amenities: [
      "Parking privé",
      "Service en chambre",
      "WiFi haut débit",
      "Sécurité 24/7",
    ],
  },
  {
    id: "memling",
    name: "Hôtel Memling",
    location: {
      address: "5 Avenue du Port",
      quartier: "Gombe",
      commune: "Gombe",
    },
    description: "Hôtel business de référence au cœur de Kinshasa",
    rating: 4.7,
    contact: {
      phone: "+243 777 666 555",
      email: "reservation@memling.cd",
    },
    checkIn: "14:00",
    checkOut: "11:00",
    rooms: [AVAILABLE_ROOMS[3]], // Chambre Business
    amenities: [
      "Restaurant",
      "Bar lounge",
      "Salle de conférence",
      "Business center",
      "Fitness center",
    ],
  },
];

// Helper functions
export function getAllRooms(): Room[] {
  return AVAILABLE_ROOMS;
}

export function getAvailableRooms(): Room[] {
  return AVAILABLE_ROOMS.filter((room) => room.available);
}

export function getRoomById(roomId: string): Room | undefined {
  return AVAILABLE_ROOMS.find((room) => room.id === roomId);
}

export function formatPrice(price: number, currency: string = "CDF"): string {
  return `${price.toLocaleString()} ${currency}`;
}

// Fonction pour obtenir les chambres par type
export function getRoomsByType(type: string): Room[] {
  return AVAILABLE_ROOMS.filter(
    (room) => room.type.toLowerCase() === type.toLowerCase()
  );
}

// Fonction pour obtenir les chambres par quartier
export function getRoomsByQuartier(quartier: string): Room[] {
  return AVAILABLE_ROOMS.filter(
    (room) => room.location.quartier.toLowerCase() === quartier.toLowerCase()
  );
}

// Fonction pour obtenir les chambres par gamme de prix
export function getRoomsByPriceRange(
  minPrice: number,
  maxPrice: number
): Room[] {
  return AVAILABLE_ROOMS.filter(
    (room) => room.price >= minPrice && room.price <= maxPrice
  );
}
