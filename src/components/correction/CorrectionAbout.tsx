import Icon from "@/components/ui/icon";

const CorrectionAbout = () => {
  const features = [
    "телесную диагностику",
    "ручные техники коррекции фигуры",
    "понимание причин отёков, асимметрий и локальных жировых ловушек",
    "реальный инструмент привлечения клиентов без рекламы"
  ];

  return (
    <section className="py-20 px-4 bg-white">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-8 text-gray-900">
          О курсе
        </h2>
        
        <p className="text-xl text-gray-700 leading-relaxed mb-8 text-center max-w-4xl mx-auto">
          «Коррекция фигуры» — это практический курс для массажистов и телесных специалистов, которые хотят работать с формой тела осознанно, а не просто «гонять воду и жировые отложения».
        </p>

        <div className="bg-gradient-to-br from-rose-50 to-pink-50 p-8 rounded-2xl mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">Курс объединяет:</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start gap-3">
                <Icon name="CheckCircle2" size={24} className="text-rose-600 flex-shrink-0 mt-1" />
                <span className="text-lg text-gray-800">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="text-lg text-gray-700 leading-relaxed text-center max-w-4xl mx-auto font-medium">
          Это курс не только про тело клиента, но и про рост дохода специалиста.
        </p>
      </div>
    </section>
  );
};

export default CorrectionAbout;
