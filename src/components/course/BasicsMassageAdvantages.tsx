import Icon from "@/components/ui/icon";

const BasicsMassageAdvantages = () => {
  const advantages = [
    { icon: "Sparkles", title: "Подходит с нуля", description: "Не требуется медицинское образование" },
    { icon: "Network", title: "Системный, а не «набор техник»", description: "Целостное понимание работы тела" },
    { icon: "Link", title: "Связь анатомии, нервной системы и психосоматики", description: "Глубокий подход к работе с клиентом" },
    { icon: "Video", title: "Большой практический блок", description: "Пошаговые видеоинструкции" },
    { icon: "TrendingUp", title: "Подготовка к следующему уровню обучения", description: "База для остеопатии и медицинского массажа" },
    { icon: "Users", title: "Часть экосистемы Док диалог", description: "Сообщество и поддержка профессионалов" }
  ];

  return (
    <section className="py-12 md:py-20 px-4 bg-gradient-to-b from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 md:mb-12 text-gray-900">
          Преимущества курса
        </h2>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {advantages.map((advantage, index) => (
            <div 
              key={index}
              className="bg-white p-4 md:p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <div className="flex flex-col gap-3 md:gap-4">
                <div className="p-2 md:p-3 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg w-fit">
                  <Icon name={advantage.icon as any} size={24} className="text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-base md:text-lg text-gray-900 mb-1 md:mb-2">{advantage.title}</h3>
                  <p className="text-gray-600 text-xs md:text-sm">{advantage.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BasicsMassageAdvantages;