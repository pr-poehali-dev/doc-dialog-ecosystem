import Icon from "@/components/ui/icon";

const ArsenalCourseAdvantages = () => {
  const advantages = [
    {
      icon: "Target",
      title: "Практика, а не теория",
      description: "Только работающие техники и протоколы"
    },
    {
      icon: "Briefcase",
      title: "Адаптирован под реальную работу массажиста",
      description: "Всё проверено на тысячах клиентов"
    },
    {
      icon: "Network",
      title: "Системный подход, а не набор техник",
      description: "Целостное понимание работы с телом"
    },
    {
      icon: "Heart",
      title: "Безопасные мягкие методы",
      description: "Никакого риска для клиента"
    },
    {
      icon: "Home",
      title: "Подходит для частной практики",
      description: "Применимо в любых условиях"
    },
    {
      icon: "Users",
      title: "Часть экосистемы Док диалог",
      description: "Доступ к сообществу специалистов"
    }
  ];

  return (
    <section className="py-12 md:py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8 md:mb-12 bg-gradient-to-r from-primary via-purple-600 to-indigo-600 bg-clip-text text-transparent">
          Преимущества курса
        </h2>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {advantages.map((advantage, index) => (
            <div 
              key={index}
              className="bg-gradient-to-br from-white via-primary/5 to-purple-50 p-4 md:p-6 rounded-xl border border-primary/20 hover:border-primary hover:shadow-xl transition-all hover:-translate-y-1 shadow-lg"
            >
              <div className="flex items-start gap-3 md:gap-4">
                <div className="p-2 md:p-3 bg-gradient-to-br from-primary/20 to-purple-100 rounded-lg flex-shrink-0 shadow-md">
                  <Icon name={advantage.icon as any} size={20} className="text-primary md:scale-110" />
                </div>
                <div>
                  <h3 className="text-sm md:text-base lg:text-lg font-bold mb-1 md:mb-2 text-gray-900">
                    {advantage.title}
                  </h3>
                  <p className="text-gray-600 text-xs md:text-sm">
                    {advantage.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ArsenalCourseAdvantages;