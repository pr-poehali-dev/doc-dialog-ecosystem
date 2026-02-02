import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Navigation } from '@/components/Navigation';
import SchoolsFooter from '@/components/schools/SchoolsFooter';
import RegressionHypnosisHero from '@/components/regression/RegressionHypnosisHero';
import RegressionHypnosisContent from '@/components/regression/RegressionHypnosisContent';
import RegressionHypnosisPrograms from '@/components/regression/RegressionHypnosisPrograms';
import RegressionHypnosisFooter from '@/components/regression/RegressionHypnosisFooter';

export default function RegressionHypnosisLanding() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const scrollToCTA = () => {
    document.getElementById('cta-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const faqs = [
    {
      question: 'Это научно?',
      answer: 'Метод основан на психологии, нейрофизиологии и практике работы с памятью.'
    },
    {
      question: 'Подойдёт ли без опыта гипноза?',
      answer: 'Да. Базовый уровень выстраивает фундамент.'
    },
    {
      question: 'Будет ли практика?',
      answer: 'Да. Практика — ключевая часть курса.'
    },
    {
      question: 'Онлайн нельзя?',
      answer: 'Нет. Этот курс проводится только очно.'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Регрессивный гипноз - Профессиональное обучение в Москве | ДокДиалог</title>
        <meta 
          name="description" 
          content="Очное профессиональное обучение регрессивному гипнозу в Москве. Научный подход, практика под супервизией, малые группы до 12 человек. Для психологов, коучей и телесных специалистов." 
        />
        <meta 
          name="keywords" 
          content="регрессивный гипноз обучение, курсы гипноза москва, обучение гипнотерапии, регрессивная терапия, гипноз для психологов, профессиональное обучение гипнозу, курсы психотерапии москва" 
        />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://docdialog.su/regression-hypnosis" />
        <meta property="og:title" content="Регрессивный гипноз - Профессиональное обучение в Москве" />
        <meta 
          property="og:description" 
          content="Очное профессиональное обучение регрессивному гипнозу. Научный подход, практика под супервизией, малые группы до 12 человек." 
        />
        <meta 
          property="og:image" 
          content="https://cdn.poehali.dev/projects/3e596a93-af99-49a5-ab3f-15835165eb7b/files/9660d065-67cd-46af-979d-48206fcf4b83.jpg" 
        />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://docdialog.su/regression-hypnosis" />
        <meta property="twitter:title" content="Регрессивный гипноз - Профессиональное обучение в Москве" />
        <meta 
          property="twitter:description" 
          content="Очное профессиональное обучение регрессивному гипнозу. Научный подход, практика под супервизией, малые группы до 12 человек." 
        />
        <meta 
          property="twitter:image" 
          content="https://cdn.poehali.dev/projects/3e596a93-af99-49a5-ab3f-15835165eb7b/files/9660d065-67cd-46af-979d-48206fcf4b83.jpg" 
        />
        
        {/* Additional SEO tags */}
        <meta name="robots" content="index, follow" />
        <meta name="author" content="ДокДиалог" />
        <meta name="theme-color" content="#000000" />
        <link rel="canonical" href="https://docdialog.su/regression-hypnosis" />
        
        {/* Schema.org markup */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Course",
            "name": "Регрессивный гипноз",
            "description": "Очное профессиональное обучение работе с регрессивными состояниями памяти, опыта и перспектив развития личности",
            "provider": {
              "@type": "Organization",
              "name": "ДокДиалог",
              "url": "https://docdialog.su"
            },
            "courseMode": "offline",
            "educationalLevel": "Professional",
            "teaches": "Регрессивный гипноз как прикладной инструмент психотерапии и коучинга",
            "audience": {
              "@type": "EducationalAudience",
              "audienceType": "Психологи, психотерапевты, коучи, телесные специалисты"
            },
            "hasCourseInstance": [
              {
                "@type": "CourseInstance",
                "name": "Базовый уровень",
                "courseMode": "onsite",
                "duration": "P5D",
                "location": {
                  "@type": "Place",
                  "address": {
                    "@type": "PostalAddress",
                    "addressLocality": "Москва",
                    "addressCountry": "RU"
                  }
                }
              },
              {
                "@type": "CourseInstance",
                "name": "Продвинутый уровень",
                "courseMode": "onsite",
                "duration": "P5D",
                "location": {
                  "@type": "Place",
                  "address": {
                    "@type": "PostalAddress",
                    "addressLocality": "Москва",
                    "addressCountry": "RU"
                  }
                }
              },
              {
                "@type": "CourseInstance",
                "name": "Супервизия и мастерство",
                "courseMode": "onsite",
                "duration": "P3D",
                "location": {
                  "@type": "Place",
                  "address": {
                    "@type": "PostalAddress",
                    "addressLocality": "Москва",
                    "addressCountry": "RU"
                  }
                }
              }
            ],
            "offers": {
              "@type": "AggregateOffer",
              "availability": "https://schema.org/InStock",
              "priceCurrency": "RUB"
            }
          })}
        </script>
      </Helmet>
      <Navigation />
      <RegressionHypnosisHero onCTAClick={scrollToCTA} />
      <RegressionHypnosisContent />
      <RegressionHypnosisPrograms />
      <RegressionHypnosisFooter openFaq={openFaq} setOpenFaq={setOpenFaq} faqs={faqs} />
      <SchoolsFooter />
    </div>
  );
}