export enum RoomType {
  STANDARD = "STANDARD",
  DELUXE = "DELUXE",
  SUITE = "SUITE",
  VIP = "VIP",
}

export enum RoomStatus {
  AVAILABLE = "AVAILABLE",
  OCCUPIED = "OCCUPIED",
  MAINTENANCE = "MAINTENANCE",
  CLEANING = "CLEANING",
}

export enum BookingStatus {
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}

export enum UserRole {
  CLIENT = "CLIENT",
  HOTEL_ADMIN = "HOTEL_ADMIN",
  SUPER_ADMIN = "SUPER_ADMIN",
}

export interface Location {
  latitude: number;
  longitude: number;
}

export interface Hotel {
  id: string;
  name: string;
  address: string;
  location: Location;
  description: string;
  images: string[];
  rating: number;
  amenities: string[];
  rooms: Room[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Room {
  id: string;
  hotelId: string;
  number: string;
  type: RoomType;
  pricePerHour: number;
  description: string;
  images: string[];
  amenities: string[];
  status: RoomStatus;
  capacity: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Booking {
  id: string;
  userId: string;
  roomId: string;
  hotelId: string;
  startTime: Date;
  endTime: Date;
  status: BookingStatus;
  totalPrice: number;
  specialRequests?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  role: UserRole;
  avatar?: string;
  bookingHistory: Booking[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Review {
  id: string;
  userId: string;
  hotelId: string;
  roomId: string;
  rating: number;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface SearchFilters {
  location?: Location;
  priceRange?: {
    min: number;
    max: number;
  };
  roomType?: RoomType;
  dateRange?: {
    start: Date;
    end: Date;
  };
  capacity?: number;
}
