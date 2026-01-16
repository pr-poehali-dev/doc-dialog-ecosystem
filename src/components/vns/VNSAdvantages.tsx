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
    <section className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-900">
          Преимущества курса
        </h2>
        <p className="text-center text-gray-600 mb-12 text-lg">
          Профессиональное обучение для роста в практике
        </p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {advantages.map((advantage, index) => (
            <div 
              key={index}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all hover:-translate-y-1 border border-indigo-100"
            >
              <div className="mb-4">
                <div className="inline-block p-3 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full">
                  <Icon name={advantage.icon as any} size={28} className="text-indigo-600" />
                </div>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{advantage.title}</h3>
              <p className="text-gray-600 text-sm">{advantage.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-gradient-to-br from-indigo-50 to-purple-50 p-8 rounded-2xl border-l-4 border-indigo-600">
          <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">Формат обучения</h3>
          <ul className="space-y-3 max-w-2xl mx-auto">
            <li className="flex items-start gap-3">
              <Icon name="CheckCircle2" size={24} className="text-indigo-600 flex-shrink-0 mt-1" />
              <span className="text-lg text-gray-800">Видеоуроки + структурированная теория</span>
            </li>
            <li className="flex items-start gap-3">
              <Icon name="CheckCircle2" size={24} className="text-indigo-600 flex-shrink-0 mt-1" />
              <span className="text-lg text-gray-800">Практические техники без «воды»</span>
            </li>
            <li className="flex items-start gap-3">
              <Icon name="CheckCircle2" size={24} className="text-indigo-600 flex-shrink-0 mt-1" />
              <span className="text-lg text-gray-800">Возможность пересматривать материалы</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default VNSAdvantages;
