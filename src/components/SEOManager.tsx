import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { updatePageSEO, injectStructuredData } from '@/utils/seo';
import { 
  getWebsiteStructuredData, 
  getOrganizationStructuredData, 
  getMedicalOrganizationStructuredData,
  getServiceStructuredData 
} from '@/utils/structuredData';

export default function SEOManager() {
  const location = useLocation();

  useEffect(() => {
    // Проверяем, является ли путь несуществующим маршрутом (404)
    const validRoutes = [
      '/', '/about', '/pricing', '/masseurs', '/masseurs-info', '/for-specialists',
      '/medical-report', '/schools', '/schools-info', '/courses', '/salons', 
      '/salons-info', '/salons-presentation', '/login', '/register', '/dashboard',
      '/profile', '/settings', '/forgot-password', '/register-masseur', 
      '/register-school', '/register-salon', '/register-client', '/forum',
      '/tools', '/diagnostic', '/contact', '/premium', '/privacy', '/terms'
      // Добавьте другие существующие маршруты по необходимости
    ];
    
    const isValidRoute = validRoutes.some(route => 
      location.pathname === route || 
      location.pathname.startsWith(route + '/') ||
      location.pathname.startsWith('/masseur/') ||
      location.pathname.startsWith('/school/') ||
      location.pathname.startsWith('/course/') ||
      location.pathname.startsWith('/salon/') ||
      location.pathname.startsWith('/forum/') ||
      location.pathname.startsWith('/admin/') ||
      location.pathname.startsWith('/dashboard/')
    );

    if (!isValidRoute) {
      // Для несуществующих страниц устанавливаем SEO для 404
      updatePageSEO('/404');
      // Добавляем мета-тег для поисковиков
      const metaRobots = document.querySelector('meta[name="robots"]');
      if (metaRobots) {
        metaRobots.setAttribute('content', 'noindex, nofollow');
      } else {
        const meta = document.createElement('meta');
        meta.name = 'robots';
        meta.content = 'noindex, nofollow';
        document.head.appendChild(meta);
      }
    } else {
      updatePageSEO(location.pathname);
      // Удаляем noindex для обычных страниц
      const metaRobots = document.querySelector('meta[name="robots"]');
      if (metaRobots && metaRobots.getAttribute('content') === 'noindex, nofollow') {
        metaRobots.remove();
      }
    }
    
    injectStructuredData('organization');
    injectStructuredData('medicalOrganization');
    
    injectAdditionalStructuredData('website', getWebsiteStructuredData());
    injectAdditionalStructuredData('org', getOrganizationStructuredData());
    injectAdditionalStructuredData('medical', getMedicalOrganizationStructuredData());
    injectAdditionalStructuredData('service', getServiceStructuredData());
    
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return null;
}

function injectAdditionalStructuredData(id: string, data: any) {
  const scriptId = `structured-data-${id}`;
  let script = document.getElementById(scriptId);
  
  if (!script) {
    script = document.createElement('script');
    script.id = scriptId;
    script.type = 'application/ld+json';
    document.head.appendChild(script);
  }
  
  script.textContent = JSON.stringify(data);
}