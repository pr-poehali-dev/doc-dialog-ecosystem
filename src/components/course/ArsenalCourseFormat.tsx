import Icon from "@/components/ui/icon";

const ArsenalCourseFormat = () => {
  const features = [
    {
      icon: "Wifi",
      title: "Онлайн-доступ 24/7",
      description: "Учитесь в удобное время из любой точки мира"
    },
    {
      icon: "Video",
      title: "Видеоразборы техник",
      description: "Подробные демонстрации каждого приёма"
    },
    {
      icon: "FileText",
      title: "Чёткие протоколы работы",
      description: "Готовые схемы для применения в практике"
    },
    {
      icon: "Map",
      title: "Пошаговая логика действий",
      description: "Понятная структура от диагностики до результата"
    },
    {
      icon: "RotateCcw",
      title: "Возможность возвращаться к материалу",
      description: "Неограниченный доступ к курсу"
    },
    {
      icon: "HeadphonesIcon",
      title: "Поддержка и сопровождение",
      description: "Ответы на вопросы от экспертов"
    }
  ];

  return (
    <section className="py-12 md:py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8 md:mb-12 bg-gradient-to-r from-primary via-purple-600 to-indigo-600 bg-clip-text text-transparent">
          Формат обучения
        </h2>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-gradient-to-br from-white to-primary/5 p-4 md:p-6 rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 border border-primary/10"
            >
              <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-primary via-purple-600 to-indigo-600 rounded-xl flex items-center justify-center mb-3 md:mb-4 shadow-md">
                <Icon name={feature.icon as any} size={24} className="text-white md:scale-110" />
              </div>
              <h3 className="text-base md:text-lg lg:text-xl font-bold mb-1 md:mb-2 text-gray-900">
                {feature.title}
              </h3>
              <p className="text-sm md:text-base text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ArsenalCourseFormat;