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
    <section className="py-12 md:py-20 px-4 bg-gradient-to-b from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 md:mb-12 text-gray-900">
          Что вы получите после курса
        </h2>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {results.map((result, index) => (
            <div 
              key={index}
              className="bg-white p-6 md:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <div className="flex flex-col gap-3 md:gap-4">
                <div className="p-3 md:p-4 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full self-start">
                  <Icon name={result.icon as any} size={28} className="text-blue-600" />
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

export default BasicsMassageResults;