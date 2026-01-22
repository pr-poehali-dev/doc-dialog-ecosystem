import Icon from "@/components/ui/icon";

const VNSAbout = () => {
  const features = [
    "нейрофизиологии",
    "остеопатическом подходе",
    "клиническом опыте работы с реальными клиентами",
    "современных научных исследованиях"
  ];

  return (
    <section className="py-12 md:py-20 px-4 bg-white">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 md:mb-8 bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
          О курсе
        </h2>
        
        <p className="text-base md:text-lg lg:text-xl text-gray-700 leading-relaxed mb-4 md:mb-6 max-w-4xl mx-auto">
          «Регуляция ВНС» — это профессиональный онлайн-курс для массажистов и телесных практиков, которые хотят выйти на новый уровень работы с клиентами.
        </p>

        <p className="text-sm md:text-base lg:text-lg text-gray-700 leading-relaxed mb-4 md:mb-6 max-w-4xl mx-auto">
          Курс даёт системное понимание вегетативной нервной системы (ВНС) и учит использовать массаж как инструмент глубокой регуляции: снижения гипертонуса, боли, отёков, хронического стресса и нейрогенного воспаления.
        </p>

        <p className="text-sm md:text-base lg:text-lg text-gray-700 leading-relaxed mb-6 md:mb-8 max-w-4xl mx-auto font-medium">
          Вы перестанете работать «вслепую» и начнёте понимать, почему ткани реагируют именно так, как влияет стресс, ВНС и фасции, и какие техники действительно приводят тело клиента к саморегуляции.
        </p>

        <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 p-6 md:p-8 rounded-2xl shadow-lg border border-indigo-100/50">
          <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6">Курс основан на:</h3>
          <div className="grid sm:grid-cols-2 gap-4 md:gap-6 max-w-4xl mx-auto">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                <Icon name="CheckCircle2" size={20} className="text-indigo-600 flex-shrink-0" />
                <span className="text-sm md:text-base lg:text-lg text-gray-800 font-medium">{feature}</span>
              </div>
            ))}
          </div>
          <p className="text-gray-700 font-semibold mt-4 md:mt-6 text-indigo-900 text-sm md:text-base">
            Подходит для внедрения сразу в практику.
          </p>
        </div>
      </div>
    </section>
  );
};

export default VNSAbout;