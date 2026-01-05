import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { Navigation } from '@/components/Navigation';
import ReviewsSection from '@/components/ReviewsSection';
import RatingDisplay from '@/components/RatingDisplay';

interface MastermindData {
  id: number;
  slug: string;
  title: string;
  description: string;
  hero_title: string;
  hero_subtitle: string;
  event_date: string;
  location: string;
  max_participants: number;
  current_participants: number;
  price: number | null;
  original_price: number | null;
  discount_price: number | null;
  category: 'technique' | 'business' | 'soft_skills' | 'health' | 'digital';
  about_event: string;
  what_you_get: Array<string>;
  event_program: Array<{
    time: string;
    title: string;
    description: string;
  }>;
  host: {
    name: string;
    position: string;
    bio: string;
    photo: string;
    experience: string;
  };
  co_hosts: Array<{
    name: string;
    position: string;
    photo: string;
  }>;
  benefits: Array<string>;
  testimonials: Array<{
    name: string;
    text: string;
    rating: number;
    photo: string;
  }>;
  faq: Array<{
    question: string;
    answer: string;
  }>;
  cta_button_text: string;
  external_url: string;
  image_url: string;
  school_slug?: string;
  school_name?: string;
}

const MASTERMIND_API_URL = 'https://functions.poehali.dev/95b5e0a7-51f7-4fb1-b196-a49f5feff58f';

export default function MastermindPublicLanding() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [mastermind, setMastermind] = useState<MastermindData | null>(null);
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);

  useEffect(() => {
    loadMastermind();
  }, [slug]);

  const loadMastermind = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${MASTERMIND_API_URL}?action=masterminds&slug=${slug}`);
      if (response.ok) {
        const data = await response.json();
        setMastermind(data);
      }
    } catch (error) {
      console.error('Load error:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Icon name="Loader2" size={48} className="animate-spin text-blue-600" />
      </div>
    );
  }

  if (!mastermind) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <div className="container mx-auto px-4 py-12 text-center">
          <Icon name="AlertCircle" size={48} className="mx-auto mb-4 text-red-600" />
          <h2 className="text-2xl font-bold mb-2">Мастермайнд не найден</h2>
          <p className="text-gray-600 mb-6">Событие было удалено или не существует</p>
          <Button onClick={() => navigate('/courses')}>
            Вернуться к каталогу
          </Button>
        </div>
      </div>
    );
  }

  const displayPrice = mastermind.discount_price || mastermind.price;
  const hasDiscount = mastermind.original_price && mastermind.discount_price;

  return (
    <div className="min-h-screen bg-white">
      {/* Hero секция */}
      <section className="relative min-h-[500px] sm:min-h-[600px] flex items-center justify-center bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 text-white py-12 sm:py-20">
        {mastermind.cover_url && (
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${mastermind.cover_url})` }}
          />
        )}
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl w-full">
          {mastermind.school_logo_url && (
            <div className="mb-4 sm:mb-6">
              <img 
                src={mastermind.school_logo_url} 
                alt="Логотип школы" 
                className="mx-auto h-8 sm:h-10 w-auto object-contain drop-shadow-lg opacity-90"
              />
            </div>
          )}
          <div className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 bg-white/20 backdrop-blur-sm rounded-full text-xs sm:text-sm mb-3 sm:mb-4">
            Мастермайнд • {formatDate(mastermind.event_date)}
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 drop-shadow-lg leading-tight px-2">
            {mastermind.hero_title || mastermind.title}
          </h1>
          <div className="flex justify-center mb-4 sm:mb-6">
            <div className="bg-white/20 backdrop-blur-sm px-4 sm:px-6 py-1.5 sm:py-2 rounded-full">
              <RatingDisplay rating={rating} reviewCount={reviewCount} size="sm" className="text-white" />
            </div>
          </div>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 text-white/90 px-2">
            {mastermind.hero_subtitle || mastermind.description}
          </p>
          <div className="flex flex-wrap gap-2 sm:gap-4 justify-center items-center mb-6 sm:mb-8">
            <div className="flex items-center gap-1.5 sm:gap-2 bg-white/20 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-sm sm:text-base">
              <Icon name="MapPin" size={18} className="sm:w-5 sm:h-5" />
              <span className="truncate max-w-[150px] sm:max-w-none">{mastermind.location}</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2 bg-white/20 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-sm sm:text-base">
              <Icon name="Users" size={18} className="sm:w-5 sm:h-5" />
              <span>Макс. {mastermind.max_participants}</span>
            </div>
            {displayPrice && (
              <div className="flex items-center gap-1.5 sm:gap-2 bg-white/20 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-sm sm:text-base">
                <Icon name="Coins" size={18} className="sm:w-5 sm:h-5" />
                {hasDiscount ? (
                  <div className="flex items-center gap-2">
                    <span className="line-through opacity-70 text-xs sm:text-sm">{mastermind.original_price?.toLocaleString('ru-RU')} ₽</span>
                    <span className="font-bold">{displayPrice.toLocaleString('ru-RU')} ₽</span>
                  </div>
                ) : (
                  <span>{displayPrice.toLocaleString('ru-RU')} ₽</span>
                )}
              </div>
            )}
          </div>
          <Button 
            size="lg" 
            className="bg-white text-purple-600 hover:bg-gray-100"
            onClick={() => window.open(mastermind.external_url, '_blank')}
          >
            {mastermind.cta_button_text}
          </Button>
        </div>
      </section>

      {/* О мастермайнде */}
      {mastermind.about_event && (
        <section className="py-12 sm:py-16 md:py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 text-center">О мастермайнде</h2>
            <div className="prose prose-sm sm:prose-base md:prose-lg max-w-none">
              <p className="text-sm sm:text-base md:text-lg text-gray-700 whitespace-pre-wrap leading-relaxed">
                {mastermind.about_event}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Что получите */}
      {mastermind.what_you_get && mastermind.what_you_get.length > 0 && (
        <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-10 md:mb-12 text-center">Что вы получите</h2>
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
              {mastermind.what_you_get.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 sm:gap-4 bg-white p-4 sm:p-6 rounded-xl shadow-sm">
                  <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <Icon name="CheckCircle2" size={20} className="sm:w-6 sm:h-6 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm sm:text-base md:text-lg text-gray-700">{item}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Программа */}
      {mastermind.event_program && mastermind.event_program.length > 0 && (
        <section className="py-12 sm:py-16 md:py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-10 md:mb-12 text-center">Программа мастермайнда</h2>
            <div className="space-y-4 sm:space-y-6">
              {mastermind.event_program.map((block, idx) => (
                <Card key={idx} className="border-l-4 border-purple-500">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-full flex items-center justify-center font-bold text-purple-600 text-lg sm:text-xl">
                        {idx + 1}
                      </div>
                      <div className="flex-1">
                        <div className="text-xs sm:text-sm text-purple-600 font-semibold mb-1 sm:mb-2">{block.time}</div>
                        <h3 className="text-base sm:text-lg md:text-xl font-bold mb-2">{block.title}</h3>
                        <p className="text-sm sm:text-base text-gray-600">{block.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Ведущий */}
      {mastermind.host && mastermind.host.name && (
        <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-10 md:mb-12 text-center">Ведущий мастермайнда</h2>
            <Card className="overflow-hidden">
              <CardContent className="p-6 sm:p-8">
                <div className="flex flex-col md:flex-row gap-6 sm:gap-8 items-center md:items-start">
                  <img 
                    src={mastermind.host.photo} 
                    alt={mastermind.host.name}
                    className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full object-cover shadow-lg"
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400';
                    }}
                  />
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-xl sm:text-2xl font-bold mb-2">{mastermind.host.name}</h3>
                    <p className="text-base sm:text-lg text-purple-600 font-medium mb-3 sm:mb-4">{mastermind.host.position}</p>
                    <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3 sm:mb-4">{mastermind.host.bio}</p>
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 justify-center md:justify-start">
                      <Icon name="Award" size={14} className="sm:w-4 sm:h-4" />
                      <span>{mastermind.host.experience}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Со-ведущие */}
            {mastermind.co_hosts && mastermind.co_hosts.length > 0 && (
              <div className="mt-8 sm:mt-10 md:mt-12">
                <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center">Со-ведущие</h3>
                <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                  {mastermind.co_hosts.map((coHost, idx) => (
                    <Card key={idx}>
                      <CardContent className="p-4 sm:p-6 flex items-center gap-3 sm:gap-4">
                        <img 
                          src={coHost.photo} 
                          alt={coHost.name}
                          className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100';
                          }}
                        />
                        <div>
                          <h4 className="font-bold text-sm sm:text-base">{coHost.name}</h4>
                          <p className="text-xs sm:text-sm text-gray-600">{coHost.position}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Преимущества */}
      {mastermind.benefits && mastermind.benefits.length > 0 && (
        <section className="py-12 sm:py-16 md:py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-10 md:mb-12 text-center">Преимущества участия</h2>
            <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
              {mastermind.benefits.map((benefit, idx) => (
                <div key={idx} className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-purple-50 rounded-lg">
                  <Icon name="CheckCircle2" size={20} className="sm:w-6 sm:h-6 text-purple-600 flex-shrink-0" />
                  <span className="text-sm sm:text-base text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Отзывы */}
      {mastermind.testimonials && mastermind.testimonials.length > 0 && (
        <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-10 md:mb-12 text-center">Отзывы участников</h2>
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
              {mastermind.testimonials.map((testimonial, idx) => (
                <Card key={idx}>
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                      <img 
                        src={testimonial.photo} 
                        alt={testimonial.name}
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100';
                        }}
                      />
                      <div>
                        <h4 className="font-semibold text-sm sm:text-base">{testimonial.name}</h4>
                        <div className="flex gap-0.5">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Icon key={i} name="Star" size={12} className="sm:w-3.5 sm:h-3.5 text-yellow-500 fill-yellow-500" />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-sm sm:text-base text-gray-600 italic">"{testimonial.text}"</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      {mastermind.faq && mastermind.faq.length > 0 && (
        <section className="py-12 sm:py-16 md:py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-10 md:mb-12 text-center">Часто задаваемые вопросы</h2>
            <div className="space-y-3 sm:space-y-4">
              {mastermind.faq.map((item, idx) => (
                <Card key={idx}>
                  <CardContent className="p-4 sm:p-6">
                    <h3 className="text-base sm:text-lg font-bold mb-2 text-purple-600">{item.question}</h3>
                    <p className="text-sm sm:text-base text-gray-700">{item.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Отзывы с ReviewsSection */}
      <ReviewsSection entityType="mastermind" entityId={mastermind.id} onRatingUpdate={(r, c) => { setRating(r); setReviewCount(c); }} />

      {/* CTA секция */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-purple-600 to-pink-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">Готовы изменить свой бизнес?</h2>
          <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 text-white/90">
            Присоединяйтесь к мастермайнду и получите персональный план роста
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-4 sm:mb-6">
            {displayPrice && (
              <div className="text-2xl sm:text-3xl font-bold">
                {hasDiscount ? (
                  <>
                    <span className="line-through opacity-70 text-lg sm:text-2xl mr-2">{mastermind.original_price?.toLocaleString('ru-RU')} ₽</span>
                    <span>{displayPrice.toLocaleString('ru-RU')} ₽</span>
                  </>
                ) : (
                  <span>{displayPrice.toLocaleString('ru-RU')} ₽</span>
                )}
              </div>
            )}
          </div>
          <Button 
            size="lg" 
            className="bg-white text-purple-600 hover:bg-gray-100 text-sm sm:text-base px-6 sm:px-8"
            onClick={() => window.open(mastermind.external_url, '_blank')}
          >
            {mastermind.cta_button_text}
          </Button>
          <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-white/80">
            Осталось мест: {mastermind.max_participants - (mastermind.current_participants || 0)} из {mastermind.max_participants}
          </p>
        </div>
      </section>
    </div>
  );
}