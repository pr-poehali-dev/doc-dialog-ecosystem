import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { getUserId } from '@/utils/auth';
import { toast } from 'sonner';

interface SubscriptionPlan {
  id: number;
  name: string;
  price: number;
  courses_limit: number | null;
  messages_limit_per_day: number | null;
  promo_requests_allowed: boolean;
  top_promotions_limit: number | null;
}

interface Subscription {
  plan: SubscriptionPlan;
  expires_at: string | null;
  is_active: boolean;
}

export default function SchoolSubscription() {
  const navigate = useNavigate();
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [availablePlans, setAvailablePlans] = useState<SubscriptionPlan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const userId = getUserId();
      if (!userId) {
        navigate('/login');
        return;
      }

      // Загружаем текущую подписку
      const subResponse = await fetch('https://functions.poehali.dev/f81f82f7-d9c7-4858-87bc-6701c67f2187?action=my_subscription', {
        headers: { 'X-User-Id': userId }
      });

      if (subResponse.ok) {
        const data = await subResponse.json();
        setSubscription(data.subscription);
      }

      // Загружаем доступные планы
      const plansResponse = await fetch('https://functions.poehali.dev/f81f82f7-d9c7-4858-87bc-6701c67f2187?action=available_plans');
      
      if (plansResponse.ok) {
        const plansData = await plansResponse.json();
        setAvailablePlans(plansData.plans || []);
      }
    } catch (error) {
      console.error('Failed to load subscription data:', error);
      toast.error('Не удалось загрузить данные подписки');
    } finally {
      setLoading(false);
    }
  };

  const handleRenewSubscription = async (planId: number) => {
    try {
      const userId = getUserId();
      if (!userId) return;

      const response = await fetch('https://functions.poehali.dev/f81f82f7-d9c7-4858-87bc-6701c67f2187?action=renew_subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-User-Id': userId
        },
        body: JSON.stringify({ plan_id: planId })
      });

      if (response.ok) {
        const data = await response.json();
        
        // Обновляем баланс в BalanceCard
        window.dispatchEvent(new Event('balanceUpdated'));
        
        toast.success(`Подписка продлена до ${new Date(data.expires_at).toLocaleDateString('ru-RU')}`);
        loadData();
      } else {
        const error = await response.json();
        toast.error(error.error || 'Не удалось продлить подписку');
      }
    } catch (error) {
      console.error('Failed to renew subscription:', error);
      toast.error('Произошла ошибка при продлении подписки');
    }
  };

  const handleChangePlan = async (planId: number) => {
    try {
      const userId = getUserId();
      if (!userId) return;

      const response = await fetch('https://functions.poehali.dev/f81f82f7-d9c7-4858-87bc-6701c67f2187?action=change_plan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-User-Id': userId
        },
        body: JSON.stringify({ plan_id: planId })
      });

      if (response.ok) {
        toast.success('Подписка успешно изменена');
        loadData();
      } else {
        const error = await response.json();
        toast.error(error.error || 'Не удалось изменить подписку');
      }
    } catch (error) {
      console.error('Failed to change plan:', error);
      toast.error('Произошла ошибка при изменении подписки');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <Icon name="Loader2" className="animate-spin mx-auto mb-4" size={48} />
              <p className="text-gray-600">Загрузка...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <Button variant="ghost" onClick={() => navigate('/school/dashboard')}>
            <Icon name="ArrowLeft" size={16} className="mr-2" />
            Назад в кабинет
          </Button>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Управление подпиской</h1>
          <p className="text-gray-600">Выберите подходящий тарифный план для вашей школы</p>
        </div>

        {subscription && (
          <Card className="mb-8 border-primary">
            <CardHeader>
              <CardTitle>Текущая подписка</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2">{subscription.plan.name}</h3>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p>💰 Стоимость: {subscription.plan.price} ₽/месяц</p>
                    <p>📚 Курсов: {subscription.plan.courses_limit === null ? '∞' : subscription.plan.courses_limit}</p>
                    <p>💬 Сообщений в день: {subscription.plan.messages_limit_per_day === null ? '∞' : subscription.plan.messages_limit_per_day}</p>
                    <p>📢 Промо-запросы: {subscription.plan.promo_requests_allowed ? 'Да' : 'Нет'}</p>
                    <p>⭐ Продвижений в ТОП: {subscription.plan.top_promotions_limit === null ? '∞' : subscription.plan.top_promotions_limit}</p>
                  </div>
                  {subscription.expires_at && (
                    <p className="mt-2 text-sm font-medium text-orange-600">
                      Активна до: {new Date(subscription.expires_at).toLocaleDateString('ru-RU')}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <Badge variant={subscription.is_active ? 'default' : 'secondary'}>
                    {subscription.is_active ? 'Активна' : 'Неактивна'}
                  </Badge>
                  {subscription.plan.price > 0 && subscription.is_active && (
                    <Button 
                      size="sm" 
                      onClick={() => handleRenewSubscription(subscription.plan.id)}
                      className="whitespace-nowrap"
                    >
                      <Icon name="RefreshCw" size={16} className="mr-2" />
                      Продлить на 30 дней
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {availablePlans.map((plan) => {
            const isCurrent = subscription?.plan.id === plan.id;
            
            return (
              <Card key={plan.id} className={isCurrent ? 'border-primary' : ''}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {plan.name}
                    {isCurrent && <Badge>Текущий</Badge>}
                  </CardTitle>
                  <CardDescription className="text-2xl font-bold text-primary">
                    {plan.price} ₽<span className="text-sm font-normal text-gray-500">/месяц</span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-4">
                    <li className="flex items-start gap-2">
                      <Icon name="Check" size={16} className="text-green-500 mt-0.5" />
                      <span className="text-sm">
                        Курсов: {plan.courses_limit === null ? 'Безлимит' : plan.courses_limit}
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Check" size={16} className="text-green-500 mt-0.5" />
                      <span className="text-sm">
                        Сообщений: {plan.messages_limit_per_day === null ? 'Безлимит' : `${plan.messages_limit_per_day}/день`}
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name={plan.promo_requests_allowed ? 'Check' : 'X'} size={16} className={plan.promo_requests_allowed ? 'text-green-500' : 'text-gray-400'} />
                      <span className="text-sm">
                        Промо-запросы массажистам
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Check" size={16} className="text-green-500 mt-0.5" />
                      <span className="text-sm">
                        Продвижений в ТОП: {plan.top_promotions_limit === null ? 'Безлимит' : plan.top_promotions_limit}
                      </span>
                    </li>
                  </ul>

                  <Button
                    className="w-full"
                    variant={isCurrent ? 'outline' : 'default'}
                    disabled={isCurrent}
                    onClick={() => handleChangePlan(plan.id)}
                  >
                    {isCurrent ? 'Текущий тариф' : 'Выбрать план'}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}