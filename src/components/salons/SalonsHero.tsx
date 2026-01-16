import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { useNavigate } from "react-router-dom";

export default function SalonsHero() {
  const navigate = useNavigate();

  return (
    <section className="relative py-12 md:py-20 lg:py-28 animate-fade-in overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-secondary/5"></div>
      <div 
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: `url('https://cdn.poehali.dev/files/woman-getting-back-massage-from-female-masseur (1).jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      ></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-secondary/10 backdrop-blur-sm px-5 py-2 rounded-full mb-6 animate-fade-in border border-secondary/20">
            <Icon name="Building2" className="text-secondary" size={18} />
            <span className="text-sm font-semibold text-secondary">Для салонов красоты и здоровья</span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 md:mb-6 leading-tight bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent animate-fade-in [animation-delay:100ms] px-2">
            Найдите проверенных специалистов для вашего салона
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground mb-6 md:mb-8 leading-relaxed animate-fade-in [animation-delay:200ms] px-4 max-w-4xl mx-auto">
            Док диалог — база квалифицированных массажистов с подтверждённым образованием. Решаем проблему текучести кадров навсегда.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center mb-6 md:mb-10 animate-fade-in [animation-delay:300ms]">
            <Button 
              size="lg" 
              className="text-base sm:text-lg px-8 sm:px-10 py-6 sm:py-7 shadow-xl hover:shadow-2xl transition-all duration-300 bg-gradient-to-r from-secondary to-secondary/90 w-full sm:w-auto"
              onClick={() => navigate('/salon/cabinet')}
            >
              Разместить вакансию бесплатно
              <Icon name="Briefcase" size={20} className="ml-2" />
            </Button>
            <Button 
              size="lg"
              variant="outline" 
              className="text-base sm:text-lg px-8 sm:px-10 py-6 sm:py-7 w-full sm:w-auto border-2"
              onClick={() => navigate('/masseurs')}
            >
              Смотреть специалистов
              <Icon name="Users" size={20} className="ml-2" />
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-3 md:gap-4 lg:gap-6 max-w-3xl mx-auto animate-fade-in [animation-delay:400ms]">
            {[
              { number: "1000+", label: "Проверенных специалистов" },
              { number: "95%", label: "С сертификатами" },
              { number: "4.8/5", label: "Средний рейтинг" },
            ].map((stat, index) => (
              <div key={index} className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-lg border border-secondary/10">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-secondary mb-1">{stat.number}</div>
                <div className="text-xs sm:text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}