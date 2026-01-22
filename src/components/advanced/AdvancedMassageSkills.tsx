import Icon from "@/components/ui/icon";

const AdvancedMassageSkills = () => {
  const skills = [
    { icon: "Bone", title: "Работать с позвоночником с учётом биодинамики и сегментарных связей" },
    { icon: "Move", title: "Выполнять мягкие мануальные техники для суставов и ОДА" },
    { icon: "Repeat", title: "Использовать постизометрическую релаксацию (ПИР)" },
    { icon: "Activity", title: "Работать с висцеральными ограничениями и органами" },
    { icon: "Wind", title: "Восстанавливать подвижность грудной клетки и диафрагмы" },
    { icon: "ShieldAlert", title: "Влиять на хроническую боль, компрессию и сколиотические паттерны" },
    { icon: "Brain", title: "Интегрировать регуляцию ВНС в восстановительный массаж" },
    { icon: "Search", title: "Проводить диагностику и выстраивать стратегию коррекции" }
  ];

  return (
    <section className="py-12 md:py-20 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8 md:mb-12 text-gray-900">
          Чему вы научитесь
        </h2>
        
        <div className="grid md:grid-cols-2 gap-4 md:gap-6">
          {skills.map((skill, index) => (
            <div 
              key={index}
              className="bg-gradient-to-br from-purple-50 to-fuchsia-50 p-4 md:p-6 rounded-2xl shadow-md hover:shadow-lg transition-all hover:-translate-y-1"
            >
              <div className="flex items-start gap-3 md:gap-4">
                <div className="p-2 md:p-3 bg-white rounded-full flex-shrink-0">
                  <Icon name={skill.icon as any} size={24} className="text-purple-600" />
                </div>
                <p className="text-sm md:text-base text-gray-800 font-medium leading-relaxed pt-1 md:pt-2">{skill.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdvancedMassageSkills;