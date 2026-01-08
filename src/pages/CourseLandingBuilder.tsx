import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { getUserId, getToken } from '@/utils/auth';

interface CourseLandingData {
  title: string;
  shortDescription: string;
  heroTitle: string;
  heroSubtitle: string;
  coverUrl: string;
  schoolLogoUrl: string;
  category: string;
  type: string;
  price: string;
  duration: string;
  aboutCourse: string;
  whatYouLearn: string[];
  programModules: Array<{
    title: string;
    description: string;
    duration: string;
  }>;
  author: {
    name: string;
    position: string;
    bio: string;
    photo: string;
    experience: string;
  };
  benefits: string[];
  testimonials: Array<{
    name: string;
    text: string;
    rating: number;
    photo: string;
  }>;
  gallery: string[];
  faq: Array<{
    question: string;
    answer: string;
  }>;
  ctaButtonText: string;
  ctaButtonUrl: string;
}

export default function CourseLandingBuilder() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [preview, setPreview] = useState(false);

  const [data, setData] = useState<CourseLandingData>({
    title: 'Профессиональный курс классического массажа',
    shortDescription: 'Научитесь делать профессиональный массаж всего тела за 3 месяца',
    heroTitle: 'Станьте профессиональным массажистом',
    heroSubtitle: 'Полный курс обучения классическому массажу с нуля до первых клиентов',
    coverUrl: '',
    schoolLogoUrl: '',
    category: 'Классический массаж',
    type: 'online',
    price: '45 000 ₽',
    duration: '3 месяца (120 часов)',
    aboutCourse: 'Наш курс создан для тех, кто хочет освоить профессию массажиста с нуля или повысить свою квалификацию. За 3 месяца вы получите все необходимые знания и навыки для работы массажистом.\n\nВы научитесь работать со всеми зонами тела, освоите различные техники массажа, узнаете анатомию и физиологию человека. После окончания курса вы сможете работать в салонах красоты, SPA-центрах или открыть собственный кабинет.',
    whatYouLearn: [
      'Техники классического массажа всего тела',
      'Анатомия и физиология человека',
      'Работа с различными типами клиентов',
      'Построение собственной практики массажиста'
    ],
    programModules: [
      { title: 'Основы анатомии и физиологии', description: 'Изучение строения тела человека, мышечной системы, кровообращения. Понимание процессов, происходящих во время массажа.', duration: '20 часов' },
      { title: 'Классические приёмы массажа', description: 'Поглаживание, растирание, разминание, вибрация. Отработка всех базовых техник на практике.', duration: '40 часов' },
      { title: 'Массаж различных зон тела', description: 'Спина, шея, воротниковая зона, руки, ноги, живот. Особенности работы с каждой зоной.', duration: '40 часов' },
      { title: 'Практика и работа с клиентами', description: 'Отработка навыков на реальных клиентах под контролем преподавателя. Построение своей практики.', duration: '20 часов' }
    ],
    author: {
      name: 'Елена Петрова',
      position: 'Основатель школы, массажист-практик',
      bio: 'Опыт работы массажистом более 15 лет. Обучила более 500 студентов, которые успешно работают в индустрии красоты и здоровья. Сертифицированный специалист по классическому и лечебному массажу.',
      photo: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=400',
      experience: '15 лет практики, обучено 500+ студентов'
    },
    benefits: [
      'Обучение онлайн в удобное время',
      'Практика с первого занятия',
      'Поддержка после окончания курса',
      'Сертификат международного образца'
    ],
    testimonials: [
      { name: 'Анна Смирнова', text: 'Отличный курс! За 3 месяца научилась делать качественный массаж. Уже через месяц после окончания нашла работу в салоне красоты.', rating: 5, photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100' },
      { name: 'Дмитрий Иванов', text: 'Преподаватель объясняет очень понятно, много практики. Курс стоит своих денег. Рекомендую всем, кто хочет освоить эту профессию.', rating: 5, photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100' },
      { name: 'Мария Козлова', text: 'Училась массажу давно, но этот курс структурировал все знания. Теперь работаю в SPA-центре и очень довольна результатом обучения.', rating: 5, photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100' }
    ],
    gallery: ['', '', '', ''],
    faq: [
      { question: 'Нужна ли медицинская подготовка для обучения?', answer: 'Нет, курс рассчитан на обучение с нуля. Все необходимые знания по анатомии и физиологии мы даём в рамках программы.' },
      { question: 'Получу ли я сертификат после окончания?', answer: 'Да, после успешного завершения курса и сдачи экзамена вы получите сертификат международного образца.' },
      { question: 'Можно ли учиться в своём темпе?', answer: 'Да, это онлайн-курс с записанными уроками. Вы можете учиться в удобном для вас темпе в течение года доступа к материалам.' },
      { question: 'Где я смогу работать после курса?', answer: 'Вы сможете работать в салонах красоты, SPA-центрах, фитнес-клубах, санаториях или открыть частную практику.' }
    ],
    ctaButtonText: 'Записаться на курс',
    ctaButtonUrl: 'https://example.com/enroll'
  });

  const updateField = (path: string, value: any) => {
    const keys = path.split('.');
    setData((prev) => {
      const updated = { ...prev };
      let current: any = updated;
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;
      return updated;
    });
  };

  const addModule = () => {
    setData((prev) => ({
      ...prev,
      programModules: [...prev.programModules, { title: '', description: '', duration: '' }]
    }));
  };

  const addTestimonial = () => {
    setData((prev) => ({
      ...prev,
      testimonials: [...prev.testimonials, { name: '', text: '', rating: 5, photo: '' }]
    }));
  };

  const addFaq = () => {
    setData((prev) => ({
      ...prev,
      faq: [...prev.faq, { question: '', answer: '' }]
    }));
  };

  const handleGenerate = () => {
    setPreview(true);
  };

  const handleSubmit = async () => {
    try {
      const userId = getUserId();
      if (!userId) {
        alert('Необходимо войти в систему');
        navigate('/login');
        return;
      }

      // Получаем школу пользователя через API
      const schoolResponse = await fetch('https://functions.poehali.dev/6ac6b552-624e-4960-a4f1-94f540394c86?action=my_schools', {
        headers: { 'X-User-Id': userId }
      });

      if (!schoolResponse.ok) {
        alert('Ошибка при получении данных школы');
        return;
      }

      const schoolData = await schoolResponse.json();
      if (!schoolData.schools || schoolData.schools.length === 0) {
        alert('У вас нет привязанной школы. Обратитесь в поддержку.');
        navigate('/school/dashboard');
        return;
      }

      const schoolId = schoolData.schools[0].id;

      // Генерация slug из названия
      const generateSlug = (title: string) => {
        return title
          .toLowerCase()
          .replace(/[^а-яa-z0-9\s-]/g, '')
          .replace(/\s+/g, '-')
          .replace(/-+/g, '-')
          .trim();
      };

      const slug = generateSlug(data.title) + `-${Date.now()}`;

      const token = getToken();
      if (!token) {
        alert('Необходимо войти в систему');
        navigate('/login');
        return;
      }

      const response = await fetch('https://functions.poehali.dev/95b5e0a7-51f7-4fb1-b196-a49f5feff58f?type=courses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          school_id: schoolId,
          title: data.title,
          shortDescription: data.shortDescription,
          heroTitle: data.heroTitle,
          heroSubtitle: data.heroSubtitle,
          type: data.type,
          category: data.category,
          price: data.price,
          duration: data.duration,
          aboutCourse: data.aboutCourse,
          whatYouLearn: data.whatYouLearn,
          programModules: data.programModules,
          author: data.author,
          benefits: data.benefits,
          testimonials: data.testimonials,
          faq: data.faq,
          ctaButtonText: data.ctaButtonText,
          ctaButtonUrl: data.ctaButtonUrl || 'https://example.com',
          coverUrl: data.coverUrl,
          schoolLogoUrl: data.schoolLogoUrl
        })
      });

      if (response.ok) {
        const result = await response.json();
        navigate('/school/dashboard', { 
          state: { 
            successMessage: 'Курс успешно отправлен на модерацию! Мы проверим его в течение 24 часов.' 
          } 
        });
      } else {
        const error = await response.json();
        console.error('Server error:', error);
        alert(`Ошибка: ${error.error || 'Не удалось создать курс'}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Ошибка при отправке данных');
    }
  };

  if (preview) {
    return (
      <div className="min-h-screen bg-white">
        {/* Навигация */}
        <div className="sticky top-0 z-50 bg-white border-b shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex justify-between items-center mb-3">
              <Button variant="outline" onClick={() => setPreview(false)}>
                <Icon name="ArrowLeft" size={18} className="mr-2" />
                Редактировать
              </Button>
              <Button onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-700">
                <Icon name="Send" size={18} className="mr-2" />
                Отправить на модерацию
              </Button>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 flex items-start gap-2">
              <Icon name="AlertCircle" className="text-amber-600 mt-0.5 flex-shrink-0" size={18} />
              <p className="text-sm text-amber-800">
                После отправки с вашего баланса будет списано <strong>₽500</strong> за публикацию курса
              </p>
            </div>
          </div>
        </div>

        {/* Hero секция */}
        <section 
          className="relative min-h-[400px] sm:h-[500px] md:h-[600px] flex items-center justify-center text-white"
          style={{
            backgroundImage: data.coverUrl ? `url(${data.coverUrl})` : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="relative z-10 text-center px-4 py-12 max-w-4xl">
            {data.schoolLogoUrl && (
              <img src={data.schoolLogoUrl} alt="Логотип школы" className="h-12 sm:h-16 md:h-20 mx-auto mb-4 object-contain" />
            )}
            <div className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm mb-4">
              {data.category} • {data.type === 'online' ? 'Онлайн' : 'Офлайн'}
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 drop-shadow-lg">
              {data.heroTitle || data.title || 'Название курса'}
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 drop-shadow-md">
              {data.heroSubtitle || data.shortDescription || 'Описание курса'}
            </p>
            <div className="flex flex-wrap gap-4 justify-center items-center mb-8">
              {data.duration && (
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                  <Icon name="Clock" size={20} />
                  <span>{data.duration}</span>
                </div>
              )}
              {data.price && (
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                  <Icon name="Coins" size={20} />
                  <span>{data.price}</span>
                </div>
              )}
            </div>
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              {data.ctaButtonText}
            </Button>
          </div>
        </section>

        {/* О курсе */}
        {data.aboutCourse && (
          <section className="py-20 bg-white">
            <div className="max-w-4xl mx-auto px-4">
              <h2 className="text-4xl font-bold text-center mb-12">О курсе</h2>
              <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-line">
                {data.aboutCourse}
              </p>
            </div>
          </section>
        )}

        {/* Чему вы научитесь */}
        {data.whatYouLearn.some(item => item.trim()) && (
          <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
            <div className="max-w-7xl mx-auto px-4">
              <h2 className="text-4xl font-bold text-center mb-12">Чему вы научитесь</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {data.whatYouLearn.filter(item => item.trim()).map((item, i) => (
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
        {data.programModules.some(m => m.title) && (
          <section className="py-20 bg-white">
            <div className="max-w-4xl mx-auto px-4">
              <h2 className="text-4xl font-bold text-center mb-12">Программа курса</h2>
              <div className="space-y-6">
                {data.programModules.filter(m => m.title).map((module, i) => (
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
        {data.benefits.some(b => b.trim()) && (
          <section className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
            <div className="max-w-7xl mx-auto px-4">
              <h2 className="text-4xl font-bold text-center mb-12">Преимущества обучения</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {data.benefits.filter(b => b.trim()).map((benefit, i) => (
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
        {data.author.name && (
          <section className="py-20 bg-white">
            <div className="max-w-4xl mx-auto px-4">
              <h2 className="text-4xl font-bold text-center mb-12">Автор курса</h2>
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="w-64 h-64 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center overflow-hidden flex-shrink-0">
                  {data.author.photo ? (
                    <img src={data.author.photo} alt={data.author.name} className="w-full h-full object-cover" />
                  ) : (
                    <Icon name="User" size={96} className="text-white" />
                  )}
                </div>
                <div>
                  <h3 className="text-3xl font-bold mb-2">{data.author.name}</h3>
                  {data.author.position && <p className="text-xl text-purple-600 mb-4">{data.author.position}</p>}
                  {data.author.experience && <p className="text-gray-600 mb-4">{data.author.experience}</p>}
                  {data.author.bio && <p className="text-gray-700 leading-relaxed">{data.author.bio}</p>}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Отзывы */}
        {data.testimonials.some(t => t.text) && (
          <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4">
              <h2 className="text-4xl font-bold text-center mb-12">Отзывы студентов</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {data.testimonials.filter(t => t.text).map((testimonial, i) => (
                  <Card key={i}>
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center overflow-hidden">
                          {testimonial.photo ? (
                            <img src={testimonial.photo} alt={testimonial.name} className="w-full h-full object-cover" />
                          ) : (
                            <Icon name="User" size={24} className="text-white" />
                          )}
                        </div>
                        <div>
                          <p className="font-semibold">{testimonial.name}</p>
                          <div className="flex">
                            {Array.from({ length: testimonial.rating }).map((_, j) => (
                              <Icon key={j} name="Star" size={14} className="text-amber-400 fill-amber-400" />
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-700 italic">"{testimonial.text}"</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* FAQ */}
        {data.faq.some(f => f.question) && (
          <section className="py-20 bg-white">
            <div className="max-w-4xl mx-auto px-4">
              <h2 className="text-4xl font-bold text-center mb-12">Частые вопросы</h2>
              <div className="space-y-4">
                {data.faq.filter(f => f.question).map((item, i) => (
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
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              {data.ctaButtonText}
            </Button>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Заголовок */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-3">Создайте лендинг вашего курса</h1>
          <p className="text-gray-600">Заполните форму, и мы автоматически создадим профессиональный лендинг</p>
        </div>

        {/* Индикатор шагов */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                    step >= s ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {s}
                </div>
                {s < 4 && <div className={`w-12 h-1 ${step > s ? 'bg-blue-600' : 'bg-gray-200'}`}></div>}
              </div>
            ))}
          </div>
        </div>

        {/* Шаг 1: Основная информация */}
        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle>Шаг 1: Основная информация о курсе</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Название курса *</Label>
                <Input
                  value={data.title}
                  onChange={(e) => updateField('title', e.target.value)}
                  placeholder="Профессиональный массажист с нуля"
                />
              </div>
              <div>
                <Label>Краткое описание</Label>
                <Input
                  value={data.shortDescription}
                  onChange={(e) => updateField('shortDescription', e.target.value)}
                  placeholder="Научитесь делать массаж профессионально за 3 месяца"
                />
              </div>
              <div>
                <Label>Заголовок на главной странице *</Label>
                <Input
                  value={data.heroTitle}
                  onChange={(e) => updateField('heroTitle', e.target.value)}
                  placeholder="Станьте профессиональным массажистом"
                />
              </div>
              <div>
                <Label>Подзаголовок</Label>
                <Input
                  value={data.heroSubtitle}
                  onChange={(e) => updateField('heroSubtitle', e.target.value)}
                  placeholder="Полный курс обучения с нуля до первых клиентов"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Категория *</Label>
                  <select
                    value={data.category}
                    onChange={(e) => updateField('category', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option>Классический массаж</option>
                    <option>Спортивный массаж</option>
                    <option>Лечебный массаж</option>
                    <option>SPA массаж</option>
                    <option>Косметический массаж</option>
                    <option>Детский массаж</option>
                    <option>Другое</option>
                  </select>
                </div>
                <div>
                  <Label>Формат *</Label>
                  <select
                    value={data.type}
                    onChange={(e) => updateField('type', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="online">Онлайн</option>
                    <option value="offline">Офлайн</option>
                    <option value="hybrid">Гибрид</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Цена</Label>
                  <Input
                    value={data.price}
                    onChange={(e) => updateField('price', e.target.value)}
                    placeholder="45 000 ₽"
                  />
                </div>
                <div>
                  <Label>Длительность</Label>
                  <Input
                    value={data.duration}
                    onChange={(e) => updateField('duration', e.target.value)}
                    placeholder="3 месяца (120 часов)"
                  />
                </div>
              </div>
              <div>
                <Label>О курсе (подробное описание)</Label>
                <Textarea
                  value={data.aboutCourse}
                  onChange={(e) => updateField('aboutCourse', e.target.value)}
                  rows={6}
                  placeholder="Расскажите о курсе, его целях, для кого он подходит..."
                />
              </div>
              <div>
                <Label>Ссылка на фото для шапки</Label>
                <Input
                  value={data.coverUrl}
                  onChange={(e) => updateField('coverUrl', e.target.value)}
                  placeholder="https://example.com/cover.jpg"
                  type="url"
                />
                <p className="text-xs text-muted-foreground mt-1">Фон первого экрана (рекомендуем 1920x800px)</p>
              </div>
              <div>
                <Label>Ссылка на логотип школы</Label>
                <Input
                  value={data.schoolLogoUrl}
                  onChange={(e) => updateField('schoolLogoUrl', e.target.value)}
                  placeholder="https://example.com/logo.png"
                  type="url"
                />
                <p className="text-xs text-muted-foreground mt-1">Отображается над заголовком</p>
              </div>
              <div>
                <Label>Текст кнопки записи</Label>
                <Input
                  value={data.ctaButtonText}
                  onChange={(e) => updateField('ctaButtonText', e.target.value)}
                  placeholder="Записаться на курс"
                />
              </div>
              <div>
                <Label>Ссылка для записи *</Label>
                <Input
                  value={data.ctaButtonUrl}
                  onChange={(e) => updateField('ctaButtonUrl', e.target.value)}
                  placeholder="https://your-school.ru/course-payment"
                />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Шаг 2: Программа и навыки */}
        {step === 2 && (
          <Card>
            <CardHeader>
              <CardTitle>Шаг 2: Программа курса и навыки</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold mb-3">Чему вы научитесь (до 4 пунктов)</h3>
                {data.whatYouLearn.map((item, i) => (
                  <div key={i} className="mb-2">
                    <Input
                      value={item}
                      onChange={(e) => {
                        const newItems = [...data.whatYouLearn];
                        newItems[i] = e.target.value;
                        updateField('whatYouLearn', newItems);
                      }}
                      placeholder={`Навык ${i + 1}`}
                    />
                  </div>
                ))}
              </div>

              <div>
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-semibold">Модули программы</h3>
                  <Button type="button" variant="outline" size="sm" onClick={addModule}>
                    <Icon name="Plus" size={16} className="mr-1" />
                    Добавить модуль
                  </Button>
                </div>
                {data.programModules.map((module, i) => (
                  <Card key={i} className="mb-4">
                    <CardContent className="pt-4 space-y-3">
                      <Input
                        value={module.title}
                        onChange={(e) => {
                          const newModules = [...data.programModules];
                          newModules[i].title = e.target.value;
                          updateField('programModules', newModules);
                        }}
                        placeholder="Название модуля"
                      />
                      <Input
                        value={module.duration}
                        onChange={(e) => {
                          const newModules = [...data.programModules];
                          newModules[i].duration = e.target.value;
                          updateField('programModules', newModules);
                        }}
                        placeholder="Длительность (10 часов)"
                      />
                      <Textarea
                        value={module.description}
                        onChange={(e) => {
                          const newModules = [...data.programModules];
                          newModules[i].description = e.target.value;
                          updateField('programModules', newModules);
                        }}
                        placeholder="Описание модуля"
                        rows={2}
                      />
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div>
                <h3 className="font-semibold mb-3">Преимущества обучения (до 4 пунктов)</h3>
                {data.benefits.map((benefit, i) => (
                  <div key={i} className="mb-2">
                    <Input
                      value={benefit}
                      onChange={(e) => {
                        const newBenefits = [...data.benefits];
                        newBenefits[i] = e.target.value;
                        updateField('benefits', newBenefits);
                      }}
                      placeholder={`Преимущество ${i + 1}`}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Шаг 3: Автор курса */}
        {step === 3 && (
          <Card>
            <CardHeader>
              <CardTitle>Шаг 3: Автор курса</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Имя автора *</Label>
                <Input
                  value={data.author.name}
                  onChange={(e) => updateField('author.name', e.target.value)}
                  placeholder="Иван Иванов"
                />
              </div>
              <div>
                <Label>Должность</Label>
                <Input
                  value={data.author.position}
                  onChange={(e) => updateField('author.position', e.target.value)}
                  placeholder="Основатель школы, массажист"
                />
              </div>
              <div>
                <Label>Опыт</Label>
                <Input
                  value={data.author.experience}
                  onChange={(e) => updateField('author.experience', e.target.value)}
                  placeholder="15 лет опыта в массаже"
                />
              </div>
              <div>
                <Label>О себе</Label>
                <Textarea
                  value={data.author.bio}
                  onChange={(e) => updateField('author.bio', e.target.value)}
                  rows={4}
                  placeholder="Биография автора, достижения, опыт работы..."
                />
              </div>
              <div>
                <Label>URL фото</Label>
                <Input
                  value={data.author.photo}
                  onChange={(e) => updateField('author.photo', e.target.value)}
                  placeholder="https://example.com/photo.jpg"
                />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Шаг 4: Отзывы и FAQ */}
        {step === 4 && (
          <Card>
            <CardHeader>
              <CardTitle>Шаг 4: Отзывы и FAQ</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-semibold">Отзывы студентов</h3>
                  <Button type="button" variant="outline" size="sm" onClick={addTestimonial}>
                    <Icon name="Plus" size={16} className="mr-1" />
                    Добавить отзыв
                  </Button>
                </div>
                {data.testimonials.map((testimonial, i) => (
                  <Card key={i} className="mb-4">
                    <CardContent className="pt-4 space-y-3">
                      <Input
                        value={testimonial.name}
                        onChange={(e) => {
                          const newTestimonials = [...data.testimonials];
                          newTestimonials[i].name = e.target.value;
                          updateField('testimonials', newTestimonials);
                        }}
                        placeholder="Имя студента"
                      />
                      <Textarea
                        value={testimonial.text}
                        onChange={(e) => {
                          const newTestimonials = [...data.testimonials];
                          newTestimonials[i].text = e.target.value;
                          updateField('testimonials', newTestimonials);
                        }}
                        placeholder="Текст отзыва"
                        rows={3}
                      />
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <Label>Рейтинг (1-5)</Label>
                          <Input
                            type="number"
                            min="1"
                            max="5"
                            value={testimonial.rating}
                            onChange={(e) => {
                              const newTestimonials = [...data.testimonials];
                              newTestimonials[i].rating = parseInt(e.target.value) || 5;
                              updateField('testimonials', newTestimonials);
                            }}
                          />
                        </div>
                        <div>
                          <Label>URL фото</Label>
                          <Input
                            value={testimonial.photo}
                            onChange={(e) => {
                              const newTestimonials = [...data.testimonials];
                              newTestimonials[i].photo = e.target.value;
                              updateField('testimonials', newTestimonials);
                            }}
                            placeholder="https://..."
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div>
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-semibold">Частые вопросы (FAQ)</h3>
                  <Button type="button" variant="outline" size="sm" onClick={addFaq}>
                    <Icon name="Plus" size={16} className="mr-1" />
                    Добавить вопрос
                  </Button>
                </div>
                {data.faq.map((item, i) => (
                  <Card key={i} className="mb-4">
                    <CardContent className="pt-4 space-y-3">
                      <Input
                        value={item.question}
                        onChange={(e) => {
                          const newFaq = [...data.faq];
                          newFaq[i].question = e.target.value;
                          updateField('faq', newFaq);
                        }}
                        placeholder="Вопрос"
                      />
                      <Textarea
                        value={item.answer}
                        onChange={(e) => {
                          const newFaq = [...data.faq];
                          newFaq[i].answer = e.target.value;
                          updateField('faq', newFaq);
                        }}
                        placeholder="Ответ"
                        rows={2}
                      />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Навигация по шагам */}
        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={() => {
              if (step === 1) {
                navigate('/school/dashboard');
              } else {
                setStep(Math.max(1, step - 1));
              }
            }}
          >
            <Icon name="ChevronLeft" size={18} className="mr-2" />
            Назад
          </Button>

          {step < 4 ? (
            <Button onClick={() => setStep(Math.min(4, step + 1))}>
              Далее
              <Icon name="ChevronRight" size={18} className="ml-2" />
            </Button>
          ) : (
            <Button onClick={handleGenerate} className="bg-blue-600 hover:bg-blue-700">
              <Icon name="Eye" size={18} className="mr-2" />
              Посмотреть результат
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}