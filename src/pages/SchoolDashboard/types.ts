export interface Course {
  id: number;
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
  moderation_comment?: string;
  original_price?: number | null;
  discount_price?: number | null;
  view_count?: number;
  slug?: string;
  created_at: string;
  cover_url?: string | null;
  cta_button_url?: string | null;
  school_name?: string;
  author_name?: string;
  author_photo?: string;
  course_content?: string;
}

export interface Mastermind {
  id: number;
  title: string;
  description: string;
  event_date: string;
  location: string | null;
  max_participants: number | null;
  current_participants: number;
  price: number | null;
  currency: string;
  image_url: string | null;
  external_url: string;
  status: string;
  original_price?: number | null;
  discount_price?: number | null;
  view_count?: number;
  created_at: string;
  category?: 'technique' | 'business' | 'soft_skills' | 'health' | 'digital';
}

export interface SpecialistRequest {
  id: number;
  title: string;
  description: string;
  specialty: string;
  budget_from: number | null;
  budget_to: number | null;
  currency: string;
  location: string | null;
  deadline_date: string | null;
  status: string;
  created_at: string;
}

export interface CourseFormData {
  school_name: string;
  title: string;
  description: string;
  category: string;
  course_type: string;
  price: string;
  duration_hours: string;
  image_url: string;
  external_url: string;
  original_price: string;
  discount_price: string;
}

export interface MastermindFormData {
  school_name: string;
  title: string;
  description: string;
  event_date: string;
  location: string;
  max_participants: string;
  price: string;
  image_url: string;
  external_url: string;
  original_price: string;
  discount_price: string;
  category: 'technique' | 'business' | 'soft_skills' | 'health' | 'digital';
}

export interface SpecialistFormData {
  title: string;
  description: string;
  specialty: string;
  budget_from: string;
  budget_to: string;
  location: string;
  deadline_date: string;
}

export const COURSE_API_URL = 'https://functions.poehali.dev/95b5e0a7-51f7-4fb1-b196-a49f5feff58f';

export const INITIAL_COURSE_FORM: CourseFormData = {
  school_name: '',
  title: '',
  description: '',
  category: 'Классический массаж',
  course_type: 'online',
  price: '',
  duration_hours: '',
  image_url: '',
  external_url: '',
  original_price: '',
  discount_price: ''
};

export const INITIAL_MASTERMIND_FORM: MastermindFormData = {
  school_name: '',
  title: '',
  description: '',
  event_date: '',
  location: '',
  max_participants: '',
  price: '',
  image_url: '',
  external_url: '',
  original_price: '',
  discount_price: '',
  category: 'technique'
};

export const INITIAL_SPECIALIST_FORM: SpecialistFormData = {
  title: '',
  description: '',
  specialty: 'Видеооператор',
  budget_from: '',
  budget_to: '',
  location: '',
  deadline_date: ''
};