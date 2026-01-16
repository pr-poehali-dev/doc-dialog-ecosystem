import Icon from "@/components/ui/icon";

const MastermindAudience = () => {
  const audience = [
    { icon: "Hand", text: "массажисты" },
    { icon: "Heart", text: "телесные терапевты" },
    { icon: "Activity", text: "остеопаты" },
    { icon: "Users", text: "мануальные терапевты" },
    { icon: "Zap", text: "специалисты по восстановлению" }
  ];

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-900">
          Для кого этот мастермайнд
        </h2>
        
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {audience.map((item, index) => (
            <div 
              key={index}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all hover:-translate-y-1 border border-emerald-100"
            >
              <div className="flex flex-col items-center text-center gap-4">
                <div className="p-4 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full">
                  <Icon name={item.icon as any} size={32} className="text-emerald-600" />
                </div>
                <p className="text-lg font-semibold text-gray-800">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-8 rounded-2xl border-2 border-emerald-200">
          <h3 className="text-2xl font-bold text-center mb-6 text-gray-900">Подойдёт как:</h3>
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-white rounded-full">
                <Icon name="Sprout" size={24} className="text-emerald-600" />
              </div>
              <p className="text-lg text-gray-700">
                <span className="font-bold">начинающим</span><br />
                <span className="text-sm">(выстроить правильную базу)</span>
              </p>
            </div>
            
            <div className="text-3xl text-emerald-600">→</div>
            
            <div className="flex items-center gap-3">
              <div className="p-3 bg-white rounded-full">
                <Icon name="Award" size={24} className="text-emerald-600" />
              </div>
              <p className="text-lg text-gray-700">
                <span className="font-bold">опытным специалистам</span><br />
                <span className="text-sm">(которые «упёрлись в потолок»)</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MastermindAudience;
