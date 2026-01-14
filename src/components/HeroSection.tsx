import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";

type UserType = 'masseur' | 'school' | 'salon' | null;

interface HeroSectionProps {
  openDialog: (type: UserType) => void;
}

const HeroSection = ({ openDialog }: HeroSectionProps) => {
  const navigate = useNavigate();

  return (
    <section className="relative py-20 md:py-32 animate-fade-in overflow-hidden bg-gradient-to-br from-slate-50 via-slate-100/30 to-slate-50">
      {/* Network pattern background */}
      <div 
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage: `url('https://cdn.poehali.dev/files/17976.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      ></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-primary/10 mb-8">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-muted-foreground">Профессиональная экосистема</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight bg-gradient-to-r from-slate-900 via-primary to-slate-900 bg-clip-text text-transparent">
            Для массажистов, школ массажа и салонов
          </h1>
          
          <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
            Обучение, инструменты, практика и карьерный рост — 
            <br className="hidden md:block" />
            в одном пространстве для массажистов
          </p>

          <div className="flex flex-col items-center gap-6">
            <div className="flex flex-wrap gap-4 justify-center">
              <Button 
                size="lg" 
                className="text-lg px-8 shadow-lg hover:shadow-xl transition-all" 
                onClick={() => navigate('/for-specialists')}
              >
                Я массажист
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-8 bg-white/80 backdrop-blur-sm hover:bg-primary hover:text-white border-primary text-primary transition-all" 
                onClick={() => navigate('/schools-info')}
              >
                Я школа
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-8 bg-white/80 backdrop-blur-sm hover:bg-secondary hover:text-white border-secondary text-secondary transition-all" 
                onClick={() => navigate('/salons-info')}
              >
                Я салон
              </Button>
            </div>
            
            <Link to="/medical-report" className="flex flex-col items-center gap-2">
              <Button size="lg" variant="secondary" className="text-lg px-8 bg-secondary text-white hover:bg-secondary/90 shadow-md hover:shadow-lg transition-all">
                <Icon name="FileText" size={20} className="mr-2" />
                Понять заключение врача
              </Button>
              <p className="text-sm text-muted-foreground text-center max-w-xs">
                ИИ объяснит МРТ, УЗИ и другие заключения простым языком
              </p>
            </Link>
          </div>

          <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">1000+</div>
              <div className="text-sm text-muted-foreground">Массажистов</div>
            </div>
            <div className="text-center border-x border-primary/10">
              <div className="text-3xl font-bold text-primary mb-2">50+</div>
              <div className="text-sm text-muted-foreground">Школ</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">200+</div>
              <div className="text-sm text-muted-foreground">Салонов</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;