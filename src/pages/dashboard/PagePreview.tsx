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
  reviews: Array<{
    name: string;
    rating: number;
    text: string;
    date: string;
  }>;
  blog: Array<{
    title: string;
    content: string;
    image: string;
    date: string;
  }>;
  videos: string[];
  template: string;
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
            <h2 className="text-4xl font-bold text-center mb-12">Мои услуги</h2>
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

      {/* Blog Section - Premium/Luxury only */}
      {pageData.blog && pageData.blog.length > 0 && (pageData.template === 'premium' || pageData.template === 'luxury') && (
        <section className="py-20 bg-gradient-to-b from-white to-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-4">Блог и новости</h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              Полезные материалы и советы от специалиста
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {pageData.blog.map((post: any, index: number) => (
                <div 
                  key={index} 
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
                >
                  {post.image && (
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3 text-gray-900">{post.title}</h3>
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-3">{post.content}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">{post.date}</span>
                      <Button size="sm" variant="ghost" className={`text-${gradientClass.includes('blue') ? 'blue' : gradientClass.includes('purple') ? 'purple' : 'indigo'}-600`}>
                        Читать далее
                        <Icon name="ArrowRight" size={14} className="ml-1" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Reviews Section */}
      {pageData.reviews && pageData.reviews.length > 0 && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-4">Отзывы клиентов</h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              Реальные истории людей, которым я помог
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {pageData.reviews.map((review: any, index: number) => (
                <div 
                  key={index} 
                  className="p-6 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-100 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white font-bold text-lg">
                      {review.name.charAt(0)}
                    </div>
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Icon
                          key={i}
                          name="Star"
                          size={16}
                          className={i < review.rating ? 'text-amber-500 fill-amber-500' : 'text-gray-300'}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="font-semibold text-gray-900 mb-2">{review.name}</p>
                  <p className="text-gray-700 text-sm leading-relaxed mb-3">{review.text}</p>
                  <p className="text-xs text-gray-500">{review.date}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Свяжитесь со мной</h2>
              <p className="text-xl text-gray-600">
                Выберите удобный способ связи и запишитесь на сеанс
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {pageData.showPhone && (
                <div className="group p-6 rounded-2xl bg-white border-2 border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all text-center">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${gradientClass} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon name="Phone" size={28} className="text-white" />
                  </div>
                  <p className="font-semibold text-lg mb-2">Телефон</p>
                  <p className="text-gray-600 text-sm mb-4">Позвоните для записи</p>
                  <Button className={`w-full bg-gradient-to-r ${gradientClass}`}>
                    Позвонить
                  </Button>
                </div>
              )}
              {pageData.showTelegram && (
                <div className="group p-6 rounded-2xl bg-white border-2 border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all text-center">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${gradientClass} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon name="Send" size={28} className="text-white" />
                  </div>
                  <p className="font-semibold text-lg mb-2">Telegram</p>
                  <p className="text-gray-600 text-sm mb-4">Напишите в мессенджер</p>
                  <Button className={`w-full bg-gradient-to-r ${gradientClass}`}>
                    Написать
                  </Button>
                </div>
              )}
              {pageData.showWhatsapp && (
                <div className="group p-6 rounded-2xl bg-white border-2 border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all text-center">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${gradientClass} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon name="MessageCircle" size={28} className="text-white" />
                  </div>
                  <p className="font-semibold text-lg mb-2">WhatsApp</p>
                  <p className="text-gray-600 text-sm mb-4">Свяжитесь через WhatsApp</p>
                  <Button className={`w-full bg-gradient-to-r ${gradientClass}`}>
                    Связаться
                  </Button>
                </div>
              )}
            </div>
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