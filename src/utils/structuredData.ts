export function getWebsiteStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "DocDialog",
    "alternateName": "Доктор Диалог",
    "url": "https://docdialog.su",
    "description": "Платформа для онлайн консультаций врачей, записи к массажистам и специалистам по телу",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://docdialog.su/masseurs?search={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };
}

export function getOrganizationStructuredData() {
  return {
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
      "availableLanguage": ["Russian"],
      "areaServed": "RU"
    },
    "sameAs": []
  };
}

export function getMedicalOrganizationStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalOrganization",
    "name": "DocDialog",
    "url": "https://docdialog.su",
    "description": "Онлайн консультации врачей и специалистов по здоровью",
    "medicalSpecialty": [
      "Массаж",
      "Мануальная терапия",
      "Остеопатия",
      "Физиотерапия",
      "Телесная терапия"
    ]
  };
}

export function getServiceStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Медицинские консультации онлайн",
    "provider": {
      "@type": "Organization",
      "name": "DocDialog",
      "url": "https://docdialog.su"
    },
    "areaServed": {
      "@type": "Country",
      "name": "Россия"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Услуги специалистов",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Онлайн консультация врача"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Запись к массажисту"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Курсы массажа"
          }
        }
      ]
    }
  };
}

export function getBreadcrumbStructuredData(items: Array<{name: string, url: string}>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
}

export function getPersonStructuredData(person: {
  name: string;
  jobTitle: string;
  description?: string;
  image?: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": person.name,
    "jobTitle": person.jobTitle,
    "description": person.description,
    "image": person.image,
    "url": person.url,
    "worksFor": {
      "@type": "Organization",
      "name": "DocDialog"
    }
  };
}

export function getCourseStructuredData(course: {
  name: string;
  description: string;
  provider: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": course.name,
    "description": course.description,
    "provider": {
      "@type": "Organization",
      "name": course.provider,
      "sameAs": "https://docdialog.su"
    },
    "url": course.url
  };
}
