import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const MastermindCTA = () => {
  return (
    <section className="py-12 md:py-20 px-4 bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMC41IiBvcGFjaXR5PSIwLjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>
      <div className="container mx-auto max-w-4xl text-center relative z-10">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 text-white drop-shadow-lg">
          Остались вопросы?
        </h2>
        
        <p className="text-base md:text-xl lg:text-2xl mb-6 md:mb-8 text-white/95 max-w-3xl mx-auto drop-shadow-md">
          Напишите нам в Telegram — поможем выбрать формат и ответим на все вопросы
        </p>

        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center mb-8 md:mb-12">
          <Button 
            size="lg" 
            className="text-base md:text-lg px-6 md:px-8 py-4 md:py-6 bg-white text-primary hover:bg-gray-100 hover:scale-105 transition-all shadow-xl hover:shadow-2xl" 
            asChild
          >
            <a href="https://t.me/docdialogs_bot" target="_blank" rel="noopener noreferrer">
              <Icon name="MessageCircle" size={18} className="mr-2" />
              Написать в Telegram
            </a>
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="text-base md:text-lg px-6 md:px-8 py-4 md:py-6 border-2 border-white bg-white/10 backdrop-blur-md text-white hover:bg-white hover:text-primary transition-all shadow-lg hover:shadow-xl" 
            asChild
          >
            <a href="https://t.me/docdialogs_bot" target="_blank" rel="noopener noreferrer">
              <Icon name="Calendar" size={18} className="mr-2" />
              Забронировать место
            </a>
          </Button>
        </div>

        <div className="bg-white/15 backdrop-blur-md rounded-2xl p-4 md:p-6 max-w-2xl mx-auto border border-white/20 shadow-xl">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6">
            <div className="p-2 md:p-3 bg-white/20 backdrop-blur-sm rounded-full shadow-md">
              <Icon name="Clock" size={28} className="text-white md:scale-110" />
            </div>
            <div className="text-center md:text-left">
              <p className="text-base md:text-lg font-bold text-white mb-1">Места ограничены!</p>
              <p className="text-sm md:text-base text-white/95">Не упустите возможность попасть на мастермайнд</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MastermindCTA;