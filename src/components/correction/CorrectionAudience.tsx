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
    <section className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-6 text-gray-900">
          Для кого этот курс
        </h2>
        
        <div className="space-y-4 mb-12">
          {audiences.map((audience, index) => (
            <div key={index} className="flex items-start gap-4 bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="p-3 bg-gradient-to-br from-rose-100 to-pink-100 rounded-full flex-shrink-0">
                <Icon name={audience.icon as any} size={24} className="text-rose-600" />
              </div>
              <p className="text-lg text-gray-800 pt-2">{audience.text}</p>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-rose-50 to-pink-50 border-l-4 border-rose-500 p-6 rounded-lg">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Icon name="Lightbulb" size={24} className="text-rose-600" />
            Курс особенно полезен, если:
          </h3>
          <ul className="space-y-3">
            {problems.map((problem, index) => (
              <li key={index} className="flex items-start gap-3">
                <Icon name="ArrowRight" size={20} className="text-rose-600 flex-shrink-0 mt-1" />
                <span className="text-gray-700">{problem}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default CorrectionAudience;
