import Icon from "@/components/ui/icon";

const BrandCourseSkills = () => {
  const skills = [
    {
      icon: "Route",
      title: "Строить путь клиента от первого касания до записи"
    },
    {
      icon: "Workflow",
      title: "Формировать маркетинговую воронку под массажные услуги"
    },
    {
      icon: "BarChart3",
      title: "Понимать KPI, юнит-экономику и окупаемость рекламы"
    },
    {
      icon: "Sparkles",
      title: "Создавать сильное позиционирование и бренд"
    },
    {
      icon: "MessageSquare",
      title: "Работать с контентом, соцсетями и Телеграмом"
    },
    {
      icon: "Target",
      title: "Запускать таргетированную рекламу и SEO"
    },
    {
      icon: "PieChart",
      title: "Анализировать данные и принимать решения на цифрах"
    },
    {
      icon: "TrendingUp",
      title: "Масштабировать личную практику без выгорания"
    }
  ];

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-900">
          Чему вы научитесь
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
          {skills.map((skill, index) => (
            <div 
              key={index}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow border border-gray-100"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-lg flex-shrink-0">
                  <Icon name={skill.icon as any} size={24} className="text-primary" />
                </div>
                <p className="text-gray-700 leading-relaxed text-lg pt-2">{skill.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandCourseSkills;
