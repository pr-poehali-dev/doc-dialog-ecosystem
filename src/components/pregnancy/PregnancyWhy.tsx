import Icon from "@/components/ui/icon";

const PregnancyWhy = () => {
  return (
    <section className="py-12 md:py-20 px-4 bg-gradient-to-b from-emerald-50 via-teal-50 to-cyan-50">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 md:mb-8 text-gray-900">
          Почему именно 2-й триместр
        </h2>

        <p className="text-lg md:text-xl text-gray-700 mb-8 md:mb-12 max-w-3xl mx-auto">
          2-й триместр — это период, когда:
        </p>

        <div className="grid sm:grid-cols-2 gap-4 md:gap-6 mb-8 md:mb-12">
          <div className="flex items-start gap-3">
            <Icon name="CheckCircle2" size={20} className="text-emerald-600 flex-shrink-0 mt-1" />
            <span className="text-sm md:text-base lg:text-lg text-gray-800">токсикоз чаще всего уже позади</span>
          </div>
          <div className="flex items-start gap-3">
            <Icon name="CheckCircle2" size={20} className="text-emerald-600 flex-shrink-0 mt-1" />
            <span className="text-sm md:text-base lg:text-lg text-gray-800">энергия возвращается</span>
          </div>
          <div className="flex items-start gap-3">
            <Icon name="CheckCircle2" size={20} className="text-emerald-600 flex-shrink-0 mt-1" />
            <span className="text-sm md:text-base lg:text-lg text-gray-800">тело активно перестраивается</span>
          </div>
          <div className="flex items-start gap-3">
            <Icon name="CheckCircle2" size={20} className="text-emerald-600 flex-shrink-0 mt-1" />
            <span className="text-sm md:text-base lg:text-lg text-gray-800">закладывается база для будущего</span>
          </div>
        </div>

        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
          <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6 text-center">Закладывается база для:</h3>
          <div className="grid sm:grid-cols-3 gap-4 md:gap-6">
            <div className="text-center">
              <div className="p-3 md:p-4 bg-emerald-100 rounded-full w-12 h-12 md:w-16 md:h-16 flex items-center justify-center mb-2 md:mb-3 mx-auto">
                <Icon name="Heart" size={24} className="text-emerald-600 md:scale-125" />
              </div>
              <p className="text-sm md:text-base lg:text-lg font-medium text-gray-800">Лёгких родов</p>
            </div>
            <div className="text-center">
              <div className="p-3 md:p-4 bg-teal-100 rounded-full w-12 h-12 md:w-16 md:h-16 flex items-center justify-center mb-2 md:mb-3 mx-auto">
                <Icon name="TrendingUp" size={24} className="text-teal-600 md:scale-125" />
              </div>
              <p className="text-sm md:text-base lg:text-lg font-medium text-gray-800">Быстрого восстановления</p>
            </div>
            <div className="text-center">
              <div className="p-3 md:p-4 bg-cyan-100 rounded-full w-12 h-12 md:w-16 md:h-16 flex items-center justify-center mb-2 md:mb-3 mx-auto">
                <Icon name="Shield" size={24} className="text-cyan-600 md:scale-125" />
              </div>
              <p className="text-sm md:text-base lg:text-lg font-medium text-gray-800">Здоровья спины и таза</p>
            </div>
          </div>
        </div>

        <div className="mt-6 md:mt-8">
          <p className="text-base md:text-lg lg:text-xl text-gray-700 font-medium">
            👉 Правильное движение в этот период — инвестиция в роды и послеродовой период.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PregnancyWhy;