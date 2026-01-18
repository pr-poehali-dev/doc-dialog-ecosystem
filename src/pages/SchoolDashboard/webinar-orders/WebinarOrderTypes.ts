export interface WebinarOrderForm {
  schoolName: string;
  webinarTopic: string;
  webinarGoal: string;
  packageType: 'setup' | 'four' | 'eight';
  contactEmail: string;
  contactPhone: string;
  additionalInfo: string;
}

export interface SavedWebinarOrder extends WebinarOrderForm {
  id: number;
  status: string;
  created_at: string;
}

export const INITIAL_WEBINAR_FORM: WebinarOrderForm = {
  schoolName: '',
  webinarTopic: '',
  webinarGoal: '',
  packageType: 'setup',
  contactEmail: '',
  contactPhone: '',
  additionalInfo: ''
};

export const WEBINAR_ORDERS_API = 'https://functions.poehali.dev/65701c32-e4b9-4f74-9a8f-83bfb3eb8d10';
export const EMAIL_API = 'https://functions.poehali.dev/21920113-c479-4edd-9a41-cf0b8a08f47c';

export const PACKAGE_PRICES = {
  setup: { price: 5000, label: 'Настройка и размещение', description: 'Одноразовая оплата за настройку автовебинара' },
  four: { price: 5000, label: '4 трансляции в месяц', description: 'Ежемесячная подписка' },
  eight: { price: 8000, label: '8 трансляций в месяц', description: 'Ежемесячная подписка' }
};