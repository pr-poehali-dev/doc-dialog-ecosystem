import Icon from "@/components/ui/icon";

const MastermindIncludes = () => {
  const includes = [
    {
      icon: "Award",
      title: "Сертификат участника",
      description: "Официальный сертификат участника мастермайнд-интенсива"
    },
    {
      icon: "MessageSquare",
      title: "Закрытый чат",
      description: "Доступ в закрытый чат с ведущим и участниками"
    },
    {
      icon: "Percent",
      title: "Скидка на курсы",
      description: "Скидку на все онлайн-курсы школы Док Диалог"
    }
  ];

  return (
    <section className="py-12 md:py-20 px-4 bg-gradient-to-b from-emerald-50 to-teal-50">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8 md:mb-12 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
          После прохождения вы получите
        </h2>
        
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8 mb-8 md:mb-12">
          {includes.map((item, index) => (
            <div 
              key={index}
              className="bg-gradient-to-br from-white to-emerald-50 p-4 md:p-6 lg:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 border border-emerald-100"
            >
              <div className="flex flex-col items-center text-center gap-3 md:gap-4">
                <div className="p-3 md:p-4 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full shadow-md">
                  <Icon name={item.icon as any} size={32} className="text-emerald-600 md:scale-110" />
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-1 md:mb-2">{item.title}</h3>
                  <p className="text-sm md:text-base text-gray-600">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="bg-gradient-to-br from-white to-emerald-50 p-4 md:p-6 lg:p-8 rounded-2xl shadow-xl border border-emerald-200">
          <h3 className="text-xl md:text-2xl font-bold text-center mb-4 md:mb-6 text-gray-900">
            Почему стоит прийти
          </h3>
          <div className="grid md:grid-cols-2 gap-4 md:gap-6">
            <div className="flex items-start gap-2 md:gap-3">
              <Icon name="Hand" size={20} className="text-emerald-600 flex-shrink-0 mt-0.5 md:mt-1" />
              <div>
                <p className="text-sm md:text-base font-semibold text-gray-900 mb-0.5 md:mb-1">офлайн формат</p>
                <p className="text-xs md:text-sm text-gray-600">руки, контакт, обратная связь</p>
              </div>
            </div>
            <div className="flex items-start gap-2 md:gap-3">
              <Icon name="BookOpen" size={20} className="text-emerald-600 flex-shrink-0 mt-0.5 md:mt-1" />
              <div>
                <p className="text-sm md:text-base font-semibold text-gray-900 mb-0.5 md:mb-1">опыт, который не найти в видео</p>
                <p className="text-xs md:text-sm text-gray-600">живая передача практики</p>
              </div>
            </div>
            <div className="flex items-start gap-2 md:gap-3">
              <Icon name="Users" size={20} className="text-emerald-600 flex-shrink-0 mt-0.5 md:mt-1" />
              <div>
                <p className="text-sm md:text-base font-semibold text-gray-900 mb-0.5 md:mb-1">рост уверенности</p>
                <p className="text-xs md:text-sm text-gray-600">профессиональной ценности</p>
              </div>
            </div>
            <div className="flex items-start gap-2 md:gap-3">
              <Icon name="Target" size={20} className="text-emerald-600 flex-shrink-0 mt-0.5 md:mt-1" />
              <div>
                <p className="text-sm md:text-base font-semibold text-gray-900 mb-0.5 md:mb-1">стабильная практика</p>
                <p className="text-xs md:text-sm text-gray-600">востребованность на рынке</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MastermindIncludes;