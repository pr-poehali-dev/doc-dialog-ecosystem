import { useState, useEffect } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "Что такое Док диалог?",
    answer: "Док диалог — экосистема для профессионалов индустрии красоты и здоровья. Мы объединяем специалистов, салоны и школы на одной платформе для поиска работы, обучения и развития бизнеса."
  },
  {
    question: "Как найти проверенного массажиста?",
    answer: "В нашем каталоге представлены только верифицированные специалисты с подтвержденными дипломами и сертификатами. Вы можете изучить профиль специалиста, посмотреть его опыт работы и рейтинг."
  },
  {
    question: "Как салону найти специалистов?",
    answer: "Зарегистрируйте салон на платформе, разместите вакансию с описанием условий работы. Специалисты увидят вашу вакансию и смогут откликнуться. Вы сможете изучить профили кандидатов и выбрать подходящих."
  },
  {
    question: "Как специалисту найти работу?",
    answer: "Создайте профиль специалиста, заполните информацию о навыках и опыте, загрузите дипломы. Просматривайте вакансии салонов в каталоге и откликайтесь на подходящие предложения."
  },
  {
    question: "Есть ли обучающие курсы на платформе?",
    answer: "Да, у нас есть каталог школ массажа и обучающих курсов. Школы размещают онлайн и офлайн программы обучения. Вы можете выбрать курс, пройти обучение и получить сертификат."
  },
  {
    question: "Как школе разместить свои курсы?",
    answer: "Зарегистрируйтесь как школа, создайте профиль организации, добавьте описание курсов с программой обучения, стоимостью и расписанием. После модерации ваши курсы появятся в каталоге."
  },
  {
    question: "Платная ли регистрация на платформе?",
    answer: "Базовая регистрация для специалистов и школ бесплатная. Для салонов действуют тарифы в зависимости от количества вакансий. Есть дополнительные платные функции для продвижения профиля."
  },
  {
    question: "Как проверяются специалисты?",
    answer: "Все специалисты проходят модерацию: проверяем дипломы об образовании, сертификаты повышения квалификации, опыт работы. Только после одобрения профиль становится публичным."
  }
];

export default function FAQ() {
  useEffect(() => {
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqData.map(item => ({
        "@type": "Question",
        "name": item.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": item.answer
        }
      }))
    };

    const scriptId = 'faq-structured-data';
    let script = document.getElementById(scriptId);
    
    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    
    script.textContent = JSON.stringify(structuredData);

    return () => {
      const existingScript = document.getElementById(scriptId);
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  return (
    <section className="py-10 md:py-16 px-4 bg-secondary/30">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-3xl font-bold text-center mb-8 md:mb-12">
          Часто задаваемые вопросы
        </h2>
        
        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqData.map((item, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="bg-background rounded-lg border px-6"
            >
              <AccordionTrigger className="text-left hover:no-underline">
                <span className="font-semibold">{item.question}</span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}