import Icon from "@/components/ui/icon";

const MastermindBenefits = () => {
  const benefits = [
    {
      icon: "Search",
      title: "Быстрая и точная диагностика",
      description: "понимаете, как быстро и точно проводить диагностику"
    },
    {
      icon: "Target",
      title: "Выбор техник под жалобу",
      description: "знаете, какие техники выбирать под конкретную жалобу"
    },
    {
      icon: "Activity",
      title: "Работа с болью в спине",
      description: "уверенно работаете с болью в спине"
    },
    {
      icon: "Brain",
      title: "ШВЗ и головные боли",
      description: "работаете с шейно-воротниковой зоной и головными болями"
    },
    {
      icon: "Droplets",
      title: "Лимфатическая система",
      description: "справляетесь с отёками и лимфатической системой"
    },
    {
      icon: "Heart",
      title: "Нервная система",
      description: "работаете с состоянием нервной системы"
    },
    {
      icon: "Eye",
      title: "Работа не вслепую",
      description: "перестаёте работать «вслепую»"
    },
    {
      icon: "TrendingUp",
      title: "Рост ценности сеансов",
      description: "повышаете ценность своих сеансов"
    }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-emerald-50 via-teal-50 to-cyan-50">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-900">
          Что вы получите
        </h2>
        <p className="text-xl text-center text-gray-600 mb-12">
          После мастермайнда вы:
        </p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all hover:-translate-y-1 border border-emerald-100"
            >
              <div className="flex flex-col items-center text-center gap-4">
                <div className="p-4 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full">
                  <Icon name={benefit.icon as any} size={28} className="text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-sm text-gray-600">{benefit.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MastermindBenefits;
