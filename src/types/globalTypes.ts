export interface Slide {
  id: number;
  title: string;
  description: string;
  image: string;
}

export interface visibility {
  isVisible?: boolean;
  setIsVisible?: () => void;
}

export type DemoStep = {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  screen: string;
  features: string[];
};

export type Testimonial = {
  quote: string;
  name: string;
  designation: string;
  src: string;
};

export interface propertyType {
  id: string;
  title: string;
  type: string;
  listingType: string;
  price: string | number;
  size?: string;
  status?: "published" | "pending" | "draft";
  dimensions?: string;
  location: string;
  city: string;
  longitude: number;
  latitude: number;
  locationDetails?: string;
  available: string;
  description: string;
  features: string[];
  images: string[];
  bedrooms?: number;
}
