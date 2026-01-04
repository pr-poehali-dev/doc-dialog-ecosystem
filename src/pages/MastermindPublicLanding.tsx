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
      <section className="relative h-[600px] flex items-center justify-center bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 text-white">
        {mastermind.cover_url && (
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${mastermind.cover_url})` }}
          />
        )}
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 text-center px-4 max-w-4xl">
          {mastermind.school_logo_url && (
            <div className="mb-6">
              <img 
                src={mastermind.school_logo_url} 
                alt="Логотип школы" 
                className="mx-auto h-10 w-auto object-contain drop-shadow-lg opacity-90"
              />
            </div>
          )}
          <div className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm mb-4">
            Мастермайнд • {formatDate(mastermind.event_date)}
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 drop-shadow-lg">
            {mastermind.hero_title || mastermind.title}
          </h1>
          <div className="flex justify-center mb-6">
            <div className="bg-white/20 backdrop-blur-sm px-6 py-2 rounded-full">
              <RatingDisplay rating={rating} reviewCount={reviewCount} size="lg" className="text-white" />
            </div>
          </div>
          <p className="text-xl md:text-2xl mb-8 text-white/90">
            {mastermind.hero_subtitle || mastermind.description}
          </p>
          <div className="flex flex-wrap gap-4 justify-center items-center mb-8">
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
              <Icon name="MapPin" size={20} />
              <span>{mastermind.location}</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
              <Icon name="Users" size={20} />
              <span>Макс. {mastermind.max_participants} участников</span>
            </div>
            {displayPrice && (
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                <Icon name="Coins" size={20} />
                {hasDiscount ? (
                  <div className="flex items-center gap-2">
                    <span className="line-through opacity-70">{mastermind.original_price?.toLocaleString('ru-RU')} ₽</span>
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
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-4xl font-bold mb-8 text-center">О мастермайнде</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                {mastermind.about_event}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Что получите */}
      {mastermind.what_you_get && mastermind.what_you_get.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-4xl font-bold mb-12 text-center">Что вы получите</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {mastermind.what_you_get.map((item, idx) => (
                <div key={idx} className="flex items-start gap-4 bg-white p-6 rounded-xl shadow-sm">
                  <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <Icon name="CheckCircle2" size={24} className="text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-lg text-gray-700">{item}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Программа */}
      {mastermind.event_program && mastermind.event_program.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-4xl font-bold mb-12 text-center">Программа мастермайнда</h2>
            <div className="space-y-6">
              {mastermind.event_program.map((block, idx) => (
                <Card key={idx} className="border-l-4 border-purple-500">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center font-bold text-purple-600">
                        {idx + 1}
                      </div>
                      <div className="flex-1">
                        <div className="text-sm text-purple-600 font-semibold mb-2">{block.time}</div>
                        <h3 className="text-xl font-bold mb-2">{block.title}</h3>
                        <p className="text-gray-600">{block.description}</p>
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
        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-4xl font-bold mb-12 text-center">Ведущий мастермайнда</h2>
            <Card className="overflow-hidden">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                  <img 
                    src={mastermind.host.photo} 
                    alt={mastermind.host.name}
                    className="w-48 h-48 rounded-full object-cover shadow-lg"
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400';
                    }}
                  />
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-2xl font-bold mb-2">{mastermind.host.name}</h3>
                    <p className="text-purple-600 font-medium mb-4">{mastermind.host.position}</p>
                    <p className="text-gray-700 leading-relaxed mb-4">{mastermind.host.bio}</p>
                    <div className="flex items-center gap-2 text-sm text-gray-600 justify-center md:justify-start">
                      <Icon name="Award" size={16} />
                      <span>{mastermind.host.experience}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Со-ведущие */}
            {mastermind.co_hosts && mastermind.co_hosts.length > 0 && (
              <div className="mt-12">
                <h3 className="text-2xl font-bold mb-6 text-center">Со-ведущие</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {mastermind.co_hosts.map((coHost, idx) => (
                    <Card key={idx}>
                      <CardContent className="p-6 flex items-center gap-4">
                        <img 
                          src={coHost.photo} 
                          alt={coHost.name}
                          className="w-20 h-20 rounded-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100';
                          }}
                        />
                        <div>
                          <h4 className="font-bold">{coHost.name}</h4>
                          <p className="text-sm text-gray-600">{coHost.position}</p>
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
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-4xl font-bold mb-12 text-center">Преимущества участия</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {mastermind.benefits.map((benefit, idx) => (
                <div key={idx} className="flex items-center gap-3 p-4 bg-purple-50 rounded-lg">
                  <Icon name="CheckCircle2" size={24} className="text-purple-600 flex-shrink-0" />
                  <span className="text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Отзывы */}
      {mastermind.testimonials && mastermind.testimonials.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-4xl font-bold mb-12 text-center">Отзывы участников</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {mastermind.testimonials.map((testimonial, idx) => (
                <Card key={idx}>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <img 
                        src={testimonial.photo} 
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100';
                        }}
                      />
                      <div>
                        <h4 className="font-semibold">{testimonial.name}</h4>
                        <div className="flex">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Icon key={i} name="Star" size={14} className="text-yellow-500 fill-yellow-500" />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600 italic">"{testimonial.text}"</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      {mastermind.faq && mastermind.faq.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-4xl font-bold mb-12 text-center">Часто задаваемые вопросы</h2>
            <div className="space-y-4">
              {mastermind.faq.map((item, idx) => (
                <Card key={idx}>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold mb-2 text-purple-600">{item.question}</h3>
                    <p className="text-gray-700">{item.answer}</p>
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
      <section className="py-20 bg-gradient-to-br from-purple-600 to-pink-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Готовы изменить свой бизнес?</h2>
          <p className="text-xl mb-8 text-white/90">
            Присоединяйтесь к мастермайнду и получите персональный план роста
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
            {displayPrice && (
              <div className="text-3xl font-bold">
                {hasDiscount ? (
                  <>
                    <span className="line-through opacity-70 text-2xl mr-2">{mastermind.original_price?.toLocaleString('ru-RU')} ₽</span>
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
            className="bg-white text-purple-600 hover:bg-gray-100"
            onClick={() => window.open(mastermind.external_url, '_blank')}
          >
            {mastermind.cta_button_text}
          </Button>
          <p className="mt-4 text-sm text-white/80">
            Осталось мест: {mastermind.max_participants - (mastermind.current_participants || 0)} из {mastermind.max_participants}
          </p>
        </div>
      </section>
    </div>
  );
}