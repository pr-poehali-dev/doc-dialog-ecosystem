import Icon from "@/components/ui/icon";

const BasicsMassageResults = () => {
  const results = [
    { icon: "Lightbulb", title: "Целостное понимание тела человека" },
    { icon: "Target", title: "Навык диагностики и осознанного воздействия" },
    { icon: "CheckCircle2", title: "Готовую базу для работы с клиентами" },
    { icon: "Shield", title: "Уверенность в своих действиях и решениях" },
    { icon: "TrendingUp", title: "Подготовку к медицинскому и остеопатическому подходу" },
    { icon: "Award", title: "Практические навыки работы с реальными запросами" }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-900">
          Что вы получите после курса
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((result, index) => (
            <div 
              key={index}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <div className="flex flex-col items-center text-center gap-4">
                <div className="p-4 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full">
                  <Icon name={result.icon as any} size={32} className="text-blue-600" />
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

export default BasicsMassageResults;