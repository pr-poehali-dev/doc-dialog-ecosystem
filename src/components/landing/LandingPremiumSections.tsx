import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';

interface BlogPost {
  title: string;
  content: string;
  image: string;
  date: string;
}

interface Offer {
  title: string;
  description: string;
  discount: string;
  image: string;
}

interface LandingPremiumSectionsProps {
  blog: BlogPost[];
  offers: Offer[];
  template: string;
  gradientClass: string;
  onPostClick: (post: BlogPost) => void;
}

export default function LandingPremiumSections({
  blog,
  offers,
  template,
  gradientClass,
  onPostClick,
}: LandingPremiumSectionsProps) {
  const [orderForm, setOrderForm] = useState<{ [key: number]: { name: string; email: string; phone: string; agreed: boolean } }>({});
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollButtons = () => {
    const container = scrollContainerRef.current;
    if (!container) return;
    
    setCanScrollLeft(container.scrollLeft > 0);
    setCanScrollRight(
      container.scrollLeft < container.scrollWidth - container.clientWidth - 10
    );
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    updateScrollButtons();
    container.addEventListener('scroll', updateScrollButtons);
    window.addEventListener('resize', updateScrollButtons);

    return () => {
      container.removeEventListener('scroll', updateScrollButtons);
      window.removeEventListener('resize', updateScrollButtons);
    };
  }, [blog.length]);

  const scrollLeft = () => {
    const container = scrollContainerRef.current;
    if (container) {
      container.scrollBy({ left: -400, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    const container = scrollContainerRef.current;
    if (container) {
      container.scrollBy({ left: 400, behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Blog Section - Premium/Luxury only */}
      {blog && blog.length > 0 && (template === 'premium' || template === 'luxury') && (
        <section className="py-20 bg-gradient-to-b from-white to-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-4">Блог и новости</h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              Полезные материалы и советы от специалиста
            </p>
            <div className="relative max-w-7xl mx-auto">
              {canScrollLeft && (
                <button
                  onClick={scrollLeft}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-3 transition-all"
                  aria-label="Прокрутить влево"
                >
                  <Icon name="ChevronLeft" size={24} className="text-gray-700" />
                </button>
              )}
              {canScrollRight && (
                <button
                  onClick={scrollRight}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-3 transition-all"
                  aria-label="Прокрутить вправо"
                >
                  <Icon name="ChevronRight" size={24} className="text-gray-700" />
                </button>
              )}
              <div 
                ref={scrollContainerRef}
                className="flex gap-6 overflow-x-auto scroll-smooth px-4 pb-2"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
              <style>{`
                div::-webkit-scrollbar {
                  display: none;
                }
              `}</style>
              {blog.map((post: BlogPost, index: number) => (
                <div 
                  key={index} 
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow border border-gray-100 flex-shrink-0 w-[350px]"
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
          </div>
        </section>
      )}

      {/* Offers Section - Super Premium only */}
      {offers && offers.length > 0 && template === 'luxury' && (
        <section className="py-16 sm:py-20 md:py-24 bg-gradient-to-b from-white to-rose-50">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-4">Специальные предложения</h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              Выгодные скидки и подарочные сертификаты
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {offers.map((offer: Offer, index: number) => (
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
    </>
  );
}