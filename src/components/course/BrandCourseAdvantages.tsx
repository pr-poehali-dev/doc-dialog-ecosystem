import Icon from "@/components/ui/icon";

const BrandCourseAdvantages = () => {
  const advantages = [
    {
      icon: "Target",
      title: "Адаптирован именно под массажистов",
      description: "Все примеры, кейсы и стратегии разработаны специально для массажного бизнеса"
    },
    {
      icon: "Zap",
      title: "Без абстрактного маркетинга",
      description: "Только конкретные инструменты и пошаговые алгоритмы действий"
    },
    {
      icon: "BarChart3",
      title: "Сильная аналитическая база",
      description: "Учитесь принимать решения на основе данных, а не догадок"
    },
    {
      icon: "TrendingUp",
      title: "Масштабирование без потери качества",
      description: "Системный подход к росту практики с сохранением экспертности"
    },
    {
      icon: "Users",
      title: "Часть экосистемы Док диалог",
      description: "Доступ к сообществу профессионалов и дополнительным ресурсам"
    },
    {
      icon: "Rocket",
      title: "Быстрый старт с нуля",
      description: "Курс подходит для специалистов без опыта в маркетинге и digital-продвижении"
    }
  ];

  return (
    <section className="py-12 md:py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8 md:mb-12 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
          Преимущества курса
        </h2>
        
        <div className="grid md:grid-cols-2 gap-4 md:gap-6">
          {advantages.map((advantage, index) => (
            <div 
              key={index}
              className="bg-gradient-to-br from-white to-indigo-50 p-4 md:p-6 lg:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 border border-indigo-100"
            >
              <div className="flex items-start gap-3 md:gap-4">
                <div className="p-2 md:p-3 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl flex-shrink-0 shadow-md">
                  <Icon name={advantage.icon as any} size={24} className="text-primary md:scale-110" />
                </div>
                <div>
                  <h3 className="text-base md:text-lg lg:text-xl font-bold text-gray-900 mb-1 md:mb-2">{advantage.title}</h3>
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed">{advantage.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandCourseAdvantages;