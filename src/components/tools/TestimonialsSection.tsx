import { Card, CardContent } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: 'Анна Соколова',
      specialty: 'Остеопат',
      experience: '12 лет',
      text: 'Анализ боли помогает мне быстрее понять взаимосвязи в организме клиента. Экономлю 15-20 минут на каждом приёме.',
      avatar: '👩‍⚕️'
    },
    {
      name: 'Дмитрий Волков',
      specialty: 'Массажист',
      experience: '8 лет',
      text: 'Расшифровка МРТ простым языком — находка! Теперь могу объяснить клиенту его состояние понятно и профессионально.',
      avatar: '👨‍⚕️'
    },
    {
      name: 'Елена Петрова',
      specialty: 'Мануальный терапевт',
      experience: '15 лет',
      text: 'Сбор анамнеза стал системным. AI-анализ подсказывает, на что обратить внимание. Качество работы выросло.',
      avatar: '👩‍⚕️'
    },
    {
      name: 'Игорь Смирнов',
      specialty: 'Кинезиолог',
      experience: '6 лет',
      text: 'Инструменты экономят массу времени. Особенно ценю остеопатический подход в анализе боли — именно так я мыслю.',
      avatar: '👨‍⚕️'
    },
    {
      name: 'Мария Королёва',
      specialty: 'Остеопат',
      experience: '10 лет',
      text: 'Удобно показывать клиентам взаимосвязи через AI-анализ. Они лучше понимают свою проблему и мотивированы на лечение.',
      avatar: '👩‍⚕️'
    },
    {
      name: 'Алексей Новikov',
      specialty: 'Реабилитолог',
      experience: '9 лет',
      text: 'Расшифровка заключений экономит кучу времени. Раньше сам разбирался по 30 минут, теперь за пару минут всё ясно.',
      avatar: '👨‍⚕️'
    },
    {
      name: 'Ольга Белова',
      specialty: 'Массажист',
      experience: '7 лет',
      text: 'Сбор анамнеза теперь не занимает полчаса. Форма структурирует информацию, ничего не забываю спросить.',
      avatar: '👩‍⚕️'
    },
    {
      name: 'Сергей Морозов',
      specialty: 'Остеопат',
      experience: '14 лет',
      text: 'AI точно подмечает красные флаги в симптомах. Это дополнительная страховка для безопасности клиента.',
      avatar: '👨‍⚕️'
    },
    {
      name: 'Наталья Зайцева',
      specialty: 'Мануальный терапевт',
      experience: '11 лет',
      text: 'Инструменты помогают выглядеть профессиональнее в глазах клиентов. Они видят системный подход к их проблеме.',
      avatar: '👩‍⚕️'
    },
    {
      name: 'Павел Орлов',
      specialty: 'Кинезиолог',
      experience: '5 лет',
      text: 'Бесплатный доступ позволил протестировать все инструменты. Теперь использую ежедневно — они реально упрощают работу.',
      avatar: '👨‍⚕️'
    }
  ];

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-br from-blue-50/50 to-purple-50/50 overflow-hidden">
      <div className="container mx-auto px-4 mb-8 sm:mb-12">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-3 sm:mb-4">
          Отзывы специалистов
        </h2>
        <p className="text-center text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
          Более 500 специалистов уже используют наши инструменты в ежедневной практике
        </p>
      </div>
      
      <div className="relative">
        <div 
          className="flex gap-4 sm:gap-6 overflow-x-auto pb-4 px-4 sm:px-8 snap-x snap-mandatory scroll-smooth scrollbar-hide cursor-grab active:cursor-grabbing"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          onMouseDown={(e) => {
            const slider = e.currentTarget;
            let isDown = true;
            const startX = e.pageX - slider.offsetLeft;
            const scrollLeft = slider.scrollLeft;
            
            const handleMouseMove = (e: MouseEvent) => {
              if (!isDown) return;
              e.preventDefault();
              const x = e.pageX - slider.offsetLeft;
              const walk = (x - startX) * 2;
              slider.scrollLeft = scrollLeft - walk;
            };
            
            const handleMouseUp = () => {
              isDown = false;
              document.removeEventListener('mousemove', handleMouseMove);
              document.removeEventListener('mouseup', handleMouseUp);
            };
            
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
          }}
        >
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index}
              className="min-w-[280px] sm:min-w-[340px] max-w-[280px] sm:max-w-[340px] snap-center flex-shrink-0 bg-white shadow-md hover:shadow-xl transition-shadow"
            >
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
                  <div className="text-3xl sm:text-4xl flex-shrink-0">{testimonial.avatar}</div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-sm sm:text-base truncate">{testimonial.name}</h3>
                    <p className="text-xs sm:text-sm text-gray-600 truncate">{testimonial.specialty}</p>
                    <p className="text-xs text-gray-500">Опыт: {testimonial.experience}</p>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed line-clamp-4">
                  "{testimonial.text}"
                </p>
                <div className="flex gap-1 mt-3 sm:mt-4">
                  {[...Array(5)].map((_, i) => (
                    <Icon key={i} name="Star" size={14} className="text-yellow-400 fill-yellow-400 sm:w-4 sm:h-4" />
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="flex justify-center gap-2 mt-6 sm:mt-8">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-gray-300"></div>
          ))}
        </div>
      </div>
    </section>
  );
}
