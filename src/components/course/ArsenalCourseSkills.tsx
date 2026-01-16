import Icon from "@/components/ui/icon";

const ArsenalCourseSkills = () => {
  const skills = [
    {
      icon: "Search",
      title: "Проводить быструю и точную диагностику перед сеансом"
    },
    {
      icon: "Eye",
      title: "Видеть первопричины боли, а не только место симптома"
    },
    {
      icon: "Wind",
      title: "Работать с осанкой, дыханием и опорой тела"
    },
    {
      icon: "Shield",
      title: "Снимать острые и хронические боли в спине и шее"
    },
    {
      icon: "Heart",
      title: "Безопасно работать с шейным отделом и Атлантом"
    },
    {
      icon: "Brain",
      title: "Корректировать последствия стресса через тело"
    },
    {
      icon: "Droplets",
      title: "Запускать лимфу и улучшать общее состояние клиента"
    },
    {
      icon: "Zap",
      title: "Влиять на вегетативную нервную систему руками"
    },
    {
      icon: "Target",
      title: "Собирать тело в единый, устойчивый баланс"
    }
  ];

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-900">
          Чему вы научитесь
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill, index) => (
            <div 
              key={index}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow border border-gray-100"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-gradient-to-br from-primary/10 to-purple-50 rounded-lg flex-shrink-0">
                  <Icon name={skill.icon as any} size={24} className="text-primary" />
                </div>
                <p className="text-gray-700 leading-relaxed">{skill.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ArsenalCourseSkills;
