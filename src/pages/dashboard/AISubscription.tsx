import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

interface BalanceData {
  balance: number;
  ai_operations_used: number;
}

const TOPUP_URL = 'https://functions.poehali.dev/b84cb21a-1329-492f-b6c6-236e25aa0a83';

const TOPUP_AMOUNTS = [
  { amount: 300, bonus: 0, label: '300 ₽', operations: '~20 операций' },
  { amount: 600, bonus: 100, label: '600 ₽ + 100 ₽', operations: '~47 операций', popular: true },
  { amount: 1000, bonus: 200, label: '1000 ₽ + 200 ₽', operations: '~80 операций' },
  { amount: 2000, bonus: 500, label: '2000 ₽ + 500 ₽', operations: '~167 операций' }
];

const AISubscription = () => {
  const [balance, setBalance] = useState<BalanceData | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    loadBalance();
    
    // Слушаем событие обновления баланса
    const handleBalanceUpdate = () => {
      console.log('AI Subscription: Balance update event received');
      loadBalance();
    };
    window.addEventListener('balanceUpdated', handleBalanceUpdate);
    
    return () => {
      window.removeEventListener('balanceUpdated', handleBalanceUpdate);
    };
  }, []);

  const getUserId = () => {
    const token = localStorage.getItem('token');
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.user_id || payload.userId || payload.sub;
    } catch {
      return null;
    }
  };

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

  const loadBalance = async () => {
    try {
      const userId = getUserId();
      if (!userId) return;

      console.log('AI Subscription: Loading balance for user:', userId);
      const response = await fetch('https://functions.poehali.dev/619d5197-066f-4380-8bef-994c71c76fa0', {
        headers: {
          'X-User-Id': userId
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log('AI Subscription: Balance loaded:', data.balance);
        setBalance({
          balance: data.balance || 0,
          ai_operations_used: 0
        });
      } else {
        setBalance({
          balance: 0,
          ai_operations_used: 0
        });
      }
    } catch (error) {
      toast({ title: 'Ошибка', description: 'Не удалось загрузить данные баланса', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const handleTopUp = async (amount: number, bonus: number) => {
    try {
      const userId = getUserId();
      if (!userId) {
        toast({ title: 'Ошибка', description: 'Необходима авторизация', variant: 'destructive' });
        return;
      }

      const response = await fetch(TOPUP_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-User-Id': userId
        },
        body: JSON.stringify({
          amount: amount,
          bonus: bonus
        })
      });

      if (!response.ok) {
        const error = await response.json();
        toast({ 
          title: 'Ошибка оплаты', 
          description: error.error || 'Не удалось создать платёж',
          variant: 'destructive' 
        });
        return;
      }

      const data = await response.json();
      
      if (data.payment_url && data.payment_id) {
        localStorage.setItem('pending_payment_id', data.payment_id);
        localStorage.setItem('pending_payment_type', 'balance_topup');
        window.location.href = data.payment_url;
      } else {
        toast({ 
          title: 'Ошибка', 
          description: 'Не получен URL для оплаты',
          variant: 'destructive' 
        });
      }
      
    } catch (error) {
      toast({ title: 'Ошибка', description: 'Не удалось создать платёж', variant: 'destructive' });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Icon name="Loader2" className="animate-spin" size={32} />
      </div>
    );
  }

  const userRole = getUserRole();
  const isSchool = userRole === 'school';
  const isSalon = userRole === 'salon';

  const getBackRoute = () => {
    if (isSchool) return '/school/marketing-ai';
    if (isSalon) return '/dashboard';
    return '/dashboard/ai-dialogs';
  };

  const getBackLabel = () => {
    if (isSchool) return 'Вернуться к инструментам';
    if (isSalon) return 'Вернуться в дашборд';
    return 'Вернуться к диалогам';
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <Button
          variant="ghost"
          onClick={() => navigate(getBackRoute())}
          className="mb-6"
        >
          <Icon name="ArrowLeft" size={20} className="mr-2" />
          {getBackLabel()}
        </Button>

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Баланс и пополнение</h1>
          <p className="text-muted-foreground">
            Единый баланс для всех AI-возможностей: диалоги, инструменты и анализы
          </p>
        </div>

        {balance && (
          <Card className="mb-8 bg-gradient-to-br from-primary/5 to-primary/10 border-2 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Wallet" size={24} />
                Ваш баланс: {balance.balance.toFixed(2)} ₽
              </CardTitle>
              <CardDescription>
                AI-операций использовано в этом месяце: {balance.ai_operations_used}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-4 bg-background/50 rounded-lg">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Icon name="Info" size={16} />
                  <span>
                    Стоимость AI-операции: <strong className="text-foreground">15 ₽</strong> (диалоги и инструменты)
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Пополнить баланс</h2>
          <p className="text-sm text-muted-foreground mb-6">
            Чем больше сумма пополнения — тем больше бонус
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TOPUP_AMOUNTS.map((option) => {
            const totalAmount = option.amount + option.bonus;
            const operations = Math.floor(totalAmount / 15);
            
            return (
              <Card 
                key={option.amount}
                className={`relative flex flex-col ${option.popular ? 'border-2 border-primary shadow-xl' : ''} bg-gradient-to-br from-blue-500/10 to-blue-500/5`}
              >
                {option.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
                    Популярное
                  </div>
                )}
                
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Icon name="Wallet" size={20} />
                    {option.label}
                  </CardTitle>
                  <CardDescription>
                    {option.operations}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="flex-1 flex flex-col">
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2 text-sm">
                      <Icon name="Check" size={16} className="text-green-500" />
                      <span>Пополнение: {option.amount} ₽</span>
                    </div>
                    {option.bonus > 0 && (
                      <div className="flex items-center gap-2 text-sm">
                        <Icon name="Gift" size={16} className="text-orange-500" />
                        <span className="font-semibold text-orange-600">Бонус: +{option.bonus} ₽</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-sm">
                      <Icon name="Zap" size={16} className="text-blue-500" />
                      <span>Итого: {totalAmount} ₽ (~{operations} операций)</span>
                    </div>
                  </div>

                  <Button 
                    className="w-full mt-auto"
                    variant={option.popular ? 'default' : 'outline'}
                    onClick={() => handleTopUp(option.amount, option.bonus)}
                  >
                    Пополнить
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Card className="mt-8 bg-muted/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Icon name="HelpCircle" size={20} />
              Как работает баланс?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <div className="flex gap-3">
              <Icon name="Check" size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
              <span>Пополняйте баланс один раз и используйте для всех AI-функций</span>
            </div>
            <div className="flex gap-3">
              <Icon name="Check" size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
              <span>Каждая AI-операция (диалог или инструмент) стоит 15 ₽</span>
            </div>
            <div className="flex gap-3">
              <Icon name="Check" size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
              <span>Чем больше пополнение — тем больше бонусных рублей вы получаете</span>
            </div>
            <div className="flex gap-3">
              <Icon name="Check" size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
              <span>Баланс не сгорает и действует бессрочно</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AISubscription;