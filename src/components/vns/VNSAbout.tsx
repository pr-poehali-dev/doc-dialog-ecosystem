import Icon from "@/components/ui/icon";

const VNSAbout = () => {
  const features = [
    "нейрофизиологии",
    "остеопатическом подходе",
    "клиническом опыте работы с реальными клиентами"
  ];

  return (
    <section className="py-20 px-4 bg-white">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-8 text-gray-900">
          О курсе
        </h2>
        
        <p className="text-xl text-gray-700 leading-relaxed mb-6 text-center max-w-4xl mx-auto">
          «Регуляция ВНС» — это профессиональный онлайн-курс для массажистов и телесных практиков, которые хотят выйти на новый уровень работы с клиентами.
        </p>

        <p className="text-lg text-gray-700 leading-relaxed mb-6 max-w-4xl mx-auto">
          Курс даёт системное понимание вегетативной нервной системы (ВНС) и учит использовать массаж как инструмент глубокой регуляции: снижения гипертонуса, боли, отёков, хронического стресса и нейрогенного воспаления.
        </p>

        <p className="text-lg text-gray-700 leading-relaxed mb-8 max-w-4xl mx-auto">
          Вы перестанете работать «вслепую» и начнёте понимать, почему ткани реагируют именно так, как влияет стресс, ВНС и фасции, и какие техники действительно приводят тело клиента к саморегуляции.
        </p>

        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-8 rounded-2xl">
          <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">Курс основан на:</h3>
          <div className="space-y-3">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-3 justify-center">
                <Icon name="CheckCircle2" size={24} className="text-indigo-600 flex-shrink-0" />
                <span className="text-lg text-gray-800">{feature}</span>
              </div>
            ))}
          </div>
          <p className="text-center text-gray-700 font-medium mt-6">
            Подходит для внедрения сразу в практику.
          </p>
        </div>
      </div>
    </section>
  );
};

export default VNSAbout;
