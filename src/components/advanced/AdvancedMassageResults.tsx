import Icon from "@/components/ui/icon";

const AdvancedMassageResults = () => {
  const results = [
    { icon: "TrendingDown", title: "Снижается физическая нагрузка на специалиста" },
    { icon: "Smile", title: "Клиенты чувствуют облегчение уже во время сеанса" },
    { icon: "Activity", title: "Улучшается подвижность, дыхание, осанка" },
    { icon: "Sparkles", title: "Работа становится глубже и «чище»" },
    { icon: "TrendingUp", title: "Повышается средний чек и доверие клиентов" },
    { icon: "Heart", title: "Появляется возможность помогать сложным клиентам" }
  ];

  return (
    <section className="py-12 md:py-20 px-4 bg-gradient-to-b from-purple-50 via-fuchsia-50 to-pink-50">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8 md:mb-12 text-gray-900">
          Что меняется в практике после курса
        </h2>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {results.map((result, index) => (
            <div 
              key={index}
              className="bg-white p-6 md:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <div className="flex flex-col items-center text-center gap-3 md:gap-4">
                <div className="p-3 md:p-4 bg-gradient-to-br from-purple-100 to-fuchsia-100 rounded-full">
                  <Icon name={result.icon as any} size={28} className="text-purple-600" />
                </div>
                <p className="text-gray-800 font-medium text-sm md:text-base lg:text-lg leading-relaxed">{result.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdvancedMassageResults;