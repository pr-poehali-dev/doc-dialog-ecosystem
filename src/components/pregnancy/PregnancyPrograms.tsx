import { useState } from "react";
import Icon from "@/components/ui/icon";

const PregnancyPrograms = () => {
  const [openProgram, setOpenProgram] = useState<number | null>(0);

  const programs = [
    {
      title: "Программа «СТАРТ»",
      subtitle: "2 тренировки в неделю",
      icon: "Rocket",
      color: "emerald",
      suitableFor: [
        "при минимальном опыте тренировок",
        "при осторожном входе в активность"
      ],
      workouts: [
        {
          name: "Тренировка №1",
          accent: "База и Общая сила",
          goals: [
            "укрепить крупные мышечные группы",
            "улучшить осанку",
            "повысить общую стабильность"
          ]
        },
        {
          name: "Тренировка №2",
          accent: "Стабильность, Баланс и Детальная проработка",
          goals: [
            "улучшить координацию",
            "включить мышцы-стабилизаторы",
            "мягко проработать мелкие группы мышц"
          ]
        }
      ]
    },
    {
      title: "Программа «ОПТИМУМ»",
      subtitle: "3 тренировки в неделю",
      icon: "Zap",
      color: "teal",
      suitableFor: [
        "для активных будущих мам",
        "при хорошем самочувствии"
      ],
      workouts: [
        {
          name: "День 1 — Фундамент и стабильность",
          accent: "Фокус: ноги, спина, мышцы кора",
          goals: []
        },
        {
          name: "День 2 — Сила верха и ягодиц",
          accent: "Фокус: грудь, спина, руки, ягодицы",
          goals: []
        },
        {
          name: "День 3 — Функционал, баланс и гибкость",
          accent: "Фокус: координация, мобильность суставов, мягкая растяжка",
          goals: []
        }
      ]
    },
    {
      title: "Программа «ПОЛНЫЙ КОНТРОЛЬ»",
      subtitle: "Вариация на 7 дней",
      icon: "Trophy",
      color: "cyan",
      suitableFor: [
        "при желании регулярного движения",
        "для формирования привычки"
      ],
      workouts: [
        {
          name: "Понедельник — Фундамент (Ноги + Спина)",
          accent: "Цель: поддержка осанки, профилактика болей",
          goals: []
        },
        {
          name: "Вторник — Восстановление и мобильность",
          accent: "Цель: снять напряжение, улучшить кровообращение",
          goals: []
        },
        {
          name: "Среда — Сила и стабильность (Ягодицы + Руки)",
          accent: "Цель: поддержка таза, баланс тела",
          goals: []
        },
        {
          name: "Четверг — Функциональный день",
          accent: "Фокус: движения из повседневной жизни, координация и баланс",
          goals: []
        },
        {
          name: "Пятница — Комплексная проработка (Всё тело)",
          accent: "Цель: общий тонус, гибкость",
          goals: []
        },
        {
          name: "Суббота и воскресенье",
          accent: "Активный отдых",
          goals: []
        }
      ]
    }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-white to-emerald-50">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-8 text-gray-900">
          Какую программу выбрать?
        </h2>
        
        <p className="text-xl text-gray-700 text-center mb-12">
          В тренинге представлены 3 уровня нагрузки, чтобы каждая женщина могла выбрать комфортный формат.
        </p>

        <div className="space-y-4">
          {programs.map((program, index) => {
            const isOpen = openProgram === index;
            const colorClasses = {
              emerald: "from-emerald-500 to-teal-500",
              teal: "from-teal-500 to-cyan-500",
              cyan: "from-cyan-500 to-blue-500"
            };

            return (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <button
                  onClick={() => setOpenProgram(isOpen ? null : index)}
                  className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-3 bg-gradient-to-br ${colorClasses[program.color as keyof typeof colorClasses]} rounded-xl`}>
                      <Icon name={program.icon as any} size={28} className="text-white" />
                    </div>
                    <div className="text-left">
                      <h3 className="text-2xl font-bold text-gray-900">{program.title}</h3>
                      <p className="text-gray-600 mt-1">{program.subtitle}</p>
                    </div>
                  </div>
                  <Icon 
                    name={isOpen ? "ChevronUp" : "ChevronDown"} 
                    size={28} 
                    className="text-gray-400"
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6">
                    <div className="bg-gray-50 p-6 rounded-xl mb-6">
                      <h4 className="font-bold text-gray-900 mb-3">Подходит:</h4>
                      <ul className="space-y-2">
                        {program.suitableFor.map((item, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <Icon name="Check" size={20} className="text-emerald-600 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-4">
                      {program.workouts.map((workout, i) => (
                        <div key={i} className="bg-gradient-to-br from-emerald-50 to-teal-50 p-5 rounded-xl">
                          <h5 className="font-bold text-gray-900 mb-2">{workout.name}</h5>
                          <p className="text-gray-700 mb-3">{workout.accent}</p>
                          {workout.goals.length > 0 && (
                            <ul className="space-y-1">
                              {workout.goals.map((goal, j) => (
                                <li key={j} className="flex items-start gap-2 text-sm text-gray-700">
                                  <span className="text-emerald-600">•</span>
                                  <span>{goal}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PregnancyPrograms;
