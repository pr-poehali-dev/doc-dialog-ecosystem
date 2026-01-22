import Icon from "@/components/ui/icon";

const PregnancyAudience = () => {
  return (
    <section className="py-12 md:py-20 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 md:mb-12 text-gray-900">
          Для кого этот тренинг
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 mb-8 md:mb-12">
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-6 md:p-8 rounded-2xl">
            <div className="p-3 md:p-4 bg-emerald-100 rounded-full w-12 h-12 md:w-16 md:h-16 flex items-center justify-center mb-3 md:mb-4 mx-auto">
              <Icon name="Calendar" size={24} className="text-emerald-600 md:scale-125" />
            </div>
            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 md:mb-3">Женщины во 2-м триместре</h3>
            <p className="text-sm md:text-base text-gray-700">
              Будущие мамы, которым разрешена физическая активность
            </p>
          </div>

          <div className="bg-gradient-to-br from-teal-50 to-cyan-50 p-6 md:p-8 rounded-2xl">
            <div className="p-3 md:p-4 bg-teal-100 rounded-full w-12 h-12 md:w-16 md:h-16 flex items-center justify-center mb-3 md:mb-4 mx-auto">
              <Icon name="Target" size={24} className="text-teal-600 md:scale-125" />
            </div>
            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 md:mb-3">Сохранить тонус</h3>
            <p className="text-sm md:text-base text-gray-700">
              Важно сохранить тонус, осанку и мобильность
            </p>
          </div>

          <div className="bg-gradient-to-br from-cyan-50 to-blue-50 p-6 md:p-8 rounded-2xl">
            <div className="p-3 md:p-4 bg-cyan-100 rounded-full w-12 h-12 md:w-16 md:h-16 flex items-center justify-center mb-3 md:mb-4 mx-auto">
              <Icon name="ShieldCheck" size={24} className="text-cyan-600 md:scale-125" />
            </div>
            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 md:mb-3">Безопасная подготовка</h3>
            <p className="text-sm md:text-base text-gray-700">
              Хотите подготовить тело к родам без перегруза
            </p>
          </div>
        </div>

        <div className="bg-amber-50 border-l-4 border-amber-500 p-4 md:p-6 rounded-lg max-w-3xl mx-auto">
          <div className="flex gap-3">
            <Icon name="AlertCircle" size={20} className="text-amber-600 flex-shrink-0" />
            <p className="text-sm md:text-base text-gray-800 font-medium">
              Тренинг не заменяет наблюдение врача, а дополняет его.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PregnancyAudience;