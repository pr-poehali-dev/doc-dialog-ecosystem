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
    <section className="py-12 md:py-20 px-4 bg-gradient-to-b from-indigo-50 via-purple-50 to-pink-50">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8 md:mb-12 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
          Что меняется после курса
        </h2>
        
        <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="bg-gradient-to-br from-white to-indigo-50 p-4 md:p-6 lg:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 border border-indigo-100"
            >
              <div className="flex flex-col items-center text-center gap-3 md:gap-4">
                <div className="p-3 md:p-4 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full shadow-md">
                  <Icon name={benefit.icon as any} size={28} className="text-primary md:scale-110" />
                </div>
                <p className="text-gray-800 font-medium text-sm md:text-base lg:text-lg leading-relaxed">{benefit.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandCourseBenefits;