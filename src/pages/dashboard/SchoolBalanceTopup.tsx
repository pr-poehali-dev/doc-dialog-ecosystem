import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

const BALANCE_TOPUP_URL = 'https://functions.poehali.dev/b84cb21a-1329-492f-b6c6-236e25aa0a83';

const TOPUP_PACKAGES = [
  {
    id: 'small',
    amount: 1000,
    bonus: 0,
    title: 'Стартовый',
    description: 'Попробовать продвижение',
    icon: 'Sparkles',
    color: 'from-blue-500/10 to-blue-500/5'
  },
  {
    id: 'medium',
    amount: 5000,
    bonus: 500,
    title: 'Оптимальный',
    description: 'Выгоднее на 10%',
    icon: 'Zap',
    color: 'from-purple-500/10 to-purple-500/5',
    popular: true
  },
  {
    id: 'large',
    amount: 10000,
    bonus: 1500,
    title: 'Максимальный',
    description: 'Выгоднее на 15%',
    icon: 'Crown',
    color: 'from-orange-500/10 to-orange-500/5'
  }
];

export default function SchoolBalanceTopup() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState<string | null>(null);

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

  const handleTopup = async (pkg: typeof TOPUP_PACKAGES[0]) => {
    const userId = getUserId();
    if (!userId) {
      toast({ title: 'Ошибка', description: 'Необходима авторизация', variant: 'destructive' });
      navigate('/login');
      return;
    }

    setLoading(pkg.id);

    try {
      const response = await fetch(BALANCE_TOPUP_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-User-Id': userId
        },
        body: JSON.stringify({
          amount: pkg.amount,
          bonus: pkg.bonus,
          package_id: pkg.id
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
        // Сохраняем payment_id перед редиректом на оплату
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
      toast({
        title: 'Ошибка',
        description: 'Не удалось создать платёж',
        variant: 'destructive'
      });
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <Button
          variant="ghost"
          onClick={() => navigate('/dashboard')}
          className="mb-6"
        >
          <Icon name="ArrowLeft" size={20} className="mr-2" />
          Назад в кабинет
        </Button>

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Пополнение баланса</h1>
          <p className="text-muted-foreground">
            Выберите пакет для продвижения ваших курсов
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {TOPUP_PACKAGES.map((pkg) => (
            <Card 
              key={pkg.id}
              className={`relative flex flex-col bg-gradient-to-br ${pkg.color} ${pkg.popular ? 'border-2 border-primary shadow-xl' : ''}`}
            >
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
                  Популярный
                </div>
              )}
              
              <CardHeader>
                <Icon name={pkg.icon as any} size={40} className="text-primary mb-3" />
                <CardTitle className="text-2xl">{pkg.title}</CardTitle>
                <CardDescription>{pkg.description}</CardDescription>
              </CardHeader>
              
              <CardContent className="flex-1 flex flex-col">
                <div className="mb-6">
                  <div className="text-4xl font-bold mb-2">
                    {pkg.amount.toLocaleString('ru-RU')} ₽
                  </div>
                  {pkg.bonus > 0 && (
                    <div className="text-lg text-green-600 font-semibold">
                      + {pkg.bonus} ₽ бонус
                    </div>
                  )}
                  {pkg.bonus > 0 && (
                    <div className="text-sm text-gray-500 mt-1">
                      Итого на балансе: {(pkg.amount + pkg.bonus).toLocaleString('ru-RU')} ₽
                    </div>
                  )}
                </div>

                <div className="space-y-3 mb-6 text-sm">
                  <div className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-primary mt-0.5" />
                    <span>Оплата через ЮMoney</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-primary mt-0.5" />
                    <span>Мгновенное зачисление</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-primary mt-0.5" />
                    <span>Безопасная оплата</span>
                  </div>
                </div>

                <Button
                  className="w-full mt-auto"
                  onClick={() => handleTopup(pkg)}
                  disabled={loading !== null}
                  variant={pkg.popular ? 'default' : 'outline'}
                >
                  {loading === pkg.id ? (
                    <>
                      <Icon name="Loader2" size={18} className="mr-2 animate-spin" />
                      Обработка...
                    </>
                  ) : (
                    <>
                      <Icon name="CreditCard" size={18} className="mr-2" />
                      Пополнить
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Icon name="Info" size={20} />
              Как это работает
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <p>
              1. Выберите удобный пакет пополнения
            </p>
            <p>
              2. Оплатите через ЮMoney (банковские карты, электронные кошельки)
            </p>
            <p>
              3. Средства моментально зачисляются на ваш баланс
            </p>
            <p>
              4. Используйте баланс для продвижения курсов, мастермайндов и оффлайн-мероприятий
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}