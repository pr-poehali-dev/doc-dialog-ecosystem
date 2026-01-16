import { useRef } from "react";
import Icon from "@/components/ui/icon";

const MastermindReviews = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const reviews = [
    {
      name: "Марина В.",
      specialty: "Массажист, Москва",
      text: "После мастермайнда появилась уверенность в работе со сложными клиентами. Разобрали мой реальный случай с клиенткой после операции — получила конкретный протокол действий. Теперь беру таких клиентов без страха.",
      rating: 5,
      result: "Увеличила средний чек на 40%"
    },
    {
      name: "Дмитрий К.",
      specialty: "Остеопат и массажист",
      text: "Очень практично! За один день получил больше, чем за полгода самообучения. Сергей показал приёмы работы с крестцом и тазом, которые сразу применил на следующий день. Клиенты заметили разницу.",
      rating: 5,
      result: "Освоил новые техники"
    },
    {
      name: "Елена Сергеевна",
      specialty: "Массажист-реабилитолог, 12 лет опыта",
      text: "Пришла с запросом по работе с послеродовыми клиентками. Разобрали анатомию, противопоказания, пошаговый алгоритм. Плюс обменялись опытом с коллегами — это дорого стоит. Атмосфера очень тёплая и профессиональная.",
      rating: 5,
      result: "Новая ниша в практике"
    },
    {
      name: "Андрей П.",
      specialty: "Спортивный массажист",
      text: "Мастермайнд помог систематизировать знания и посмотреть на практику под другим углом. Сергей разложил по полочкам биомеханику движений, теперь работаю с клиентами осознаннее. Группа тоже супер — все активные практики, обсуждали кейсы до вечера.",
      rating: 5,
      result: "Системность в работе"
    },
    {
      name: "Ольга Викторовна",
      specialty: "Массажист частной практики",
      text: "Это была моя вторая встреча. Приехала с конкретным запросом по ценообразованию и позиционированию. Получила не только ответы, но и поддержку коллег. Очень мотивирует видеть успешных специалистов вживую!",
      rating: 5,
      result: "Пересмотрела прайс и стратегию"
    },
    {
      name: "Игорь М.",
      specialty: "Массажист и мануальный терапевт",
      text: "Ценю формат за честность и открытость. Сергей не продаёт воду, а делится реальным опытом. Разобрали сложный случай с клиентом с грыжами — теперь понимаю, как работать безопасно и эффективно. Рекомендую всем практикам!",
      rating: 5,
      result: "Уверенность в сложных случаях"
    },
    {
      name: "Наталья Александровна",
      specialty: "Массажист, косметолог",
      text: "Мастермайнд дал мне то, чего не хватало — понимание системы работы с телом. Раньше работала интуитивно, теперь вижу связи, понимаю причины боли. Плюс познакомилась с классными коллегами, с которыми продолжаем общаться.",
      rating: 5,
      result: "Глубокое понимание тела"
    },
    {
      name: "Виктор С.",
      specialty: "Массажист, 7 лет практики",
      text: "Очень практичный формат. За 8 часов проработали столько материала! Особенно понравилась работа с фасциями и триггерными точками. Сергей показал техники, которые работают. На следующий день уже применил на клиенте — эффект wow!",
      rating: 5,
      result: "Новые эффективные техники"
    },
    {
      name: "Анна Петровна",
      specialty: "Массажист и телесный терапевт",
      text: "Приехала издалека специально на эту встречу — не пожалела! Получила ответы на все вопросы, отработала техники, познакомилась с единомышленниками. Очень ценю такие форматы живого обучения, где можно потрогать руками и задать вопросы.",
      rating: 5,
      result: "Живое обучение и практика"
    },
    {
      name: "Сергей Владимирович",
      specialty: "Массажист частной практики",
      text: "Мастермайнд помог мне выйти на новый уровень. Раньше работал по шаблону, теперь понимаю, как адаптировать техники под конкретного клиента. Разобрали мои ошибки, получил обратную связь от опытных коллег. Это бесценно!",
      rating: 5,
      result: "Индивидуальный подход к клиентам"
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
    <section className="py-20 px-4 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Отзывы участников
          </h2>
          <p className="text-xl text-gray-600">
            Реальный опыт специалистов, которые уже прошли мастермайнд
          </p>
        </div>

        <div className="relative">
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white rounded-full p-3 shadow-lg hover:bg-gray-50 transition-colors"
            aria-label="Предыдущий отзыв"
          >
            <Icon name="ChevronLeft" size={24} className="text-gray-700" />
          </button>

          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {reviews.map((review, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-[400px] bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow snap-start border border-gray-100"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-bold text-lg text-gray-900">{review.name}</h3>
                      <p className="text-sm text-gray-600">{review.specialty}</p>
                    </div>
                    <div className="flex gap-1">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Icon key={i} name="Star" size={16} className="text-yellow-500 fill-yellow-500" />
                      ))}
                    </div>
                  </div>

                  <p className="text-gray-700 leading-relaxed mb-4">
                    {review.text}
                  </p>

                  <div className="pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2 text-emerald-600">
                      <Icon name="CheckCircle2" size={18} />
                      <span className="font-medium text-sm">{review.result}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white rounded-full p-3 shadow-lg hover:bg-gray-50 transition-colors"
            aria-label="Следующий отзыв"
          >
            <Icon name="ChevronRight" size={24} className="text-gray-700" />
          </button>
        </div>

        <div className="text-center mt-8">
          <p className="text-gray-600">
            Листайте отзывы или используйте мышку для прокрутки →
          </p>
        </div>
      </div>
    </section>
  );
};

export default MastermindReviews;
