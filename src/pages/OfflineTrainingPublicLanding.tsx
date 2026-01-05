import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { Navigation } from '@/components/Navigation';

interface OfflineTrainingData {
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
  about_training: string;
  what_you_get: Array<string>;
  training_program: Array<{
    time: string;
    title: string;
    description: string;
  }>;
  instructor: {
    name: string;
    position: string;
    bio: string;
    photo: string;
    experience: string;
  };
  co_instructors: Array<{
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
}

const TRAINING_API_URL = 'https://functions.poehali.dev/95b5e0a7-51f7-4fb1-b196-a49f5feff58f';

export default function OfflineTrainingPublicLanding() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [training, setTraining] = useState<OfflineTrainingData | null>(null);
  const [loading, setLoading] = useState(true);
  
  const isPreview = new URLSearchParams(window.location.search).get('preview') === 'true';

  useEffect(() => {
    loadTraining();
  }, [slug]);

  const loadTraining = async () => {
    try {
      setLoading(true);
      const url = isPreview 
        ? `${TRAINING_API_URL}?action=offline_trainings&slug=${slug}&skip_status_check=true`
        : `${TRAINING_API_URL}?action=offline_trainings&slug=${slug}`;
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setTraining(data);
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

  if (!training) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <div className="container mx-auto px-4 py-12 text-center">
          <Icon name="AlertCircle" size={48} className="mx-auto mb-4 text-red-600" />
          <h2 className="text-2xl font-bold mb-2">Обучение не найдено</h2>
          <p className="text-gray-600 mb-6">Курс был удален или не существует</p>
          <Button onClick={() => navigate('/courses')}>
            Вернуться к каталогу
          </Button>
        </div>
      </div>
    );
  }

  const displayPrice = training.discount_price || training.price;
  const hasDiscount = training.original_price && training.discount_price;

  return (
    <div className="min-h-screen bg-white">
      <section className="relative min-h-[500px] sm:min-h-[600px] flex items-center justify-center bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 text-white py-12 sm:py-20">
        {training.cover_url && (
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${training.cover_url})` }}
          />
        )}
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl w-full">
          {training.school_logo_url && (
            <div className="mb-4 sm:mb-6">
              <img 
                src={training.school_logo_url} 
                alt="Логотип школы" 
                className="mx-auto h-8 sm:h-10 w-auto object-contain drop-shadow-lg opacity-90"
              />
            </div>
          )}
          <div className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 bg-white/20 backdrop-blur-sm rounded-full text-xs sm:text-sm mb-3 sm:mb-4">
            Очное обучение • Старт {formatDate(training.event_date)}
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 drop-shadow-lg leading-tight px-2">
            {training.hero_title || training.title}
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 text-white/90 px-2">
            {training.hero_subtitle || training.description}
          </p>
          <div className="flex flex-wrap gap-2 sm:gap-4 justify-center items-center mb-6 sm:mb-8">
            <div className="flex items-center gap-1.5 sm:gap-2 bg-white/20 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-sm sm:text-base">
              <Icon name="MapPin" size={18} className="sm:w-5 sm:h-5" />
              <span className="truncate max-w-[150px] sm:max-w-none">{training.location}</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2 bg-white/20 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-sm sm:text-base">
              <Icon name="Users" size={18} className="sm:w-5 sm:h-5" />
              <span>{training.current_participants} / {training.max_participants}</span>
            </div>
            {training.max_participants - training.current_participants > 0 && (
              <div className="flex items-center gap-1.5 sm:gap-2 bg-green-500/30 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg border border-green-300/30 text-sm sm:text-base">
                <Icon name="Check" size={18} className="sm:w-5 sm:h-5" />
                <span>Осталось {training.max_participants - training.current_participants}</span>
              </div>
            )}
            {training.max_participants - training.current_participants === 0 && (
              <div className="flex items-center gap-1.5 sm:gap-2 bg-red-500/30 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg border border-red-300/30 text-sm sm:text-base">
                <Icon name="AlertCircle" size={18} className="sm:w-5 sm:h-5" />
                <span>Нет мест</span>
              </div>
            )}
            {displayPrice && (
              <div className="flex items-center gap-1.5 sm:gap-2 bg-white/20 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-sm sm:text-base">
                <Icon name="Coins" size={18} className="sm:w-5 sm:h-5" />
                {hasDiscount ? (
                  <div className="flex items-center gap-2">
                    <span className="line-through opacity-70 text-xs sm:text-sm">{training.original_price?.toLocaleString('ru-RU')} ₽</span>
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
            className="bg-white text-blue-600 hover:bg-gray-100"
            onClick={() => window.open(training.external_url, '_blank')}
          >
            {training.cta_button_text}
          </Button>
        </div>
      </section>

      {training.about_training && (
        <section className="py-12 sm:py-16 md:py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 text-center">О курсе</h2>
            <div className="prose prose-sm sm:prose-base md:prose-lg max-w-none">
              <p className="text-sm sm:text-base md:text-lg text-gray-700 whitespace-pre-wrap leading-relaxed">
                {training.about_training}
              </p>
            </div>
          </div>
        </section>
      )}

      {training.what_you_get && training.what_you_get.length > 0 && (
        <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-10 md:mb-12 text-center">Что вы получите</h2>
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
              {training.what_you_get.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 sm:gap-4 bg-white p-4 sm:p-6 rounded-xl shadow-sm">
                  <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Icon name="Check" size={20} className="sm:w-6 sm:h-6 text-blue-600" />
                  </div>
                  <p className="text-sm sm:text-base text-gray-800 font-medium pt-1 sm:pt-0">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {training.training_program && training.training_program.length > 0 && (
        <section className="py-12 sm:py-16 md:py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-10 md:mb-12 text-center">Программа обучения</h2>
            <div className="space-y-4 sm:space-y-6">
              {training.training_program.map((module, idx) => (
                <Card key={idx}>
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex gap-3 sm:gap-4">
                      <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-lg sm:text-xl font-bold text-blue-600">{idx + 1}</span>
                      </div>
                      <div className="flex-1">
                        <div className="text-xs sm:text-sm text-gray-500 mb-1">{module.time}</div>
                        <h3 className="text-base sm:text-lg md:text-xl font-bold mb-2">{module.title}</h3>
                        <p className="text-sm sm:text-base text-gray-700">{module.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {training.instructor && (
        <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-10 md:mb-12 text-center">Преподаватель</h2>
            <Card>
              <CardContent className="p-6 sm:p-8">
                <div className="flex flex-col md:flex-row gap-6 sm:gap-8 items-center md:items-start">
                  {training.instructor.photo && (
                    <img 
                      src={training.instructor.photo} 
                      alt={training.instructor.name}
                      className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full object-cover"
                    />
                  )}
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-xl sm:text-2xl font-bold mb-2">{training.instructor.name}</h3>
                    <p className="text-base sm:text-lg text-blue-600 font-medium mb-3 sm:mb-4">{training.instructor.position}</p>
                    <p className="text-sm sm:text-base text-gray-700 mb-3 sm:mb-4">{training.instructor.bio}</p>
                    <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-50 rounded-full">
                      <Icon name="Award" size={16} className="sm:w-[18px] sm:h-[18px] text-blue-600" />
                      <span className="text-xs sm:text-sm text-blue-800">{training.instructor.experience}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {training.benefits && training.benefits.length > 0 && (
        <section className="py-12 sm:py-16 md:py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-10 md:mb-12 text-center">Преимущества обучения</h2>
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
              {training.benefits.map((benefit, idx) => (
                <div key={idx} className="flex items-start gap-3 sm:gap-4">
                  <Icon name="Star" size={20} className="sm:w-6 sm:h-6 text-yellow-500 flex-shrink-0" />
                  <span className="text-sm sm:text-base text-gray-800">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {training.testimonials && training.testimonials.length > 0 && (
        <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-10 md:mb-12 text-center">Отзывы выпускников</h2>
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
              {training.testimonials.map((testimonial, idx) => (
                <Card key={idx}>
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex gap-3 sm:gap-4 mb-3 sm:mb-4">
                      {testimonial.photo && (
                        <img 
                          src={testimonial.photo} 
                          alt={testimonial.name}
                          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
                        />
                      )}
                      <div>
                        <div className="font-semibold text-sm sm:text-base">{testimonial.name}</div>
                        <div className="flex gap-0.5 sm:gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Icon 
                              key={i} 
                              name="Star" 
                              size={14} 
                              className={`sm:w-4 sm:h-4 ${i < testimonial.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-sm sm:text-base text-gray-700">{testimonial.text}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {training.faq && training.faq.length > 0 && (
        <section className="py-12 sm:py-16 md:py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-10 md:mb-12 text-center">Часто задаваемые вопросы</h2>
            <div className="space-y-3 sm:space-y-4">
              {training.faq.map((item, idx) => (
                <Card key={idx}>
                  <CardContent className="p-4 sm:p-6">
                    <h3 className="text-base sm:text-lg font-bold mb-2">{item.question}</h3>
                    <p className="text-sm sm:text-base text-gray-700">{item.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">Готовы начать обучение?</h2>
          <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 text-white/90">
            Присоединяйтесь к нашему курсу и получите профессию массажиста
          </p>
          <Button 
            size="lg" 
            className="bg-white text-blue-600 hover:bg-gray-100"
            onClick={() => window.open(training.external_url, '_blank')}
          >
            {training.cta_button_text}
          </Button>
        </div>
      </section>
    </div>
  );
}