import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { Navigation } from '@/components/Navigation';
import SchoolsFooter from '@/components/schools/SchoolsFooter';

export default function LandingBuilderPromo() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features: Array<{icon: string; title: string; description: string}> = [
    {
      icon: 'Zap',
      title: 'Готово за 5 минут',
      description: 'Никакого кода и технических знаний. Просто заполните информацию о себе — и ваш лендинг готов.'
    },
    {
      icon: 'Palette',
      title: 'Премиальный дизайн',
      description: 'Профессиональные шаблоны, которые вызывают доверие и привлекают клиентов. Адаптивны под все устройства.'
    },
    {
      icon: 'Users',
      title: 'Привлекайте больше клиентов',
      description: 'Добавьте отзывы, сертификаты, фото работ. Покажите клиентам, почему стоит выбрать именно вас.'
    },
    {
      icon: 'Globe',
      title: 'Своя ссылка',
      description: 'Получите персональную ссылку типа docdialog.com/имя — делитесь ей в соцсетях и мессенджерах.'
    },
    {
      icon: 'Calendar',
      title: 'Онлайн-запись',
      description: 'Клиенты записываются сами прямо на сайте. Вам остается только принимать их.'
    },
    {
      icon: 'Sparkles',
      title: 'SEO-оптимизация',
      description: 'Ваш лендинг найдут в Google и Яндекс. Привлекайте новых клиентов из поисковых систем.'
    }
  ];

  const steps = [
    {
      number: '1',
      title: 'Регистрация',
      description: 'Создайте бесплатный аккаунт за 30 секунд'
    },
    {
      number: '2',
      title: 'Заполните профиль',
      description: 'Укажите услуги, цены, добавьте фото и сертификаты'
    },
    {
      number: '3',
      title: 'Публикуйте',
      description: 'Получите готовую ссылку и начните привлекать клиентов'
    }
  ];

  const examples = [
    {
      name: 'Анна К.',
      profession: 'Массажист-терапевт',
      result: '+15 клиентов за месяц',
      quote: 'Раньше у меня была только визитка в Инстаграм. Теперь есть полноценный сайт, который работает на меня 24/7.'
    },
    {
      name: 'Михаил Р.',
      profession: 'Остеопат',
      result: 'Запись на 3 недели вперёд',
      quote: 'Клиенты говорят, что лендинг выглядит дорого. Это помогло мне поднять цены и привлечь более платёжеспособную аудиторию.'
    },
    {
      name: 'Елена Ф.',
      profession: 'Специалист по висцеральной терапии',
      result: 'Сэкономила 50 000₽',
      quote: 'Хотела заказать сайт у веб-студии, но там просили от 50к. Здесь создала всё сама за вечер — и совершенно бесплатно!'
    }
  ];

  const pricing = [
    {
      name: 'Базовый',
      price: 'Бесплатно',
      period: 'навсегда',
      description: 'Для старта',
      features: [
        'Персональный лендинг',
        'Стандартные шаблоны',
        'Ссылка docdialog.com/имя',
        'Онлайн-запись клиентов',
        'Публикация отзывов',
        'Мобильная версия'
      ],
      cta: 'Создать бесплатно',
      featured: false
    },
    {
      name: 'Премиум',
      price: '499₽',
      period: 'в месяц',
      description: 'Для профессионалов',
      features: [
        'Всё из Базового',
        'Премиум шаблоны',
        'Свой домен (например, vashe-imya.ru)',
        'Приоритетная поддержка',
        'Расширенная аналитика',
        'Интеграция с CRM',
        'Без рекламы DocDialog'
      ],
      cta: 'Попробовать 14 дней бесплатно',
      featured: true
    }
  ];

  const faqs = [
    {
      question: 'Я совсем не разбираюсь в сайтах. Смогу ли я?',
      answer: 'Конечно! Наш конструктор создан специально для специалистов без технических знаний. Просто заполняете форму — как анкету — и всё готово.'
    },
    {
      question: 'Сколько времени занимает создание?',
      answer: 'В среднем 5-10 минут. Заполните базовую информацию, добавьте фото — и ваш лендинг уже работает. Улучшать его можно постепенно.'
    },
    {
      question: 'Можно ли редактировать лендинг после публикации?',
      answer: 'Да, вы можете менять текст, фото, цены и другие элементы в любое время. Все изменения применяются мгновенно.'
    },
    {
      question: 'Нужно ли платить за хостинг или домен?',
      answer: 'В бесплатной версии всё включено — хостинг и ссылка docdialog.com/ваше-имя. В премиум-версии можете подключить свой домен.'
    },
    {
      question: 'Будут ли клиенты находить меня в Google?',
      answer: 'Да! Лендинг автоматически оптимизирован для поисковых систем. Google и Яндекс индексируют вашу страницу, и клиенты смогут найти вас по запросам.'
    },
    {
      question: 'Что если мне нужна помощь?',
      answer: 'У нас есть подробные видео-инструкции и служба поддержки. В премиум-версии — приоритетная поддержка с ответом в течение часа.'
    }
  ];

  const handleCTA = () => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/dashboard/page-builder');
    } else {
      navigate('/register-masseur');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-teal-50/30 to-white">
      <Navigation />

      <section className="relative overflow-hidden pt-20 pb-16 md:pt-32 md:pb-24 px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 via-transparent to-blue-500/5" />
        
        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-100 text-teal-700 rounded-full text-sm font-medium mb-6">
                <Icon name="Sparkles" size={16} />
                Совершенно бесплатно
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Создайте свой лендинг за <span className="text-teal-600">5 минут</span>
              </h1>
              
              <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
                Профессиональная страница для привлечения клиентов. Без программирования, бесплатно, с онлайн-записью.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button 
                  size="lg" 
                  onClick={handleCTA}
                  className="bg-teal-600 hover:bg-teal-700 text-white shadow-lg shadow-teal-600/30 text-lg px-8 py-6"
                >
                  <Icon name="Rocket" size={20} className="mr-2" />
                  Создать лендинг бесплатно
                </Button>
                
                <Button 
                  size="lg" 
                  variant="outline"
                  onClick={() => document.getElementById('examples')?.scrollIntoView({ behavior: 'smooth' })}
                  className="border-2 text-lg px-8 py-6"
                >
                  Посмотреть примеры
                </Button>
              </div>

              <div className="flex items-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Icon name="Check" size={16} className="text-teal-600" />
                  Без кредитной карты
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Check" size={16} className="text-teal-600" />
                  Навсегда бесплатно
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-teal-400/20 to-blue-400/20 blur-3xl" />
              <img 
                src="https://cdn.poehali.dev/projects/3e596a93-af99-49a5-ab3f-15835165eb7b/files/60fce0c1-9ae2-4e1d-aa20-67a8af21b9ef.jpg"
                alt="Конструктор лендингов"
                className="relative rounded-2xl shadow-2xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 px-4 bg-white">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Почему специалисты выбирают нас</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Мы создали инструмент специально для специалистов по телу — просто, быстро, эффективно
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-2 hover:border-teal-200 transition-all hover:shadow-lg">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                    <Icon name={feature.icon} size={24} className="text-teal-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 px-4 bg-gradient-to-br from-teal-50 to-blue-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Как это работает</h2>
            <p className="text-lg text-gray-600">Три простых шага до вашего лендинга</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4 shadow-lg">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-gradient-to-r from-teal-300 to-transparent" />
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button 
              size="lg" 
              onClick={handleCTA}
              className="bg-teal-600 hover:bg-teal-700 text-white shadow-lg shadow-teal-600/30 text-lg px-8 py-6"
            >
              <Icon name="ArrowRight" size={20} className="mr-2" />
              Начать создание
            </Button>
          </div>
        </div>
      </section>

      <section id="examples" className="py-16 md:py-24 px-4 bg-white">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Реальные истории специалистов</h2>
            <p className="text-lg text-gray-600">Они уже создали свои лендинги и получают результаты</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {examples.map((example, index) => (
              <Card key={index} className="border-2 hover:border-teal-200 transition-all hover:shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {example.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-semibold">{example.name}</h3>
                      <p className="text-sm text-gray-600">{example.profession}</p>
                    </div>
                  </div>
                  
                  <div className="bg-teal-50 border-l-4 border-teal-600 p-4 mb-4">
                    <p className="font-semibold text-teal-800">{example.result}</p>
                  </div>
                  
                  <p className="text-gray-700 italic">«{example.quote}»</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 px-4 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Выберите свой тариф</h2>
            <p className="text-lg text-gray-600">Начните бесплатно, обновитесь когда будете готовы</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {pricing.map((plan, index) => (
              <Card 
                key={index} 
                className={`relative border-2 ${plan.featured ? 'border-teal-600 shadow-2xl scale-105' : 'border-gray-200'}`}
              >
                {plan.featured && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-teal-600 text-white px-6 py-1 rounded-full text-sm font-semibold">
                    Популярный
                  </div>
                )}
                
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-6">{plan.description}</p>
                  
                  <div className="mb-6">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    {plan.period && <span className="text-gray-600 ml-2">{plan.period}</span>}
                  </div>

                  <Button 
                    className={`w-full mb-6 ${plan.featured ? 'bg-teal-600 hover:bg-teal-700' : ''}`}
                    variant={plan.featured ? 'default' : 'outline'}
                    size="lg"
                    onClick={handleCTA}
                  >
                    {plan.cta}
                  </Button>

                  <ul className="space-y-3">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Icon name="Check" size={20} className="text-teal-600 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 px-4 bg-white">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Часто задаваемые вопросы</h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index} className="border-2">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-3 flex items-start gap-3">
                    <Icon name="HelpCircle" size={20} className="text-teal-600 flex-shrink-0 mt-1" />
                    {faq.question}
                  </h3>
                  <p className="text-gray-600 ml-8">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32 px-4 bg-gradient-to-br from-teal-600 to-teal-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxIDAgNiAyLjY5IDYgNnMtMi42OSA2LTYgNi02LTIuNjktNi02IDIuNjktNiA2LTZ6TTI0IDQ4YzMuMzEgMCA2IDIuNjkgNiA2cy0yLjY5IDYtNiA2LTYtMi42OS02LTYgMi42OS02IDYtNnoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLW9wYWNpdHk9Ii4xIi8+PC9nPjwvc3ZnPg==')] opacity-10" />
        
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Готовы привлечь больше клиентов?
          </h2>
          <p className="text-xl md:text-2xl mb-10 text-teal-50">
            Создайте профессиональный лендинг прямо сейчас — это займёт всего 5 минут
          </p>

          <Button 
            size="lg" 
            onClick={handleCTA}
            className="bg-white text-teal-600 hover:bg-gray-50 shadow-2xl text-lg px-10 py-7"
          >
            <Icon name="Sparkles" size={20} className="mr-2" />
            Создать бесплатный лендинг
          </Button>

          <p className="text-sm text-teal-100 mt-6">
            Присоединяйтесь к 1000+ специалистам, которые уже создали свои лендинги
          </p>
        </div>
      </section>

      <SchoolsFooter />
    </div>
  );
}