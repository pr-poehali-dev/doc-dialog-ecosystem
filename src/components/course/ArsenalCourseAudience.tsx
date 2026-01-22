import Icon from "@/components/ui/icon";

const ArsenalCourseAudience = () => {
  const audience = [
    "массажисты с базовым образованием",
    "специалисты восстановительного массажа",
    "телесные практики, работающие с болью и напряжением",
    "те, кто хочет перейти от «массажа ощущений» к массажу результата"
  ];

  const problems = [
    "клиенты возвращаются с теми же жалобами",
    "боль уходит ненадолго",
    "сложно понять истинную причину напряжения"
  ];

  return (
    <section className="py-12 md:py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8 md:mb-12 bg-gradient-to-r from-primary via-purple-600 to-indigo-600 bg-clip-text text-transparent">
          Для кого этот курс
        </h2>
        
        <div className="grid md:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
          <div className="bg-gradient-to-br from-white via-primary/5 to-purple-50 p-6 md:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-primary/10">
            <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-gray-900 flex items-center gap-2 md:gap-3">
              <Icon name="Users" size={24} className="text-primary md:scale-110" />
              Для специалистов
            </h3>
            <ul className="space-y-3 md:space-y-4">
              {audience.map((item, index) => (
                <li key={index} className="flex items-start gap-2 md:gap-3">
                  <Icon name="CheckCircle2" size={18} className="text-primary mt-0.5 md:mt-1 flex-shrink-0" />
                  <span className="text-sm md:text-base text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-gradient-to-br from-primary/10 via-purple-50 to-indigo-50 p-6 md:p-8 rounded-2xl border-2 border-primary/20 shadow-lg hover:shadow-xl transition-shadow">
            <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-gray-900 flex items-center gap-2 md:gap-3">
              <Icon name="AlertCircle" size={24} className="text-primary md:scale-110" />
              Курс особенно ценен, если:
            </h3>
            <ul className="space-y-3 md:space-y-4">
              {problems.map((item, index) => (
                <li key={index} className="flex items-start gap-2 md:gap-3">
                  <Icon name="ArrowRight" size={18} className="text-primary mt-0.5 md:mt-1 flex-shrink-0" />
                  <span className="text-sm md:text-base text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArsenalCourseAudience;