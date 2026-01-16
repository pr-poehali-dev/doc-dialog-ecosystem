import Icon from "@/components/ui/icon";

const PregnancyWhy = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-emerald-50 via-teal-50 to-cyan-50">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-8 text-gray-900">
          Почему именно 2-й триместр
        </h2>

        <p className="text-xl text-gray-700 text-center mb-12 max-w-3xl mx-auto">
          2-й триместр — это период, когда:
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="flex items-start gap-3">
            <Icon name="CheckCircle2" size={24} className="text-emerald-600 flex-shrink-0 mt-1" />
            <span className="text-lg text-gray-800">токсикоз чаще всего уже позади</span>
          </div>
          <div className="flex items-start gap-3">
            <Icon name="CheckCircle2" size={24} className="text-emerald-600 flex-shrink-0 mt-1" />
            <span className="text-lg text-gray-800">энергия возвращается</span>
          </div>
          <div className="flex items-start gap-3">
            <Icon name="CheckCircle2" size={24} className="text-emerald-600 flex-shrink-0 mt-1" />
            <span className="text-lg text-gray-800">тело активно перестраивается</span>
          </div>
          <div className="flex items-start gap-3">
            <Icon name="CheckCircle2" size={24} className="text-emerald-600 flex-shrink-0 mt-1" />
            <span className="text-lg text-gray-800">закладывается база для будущего</span>
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Закладывается база для:</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="p-4 bg-emerald-100 rounded-full w-16 h-16 flex items-center justify-center mb-3 mx-auto">
                <Icon name="Heart" size={32} className="text-emerald-600" />
              </div>
              <p className="text-lg font-medium text-gray-800">Лёгких родов</p>
            </div>
            <div className="text-center">
              <div className="p-4 bg-teal-100 rounded-full w-16 h-16 flex items-center justify-center mb-3 mx-auto">
                <Icon name="TrendingUp" size={32} className="text-teal-600" />
              </div>
              <p className="text-lg font-medium text-gray-800">Быстрого восстановления</p>
            </div>
            <div className="text-center">
              <div className="p-4 bg-cyan-100 rounded-full w-16 h-16 flex items-center justify-center mb-3 mx-auto">
                <Icon name="Shield" size={32} className="text-cyan-600" />
              </div>
              <p className="text-lg font-medium text-gray-800">Здоровья спины и таза</p>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-xl text-gray-700 font-medium">
            👉 Правильное движение в этот период — инвестиция в роды и послеродовой период.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PregnancyWhy;
