import { useRef } from "react";
import Icon from "@/components/ui/icon";

const ArsenalCourseReviews = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 400;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const reviews = [
    {
      name: "Елена Викторовна",
      specialty: "Массажист-реабилитолог",
      text: "Курс полностью перевернул моё представление о работе с телом. Раньше просто разминала мышцы, теперь понимаю причины напряжений и работаю целенаправленно. Клиенты чувствуют разницу сразу!",
      rating: 5
    },
    {
      name: "Дмитрий Соколов",
      specialty: "Мануальный терапевт",
      text: "Протоколы работы с шейным отделом — просто находка. Научился снимать острую боль безопасно, без риска навредить. Техники простые, но очень эффективные.",
      rating: 5
    },
    {
      name: "Мария Светлова",
      specialty: "Телесный специалист",
      text: "До курса работала интуитивно. Теперь есть чёткая система диагностики и выбора техник. Особенно ценю блок про психосоматику — клиенты действительно расслабляются глубже.",
      rating: 5
    },
    {
      name: "Игорь Петрович",
      specialty: "Массажист в санатории",
      text: "Работаю 15 лет, думал, что всё знаю. Но курс показал совершенно новые подходы к работе с хронической болью. Теперь мои сеансы дают долгосрочный эффект, а не временное облегчение.",
      rating: 5
    },
    {
      name: "Анна Кузнецова",
      specialty: "Массажист-косметолог",
      text: "Блок про лимфодренаж и работу с лицом помог мне выйти на новый уровень. Клиенты стали замечать не только эстетический эффект, но и улучшение общего самочувствия.",
      rating: 5
    },
    {
      name: "Сергей Волков",
      specialty: "Спортивный массажист",
      text: "Техники восстановления после травм просто бомба! Спортсмены возвращаются в строй быстрее, а я стал незаменимым специалистом в команде. Рекомендую всем, кто работает со спортсменами.",
      rating: 5
    },
    {
      name: "Ольга Николаевна",
      specialty: "Массажист частной практики",
      text: "Самое ценное — это понимание взаимосвязей в теле. Раньше работала с симптомами, теперь вижу всю картину целиком. Клиенты приходят снова и советуют меня друзьям.",
      rating: 5
    },
    {
      name: "Виктор Смирнов",
      specialty: "Остеопат",
      text: "Дополнил свою остеопатическую практику мягкими массажными техниками из курса. Результаты стали ещё лучше, особенно при работе с пожилыми пациентами.",
      rating: 5
    },
    {
      name: "Татьяна Морозова",
      specialty: "Массажист-универсал",
      text: "Курс дал мне уверенность в работе. Теперь не боюсь сложных случаев — есть чёткие алгоритмы действий. Клиентов стало больше, потому что я даю реальный результат.",
      rating: 5
    },
    {
      name: "Алексей Борисов",
      specialty: "Инструктор ЛФК и массажист",
      text: "Объединил знания из курса с ЛФК — получился мощный комплекс для восстановления. Пациенты выздоравливают быстрее, а я горжусь своей работой. Спасибо за практичный курс!",
      rating: 5
    }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto max-w-7xl">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-900">
          Отзывы специалистов
        </h2>
        <p className="text-xl text-center text-gray-600 mb-12">
          Что говорят массажисты, прошедшие курс
        </p>

        <div className="relative">
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-shadow"
            aria-label="Предыдущий отзыв"
          >
            <Icon name="ChevronLeft" size={24} className="text-primary" />
          </button>

          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory pb-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {reviews.map((review, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-[350px] snap-start bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-shadow border border-gray-100"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Icon key={i} name="Star" size={20} className="text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                
                <p className="text-gray-700 mb-4 leading-relaxed">{review.text}</p>
                
                <div className="border-t pt-4">
                  <p className="font-bold text-gray-900">{review.name}</p>
                  <p className="text-sm text-gray-600">{review.specialty}</p>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-shadow"
            aria-label="Следующий отзыв"
          >
            <Icon name="ChevronRight" size={24} className="text-primary" />
          </button>
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">Перетащите мышкой для прокрутки →</p>
        </div>
      </div>
    </section>
  );
};

export default ArsenalCourseReviews;
