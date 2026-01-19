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
  title: string;
  course_type: string;
  category: string;
  description: string;
  has_certificate: boolean;
  duration_hours: string;
  image_url: string;
  external_url: string;
  price: string;
}

export interface MastermindFormData {
  title: string;
  course_type: string;
  category: 'technique' | 'business' | 'soft_skills' | 'health' | 'digital';
  description: string;
  has_certificate: boolean;
  duration_hours: string;
  image_url: string;
  external_url: string;
  price: string;
  event_date: string;
}

export interface OfflineTrainingFormData {
  title: string;
  course_type: string;
  category: 'technique' | 'business' | 'soft_skills' | 'health' | 'digital';
  description: string;
  has_certificate: boolean;
  duration_hours: string;
  image_url: string;
  external_url: string;
  price: string;
  event_date: string;
}

export const COURSE_API_URL = 'https://functions.poehali.dev/95b5e0a7-51f7-4fb1-b196-a49f5feff58f';

export const INITIAL_COURSE_FORM: CourseFormData = {
  title: '',
  course_type: 'online',
  category: 'Классический массаж',
  description: '',
  has_certificate: false,
  duration_hours: '',
  image_url: '',
  external_url: '',
  price: ''
};

export const INITIAL_MASTERMIND_FORM: MastermindFormData = {
  title: '',
  course_type: 'online',
  category: 'technique',
  description: '',
  has_certificate: false,
  duration_hours: '',
  image_url: '',
  external_url: '',
  price: '',
  event_date: ''
};

export const INITIAL_OFFLINE_TRAINING_FORM: OfflineTrainingFormData = {
  title: '',
  course_type: 'offline',
  category: 'technique',
  description: '',
  has_certificate: false,
  duration_hours: '',
  image_url: '',
  external_url: '',
  price: '',
  event_date: ''
};