import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import Icon from "@/components/ui/icon";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function SchoolsHeader() {
  const location = useLocation();
  const isLoggedIn = !!localStorage.getItem('token');
  const [isOpen, setIsOpen] = useState(false);

  const loggedInMenuItems = [
    { label: "Главная", path: "/" },
    { label: "Специалисты", path: "/masseurs" },
    { label: "Вакансии", path: "/vacancies" },
    { label: "Курсы", path: "/courses" },
    { label: "Центры", path: "/salons" },
    { label: "О платформе", path: "/about" },
  ];

  const otherPagesMenuItems = [
    { label: "Главная", path: "/" },
    { label: "Образование", path: "/courses" },
    { label: "Инструменты", path: "/dashboard" },
    { label: "Сообщество", path: "/masseurs" },
    { label: "О платформе", path: "/about" },
  ];

  const handleMenuClick = (action: () => void) => {
    action();
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img src="https://cdn.poehali.dev/files/Group 7 (6).png" alt="Док диалог" className="h-10" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {(isLoggedIn ? loggedInMenuItems : otherPagesMenuItems).map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="px-2">
                  <Icon name="Menu" size={24} />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] sm:w-[320px] overflow-y-auto">
                <div className="flex flex-col h-full py-4">
                  <div className="flex flex-col gap-1 flex-1">
                    {(isLoggedIn ? loggedInMenuItems : otherPagesMenuItems).map((item, index) => (
                      <Link
                        key={index}
                        to={item.path}
                        onClick={() => setIsOpen(false)}
                        className="text-left py-2.5 px-3 text-sm font-medium hover:bg-muted rounded-lg transition-colors"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                  <div className="border-t pt-3 mt-3 flex flex-col gap-2">
                    {isLoggedIn ? (
                      <Button
                        onClick={() => handleMenuClick(() => window.location.href = '/dashboard')}
                        className="w-full h-9"
                        size="sm"
                      >
                        Личный кабинет
                      </Button>
                    ) : (
                      <>
                        <Button
                          variant="ghost"
                          onClick={() => handleMenuClick(() => window.location.href = '/login')}
                          className="w-full justify-start h-9"
                          size="sm"
                        >
                          Войти
                        </Button>
                        <Button
                          onClick={() => handleMenuClick(() => window.location.href = '/register')}
                          className="w-full h-9"
                          size="sm"
                        >
                          Регистрация
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center gap-2">
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
}