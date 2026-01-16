import Icon from "@/components/ui/icon";

const MastermindAbout = () => {
  const benefits = [
    "разберёте ключевые жалобы клиентов",
    "освоите рабочие алгоритмы диагностики",
    "поймёте, что именно делать руками",
    "увидите, как выстраивать сеанс системно"
  ];

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-900">
          О мастермайнде
        </h2>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-700 leading-relaxed mb-6">
            Мастермайнд от Док Диалог — это <span className="font-bold text-primary">однодневный интенсив офлайн</span>, 
            где опыт передаётся лично от практика к практику.
          </p>
          
          <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-cyan-50 p-8 rounded-2xl mb-8">
            <h3 className="text-2xl font-bold mb-6 text-gray-900">За один день вы:</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <Icon name="CheckCircle2" size={24} className="text-primary flex-shrink-0 mt-1" />
                  <span className="text-lg text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-gray-900 text-white p-8 rounded-2xl">
            <p className="text-lg mb-4">
              Это не лекция и не показ «для галочки».
            </p>
            <p className="text-xl font-semibold">
              Это живая работа, вопросы, практика и разбор именно вашей реальности.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MastermindAbout;
