import { useState } from 'react';
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
      <Navigation />
      <RegressionHypnosisHero onCTAClick={scrollToCTA} />
      <RegressionHypnosisContent />
      <RegressionHypnosisPrograms />
      <RegressionHypnosisFooter openFaq={openFaq} setOpenFaq={setOpenFaq} faqs={faqs} />
      <SchoolsFooter />
    </div>
  );
}
