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
    <section className="py-12 md:py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8 md:mb-12 bg-gradient-to-r from-primary via-purple-600 to-indigo-600 bg-clip-text text-transparent">
          Чему вы научитесь
        </h2>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {skills.map((skill, index) => (
            <div 
              key={index}
              className="bg-gradient-to-br from-white via-primary/5 to-purple-50 p-4 md:p-6 rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 border border-primary/10"
            >
              <div className="flex items-start gap-3 md:gap-4">
                <div className="p-2 md:p-3 bg-gradient-to-br from-primary/20 to-purple-100 rounded-lg flex-shrink-0 shadow-md">
                  <Icon name={skill.icon as any} size={20} className="text-primary md:scale-110" />
                </div>
                <p className="text-sm md:text-base text-gray-700 leading-relaxed">{skill.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ArsenalCourseSkills;