import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const ArsenalCourseHero = () => {
  return (
    <section className="relative pt-20 md:pt-32 pb-12 md:pb-20 px-4 overflow-hidden">
      <div className="absolute inset-0">
        <img 
          src="https://cdn.poehali.dev/files/doctor-massages-man-hospital.jpg" 
          alt="Профессиональный массаж" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-purple-600/85 to-indigo-700/90"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMC41IiBvcGFjaXR5PSIwLjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>
      </div>
      
      <div className="container mx-auto max-w-5xl relative z-10">
        <div className="text-center">
          <div className="inline-block mb-4 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium text-white">
            Онлайн-курс
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 md:mb-6 leading-tight text-white drop-shadow-2xl">
            Арсенал массажиста
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 md:mb-8 text-white/90 max-w-3xl mx-auto">
            Практический онлайн-курс для массажистов и телесных специалистов, которые хотят работать глубже, безопаснее и результативнее
          </p>

          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center mb-8 md:mb-12">
            <Button size="lg" className="text-base md:text-lg px-6 md:px-8 py-4 md:py-6 bg-white text-primary hover:bg-gray-100 shadow-xl hover:shadow-2xl transition-all" asChild>
              <a href="https://school.brossok.ru/buy/50" target="_blank" rel="noopener noreferrer">
                <Icon name="Play" size={20} className="mr-2" />
                Записаться на курс
              </a>
            </Button>
            <Button size="lg" variant="outline" className="text-base md:text-lg px-6 md:px-8 py-4 md:py-6 border-2 border-white bg-white/15 backdrop-blur-md text-white hover:bg-white hover:text-primary transition-all" asChild>
              <a href="https://t.me/docdialogs_bot" target="_blank" rel="noopener noreferrer">
                <Icon name="Info" size={20} className="mr-2" />
                Узнать подробнее
              </a>
            </Button>
          </div>

          <div className="flex flex-wrap justify-center gap-3 md:gap-6 text-xs sm:text-sm text-white/80">
            <div className="flex items-center gap-1.5 md:gap-2">
              <Icon name="Clock" size={16} />
              <span>6 модулей</span>
            </div>
            <div className="flex items-center gap-1.5 md:gap-2">
              <Icon name="Video" size={16} />
              <span>Видеоразборы техник</span>
            </div>
            <div className="flex items-center gap-1.5 md:gap-2">
              <Icon name="Award" size={16} />
              <span>Готовые протоколы</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArsenalCourseHero;