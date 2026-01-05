import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function SchoolsHeader() {
  const navigate = useNavigate();

  return (
    <header className="border-b sticky top-0 bg-background/95 backdrop-blur-md z-50 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between gap-4">
        <div className="cursor-pointer flex-shrink-0" onClick={() => navigate('/')}>
          <img src="https://cdn.poehali.dev/files/Group 7 (6).png" alt="Док диалог" className="h-8 sm:h-10" />
        </div>
        <nav className="hidden lg:flex items-center gap-8">
          <button onClick={() => navigate('/')} className="text-sm font-medium hover:text-primary transition-colors">
            Главная
          </button>
          <button onClick={() => navigate('/about')} className="text-sm font-medium hover:text-primary transition-colors">
            О нас
          </button>
          <button onClick={() => navigate('/schools')} className="text-sm font-medium hover:text-primary transition-colors">
            Школы
          </button>
          <button onClick={() => navigate('/courses')} className="text-sm font-medium hover:text-primary transition-colors">
            Курсы
          </button>
          <button onClick={() => window.location.href = 'mailto:info@dokdialog.ru'} className="text-sm font-medium hover:text-primary transition-colors">
            Написать нам
          </button>
        </nav>
        <div className="flex items-center gap-2 sm:gap-4">
          <Button variant="ghost" size="sm" onClick={() => navigate('/login')} className="text-sm">
            Войти
          </Button>
          <Button size="sm" onClick={() => navigate('/register/school')} className="text-sm hidden sm:inline-flex">
            Разместить школу
          </Button>
          <Button size="sm" onClick={() => navigate('/register/school')} className="text-sm sm:hidden">
            Начать
          </Button>
        </div>
      </div>
    </header>
  );
}
