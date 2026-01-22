import Icon from "@/components/ui/icon";

const VNSAdvantages = () => {
  const advantages = [
    {
      icon: "Target",
      title: "Узкая специализация: ВНС и массаж",
      description: "Глубокое погружение в конкретную тему"
    },
    {
      icon: "Zap",
      title: "Практика, применимая сразу",
      description: "Техники для внедрения с первого дня"
    },
    {
      icon: "Brain",
      title: "Остеопатический и нейрофизиологический подход",
      description: "Научное обоснование каждого метода"
    },
    {
      icon: "Award",
      title: "Подходит для опытных специалистов",
      description: "Профессиональный уровень материала"
    },
    {
      icon: "TrendingUp",
      title: "Повышает ценность вашей работы без выгорания",
      description: "Эффективность без перегрузки"
    },
    {
      icon: "Clock",
      title: "Онлайн-доступ 24/7",
      description: "Учитесь в удобное время"
    }
  ];

  return (
    <section className="py-12 md:py-20 px-4 bg-gradient-to-b from-indigo-50/30 via-purple-50/20 to-white">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
          Преимущества курса
        </h2>
        <p className="text-gray-600 mb-8 md:mb-12 text-base md:text-lg font-medium">
          Профессиональное обучение для роста в практике
        </p>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {advantages.map((advantage, index) => (
            <div 
              key={index}
              className="bg-white p-5 md:p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 border border-indigo-100/50"
            >
              <div className="mb-3 md:mb-4">
                <div className="inline-block p-2.5 md:p-3 bg-gradient-to-br from-indigo-100 via-purple-100 to-blue-100 rounded-full shadow-md">
                  <Icon name={advantage.icon as any} size={24} className="text-indigo-600" />
                </div>
              </div>
              <h3 className="text-base md:text-lg font-bold text-gray-900 mb-1.5 md:mb-2 leading-snug">{advantage.title}</h3>
              <p className="text-gray-600 text-xs md:text-sm leading-relaxed">{advantage.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 md:mt-12 bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 p-6 md:p-8 rounded-2xl border-l-4 border-indigo-600 shadow-lg">
          <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4">Формат обучения</h3>
          <ul className="space-y-2 md:space-y-3 max-w-2xl mx-auto">
            <li className="flex items-start gap-3">
              <Icon name="CheckCircle2" size={20} className="text-indigo-600 flex-shrink-0 mt-0.5" />
              <span className="text-sm md:text-base lg:text-lg text-gray-800 font-medium">Видеоуроки + структурированная теория</span>
            </li>
            <li className="flex items-start gap-3">
              <Icon name="CheckCircle2" size={20} className="text-indigo-600 flex-shrink-0 mt-0.5" />
              <span className="text-sm md:text-base lg:text-lg text-gray-800 font-medium">Практические техники без «воды»</span>
            </li>
            <li className="flex items-start gap-3">
              <Icon name="CheckCircle2" size={20} className="text-indigo-600 flex-shrink-0 mt-0.5" />
              <span className="text-sm md:text-base lg:text-lg text-gray-800 font-medium">Возможность пересматривать материалы</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default VNSAdvantages;