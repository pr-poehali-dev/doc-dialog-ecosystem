import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Icon from "@/components/ui/icon";
import { useEffect, useRef } from "react";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  type: 'masseur' | 'salon' | 'school' | 'client';
  text: string;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Анна Соколова",
    role: "Массажист-реабилитолог",
    type: "masseur",
    text: "Док диалог изменил мой подход к работе. Раньше я боялась брать клиентов с диагнозами — теперь уверенно работаю с МРТ и понимаю, что делаю. За полгода мой доход вырос на 60%.",
    avatar: "АС"
  },
  {
    id: 2,
    name: "SPA-студия «Гармония»",
    role: "Сеть салонов, Москва",
    type: "salon",
    text: "Нашли через платформу 3 специалистов за месяц. Все с сертификатами школ-партнёров — не нужно переучивать. Текучка снизилась, клиенты довольны. Лучшее решение для подбора персонала.",
    avatar: "СГ"
  },
  {
    id: 3,
    name: "Школа «ПроМассаж»",
    role: "Онлайн-школа массажа",
    type: "school",
    text: "Запустили 2 курса на платформе — привлекли 120 учеников за 4 месяца. Инфраструктура работает сама: приём платежей, выдача сертификатов, поддержка. Мы просто обучаем.",
    avatar: "ПМ"
  },
  {
    id: 4,
    name: "Елена Петрова",
    role: "Клиент платформы",
    type: "client",
    text: "Долго не могла выспаться, постоянно была на нервах. Массажист объяснил, что это нервная система разбалансирована. После курса массажа начала спать нормально, перестала дёргаться от каждого звука. Чувствую себя спокойнее и энергичнее.",
    avatar: "ЕП"
  },
  {
    id: 5,
    name: "Дмитрий Волков",
    role: "Спортивный массажист",
    type: "masseur",
    text: "Профиль на платформе работает как визитка. Клиенты находят меня сами, вижу статистику просмотров, бронирования приходят автоматически. Отзывы в одном месте — это удобно и для меня, и для клиентов.",
    avatar: "ДВ"
  },
  {
    id: 6,
    name: "Массажный центр «Релакс»",
    role: "Премиум-салон, Санкт-Петербург",
    type: "salon",
    text: "До Док диалога тратили недели на поиск массажистов. Сейчас размещаем вакансию — и за пару дней получаем резюме от квалифицированных специалистов. Уровень кандидатов в разы выше.",
    avatar: "МР"
  },
  {
    id: 7,
    name: "Академия «МассажПро»",
    role: "Офлайн-школа, Екатеринбург",
    type: "school",
    text: "Статус партнёра экосистемы дал нам репутацию. Ученики после курсов легко находят работу через платформу — это сильный аргумент при продаже обучения. Конверсия выросла на 35%.",
    avatar: "АМ"
  },
  {
    id: 8,
    name: "Ирина Николаева",
    role: "Массажист-косметолог",
    type: "masseur",
    text: "Прошла курс по лимфодренажу через платформу. Сертификат признают все салоны-партнёры — сразу получила 2 предложения о работе. Теперь сама обучаюсь и ищу клиентов здесь.",
    avatar: "ИН"
  },
  {
    id: 9,
    name: "Михаил Кузнецов",
    role: "Клиент платформы",
    type: "client",
    text: "Занимаюсь спортом, нужен был массажист для восстановления. Нашёл специалиста с опытом работы со спортсменами за 10 минут. Записался онлайн, всё прозрачно — цены, отзывы, сертификаты.",
    avatar: "МК"
  },
  {
    id: 10,
    name: "Wellness-клуб «Баланс»",
    role: "Фитнес-клуб с SPA, Казань",
    type: "salon",
    text: "Открыли массажную зону — через платформу за 3 недели собрали команду из 5 человек. Все специалисты прошли наш отбор с первого раза. Рекомендуем всем, кто ценит качество и скорость.",
    avatar: "WБ"
  }
];

const TestimonialsSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isPausedRef = useRef(false);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationFrameId: number;
    let scrollPosition = 0;
    const scrollSpeed = 0.5;

    const animate = () => {
      if (!isPausedRef.current && !isDraggingRef.current) {
        scrollPosition += scrollSpeed;
        
        if (scrollPosition >= scrollContainer.scrollWidth / 2) {
          scrollPosition = 0;
        }
        
        scrollContainer.scrollLeft = scrollPosition;
      } else {
        scrollPosition = scrollContainer.scrollLeft;
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseEnter = () => {
      isPausedRef.current = true;
    };

    const handleMouseLeave = () => {
      isPausedRef.current = false;
    };

    const handleMouseDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      isPausedRef.current = true;
      startXRef.current = e.pageX;
      scrollLeftRef.current = scrollContainer.scrollLeft;
      scrollContainer.style.cursor = 'grabbing';
      scrollContainer.style.userSelect = 'none';
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
      scrollContainer.style.cursor = 'grab';
      scrollContainer.style.userSelect = '';
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current) return;
      e.preventDefault();
      const x = e.pageX;
      const walk = x - startXRef.current;
      scrollContainer.scrollLeft = scrollLeftRef.current - walk;
    };

    const handleMouseLeaveWhileDragging = () => {
      if (isDraggingRef.current) {
        isDraggingRef.current = false;
        scrollContainer.style.cursor = 'grab';
        scrollContainer.style.userSelect = '';
      }
      isPausedRef.current = false;
    };

    scrollContainer.addEventListener('mouseenter', handleMouseEnter);
    scrollContainer.addEventListener('mouseleave', handleMouseLeaveWhileDragging);
    scrollContainer.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mousemove', handleMouseMove);

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
      scrollContainer.removeEventListener('mouseenter', handleMouseEnter);
      scrollContainer.removeEventListener('mouseleave', handleMouseLeaveWhileDragging);
      scrollContainer.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'masseur':
        return 'bg-purple-100 text-purple-700';
      case 'salon':
        return 'bg-blue-100 text-blue-700';
      case 'school':
        return 'bg-green-100 text-green-700';
      case 'client':
        return 'bg-orange-100 text-orange-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'masseur':
        return 'Специалист';
      case 'salon':
        return 'Салон';
      case 'school':
        return 'Школа';
      case 'client':
        return 'Клиент';
      default:
        return '';
    }
  };

  // Дублируем отзывы для бесшовной прокрутки
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <section className="py-20 bg-gradient-to-b from-muted/30 to-background overflow-hidden">
      <div className="container mx-auto px-4 mb-12">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Отзывы наших пользователей
          </h2>
          <p className="text-lg text-muted-foreground">
            Более 500 специалистов, салонов и школ доверяют Док диалог
          </p>
        </div>
      </div>

      <div 
        ref={scrollRef}
        className="flex gap-6 overflow-x-hidden px-4 cursor-grab select-none"
        style={{ scrollBehavior: 'auto' }}
      >
        {duplicatedTestimonials.map((testimonial, index) => (
          <Card 
            key={`${testimonial.id}-${index}`}
            className="flex-shrink-0 w-[400px] hover:shadow-xl transition-all duration-300 border-2"
          >
            <CardContent className="p-6">
              <div className="flex items-start gap-4 mb-4">
                <Avatar className="h-12 w-12 border-2 border-primary/20">
                  <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/5 text-primary font-semibold">
                    {testimonial.avatar}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="font-semibold text-lg">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground mb-2">{testimonial.role}</div>
                  <span className={`inline-block text-xs px-2 py-1 rounded-full font-medium ${getTypeColor(testimonial.type)}`}>
                    {getTypeLabel(testimonial.type)}
                  </span>
                </div>
              </div>
              
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Icon key={i} name="Star" size={16} className="fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              <p className="text-sm leading-relaxed text-muted-foreground">
                "{testimonial.text}"
              </p>

              <div className="mt-4 pt-4 border-t flex items-center gap-2 text-xs text-muted-foreground">
                <Icon name="CheckCircle" size={14} className="text-green-500" />
                <span>Проверенный отзыв</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center mt-8">
        <p className="text-sm text-muted-foreground">
          <Icon name="TrendingUp" size={16} className="inline-block mr-1" />
          Присоединяйтесь к растущему сообществу профессионалов
        </p>
      </div>
    </section>
  );
};

export default TestimonialsSection;