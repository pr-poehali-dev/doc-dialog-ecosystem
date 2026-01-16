import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const ArsenalCourseResults = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-primary via-purple-600 to-indigo-700 text-white">
      <div className="container mx-auto max-w-4xl text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Готовы вывести свою практику на новый уровень?
        </h2>
        <p className="text-xl mb-8 text-white/90">
          Присоединяйтесь к курсу и начните работать глубже, безопаснее и результативнее
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg" 
            className="text-lg px-8 py-6 bg-white text-primary hover:bg-gray-100"
            asChild
          >
            <a href="https://school.brossok.ru/buy/55" target="_blank" rel="noopener noreferrer">
              <Icon name="Play" size={20} className="mr-2" />
              Записаться на курс
            </a>
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="text-lg px-8 py-6 border-2 border-white bg-transparent text-white hover:bg-white hover:text-primary transition-colors"
            asChild
          >
            <a href="https://t.me/docdialogs_bot" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center text-white hover:text-primary">
              <Icon name="MessageCircle" size={20} className="mr-2" />
              <span>Задать вопрос</span>
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ArsenalCourseResults;
