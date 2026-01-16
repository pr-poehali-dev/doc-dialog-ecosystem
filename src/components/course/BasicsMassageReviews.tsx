import { useRef } from "react";
import Icon from "@/components/ui/icon";

const BasicsMassageReviews = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const reviews = [
    {
      name: "Анна Смирнова",
      specialty: "Начинающий массажист",
      text: "Проходила курс с нуля. Все объяснено очень понятно и системно. Особенно понравились блоки по анатомии и практические видео. Уже через месяц после окончания курса начала принимать первых клиентов. Чувствую уверенность в своих действиях.",
      rating: 5,
      result: "Начала частную практику"
    },
    {
      name: "Дмитрий Волков",
      specialty: "Фитнес-тренер",
      text: "Хотел расширить свои компетенции. Курс дал мне то, что нужно — понимание биомеханики, работы с фасциями и мышцами. Теперь могу помогать клиентам не только тренировками, но и восстановительным массажем. Очень практичный подход!",
      rating: 5,
      result: "Добавил новую услугу"
    },
    {
      name: "Ольга Петрова",
      specialty: "Косметолог",
      text: "Всегда хотела освоить массаж лица и тела, но не знала с чего начать. Этот курс стал идеальной отправной точкой. Структура продумана до мелочей, есть четкая последовательность. Особенно ценю блок про психосоматику — это совсем другой уровень понимания клиента.",
      rating: 5,
      result: "Расширила спектр услуг"
    },
    {
      name: "Михаил Соколов",
      specialty: "Мануальный терапевт",
      text: "Решил систематизировать знания по массажу. Курс превзошел ожидания — много нового узнал про нервную систему и фасциальные связи. Видеотехники очень подробные, можно пересматривать и отрабатывать. Рекомендую всем, кто хочет профессионально развиваться.",
      rating: 5,
      result: "Систематизировал знания"
    },
    {
      name: "Елена Николаевна",
      specialty: "Медсестра",
      text: "После 15 лет в медицине решила кардинально изменить жизнь. Курс дал прочную базу для старта новой профессии. Анатомия была знакома, но здесь столько нюансов про работу руками! Уже веду прием, клиенты довольны. Спасибо за качественный материал!",
      rating: 5,
      result: "Сменила профессию"
    },
    {
      name: "Виктория Зайцева",
      specialty: "Студентка медвуза",
      text: "Проходила курс параллельно с учебой. Очень помогло глубже понять анатомию и физиологию. Плюс получила практические навыки, которых в вузе не дают. Формат онлайн очень удобен — училась в своем темпе. Теперь подрабатываю массажистом, оплачиваю учебу сама.",
      rating: 5,
      result: "Нашла подработку"
    },
    {
      name: "Сергей Иванов",
      specialty: "Реабилитолог",
      text: "Работаю с послеоперационными пациентами. Курс дал новые инструменты для работы. Особенно ценю модуль про клиническое мышление массажиста — это про безопасность и эффективность одновременно. Материал структурирован отлично, легко усваивается.",
      rating: 5,
      result: "Новые методики в работе"
    },
    {
      name: "Мария Лебедева",
      specialty: "Домохозяйка",
      text: "Долго искала возможность освоить новую профессию, не выходя из дома. Этот курс — находка! Все понятно даже для человека без медобразования. Преподаватель объясняет сложные вещи простым языком. Уже принимаю клиентов на дому, планирую открыть кабинет.",
      rating: 5,
      result: "Освоила новую профессию"
    },
    {
      name: "Алексей Морозов",
      specialty: "Спортсмен",
      text: "После травмы начал интересоваться восстановлением тела. Курс открыл глаза на многие процессы. Теперь понимаю, как работает тело, где искать причины боли. Решил пойти дальше — буду развиваться как специалист по спортивной реабилитации.",
      rating: 5,
      result: "Определился с профессией"
    },
    {
      name: "Татьяна Волкова",
      specialty: "Психолог",
      text: "Проходила курс, чтобы лучше понимать связь тела и психики. Получила гораздо больше! Блок про психосоматику — это просто открытие. Теперь могу помогать клиентам комплексно. Массаж отлично дополняет психологические сессии. Клиенты в восторге от результатов.",
      rating: 5,
      result: "Комплексный подход к клиентам"
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
            Отзывы учеников
          </h2>
          <p className="text-xl text-gray-600">
            Реальные истории тех, кто прошел курс "Основы массажа"
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
                    <div className="flex items-center gap-2 text-blue-600">
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

export default BasicsMassageReviews;
