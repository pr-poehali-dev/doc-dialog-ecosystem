import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';

const SalonPresentation = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: 'Док диалог',
      subtitle: 'Профессиональная экосистема для салонов телесных практик',
      description: 'Среда, где салоны находят специалистов и клиентов без посредников',
      content: 'Док диалог объединяет салоны, специалистов по телу и клиентов в едином пространстве доверия, развития и качества.',
      icon: 'Building2',
      gradient: 'from-purple-600 via-pink-600 to-orange-500'
    },
    {
      title: 'Возможности для салона',
      features: [
        { icon: 'BadgeCheck', text: 'Верифицированный профиль салона' },
        { icon: 'Users', text: 'Подбор специалистов из профессиональной среды' },
        { icon: 'MapPin', text: 'Привлечение клиентов по геолокации' },
        { icon: 'BookOpen', text: 'Каталог специалистов салона' },
        { icon: 'Star', text: 'Рейтинг и отзывы клиентов' },
        { icon: 'Home', text: 'Размещение информации об аренде кабинетов' }
      ],
      gradient: 'from-blue-600 via-cyan-600 to-teal-500'
    },
    {
      title: 'Принципы работы',
      principles: [
        { icon: 'Check', title: 'Бесплатная регистрация и модерация', color: 'text-green-400' },
        { icon: 'Handshake', title: 'Прямое взаимодействие без комиссий', color: 'text-blue-400' },
        { icon: 'CreditCard', title: 'Все оплаты — напрямую салону', color: 'text-purple-400' },
        { icon: 'DollarSign', title: 'Услуги по вашему прайсу', color: 'text-orange-400' }
      ],
      note: 'Мы не агрегатор и не купонатор. Мы создаём профессиональную экосистему.',
      gradient: 'from-indigo-600 via-purple-600 to-pink-500'
    },
    {
      title: 'Стать частью экосистемы',
      description: 'Присоединяйтесь к профессиональному сообществу салонов и специалистов телесных практик',
      cta: true,
      gradient: 'from-green-600 via-emerald-600 to-teal-500'
    }
  ];

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const slide = slides[currentSlide];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black text-white flex items-center justify-center p-4 relative overflow-hidden">
      <div className={`absolute inset-0 bg-gradient-to-br ${slide.gradient} opacity-20 transition-all duration-700`} />
      
      <div className="absolute top-6 left-6 z-10">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/salons-info')}
          className="text-white/80 hover:text-white hover:bg-white/10"
        >
          <Icon name="ArrowLeft" size={18} className="mr-2" />
          Назад на сайт
        </Button>
      </div>

      <div className="max-w-6xl w-full relative z-10">
        <div className="mb-8 text-center">
          <div className="flex justify-center gap-2 mb-4">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === currentSlide 
                    ? 'w-8 bg-white' 
                    : 'w-2 bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>

        {currentSlide === 0 && (
          <div className="text-center space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex justify-center mb-6">
              <div className={`p-8 rounded-full bg-gradient-to-br ${slide.gradient} shadow-2xl`}>
                <Icon name={slide.icon || 'Building2'} size={80} className="text-white" />
              </div>
            </div>
            <h1 className="text-6xl md:text-8xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              {slide.title}
            </h1>
            <h2 className="text-2xl md:text-3xl text-gray-300 font-light mb-6">
              {slide.subtitle}
            </h2>
            <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-4">
              {slide.description}
            </p>
            <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto">
              {slide.content}
            </p>
          </div>
        )}

        {currentSlide === 1 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h2 className="text-5xl md:text-6xl font-bold mb-12 text-center">
              {slide.title}
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {slide.features?.map((feature, idx) => (
                <Card
                  key={idx}
                  className="p-6 bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105"
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg bg-gradient-to-br ${slide.gradient} flex-shrink-0`}>
                      <Icon name={feature.icon} size={24} className="text-white" />
                    </div>
                    <p className="text-lg text-gray-200 pt-2">{feature.text}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {currentSlide === 2 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 space-y-8">
            <h2 className="text-5xl md:text-6xl font-bold mb-12 text-center">
              {slide.title}
            </h2>
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {slide.principles?.map((principle, idx) => (
                <Card
                  key={idx}
                  className="p-8 bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="flex items-center gap-4 mb-3">
                    <Icon name={principle.icon} size={32} className={principle.color} />
                    <h3 className="text-xl font-semibold text-gray-100">
                      {principle.title}
                    </h3>
                  </div>
                </Card>
              ))}
            </div>
            <Card className="p-8 bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-sm border-white/20 text-center">
              <p className="text-2xl text-gray-200 leading-relaxed">
                {slide.note}
              </p>
            </Card>
          </div>
        )}

        {currentSlide === 3 && (
          <div className="text-center space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h2 className="text-5xl md:text-7xl font-bold mb-6">
              {slide.title}
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-12">
              {slide.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                onClick={() => navigate('/register/salon')}
                className={`text-lg px-8 py-6 bg-gradient-to-r ${slide.gradient} hover:opacity-90 transition-opacity text-white border-0 shadow-2xl`}
              >
                <Icon name="Building2" size={24} className="mr-2" />
                Зарегистрировать салон
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate('/salons')}
                className="text-lg px-8 py-6 border-white/30 text-white hover:bg-white/10"
              >
                <Icon name="Search" size={24} className="mr-2" />
                Посмотреть салоны
              </Button>
            </div>
          </div>
        )}

        <div className="flex justify-between items-center mt-12">
          <Button
            variant="ghost"
            size="lg"
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className="text-white hover:bg-white/10 disabled:opacity-30"
          >
            <Icon name="ChevronLeft" size={24} className="mr-2" />
            Назад
          </Button>
          
          {currentSlide < slides.length - 1 ? (
            <Button
              variant="ghost"
              size="lg"
              onClick={nextSlide}
              className="text-white hover:bg-white/10"
            >
              Далее
              <Icon name="ChevronRight" size={24} className="ml-2" />
            </Button>
          ) : (
            <Button
              size="lg"
              onClick={() => navigate('/register/salon')}
              className={`bg-gradient-to-r ${slide.gradient} hover:opacity-90 text-white border-0`}
            >
              Начать
              <Icon name="ArrowRight" size={20} className="ml-2" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SalonPresentation;