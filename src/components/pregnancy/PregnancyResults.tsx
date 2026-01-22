import Icon from "@/components/ui/icon";

const PregnancyResults = () => {
  const results = [
    { icon: "Heart", title: "Чувствуете уверенность в движении" },
    { icon: "Lightbulb", title: "Понимаете своё тело" },
    { icon: "ShieldCheck", title: "Снижаете риск болей в спине и тазу" },
    { icon: "Activity", title: "Улучшаете кровообращение" },
    { icon: "Users", title: "Мягко готовите тело к родам" },
    { icon: "Sparkles", title: "Создаёте контакт с телом и ребёнком" }
  ];

  return (
    <section className="py-12 md:py-20 px-4 bg-gradient-to-b from-emerald-50 via-teal-50 to-cyan-50">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 md:mb-12 text-gray-900">
          Результат после прохождения тренинга
        </h2>
        
        <p className="text-lg md:text-xl text-gray-700 mb-8 md:mb-12">
          Вы:
        </p>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {results.map((result, index) => (
            <div 
              key={index}
              className="bg-white p-6 md:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <div className="flex flex-col items-center text-center gap-4">
                <div className="p-3 md:p-4 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full">
                  <Icon name={result.icon as any} size={24} className="text-emerald-600 md:scale-125" />
                </div>
                <p className="text-sm md:text-base lg:text-lg text-gray-800 font-medium leading-relaxed">{result.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PregnancyResults;