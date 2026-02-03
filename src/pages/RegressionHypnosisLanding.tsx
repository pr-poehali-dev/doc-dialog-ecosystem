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
      question: 'Это научно обоснованный метод или эзотерика?',
      answer: 'Регрессивный гипноз — это прикладной метод работы с памятью и бессознательным, основанный на нейрофизиологии изменённых состояний сознания, психологии травмы и современных исследованиях работы мозга. Мы не используем мистические концепции, а опираемся на научное понимание того, как психика хранит и перерабатывает опыт. Метод применяется психотерапевтами по всему миру и имеет доказанную эффективность в работе с повторяющимися паттернами поведения, необъяснимыми страхами и психосоматическими симптомами.'
    },
    {
      question: 'Можно ли учиться без опыта в гипнозе или психологии?',
      answer: 'Да, базовый курс рассчитан на начинающих. Мы выстраиваем обучение от фундамента: объясняем, что такое изменённое состояние сознания, как работает бессознательное, какова роль специалиста. Однако желательно иметь базовое понимание психологии или опыт помогающих профессий (коучинг, телесная терапия, консультирование). Если у вас совсем нет опыта работы с людьми — рекомендуем сначала пройти вводный курс по основам психологии.'
    },
    {
      question: 'Сколько практики будет в программе?',
      answer: 'Практика — это основа обучения. На базовом курсе около 60% времени — это работа в парах и тройках, демонстрации, разборы реальных сеансов. Вы будете как в роли регрессолога, так и в роли клиента, чтобы прочувствовать процесс с обеих сторон. На продвинутых уровнях добавляется супервизия ваших реальных случаев. Без практики навык не формируется — это наш принцип.'
    },
    {
      question: 'Почему курс только очный, онлайн невозможно?',
      answer: 'Регрессивный гипноз — это глубокая работа с состояниями сознания, где критически важен живой контакт, считывание невербальных сигналов, удержание поля безопасности. Онлайн невозможно отследить тонкие телесные изменения клиента, вовремя скорректировать процесс или оказать поддержку при сильных эмоциональных реакциях. Кроме того, очное обучение в малых группах (до 12 человек) позволяет преподавателю работать с каждым участником индивидуально, давать обратную связь и корректировать ошибки в режиме реального времени.'
    },
    {
      question: 'Смогу ли я работать с клиентами после базового курса?',
      answer: 'После базового курса вы получите фундамент метода и сможете проводить регрессивные сеансы с соблюдением всех протоколов безопасности. Однако мы рекомендуем начинать практику постепенно: сначала с близкими людьми или в учебных группах, затем переходить к клиентской работе с получением супервизии. Полная профессиональная уверенность формируется после прохождения всех трёх уровней и накопления личной практики. Регрессивный гипноз — это навык, который растёт с опытом.'
    },
    {
      question: 'Чем ваш курс отличается от других программ по гипнозу?',
      answer: 'Наш подход основан на трёх принципах: научность (без эзотерики и мистификаций), безопасность (чёткие протоколы работы с уязвимыми состояниями) и практическая применимость (вы учитесь не "погружать в транс", а решать конкретные терапевтические задачи клиента). Мы не обещаем "быстрого результата за 2 дня" — наша программа поэтапная, с глубокой отработкой каждого уровня. Преподаватель — практикующий специалист с 15+ летним опытом, который работает с реальными клиентами и знает все подводные камни метода.'
    },
    {
      question: 'Есть ли противопоказания для обучения или практики?',
      answer: 'Для обучения противопоказаний нет — учиться может любой желающий с устойчивой психикой. Однако для работы с клиентами есть строгие ограничения: нельзя проводить регрессию людям с психиатрическими диагнозами (шизофрения, биполярное расстройство), в состоянии острого кризиса, под воздействием психоактивных веществ, беременным женщинам без согласования с врачом. На курсе мы подробно разбираем все противопоказания и учим распознавать "красные флаги", когда работу нужно остановить или перенаправить клиента к психиатру.'
    },
    {
      question: 'Выдаётся ли сертификат или диплом после обучения?',
      answer: 'После успешного прохождения каждого уровня вы получаете сертификат о прохождении программы повышения квалификации (для тех, у кого есть базовое психологическое или медицинское образование) или сертификат о дополнительном обучении (для специалистов смежных профессий). Важно понимать: сертификат — это не "разрешение работать", а подтверждение того, что вы освоили программу. Ваша профессиональная компетентность определяется практикой, супервизией и постоянным развитием навыка.'
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