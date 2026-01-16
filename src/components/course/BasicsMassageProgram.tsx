import { useState } from "react";
import Icon from "@/components/ui/icon";

const BasicsMassageProgram = () => {
  const [openModule, setOpenModule] = useState<number | null>(0);

  const modules = [
    {
      title: "Модуль 1. Введение в анатомию и физиологию для массажистов",
      topics: [
        "Основные термины и определения",
        "Плоскости, оси и направления тела",
        "Уровни организации тела: клетки, ткани, системы",
        "Связь дисфункций внутренних органов и ОДА",
        "Основы биомеханики: сила, равновесие, компенсации"
      ]
    },
    {
      title: "Модуль 2. Опорно-двигательная система",
      topics: [
        "Строение и функции костей",
        "Суставы и их роль в движении",
        "Основные группы мышц и связок"
      ]
    },
    {
      title: "Модуль 3. Нервная система",
      topics: [
        "Центральная и периферическая нервная система",
        "Роль головного и спинного мозга",
        "Вегетативная нервная система: симпатика и парасимпатика"
      ]
    },
    {
      title: "Модуль 4. Сердечно-сосудистая и лимфатическая системы",
      topics: [
        "Сердце и кровеносные сосуды",
        "Лимфатическая система, узлы и дренаж",
        "Отёки, застои и их значение в практике массажа"
      ]
    },
    {
      title: "Модуль 5. Внутренние органы и их связь с ОДА",
      topics: [
        "Органы грудной клетки и брюшной полости",
        "Органы малого таза",
        "Висцеральные связи и отражённые напряжения"
      ]
    },
    {
      title: "Модуль 6. Фасции и соединительная ткань",
      topics: [
        "Структура и функции фасций",
        "Миофасциальные цепи",
        "Фасциальные дисфункции",
        "Базовые техники работы с фасциями"
      ]
    },
    {
      title: "Модуль 7. Интеграция знаний в практике массажа",
      topics: [
        "Анализ клинических случаев",
        "Техники коррекции дисфункций",
        "Логика построения сеанса"
      ]
    },
    {
      title: "Модуль 8. Психосоматика и массаж",
      topics: [
        "Влияние эмоций на тело",
        "Психосоматические расстройства",
        "Работа с эмоциональными блоками через массаж"
      ]
    },
    {
      title: "Модуль 9. Этические и правовые аспекты",
      topics: [
        "Профессиональная этика массажиста",
        "Правовые основы практики",
        "Взаимодействие с клиентом и создание доверия"
      ]
    },
    {
      title: "Практический видеоблок",
      topics: [
        "Диагностику и осмотр клиента",
        "Регуляцию ОДА и позвоночника",
        "Работу с диафрагмой, внутренними органами",
        "Лимфодренаж",
        "Регуляцию ВНС и эмоционального состояния",
        "Мягкие коррекционные техники",
        "Основы медицинского массажа"
      ]
    },
    {
      title: "Бонусные модули",
      topics: [
        "Коррекция фигуры",
        "Заболевания позвоночника, суставов, мышц",
        "Практика после онлайн-курса",
        "Привлечение клиентов и рост дохода",
        "Кейсы и стратегии масштабирования практики"
      ]
    }
  ];

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-900">
          Программа курса
        </h2>
        
        <div className="space-y-4">
          {modules.map((module, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden"
            >
              <button
                onClick={() => setOpenModule(openModule === index ? null : index)}
                className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg">
                    <Icon name="BookOpen" size={24} className="text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 text-left">{module.title}</h3>
                </div>
                <Icon 
                  name={openModule === index ? "ChevronUp" : "ChevronDown"} 
                  size={24} 
                  className="text-gray-600 flex-shrink-0"
                />
              </button>
              
              {openModule === index && (
                <div className="px-6 pb-6">
                  <ul className="space-y-2 ml-14">
                    {module.topics.map((topic, topicIndex) => (
                      <li key={topicIndex} className="flex items-start gap-2">
                        <Icon name="CheckCircle2" size={18} className="text-blue-600 mt-1 flex-shrink-0" />
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

export default BasicsMassageProgram;
