import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function SchoolsHeader() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { label: "Главная", onClick: () => navigate('/') },
    { label: "О нас", onClick: () => navigate('/about') },
    { label: "Школы", onClick: () => navigate('/schools') },
    { label: "Курсы", onClick: () => navigate('/courses') },
    { label: "Написать нам", onClick: () => window.location.href = 'mailto:info@dokdialog.ru' },
  ];

  const handleMenuClick = (onClick: () => void) => {
    onClick();
    setIsOpen(false);
  };

  return (
    <header className="border-b sticky top-0 bg-background/95 backdrop-blur-md z-50 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between gap-4">
        <div className="cursor-pointer flex-shrink-0" onClick={() => navigate('/')}>
          <img src="https://cdn.poehali.dev/files/Group 7 (6).png" alt="Док диалог" className="h-8 sm:h-10" />
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={item.onClick}
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Mobile Menu */}
        <div className="lg:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="px-2">
                <Icon name="Menu" size={24} />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] sm:w-[320px]">
              <div className="flex flex-col gap-6 mt-8">
                <div className="flex flex-col gap-4">
                  {menuItems.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => handleMenuClick(item.onClick)}
                      className="text-left py-3 px-4 text-base font-medium hover:bg-muted rounded-lg transition-colors"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
                <div className="border-t pt-6 flex flex-col gap-3">
                  <Button
                    variant="ghost"
                    onClick={() => handleMenuClick(() => navigate('/login'))}
                    className="w-full justify-start"
                  >
                    Войти
                  </Button>
                  <Button
                    onClick={() => handleMenuClick(() => navigate('/register/school'))}
                    className="w-full"
                  >
                    Разместить школу
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop Buttons */}
        <div className="hidden lg:flex items-center gap-2 sm:gap-4">
          <Button variant="ghost" size="sm" onClick={() => navigate('/login')} className="text-sm">
            Войти
          </Button>
          <Button size="sm" onClick={() => navigate('/register/school')} className="text-sm">
            Разместить школу
          </Button>
        </div>
      </div>
    </header>
  );
}
