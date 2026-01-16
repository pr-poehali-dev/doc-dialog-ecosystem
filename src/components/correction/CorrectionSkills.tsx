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
    <section className="py-20 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-900">
          Что вы получите
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill, index) => (
            <div 
              key={index}
              className="bg-gradient-to-br from-rose-50 to-pink-50 p-6 rounded-2xl shadow-md hover:shadow-lg transition-all hover:-translate-y-1"
            >
              <div className="mb-4">
                <div className="inline-block p-3 bg-white rounded-full">
                  <Icon name={skill.icon as any} size={32} className="text-rose-600" />
                </div>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{skill.title}</h3>
              <p className="text-gray-600 text-sm">{skill.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CorrectionSkills;