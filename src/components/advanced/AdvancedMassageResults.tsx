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
    <section className="py-20 px-4 bg-gradient-to-b from-purple-50 via-fuchsia-50 to-pink-50">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-900">
          Что меняется в практике после курса
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((result, index) => (
            <div 
              key={index}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <div className="flex flex-col items-center text-center gap-4">
                <div className="p-4 bg-gradient-to-br from-purple-100 to-fuchsia-100 rounded-full">
                  <Icon name={result.icon as any} size={32} className="text-purple-600" />
                </div>
                <p className="text-gray-800 font-medium text-lg leading-relaxed">{result.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdvancedMassageResults;