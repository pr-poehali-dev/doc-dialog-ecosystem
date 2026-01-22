import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const CorrectionHero = () => {
  return (
    <section className="relative pt-20 md:pt-32 pb-12 md:pb-20 px-4 overflow-hidden">
      <div className="absolute inset-0">
        <img 
          src="https://cdn.poehali.dev/files/masseur-doing-manual-massage-client-spa-beauty-salon-using-oil.jpg" 
          alt="Коррекция фигуры"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-rose-600/70 via-pink-600/70 to-fuchsia-700/70"></div>
      </div>
      
      <div className="container mx-auto max-w-5xl relative z-10">
        <div className="text-center">
          <div className="inline-block mb-3 md:mb-4 px-3 md:px-4 py-1.5 md:py-2 bg-white/20 backdrop-blur-sm rounded-full text-xs md:text-sm font-medium text-white">
            Онлайн-курс
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-4 md:mb-6 leading-tight text-white drop-shadow-2xl">
            Коррекция фигуры
          </h1>
          
          <p className="text-base md:text-lg lg:text-2xl mb-6 md:mb-8 text-white/95 max-w-3xl mx-auto leading-relaxed drop-shadow-lg">
            Практический курс для массажистов и телесных специалистов, которые хотят работать с формой тела осознанно
          </p>

          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center mb-8 md:mb-12">
            <Button size="lg" className="text-base md:text-lg px-6 md:px-8 py-4 md:py-6 bg-white text-rose-600 hover:bg-gray-100 shadow-xl hover:shadow-2xl transition-all" asChild>
              <a href="https://school.brossok.ru/buy/43" target="_blank" rel="noopener noreferrer">
                <Icon name="Play" size={18} className="mr-2" />
                Записаться на курс
              </a>
            </Button>
            <Button size="lg" variant="outline" className="text-base md:text-lg px-6 md:px-8 py-4 md:py-6 border-2 border-white bg-white/10 backdrop-blur-sm text-white hover:bg-white hover:text-rose-600 transition-all" asChild>
              <a href="https://t.me/docdialogs_bot" target="_blank" rel="noopener noreferrer">
                <Icon name="MessageCircle" size={18} className="mr-2" />
                Узнать подробнее
              </a>
            </Button>
          </div>

          <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-xs md:text-sm text-white/90">
            <div className="flex items-center gap-2">
              <Icon name="Target" size={14} />
              <span>Работа с формой тела</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="TrendingUp" size={14} />
              <span>Рост дохода специалиста</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="Users" size={14} />
              <span>Поток клиентов без рекламы</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CorrectionHero;