import { useState } from "react";
import Icon from "@/components/ui/icon";

const CorrectionProgram = () => {
  const [openModule, setOpenModule] = useState<number | null>(0);

  const modules = [
    {
      title: "Раздел 1. Диагностика",
      icon: "Search",
      topics: [
        "Оценка осанки и положения таза",
        "Анализ распределения жировой ткани",
        "Отёки: лимфатические, венозные, гормональные",
        "Связь живота, диафрагмы и дыхания",
        "Почему «живот не уходит», даже если человек худеет",
        "Ошибки в коррекции фигуры"
      ],
      result: "Вы понимаете первопричину, а не работаете вслепую"
    },
    {
      title: "Раздел 2. Техники коррекции фигуры",
      icon: "Hand",
      topics: [
        "Ручные техники моделирования силуэта",
        "Работа с животом и боками",
        "Коррекция зоны бёдер и ягодиц",
        "Улучшение дренажа и микроциркуляции",
        "Влияние работы с фасциями на форму тела",
        "Как закрепить результат"
      ],
      result: "Визуальные изменения + улучшение самочувствия клиента"
    },
    {
      title: "Раздел 3. Бонус — Привлечение клиентов через купонаторы",
      icon: "Megaphone",
      topics: [
        "Введение в купонаторы: почему работают для массажа",
        "Выбор платформы: Biglion и Groupon",
        "Создание привлекательного предложения",
        "Техническая настройка размещения",
        "Продвижение за пределами платформы",
        "Конвертация в постоянных клиентов",
        "Анализ эффективности",
        "Кейсы и разбор ошибок",
        "Продвинутые стратегии масштабирования",
        "Кейс: Как увеличить прибыль в 3 раза",
        "Этика и долгосрочная репутация"
      ],
      result: "Поток клиентов без затрат на рекламу"
    }
  ];

  return (
    <section className="py-12 md:py-20 px-4 bg-gradient-to-b from-rose-50/30 via-pink-50/20 to-white">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 md:mb-12 bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
          Программа курса
        </h2>
        
        <div className="space-y-4">
          {modules.map((module, index) => (
            <div 
              key={index}
              className="bg-white border-2 border-rose-100 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all"
            >
              <button
                onClick={() => setOpenModule(openModule === index ? null : index)}
                className="w-full p-4 md:p-6 flex items-center justify-between text-left hover:bg-gradient-to-r hover:from-rose-50 hover:to-pink-50 transition-all"
              >
                <div className="flex items-center gap-3 md:gap-4">
                  <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-rose-600 to-pink-600 rounded-full flex items-center justify-center shadow-lg">
                    <Icon name={module.icon as any} size={20} className="text-white" />
                  </div>
                  <h3 className="text-base md:text-lg lg:text-xl font-bold text-gray-900">{module.title}</h3>
                </div>
                <Icon 
                  name={openModule === index ? "ChevronUp" : "ChevronDown"} 
                  size={20} 
                  className="text-rose-600 flex-shrink-0"
                />
              </button>
              
              {openModule === index && (
                <div className="px-4 md:px-6 pb-4 md:pb-6 bg-gradient-to-br from-rose-50 via-pink-50 to-fuchsia-50">
                  <ul className="space-y-2 md:space-y-3 mb-3 md:mb-4">
                    {module.topics.map((topic, topicIndex) => (
                      <li key={topicIndex} className="flex items-start gap-3">
                        <Icon name="CheckCircle2" size={18} className="text-rose-600 flex-shrink-0 mt-0.5" />
                        <span className="text-sm md:text-base text-gray-700">{topic}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="bg-white rounded-lg p-3 md:p-4 border-l-4 border-rose-600 shadow-md">
                    <div className="flex items-start gap-2">
                      <Icon name="Target" size={18} className="text-rose-600 flex-shrink-0 mt-0.5" />
                      <p className="text-sm md:text-base text-gray-800 font-medium">
                        <strong>Результат:</strong> {module.result}
                      </p>
                    </div>
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

export default CorrectionProgram;