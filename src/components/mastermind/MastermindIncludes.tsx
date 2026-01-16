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
    <section className="py-20 px-4 bg-gradient-to-b from-emerald-50 to-teal-50">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-900">
          После прохождения вы получите
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {includes.map((item, index) => (
            <div 
              key={index}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 border border-emerald-100"
            >
              <div className="flex flex-col items-center text-center gap-4">
                <div className="p-4 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full">
                  <Icon name={item.icon as any} size={40} className="text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="bg-white p-8 rounded-2xl shadow-xl border-2 border-emerald-200">
          <h3 className="text-2xl font-bold text-center mb-6 text-gray-900">
            Почему стоит прийти
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start gap-3">
              <Icon name="Hand" size={24} className="text-emerald-600 flex-shrink-0 mt-1" />
              <div>
                <p className="font-semibold text-gray-900 mb-1">офлайн формат</p>
                <p className="text-gray-600">руки, контакт, обратная связь</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Icon name="BookOpen" size={24} className="text-emerald-600 flex-shrink-0 mt-1" />
              <div>
                <p className="font-semibold text-gray-900 mb-1">опыт, который не найти в видео</p>
                <p className="text-gray-600">живая передача практики</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Icon name="Users" size={24} className="text-emerald-600 flex-shrink-0 mt-1" />
              <div>
                <p className="font-semibold text-gray-900 mb-1">рост уверенности</p>
                <p className="text-gray-600">профессиональной ценности</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Icon name="Target" size={24} className="text-emerald-600 flex-shrink-0 mt-1" />
              <div>
                <p className="font-semibold text-gray-900 mb-1">стабильная практика</p>
                <p className="text-gray-600">востребованность на рынке</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MastermindIncludes;
