import Icon from "@/components/ui/icon";

const VNSResults = () => {
  const results = [
    { icon: "UserCheck", title: "Клиенты быстрее расслабляются и лучше восстанавливаются" },
    { icon: "Clock", title: "Эффект от массажа держится дольше" },
    { icon: "TrendingDown", title: "Меньше «резистентных» тканей и хронического напряжения" },
    { icon: "Lightbulb", title: "Вы чётко понимаете, что, зачем и почему делаете" },
    { icon: "Award", title: "Повышается ценность вашей работы и доверие клиентов" }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-indigo-50 via-purple-50 to-blue-50">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-900">
          Что изменится в вашей практике
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((result, index) => (
            <div 
              key={index}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <div className="flex flex-col items-center text-center gap-4">
                <div className="p-4 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full">
                  <Icon name={result.icon as any} size={32} className="text-indigo-600" />
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

export default VNSResults;
