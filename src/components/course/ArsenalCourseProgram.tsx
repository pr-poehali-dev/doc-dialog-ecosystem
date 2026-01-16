import { useState } from "react";
import Icon from "@/components/ui/icon";

const ArsenalCourseProgram = () => {
  const [openModule, setOpenModule] = useState<number | null>(0);

  const modules = [
    {
      number: 1,
      title: "Фундамент. Диагностика и базовое выстраивание тела",
      topics: [
        "Быстрая диагностика осанки и мышечного баланса",
        "Первый приём: осмотр и анализ пациента",
        "Протокол «Заземление» — восстановление опоры и стабильности",
        "Работа с диафрагмой и дыханием",
        "Висцеральный лифтинг и влияние внутренних органов на осанку",
        "Раскрытие дыхательного объёма лёгких"
      ],
      result: "вы понимаете, с чего начинать работу с любым клиентом"
    },
    {
      number: 2,
      title: "Боль и дискомфорт в спине",
      topics: [
        "Коррекция грудной клетки при сутулости",
        "Пальпация позвоночника и поиск источников боли",
        "Протоколы при боли в пояснице",
        "Работа с крестцом и тазом",
        "Мягкая коррекция позвонков",
        "Лопатки, рёбра, сколиоз"
      ],
      result: "уверенная работа с самыми частыми жалобами клиентов"
    },
    {
      number: 3,
      title: "Шея, голова и последствия стресса",
      topics: [
        "Головные боли напряжения",
        "Работа с ВНЧС и челюстными зажимами",
        "Снятие ментального и эмоционального напряжения",
        "Затылочная зона и краниальный ритм",
        "Безопасная коррекция шеи",
        "Работа с Атлантом"
      ],
      result: "клиенты с «непонятными» жалобами получают облегчение"
    },
    {
      number: 4,
      title: "Конечности и лимфатическая система",
      topics: [
        "Работа с ногами и чувством тяжести",
        "Плечевой пояс и ключицы",
        "Лимфодренажный запуск за 5 минут"
      ],
      result: "улучшение общего самочувствия и восстановления"
    },
    {
      number: 5,
      title: "Глубинные техники и нервная система",
      topics: [
        "Регуляция эмоционально-психологического состояния",
        "Парасимпатический запуск",
        "Висцеральные техники для кишечника",
        "Комплексный протокол «Запуск ОДА»"
      ],
      result: "тело начинает само восстанавливаться"
    },
    {
      number: 6,
      title: "Работа с Вегетативной Нервной Системой (ВНС)",
      topics: [
        "Что такое ВНС и как она управляет телом",
        "Симпатика и парасимпатика",
        "ВНС и мышечный тонус",
        "ВНС и боль, воспаление, фасции",
        "Стресс как ключевой фактор дисбаланса",
        "Научное обоснование воздействия",
        "Работа с вегетативными ганглиями",
        "Практические этапы регуляции"
      ],
      result: "вы начинаете работать не только с телом, но и с регуляцией"
    }
  ];

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-900">
          Программа курса
        </h2>
        
        <div className="space-y-4">
          {modules.map((module, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200"
            >
              <button
                onClick={() => setOpenModule(openModule === index ? null : index)}
                className="w-full p-6 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-purple-600 text-white flex items-center justify-center font-bold text-lg flex-shrink-0">
                    {module.number}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {module.title}
                  </h3>
                </div>
                <Icon 
                  name={openModule === index ? "ChevronUp" : "ChevronDown"} 
                  size={24} 
                  className="text-gray-400 flex-shrink-0"
                />
              </button>
              
              {openModule === index && (
                <div className="px-6 pb-6 pt-2 border-t border-gray-100">
                  <ul className="space-y-3 mb-4">
                    {module.topics.map((topic, topicIndex) => (
                      <li key={topicIndex} className="flex items-start gap-3">
                        <Icon name="CheckCircle2" size={18} className="text-primary mt-1 flex-shrink-0" />
                        <span className="text-gray-700">{topic}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 p-4 bg-gradient-to-r from-primary/10 to-purple-50 rounded-lg">
                    <p className="text-sm font-medium text-gray-700">
                      <span className="text-primary font-bold">Результат:</span> {module.result}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ArsenalCourseProgram;
