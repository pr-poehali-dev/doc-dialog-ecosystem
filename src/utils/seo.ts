export interface SEOConfig {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  canonical?: string;
}

export const defaultSEO: SEOConfig = {
  title: 'Док диалог — экосистема для специалистов по телу и салонов',
  description: 'Док диалог — экосистема для специалистов по телу, салонов и школ: клиенты, обучение, вакансии, инструменты и профессиональный диалог.',
  keywords: 'специалист по телу, телесные практики, массажист услуги, работа специалистом по телу, салоны телесных практик, вакансии массажистов, курсы для массажистов, обучение телесным практикам',
  ogImage: 'https://cdn.poehali.dev/intertnal/img/og.png',
  canonical: 'https://docdialog.su/'
};

export const pageSEO: Record<string, SEOConfig> = {
  '/': defaultSEO,
  '/about': {
    title: 'О нас — Док диалог | Профессиональная экосистема',
    description: 'Док диалог — профессиональная экосистема для специалистов по телу, салонов и школ, объединяющая обучение, развитие, клиентов и инструменты для работы и роста.',
    keywords: 'о нас, док диалог, платформа для специалистов по телу, экосистема телесных практик',
    canonical: 'https://docdialog.su/about'
  },
  '/pricing': {
    title: 'Цены и тарифы — DocDialog | Выгодные условия для специалистов',
    description: 'Прозрачные тарифы для специалистов, школ и салонов. Выберите подходящий план и начните работать с пациентами уже сегодня. Первый месяц бесплатно.',
    keywords: 'цены, тарифы, стоимость, подписка для врачей, тарифы для массажистов',
    canonical: 'https://docdialog.su/pricing'
  },
  '/masseurs': {
    title: 'Каталог специалистов по телу — Док диалог',
    description: 'Найдите специалиста по телу в вашем городе. Профессионалы с отзывами и рейтингами. Удобная онлайн запись без посредников.',
    keywords: 'найти специалиста по телу, массажист рядом, телесные практики, специалист по работе с телом',
    canonical: 'https://docdialog.su/masseurs'
  },
  '/masseurs-info': {
    title: 'Док диалог для специалистов по телу — клиенты, рост, диалог',
    description: 'Платформа для специалистов по телу: профиль, клиенты, обучение, инструменты и профессиональная поддержка без посредников.',
    keywords: 'для специалистов по телу, личный кабинет специалиста, привлечение клиентов, профессиональный рост',
    canonical: 'https://docdialog.su/masseurs-info'
  },
  '/for-specialists': {
    title: 'Платформа для специалистов по телу — Док диалог',
    description: 'Док диалог помогает специалистам по телу развиваться профессионально, находить клиентов и быть частью сообщества. Публичный профиль, личный лендинг, инструменты автоматизации.',
    keywords: 'инструменты для специалистов, профиль специалиста, личный лендинг, автоматизация работы',
    canonical: 'https://docdialog.su/for-specialists'
  },
  '/medical-report': {
    title: 'Расшифровка медицинских заключений простым языком — Док диалог',
    description: 'ИИ-инструмент помогает понять медицинские заключения: объяснение терминов и формулировок без диагнозов и назначений.',
    keywords: 'расшифровка медицинских заключений, объяснение анализов, ИИ для медицинских документов',
    canonical: 'https://docdialog.su/medical-report'
  },
  '/schools': {
    title: 'Каталог школ телесных практик — Док диалог',
    description: 'Найдите школу телесных практик или курсы повышения квалификации. Онлайн и офлайн обучение от ведущих преподавателей. Сертификаты и дипломы.',
    keywords: 'школа телесных практик, курсы для массажистов, обучение работе с телом, курсы повышения квалификации',
    canonical: 'https://docdialog.su/schools'
  },
  '/schools-info': {
    title: 'Док диалог для школ — привлечение учеников без комиссий',
    description: 'Размещение курсов для специалистов по телу: целевая аудитория, доверие, обучение и рост без маркетплейсов.',
    keywords: 'для школ телесных практик, продвижение курсов, набор учеников без комиссий',
    canonical: 'https://docdialog.su/schools-info'
  },
  '/courses': {
    title: 'Каталог курсов по работе с телом — Док диалог',
    description: 'Выберите курс по работе с телом, мастер-класс или программу обучения. Онлайн и очное обучение от профессионалов.',
    keywords: 'курсы по работе с телом, обучение телесным практикам, мастер классы для специалистов',
    canonical: 'https://docdialog.su/courses'
  },
  '/salons': {
    title: 'Каталог салонов телесных практик — Док диалог',
    description: 'Найдите салон телесных практик в вашем городе. Онлайн запись, отзывы клиентов, актуальные цены.',
    keywords: 'салон телесных практик, массажный салон, студия массажа рядом',
    canonical: 'https://docdialog.su/salons'
  },
  '/salons-info': {
    title: 'Док диалог для салонов — специалисты, клиенты, доверие',
    description: 'Платформа для салонов телесных практик: вакансии, специалисты, клиенты по геолокации, без комиссий и купонов.',
    keywords: 'для салонов телесных практик, вакансии специалистов по телу, найти массажиста в салон',
    canonical: 'https://docdialog.su/salons-info'
  },
  '/salons-presentation': {
    title: 'Экосистема для салонов телесных практик — Док диалог',
    description: 'Док диалог помогает салонам находить специалистов по телу и привлекать клиентов без посредников. Бесплатная регистрация, верификация, вакансии.',
    keywords: 'экосистема для салонов, привлечение клиентов, работа без комиссий',
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
      "name": "Док диалог",
      "alternateName": "Dok Dialog",
      "url": "https://docdialog.su",
      "logo": "https://cdn.poehali.dev/intertnal/img/og.png",
      "description": "Профессиональная экосистема для специалистов по телу, салонов и школ, объединяющая обучение, развитие, клиентов и инструменты для работы и роста",
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "Customer Service",
        "availableLanguage": ["Russian"]
      },
      "sameAs": []
    },
    medicalOrganization: {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Док диалог",
      "url": "https://docdialog.su",
      "description": "Профессиональная экосистема для специалистов по телу, салонов и школ",
      "service": [
        "Телесные практики",
        "Массаж",
        "Обучение работе с телом"
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