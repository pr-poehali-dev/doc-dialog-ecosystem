import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const BrandCourseHero = () => {
  return (
    <section className="relative pt-32 pb-20 px-4 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/95 via-purple-600/90 to-pink-600/95"></div>
      </div>
      
      <div className="container mx-auto max-w-5xl relative z-10">
        <div className="text-center">
          <div className="inline-block mb-4 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium text-white">
            Онлайн-курс
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-white">
            Массажист 2.0: Создание личного бренда
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto">
            Практический онлайн-курс для массажистов, которые хотят перестать зависеть от сарафанного радио и создать устойчивый поток клиентов
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="text-lg px-8 py-6 bg-white text-primary hover:bg-gray-100" asChild>
              <a href="https://school.brossok.ru/buy/51" target="_blank" rel="noopener noreferrer">
                <Icon name="Rocket" size={20} className="mr-2" />
                Записаться на курс
              </a>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-2 border-white bg-transparent text-white hover:bg-white hover:text-primary" asChild>
              <a href="https://t.me/docdialogs_bot" target="_blank" rel="noopener noreferrer">
                <Icon name="MessageCircle" size={20} className="mr-2" />
                Узнать подробнее
              </a>
            </Button>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-sm text-white/80">
            <div className="flex items-center gap-2">
              <Icon name="TrendingUp" size={16} />
              <span>Системный маркетинг</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="Target" size={16} />
              <span>Личный бренд</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="BarChart3" size={16} />
              <span>Аналитика и KPI</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandCourseHero;
