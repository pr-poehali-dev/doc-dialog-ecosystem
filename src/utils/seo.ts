export interface SEOConfig {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  canonical?: string;
}

export const defaultSEO: SEOConfig = {
  title: 'DocDialog — Онлайн консультации врачей и специалистов по здоровью',
  description: 'Консультации врачей онлайн, запись к массажистам и специалистам по телу. Найдите проверенного специалиста, запишитесь на прием и общайтесь через защищенный чат. База школ массажа и обучающих курсов.',
  keywords: 'онлайн консультация врача, запись к врачу онлайн, массажист онлайн, найти массажиста, школа массажа, курсы массажа, специалисты по телу, медицинские консультации онлайн, телемедицина, запись к специалисту',
  ogImage: 'https://cdn.poehali.dev/intertnal/img/og.png',
  canonical: 'https://docdialog.su/'
};

export const pageSEO: Record<string, SEOConfig> = {
  '/': defaultSEO,
  '/about': {
    title: 'О нас — DocDialog | Платформа для специалистов по здоровью',
    description: 'DocDialog — современная платформа для онлайн консультаций врачей, записи к массажистам и специалистам по телу. Узнайте больше о нашей миссии и команде.',
    keywords: 'о нас, доктор диалог, платформа для врачей, онлайн медицина',
    canonical: 'https://docdialog.su/about'
  },
  '/pricing': {
    title: 'Цены и тарифы — DocDialog | Выгодные условия для специалистов',
    description: 'Прозрачные тарифы для специалистов, школ и салонов. Выберите подходящий план и начните работать с пациентами уже сегодня. Первый месяц бесплатно.',
    keywords: 'цены, тарифы, стоимость, подписка для врачей, тарифы для массажистов',
    canonical: 'https://docdialog.su/pricing'
  },
  '/masseurs': {
    title: 'Каталог массажистов и специалистов по телу — DocDialog',
    description: 'Найдите проверенного массажиста или специалиста по телу в вашем городе. Более 1000 профессионалов с отзывами и рейтингами. Удобная онлайн запись.',
    keywords: 'найти массажиста, массажист рядом, специалист по массажу, мануальный терапевт, остеопат',
    canonical: 'https://docdialog.su/masseurs'
  },
  '/masseurs-info': {
    title: 'Для специалистов — DocDialog | Привлекайте клиентов онлайн',
    description: 'Присоединяйтесь к DocDialog и получайте больше клиентов. Удобный личный кабинет, онлайн запись, чат с пациентами, аналитика и продвижение.',
    keywords: 'для массажистов, личный кабинет специалиста, привлечение клиентов, онлайн запись',
    canonical: 'https://docdialog.su/masseurs-info'
  },
  '/for-specialists': {
    title: 'Профессиональная платформа для специалистов — DocDialog',
    description: 'Современные инструменты для специалистов по здоровью: онлайн запись, CRM, мессенджер с клиентами, аналитика записей и доходов.',
    keywords: 'crm для специалистов, онлайн запись клиентов, мессенджер для врачей',
    canonical: 'https://docdialog.su/for-specialists'
  },
  '/medical-report': {
    title: 'Медицинские справки онлайн — DocDialog',
    description: 'Получите медицинскую справку онлайн после консультации врача. Быстро, удобно и официально.',
    keywords: 'медицинская справка онлайн, справка от врача, электронная справка',
    canonical: 'https://docdialog.su/medical-report'
  },
  '/schools': {
    title: 'Каталог школ массажа и обучающих курсов — DocDialog',
    description: 'Найдите школу массажа или курсы повышения квалификации. Онлайн и офлайн обучение от ведущих преподавателей. Сертификаты и дипломы.',
    keywords: 'школа массажа, курсы массажа, обучение массажу, курсы повышения квалификации',
    canonical: 'https://docdialog.su/schools'
  },
  '/schools-info': {
    title: 'Для школ массажа — DocDialog | Привлекайте студентов онлайн',
    description: 'Разместите свои курсы на DocDialog и привлекайте больше учеников. Конструктор лендингов, прием заявок, аналитика продаж.',
    keywords: 'для школ массажа, продвижение курсов, набор студентов',
    canonical: 'https://docdialog.su/schools-info'
  },
  '/courses': {
    title: 'Каталог курсов по массажу и телесным практикам — DocDialog',
    description: 'Выберите курс массажа, мастер-класс или программу обучения. Онлайн и очное обучение от профессионалов.',
    keywords: 'курсы массажа, обучение массажу онлайн, мастер классы',
    canonical: 'https://docdialog.su/courses'
  },
  '/salons': {
    title: 'Каталог массажных салонов и SPA центров — DocDialog',
    description: 'Найдите массажный салон или SPA центр в вашем городе. Онлайн запись, отзывы клиентов, актуальные цены.',
    keywords: 'массажный салон, спа салон, массаж салон рядом',
    canonical: 'https://docdialog.su/salons'
  },
  '/salons-info': {
    title: 'Для массажных салонов — DocDialog | Находите специалистов',
    description: 'Размещайте вакансии и находите квалифицированных массажистов для вашего салона. База проверенных специалистов с опытом работы.',
    keywords: 'для салонов, вакансии массажистов, найти массажиста в салон',
    canonical: 'https://docdialog.su/salons-info'
  },
  '/salons-presentation': {
    title: 'Презентация для салонов — DocDialog',
    description: 'Узнайте, как DocDialog помогает массажным салонам привлекать клиентов и находить специалистов.',
    keywords: 'презентация для салонов, сервис для салонов',
    canonical: 'https://docdialog.su/salons-presentation'
  }
};

export function updatePageSEO(path: string) {
  const seo = pageSEO[path] || defaultSEO;
  
  document.title = seo.title;
  
  updateMetaTag('name', 'description', seo.description);
  if (seo.keywords) {
    updateMetaTag('name', 'keywords', seo.keywords);
  }
  if (seo.canonical) {
    updateLinkTag('canonical', seo.canonical);
  }
  
  updateMetaTag('property', 'og:title', seo.title);
  updateMetaTag('property', 'og:description', seo.description);
  updateMetaTag('property', 'og:url', seo.canonical || `https://docdialog.su${path}`);
  if (seo.ogImage) {
    updateMetaTag('property', 'og:image', seo.ogImage);
  }
  
  updateMetaTag('name', 'twitter:title', seo.title);
  updateMetaTag('name', 'twitter:description', seo.description);
}

function updateMetaTag(attr: string, attrValue: string, content: string) {
  let element = document.querySelector(`meta[${attr}="${attrValue}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attr, attrValue);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

function updateLinkTag(rel: string, href: string) {
  let element = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement;
  if (!element) {
    element = document.createElement('link');
    element.rel = rel;
    document.head.appendChild(element);
  }
  element.href = href;
}

export function getStructuredData(type: 'organization' | 'medicalOrganization' | 'breadcrumb', data?: any) {
  const structuredData: Record<string, any> = {
    organization: {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "DocDialog",
      "alternateName": "Доктор Диалог",
      "url": "https://docdialog.su",
      "logo": "https://cdn.poehali.dev/intertnal/img/og.png",
      "description": "Платформа для онлайн консультаций врачей, записи к массажистам и специалистам по телу",
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "Customer Service",
        "availableLanguage": ["Russian"]
      },
      "sameAs": []
    },
    medicalOrganization: {
      "@context": "https://schema.org",
      "@type": "MedicalOrganization",
      "name": "DocDialog",
      "url": "https://docdialog.su",
      "description": "Онлайн консультации врачей и специалистов по здоровью",
      "medicalSpecialty": [
        "Массаж",
        "Мануальная терапия",
        "Остеопатия",
        "Физиотерапия"
      ]
    },
    breadcrumb: {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": data || []
    }
  };
  
  return structuredData[type];
}

export function injectStructuredData(type: 'organization' | 'medicalOrganization' | 'breadcrumb', data?: any) {
  const scriptId = `structured-data-${type}`;
  let script = document.getElementById(scriptId);
  
  if (!script) {
    script = document.createElement('script');
    script.id = scriptId;
    script.type = 'application/ld+json';
    document.head.appendChild(script);
  }
  
  script.textContent = JSON.stringify(getStructuredData(type, data));
}
