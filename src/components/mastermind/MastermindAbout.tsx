import Icon from "@/components/ui/icon";

const MastermindAbout = () => {
  const benefits = [
    "разберёте ключевые жалобы клиентов",
    "освоите рабочие алгоритмы диагностики",
    "поймёте, что именно делать руками",
    "увидите, как выстраивать сеанс системно"
  ];

  return (
    <section className="py-12 md:py-20 px-4">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8 md:mb-12 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
          О мастермайнде
        </h2>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-base md:text-lg lg:text-xl text-gray-700 leading-relaxed mb-4 md:mb-6">
            Мастермайнд от Док Диалог — это <span className="font-bold text-primary">однодневный интенсив офлайн</span>, 
            где опыт передаётся лично от практика к практику.
          </p>
          
          <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-cyan-50 p-4 md:p-6 lg:p-8 rounded-2xl mb-6 md:mb-8 border border-emerald-100 shadow-md">
            <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-gray-900">За один день вы:</h3>
            <div className="grid md:grid-cols-2 gap-3 md:gap-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-2 md:gap-3">
                  <Icon name="CheckCircle2" size={20} className="text-primary flex-shrink-0 mt-0.5 md:mt-1" />
                  <span className="text-sm md:text-base lg:text-lg text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white p-4 md:p-6 lg:p-8 rounded-2xl shadow-xl border border-gray-700">
            <p className="text-base md:text-lg mb-3 md:mb-4">
              Это не лекция и не показ «для галочки».
            </p>
            <p className="text-lg md:text-xl font-semibold">
              Это живая работа, вопросы, практика и разбор именно вашей реальности.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MastermindAbout;