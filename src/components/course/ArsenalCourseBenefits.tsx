import Icon from "@/components/ui/icon";

const ArsenalCourseBenefits = () => {
  const benefits = [
    {
      icon: "Sparkles",
      title: "Клиенты чувствуют результат уже на первом сеансе"
    },
    {
      icon: "ListChecks",
      title: "Уходит хаотичная работа «по жалобе»"
    },
    {
      icon: "Shield",
      title: "Появляется уверенность в действиях"
    },
    {
      icon: "Battery",
      title: "Снижается физическая нагрузка на специалиста"
    },
    {
      icon: "TrendingUp",
      title: "Повышается ценность и средний чек"
    },
    {
      icon: "Users",
      title: "Клиенты возвращаются и рекомендуют"
    }
  ];

  return (
    <section className="py-12 md:py-20 px-4 bg-gradient-to-br from-primary via-purple-600 to-indigo-700 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMC41IiBvcGFjaXR5PSIwLjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>
      <div className="container mx-auto max-w-6xl relative z-10">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-3 md:mb-4 drop-shadow-lg">
          Что меняется в вашей практике
        </h2>
        <p className="text-base md:text-lg lg:text-xl text-center mb-8 md:mb-12 text-white/90 max-w-3xl mx-auto">
          После прохождения курса ваша работа выходит на новый уровень
        </p>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="bg-white/15 backdrop-blur-md p-4 md:p-6 rounded-xl border border-white/30 hover:bg-white/25 transition-all hover:-translate-y-1 shadow-lg hover:shadow-2xl"
            >
              <div className="flex items-start gap-3 md:gap-4">
                <div className="p-2 md:p-3 bg-white/20 rounded-lg flex-shrink-0 backdrop-blur-sm">
                  <Icon name={benefit.icon as any} size={20} className="text-white md:scale-110" />
                </div>
                <p className="text-sm md:text-base text-white leading-relaxed font-medium">{benefit.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ArsenalCourseBenefits;