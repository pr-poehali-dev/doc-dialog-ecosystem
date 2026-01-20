import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const PaymentProcessing = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [showOptions, setShowOptions] = useState(false);

  useEffect(() => {
    // Показываем опции через 2 секунды
    const timer = setTimeout(() => {
      setShowOptions(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const type = searchParams.get('type') || 'payment';

  const handleSuccess = () => {
    navigate(`/payment/success?type=${type}`);
  };

  const handleCancel = () => {
    navigate(`/payment/failed?type=${type}`);
  };

  const getRedirectPath = () => {
    switch (type) {
      case 'ai_subscription':
        return '/dashboard/ai-subscription';
      case 'balance_topup':
        return '/dashboard/balance';
      case 'extra_requests':
        return '/dashboard/tools';
      case 'vacancy':
        return '/dashboard/vacancies';
      default:
        return '/dashboard';
    }
  };

  if (!showOptions) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950/20 dark:via-indigo-950/20 dark:to-purple-950/20">
        <Card className="max-w-md w-full shadow-2xl">
          <CardHeader className="text-center pb-4">
            <div className="mx-auto mb-4 w-20 h-20 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
              <Icon name="Loader2" size={48} className="text-blue-600 dark:text-blue-400 animate-spin" />
            </div>
            <CardTitle className="text-2xl font-bold">
              Обрабатываем возврат...
            </CardTitle>
          </CardHeader>
          
          <CardContent>
            <div className="text-center space-y-4">
              <p className="text-muted-foreground">
                Пожалуйста, подождите
              </p>
              <div className="flex justify-center gap-2">
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50 dark:from-slate-950/20 dark:via-gray-950/20 dark:to-zinc-950/20">
      <Card className="max-w-md w-full shadow-2xl">
        <CardHeader className="text-center pb-4">
          <div className="mx-auto mb-4 w-20 h-20 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center">
            <Icon name="HelpCircle" size={48} className="text-amber-600 dark:text-amber-400" />
          </div>
          <CardTitle className="text-2xl font-bold">
            Вы завершили оплату?
          </CardTitle>
          <CardDescription className="text-base mt-3">
            Выберите действие в зависимости от того, оплатили ли вы заказ
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
            <h4 className="font-semibold text-blue-900 dark:text-blue-300 mb-2 flex items-center gap-2">
              <Icon name="CheckCircle2" size={18} />
              Я оплатил заказ
            </h4>
            <p className="text-sm text-blue-800 dark:text-blue-400 mb-3">
              Средства поступят на счёт в течение 5 минут. Вы можете обновить страницу через пару минут для проверки.
            </p>
            <Button 
              onClick={handleSuccess}
              className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
            >
              <Icon name="CheckCircle2" size={20} className="mr-2" />
              Да, я оплатил
            </Button>
          </div>

          <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 border border-red-200 dark:border-red-800">
            <h4 className="font-semibold text-red-900 dark:text-red-300 mb-2 flex items-center gap-2">
              <Icon name="XCircle" size={18} />
              Я отменил оплату
            </h4>
            <p className="text-sm text-red-800 dark:text-red-400 mb-3">
              Если вы закрыли окно оплаты или нажали "Назад", средства не будут списаны.
            </p>
            <Button 
              onClick={handleCancel}
              variant="outline"
              className="w-full border-red-300 text-red-700 hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-900/30"
            >
              <Icon name="XCircle" size={20} className="mr-2" />
              Я отменил
            </Button>
          </div>

          <Button 
            onClick={() => navigate(getRedirectPath())}
            variant="ghost"
            className="w-full"
          >
            <Icon name="ArrowLeft" size={20} className="mr-2" />
            Вернуться назад
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentProcessing;
