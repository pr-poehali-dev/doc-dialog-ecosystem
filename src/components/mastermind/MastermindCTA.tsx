import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const MastermindCTA = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600">
      <div className="container mx-auto max-w-4xl text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
          Остались вопросы?
        </h2>
        
        <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto">
          Напишите нам в Telegram — поможем выбрать формат и ответим на все вопросы
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button 
            size="lg" 
            className="text-lg px-8 py-6 bg-white text-primary hover:bg-gray-100 hover:scale-105 transition-transform" 
            asChild
          >
            <a href="https://t.me/docdialogs_bot" target="_blank" rel="noopener noreferrer">
              <Icon name="MessageCircle" size={20} className="mr-2" />
              Написать в Telegram
            </a>
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="text-lg px-8 py-6 border-2 border-white bg-transparent text-white hover:bg-white hover:text-primary transition-all" 
            asChild
          >
            <a href="https://t.me/docdialogs_bot" target="_blank" rel="noopener noreferrer">
              <Icon name="Calendar" size={20} className="mr-2" />
              Забронировать место
            </a>
          </Button>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 max-w-2xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <div className="p-3 bg-white/20 backdrop-blur-sm rounded-full">
              <Icon name="Clock" size={32} className="text-white" />
            </div>
            <div className="text-left">
              <p className="text-lg font-bold text-white mb-1">Места ограничены!</p>
              <p className="text-white/90">Не упустите возможность попасть на мастермайнд</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MastermindCTA;
