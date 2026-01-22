import Icon from "@/components/ui/icon";

const AdvancedMassageAdvantages = () => {
  const advantages = [
    { icon: "Heart", title: "Глубокий восстановительный подход", description: "Работа с первопричинами" },
    { icon: "Hand", title: "Мануальные + висцеральные техники", description: "Комплексный метод" },
    { icon: "Brain", title: "Интеграция ВНС и остеопатического мышления", description: "Целостный взгляд" },
    { icon: "Target", title: "Практика, адаптированная под массажистов", description: "Применимо сразу" },
    { icon: "ShieldCheck", title: "Подготовка к работе с сложными клиентами", description: "Уверенность в действиях" },
    { icon: "Users", title: "Часть профессиональной экосистемы Док диалог", description: "Поддержка сообщества" }
  ];

  return (
    <section className="py-12 md:py-20 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8 md:mb-12 text-gray-900">
          Преимущества курса
        </h2>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {advantages.map((advantage, index) => (
            <div 
              key={index}
              className="bg-gradient-to-br from-purple-50 to-fuchsia-50 p-6 md:p-8 rounded-2xl shadow-md hover:shadow-lg transition-all hover:-translate-y-1"
            >
              <div className="flex flex-col items-center text-center gap-3 md:gap-4">
                <div className="p-3 md:p-4 bg-white rounded-full">
                  <Icon name={advantage.icon as any} size={28} className="text-purple-600" />
                </div>
                <div>
                  <h3 className="text-base md:text-lg font-bold text-gray-900 mb-1 md:mb-2">{advantage.title}</h3>
                  <p className="text-gray-600 text-xs md:text-sm">{advantage.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdvancedMassageAdvantages;