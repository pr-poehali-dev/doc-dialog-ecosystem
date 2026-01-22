import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const ArsenalCourseResults = () => {
  return (
    <section className="py-12 md:py-20 px-4 bg-gradient-to-br from-primary via-purple-600 to-indigo-700 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMC41IiBvcGFjaXR5PSIwLjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>
      <div className="container mx-auto max-w-4xl text-center relative z-10">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 drop-shadow-lg">
          Готовы вывести свою практику на новый уровень?
        </h2>
        <p className="text-base md:text-lg lg:text-xl mb-6 md:mb-8 text-white/90">
          Присоединяйтесь к курсу и начните работать глубже, безопаснее и результативнее
        </p>
        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
          <Button 
            size="lg" 
            className="text-base md:text-lg px-6 md:px-8 py-4 md:py-6 bg-white text-primary hover:bg-gray-100 shadow-xl hover:shadow-2xl transition-all"
            asChild
          >
            <a href="https://school.brossok.ru/buy/50" target="_blank" rel="noopener noreferrer">
              <Icon name="Play" size={20} className="mr-2" />
              Записаться на курс
            </a>
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="text-base md:text-lg px-6 md:px-8 py-4 md:py-6 border-2 border-white bg-white/15 backdrop-blur-md text-white hover:bg-white hover:text-primary transition-all shadow-lg hover:shadow-xl"
            asChild
          >
            <a href="https://t.me/docdialogs_bot" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center text-white hover:text-primary">
              <Icon name="MessageCircle" size={20} className="mr-2" />
              <span>Задать вопрос</span>
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ArsenalCourseResults;