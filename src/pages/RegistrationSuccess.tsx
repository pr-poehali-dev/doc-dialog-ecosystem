import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

export default function RegistrationSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/');
    }, 10000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <>
      <Helmet>
        <title>Регистрация подтверждена - Doc Dialog</title>
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex items-center justify-center px-4">
        <div className="max-w-2xl w-full bg-card rounded-2xl shadow-2xl p-8 md:p-12 text-center space-y-6 animate-in fade-in-0 zoom-in-95 duration-500">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
            <Icon name="CheckCircle" size={48} className="text-green-600" />
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-foreground">
            Добро пожаловать в Doc Dialog!
          </h1>

          <p className="text-lg text-muted-foreground">
            Ваш адрес электронной почты успешно подтверждён
          </p>

          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-6 space-y-3">
            <div className="flex items-center justify-center gap-3">
              <Icon name="Gift" size={32} className="text-primary" />
              <span className="text-4xl font-bold text-primary">150 ₽</span>
            </div>
            <p className="text-foreground font-medium">
              Подарок на старте!
            </p>
            <p className="text-sm text-muted-foreground">
              Мы начислили 150 рублей на ваш баланс. Используйте их для работы с нашими инструментами и сервисами.
            </p>
          </div>

          <div className="space-y-4 pt-4">
            <p className="text-muted-foreground">
              Спасибо, что выбрали нас! Мы рады видеть вас в нашей экосистеме.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button 
                onClick={() => navigate('/')} 
                size="lg"
                className="gap-2"
              >
                <Icon name="Home" size={20} />
                На главную
              </Button>
              <Button 
                onClick={() => navigate('/forum')} 
                variant="outline" 
                size="lg"
                className="gap-2"
              >
                <Icon name="MessageSquare" size={20} />
                Перейти на форум
              </Button>
            </div>

            <p className="text-xs text-muted-foreground pt-4">
              Автоматический переход на главную через 10 секунд...
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
