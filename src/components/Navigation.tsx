import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface NavigationProps {
  scrollToSection?: (id: string) => void;
}

export const Navigation = ({ scrollToSection }: NavigationProps) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const isLoggedIn = !!localStorage.getItem('token');
  
  // Проверяем, вошли ли мы от имени другого пользователя
  const userStr = localStorage.getItem('user');
  const isImpersonating = userStr ? JSON.parse(userStr).is_impersonating : false;
  const originalAdminEmail = userStr ? JSON.parse(userStr).original_admin_email : null;

  const handleReturnToAdmin = () => {
    // Восстанавливаем данные админа
    const adminUser = localStorage.getItem('admin_backup_user');
    const adminToken = localStorage.getItem('admin_backup_token');
    
    if (adminUser) {
      localStorage.setItem('user', adminUser);
      localStorage.removeItem('admin_backup_user');
    }
    if (adminToken) {
      localStorage.setItem('token', adminToken);
      localStorage.removeItem('admin_backup_token');
    }
    
    // Переходим в админку
    window.location.href = '/admin';
  };

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
                <Link to="/schools" className="text-sm font-medium hover:text-primary transition-colors">
                  Школы
                </Link>
                <Link to="/courses" className="text-sm font-medium hover:text-primary transition-colors">
                  Курсы
                </Link>
                <Link to="/salons" className="text-sm font-medium hover:text-primary transition-colors">
                  Салоны
                </Link>
              </>
            )}
          </div>
          <div className="flex items-center gap-2">
            {isImpersonating && (
              <Button 
                variant="destructive" 
                size="sm"
                onClick={handleReturnToAdmin}
                className="mr-2"
              >
                ← Вернуться в админку ({originalAdminEmail})
              </Button>
            )}
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