import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

export default function EnergyCourseHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-indigo-950 via-purple-900 to-slate-900 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.3),transparent_50%),radial-gradient(circle_at_80%_80%,rgba(168,85,247,0.2),transparent_50%)]"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-24 lg:py-28 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 backdrop-blur-xl rounded-full mb-8 border border-white/20 shadow-lg hover:bg-white/15 transition-all duration-300">
              <Icon name="Sparkles" size={20} className="text-yellow-300" />
              <span className="text-sm sm:text-base font-medium tracking-wide">Практический офлайн-курс</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 sm:mb-8 leading-[1.1] tracking-tight">
              <span className="bg-gradient-to-r from-white via-purple-100 to-indigo-200 bg-clip-text text-transparent">
                Энергия практикующего
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-4 sm:mb-6 text-purple-200 font-light leading-relaxed px-4">
              Телесно-энергетическая регуляция и работа с энергетическим двойником
            </p>
            
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/80 max-w-4xl mx-auto mb-10 sm:mb-12 leading-relaxed px-4 font-light">
              Для массажистов, телесных терапевтов, остеопатов и целителей, которые хотят работать глубже, дольше и стабильнее — без выгорания и потери энергии
            </p>

            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6 mb-10 sm:mb-12 text-sm sm:text-base px-4">
              {[
                { icon: 'Calendar', text: '2 дня' },
                { icon: 'MapPin', text: 'Офлайн' },
                { icon: 'Target', text: '70% практика' },
                { icon: 'Users', text: 'До 12 человек' }
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 bg-white/5 backdrop-blur-md rounded-full border border-white/10 hover:bg-white/10 transition-all duration-300">
                  <Icon name={item.icon as any} size={18} className="text-purple-300" />
                  <span className="font-medium">{item.text}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 max-w-2xl mx-auto mb-12 sm:mb-16 px-4">
              <Button 
                size="lg"
                className="w-full sm:flex-1 text-base sm:text-lg md:text-xl px-6 sm:px-8 py-6 sm:py-7 md:py-8 bg-white text-indigo-900 hover:bg-gray-50 shadow-2xl hover:shadow-white/50 transition-all duration-300 hover:scale-105 font-semibold"
                onClick={() => window.open('https://school.brossok.ru/buy/61', '_blank')}
              >
                <Icon name="Rocket" size={22} className="mr-2" />
                Записаться на курс
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="w-full sm:flex-1 text-base sm:text-lg md:text-xl px-6 sm:px-8 py-6 sm:py-7 md:py-8 border-2 border-white bg-white/5 backdrop-blur-xl text-white hover:bg-white/15 shadow-lg transition-all duration-300 hover:scale-105 font-semibold"
                onClick={() => document.getElementById('program')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Icon name="BookOpen" size={22} className="mr-2" />
                Узнать программу
              </Button>
            </div>

            <div className="w-full max-w-5xl mx-auto rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border-2 sm:border-4 border-white/20 relative group">
              <img 
                src="https://cdn.poehali.dev/files/02f130bb-5051-42e9-9e85-9687d255c359.jpg" 
                alt="Энергия в руках" 
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/40 via-transparent to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}