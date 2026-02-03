import { useState } from "react";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function PlatformHeader() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { label: "Главная", path: "/education-platform" },
    { label: "Все курсы", path: "/courses" },
    { label: "Инструменты", path: "/tools" },
    { label: "Партнерская программа", path: "/partner-program" },
    { label: "Обо мне", path: "https://osteopatplus.ru/" },
    { label: "Написать нам", path: "/contact" },
  ];

  const handleMenuClick = (action: () => void) => {
    action();
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <a href="/education-platform" className="flex items-center gap-3">
            <img src="https://cdn.poehali.dev/files/Group 7 (6).png" alt="Док диалог" className="h-10" />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4 lg:gap-6">
            {menuItems.map((item, index) => (
              <a
                key={index}
                href={item.path}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium hover:text-primary transition-colors whitespace-nowrap"
              >
                {item.label}
              </a>
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
              <SheetContent side="right" className="w-[280px] sm:w-[320px]">
                <div className="flex flex-col gap-6 mt-8">
                  <div className="flex flex-col gap-4">
                    {menuItems.map((item, index) => (
                      <a
                        key={index}
                        href={item.path}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setIsOpen(false)}
                        className="text-left py-3 px-4 text-base font-medium hover:bg-muted rounded-lg transition-colors"
                      >
                        {item.label}
                      </a>
                    ))}
                  </div>
                  <div className="border-t pt-6 flex flex-col gap-3">
                    <Button
                      onClick={() => handleMenuClick(() => window.open('https://school.brossok.ru/', '_blank'))}
                      className="w-full"
                    >
                      Вход в кабинет
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center gap-2">
            <Button onClick={() => window.open('https://school.brossok.ru/', '_blank')}>
              Вход в кабинет
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}