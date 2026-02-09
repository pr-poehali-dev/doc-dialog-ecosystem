import { useEffect } from 'react';
import { Navigation } from '@/components/Navigation';
import SchoolsFooter from '@/components/schools/SchoolsFooter';
import HeroSection from '@/components/medical-analysis/HeroSection';
import ProblemSections from '@/components/medical-analysis/ProblemSections';
import SolutionAndHowItWorks from '@/components/medical-analysis/SolutionAndHowItWorks';
import BenefitsAndForm from '@/components/medical-analysis/BenefitsAndForm';

const MedicalAnalysisLanding = () => {
  useEffect(() => {
    // SEO Meta Tags
    document.title = 'Расшифровка медицинских заключений для массажистов | ДокДиалог';
    
    // Description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Инструмент для массажистов и телесных специалистов. Поймите медицинское заключение клиента безопасно и профессионально. Попробуйте бесплатно — расшифровка за 2 минуты.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Инструмент для массажистов и телесных специалистов. Поймите медицинское заключение клиента безопасно и профессионально. Попробуйте бесплатно — расшифровка за 2 минуты.';
      document.head.appendChild(meta);
    }

    // Keywords
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    const keywords = 'расшифровка медицинских заключений, инструмент для массажистов, понять заключение врача, медицинские термины для массажистов, работа массажиста с клиентами, безопасность массажиста, телесные специалисты, профессиональный массаж';
    if (metaKeywords) {
      metaKeywords.setAttribute('content', keywords);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'keywords';
      meta.content = keywords;
      document.head.appendChild(meta);
    }

    // Open Graph
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', 'Расшифровка медицинских заключений для массажистов');
    } else {
      const meta = document.createElement('meta');
      meta.setAttribute('property', 'og:title');
      meta.content = 'Расшифровка медицинских заключений для массажистов';
      document.head.appendChild(meta);
    }

    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', 'Поймите запрос клиента спокойно, понятно и безопасно — без догадок и медицинских рисков. Попробуйте бесплатно за 2 минуты.');
    } else {
      const meta = document.createElement('meta');
      meta.setAttribute('property', 'og:description');
      meta.content = 'Поймите запрос клиента спокойно, понятно и безопасно — без догадок и медицинских рисков. Попробуйте бесплатно за 2 минуты.';
      document.head.appendChild(meta);
    }

    const ogType = document.querySelector('meta[property="og:type"]');
    if (ogType) {
      ogType.setAttribute('content', 'website');
    } else {
      const meta = document.createElement('meta');
      meta.setAttribute('property', 'og:type');
      meta.content = 'website';
      document.head.appendChild(meta);
    }

    const ogImage = document.querySelector('meta[property="og:image"]');
    if (ogImage) {
      ogImage.setAttribute('content', 'https://cdn.poehali.dev/projects/3e596a93-af99-49a5-ab3f-15835165eb7b/files/73e2d44e-d132-4acd-a468-5e243464d633.jpg');
    } else {
      const meta = document.createElement('meta');
      meta.setAttribute('property', 'og:image');
      meta.content = 'https://cdn.poehali.dev/projects/3e596a93-af99-49a5-ab3f-15835165eb7b/files/73e2d44e-d132-4acd-a468-5e243464d633.jpg';
      document.head.appendChild(meta);
    }

    // Twitter Card
    const twitterCard = document.querySelector('meta[name="twitter:card"]');
    if (twitterCard) {
      twitterCard.setAttribute('content', 'summary_large_image');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'twitter:card';
      meta.content = 'summary_large_image';
      document.head.appendChild(meta);
    }

    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) {
      twitterTitle.setAttribute('content', 'Расшифровка медицинских заключений для массажистов');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'twitter:title';
      meta.content = 'Расшифровка медицинских заключений для массажистов';
      document.head.appendChild(meta);
    }

    const twitterDescription = document.querySelector('meta[name="twitter:description"]');
    if (twitterDescription) {
      twitterDescription.setAttribute('content', 'Поймите запрос клиента спокойно и профессионально. Бесплатная демо-версия доступна.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'twitter:description';
      meta.content = 'Поймите запрос клиента спокойно и профессионально. Бесплатная демо-версия доступна.';
      document.head.appendChild(meta);
    }

    // Canonical URL
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', 'https://dokdialog.ru/medical-analysis');
    } else {
      const link = document.createElement('link');
      link.rel = 'canonical';
      link.href = 'https://dokdialog.ru/medical-analysis';
      document.head.appendChild(link);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50">
      <Navigation />
      <HeroSection />
      <ProblemSections />
      <SolutionAndHowItWorks />
      <BenefitsAndForm />
      <SchoolsFooter />
    </div>
  );
};

export default MedicalAnalysisLanding;