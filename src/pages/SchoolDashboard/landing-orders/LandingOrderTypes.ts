export interface LandingOrderForm {
  courseName: string;
  courseType: 'course' | 'mastermind' | 'offline';
  description: string;
  targetAudience: string;
  uniqueSellingPoints: string;
  price: string;
  courseDuration: string;
  whatStudentsGet: string;
  program: string;
  authorName: string;
  authorBio: string;
  schoolName: string;
  contactEmail: string;
  contactPhone: string;
  externalFormUrl: string;
  additionalInfo: string;
}

export interface SavedOrder extends LandingOrderForm {
  id: number;
  status: string;
  created_at: string;
}

export const INITIAL_FORM: LandingOrderForm = {
  courseName: '',
  courseType: 'course',
  description: '',
  targetAudience: '',
  uniqueSellingPoints: '',
  price: '',
  courseDuration: '',
  whatStudentsGet: '',
  program: '',
  authorName: '',
  authorBio: '',
  schoolName: '',
  contactEmail: '',
  contactPhone: '',
  externalFormUrl: '',
  additionalInfo: ''
};

export const ORDERS_API = 'https://functions.poehali.dev/ab0a2627-04a3-4717-8ee6-05c7c08f9807';
export const EMAIL_API = 'https://functions.poehali.dev/21920113-c479-4edd-9a41-cf0b8a08f47c';
