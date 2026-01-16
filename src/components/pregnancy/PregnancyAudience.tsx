import Icon from "@/components/ui/icon";

const PregnancyAudience = () => {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-900">
          Для кого этот тренинг
        </h2>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-8 rounded-2xl">
            <div className="p-4 bg-emerald-100 rounded-full w-16 h-16 flex items-center justify-center mb-4 mx-auto">
              <Icon name="Calendar" size={32} className="text-emerald-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">Женщины во 2-м триместре</h3>
            <p className="text-gray-700 text-center">
              Будущие мамы, которым разрешена физическая активность
            </p>
          </div>

          <div className="bg-gradient-to-br from-teal-50 to-cyan-50 p-8 rounded-2xl">
            <div className="p-4 bg-teal-100 rounded-full w-16 h-16 flex items-center justify-center mb-4 mx-auto">
              <Icon name="Target" size={32} className="text-teal-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">Сохранить тонус</h3>
            <p className="text-gray-700 text-center">
              Важно сохранить тонус, осанку и мобильность
            </p>
          </div>

          <div className="bg-gradient-to-br from-cyan-50 to-blue-50 p-8 rounded-2xl">
            <div className="p-4 bg-cyan-100 rounded-full w-16 h-16 flex items-center justify-center mb-4 mx-auto">
              <Icon name="ShieldCheck" size={32} className="text-cyan-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">Безопасная подготовка</h3>
            <p className="text-gray-700 text-center">
              Хотите подготовить тело к родам без перегруза
            </p>
          </div>
        </div>

        <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-lg max-w-3xl mx-auto">
          <div className="flex gap-3">
            <Icon name="AlertCircle" size={24} className="text-amber-600 flex-shrink-0" />
            <p className="text-gray-800 font-medium">
              Тренинг не заменяет наблюдение врача, а дополняет его.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PregnancyAudience;
