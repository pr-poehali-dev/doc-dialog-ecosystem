import Icon from "@/components/ui/icon";

const BasicsMassageSkills = () => {
  const skills = [
    { icon: "BookOpen", text: "Понимать анатомию и физиологию без перегрузки и «сухой теории»" },
    { icon: "Bone", text: "Разбираться в опорно-двигательной системе: кости, суставы, мышцы, связки" },
    { icon: "Brain", text: "Понимать роль нервной системы и ВНС в массаже" },
    { icon: "HeartPulse", text: "Видеть связь внутренних органов и ОДА" },
    { icon: "Network", text: "Работать с фасциями и миофасциальными цепями" },
    { icon: "Search", text: "Анализировать состояние клиента до начала массажа" },
    { icon: "Hand", text: "Выполнять базовые и мягкие коррекционные техники" },
    { icon: "Heart", text: "Работать с эмоциональным состоянием через тело" },
    { icon: "Shield", text: "Выстраивать безопасную, этичную и профессиональную практику" }
  ];

  return (
    <section className="py-12 md:py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 md:mb-12 text-gray-900">
          Чему вы научитесь
        </h2>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {skills.map((skill, index) => (
            <div 
              key={index}
              className="bg-white p-4 md:p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow border border-gray-100"
            >
              <div className="flex flex-col gap-3 md:gap-4">
                <div className="p-3 md:p-4 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full self-start">
                  <Icon name={skill.icon as any} size={24} className="text-blue-600" />
                </div>
                <p className="text-sm md:text-base text-gray-700 leading-relaxed">{skill.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BasicsMassageSkills;