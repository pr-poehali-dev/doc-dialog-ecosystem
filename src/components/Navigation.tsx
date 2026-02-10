import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

export const Navigation = () => {
  const location = useLocation();
  const isLoggedIn = !!localStorage.getItem('token');
  const [isOpen, setIsOpen] = useState(false);
  const [showCatalogInfo, setShowCatalogInfo] = useState(false);
  const [balance, setBalance] = useState<number | null>(null);
  
  const userStr = localStorage.getItem('user');
  const isImpersonating = userStr ? JSON.parse(userStr).is_impersonating : false;
  const originalAdminEmail = userStr ? JSON.parse(userStr).original_admin_email : null;

  useEffect(() => {
    document.body.classList.add('has-nav');
    return () => document.body.classList.remove('has-nav');
  }, []);

  useEffect(() => {
    const loadBalance = async () => {
      if (!isLoggedIn) return;
      
      try {
        const token = localStorage.getItem('token');
        if (!token) return;
        
        const payload = JSON.parse(atob(token.split('.')[1]));
        const userId = payload.user_id || payload.userId || payload.sub;
        
        if (!userId) return;
        
        const response = await fetch('https://functions.poehali.dev/619d5197-066f-4380-8bef-994c71c76fa0', {
          headers: {
            'X-User-Id': userId
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          setBalance(data.balance || 0);
        }
      } catch (error) {
        console.error('Failed to load balance:', error);
      }
    };
    
    loadBalance();
  }, [isLoggedIn]);

  const handleReturnToAdmin = () => {
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
    
    window.location.href = '/admin';
  };

  const handleMenuClick = (action: () => void) => {
    action();
    setIsOpen(false);
  };

  const mainMenuItems = [
    { label: "Главная", path: "/" },
    { label: "Специалисты", path: "/masseurs" },
    { label: "Вакансии", path: "/vacancies" },
    { label: "Курсы", path: "/courses" },
    { label: "Форум", path: "/forum" },
    { label: "Центры", path: "/salons", disabled: true },
    { label: "Блог", external: "https://school.brossok.ru/blog" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img src="https://cdn.poehali.dev/files/Group 7 (6).png" alt="Док диалог" className="h-10" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {mainMenuItems.map((item, index) => (
              item.disabled ? (
                <button
                  key={index}
                  onClick={() => setShowCatalogInfo(true)}
                  className="text-sm font-medium text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {item.label}
                </button>
              ) : item.external ? (
                <a
                  key={index}
                  href={item.external}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium hover:text-primary transition-colors"
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={index}
                  to={item.path}
                  className="text-sm font-medium hover:text-primary transition-colors"
                >
                  {item.label}
                </Link>
              )
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
                    {mainMenuItems.map((item, index) => (
                      item.disabled ? (
                        <button
                          key={index}
                          onClick={() => {
                            setIsOpen(false);
                            setShowCatalogInfo(true);
                          }}
                          className="text-left py-2.5 px-3 text-sm font-medium text-gray-400 hover:bg-muted rounded-lg transition-colors"
                        >
                          {item.label}
                        </button>
                      ) : item.external ? (
                        <a
                          key={index}
                          href={item.external}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => setIsOpen(false)}
                          className="text-left py-2.5 px-3 text-sm font-medium hover:bg-muted rounded-lg transition-colors block"
                        >
                          {item.label}
                        </a>
                      ) : (
                        <Link
                          key={index}
                          to={item.path}
                          onClick={() => setIsOpen(false)}
                          className="text-left py-2.5 px-3 text-sm font-medium hover:bg-muted rounded-lg transition-colors"
                        >
                          {item.label}
                        </Link>
                      )
                    ))}
                  </div>
                  <div className="border-t pt-3 mt-3 flex flex-col gap-2">
                    {isImpersonating && (
                      <Button
                        variant="destructive"
                        onClick={() => handleMenuClick(handleReturnToAdmin)}
                        className="w-full h-9 text-xs mb-1"
                        size="sm"
                      >
                        ← Вернуться в админку
                      </Button>
                    )}
                    {isLoggedIn ? (
                      <>
                        {balance !== null && (
                          <div className="px-3 py-2 bg-primary/10 rounded-lg mb-1">
                            <div className="text-xs text-muted-foreground">Баланс</div>
                            <div className="text-base font-semibold text-primary">{balance} ₽</div>
                          </div>
                        )}
                        <Button
                          onClick={() => handleMenuClick(() => window.location.href = '/dashboard')}
                          className="w-full h-9"
                          size="sm"
                        >
                          Личный кабинет
                        </Button>
                      </>
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
              <>
                {balance !== null && (
                  <div className="px-3 py-1.5 bg-primary/10 rounded-lg mr-2">
                    <div className="text-xs text-muted-foreground">Баланс</div>
                    <div className="text-sm font-semibold text-primary">{balance} ₽</div>
                  </div>
                )}
                <Link to="/dashboard">
                  <Button>Личный кабинет</Button>
                </Link>
              </>
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

      <Dialog open={showCatalogInfo} onOpenChange={setShowCatalogInfo}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Icon name="Store" size={24} className="text-primary" />
              Каталог салонов
            </DialogTitle>
            <DialogDescription className="text-left space-y-3 pt-4">
              <p className="text-base text-gray-700">
                Каталог салонов временно находится в разработке и скоро будет запущен.
              </p>
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                <p className="text-sm text-emerald-800 font-medium mb-2">
                  ✓ Если вы владелец салона:
                </p>
                <ul className="text-sm text-emerald-700 space-y-1 list-disc list-inside">
                  <li>Оформляйте и отправляйте карточку на модерацию</li>
                  <li>Размещайте вакансии массажистов</li>
                  <li>Обновляйте информацию о салоне</li>
                </ul>
              </div>
              <p className="text-sm text-gray-600">
                Все карточки проходят модерацию, и как только каталог заработает — ваш салон автоматически появится в нём.
              </p>
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-2">
            <Button onClick={() => setShowCatalogInfo(false)} className="flex-1">
              Понятно
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </nav>
  );
};