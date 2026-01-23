import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

export default function EnergyCourseHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 text-white">
      <div className="container mx-auto px-4 py-12 md:py-20 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full mb-6 border border-white/20">
              <Icon name="Sparkles" size={20} className="text-yellow-300" />
              <span className="text-sm font-medium">Практический офлайн-курс</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Энергия практикующего
            </h1>
            
            <p className="text-xl md:text-2xl mb-4 text-purple-200">
              Телесно-энергетическая регуляция и работа с энергетическим двойником
            </p>
            
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto mb-8">
              Для массажистов, телесных терапевтов, остеопатов и целителей, которые хотят работать глубже, дольше и стабильнее — без выгорания и потери энергии
            </p>

            <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-8 text-sm md:text-base">
              <div className="flex items-center gap-2">
                <Icon name="Calendar" size={20} className="text-purple-300" />
                <span>2 дня</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="MapPin" size={20} className="text-purple-300" />
                <span>Офлайн</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Target" size={20} className="text-purple-300" />
                <span>70% практика</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Users" size={20} className="text-purple-300" />
                <span>Ограниченная группа</span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto mb-10">
              <Button 
                size="lg"
                className="text-lg px-8 py-6 bg-white text-indigo-900 hover:bg-gray-100 shadow-2xl hover:shadow-white/50 transition-all"
                onClick={() => window.open('https://t.me/docdialog', '_blank')}
              >
                <Icon name="Rocket" size={22} className="mr-2" />
                Записаться на курс
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6 border-2 border-white bg-white/10 backdrop-blur-md text-white hover:bg-white/20 shadow-lg"
                onClick={() => document.getElementById('program')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Icon name="BookOpen" size={22} className="mr-2" />
                Узнать программу
              </Button>
            </div>

            <div className="w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-2xl border-2 border-white/30 relative">
              <img 
                src="https://cdn.poehali.dev/files/02f130bb-5051-42e9-9e85-9687d255c359.jpg" 
                alt="Энергия в руках" 
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-black/20"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
