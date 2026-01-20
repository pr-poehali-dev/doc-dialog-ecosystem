import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const paymentType = searchParams.get('type') || 'payment';

  const getUserRole = () => {
    const userStr = localStorage.getItem('user');
    if (!userStr) return null;
    try {
      const user = JSON.parse(userStr);
      return user.role;
    } catch {
      return null;
    }
  };

  useEffect(() => {
    const confetti = () => {
      const duration = 3000;
      const end = Date.now() + duration;

      const frame = () => {
        if (Date.now() > end) return;

        const particleCount = 2;
        const angle = Math.random() * 360;
        const x = Math.random();

        const particles = document.createElement('div');
        particles.innerHTML = '🎉';
        particles.style.position = 'fixed';
        particles.style.left = `${x * 100}%`;
        particles.style.top = '-20px';
        particles.style.fontSize = '24px';
        particles.style.pointerEvents = 'none';
        particles.style.zIndex = '9999';
        document.body.appendChild(particles);

        setTimeout(() => particles.remove(), 3000);

        requestAnimationFrame(frame);
      };

      frame();
    };

    confetti();
  }, []);

  const getRedirectPath = () => {
    const userRole = getUserRole();
    
    switch (paymentType) {
      case 'ai_subscription':
        return '/dashboard/ai-subscription';
      case 'balance_topup':
        // Только masseur и school имеют страницу баланса
        if (userRole === 'masseur') return '/dashboard/balance';
        if (userRole === 'school') return '/school/balance';
        return '/dashboard';
      case 'extra_requests':
        return '/dashboard/tools';
      case 'vacancy':
        return '/dashboard/vacancies';
      default:
        return '/dashboard';
    }
  };

  const getTitle = () => {
    switch (paymentType) {
      case 'ai_subscription':
        return 'Подписка оформлена!';
      case 'balance_topup':
        return 'Платёж принят!';
      case 'extra_requests':
        return 'Платёж обрабатывается!';
      case 'vacancy':
        return 'Платёж принят!';
      default:
        return 'Платёж обрабатывается!';
    }
  };

  const getDescription = () => {
    switch (paymentType) {
      case 'ai_subscription':
        return 'Ваша подписка на AI-тариф обрабатывается. Средства поступят в течение 5 минут.';
      case 'balance_topup':
        return 'Платёж успешно принят. Средства поступят на ваш баланс в течение 5 минут.';
      case 'extra_requests':
        return 'Платёж успешно принят. Запросы поступят на ваш счёт в течение 5 минут.';
      case 'vacancy':
        return 'Платёж успешно принят. Слоты будут добавлены в течение 5 минут.';
      default:
        return 'Ваш платёж обрабатывается. Средства поступят в течение 5 минут.';
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-green-950/20 dark:via-emerald-950/20 dark:to-teal-950/20">
      <Card className="max-w-md w-full shadow-2xl border-2 border-green-200 dark:border-green-800">
        <CardHeader className="text-center pb-4">
          <div className="mx-auto mb-4 w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center animate-bounce">
            <Icon name="CheckCircle2" size={48} className="text-green-600 dark:text-green-400" />
          </div>
          <CardTitle className="text-3xl font-bold text-green-700 dark:text-green-400">
            {getTitle()}
          </CardTitle>
          <CardDescription className="text-base mt-3">
            {getDescription()}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-200 dark:border-green-800">
            <div className="flex items-center gap-3 text-sm">
              <Icon name="Info" size={20} className="text-green-600 dark:text-green-400 flex-shrink-0" />
              <p className="text-green-800 dark:text-green-300">
                Изменения вступят в силу в течение нескольких минут. Если средства не отобразились — обновите страницу.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3 pt-2">
            <Button 
              onClick={() => navigate(getRedirectPath())}
              className="w-full bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800"
              size="lg"
            >
              <Icon name="ArrowRight" size={20} className="mr-2" />
              Продолжить
            </Button>
            
            <Button 
              onClick={() => navigate('/dashboard')}
              variant="outline"
              className="w-full"
            >
              <Icon name="Home" size={20} className="mr-2" />
              На главную
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentSuccess;