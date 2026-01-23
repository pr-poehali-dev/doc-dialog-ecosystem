import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const MastermindTariffs = () => {
  const tariffs = [
    {
      name: "КЛАССИЧЕСКИЙ МАСТЕРМАЙНД",
      features: [
        "Группа до 10 человек",
        "активный обмен опытом",
        "разбор кейсов участников",
        "мощная групповая динамика"
      ],
      location: "м. Баррикадная, Волков переулок, 4",
      date: "01.03.2026",
      time: "10:00–18:00",
      price: "15 600 ₽",
      spots: "3 места",
      prepayment: "5 000 ₽",
      gradient: "from-emerald-500 to-teal-600",
      note: "не возвращается, но переносится на следующий мастермайнд",
      url: "https://school.brossok.ru/buy/53"
    },
    {
      name: "ИНТЕНСИВ В МАЛОЙ ГРУППЕ",
      features: [
        "До 2 человек",
        "практически индивидуальное обучение",
        "максимум практики",
        "глубокая проработка ваших запросов"
      ],
      location: "м. Менделеевская / Новослободская",
      date: "15.03.2026",
      time: "10:00–18:00",
      price: "25 000 ₽",
      spots: "2 места",
      prepayment: "5 000 ₽",
      gradient: "from-teal-500 to-cyan-600",
      note: "не возвращается, но переносится на следующий мастермайнд",
      url: "https://school.brossok.ru/buy/54"
    }
  ];

  return (
    <section className="py-12 md:py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8 md:mb-12 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
          Форматы участия и тарифы
        </h2>
        
        <div className="grid lg:grid-cols-2 gap-6 md:gap-8">
          {tariffs.map((tariff, index) => (
            <div 
              key={index}
              className="bg-gradient-to-br from-white to-emerald-50 rounded-2xl shadow-xl overflow-hidden border border-emerald-200 hover:shadow-2xl transition-all hover:-translate-y-1"
            >
              <div className={`bg-gradient-to-r ${tariff.gradient} p-4 md:p-6 text-white`}>
                <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">{tariff.name}</h3>
                <ul className="space-y-1.5 md:space-y-2">
                  {tariff.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-1.5 md:gap-2">
                      <Icon name="CheckCircle2" size={16} className="mt-0.5 flex-shrink-0" />
                      <span className="text-sm md:text-base">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="p-4 md:p-6 space-y-3 md:space-y-4">
                <div className="flex items-start gap-2 md:gap-3">
                  <Icon name="MapPin" size={18} className="text-emerald-600 mt-0.5 md:mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-xs md:text-sm text-gray-600">Адрес:</p>
                    <p className="text-sm md:text-base font-semibold text-gray-900">{tariff.location}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2 md:gap-3">
                  <Icon name="Calendar" size={18} className="text-emerald-600 mt-0.5 md:mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-xs md:text-sm text-gray-600">Дата:</p>
                    <p className="text-sm md:text-base font-semibold text-gray-900">{tariff.date}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2 md:gap-3">
                  <Icon name="Clock" size={18} className="text-emerald-600 mt-0.5 md:mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-xs md:text-sm text-gray-600">Время:</p>
                    <p className="text-sm md:text-base font-semibold text-gray-900">{tariff.time}</p>
                  </div>
                </div>
                
                <div className="border-t border-emerald-100 pt-3 md:pt-4 mt-3 md:mt-4">
                  <div className="flex items-baseline justify-between mb-2">
                    <span className="text-base md:text-lg text-gray-600">Стоимость:</span>
                    <span className="text-2xl md:text-3xl font-bold text-emerald-600">{tariff.price}</span>
                  </div>
                  
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-2 md:p-3 mb-3 md:mb-4">
                    <p className="text-sm font-medium text-yellow-800 flex items-center gap-2">
                      <Icon name="AlertCircle" size={16} />
                      Осталось: <span className="font-bold">{tariff.spots}</span>
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-2 md:p-3 mb-3 md:mb-4">
                    <p className="text-xs md:text-sm text-gray-700">
                      Предоплата: <span className="font-bold text-gray-900">{tariff.prepayment}</span>
                    </p>
                    <p className="text-[10px] md:text-xs text-gray-600 mt-1">({tariff.note})</p>
                  </div>
                  
                  <Button 
                    size="lg" 
                    className="w-full text-base md:text-lg py-4 md:py-6 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-lg hover:shadow-xl transition-all" 
                    asChild
                  >
                    <a href={tariff.url || "https://t.me/docdialogs_bot"} target="_blank" rel="noopener noreferrer">
                      <Icon name="Calendar" size={18} className="mr-2" />
                      Забронировать место
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MastermindTariffs;