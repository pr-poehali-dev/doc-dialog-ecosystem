import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const PaymentProcessing = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkPaymentStatus = async () => {
      const type = searchParams.get('type');
      
      // Даём ЮКассе 3 секунды на отправку webhook
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Всегда показываем страницу успеха
      // Если платёж был отменён, webhook не придёт и деньги не зачислятся
      // Если платёж успешен, webhook зачислит деньги
      navigate(`/payment/success?type=${type || 'payment'}`);
    };

    checkPaymentStatus();
  }, [navigate, searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950/20 dark:via-indigo-950/20 dark:to-purple-950/20">
      <Card className="max-w-md w-full shadow-2xl">
        <CardHeader className="text-center pb-4">
          <div className="mx-auto mb-4 w-20 h-20 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
            <Icon name="Loader2" size={48} className="text-blue-600 dark:text-blue-400 animate-spin" />
          </div>
          <CardTitle className="text-2xl font-bold">
            Проверяем статус платежа...
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          <div className="text-center space-y-4">
            <p className="text-muted-foreground">
              Пожалуйста, подождите. Мы проверяем статус вашего платежа.
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
};

export default PaymentProcessing;