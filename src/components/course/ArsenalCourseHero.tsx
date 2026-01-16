import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const ArsenalCourseHero = () => {
  return (
    <section className="relative pt-32 pb-20 px-4 bg-gradient-to-br from-primary via-purple-600 to-indigo-700 text-white overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLW9wYWNpdHk9Ii4wNSIvPjwvZz48L3N2Zz4=')] opacity-30"></div>
      
      <div className="container mx-auto max-w-5xl relative z-10">
        <div className="text-center">
          <div className="inline-block mb-4 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
            Онлайн-курс
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Арсенал массажиста
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto">
            Практический онлайн-курс для массажистов и телесных специалистов, которые хотят работать глубже, безопаснее и результативнее
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="text-lg px-8 py-6 bg-white text-primary hover:bg-gray-100" asChild>
              <a href="https://school.brossok.ru/buy/55" target="_blank" rel="noopener noreferrer">
                <Icon name="Play" size={20} className="mr-2" />
                Записаться на курс
              </a>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-2 border-white bg-transparent text-white hover:bg-white hover:text-primary" asChild>
              <a href="https://t.me/docdialogs_bot" target="_blank" rel="noopener noreferrer">
                <Icon name="Info" size={20} className="mr-2" />
                Узнать подробнее
              </a>
            </Button>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-sm text-white/80">
            <div className="flex items-center gap-2">
              <Icon name="Clock" size={16} />
              <span>6 модулей</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="Video" size={16} />
              <span>Видеоразборы техник</span>
            </div>
            <div className="flex items-center gap-2">
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
