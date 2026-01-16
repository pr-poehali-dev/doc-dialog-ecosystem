import { useState } from "react";
import Icon from "@/components/ui/icon";

const AdvancedMassageProgram = () => {
  const [openModule, setOpenModule] = useState<number | null>(0);

  const modules = [
    {
      title: "Блок 1. Мануальная терапия опорно-двигательного аппарата",
      topics: [
        "Общие принципы мануальной терапии",
        "Биодинамика позвоночника",
        "Грудной, поясничный, крестцовый отделы и копчик",
        "Мануальная терапия суставов верхних и нижних конечностей",
        "Височно-нижнечелюстной сустав и мышцы лица",
        "Постизометрическая релаксация (ПИР)",
        "Показания, ограничения и безопасность"
      ]
    },
    {
      title: "Блок 2. Мануальная терапия внутренних органов",
      topics: [
        "Физиология органов живота и таза",
        "Висцеральная подвижность и её нарушения",
        "Диагностика и принципы коррекции",
        "Работа с желудком, кишечником, печенью, почками",
        "Органы малого таза и грудной клетки",
        "Висцеро-соматические связи"
      ]
    },
    {
      title: "Блок 3. Интеграция и клиническое мышление",
      topics: [
        "Связь органов, позвоночника и фасций",
        "Выбор техники под состояние клиента",
        "Построение восстановительного сеанса",
        "Работа с хроническими состояниями"
      ]
    },
    {
      title: "Блок 4. Практика и мастермайнды",
      topics: [
        "Важность практики после онлайн-обучения",
        "Разбор клинических случаев",
        "Подготовка к офлайн-мастермайндам"
      ]
    },
    {
      title: "Блок 5. Заболевания и клинические состояния",
      topics: [
        "Заболевания позвоночника",
        "Патологии мышц и суставов",
        "Общие клинические термины и проявления"
      ]
    },
    {
      title: "Большой практический видеоблок (бонус)",
      topics: [
        "Диагностика и первый приём",
        "Работа с диафрагмой, грудной клеткой и дыханием",
        "Мягкие техники коррекции позвоночника",
        "Работа с ВНЧС, шеей, атлантом",
        "Лимфодренаж и регуляция ВНС",
        "Висцеральные техники",
        "Комплексная восстановительная сессия"
      ]
    },
    {
      title: "Отдельный модуль: Регуляция ВНС",
      topics: [
        "Роль симпатической и парасимпатической систем",
        "Нейрогенное воспаление и гипертонус",
        "Стресс и хронические паттерны напряжения",
        "Практические этапы регуляции ВНС"
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
              className="bg-white border-2 border-purple-100 rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            >
              <button
                onClick={() => setOpenModule(openModule === index ? null : index)}
                className="w-full p-6 flex items-center justify-between text-left hover:bg-purple-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-600 to-fuchsia-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{module.title}</h3>
                </div>
                <Icon 
                  name={openModule === index ? "ChevronUp" : "ChevronDown"} 
                  size={24} 
                  className="text-purple-600 flex-shrink-0"
                />
              </button>
              
              {openModule === index && (
                <div className="px-6 pb-6 bg-gradient-to-br from-purple-50 to-fuchsia-50">
                  <ul className="space-y-3">
                    {module.topics.map((topic, topicIndex) => (
                      <li key={topicIndex} className="flex items-start gap-3">
                        <Icon name="CheckCircle2" size={20} className="text-purple-600 flex-shrink-0 mt-1" />
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

export default AdvancedMassageProgram;
