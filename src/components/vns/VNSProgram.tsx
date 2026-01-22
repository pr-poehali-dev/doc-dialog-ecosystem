import { useState } from "react";
import Icon from "@/components/ui/icon";

const VNSProgram = () => {
  const [openModule, setOpenModule] = useState<number | null>(0);

  const modules = [
    {
      title: "Модуль 1. ВНС — дирижёр внутреннего оркестра",
      icon: "Music",
      topics: [
        "Что такое вегетативная нервная система и чем она не является",
        "Симпатическая и парасимпатическая системы",
        "Как ВНС управляет тканями, тонусом и адаптацией"
      ]
    },
    {
      title: "Модуль 2. ВНС и тело",
      icon: "User",
      topics: [
        "Влияние ВНС на мышечный тонус",
        "Где «живёт» хронический гипертонус",
        "Кровообращение, лимфоток, отёки, температура тканей",
        "Нейрогенное воспаление и боль",
        "ВНС и фасции: напряжение глубже мышц"
      ]
    },
    {
      title: "Модуль 3. Стресс и ВНС",
      icon: "AlertCircle",
      topics: [
        "Стресс как главный разрушитель баланса",
        "Хронический стресс и телесные реакции",
        "Почему тело «не отпускает» напряжение"
      ]
    },
    {
      title: "Модуль 4. Массаж как инструмент влияния на ВНС",
      icon: "Hand",
      topics: [
        "Научное обоснование влияния массажа",
        "Как руки «разговаривают» с нервной системой",
        "Почему одни техники работают, а другие — нет"
      ]
    },
    {
      title: "Модуль 5. Интеграция в практику",
      icon: "Settings",
      topics: [
        "Остеопатический взгляд на регуляцию ВНС",
        "Работа с клиентом: алгоритмы и логика",
        "Как адаптировать технику под состояние ВНС"
      ]
    },
    {
      title: "Модуль 6. Практика: ключи к саморегуляции",
      icon: "Play",
      topics: [
        "Работа с вегетативными ганглиями",
        "Практика — этап 1",
        "Практика — этап 2",
        "Техники, которые можно применять сразу после обучения"
      ]
    }
  ];

  return (
    <section className="py-12 md:py-20 px-4 bg-white">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 md:mb-12 bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
          Программа курса
        </h2>
        
        <div className="space-y-4">
          {modules.map((module, index) => (
            <div 
              key={index}
              className="bg-white border-2 border-indigo-100 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all"
            >
              <button
                onClick={() => setOpenModule(openModule === index ? null : index)}
                className="w-full p-4 md:p-6 flex items-center justify-between text-left hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 transition-all"
              >
                <div className="flex items-center gap-3 md:gap-4">
                  <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                    <Icon name={module.icon as any} size={20} className="text-white" />
                  </div>
                  <h3 className="text-base md:text-lg lg:text-xl font-bold text-gray-900">{module.title}</h3>
                </div>
                <Icon 
                  name={openModule === index ? "ChevronUp" : "ChevronDown"} 
                  size={20} 
                  className="text-indigo-600 flex-shrink-0"
                />
              </button>
              
              {openModule === index && (
                <div className="px-4 md:px-6 pb-4 md:pb-6 bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50">
                  <ul className="space-y-2 md:space-y-3">
                    {module.topics.map((topic, topicIndex) => (
                      <li key={topicIndex} className="flex items-start gap-3">
                        <Icon name="CheckCircle2" size={18} className="text-indigo-600 flex-shrink-0 mt-0.5" />
                        <span className="text-sm md:text-base text-gray-700">{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VNSProgram;