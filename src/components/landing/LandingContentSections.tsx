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
        <section className="py-20 sm:py-24 md:py-28 bg-gradient-to-b from-white via-gray-50/50 to-white">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">{aboutTitle}</h2>
              <p className="text-lg sm:text-xl text-gray-600 leading-relaxed whitespace-pre-line font-light">
                {aboutText}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Gallery Section */}
      {gallery && gallery.length > 0 && (
        <section className="py-16 sm:py-20 md:py-24 bg-white">
          <div className="container mx-auto px-6">
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 max-w-6xl mx-auto">
              {gallery.map((img, index) => (
                <div key={index} className="relative group overflow-hidden rounded-2xl w-[calc(50%-0.5rem)] sm:w-[calc(33.333%-1rem)] lg:w-[calc(25%-1.125rem)] aspect-square shadow-lg hover:shadow-2xl transition-all">
                  <img 
                    src={img} 
                    alt={`Фото ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Certificates Section */}
      {certificates && certificates.length > 0 && (
        <section className="py-16 sm:py-20 md:py-24 bg-gradient-to-b from-amber-50/30 via-orange-50/20 to-white">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">Сертификаты и дипломы</h2>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 max-w-6xl mx-auto">
              {certificates.map((cert, index) => (
                <div key={index} className="relative group overflow-hidden rounded-2xl border border-amber-200/50 w-[calc(50%-0.5rem)] sm:w-[calc(33.333%-1rem)] lg:w-[calc(25%-1.125rem)] aspect-[3/4] shadow-lg hover:shadow-2xl transition-all bg-white">
                  <img 
                    src={cert} 
                    alt={`Сертификат ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-amber-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Services Section */}
      {services && services.length > 0 && (
        <section className="py-16 sm:py-20 md:py-24 bg-white">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">Мои услуги</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto">
              {services.map((service, index) => (
                <div 
                  key={index} 
                  className="group rounded-3xl border border-gray-200/80 hover:border-gray-300 hover:shadow-2xl transition-all duration-300 bg-white overflow-hidden"
                >
                  {service.image && (
                    <div className="relative overflow-hidden">
                      <img 
                        src={service.image} 
                        alt={service.name} 
                        className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-xl font-bold flex-1 text-gray-900">{service.name}</h3>
                      {service.price && (
                        <Badge className={`bg-gradient-to-r ${gradientClass} text-white border-0 px-3 py-1 text-sm font-semibold shadow-lg`}>
                          {service.price} ₽
                        </Badge>
                      )}
                    </div>
                    {service.description && (
                      <p className="text-gray-600 text-base mb-4 leading-relaxed">{service.description}</p>
                    )}
                    {service.duration && (
                      <div className="flex items-center text-gray-500">
                        <Icon name="Clock" size={18} className="mr-2" />
                        <span className="text-sm font-medium">{service.duration}</span>
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
        <section className="py-20 sm:py-24 md:py-28 bg-gradient-to-b from-rose-50/30 via-pink-50/20 to-white">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">Специальные предложения</h2>
            <p className="text-center text-lg text-gray-600 mb-12 max-w-2xl mx-auto font-light">
              Выгодные скидки и подарочные сертификаты
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto">
              {offers.map((offer, index) => (
                <div 
                  key={index} 
                  className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-rose-200/50"
                >
                  {offer.image && (
                    <div className="relative overflow-hidden">
                      <img 
                        src={offer.image} 
                        alt={offer.title} 
                        className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-rose-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-xl font-bold text-gray-900 flex-1">{offer.title}</h3>
                      <Badge className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-3 py-1 text-sm font-semibold shadow-lg">
                        {offer.discount}
                      </Badge>
                    </div>
                    <p className="text-gray-600 text-base mb-6 leading-relaxed">{offer.description}</p>
                    
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
        <section className="py-16 sm:py-20 md:py-24 bg-gradient-to-b from-gray-50/50 via-white to-gray-50/30">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">{processTitle}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 max-w-7xl mx-auto">
              {processSteps.map((step, index) => (
                <div key={index} className="text-center group">
                  <div className="relative inline-block mb-6">
                    <div className={`absolute inset-0 bg-gradient-to-br ${gradientClass} rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity`}></div>
                    <div className={`relative w-20 h-20 rounded-full bg-gradient-to-br ${gradientClass} flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform`}>
                      <Icon name={step.icon} size={32} className="text-white" fallback="Circle" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Blog Section - Premium/Luxury only */}
      {blog && blog.length > 0 && (template === 'premium' || template === 'luxury') && (
        <section className="py-16 sm:py-20 md:py-24 bg-white overflow-hidden">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">Блог и новости</h2>
              <p className="text-lg text-gray-600 font-light">
                Полезные материалы и советы от специалиста
              </p>
            </div>
            <div className="flex gap-6 overflow-x-auto pb-6 px-6 -mx-6 snap-x snap-mandatory scrollbar-hide justify-center">
              {blog.map((post, index) => (
                <div 
                  key={index} 
                  className="flex-shrink-0 w-[320px] sm:w-[360px] group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200/80 snap-start"
                >
                  {post.image && (
                    <div className="relative overflow-hidden">
                      <img 
                        src={post.image} 
                        alt={post.title} 
                        className="w-full h-52 object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3 text-gray-900">{post.title}</h3>
                    <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3">{post.content}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">{post.date}</span>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className={`text-transparent bg-gradient-to-r ${gradientClass} bg-clip-text hover:opacity-80 font-semibold`}
                        onClick={() => onPostClick(post)}
                      >
                        Читать далее
                        <Icon name="ArrowRight" size={16} className="ml-1" />
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