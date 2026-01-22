import Icon from "@/components/ui/icon";

const CorrectionAudience = () => {
  const audiences = [
    { text: "массажисты и специалисты по телу", icon: "Hand" },
    { text: "мастера эстетического и восстановительного массажа", icon: "Sparkles" },
    { text: "те, кто работает с женской аудиторией", icon: "Users" },
    { text: "специалисты, которые хотят увеличить средний чек", icon: "TrendingUp" },
    { text: "те, кто хочет поток клиентов без затрат на рекламу", icon: "Megaphone" }
  ];

  const problems = [
    "клиенты хотят «убрать живот / бёдра / талию»",
    "результат держится недолго",
    "сложно объяснить клиенту, что именно вы делаете",
    "нет стабильного потока новых клиентов"
  ];

  return (
    <section className="py-12 md:py-20 px-4 bg-gradient-to-b from-rose-50/30 via-pink-50/20 to-white">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 md:mb-8 bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
          Для кого этот курс
        </h2>
        
        <div className="space-y-3 md:space-y-4 mb-8 md:mb-12">
          {audiences.map((audience, index) => (
            <div key={index} className="flex items-start gap-3 md:gap-4 bg-white p-4 md:p-6 rounded-xl shadow-md hover:shadow-xl transition-all hover:-translate-y-0.5">
              <div className="p-2 md:p-3 bg-gradient-to-br from-rose-100 to-pink-100 rounded-full flex-shrink-0">
                <Icon name={audience.icon as any} size={20} className="text-rose-600" />
              </div>
              <p className="text-sm md:text-base lg:text-lg text-gray-800 pt-1 md:pt-2 font-medium">{audience.text}</p>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-rose-50 via-pink-50 to-fuchsia-50 border-l-4 border-rose-500 p-4 md:p-6 rounded-lg shadow-lg">
          <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4 flex items-center gap-2">
            <Icon name="Lightbulb" size={20} className="text-rose-600" />
            Курс особенно полезен, если:
          </h3>
          <ul className="space-y-2 md:space-y-3">
            {problems.map((problem, index) => (
              <li key={index} className="flex items-start gap-3">
                <Icon name="ArrowRight" size={18} className="text-rose-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm md:text-base text-gray-700 font-medium">{problem}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default CorrectionAudience;