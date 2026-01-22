import Icon from "@/components/ui/icon";

const CorrectionResults = () => {
  const results = [
    { icon: "Target", title: "Уверенно работаете с запросом «коррекция фигуры»" },
    { icon: "Eye", title: "Видите реальные причины изменений формы тела" },
    { icon: "Sparkles", title: "Получаете результаты, которые видно в зеркале" },
    { icon: "TrendingUp", title: "Повышаете чек и лояльность клиентов" },
    { icon: "Users", title: "Умеете привлекать клиентов без рекламы" },
    { icon: "Award", title: "Получаете системные знания и уверенность в работе" }
  ];

  return (
    <section className="py-12 md:py-20 px-4 bg-gradient-to-b from-rose-50 via-pink-50 to-fuchsia-50">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 md:mb-12 bg-gradient-to-r from-rose-600 to-fuchsia-600 bg-clip-text text-transparent">
          Итог курса
        </h2>
        
        <p className="text-base md:text-lg lg:text-xl text-gray-700 mb-8 md:mb-12 font-medium">
          После прохождения курса вы:
        </p>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {results.map((result, index) => (
            <div 
              key={index}
              className="bg-white p-6 md:p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 border border-rose-100/50"
            >
              <div className="flex flex-col items-center text-center gap-4">
                <div className="p-3 md:p-4 bg-gradient-to-br from-rose-100 via-pink-100 to-fuchsia-100 rounded-full shadow-md">
                  <Icon name={result.icon as any} size={24} className="text-rose-600 md:scale-125" />
                </div>
                <p className="text-sm md:text-base lg:text-lg text-gray-800 font-semibold leading-relaxed">{result.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CorrectionResults;