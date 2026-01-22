import Icon from "@/components/ui/icon";

const CorrectionAbout = () => {
  const features = [
    "телесную диагностику",
    "ручные техники коррекции фигуры",
    "понимание причин отёков, асимметрий и локальных жировых ловушек",
    "реальный инструмент привлечения клиентов без рекламы"
  ];

  return (
    <section className="py-12 md:py-20 px-4 bg-white">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 md:mb-8 text-gray-900 bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
          О курсе
        </h2>
        
        <p className="text-base md:text-lg lg:text-xl text-gray-700 leading-relaxed mb-6 md:mb-8 max-w-4xl mx-auto">
          «Коррекция фигуры» — это практический курс для массажистов и телесных специалистов, которые хотят работать с формой тела осознанно, а не просто «гонять воду и жировые отложения».
        </p>

        <div className="bg-gradient-to-br from-rose-50 via-pink-50 to-fuchsia-50 p-6 md:p-8 rounded-2xl mb-6 md:mb-8 shadow-lg">
          <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4">Курс объединяет:</h3>
          <div className="grid sm:grid-cols-2 gap-3 md:gap-4">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start gap-3">
                <Icon name="CheckCircle2" size={20} className="text-rose-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm md:text-base lg:text-lg text-gray-800 font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="text-base md:text-lg text-gray-700 leading-relaxed max-w-4xl mx-auto font-semibold text-rose-900">
          Это курс не только про тело клиента, но и про рост дохода специалиста.
        </p>
      </div>
    </section>
  );
};

export default CorrectionAbout;