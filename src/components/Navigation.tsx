import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

interface NavigationProps {
  scrollToSection: (id: string) => void;
}

const Navigation = ({ scrollToSection }: NavigationProps) => {
  return (
    <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="https://cdn.poehali.dev/projects/3e596a93-af99-49a5-ab3f-15835165eb7b/files/f50c4eb3-02b6-4ce7-99bf-8853b24d1740.jpg" alt="Док диалог" className="h-10" />
          </div>
          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollToSection('education')} className="text-sm font-medium hover:text-primary transition-colors">
              Образование
            </button>
            <button onClick={() => scrollToSection('tools')} className="text-sm font-medium hover:text-primary transition-colors">
              Инструменты
            </button>
            <button onClick={() => scrollToSection('community')} className="text-sm font-medium hover:text-primary transition-colors">
              Сообщество
            </button>
            <button onClick={() => scrollToSection('jobs')} className="text-sm font-medium hover:text-primary transition-colors">
              Вакансии
            </button>
            <button onClick={() => scrollToSection('about')} className="text-sm font-medium hover:text-primary transition-colors">
              О платформе
            </button>
          </div>
          <Button>Войти</Button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;