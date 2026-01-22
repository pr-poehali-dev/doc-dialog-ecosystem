import { useRef } from "react";
import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";

const CorrectionReviews = () => {
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
      name: "Елена Ковалева",
      text: "После курса полностью изменила подход к коррекции фигуры. Теперь работаю не вслепую, а понимаю причины изменений тела. Клиенты в восторге от результатов!",
      specialty: "Массажист, 5 лет опыта"
    },
    {
      name: "Мария Соколова",
      text: "Купонаторы — это находка! За месяц привлекла 23 новых клиента без затрат на рекламу. 8 из них стали постоянными. Курс окупился в первую неделю.",
      specialty: "Специалист по телу"
    },
    {
      name: "Анна Петрова",
      text: "Наконец-то разобралась, почему у клиентов выпирает живот и как с этим работать. Раньше делала массаж интуитивно, теперь вижу систему.",
      specialty: "Массажист-эстетист"
    },
    {
      name: "Ольга Смирнова",
      text: "Средний чек вырос с 3000 до 5500 рублей. Клиенты готовы платить больше, когда видят реальные изменения формы тела и понимают, что я делаю.",
      specialty: "Телесный специалист, 3 года опыта"
    },
    {
      name: "Наталья Иванова",
      text: "Техники коррекции работают! Клиентка с отеками увидела результат уже после первого сеанса. Теперь рекомендует меня всем подругам.",
      specialty: "Массажист"
    },
    {
      name: "Татьяна Волкова",
      text: "Благодаря разделу про купонаторы запустила постоянный поток клиентов. Работаю через Biglion — каждую неделю 4-5 новых записей.",
      specialty: "Специалист восстановительного массажа"
    },
    {
      name: "Екатерина Морозова",
      text: "Курс дал системные знания. Теперь уверенно работаю с запросом 'убрать живот' и 'галифе'. Результаты стали предсказуемыми и стабильными.",
      specialty: "Массажист, 7 лет опыта"
    },
    {
      name: "Светлана Новикова",
      text: "Диагностика причин отёков — мой любимый блок! Теперь вижу, откуда берутся проблемы, и работаю точечно. Клиенты удивляются, как быстро меняется форма.",
      specialty: "Телесный терапевт"
    },
    {
      name: "Юлия Федорова",
      text: "После курса повысила цены на 40% и клиенты не ушли, а стали больше ценить работу. Упаковка услуги из курса сработала на отлично!",
      specialty: "Массажист-эстетист, 4 года опыта"
    },
    {
      name: "Виктория Белова",
      text: "Раньше боялась работать с коррекцией фигуры — казалось сложным. Курс разложил всё по полочкам. Теперь это моя основная специализация!",
      specialty: "Специалист по массажу"
    }
  ];

  return (
    <section className="py-12 md:py-20 px-4 bg-white">
      <div className="container mx-auto max-w-7xl">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
          Отзывы участников
        </h2>
        <p className="text-gray-600 mb-8 md:mb-12 text-base md:text-lg font-medium">
          Реальные результаты специалистов после курса
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
            className="flex gap-4 md:gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {reviews.map((review, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-[280px] sm:w-[320px] md:w-[350px] bg-gradient-to-br from-rose-50 via-pink-50 to-fuchsia-50 p-4 md:p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all border border-rose-100/50"
              >
                <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-rose-600 to-pink-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                    <span className="text-white font-bold text-base md:text-lg">
                      {review.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-sm md:text-base font-bold text-gray-900">{review.name}</h3>
                    <p className="text-sm text-gray-600">{review.specialty}</p>
                  </div>
                </div>
                <p className="text-xs md:text-sm text-gray-700 leading-relaxed">{review.text}</p>
                <div className="flex gap-1 mt-3 md:mt-4">
                  {[...Array(5)].map((_, i) => (
                    <Icon key={i} name="Star" size={14} className="text-amber-400 fill-amber-400" />
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

        <p className="text-center text-gray-500 mt-6 md:mt-8 text-xs md:text-sm">
          Прокрутите, чтобы увидеть больше отзывов →
        </p>
      </div>
    </section>
  );
};

export default CorrectionReviews;