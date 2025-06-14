// Types
interface Room {
  id: string;
  hotelName: string;
  type: string;
  price: number;
  image: string;
  capacity: number;
  availableFrom: string;
  duration: number;
}

// Données de test
export const AVAILABLE_ROOMS: Room[] = [
  {
    id: "1",
    hotelName: "Hôtel Le Luxe",
    type: "Suite Junior",
    price: 15000,
    image: "/images/rooms/room-1.jpg",
    capacity: 2,
    availableFrom: "Maintenant",
    duration: 3,
  },
  {
    id: "2",
    hotelName: "Confort Plus",
    type: "Chambre Deluxe",
    price: 12000,
    image: "/images/rooms/room-2.jpg",
    capacity: 2,
    availableFrom: "Dans 30min",
    duration: 2,
  },
  {
    id: "3",
    hotelName: "Le Petit Palace",
    type: "Suite Executive",
    price: 18000,
    image: "/images/rooms/room-3.jpg",
    capacity: 2,
    availableFrom: "Dans 1h",
    duration: 4,
  },
];
