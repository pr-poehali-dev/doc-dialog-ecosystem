import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { useNavigate } from "react-router-dom";

export default function SchoolsHero() {
  const navigate = useNavigate();

  return (
    <section className="relative py-10 md:py-16 lg:py-24 animate-fade-in overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50/30"></div>
      <div 
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage: `url('https://cdn.poehali.dev/projects/3e596a93-af99-49a5-ab3f-15835165eb7b/files/6b773823-05e3-4d3a-922b-5b27a56101f1.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      ></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent animate-fade-in">
            Экосистема, которая приводит школам целевых учеников
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground mb-6 md:mb-8 leading-relaxed animate-fade-in [animation-delay:100ms] px-4">
            Док диалог — профессиональная среда для массажистов, где обучение становится логичным шагом развития, а не импульсной покупкой.
          </p>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6 lg:gap-8 mb-6 md:mb-10 text-sm sm:text-base animate-fade-in [animation-delay:200ms]">
            <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
              <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                <Icon name="Check" className="text-primary" size={16} />
              </div>
              <span className="font-medium">Без комиссий</span>
            </div>
            <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
              <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                <Icon name="Check" className="text-primary" size={16} />
              </div>
              <span className="font-medium">Без скидочного демпинга</span>
            </div>
            <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
              <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                <Icon name="Check" className="text-primary" size={16} />
              </div>
              <span className="font-medium">Без передачи платежей</span>
            </div>
          </div>
          <Button 
            size="lg" 
            className="text-base sm:text-lg px-6 sm:px-10 py-6 sm:py-7 animate-scale-in [animation-delay:300ms] shadow-xl hover:shadow-2xl transition-all duration-300 bg-gradient-to-r from-primary to-primary/90"
            onClick={() => navigate('/register/school')}
          >
            Разместить школу в экосистеме
          </Button>
        </div>
      </div>
    </section>
  );
}