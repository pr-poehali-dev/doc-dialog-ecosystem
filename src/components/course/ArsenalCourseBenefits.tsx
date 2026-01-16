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
    <section className="py-20 px-4 bg-gradient-to-br from-primary to-purple-600 text-white">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
          Что меняется в вашей практике
        </h2>
        <p className="text-xl text-center mb-12 text-white/90 max-w-3xl mx-auto">
          После прохождения курса ваша работа выходит на новый уровень
        </p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 hover:bg-white/20 transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white/20 rounded-lg flex-shrink-0">
                  <Icon name={benefit.icon as any} size={24} className="text-white" />
                </div>
                <p className="text-white leading-relaxed font-medium">{benefit.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ArsenalCourseBenefits;
