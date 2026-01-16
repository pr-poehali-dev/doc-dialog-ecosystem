import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const MastermindHero = () => {
  return (
    <section className="relative pt-32 pb-20 px-4 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/95 via-teal-600/90 to-cyan-700/95"></div>
      </div>
      
      <div className="container mx-auto max-w-5xl relative z-10">
        <div className="text-center">
          <div className="inline-block mb-4 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium text-white">
            ОФЛАЙН МАСТЕРМАЙНД В МОСКВЕ
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-white">
            Практика, система и рост частной практики массажиста
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto">
            Закрытая живая встреча специалистов по массажу и работе с телом. Разбираете реальные случаи, отрабатываете техники руками и получаете чёткую систему работы с клиентом.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="text-lg px-8 py-6 bg-white text-primary hover:bg-gray-100" asChild>
              <a href="https://school.brossok.ru/buy/53" target="_blank" rel="noopener noreferrer">
                <Icon name="Calendar" size={20} className="mr-2" />
                Забронировать место
              </a>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-2 border-white bg-transparent text-white hover:bg-white hover:text-primary" asChild>
              <a href="https://t.me/docdialogs_bot" target="_blank" rel="noopener noreferrer">
                <Icon name="MessageCircle" size={20} className="mr-2" />
                Задать вопрос
              </a>
            </Button>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 max-w-2xl mx-auto">
            <p className="text-lg text-white font-medium mb-4">Это формат для тех, кто:</p>
            <div className="flex flex-col md:flex-row gap-4 justify-center text-sm text-white/90">
              <div className="flex items-center gap-2">
                <Icon name="CheckCircle2" size={16} />
                <span>уже работает с клиентами</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="CheckCircle2" size={16} />
                <span>хочет глубже понимать тело</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="CheckCircle2" size={16} />
                <span>стремится к стабильной практике</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MastermindHero;