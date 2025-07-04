// Types
interface WomanProfile {
  id: string;
  name: string;
  age: number;
  description: string;
  localisation: string;
  price: number;
  rating: number;
  statut: string;
  languages: string[];
  images: string[];
  videos: string[];
  services: string[];
  whatsapp?: string;
  phone?: string;
}

// Données de test
export const AVAILABLE_WOMENS: WomanProfile[] = [
  {
    id: "1",
    name: "Deborah Mande",
    age: 25,
    description:
      "Élégante et raffinée, je saurai vous accompagner dans vos moments de détente. Je privilégie la qualité à la quantité et apprécie les hommes courtois et respectueux.",
    price: 12000,
    images: [
      "/images/women/deborah.jpg",
      "/images/women/deborah1.jpg",
      "/images/women/deborah2.jpg",
      "/images/women/deborah3.jpg",
    ],
    videos: ["/videos/women/deborah/1.mp4"],
    statut: "Dans 30min",
    localisation: "Lingwala",
    languages: ["Français", "Anglais"],
    rating: 4.8,
    services: ["Massage", "Accompagnement", "Week-end", "Événements"],
    whatsapp: "+243987654321",
    phone: "+243987654321",
  },
  {
    id: "2",
    name: "Eunice Yenga",
    age: 28,
    description:
      "Charmante et attentionnée, je vous propose des moments de détente et de plaisir. Je suis une personne douce et à l'écoute, qui saura vous mettre à l'aise.",
    price: 18000,
    images: [
      "/images/women/eunice.jpg",
      "/images/women/eunice1.jpg",
      "/images/women/eunice2.jpg",
      "/images/women/eunice3.jpg",
      "/images/women/eunice4.jpg",
    ],
    videos: [
      "/videos/women/eunice/1.mp4",
      "/videos/women/eunice/2.mp4",
      "/videos/women/eunice/3.mp4",
    ],
    statut: "Dans 1h",
    localisation: "Gombe",
    languages: ["Français", "Swahili"],
    rating: 4.2,
    services: ["Massage", "Accompagnement", "Soirée", "Voyage"],
    whatsapp: "+243456789123",
  },
  {
    id: "3",
    name: "Jessica Moke",
    age: 26,
    description:
      "Je suis une jeune femme dynamique et sociable. J'aime les moments de partage et de convivialité. Je suis disponible pour des moments agréables et discrets.",
    price: 15000,
    images: [
      "/images/women/jessica.jpg",
      "/images/women/jessica1.jpg",
      "/images/women/jessica2.jpg",
      "/images/women/jessica3.jpg",
      "/images/women/jessica4.jpg",
    ],
    videos: ["/videos/women/jessica/1.mp4", "/videos/women/jessica/2.mp4"],
    statut: "Maintenant",
    localisation: "Bandal",
    languages: ["Français", "Lingala"],
    rating: 4.5,
    services: ["Massage", "Accompagnement", "Dîner en ville", "Soirée privée"],
    whatsapp: "+243123456789",
  },
];
