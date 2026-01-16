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
    <section className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-900">
          Программа курса
        </h2>
        
        <div className="space-y-4">
          {modules.map((module, index) => (
            <div 
              key={index}
              className="bg-white border-2 border-rose-100 rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            >
              <button
                onClick={() => setOpenModule(openModule === index ? null : index)}
                className="w-full p-6 flex items-center justify-between text-left hover:bg-rose-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-rose-600 to-pink-600 rounded-full flex items-center justify-center">
                    <Icon name={module.icon as any} size={24} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{module.title}</h3>
                </div>
                <Icon 
                  name={openModule === index ? "ChevronUp" : "ChevronDown"} 
                  size={24} 
                  className="text-rose-600 flex-shrink-0"
                />
              </button>
              
              {openModule === index && (
                <div className="px-6 pb-6 bg-gradient-to-br from-rose-50 to-pink-50">
                  <ul className="space-y-3 mb-4">
                    {module.topics.map((topic, topicIndex) => (
                      <li key={topicIndex} className="flex items-start gap-3">
                        <Icon name="CheckCircle2" size={20} className="text-rose-600 flex-shrink-0 mt-1" />
                        <span className="text-gray-700">{topic}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="bg-white rounded-lg p-4 border-l-4 border-rose-600">
                    <div className="flex items-start gap-2">
                      <Icon name="Target" size={20} className="text-rose-600 flex-shrink-0 mt-1" />
                      <p className="text-gray-800 font-medium">
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
