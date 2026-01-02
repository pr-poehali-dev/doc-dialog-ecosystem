import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

type UserType = 'masseur' | 'school' | 'salon' | null;

interface HeroSectionProps {
  openDialog: (type: UserType) => void;
}

const HeroSection = ({ openDialog }: HeroSectionProps) => {
  return (
    <section className="relative py-20 md:py-32 animate-fade-in overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50">
      <div className="absolute inset-0 opacity-40">
        <svg className="absolute top-0 left-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-slate-200"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
        
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-200/20 rounded-full blur-3xl"></div>
      </div>

      <div className="absolute top-20 left-10 w-32 h-32 border border-primary/10 rounded-full"></div>
      <div className="absolute top-40 right-20 w-24 h-24 border border-primary/10 rounded-lg rotate-12"></div>
      <div className="absolute bottom-20 left-1/4 w-16 h-16 border border-primary/10 rounded-full"></div>

      <svg className="absolute top-1/3 right-1/3 w-64 h-64 opacity-5" viewBox="0 0 200 200">
        <line x1="50" y1="50" x2="150" y2="50" stroke="currentColor" strokeWidth="1" className="text-primary"/>
        <line x1="50" y1="100" x2="150" y2="100" stroke="currentColor" strokeWidth="1" className="text-primary"/>
        <line x1="50" y1="150" x2="150" y2="150" stroke="currentColor" strokeWidth="1" className="text-primary"/>
        <circle cx="50" cy="50" r="4" fill="currentColor" className="text-primary"/>
        <circle cx="150" cy="50" r="4" fill="currentColor" className="text-primary"/>
        <circle cx="100" cy="100" r="4" fill="currentColor" className="text-primary"/>
        <circle cx="50" cy="150" r="4" fill="currentColor" className="text-primary"/>
        <circle cx="150" cy="150" r="4" fill="currentColor" className="text-primary"/>
      </svg>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-primary/10 mb-8">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-muted-foreground">Профессиональная экосистема</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight bg-gradient-to-r from-slate-900 via-primary to-slate-900 bg-clip-text text-transparent">
            Для массажистов, школ и массажных салонов
          </h1>
          
          <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
            Обучение, инструменты, практика и карьерный рост — 
            <br className="hidden md:block" />
            в одном пространстве для специалистов массажа
          </p>

          <div className="flex flex-col items-center gap-6">
            <div className="flex flex-wrap gap-4 justify-center">
              <Button 
                size="lg" 
                className="text-lg px-8 shadow-lg hover:shadow-xl transition-all" 
                onClick={() => openDialog('masseur')}
              >
                Я массажист
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-8 bg-white/80 backdrop-blur-sm hover:bg-white" 
                onClick={() => openDialog('school')}
              >
                Я школа
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-8 bg-white/80 backdrop-blur-sm hover:bg-white" 
                onClick={() => openDialog('salon')}
              >
                Я салон
              </Button>
            </div>
            
            <Link to="/masseurs">
              <Button size="lg" variant="secondary" className="text-lg px-8 bg-white/80 backdrop-blur-sm hover:bg-white">
                <Icon name="Search" size={20} className="mr-2" />
                Найти массажиста
              </Button>
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