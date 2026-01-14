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
    question: "Как работает онлайн консультация врача?",
    answer: "Выберите специалиста в каталоге, запишитесь на удобное время и общайтесь через защищенный чат на платформе. Врач проконсультирует вас, даст рекомендации и при необходимости выпишет справку."
  },
  {
    question: "Как найти проверенного массажиста?",
    answer: "В нашем каталоге представлены только верифицированные специалисты с подтвержденными дипломами и сертификатами. Вы можете изучить профиль специалиста, почитать отзывы других клиентов и выбрать подходящего."
  },
  {
    question: "Сколько стоят консультации?",
    answer: "Стоимость услуг устанавливает каждый специалист индивидуально. В среднем онлайн консультация врача стоит от 500 до 2000 рублей, массаж — от 1500 до 5000 рублей в зависимости от специалиста и города."
  },
  {
    question: "Как записаться к специалисту?",
    answer: "Зарегистрируйтесь на платформе, выберите специалиста в каталоге, посмотрите доступное время в его календаре и нажмите 'Записаться'. Специалист подтвердит запись, и вы сможете общаться через чат."
  },
  {
    question: "Безопасно ли передавать медицинские данные?",
    answer: "Да, абсолютно безопасно. Все данные передаются по защищенному протоколу HTTPS, переписка с врачом конфиденциальна, а личная информация хранится в соответствии с законом о защите персональных данных (152-ФЗ)."
  },
  {
    question: "Могу ли я отменить запись?",
    answer: "Да, вы можете отменить запись через личный кабинет. Обратите внимание, что некоторые специалисты могут установить условия отмены (например, не позднее чем за 24 часа до приема)."
  },
  {
    question: "Есть ли обучающие курсы на платформе?",
    answer: "Да, у нас есть каталог школ массажа и обучающих курсов. Вы можете выбрать онлайн или офлайн обучение, получить сертификат и начать работать специалистом."
  },
  {
    question: "Как стать специалистом на платформе?",
    answer: "Зарегистрируйтесь как специалист, заполните профиль, загрузите дипломы и сертификаты. После проверки документов ваш профиль будет одобрен, и вы сможете принимать заявки от клиентов."
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
    <section className="py-16 px-4 bg-secondary/30">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-3xl font-bold text-center mb-12">
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
