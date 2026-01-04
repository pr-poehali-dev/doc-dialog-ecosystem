import { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { Navigation } from '@/components/Navigation';
import ReviewsSection from '@/components/ReviewsSection';
import RatingDisplay from '@/components/RatingDisplay';

interface CourseData {
  id: number;
  slug: string;
  title: string;
  short_description: string;
  hero_title: string;
  hero_subtitle: string;
  category: string;
  type: string;
  price: number | null;
  duration_text: string;
  about_course: string;
  for_whom?: string;
  expectations?: string;
  what_you_learn: Array<string>;
  program_modules: Array<{
    title: string;
    description: string;
    duration: string;
  }>;
  author_name: string;
  author_position: string;
  author_bio: string;
  author_photo: string;
  author_experience: string;
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
  cta_button_url: string;
}

const COURSE_API_URL = 'https://functions.poehali.dev/a81dd7cd-c267-4f44-85f5-0da8353dc741';

export default function CoursePublicLanding() {
  const { slug } = useParams<{ slug: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState<CourseData | null>(null);
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);

  useEffect(() => {
    loadCourse();
  }, [slug]);

  const loadCourse = async () => {
    try {
      setLoading(true);
      const isPreview = searchParams.get('preview') === 'true';
      const previewParam = isPreview ? '&preview=true' : '';
      const response = await fetch(`${COURSE_API_URL}?slug=${slug}${previewParam}`);
      
      if (response.ok) {
        const data = await response.json();
        
        // Маппинг данных из бэкенда в формат компонента
        const mappedCourse = {
          id: data.id,
          slug: data.seo?.slug || slug,
          title: data.title,
          short_description: data.short_description,
          hero_title: data.seo?.title || data.title,
          hero_subtitle: data.short_description,
          category: data.category,
          type: data.type,
          price: data.pricing?.price_text ? parseFloat(data.pricing.price_text.replace(/[^0-9.]/g, '')) || null : null,
          duration_text: data.learning_format?.duration || '',
          about_course: data.promo?.description || '',
          what_you_learn: data.results || [],
          program_modules: (data.program || []).map((p: any) => ({
            title: p.module_name,
            description: p.description,
            duration: ''
          })),
          author_name: data.author?.name || '',
          author_position: data.author?.position || '',
          author_bio: data.author?.description || '',
          author_photo: data.author?.photo_url || '',
          author_experience: data.author?.experience || '',
          benefits: data.bonuses ? data.bonuses.map((b: any) => b.bonus_name) : [],
          testimonials: [],
          faq: [],
          cta_button_text: data.cta_button_text || 'Записаться',
          cta_button_url: data.pricing?.partner_link || '#',
          cover_url: data.cover_url,
          school_logo_url: data.school?.logo
        };
        
        setCourse(mappedCourse as any);
      } else {
        console.error('Course not found, status:', response.status);
        setCourse(null);
      }
    } catch (error) {
      console.error('Load error:', error);
      setCourse(null);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Icon name="Loader2" size={48} className="animate-spin text-blue-600" />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <div className="container mx-auto px-4 py-12 text-center">
          <Icon name="AlertCircle" size={48} className="mx-auto mb-4 text-red-600" />
          <h2 className="text-2xl font-bold mb-2">Курс не найден</h2>
          <p className="text-gray-600 mb-6">Курс был удален или не существует</p>
          <Button onClick={() => navigate('/courses')}>
            Вернуться к каталогу
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero секция */}
      <section className="relative h-[600px] flex items-center justify-center bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 text-white">
        {course.cover_url && (
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${course.cover_url})` }}
          />
        )}
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 text-center px-4 max-w-4xl">
          {course.school_logo_url && (
            <div className="mb-6">
              <img 
                src={course.school_logo_url} 
                alt="Логотип школы" 
                className="mx-auto h-10 w-auto object-contain drop-shadow-lg opacity-90"
              />
            </div>
          )}
          <div className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm mb-4">
            {course.category} • {course.type === 'online' ? 'Онлайн' : 'Офлайн'}
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 drop-shadow-lg">
            {course.hero_title || course.title}
          </h1>
          <div className="flex justify-center mb-6">
            <div className="bg-white/20 backdrop-blur-sm px-6 py-2 rounded-full">
              <RatingDisplay rating={rating} reviewCount={reviewCount} size="lg" className="text-white" />
            </div>
          </div>
          <p className="text-xl md:text-2xl mb-8 text-white/90">
            {course.hero_subtitle || course.short_description}
          </p>
          <div className="flex flex-wrap gap-4 justify-center items-center mb-8">
            {course.duration_text && (
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                <Icon name="Clock" size={20} />
                <span>{course.duration_text}</span>
              </div>
            )}
            {course.price !== null && (
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                <Icon name="Coins" size={20} />
                <span>{course.price.toLocaleString('ru-RU')} ₽</span>
              </div>
            )}
          </div>
          <Button 
            size="lg" 
            className="bg-white text-blue-600 hover:bg-gray-100"
            onClick={() => window.open(course.cta_button_url, '_blank')}
          >
            {course.cta_button_text}
          </Button>
        </div>
      </section>

      {/* О курсе */}
      {course.about_course && (
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12">О курсе</h2>
            <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-line">
              {course.about_course}
            </p>
          </div>
        </section>
      )}

      {/* Для кого и Ожидания */}
      {(course.for_whom || course.expectations) && (
        <section className="py-20 bg-gradient-to-br from-amber-50 to-orange-50">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8">
              {course.for_whom && (
                <Card className="border-2 border-amber-200 shadow-lg">
                  <CardHeader className="bg-gradient-to-br from-amber-100 to-orange-100">
                    <CardTitle className="flex items-center gap-3 text-2xl">
                      <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center">
                        <Icon name="Users" size={24} className="text-white" />
                      </div>
                      Для кого этот курс
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line text-lg">
                      {course.for_whom}
                    </p>
                  </CardContent>
                </Card>
              )}
              
              {course.expectations && (
                <Card className="border-2 border-blue-200 shadow-lg">
                  <CardHeader className="bg-gradient-to-br from-blue-100 to-purple-100">
                    <CardTitle className="flex items-center gap-3 text-2xl">
                      <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                        <Icon name="Target" size={24} className="text-white" />
                      </div>
                      Что вы получите
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line text-lg">
                      {course.expectations}
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Чему вы научитесь */}
      {course.what_you_learn && course.what_you_learn.length > 0 && (
        <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12">Чему вы научитесь</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {course.what_you_learn.map((item, i) => (
                <div key={i} className="flex items-start gap-4 bg-white p-6 rounded-xl shadow-md">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon name="Check" size={20} className="text-white" />
                  </div>
                  <p className="text-gray-800 pt-2">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Программа курса */}
      {course.program_modules && course.program_modules.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12">Программа курса</h2>
            <div className="space-y-6">
              {course.program_modules.map((module, i) => (
                <Card key={i}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>Модуль {i + 1}: {module.title}</span>
                      {module.duration && (
                        <span className="text-sm font-normal text-gray-600">
                          <Icon name="Clock" size={16} className="inline mr-1" />
                          {module.duration}
                        </span>
                      )}
                    </CardTitle>
                  </CardHeader>
                  {module.description && (
                    <CardContent>
                      <p className="text-gray-700">{module.description}</p>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Преимущества */}
      {course.benefits && course.benefits.length > 0 && (
        <section className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12">Преимущества обучения</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {course.benefits.map((benefit, i) => (
                <div key={i} className="bg-white p-6 rounded-xl shadow-md text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="Star" size={24} className="text-white" />
                  </div>
                  <p className="text-gray-800 font-medium">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Автор курса */}
      {course.author_name && (
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12">Автор курса</h2>
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="w-64 h-64 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center overflow-hidden flex-shrink-0">
                {course.author_photo ? (
                  <img src={course.author_photo} alt={course.author_name} className="w-full h-full object-cover" />
                ) : (
                  <Icon name="User" size={96} className="text-white" />
                )}
              </div>
              <div>
                <h3 className="text-3xl font-bold mb-2">{course.author_name}</h3>
                {course.author_position && <p className="text-xl text-purple-600 mb-4">{course.author_position}</p>}
                {course.author_experience && <p className="text-gray-600 mb-4">{course.author_experience}</p>}
                {course.author_bio && <p className="text-gray-700 leading-relaxed">{course.author_bio}</p>}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Отзывы */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <ReviewsSection
            entityType="course"
            entityId={course.id}
            onRatingUpdate={(newRating, newCount) => {
              setRating(newRating);
              setReviewCount(newCount);
            }}
          />
        </div>
      </section>

      {/* FAQ */}
      {course.faq && course.faq.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12">Частые вопросы</h2>
            <div className="space-y-4">
              {course.faq.map((item, i) => (
                <Card key={i}>
                  <CardHeader>
                    <CardTitle className="text-lg">{item.question}</CardTitle>
                  </CardHeader>
                  {item.answer && (
                    <CardContent>
                      <p className="text-gray-700">{item.answer}</p>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA секция */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Готовы начать обучение?</h2>
          <p className="text-xl mb-8 text-white/90">
            Запишитесь на курс прямо сейчас и начните свой путь к мастерству
          </p>
          <Button 
            size="lg" 
            className="bg-white text-blue-600 hover:bg-gray-100"
            onClick={() => window.open(course.cta_button_url, '_blank')}
          >
            {course.cta_button_text}
          </Button>
        </div>
      </section>
    </div>
  );
}