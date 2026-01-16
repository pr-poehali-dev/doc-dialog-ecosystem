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
    <section className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-900">
          Для кого этот курс
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h3 className="text-2xl font-bold mb-6 text-gray-900 flex items-center gap-3">
              <Icon name="Users" size={28} className="text-primary" />
              Для специалистов
            </h3>
            <ul className="space-y-4">
              {audience.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Icon name="CheckCircle2" size={20} className="text-primary mt-1 flex-shrink-0" />
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-gradient-to-br from-primary/5 to-purple-50 p-8 rounded-2xl border-2 border-primary/20">
            <h3 className="text-2xl font-bold mb-6 text-gray-900 flex items-center gap-3">
              <Icon name="AlertCircle" size={28} className="text-primary" />
              Курс особенно ценен, если:
            </h3>
            <ul className="space-y-4">
              {problems.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Icon name="ArrowRight" size={20} className="text-primary mt-1 flex-shrink-0" />
                  <span className="text-gray-700">{item}</span>
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
