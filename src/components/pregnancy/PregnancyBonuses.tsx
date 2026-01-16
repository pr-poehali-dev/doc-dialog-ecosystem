import Icon from "@/components/ui/icon";

const PregnancyBonuses = () => {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-900">
          🎁 Бонусы
        </h2>
        <p className="text-xl text-gray-600 text-center mb-12">
          Дополнительные материалы для вашей безопасности и комфорта
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-8 rounded-2xl shadow-lg">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-4 bg-emerald-100 rounded-full">
                <Icon name="BookOpen" size={32} className="text-emerald-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">
                📘 Гид по безопасному движению в быту
              </h3>
            </div>
            
            <p className="text-gray-700 mb-6 font-medium">
              Вы узнаете:
            </p>

            <div className="space-y-3">
              {[
                "как вставать",
                "как сидеть",
                "как поднимать предметы",
                "как спать",
                "как снижать нагрузку на поясницу и таз"
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <Icon name="CheckCircle2" size={20} className="text-emerald-600 flex-shrink-0" />
                  <span className="text-gray-800">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-teal-50 to-cyan-50 p-8 rounded-2xl shadow-lg">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-4 bg-teal-100 rounded-full">
                <Icon name="Wind" size={32} className="text-teal-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">
                🌬 Дыхание для спокойствия и родов
              </h3>
            </div>
            
            <p className="text-gray-700 mb-6 font-medium">
              Это не просто дыхательная техника, а:
            </p>

            <div className="space-y-3">
              {[
                "инструмент снижения тревожности",
                "поддержка нервной системы",
                "основа для родов"
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <Icon name="CheckCircle2" size={20} className="text-teal-600 flex-shrink-0" />
                  <span className="text-gray-800">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PregnancyBonuses;
