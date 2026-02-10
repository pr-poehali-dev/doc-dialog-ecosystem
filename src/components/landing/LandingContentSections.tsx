import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';

interface Service {
  name: string;
  duration: string;
  price: string;
  description: string;
  image?: string;
}

interface ProcessStep {
  title: string;
  description: string;
  icon: string;
}

interface Offer {
  title: string;
  description: string;
  discount: string;
  image: string;
}

interface BlogPost {
  title: string;
  content: string;
  image: string;
  date: string;
}

interface LandingContentSectionsProps {
  aboutTitle: string;
  aboutText: string;
  services: Service[];
  processTitle: string;
  processSteps: ProcessStep[];
  gallery: string[];
  certificates: string[];
  offers: Offer[];
  blog: BlogPost[];
  template: string;
  gradientClass: string;
  onPostClick: (post: BlogPost) => void;
}

export default function LandingContentSections({
  aboutTitle,
  aboutText,
  services,
  processTitle,
  processSteps,
  gallery,
  certificates,
  offers,
  blog,
  template,
  gradientClass,
  onPostClick,
}: LandingContentSectionsProps) {
  const [orderForm, setOrderForm] = useState<{ [key: number]: { name: string; email: string; phone: string; agreed: boolean } }>({});

  return (
    <>
      {/* About Section */}
      {aboutText && (
        <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-white to-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">{aboutTitle}</h2>
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed whitespace-pre-line">
                {aboutText}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Gallery Section */}
      {gallery && gallery.length > 0 && (
        <section className="py-12 sm:py-16 md:py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 max-w-6xl mx-auto">
              {gallery.map((img, index) => (
                <div key={index} className="relative group overflow-hidden rounded-xl aspect-square">
                  <img 
                    src={img} 
                    alt={`Фото ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity"></div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Certificates Section */}
      {certificates && certificates.length > 0 && (
        <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12">Сертификаты и дипломы</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 max-w-6xl mx-auto">
              {certificates.map((cert, index) => (
                <div key={index} className="relative group overflow-hidden rounded-xl border-2 border-amber-100 aspect-[3/4]">
                  <img 
                    src={cert} 
                    alt={`Сертификат ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity"></div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Services Section */}
      {services && services.length > 0 && (
        <section className="py-12 sm:py-16 md:py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12">Мои услуги</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto">
              {services.map((service, index) => (
                <div 
                  key={index} 
                  className="rounded-2xl border-2 border-gray-100 hover:border-blue-200 hover:shadow-xl transition-all bg-white overflow-hidden"
                >
                  {service.image && (
                    <img 
                      src={service.image} 
                      alt={service.name} 
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-4 sm:p-6">
                    <div className="flex items-start justify-between mb-3 sm:mb-4">
                      <h3 className="text-lg sm:text-xl font-bold flex-1 text-gray-900">{service.name}</h3>
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
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Offers Section - Super Premium only */}
      {offers && offers.length > 0 && template === 'luxury' && (
        <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-white to-rose-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-3 sm:mb-4">Специальные предложения</h2>
            <p className="text-center text-sm sm:text-base text-gray-600 mb-8 sm:mb-12 max-w-2xl mx-auto px-4">
              Выгодные скидки и подарочные сертификаты
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto">
              {offers.map((offer, index) => (
                <div 
                  key={index} 
                  className="bg-white rounded-2xl overflow-hidden shadow-lg border-2 border-rose-100"
                >
                  {offer.image && (
                    <img 
                      src={offer.image} 
                      alt={offer.title} 
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-bold text-gray-900 flex-1">{offer.title}</h3>
                      <Badge className="bg-gradient-to-r from-rose-500 to-pink-500 text-white">
                        {offer.discount}
                      </Badge>
                    </div>
                    <p className="text-gray-600 text-sm mb-6 leading-relaxed">{offer.description}</p>
                    
                    {/* Order Form */}
                    <div className="space-y-3 pt-4 border-t">
                      <p className="text-sm font-semibold text-gray-700 mb-3">Заказать предложение:</p>
                      <Input
                        placeholder="Ваше имя"
                        value={orderForm[index]?.name || ''}
                        onChange={(e) => setOrderForm({
                          ...orderForm,
                          [index]: { ...orderForm[index], name: e.target.value, email: orderForm[index]?.email || '', phone: orderForm[index]?.phone || '', agreed: orderForm[index]?.agreed || false }
                        })}
                        className="text-sm"
                      />
                      <Input
                        type="email"
                        placeholder="Email"
                        value={orderForm[index]?.email || ''}
                        onChange={(e) => setOrderForm({
                          ...orderForm,
                          [index]: { ...orderForm[index], email: e.target.value, name: orderForm[index]?.name || '', phone: orderForm[index]?.phone || '', agreed: orderForm[index]?.agreed || false }
                        })}
                        className="text-sm"
                      />
                      <Input
                        type="tel"
                        placeholder="+7 (999) 123-45-67"
                        value={orderForm[index]?.phone || ''}
                        onChange={(e) => setOrderForm({
                          ...orderForm,
                          [index]: { ...orderForm[index], phone: e.target.value, name: orderForm[index]?.name || '', email: orderForm[index]?.email || '', agreed: orderForm[index]?.agreed || false }
                        })}
                        className="text-sm"
                      />
                      <div className="flex items-start gap-2">
                        <input
                          type="checkbox"
                          id={`agree-${index}`}
                          checked={orderForm[index]?.agreed || false}
                          onChange={(e) => setOrderForm({
                            ...orderForm,
                            [index]: { ...orderForm[index], agreed: e.target.checked, name: orderForm[index]?.name || '', email: orderForm[index]?.email || '', phone: orderForm[index]?.phone || '' }
                          })}
                          className="mt-1"
                        />
                        <label htmlFor={`agree-${index}`} className="text-xs text-gray-600">
                          Согласен с <a href="#" className="text-blue-600 underline">политикой конфиденциальности</a> и <a href="#" className="text-blue-600 underline">договором оферты</a>
                        </label>
                      </div>
                      <Button 
                        className={`w-full bg-gradient-to-r ${gradientClass}`}
                        disabled={!orderForm[index]?.name || !orderForm[index]?.email || !orderForm[index]?.phone || !orderForm[index]?.agreed}
                        onClick={() => {
                          alert(`Заявка отправлена!\nИмя: ${orderForm[index]?.name}\nEmail: ${orderForm[index]?.email}\nТелефон: ${orderForm[index]?.phone}\nПредложение: ${offer.title}`);
                        }}
                      >
                        <Icon name="Send" size={16} className="mr-2" />
                        Заказать
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Process Section */}
      {processSteps && processSteps.length > 0 && (
        <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12">{processTitle}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 max-w-6xl mx-auto">
              {processSteps.map((step, index) => (
                <div key={index} className="text-center">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${gradientClass} flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                    <Icon name={step.icon} size={28} className="text-white" fallback="Circle" />
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-gray-900">{step.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Blog Section - Premium/Luxury only */}
      {blog && blog.length > 0 && (template === 'premium' || template === 'luxury') && (
        <section className="py-12 sm:py-16 md:py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-3 sm:mb-4">Блог и новости</h2>
            <p className="text-center text-sm sm:text-base text-gray-600 mb-8 sm:mb-12 max-w-2xl mx-auto px-4">
              Полезные материалы и советы от специалиста
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto">
              {blog.map((post, index) => (
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
                  <div className="p-4 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-gray-900">{post.title}</h3>
                    <p className="text-gray-600 text-sm mb-3 sm:mb-4 leading-relaxed line-clamp-3">{post.content}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">{post.date}</span>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="text-blue-600 hover:text-blue-700"
                        onClick={() => onPostClick(post)}
                      >
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
    </>
  );
}