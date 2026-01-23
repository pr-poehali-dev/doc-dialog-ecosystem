import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const BrandCourseResults = () => {
  return (
    <section className="py-12 md:py-20 px-4 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMC41IiBvcGFjaXR5PSIwLjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>
      <div className="container mx-auto max-w-4xl text-center relative z-10">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 text-white drop-shadow-lg">
          Готовы перейти на новый уровень?
        </h2>
        
        <p className="text-base md:text-xl lg:text-2xl mb-6 md:mb-8 text-white/95 max-w-3xl mx-auto drop-shadow-md">
          Перестаньте зависеть от случайных клиентов. Создайте систему, которая работает на вас.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center mb-8 md:mb-12">
          <Button 
            size="lg" 
            className="text-base md:text-lg px-6 md:px-8 py-4 md:py-6 bg-white text-primary hover:bg-gray-100 hover:scale-105 transition-all shadow-xl hover:shadow-2xl" 
            asChild
          >
            <a href="https://school.brossok.ru/training/view/-laquo-massaghist-2-0-sozdanie-i-prodvighenie-lichnogo-brenda-raquo-" target="_blank" rel="noopener noreferrer">
              <Icon name="Rocket" size={18} className="mr-2" />
              Начать обучение бесплатно
            </a>
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="text-base md:text-lg px-6 md:px-8 py-4 md:py-6 border-2 border-white bg-white/10 backdrop-blur-md text-white hover:bg-white hover:text-primary transition-all shadow-lg hover:shadow-xl" 
            asChild
          >
            <a href="https://t.me/docdialogs_bot" target="_blank" rel="noopener noreferrer">
              <Icon name="MessageCircle" size={18} className="mr-2" />
              Задать вопрос
            </a>
          </Button>
        </div>

        <div className="inline-flex items-center gap-2 md:gap-3 bg-white/15 backdrop-blur-md px-4 md:px-6 py-2 md:py-3 rounded-full text-white border border-white/20 shadow-lg">
          <Icon name="Shield" size={16} className="md:scale-110" />
          <span className="text-xs md:text-sm font-medium">Гарантия качества от экосистемы Док диалог</span>
        </div>
      </div>
    </section>
  );
};

export default BrandCourseResults;