export interface Course {
  id: number;
  school_id: number;
  title: string;
  description: string;
  category: string;
  course_type: string;
  price: number | null;
  currency: string;
  duration_hours: number | null;
  image_url: string | null;
  external_url: string;
  status: string;
  original_price?: number | null;
  discount_price?: number | null;
  view_count?: number;
  created_at: string;
  rating?: number;
  review_count?: number;
  slug?: string;
  has_promotion?: boolean;
  promoted_until?: string | null;
  promotion_type?: string | null;
}

export interface Mastermind {
  id: number;
  school_id: number;
  title: string;
  description: string;
  event_date: string;
  location: string | null;
  max_participants: number | null;
  price: number | null;
  currency: string;
  image_url: string | null;
  external_url: string;
  status: string;
  original_price?: number | null;
  discount_price?: number | null;
  view_count?: number;
  created_at: string;
  rating?: number;
  review_count?: number;
  slug?: string;
  has_promotion?: boolean;
  promoted_until?: string | null;
  promotion_type?: string | null;
  category?: 'technique' | 'business' | 'soft_skills' | 'health' | 'digital';
}

export interface OfflineTraining {
  id: number;
  school_id: number;
  title: string;
  description: string;
  event_date: string;
  location: string | null;
  max_participants: number | null;
  price: number | null;
  currency: string;
  image_url: string | null;
  external_url: string;
  status: string;
  original_price?: number | null;
  discount_price?: number | null;
  view_count?: number;
  created_at: string;
  rating?: number;
  review_count?: number;
  slug?: string;
  has_promotion?: boolean;
  promoted_until?: string | null;
  promotion_type?: string | null;
  category?: 'technique' | 'business' | 'soft_skills' | 'health' | 'digital';
}

export type CatalogItem = (Course & { itemType: 'course' }) | (Mastermind & { itemType: 'mastermind'; category: string; course_type: string }) | (OfflineTraining & { itemType: 'offline_training'; category: string; course_type: string });

export const COURSE_API_URL = 'https://functions.poehali.dev/95b5e0a7-51f7-4fb1-b196-a49f5feff58f';
export const COURSE_LANDINGS_API_URL = 'https://functions.poehali.dev/a81dd7cd-c267-4f44-85f5-0da8353dc741';
export const REVIEWS_API_URL = 'https://functions.poehali.dev/dacb9e9b-c76e-4430-8ed9-362ffc8b9566';
export const PROMOTIONS_API_URL = 'https://functions.poehali.dev/2ea3a11a-0b11-4f52-9c5e-29fe60c40675';

export const CATEGORIES = [
  'Все категории',
  'Классический массаж',
  'Спортивный массаж',
  'Лечебный массаж',
  'SPA массаж',
  'Косметический массаж',
  'Детский массаж',
  'Массажные техники',
  'Бизнес и маркетинг',
  'Общение и психология',
  'Здоровье и безопасность',
  'Цифровые навыки',
  'Другое'
];