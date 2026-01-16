import { useRef } from "react";
import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";

const VNSReviews = () => {
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
      name: "Дмитрий Королев",
      text: "Курс полностью изменил мое понимание работы с болью. Теперь вижу связь между стрессом и телесными зажимами. Клиенты с хронической болью наконец получают облегчение.",
      specialty: "Остеопат, 8 лет опыта"
    },
    {
      name: "Ирина Васильева",
      text: "Раньше работала только с мышцами, не понимая роль нервной системы. После курса подход стал комплексным — результаты у клиентов держатся намного дольше.",
      specialty: "Массажист, 6 лет опыта"
    },
    {
      name: "Алексей Павлов",
      text: "Блок про вегетативную нервную систему — просто откровение! Теперь понимаю, почему одни техники работают, а другие нет. Работа стала осознанной.",
      specialty: "Телесный терапевт, 10 лет опыта"
    },
    {
      name: "Марина Сергеева",
      text: "После курса могу объяснить клиенту, почему у него болит спина, когда на работе стресс. Авторитет вырос — клиенты доверяют и рекомендуют.",
      specialty: "Специалист по боли, 5 лет опыта"
    },
    {
      name: "Сергей Николаев",
      text: "Научился работать с блуждающим нервом — это реально работает! Клиенты отмечают улучшение сна и снижение тревожности уже после 2-3 сеансов.",
      specialty: "Остеопат, 7 лет опыта"
    },
    {
      name: "Елена Михайлова",
      text: "Курс дал системное понимание связи стресса и телесных проявлений. Теперь работаю не с симптомами, а с причиной. Результаты стали стабильными.",
      specialty: "Массажист-реабилитолог, 9 лет опыта"
    },
    {
      name: "Андрей Козлов",
      text: "Раздел про остеопатический подход к ВНС — золото! Интегрировал техники в практику — клиенты замечают разницу и возвращаются.",
      specialty: "Остеопат, 12 лет опыта"
    },
    {
      name: "Ольга Романова",
      text: "После курса уверенно работаю с клиентами с паническими атаками и тревожностью. Знания нейрофизиологии помогают подбирать точные техники.",
      specialty: "Телесный терапевт, 4 года опыта"
    },
    {
      name: "Владимир Соловьев",
      text: "Курс научил видеть тело как единую систему. Теперь понимаю, как массаж влияет на ВНС и почему важна последовательность техник.",
      specialty: "Массажист, 11 лет опыта"
    },
    {
      name: "Наталья Егорова",
      text: "Практические техники сразу пошли в работу. Клиенты отмечают расслабление, улучшение пищеварения и качества сна. Курс окупился за месяц!",
      specialty: "Специалист по стрессу и боли, 6 лет опыта"
    }
  ];

  return (
    <section className="py-20 px-4 bg-white">
      <div className="container mx-auto max-w-7xl">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-900">
          Отзывы участников
        </h2>
        <p className="text-center text-gray-600 mb-12 text-lg">
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
            className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {reviews.map((review, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-[350px] bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-2xl shadow-md hover:shadow-xl transition-all"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-lg">
                      {review.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{review.name}</h3>
                    <p className="text-sm text-gray-600">{review.specialty}</p>
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

export default VNSReviews;
