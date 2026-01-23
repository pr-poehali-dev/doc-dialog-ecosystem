import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const MastermindHero = () => {
  return (
    <section className="relative pt-24 md:pt-32 pb-12 md:pb-20 px-4 overflow-hidden">
      <div className="absolute inset-0">
        <img 
          src="https://cdn.poehali.dev/files/massage-with-four-hands-concept-healthcare-female-beauty-two-masseuses-make-double-massage-girl-woman-spa-salon (4).jpg" 
          alt="Практика массажа" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/80 via-teal-600/75 to-cyan-700/80"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMC41IiBvcGFjaXR5PSIwLjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>
      </div>
      
      <div className="container mx-auto max-w-5xl relative z-10">
        <div className="text-center">
          <div className="inline-block mb-3 md:mb-4 px-3 md:px-4 py-1.5 md:py-2 bg-white/20 backdrop-blur-sm rounded-full text-xs md:text-sm font-medium text-white shadow-lg">
            ОФЛАЙН МАСТЕРМАЙНД В МОСКВЕ
          </div>
          
          <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold mb-4 md:mb-6 leading-tight text-white drop-shadow-lg">
            Практика, система и рост частной практики массажиста
          </h1>
          
          <p className="text-base md:text-xl lg:text-2xl mb-6 md:mb-8 text-white/95 max-w-3xl mx-auto drop-shadow-md">
            Закрытая живая встреча специалистов по массажу и работе с телом. Разбираете реальные случаи, отрабатываете техники руками и получаете чёткую систему работы с клиентом.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center mb-8 md:mb-12">
            <Button size="lg" className="text-base md:text-lg px-6 md:px-8 py-4 md:py-6 bg-white text-primary hover:bg-gray-100 shadow-xl hover:shadow-2xl transition-all hover:scale-105" asChild>
              <a href="https://school.brossok.ru/buy/53" target="_blank" rel="noopener noreferrer">
                <Icon name="Calendar" size={20} className="mr-2" />
                Забронировать место
              </a>
            </Button>
            <Button size="lg" variant="outline" className="text-base md:text-lg px-6 md:px-8 py-4 md:py-6 border-2 border-white bg-white/10 backdrop-blur-md text-white hover:bg-white hover:text-primary transition-all shadow-lg hover:shadow-xl" asChild>
              <a href="https://t.me/docdialogs_bot" target="_blank" rel="noopener noreferrer">
                <Icon name="MessageCircle" size={20} className="mr-2" />
                Задать вопрос
              </a>
            </Button>
          </div>

          <div className="bg-white/15 backdrop-blur-md rounded-2xl p-4 md:p-6 max-w-2xl mx-auto border border-white/20 shadow-xl">
            <p className="text-base md:text-lg text-white font-medium mb-3 md:mb-4">Это формат для тех, кто:</p>
            <div className="flex flex-col md:flex-row gap-3 md:gap-4 justify-center text-xs md:text-sm text-white/95">
              <div className="flex items-center justify-center md:justify-start gap-2">
                <Icon name="CheckCircle2" size={16} className="flex-shrink-0" />
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