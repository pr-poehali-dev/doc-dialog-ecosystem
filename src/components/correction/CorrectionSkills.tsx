import Icon from "@/components/ui/icon";

const CorrectionSkills = () => {
  const skills = [
    { 
      icon: "Eye", 
      title: "Чёткое понимание, почему тело выглядит именно так",
      description: "Видите причины, а не симптомы"
    },
    { 
      icon: "Search", 
      title: "Навык диагностики причин отёков, асимметрий, дряблости",
      description: "Понимание выпирающего живота и «галифе»"
    },
    { 
      icon: "Hand", 
      title: "Рабочие техники коррекции фигуры",
      description: "Практические методы с видимым результатом"
    },
    { 
      icon: "Package", 
      title: "Готовый формат услуги, который легко продавать",
      description: "Упаковка и позиционирование"
    },
    { 
      icon: "Users", 
      title: "Инструмент привлечения клиентов без вложений в рекламу",
      description: "Работа через купонаторы"
    },
    { 
      icon: "Target", 
      title: "Понимание анатомии и биомеханики тела",
      description: "Работа с учетом физиологии клиента"
    }
  ];

  return (
    <section className="py-12 md:py-20 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 md:mb-12 bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
          Что вы получите
        </h2>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {skills.map((skill, index) => (
            <div 
              key={index}
              className="bg-gradient-to-br from-rose-50 via-pink-50 to-fuchsia-50 p-5 md:p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 border border-rose-100/50"
            >
              <div className="mb-3 md:mb-4">
                <div className="inline-block p-2.5 md:p-3 bg-white rounded-full shadow-md">
                  <Icon name={skill.icon as any} size={24} className="text-rose-600 md:scale-125" />
                </div>
              </div>
              <h3 className="text-base md:text-lg font-bold text-gray-900 mb-1.5 md:mb-2 leading-snug">{skill.title}</h3>
              <p className="text-gray-600 text-xs md:text-sm leading-relaxed">{skill.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CorrectionSkills;