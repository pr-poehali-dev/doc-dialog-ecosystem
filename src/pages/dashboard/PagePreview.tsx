import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface PageData {
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  profilePhoto: string;
  aboutTitle: string;
  aboutText: string;
  services: Array<{
    name: string;
    duration: string;
    price: string;
    description: string;
  }>;
  processTitle: string;
  processSteps: Array<{
    title: string;
    description: string;
    icon: string;
  }>;
  gallery: string[];
  certificates: string[];
  showPhone: boolean;
  showTelegram: boolean;
  showWhatsapp: boolean;
  colorTheme: string;
}

export default function PagePreview() {
  const [pageData, setPageData] = useState<PageData | null>(null);

  useEffect(() => {
    const data = localStorage.getItem('pageBuilderData');
    if (data) {
      try {
        setPageData(JSON.parse(data));
      } catch (e) {
        console.error('Failed to parse page data', e);
      }
    }
  }, []);

  if (!pageData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="text-center">
          <Icon name="Loader2" className="animate-spin mx-auto mb-4" size={48} />
          <p className="text-gray-600">Загрузка предпросмотра...</p>
        </div>
      </div>
    );
  }

  const themeColors = {
    gradient: 'from-blue-600 to-indigo-600',
    blue: 'from-blue-600 to-blue-700',
    purple: 'from-purple-600 to-pink-600',
  };

  const gradientClass = themeColors[pageData.colorTheme as keyof typeof themeColors] || themeColors.gradient;

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
        {pageData.heroImage ? (
          <>
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${pageData.heroImage})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50"></div>
          </>
        ) : (
          <div className={`absolute inset-0 bg-gradient-to-br ${gradientClass}`}></div>
        )}
        
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          {pageData.profilePhoto && (
            <img 
              src={pageData.profilePhoto} 
              alt="Специалист" 
              className="w-32 h-32 rounded-full mx-auto mb-6 border-4 border-white shadow-2xl object-cover"
            />
          )}
          <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
            {pageData.heroTitle}
          </h1>
          <p className="text-lg md:text-2xl text-white/95 mb-8 max-w-3xl mx-auto drop-shadow">
            {pageData.heroSubtitle}
          </p>
          <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 shadow-xl">
            <Icon name="Phone" size={20} className="mr-2" />
            Записаться на сеанс
          </Button>
        </div>
      </section>

      {/* About Section */}
      {pageData.aboutText && (
        <section className="py-20 bg-gradient-to-b from-white to-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl font-bold mb-6">{pageData.aboutTitle}</h2>
              <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-line">
                {pageData.aboutText}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Services Section */}
      {pageData.services && pageData.services.length > 0 && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12">Услуги массажа</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {pageData.services.map((service, index) => (
                <div 
                  key={index} 
                  className="p-6 rounded-2xl border-2 border-gray-100 hover:border-blue-200 hover:shadow-xl transition-all bg-white"
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-bold flex-1 text-gray-900">{service.name}</h3>
                    {service.price && (
                      <Badge className={`bg-gradient-to-r ${gradientClass} text-white border-0`}>
                        {service.price} ₽
                      </Badge>
                    )}
                  </div>
                  {service.description && (
                    <p className="text-gray-600 text-sm mb-3 leading-relaxed">{service.description}</p>
                  )}
                  {service.duration && (
                    <div className="flex items-center text-gray-500 text-sm">
                      <Icon name="Clock" size={16} className="mr-2" />
                      {service.duration}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Process Section */}
      {pageData.processSteps && pageData.processSteps.length > 0 && (
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12">{pageData.processTitle}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {pageData.processSteps.map((step, index) => (
                <div key={index} className="text-center">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${gradientClass} flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                    <Icon name={step.icon as any} size={28} className="text-white" />
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-gray-900">{step.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Gallery Section */}
      {pageData.gallery && pageData.gallery.length > 0 && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12">Галерея</h2>
            <div className="grid md:grid-cols-3 gap-4 max-w-6xl mx-auto">
              {pageData.gallery.map((img, index) => (
                <div key={index} className="overflow-hidden rounded-2xl shadow-lg">
                  <img 
                    src={img} 
                    alt={`Фото ${index + 1}`} 
                    className="w-full h-64 object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Certificates Section */}
      {pageData.certificates && pageData.certificates.length > 0 && (
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-4">Сертификаты и дипломы</h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              Подтвержденная квалификация и профессиональное образование
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {pageData.certificates.map((cert, index) => (
                <div key={index} className="overflow-hidden rounded-2xl shadow-lg border-2 border-amber-100">
                  <img 
                    src={cert} 
                    alt={`Сертификат ${index + 1}`} 
                    className="w-full h-80 object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact Section */}
      <section className={`py-20 bg-gradient-to-r ${gradientClass} text-white relative overflow-hidden`}>
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Записаться на сеанс</h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Свяжитесь со мной удобным способом и получите консультацию
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            {pageData.showPhone && (
              <Button size="lg" variant="secondary" className="shadow-lg">
                <Icon name="Phone" size={20} className="mr-2" />
                Позвонить
              </Button>
            )}
            {pageData.showTelegram && (
              <Button size="lg" variant="secondary" className="shadow-lg">
                <Icon name="Send" size={20} className="mr-2" />
                Telegram
              </Button>
            )}
            {pageData.showWhatsapp && (
              <Button size="lg" variant="secondary" className="shadow-lg">
                <Icon name="MessageCircle" size={20} className="mr-2" />
                WhatsApp
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Icon name="Heart" size={16} className="text-red-400" />
            <p className="text-gray-400">Создано на платформе Док диалог</p>
          </div>
          <p className="text-gray-500 text-sm">© 2024 Все права защищены</p>
        </div>
      </footer>
    </div>
  );
}
