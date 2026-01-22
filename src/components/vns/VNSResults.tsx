import Icon from "@/components/ui/icon";

const VNSResults = () => {
  const results = [
    { icon: "UserCheck", title: "Клиенты быстрее расслабляются и лучше восстанавливаются" },
    { icon: "Clock", title: "Эффект от массажа держится дольше" },
    { icon: "TrendingDown", title: "Меньше «резистентных» тканей и хронического напряжения" },
    { icon: "Lightbulb", title: "Вы чётко понимаете, что, зачем и почему делаете" },
    { icon: "Award", title: "Повышается ценность вашей работы и доверие клиентов" },
    { icon: "Users", title: "Растёт поток рекомендаций от довольных клиентов" }
  ];

  return (
    <section className="py-12 md:py-20 px-4 bg-gradient-to-b from-indigo-50 via-purple-50 to-blue-50">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 md:mb-12 bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-700 bg-clip-text text-transparent">
          Что изменится в вашей практике
        </h2>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {results.map((result, index) => (
            <div 
              key={index}
              className="bg-white p-6 md:p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 border border-indigo-100/50"
            >
              <div className="flex flex-col items-center text-center gap-4">
                <div className="p-3 md:p-4 bg-gradient-to-br from-indigo-100 via-purple-100 to-blue-100 rounded-full shadow-md">
                  <Icon name={result.icon as any} size={24} className="text-indigo-600 md:scale-125" />
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

export default VNSResults;