import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { useNavigate } from "react-router-dom";

export default function MasseursHero() {
  const navigate = useNavigate();

  return (
    <section className="relative py-20 sm:py-28 lg:py-36 animate-fade-in overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-primary/5"></div>
      <div 
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage: `url('https://cdn.poehali.dev/projects/3e596a93-af99-49a5-ab3f-15835165eb7b/files/bcea1f53-5ab3-4409-b39b-afa0d3413084.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      ></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 backdrop-blur-sm px-5 py-2 rounded-full mb-6 animate-fade-in border border-primary/20">
            <Icon name="TrendingUp" className="text-primary" size={18} />
            <span className="text-sm font-semibold text-primary">Платформа для роста профессионалов</span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 sm:mb-7 leading-tight bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent animate-fade-in [animation-delay:100ms] px-2">
            Развивайтесь как специалист.<br className="hidden sm:block" />
            Зарабатывай достойно.
          </h1>
          
          <p className="text-xl sm:text-2xl lg:text-3xl text-muted-foreground mb-10 leading-relaxed animate-fade-in [animation-delay:200ms] px-4 max-w-4xl mx-auto">
            Док диалог — экосистема для специалистов по телу, где вы учитесь у лучших школ, получаете клиентов и растёте в профессии.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-fade-in [animation-delay:300ms]">
            <Button 
              size="lg" 
              className="text-lg px-10 py-7 shadow-xl hover:shadow-2xl transition-all duration-300 bg-gradient-to-r from-primary to-primary/90 w-full sm:w-auto"
              onClick={() => navigate('/register')}
            >
              Начать развитие бесплатно
              <Icon name="Sparkles" size={22} className="ml-2" />
            </Button>
            <Button 
              size="lg"
              variant="outline" 
              className="text-lg px-10 py-7 w-full sm:w-auto border-2"
              onClick={() => navigate('/courses')}
            >
              Смотреть курсы
              <Icon name="GraduationCap" size={22} className="ml-2" />
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-6 sm:gap-8 max-w-3xl mx-auto animate-fade-in [animation-delay:400ms]">
            {[
              { number: "50+", label: "Школ-партнёров" },
              { number: "200+", label: "Курсов" },
              { number: "3000+", label: "Специалистов" },
            ].map((stat, index) => (
              <div key={index} className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-lg border border-primary/10">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary mb-1">{stat.number}</div>
                <div className="text-xs sm:text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}