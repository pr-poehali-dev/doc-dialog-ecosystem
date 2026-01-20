import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const PaymentFailed = () => {
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

  const getRedirectPath = () => {
    const userRole = getUserRole();
    
    switch (paymentType) {
      case 'ai_subscription':
        return '/dashboard/ai-subscription';
      case 'balance_topup':
        // Редирект на страницу пополнения для повторной попытки
        if (userRole === 'masseur') return '/dashboard/masseur-balance-topup';
        if (userRole === 'school') return '/dashboard/school-balance-topup';
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
        return 'Не удалось активировать подписку';
      case 'balance_topup':
        return 'Не удалось пополнить баланс';
      case 'extra_requests':
        return 'Не удалось добавить запросы';
      case 'vacancy':
        return 'Не удалось добавить слоты';
      default:
        return 'Оплата не прошла';
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-red-50 via-orange-50 to-amber-50 dark:from-red-950/20 dark:via-orange-950/20 dark:to-amber-950/20">
      <Card className="max-w-md w-full shadow-2xl border-2 border-red-200 dark:border-red-800">
        <CardHeader className="text-center pb-4">
          <div className="mx-auto mb-4 w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
            <Icon name="XCircle" size={48} className="text-red-600 dark:text-red-400" />
          </div>
          <CardTitle className="text-3xl font-bold text-red-700 dark:text-red-400">
            {getTitle()}
          </CardTitle>
          <CardDescription className="text-base mt-3">
            Платёж был отменён или произошла ошибка при обработке. Средства не были списаны с вашего счёта.
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-4 border border-amber-200 dark:border-amber-800">
            <h4 className="font-semibold text-amber-900 dark:text-amber-300 mb-2 flex items-center gap-2">
              <Icon name="AlertTriangle" size={18} />
              Возможные причины:
            </h4>
            <ul className="space-y-1.5 text-sm text-amber-800 dark:text-amber-400">
              <li className="flex items-start gap-2">
                <span className="text-amber-600 dark:text-amber-500 mt-0.5">•</span>
                <span>Платёж был отменён вами</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 dark:text-amber-500 mt-0.5">•</span>
                <span>Недостаточно средств на карте</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 dark:text-amber-500 mt-0.5">•</span>
                <span>Банк отклонил транзакцию</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 dark:text-amber-500 mt-0.5">•</span>
                <span>Технический сбой платёжной системы</span>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-3 pt-2">
            <Button 
              onClick={() => navigate(getRedirectPath())}
              className="w-full bg-primary hover:bg-primary/90"
              size="lg"
            >
              <Icon name="RefreshCw" size={20} className="mr-2" />
              Попробовать снова
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

          <div className="text-center pt-2">
            <p className="text-sm text-muted-foreground">
              Нужна помощь? <a href="mailto:support@brossok.ru" className="text-primary hover:underline">Свяжитесь с поддержкой</a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentFailed;