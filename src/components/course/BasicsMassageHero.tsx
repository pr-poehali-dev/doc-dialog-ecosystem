import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const BasicsMassageHero = () => {
  return (
    <section className="relative pt-24 md:pt-32 pb-12 md:pb-20 px-4 overflow-hidden">
      <div className="absolute inset-0">
        <img 
          src="https://cdn.poehali.dev/files/young-woman-having-face-massage-relaxing-spa-salon.jpg" 
          alt="Массаж лица" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/70 via-indigo-600/70 to-purple-700/70"></div>
      </div>
      
      <div className="container mx-auto max-w-5xl relative z-10">
        <div className="text-center">
          <div className="inline-block mb-4 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium text-white">
            Онлайн-курс
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 md:mb-6 leading-tight text-white">
            Основы массажа: Первые шаги
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 md:mb-8 text-white/90 max-w-3xl mx-auto">
            Системный онлайн-курс для тех, кто хочет освоить массаж с нуля или выстроить прочный фундамент для дальнейшего профессионального роста
          </p>

          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center mb-8 md:mb-12">
            <Button size="lg" className="text-base md:text-lg px-6 md:px-8 py-4 md:py-6 bg-white text-primary hover:bg-gray-100" asChild>
              <a href="https://school.brossok.ru/buy/15" target="_blank" rel="noopener noreferrer">
                <Icon name="Play" size={20} className="mr-2" />
                Начать обучение
              </a>
            </Button>
            <Button size="lg" variant="outline" className="text-base md:text-lg px-6 md:px-8 py-4 md:py-6 border-2 border-white bg-transparent text-white hover:bg-white hover:text-primary" asChild>
              <a href="https://t.me/docdialogs_bot" target="_blank" rel="noopener noreferrer">
                <Icon name="MessageCircle" size={20} className="mr-2" />
                Узнать подробнее
              </a>
            </Button>
          </div>

          <div className="flex flex-wrap justify-center gap-3 md:gap-6 text-xs sm:text-sm text-white/80">
            <div className="flex items-center gap-1.5 md:gap-2">
              <Icon name="Clock" size={16} />
              <span>Онлайн-доступ 24/7</span>
            </div>
            <div className="flex items-center gap-1.5 md:gap-2">
              <Icon name="Video" size={16} />
              <span>Теория + практика</span>
            </div>
            <div className="flex items-center gap-1.5 md:gap-2">
              <Icon name="Award" size={16} />
              <span>Подходит с нуля</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BasicsMassageHero;