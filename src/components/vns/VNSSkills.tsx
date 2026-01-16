import Icon from "@/components/ui/icon";

const VNSSkills = () => {
  const skills = [
    { 
      icon: "Brain", 
      title: "Понимать роль ВНС в формировании боли, гипертонуса и воспаления",
      description: "Видите глубинные причины проблем"
    },
    { 
      icon: "Activity", 
      title: "Определять, какая ветвь ВНС доминирует у клиента",
      description: "Точная диагностика состояния"
    },
    { 
      icon: "Hand", 
      title: "Работать с мышечным тонусом через нервную систему, а не силой",
      description: "Эффективность без перегрузки рук"
    },
    { 
      icon: "Droplets", 
      title: "Влиять на кровообращение, лимфоток, отёки и температуру тканей",
      description: "Комплексное воздействие на организм"
    },
    { 
      icon: "Waves", 
      title: "Работать с фасциальным напряжением «за гранью мышц»",
      description: "Глубинная работа с тканями"
    },
    { 
      icon: "Zap", 
      title: "Использовать массаж как инструмент быстрой саморегуляции",
      description: "Запуск естественных механизмов восстановления"
    },
    { 
      icon: "Target", 
      title: "Интегрировать знания о ВНС в ежедневную практику",
      description: "Применение с первого дня"
    },
    { 
      icon: "TrendingUp", 
      title: "Повышать эффективность сеанса без увеличения нагрузки на руки",
      description: "Профессиональный рост без выгорания"
    }
  ];

  return (
    <section className="py-20 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-900">
          Чему вы научитесь
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill, index) => (
            <div 
              key={index}
              className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-2xl shadow-md hover:shadow-lg transition-all hover:-translate-y-1"
            >
              <div className="mb-4">
                <div className="inline-block p-3 bg-white rounded-full">
                  <Icon name={skill.icon as any} size={32} className="text-indigo-600" />
                </div>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{skill.title}</h3>
              <p className="text-gray-600 text-sm">{skill.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VNSSkills;
