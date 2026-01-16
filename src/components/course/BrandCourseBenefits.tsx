import Icon from "@/components/ui/icon";

const BrandCourseBenefits = () => {
  const benefits = [
    {
      icon: "Map",
      title: "Появляется понятная стратегия развития"
    },
    {
      icon: "Users",
      title: "Клиенты приходят системно, а не случайно"
    },
    {
      icon: "TrendingUp",
      title: "Увеличивается средний чек и загрузка"
    },
    {
      icon: "BarChart3",
      title: "Вы понимаете, какие каналы дают результат"
    },
    {
      icon: "CheckCircle2",
      title: "Маркетинг перестаёт быть хаосом"
    },
    {
      icon: "Award",
      title: "Формируется экспертный образ массажиста"
    }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-indigo-50 via-purple-50 to-pink-50">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-900">
          Что меняется после курса
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <div className="flex flex-col items-center text-center gap-4">
                <div className="p-4 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full">
                  <Icon name={benefit.icon as any} size={32} className="text-primary" />
                </div>
                <p className="text-gray-800 font-medium text-lg leading-relaxed">{benefit.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandCourseBenefits;
