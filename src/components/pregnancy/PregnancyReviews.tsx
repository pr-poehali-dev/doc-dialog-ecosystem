import { useRef } from "react";
import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";

const PregnancyReviews = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      const newScrollLeft = scrollContainerRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);
      scrollContainerRef.current.scrollTo({ left: newScrollLeft, behavior: 'smooth' });
    }
  };

  const reviews = [
    {
      name: "Анна Соколова",
      text: "Во время беременности боялась заниматься спортом — думала, навредит малышу. Этот тренинг показал, что можно и нужно двигаться! Спина перестала болеть, чувствую себя сильной.",
      weeks: "20 недель"
    },
    {
      name: "Мария Петрова",
      text: "Программа СТАРТ для меня оказалась идеальной. Движения простые, понятные, безопасные. Никакого перегруза. Чувствую, что готовлю тело к родам правильно.",
      weeks: "18 недель"
    },
    {
      name: "Екатерина Иванова",
      text: "Раньше тренировалась активно, но с беременностью не знала, что можно делать. Тренинг дал четкое понимание — какие движения безопасны, как работать с дыханием. Супер!",
      weeks: "22 недели"
    },
    {
      name: "Ольга Смирнова",
      text: "Гид по движению в быту — это золото! Теперь знаю, как правильно вставать, садиться, поднимать вещи. Поясница перестала болеть к концу дня. Очень полезно!",
      weeks: "19 недель"
    },
    {
      name: "Дарья Морозова",
      text: "После тренировок чувствую прилив энергии, а не усталость. Отёки стали меньше, настроение улучшилось. Тренинг помог мне полюбить беременность!",
      weeks: "21 неделя"
    },
    {
      name: "Наталья Федорова",
      text: "Дыхательные техники из бонусного блока — это находка! Помогают успокоиться, когда тревожно. И для родов точно пригодятся. Очень благодарна!",
      weeks: "23 недели"
    },
    {
      name: "Светлана Волкова",
      text: "Выбрала программу ОПТИМУМ — 3 тренировки в неделю. Движения комфортные, ничего лишнего. Тело стало более подвижным, координация улучшилась.",
      weeks: "20 недель"
    },
    {
      name: "Юлия Новикова",
      text: "Тренинг научил меня чувствовать своё тело. Теперь понимаю, когда нужно отдохнуть, а когда можно добавить активности. Страх движения ушёл полностью!",
      weeks: "18 недель"
    },
    {
      name: "Елена Кузнецова",
      text: "Боли в тазу были сильные, врач разрешил лёгкие упражнения. После тренинга боль стала меньше! Укрепились мышцы, поддерживающие таз. Очень рада результату!",
      weeks: "22 недели"
    },
    {
      name: "Татьяна Сергеева",
      text: "Беременность — не болезнь, но я боялась любых нагрузок. Тренинг показал, что безопасное движение — это забота о себе и малыше. Чувствую себя уверенно и спокойно!",
      weeks: "19 недель"
    }
  ];

  return (
    <section className="py-20 px-4 bg-white">
      <div className="container mx-auto max-w-7xl">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-900">
          Отзывы участниц
        </h2>
        <p className="text-center text-gray-600 mb-12 text-lg">
          Реальные результаты будущих мам после тренинга
        </p>

        <div className="relative">
          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg hover:bg-gray-100 rounded-full w-12 h-12 hidden md:flex"
            onClick={() => scroll('left')}
          >
            <Icon name="ChevronLeft" size={24} />
          </Button>

          <div 
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {reviews.map((review, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-[350px] bg-gradient-to-br from-emerald-50 to-teal-50 p-6 rounded-2xl shadow-md hover:shadow-xl transition-all"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-lg">
                      {review.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{review.name}</h3>
                    <p className="text-sm text-gray-600">{review.weeks}</p>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed">{review.text}</p>
                <div className="flex gap-1 mt-4">
                  {[...Array(5)].map((_, i) => (
                    <Icon key={i} name="Star" size={16} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>
              </div>
            ))}
          </div>

          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg hover:bg-gray-100 rounded-full w-12 h-12 hidden md:flex"
            onClick={() => scroll('right')}
          >
            <Icon name="ChevronRight" size={24} />
          </Button>
        </div>

        <p className="text-center text-gray-500 mt-8 text-sm">
          Прокрутите, чтобы увидеть больше отзывов →
        </p>
      </div>
    </section>
  );
};

export default PregnancyReviews;
