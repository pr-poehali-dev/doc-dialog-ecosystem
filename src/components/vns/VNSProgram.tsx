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
    <section className="py-20 px-4 bg-white">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-900">
          Программа курса
        </h2>
        
        <div className="space-y-4">
          {modules.map((module, index) => (
            <div 
              key={index}
              className="bg-white border-2 border-indigo-100 rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            >
              <button
                onClick={() => setOpenModule(openModule === index ? null : index)}
                className="w-full p-6 flex items-center justify-between text-left hover:bg-indigo-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center">
                    <Icon name={module.icon as any} size={24} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{module.title}</h3>
                </div>
                <Icon 
                  name={openModule === index ? "ChevronUp" : "ChevronDown"} 
                  size={24} 
                  className="text-indigo-600 flex-shrink-0"
                />
              </button>
              
              {openModule === index && (
                <div className="px-6 pb-6 bg-gradient-to-br from-indigo-50 to-purple-50">
                  <ul className="space-y-3">
                    {module.topics.map((topic, topicIndex) => (
                      <li key={topicIndex} className="flex items-start gap-3">
                        <Icon name="CheckCircle2" size={20} className="text-indigo-600 flex-shrink-0 mt-1" />
                        <span className="text-gray-700">{topic}</span>
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
