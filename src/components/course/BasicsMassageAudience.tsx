import Icon from "@/components/ui/icon";

const BasicsMassageAudience = () => {
  const audience = [
    "начинающим массажистам",
    "тем, кто хочет сменить профессию и войти в массаж",
    "массажистам без системных знаний анатомии",
    "телесным практикам, которые хотят «разложить всё по полочкам»",
    "специалистам, планирующим дальнейшее обучение (ВНС, остеопатия, медицинский массаж)"
  ];

  return (
    <section className="py-12 md:py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 md:mb-8 text-gray-900">
          Кому подойдёт курс
        </h2>
        
        <div className="bg-white p-6 md:p-8 lg:p-12 rounded-2xl shadow-xl">
          <div className="space-y-3 md:space-y-4">
            {audience.map((item, index) => (
              <div key={index} className="flex items-start gap-3 md:gap-4 p-3 md:p-4 rounded-xl hover:bg-blue-50 transition-colors">
                <div className="p-1.5 md:p-2 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg flex-shrink-0">
                  <Icon name="User" size={20} className="text-blue-600" />
                </div>
                <p className="text-sm md:text-base lg:text-lg text-gray-700 pt-0.5 md:pt-1">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BasicsMassageAudience;