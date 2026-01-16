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
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-900">
          Преимущества курса
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {advantages.map((advantage, index) => (
            <div 
              key={index}
              className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-xl border-2 border-gray-200 hover:border-primary hover:shadow-lg transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-gradient-to-br from-primary/10 to-purple-50 rounded-lg flex-shrink-0">
                  <Icon name={advantage.icon as any} size={24} className="text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2 text-gray-900">
                    {advantage.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
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
