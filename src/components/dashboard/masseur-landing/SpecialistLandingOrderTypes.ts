export interface SpecialistLandingOrderForm {
  name: string;
  email: string;
  phone: string;
  specialization: string;
}

export interface SavedSpecialistOrder extends SpecialistLandingOrderForm {
  id: number;
  status: string;
  created_at: string;
}

export const INITIAL_SPECIALIST_FORM: SpecialistLandingOrderForm = {
  name: '',
  email: '',
  phone: '',
  specialization: ''
};

export const SPECIALIST_ORDERS_API = 'https://functions.poehali.dev/29db362f-8a8d-4d8d-8b44-b025624ac433';
export const EMAIL_API = 'https://functions.poehali.dev/21920113-c479-4edd-9a41-cf0b8a08f47c';