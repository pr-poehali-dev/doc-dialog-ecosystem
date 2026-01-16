import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const VNSHero = () => {
  return (
    <section className="relative pt-32 pb-20 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/95 via-purple-600/90 to-blue-700/95"></div>
      
      <div className="container mx-auto max-w-5xl relative z-10">
        <div className="text-center">
          <div className="inline-block mb-4 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium text-white">
            Профессиональный онлайн-курс
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-white">
            Регуляция ВНС
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto">
            Системное понимание вегетативной нервной системы для массажистов и телесных практиков
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="text-lg px-8 py-6 bg-white text-primary hover:bg-gray-100" asChild>
              <a href="https://school.brossok.ru/buy/42" target="_blank" rel="noopener noreferrer">
                <Icon name="Play" size={20} className="mr-2" />
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
              <Icon name="Brain" size={16} />
              <span>Нейрофизиология</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="Waves" size={16} />
              <span>Остеопатический подход</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="Target" size={16} />
              <span>Практика без «воды»</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VNSHero;