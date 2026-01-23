import { useState } from "react";
import Icon from "@/components/ui/icon";

const MastermindProgram = () => {
  const [activeModule, setActiveModule] = useState<number | null>(null);

  const modules = [
    {
      number: "1",
      title: "ДИАГНОСТИКА: БЫСТРО И ТОЧНО",
      subtitle: "Фундамент любой работы",
      topics: [
        "базовое выстраивание тела",
        "понимание первопричин",
        "с чего начинать любой сеанс"
      ],
      color: "from-emerald-500 to-teal-600"
    },
    {
      number: "2",
      title: "РЕШЕНИЕ: БОЛЬ В СПИНЕ",
      subtitle: "Самые частые жалобы клиентов",
      topics: [
        "самые частые жалобы клиентов",
        "готовые алгоритмы работы",
        "логика выбора техник"
      ],
      color: "from-teal-500 to-cyan-600"
    },
    {
      number: "3",
      title: "РЕШЕНИЕ: БОЛЬ В ГОЛОВЕ И ШВЗ",
      subtitle: "Работа с напряжением и стрессом",
      topics: [
        "работа с напряжением и стрессом",
        "ВНЧС",
        "влияние психоэмоционального состояния"
      ],
      color: "from-cyan-500 to-blue-600"
    },
    {
      number: "4",
      title: "РЕГУЛЯЦИЯ: ЛИМФАТИЧЕСКАЯ СИСТЕМА",
      subtitle: "Улучшение циркуляции",
      topics: [
        "отёки",
        "конечности",
        "улучшение циркуляции"
      ],
      color: "from-blue-500 to-indigo-600"
    },
    {
      number: "5",
      title: "НЕРВНАЯ СИСТЕМА И ГЛУБИННЫЕ ТЕХНИКИ",
      subtitle: "Работа со сложными случаями",
      topics: [
        "висцеральный подход",
        "психосоматика",
        "работа со «сложными» клиентами"
      ],
      color: "from-indigo-500 to-purple-600"
    },
    {
      number: "6",
      title: "ВНС — ГЛАВНЫЙ ПУЛЬТ УПРАВЛЕНИЯ",
      subtitle: "Вегетативная нервная система",
      topics: [
        "как работает вегетативная нервная система",
        "почему без ВНС вы работаете по симптомам",
        "как мягко и эффективно влиять на состояние клиента"
      ],
      color: "from-purple-500 to-pink-600"
    }
  ];

  return (
    <section className="py-12 md:py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8 md:mb-12 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
          Программа мастермайнда
        </h2>
        
        <div className="space-y-3 md:space-y-4">
          {modules.map((module, index) => (
            <div 
              key={index}
              className="bg-gradient-to-br from-white to-emerald-50 rounded-2xl shadow-lg overflow-hidden border border-emerald-100 hover:shadow-xl transition-shadow"
            >
              <button
                onClick={() => setActiveModule(activeModule === index ? null : index)}
                className="w-full p-4 md:p-6 flex items-center justify-between hover:bg-emerald-50 transition-colors"
              >
                <div className="flex items-center gap-3 md:gap-4 flex-1 text-left">
                  <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br ${module.color} flex items-center justify-center text-white font-bold text-base md:text-lg flex-shrink-0 shadow-md`}>
                    {module.number}
                  </div>
                  <div>
                    <h3 className="text-sm md:text-base lg:text-xl font-bold text-gray-900">{module.title}</h3>
                    <p className="text-xs md:text-sm text-gray-600 mt-0.5 md:mt-1">{module.subtitle}</p>
                  </div>
                </div>
                <Icon 
                  name={activeModule === index ? "ChevronUp" : "ChevronDown"} 
                  size={24} 
                  className="text-gray-400 flex-shrink-0"
                />
              </button>
              
              {activeModule === index && (
                <div className="px-4 md:px-6 pb-4 md:pb-6 pt-2 bg-gradient-to-br from-emerald-50/50 to-teal-50/50">
                  <ul className="space-y-2 md:space-y-3">
                    {module.topics.map((topic, topicIndex) => (
                      <li key={topicIndex} className="flex items-start gap-2 md:gap-3">
                        <Icon name="CheckCircle2" size={18} className="text-emerald-600 mt-0.5 flex-shrink-0" />
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

export default MastermindProgram;