import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const BasicsMassageCTA = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Готовы начать обучение?
          </h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Получите системные знания массажа и начните профессиональную практику
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-6 bg-white text-primary hover:bg-gray-100" asChild>
              <a href="https://t.me/docdialogs_bot" target="_blank" rel="noopener noreferrer">
                <Icon name="Play" size={20} className="mr-2" />
                Начать обучение
              </a>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-2 border-white bg-transparent text-white hover:bg-white hover:text-primary" asChild>
              <a href="https://t.me/docdialogs_bot" target="_blank" rel="noopener noreferrer">
                <Icon name="MessageCircle" size={20} className="mr-2" />
                Задать вопрос
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BasicsMassageCTA;
