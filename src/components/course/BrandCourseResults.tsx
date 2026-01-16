import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const BrandCourseResults = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600">
      <div className="container mx-auto max-w-4xl text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
          Готовы перейти на новый уровень?
        </h2>
        
        <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto">
          Перестаньте зависеть от случайных клиентов. Создайте систему, которая работает на вас.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button 
            size="lg" 
            className="text-lg px-8 py-6 bg-white text-primary hover:bg-gray-100 hover:scale-105 transition-transform" 
            asChild
          >
            <a href="https://school.brossok.ru/buy/51" target="_blank" rel="noopener noreferrer">
              <Icon name="Rocket" size={20} className="mr-2" />
              Записаться на курс
            </a>
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="text-lg px-8 py-6 border-2 border-white bg-transparent text-white hover:bg-white hover:text-primary transition-all" 
            asChild
          >
            <a href="https://t.me/docdialogs_bot" target="_blank" rel="noopener noreferrer">
              <Icon name="MessageCircle" size={20} className="mr-2" />
              Задать вопрос
            </a>
          </Button>
        </div>

        <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full text-white">
          <Icon name="Shield" size={20} />
          <span className="text-sm font-medium">Гарантия качества от экосистемы Док диалог</span>
        </div>
      </div>
    </section>
  );
};

export default BrandCourseResults;
