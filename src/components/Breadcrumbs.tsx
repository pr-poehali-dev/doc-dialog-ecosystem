import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { useEffect } from 'react';
import { injectStructuredData } from '@/utils/seo';

interface BreadcrumbItem {
  label: string;
  path: string;
}

const routeLabels: Record<string, string> = {
  '': 'Главная',
  'about': 'О нас',
  'pricing': 'Цены',
  'masseurs': 'Специалисты',
  'masseurs-info': 'Для специалистов',
  'for-specialists': 'Для специалистов',
  'medical-report': 'Медицинские справки',
  'schools': 'Школы',
  'schools-info': 'Для школ',
  'courses': 'Курсы',
  'salons': 'Салоны',
  'salons-info': 'Для салонов',
  'salons-presentation': 'Презентация',
  'privacy': 'Политика конфиденциальности',
  'terms': 'Пользовательское соглашение',
  'masseur-welcome': 'Добро пожаловать',
};

export default function Breadcrumbs() {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(Boolean);

  const breadcrumbs: BreadcrumbItem[] = [
    { label: 'Главная', path: '/' }
  ];

  let currentPath = '';
  pathSegments.forEach((segment) => {
    currentPath += `/${segment}`;
    const label = routeLabels[segment] || segment;
    breadcrumbs.push({ label, path: currentPath });
  });

  useEffect(() => {
    const structuredData = breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.label,
      "item": `https://docdialog.su${item.path}`
    }));
    
    injectStructuredData('breadcrumb', structuredData);
  }, [location.pathname]);

  if (breadcrumbs.length <= 1) {
    return null;
  }

  return (
    <nav className="flex items-center gap-2 text-sm text-muted-foreground py-3 px-4" aria-label="Breadcrumb">
      {breadcrumbs.map((crumb, index) => (
        <div key={crumb.path} className="flex items-center gap-2">
          {index > 0 && <ChevronRight className="w-4 h-4" />}
          {index === breadcrumbs.length - 1 ? (
            <span className="text-foreground font-medium">{crumb.label}</span>
          ) : (
            <Link 
              to={crumb.path} 
              className="hover:text-foreground transition-colors flex items-center gap-1"
            >
              {index === 0 && <Home className="w-4 h-4" />}
              {crumb.label}
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
}
