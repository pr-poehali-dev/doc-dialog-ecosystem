import Icon from "@/components/ui/icon";

const MastermindAudience = () => {
  const audience = [
    { icon: "Hand", text: "массажисты" },
    { icon: "Heart", text: "телесные терапевты" },
    { icon: "Activity", text: "остеопаты" },
    { icon: "Users", text: "мануальные терапевты" },
    { icon: "Zap", text: "специалисты по восстановлению" },
    { icon: "Sparkles", text: "косметологи и эстетисты" }
  ];

  return (
    <section className="py-12 md:py-20 px-4">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8 md:mb-12 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
          Для кого этот мастермайнд
        </h2>
        
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
          {audience.map((item, index) => (
            <div 
              key={index}
              className="bg-gradient-to-br from-white to-emerald-50 p-4 md:p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 border border-emerald-100"
            >
              <div className="flex flex-col items-center text-center gap-3 md:gap-4">
                <div className="p-3 md:p-4 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full shadow-md">
                  <Icon name={item.icon as any} size={28} className="text-emerald-600 md:scale-110" />
                </div>
                <p className="text-base md:text-lg font-semibold text-gray-800">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-cyan-50 p-4 md:p-6 lg:p-8 rounded-2xl border border-emerald-200 shadow-lg">
          <h3 className="text-xl md:text-2xl font-bold text-center mb-4 md:mb-6 text-gray-900">Подойдёт как:</h3>
          <div className="flex flex-col md:flex-row gap-4 md:gap-6 justify-center items-center">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-white rounded-full">
                <Icon name="Sprout" size={20} className="text-emerald-600 md:scale-110" />
              </div>
              <p className="text-base md:text-lg text-gray-700">
                <span className="font-bold">начинающим</span><br />
                <span className="text-xs md:text-sm">(выстроить правильную базу)</span>
              </p>
            </div>
            
            <div className="text-2xl md:text-3xl text-emerald-600 font-bold">→</div>
            
            <div className="flex items-center gap-3">
              <div className="p-3 bg-white rounded-full">
                <Icon name="Award" size={20} className="text-emerald-600 md:scale-110" />
              </div>
              <p className="text-base md:text-lg text-gray-700">
                <span className="font-bold">опытным специалистам</span><br />
                <span className="text-xs md:text-sm">(которые «упёрлись в потолок»)</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MastermindAudience;