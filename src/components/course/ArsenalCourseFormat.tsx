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
    }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-900">
          Формат обучения
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-primary to-purple-600 rounded-xl flex items-center justify-center mb-4">
                <Icon name={feature.icon as any} size={28} className="text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">
                {feature.title}
              </h3>
              <p className="text-gray-600">
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
