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
    <section className="py-12 md:py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8 md:mb-12 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
          Чему вы научитесь
        </h2>
        
        <div className="grid md:grid-cols-2 gap-4 md:gap-6">
          {skills.map((skill, index) => (
            <div 
              key={index}
              className="bg-gradient-to-br from-white to-indigo-50 p-4 md:p-6 rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 border border-indigo-100"
            >
              <div className="flex items-start gap-3 md:gap-4">
                <div className="p-2 md:p-3 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-lg flex-shrink-0 shadow-md">
                  <Icon name={skill.icon as any} size={20} className="text-primary md:scale-110" />
                </div>
                <p className="text-gray-700 leading-relaxed text-sm md:text-base lg:text-lg pt-1 md:pt-2">{skill.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandCourseSkills;