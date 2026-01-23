import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const BrandCourseHero = () => {
  return (
    <section className="relative pt-24 md:pt-32 pb-12 md:pb-20 px-4 overflow-hidden">
      <div className="absolute inset-0">
        <img 
          src="https://cdn.poehali.dev/files/senior-woman-taking-online-class-her-tablet.jpg" 
          alt="Онлайн-обучение" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/95 via-purple-600/90 to-pink-600/95">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMC41IiBvcGFjaXR5PSIwLjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>
        </div>
      </div>
      
      <div className="container mx-auto max-w-5xl relative z-10">
        <div className="text-center">
          <div className="inline-block mb-3 md:mb-4 px-3 md:px-4 py-1.5 md:py-2 bg-white/20 backdrop-blur-sm rounded-full text-xs md:text-sm font-medium text-white shadow-lg">
            Онлайн-курс
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 md:mb-6 leading-tight text-white drop-shadow-lg">
            Массажист 2.0: Создание личного бренда
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 md:mb-8 text-white/95 max-w-3xl mx-auto drop-shadow-md">
            Практический онлайн-курс для массажистов, которые хотят перестать зависеть от сарафанного радио и создать устойчивый поток клиентов
          </p>

          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center mb-8 md:mb-12">
            <Button size="lg" className="text-base md:text-lg px-6 md:px-8 py-4 md:py-6 bg-white text-primary hover:bg-gray-100 shadow-xl hover:shadow-2xl transition-all hover:scale-105" asChild>
              <a href="https://school.brossok.ru/training/view/-laquo-massaghist-2-0-sozdanie-i-prodvighenie-lichnogo-brenda-raquo-" target="_blank" rel="noopener noreferrer">
                <Icon name="Rocket" size={18} className="mr-2" />
                Начать обучение бесплатно
              </a>
            </Button>
            <Button size="lg" variant="outline" className="text-base md:text-lg px-6 md:px-8 py-4 md:py-6 border-2 border-white bg-white/10 backdrop-blur-md text-white hover:bg-white hover:text-primary shadow-lg hover:shadow-xl transition-all" asChild>
              <a href="https://t.me/docdialogs_bot" target="_blank" rel="noopener noreferrer">
                <Icon name="MessageCircle" size={18} className="mr-2" />
                Узнать подробнее
              </a>
            </Button>
          </div>

          <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-xs md:text-sm text-white/90">
            <div className="flex items-center gap-1.5 md:gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-md">
              <Icon name="TrendingUp" size={14} />
              <span>Системный маркетинг</span>
            </div>
            <div className="flex items-center gap-1.5 md:gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-md">
              <Icon name="Target" size={14} />
              <span>Личный бренд</span>
            </div>
            <div className="flex items-center gap-1.5 md:gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-md">
              <Icon name="BarChart3" size={14} />
              <span>Аналитика и KPI</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandCourseHero;