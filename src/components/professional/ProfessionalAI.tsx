import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { useEffect, useRef, useState } from 'react';

export default function ProfessionalAI() {
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  const aiTools = [
    { icon: 'Users', title: 'Супервизия', description: 'Разбор сложных ситуаций с клиентами' },
    { icon: 'FileText', title: 'Разбор случая', description: 'Глубокий анализ клиентских запросов' },
    { icon: 'Shield', title: 'Границы', description: 'Работа с профессиональными границами' },
    { icon: 'Heart', title: 'Выгорание', description: 'Профилактика эмоционального истощения' },
    { icon: 'TrendingUp', title: 'Развитие', description: 'Стратегия профессионального роста' },
    { icon: 'Stethoscope', title: 'Медицинский анализ', description: 'Расшифровка заключений МРТ, УЗИ' }
  ];

  const testimonials = [
    {
      name: 'Анна Петрова',
      role: 'Массажист',
      experience: '5 лет опыта',
      text: 'AI диалоги помогли мне разобраться в сложной ситуации с клиенткой. Получила четкие рекомендации по границам и смогла продолжить работу профессионально.',
      rating: 5
    },
    {
      name: 'Дмитрий Соколов',
      role: 'Остеопат',
      experience: '12 лет практики',
      text: 'Использую для расшифровки МРТ перед приемом. Экономит массу времени и позволяет лучше подготовиться к работе с пациентом. Незаменимый инструмент!',
      rating: 5
    },
    {
      name: 'Мария Игнатьева',
      role: 'Телесный терапевт',
      experience: '7 лет',
      text: 'Когда чувствую выгорание, AI становится моей опорой. Конфиденциально обсуждаем сложные чувства, и я получаю поддержку без осуждения.',
      rating: 5
    },
    {
      name: 'Игорь Волков',
      role: 'Мануальный терапевт',
      experience: '15 лет',
      text: 'Супервизия 24/7 — это реальность. Ночью возник вопрос по клиенту, через 2 минуты получил развернутый анализ ситуации с несколькими вариантами действий.',
      rating: 5
    },
    {
      name: 'Елена Кузнецова',
      role: 'Специалист по реабилитации',
      experience: '9 лет',
      text: 'AI помог мне выстроить стратегию профессионального развития. Теперь я понимаю, какие курсы нужны, и как расти дальше. Очень структурированный подход.',
      rating: 5
    },
    {
      name: 'Алексей Морозов',
      role: 'Массажист-реабилитолог',
      experience: '6 лет',
      text: 'Разбор случая — мой любимый инструмент. Глубокий анализ запроса клиента помогает увидеть то, что я упускал. Работа стала намного эффективнее!',
      rating: 5
    },
    {
      name: 'Ольга Смирнова',
      role: 'Кинезиолог',
      experience: '11 лет',
      text: 'Профессиональные границы всегда были моей слабостью. AI помог разобраться, где я нарушаю их и как выстроить здоровые отношения с клиентами.',
      rating: 5
    },
    {
      name: 'Сергей Новиков',
      role: 'Спортивный массажист',
      experience: '8 лет',
      text: 'Работаю со спортсменами, часто нужна быстрая расшифровка анализов. AI справляется за минуты с тем, на что раньше уходили часы. Рекомендую всем!',
      rating: 5
    },
    {
      name: 'Виктория Лебедева',
      role: 'Висцеральный терапевт',
      experience: '10 лет',
      text: 'Конфиденциальность — главное для меня. Могу обсудить любые профессиональные трудности без страха, что кто-то узнает. Это дорогого стоит.',
      rating: 5
    },
    {
      name: 'Павел Орлов',
      role: 'Массажист-реабилитолог',
      experience: '14 лет',
      text: 'AI диалоги — как личный наставник, который всегда рядом. Помогает развиваться, не стоять на месте. За год работы с системой я вышел на новый уровень.',
      rating: 5
    }
  ];

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer || isPaused) return;

    let animationId: number;
    let scrollPosition = 0;

    const scroll = () => {
      if (!isPaused) {
        scrollPosition += 0.5;
        if (scrollContainer) {
          scrollContainer.scrollLeft = scrollPosition;
          
          if (scrollPosition >= scrollContainer.scrollWidth / 2) {
            scrollPosition = 0;
          }
        }
      }
      animationId = requestAnimationFrame(scroll);
    };

    animationId = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(animationId);
  }, [isPaused]);

  return (
    <section className="py-20 lg:py-32 bg-gradient-to-b from-gray-900 to-gray-800 text-white relative overflow-hidden">
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url('https://cdn.poehali.dev/projects/3e596a93-af99-49a5-ab3f-15835165eb7b/files/55b7c094-4bc1-43ee-823f-185339203d50.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      ></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full mb-6 shadow-xl">
              <Icon name="Sparkles" size={20} />
              <span className="font-semibold">Ядро экосистемы</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Профессиональная супервизия 24/7
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              AI Диалоги — это конфиденциальное пространство, где вы можете обсудить рабочие ситуации, профессиональные сомнения и развитие навыков
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {aiTools.map((tool, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center mb-4">
                    <Icon name={tool.icon as any} size={24} className="text-white" />
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-white">{tool.title}</h3>
                  <p className="text-sm text-gray-300">{tool.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button 
              size="lg"
              className="text-lg px-10 py-7 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-2xl hover:shadow-blue-500/50 transition-all"
              onClick={() => navigate('/dashboard/ai-dialogs')}
            >
              Начать диалог с AI
              <Icon name="MessageSquare" size={22} className="ml-2" />
            </Button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-20">
          <h3 className="text-3xl sm:text-4xl font-bold text-center mb-12">Отзывы специалистов</h3>
          
          <div 
            ref={scrollRef}
            className="overflow-x-hidden cursor-grab active:cursor-grabbing"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <div className="flex gap-6 w-max">
              {[...testimonials, ...testimonials].map((testimonial, index) => (
                <Card 
                  key={index}
                  className="w-[400px] flex-shrink-0 bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                        {testimonial.name.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-white text-lg">{testimonial.name}</h4>
                        <p className="text-sm text-gray-300">{testimonial.role}</p>
                        <p className="text-xs text-gray-400">{testimonial.experience}</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-1 mb-3">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Icon key={i} name="Star" size={16} className="text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                    
                    <p className="text-gray-200 leading-relaxed">{testimonial.text}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}