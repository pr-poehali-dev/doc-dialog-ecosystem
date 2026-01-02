import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface NavigationProps {
  scrollToSection?: (id: string) => void;
}

export const Navigation = ({ scrollToSection }: NavigationProps) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const isLoggedIn = !!localStorage.getItem('token');

  return (
    <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img src="https://cdn.poehali.dev/files/Group 7 (6).png" alt="Док диалог" className="h-10" />
          </Link>
          <div className="hidden md:flex items-center gap-8">
            {isHomePage && scrollToSection ? (
              <>
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
              </>
            ) : (
              <>
                <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">
                  Главная
                </Link>
                <Link to="/masseurs" className="text-sm font-medium hover:text-primary transition-colors">
                  Массажисты
                </Link>
                <Link to="/courses" className="text-sm font-medium hover:text-primary transition-colors">
                  Курсы
                </Link>
                <Link to="/about" className="text-sm font-medium hover:text-primary transition-colors">
                  О проекте
                </Link>
                <Link to="/pricing" className="text-sm font-medium hover:text-primary transition-colors">
                  Тарифы
                </Link>
              </>
            )}
          </div>
          <div className="flex items-center gap-2">
            {isLoggedIn ? (
              <Link to="/dashboard">
                <Button>Личный кабинет</Button>
              </Link>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost">Войти</Button>
                </Link>
                <Link to="/register">
                  <Button>Регистрация</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};