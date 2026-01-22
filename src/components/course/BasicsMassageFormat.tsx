import Icon from "@/components/ui/icon";

const BasicsMassageFormat = () => {
  const features = [
    { icon: "Clock", title: "Онлайн-доступ 24/7", description: "Учитесь в удобное время, в своём темпе" },
    { icon: "Video", title: "Теория + практика", description: "Системные знания и пошаговые видеоуроки" },
    { icon: "PlayCircle", title: "Видеоразборы и пошаговые алгоритмы", description: "Понятные инструкции для каждой техники" },
    { icon: "RefreshCw", title: "Возможность пересматривать материалы", description: "Возвращайтесь к урокам в любое время" }
  ];

  return (
    <section className="py-12 md:py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 md:mb-12 text-gray-900">
          Формат обучения
        </h2>
        
        <div className="grid md:grid-cols-2 gap-4 md:gap-6">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white p-6 md:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
            >
              <div className="flex items-start gap-3 md:gap-4">
                <div className="p-2 md:p-3 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg flex-shrink-0">
                  <Icon name={feature.icon as any} size={24} className="text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-base md:text-lg text-gray-900 mb-1 md:mb-2">{feature.title}</h3>
                  <p className="text-sm md:text-base text-gray-600">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BasicsMassageFormat;