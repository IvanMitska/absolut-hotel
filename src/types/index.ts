// Основные типы для отеля "Абсолют"

export interface Contact {
  type: ContactType;
  value: string;
  label: string;
  primary?: boolean;
}

export type ContactType = 'phone' | 'email' | 'whatsapp' | 'telegram' | 'address' | 'social';

export interface Hotel {
  id: string;
  name: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  amenities: string[];
  images: string[];
  rating: number;
  reviewsCount: number;
}

export interface Room {
  id: string;
  name: string;
  type: RoomType;
  description: string;
  shortDescription: string;
  size: number; // в кв.м
  capacity: {
    adults: number;
    children: number;
    total: number;
  };
  amenities: string[];
  images: string[];
  price: {
    basePrice: number;
    currency: string;
    pricePerNight: boolean;
  };
  availability: boolean;
  features: RoomFeature[];
}

export type RoomType = 'standard' | 'family' | 'deluxe' | 'suite';

export interface RoomFeature {
  id: string;
  name: string;
  icon: string;
  description?: string;
}

export interface Service {
  id: string;
  name: string;
  category: ServiceCategory;
  description: string;
  icon: string;
  images?: string[];
  price?: {
    amount: number;
    currency: string;
    unit?: string;
  };
  included: boolean; // включена ли в стоимость проживания
}

export type ServiceCategory = 'dining' | 'kids' | 'beach' | 'additional' | 'spa' | 'transport';

export interface Booking {
  id?: string;
  guestInfo: GuestInfo;
  roomId: string;
  checkIn: Date;
  checkOut: Date;
  guests: {
    adults: number;
    children: number;
  };
  specialRequests?: string;
  totalPrice: number;
  status: BookingStatus;
  createdAt?: Date;
  paymentInfo?: PaymentInfo;
}

export type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed';

export interface GuestInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  nationality?: string;
  birthDate?: Date;
  documentType?: string;
  documentNumber?: string;
}

export interface PaymentInfo {
  method: PaymentMethod;
  status: PaymentStatus;
  amount: number;
  currency: string;
  transactionId?: string;
}

export type PaymentMethod = 'card' | 'bank_transfer' | 'cash' | 'online_payment';
export type PaymentStatus = 'pending' | 'completed' | 'failed' | 'refunded';

export interface Review {
  id: string;
  guestName: string;
  rating: number;
  title: string;
  comment: string;
  date: Date;
  roomType?: string;
  verified: boolean;
  images?: string[];
  response?: {
    text: string;
    date: Date;
    author: string;
  };
}

// Простой интерфейс для отзывов, используемый в константах
export interface GuestReview {
  name: string;
  text: string;
  rating: number;
}

export interface GalleryImage {
  id: string;
  url: string;
  thumbnail: string;
  alt: string;
  category: GalleryCategory;
  title?: string;
  description?: string;
}

export type GalleryCategory = 'rooms' | 'territory' | 'pool' | 'restaurant' | 'kids_zone' | 'beach' | 'exterior';

export interface NavigationItem {
  id: string;
  label: string;
  path: string;
  icon?: string;
  children?: NavigationItem[];
  external?: boolean;
}

export interface SEOData {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
  canonical?: string;
  structuredData?: Record<string, any>;
}

export interface AnimationConfig {
  duration: number;
  delay?: number;
  easing?: string;
  repeat?: boolean;
}

export interface FormError {
  field: string;
  message: string;
}

export interface APIResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
}

// Utility types
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequireField<T, K extends keyof T> = T & Required<Pick<T, K>>;

// Константы для типов
export const ROOM_TYPES: Record<RoomType, string> = {
  standard: 'Стандарт',
  family: 'Семейный',
  deluxe: 'Делюкс',
  suite: 'Люкс',
};

export const SERVICE_CATEGORIES: Record<ServiceCategory, string> = {
  dining: 'Питание',
  kids: 'Детская зона',
  beach: 'Пляж и бассейн',
  additional: 'Дополнительные услуги',
  spa: 'СПА и релакс',
  transport: 'Транспорт',
};

export const GALLERY_CATEGORIES: Record<GalleryCategory, string> = {
  rooms: 'Номера',
  territory: 'Территория',
  pool: 'Бассейн',
  restaurant: 'Ресторан',
  kids_zone: 'Детская зона',
  beach: 'Пляж',
  exterior: 'Внешний вид',
}; 