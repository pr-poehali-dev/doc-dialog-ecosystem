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
    <section className="py-20 px-4 bg-gradient-to-b from-rose-50 via-pink-50 to-fuchsia-50">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-900">
          Итог курса
        </h2>
        
        <p className="text-xl text-gray-700 text-center mb-12">
          После прохождения курса вы:
        </p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((result, index) => (
            <div 
              key={index}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <div className="flex flex-col items-center text-center gap-4">
                <div className="p-4 bg-gradient-to-br from-rose-100 to-pink-100 rounded-full">
                  <Icon name={result.icon as any} size={32} className="text-rose-600" />
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

export default CorrectionResults;