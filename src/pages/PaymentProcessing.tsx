import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

const PAYMENT_CHECK_URL = 'https://functions.poehali.dev/28a74790-e33c-49a3-bf24-8443c39e1d9d';

const PaymentProcessing = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const [statusText, setStatusText] = useState('Проверяем статус платежа...');

  useEffect(() => {
    const checkPayment = async () => {
      const type = searchParams.get('type') || localStorage.getItem('pending_payment_type') || 'payment';
      
      // Ищем payment_id в URL или localStorage
      const fullUrl = window.location.href;
      const urlObj = new URL(fullUrl);
      let paymentId = urlObj.searchParams.get('payment_id');
      
      // Если в URL нет - проверяем localStorage
      if (!paymentId) {
        paymentId = localStorage.getItem('pending_payment_id');
      }
      
      // Если нет нигде - пользователь вернулся без оплаты
      if (!paymentId) {
        console.log('No payment_id found');
        setStatusText('Платёж не найден');
        await new Promise(resolve => setTimeout(resolve, 1000));
        navigate(`/payment/failed?type=${type}`);
        return;
      }
      
      // Очищаем сохранённый payment_id
      localStorage.removeItem('pending_payment_id');
      localStorage.removeItem('pending_payment_type');

      console.log('Checking payment:', paymentId);
      setStatusText('Связываемся с платёжной системой...');

      try {
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        setStatusText('Получаем информацию о платеже...');
        
        const response = await fetch(`${PAYMENT_CHECK_URL}?payment_id=${paymentId}`);
        
        if (!response.ok) {
          throw new Error('Не удалось проверить статус');
        }

        const data = await response.json();
        console.log('Payment status:', data);

        if (data.status === 'succeeded' && data.paid) {
          setStatusText('Платёж подтверждён!');
          await new Promise(resolve => setTimeout(resolve, 1000));
          navigate(`/payment/success?type=${type}`);
        } else if (data.status === 'canceled') {
          setStatusText('Платёж отменён');
          await new Promise(resolve => setTimeout(resolve, 1000));
          navigate(`/payment/failed?type=${type}`);
        } else if (data.status === 'pending' || data.status === 'waiting_for_capture') {
          setStatusText('Платёж обрабатывается...');
          await new Promise(resolve => setTimeout(resolve, 3000));
          
          const response2 = await fetch(`${PAYMENT_CHECK_URL}?payment_id=${paymentId}`);
          if (response2.ok) {
            const data2 = await response2.json();
            if (data2.status === 'succeeded' && data2.paid) {
              navigate(`/payment/success?type=${type}`);
            } else {
              navigate(`/payment/success?type=${type}`);
            }
          } else {
            navigate(`/payment/success?type=${type}`);
          }
        } else {
          navigate(`/payment/failed?type=${type}`);
        }
      } catch (error) {
        console.error('Error:', error);
        toast({
          title: 'Ошибка проверки',
          description: 'Проверьте баланс через несколько минут',
          variant: 'destructive'
        });
        await new Promise(resolve => setTimeout(resolve, 1000));
        navigate(`/payment/success?type=${type}`);
      }
    };

    checkPayment();
  }, [navigate, searchParams, toast]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950/20 dark:via-indigo-950/20 dark:to-purple-950/20">
      <Card className="max-w-md w-full shadow-2xl">
        <CardHeader className="text-center pb-4">
          <div className="mx-auto mb-4 w-20 h-20 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
            <Icon name="Loader2" size={48} className="text-blue-600 dark:text-blue-400 animate-spin" />
          </div>
          <CardTitle className="text-2xl font-bold">
            {statusText}
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          <div className="text-center space-y-4">
            <p className="text-muted-foreground">
              Пожалуйста, не закрывайте эту страницу
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