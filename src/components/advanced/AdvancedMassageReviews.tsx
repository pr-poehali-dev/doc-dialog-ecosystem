import { useRef } from "react";
import Icon from "@/components/ui/icon";

const AdvancedMassageReviews = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const reviews = [
    {
      name: "Екатерина Волкова",
      specialty: "Массажист, 8 лет опыта",
      text: "После базового курса чувствовала, что чего-то не хватает. Продвинутый курс открыл совершенно новый уровень понимания тела. Висцеральные техники изменили мою практику кардинально — теперь работаю с причинами, а не следствиями. Клиенты в восторге от результатов!",
      rating: 5,
      result: "Работа с первопричинами"
    },
    {
      name: "Игорь Смирнов",
      specialty: "Мануальный терапевт",
      text: "Курс дал системное понимание связи позвоночника, органов и фасций. Мягкие мануальные техники — это именно то, что искал. Теперь не нужно использовать силу, клиенты расслабляются быстрее, результат держится дольше. Рекомендую всем, кто устал от силового массажа.",
      rating: 5,
      result: "Мягкие эффективные техники"
    },
    {
      name: "Анна Петровна",
      specialty: "Остеопат и массажист",
      text: "Прошла курс для систематизации знаний. Получила гораздо больше — глубокое понимание биодинамики, висцеральной работы и регуляции ВНС. Особенно ценю практический блок и разбор клинических случаев. Курс стоит каждого рубля и каждой минуты!",
      rating: 5,
      result: "Систематизация и глубина"
    },
    {
      name: "Дмитрий Козлов",
      specialty: "Массажист-реабилитолог",
      text: "Работаю с послеоперационными клиентами. Курс дал новые инструменты для восстановления. Техники работы с диафрагмой и грудной клеткой просто волшебны — люди начинают дышать глубже прямо на сеансе. Физическая нагрузка на меня снизилась в разы.",
      rating: 5,
      result: "Снижение нагрузки, лучший результат"
    },
    {
      name: "Мария Николаевна",
      specialty: "Телесный терапевт, 12 лет практики",
      text: "Долго искала курс, который объединит остеопатический подход и массаж. Здесь всё это есть! Висцеральные техники интегрировала в свою практику — клиенты отмечают улучшение пищеварения, дыхания, общего состояния. Это совсем другой уровень работы.",
      rating: 5,
      result: "Остеопатический подход"
    },
    {
      name: "Алексей Морозов",
      specialty: "Спортивный массажист",
      text: "После 10 лет силового массажа начал выгорать физически. Продвинутый курс показал другой путь. ПИР, мягкие мануальные техники, работа с фасциями — теперь работаю умнее, а не тяжелее. Спортсмены довольны, я не устаю. Лучшее вложение в себя!",
      rating: 5,
      result: "Избавился от выгорания"
    },
    {
      name: "Ольга Викторовна",
      specialty: "Массажист частной практики",
      text: "Курс превзошел все ожидания! Особенно впечатлил блок по регуляции ВНС — это ключ к работе с хронической болью и стрессом. Клиенты засыпают на сеансе и просыпаются обновленными. Средний чек вырос на 50%, потому что результат виден сразу.",
      rating: 5,
      result: "Рост чека на 50%"
    },
    {
      name: "Сергей Иванович",
      specialty: "Массажист и кинезиолог",
      text: "Проходил курс для освоения висцеральных техник. Получил комплексную систему работы с телом. Клиническое мышление, которое дает курс, помогает выстраивать стратегию восстановления для каждого клиента индивидually. Это профессиональный рост в чистом виде.",
      rating: 5,
      result: "Индивидуальный подход"
    },
    {
      name: "Наталья Соколова",
      specialty: "Массажист после базового курса",
      text: "Закончила базовый курс и сразу пошла на продвинутый. Разница огромная! Если базовый — это фундамент, то продвинутый — это искусство. Мануальная терапия позвоночника, висцеральные техники — это то, чего так не хватало. Теперь работаю с уверенностью профи.",
      rating: 5,
      result: "Профессиональная уверенность"
    },
    {
      name: "Виктор Степанов",
      specialty: "Массажист, 15 лет опыта",
      text: "Думал, что знаю всё. Продвинутый курс показал, как много ещё можно развиваться. Биодинамика позвоночника, висцеро-соматические связи, интеграция ВНС — каждый модуль открывал новые горизонты. Сейчас беру самых сложных клиентов и получаю результат. Спасибо за знания!",
      rating: 5,
      result: "Работа со сложными случаями"
    }
  ];

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      const newScrollLeft = scrollContainerRef.current.scrollLeft + 
        (direction === 'left' ? -scrollAmount : scrollAmount);
      
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="py-12 md:py-20 px-4 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 text-gray-900">
            Отзывы выпускников
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-gray-600">
            Реальный опыт специалистов, которые прошли продвинутый курс
          </p>
        </div>

        <div className="relative">
          <button
            onClick={() => scroll('left')}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white rounded-full p-3 shadow-lg hover:bg-gray-50 transition-colors items-center justify-center"
            aria-label="Предыдущий отзыв"
          >
            <Icon name="ChevronLeft" size={24} className="text-gray-700" />
          </button>

          <div
            ref={scrollContainerRef}
            className="flex gap-4 md:gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {reviews.map((review, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-[280px] sm:w-[320px] md:w-[400px] bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow snap-start border border-purple-100"
              >
                <div className="p-4 md:p-6">
                  <div className="flex items-start justify-between mb-3 md:mb-4">
                    <div>
                      <h3 className="font-bold text-base md:text-lg text-gray-900">{review.name}</h3>
                      <p className="text-xs md:text-sm text-gray-600">{review.specialty}</p>
                    </div>
                    <div className="flex gap-1">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Icon key={i} name="Star" size={16} className="text-yellow-500 fill-yellow-500" />
                      ))}
                    </div>
                  </div>

                  <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-3 md:mb-4">
                    {review.text}
                  </p>

                  <div className="pt-3 md:pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2 text-purple-600">
                      <Icon name="CheckCircle2" size={16} />
                      <span className="font-medium text-xs md:text-sm">{review.result}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => scroll('right')}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white rounded-full p-3 shadow-lg hover:bg-gray-50 transition-colors items-center justify-center"
            aria-label="Следующий отзыв"
          >
            <Icon name="ChevronRight" size={24} className="text-gray-700" />
          </button>
        </div>

        <div className="text-center mt-6 md:mt-8">
          <p className="text-sm md:text-base text-gray-600">
            Листайте отзывы или используйте мышку для прокрутки →
          </p>
        </div>
      </div>
    </section>
  );
};

export default AdvancedMassageReviews;