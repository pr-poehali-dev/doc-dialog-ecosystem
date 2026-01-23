import { useState } from "react";
import Icon from "@/components/ui/icon";

const BrandCourseProgram = () => {
  const [activeModule, setActiveModule] = useState<number | null>(null);

  const modules = [
    {
      title: "Бесплатный модуль",
      subtitle: "Создание и продвижение личного бренда",
      topics: [
        "Что такое интернет-маркетинг для массажиста",
        "Путь пользователя и маркетинговая воронка",
        "Драйверы и барьеры клиента",
        "Базовые принципы развития личного бренда"
      ],
      color: "from-green-500 to-emerald-600"
    },
    {
      title: "Тариф «Старт»",
      subtitle: "Базовые блоки маркетинга",
      topics: [
        "Блок 1. Бизнес-мышление и цели",
        "Блок 2. Маркетинговая аналитика",
        "Блок 3. Позиционирование и бренд",
        "Блок 4. Квиз-маркетинг",
        "Блок 5. Таргетированная реклама",
        "Блок 6. Контент и SMM",
        "Блок 7. Купонаторы как инструмент роста"
      ],
      color: "from-indigo-500 to-purple-600"
    },
    {
      title: "Тариф «Профи»",
      subtitle: "Продвинутые каналы привлечения",
      topics: [
        "SEO для массажных услуг",
        "Создание и оптимизация сайтов",
        "Контекстная реклама (Яндекс Директ)",
        "VK Реклама и Telegram Ads",
        "Ретаргетинг и масштабирование"
      ],
      color: "from-purple-500 to-pink-600"
    },
    {
      title: "Тариф «Эксперт»",
      subtitle: "Глубокая аналитика и управление",
      topics: [
        "Веб-аналитика",
        "Проектирование аналитики",
        "События, цели, пользовательские сценарии",
        "Управление маркетингом на уровне цифр"
      ],
      color: "from-pink-500 to-rose-600"
    }
  ];

  const startTariffBlocks = [
    {
      title: "Блок 1. Бизнес-мышление и цели",
      content: [
        "Постановка бизнес-задач",
        "Аудит текущего состояния",
        "KPI и оценка эффективности",
        "Исследования и гипотезы"
      ]
    },
    {
      title: "Блок 2. Маркетинговая аналитика",
      content: [
        "Google Таблицы для бизнеса",
        "Сквозная аналитика и воронки",
        "Когортный анализ, LTV",
        "Юнит-экономика массажных услуг",
        "Формирование стратегий роста"
      ]
    },
    {
      title: "Блок 3. Позиционирование и бренд",
      content: [
        "Что такое бренд в массажном бизнесе",
        "Анализ рынка, конкурентов и ЦА",
        "Исследования и интервью",
        "Формирование бренд-платформы",
        "Стратегия коммуникации"
      ]
    },
    {
      title: "Блок 4. Квиз-маркетинг",
      content: [
        "Квизы как инструмент лидогенерации",
        "Интеграция в воронку продаж",
        "Создание и оптимизация квизов",
        "Работа с заявками"
      ]
    },
    {
      title: "Блок 5. Таргетированная реклама",
      content: [
        "Подготовка к запуску рекламы",
        "Медиапланирование",
        "Создание креативов и текстов",
        "Анализ и оптимизация"
      ]
    },
    {
      title: "Блок 6. Контент и SMM",
      content: [
        "Контент-маркетинг для массажистов",
        "Социальные сети и Телеграм",
        "Прогрев аудитории",
        "Работа с блогерами",
        "Стратегия контента"
      ]
    },
    {
      title: "Блок 7. Купонаторы как инструмент роста",
      content: [
        "Biglion, Groupon: плюсы и риски",
        "Создание оффера",
        "Конвертация в постоянных клиентов",
        "Кейсы увеличения прибыли"
      ]
    }
  ];

  return (
    <section className="py-12 md:py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8 md:mb-12 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
          Структура курса
        </h2>
        
        <div className="space-y-3 md:space-y-4">
          {modules.map((module, index) => (
            <div 
              key={index}
              className="bg-gradient-to-br from-white to-indigo-50 rounded-2xl shadow-lg overflow-hidden border border-indigo-200"
            >
              <button
                onClick={() => setActiveModule(activeModule === index ? null : index)}
                className="w-full p-4 md:p-6 flex items-center justify-between hover:bg-indigo-50/50 transition-colors"
              >
                <div className="flex items-center gap-3 md:gap-4 flex-1 text-left">
                  <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br ${module.color} flex items-center justify-center text-white font-bold text-base md:text-lg flex-shrink-0 shadow-md`}>
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-base md:text-lg lg:text-xl font-bold text-gray-900">{module.title}</h3>
                    <p className="text-xs md:text-sm text-gray-600 mt-0.5 md:mt-1">{module.subtitle}</p>
                  </div>
                </div>
                <Icon 
                  name={activeModule === index ? "ChevronUp" : "ChevronDown"} 
                  size={20} 
                  className="text-gray-400 flex-shrink-0"
                />
              </button>
              
              {activeModule === index && (
                <div className="px-4 md:px-6 pb-4 md:pb-6 pt-2">
                  {index === 1 ? (
                    <div className="space-y-4 md:space-y-6">
                      {startTariffBlocks.map((block, blockIndex) => (
                        <div key={blockIndex} className="bg-gradient-to-br from-indigo-50 to-purple-50 p-3 md:p-4 rounded-xl shadow-md border border-indigo-100">
                          <h4 className="font-semibold text-sm md:text-base text-gray-900 mb-2 md:mb-3">{block.title}</h4>
                          <ul className="space-y-1.5 md:space-y-2">
                            {block.content.map((item, itemIndex) => (
                              <li key={itemIndex} className="flex items-start gap-1.5 md:gap-2">
                                <Icon name="Circle" size={6} className="text-primary mt-1.5 md:mt-2 flex-shrink-0" />
                                <span className="text-xs md:text-sm text-gray-700">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <ul className="space-y-2 md:space-y-3">
                      {module.topics.map((topic, topicIndex) => (
                        <li key={topicIndex} className="flex items-start gap-2 md:gap-3">
                          <Icon name="CheckCircle2" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-sm md:text-base text-gray-700">{topic}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandCourseProgram;