import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const VNSHero = () => {
  return (
    <section className="relative pt-20 md:pt-32 pb-12 md:pb-20 px-4 overflow-hidden">
      <div className="absolute inset-0">
        <img 
          src="https://cdn.poehali.dev/projects/3e596a93-af99-49a5-ab3f-15835165eb7b/files/792debd4-24e6-4d4c-b926-a60e2e2fa306.jpg" 
          alt="Регуляция ВНС"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/85 via-purple-600/85 to-blue-700/85">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDE0YzAtNi42MjcgNS4zNzMtMTIgMTItMTJzMTIgNS4zNzMgMTIgMTItNS4zNzMgMTItMTIgMTItMTItNS4zNzMtMTItMTJ6TTAgMTRjMC02LjYyNyA1LjM3My0xMiAxMi0xMnMxMiA1LjM3MyAxMiAxMi01LjM3MyAxMi0xMiAxMi0xMi01LjM3My0xMi0xMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-40"></div>
        </div>
      </div>
      
      <div className="container mx-auto max-w-5xl relative z-10">
        <div className="text-center">
          <div className="inline-block mb-3 md:mb-4 px-3 md:px-4 py-1.5 md:py-2 bg-white/20 backdrop-blur-sm rounded-full text-xs md:text-sm font-medium text-white shadow-lg">
            Профессиональный онлайн-курс
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-4 md:mb-6 leading-tight text-white drop-shadow-2xl">
            Регуляция ВНС
          </h1>
          
          <p className="text-base md:text-lg lg:text-2xl mb-6 md:mb-8 text-white/95 max-w-3xl mx-auto leading-relaxed drop-shadow-lg">
            Системное понимание вегетативной нервной системы для массажистов и телесных практиков
          </p>

          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center mb-8 md:mb-12">
            <Button size="lg" className="text-base md:text-lg px-6 md:px-8 py-4 md:py-6 bg-white text-indigo-600 hover:bg-gray-100 shadow-2xl hover:shadow-3xl transition-all font-semibold" asChild>
              <a href="https://school.brossok.ru/buy/42" target="_blank" rel="noopener noreferrer">
                <Icon name="Play" size={18} className="mr-2" />
                Записаться на курс
              </a>
            </Button>
            <Button size="lg" variant="outline" className="text-base md:text-lg px-6 md:px-8 py-4 md:py-6 border-2 border-white bg-white/15 backdrop-blur-md text-white hover:bg-white hover:text-indigo-600 transition-all font-semibold" asChild>
              <a href="https://t.me/docdialogs_bot" target="_blank" rel="noopener noreferrer">
                <Icon name="MessageCircle" size={18} className="mr-2" />
                Узнать подробнее
              </a>
            </Button>
          </div>

          <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-xs md:text-sm text-white/90 font-medium">
            <div className="flex items-center gap-2">
              <Icon name="Brain" size={14} />
              <span>Нейрофизиология</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="Waves" size={14} />
              <span>Остеопатический подход</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="Target" size={14} />
              <span>Практика без «воды»</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VNSHero;