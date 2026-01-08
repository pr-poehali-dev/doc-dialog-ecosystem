import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { getUserId } from '@/utils/auth';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface SubscriptionPlan {
  id: number;
  name: string;
  price: number;
  courses_limit: number | null;
  messages_limit_per_day: number | null;
  promo_requests_allowed: boolean;
  description: string;
  top_promotions_limit: number | null;
}

interface ActiveSubscription {
  plan: SubscriptionPlan;
  started_at: string;
  expires_at: string | null;
  is_active: boolean;
}

interface SchoolUsage {
  courses_published_this_month: number;
  messages_sent_today: number;
  top_promotions_used_this_month: number;
}

export default function SubscriptionTab() {
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [activeSubscription, setActiveSubscription] = useState<ActiveSubscription | null>(null);
  const [usage, setUsage] = useState<SchoolUsage>({ courses_published_this_month: 0, messages_sent_today: 0, top_promotions_used_this_month: 0 });
  const [loading, setLoading] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [schoolBalance, setSchoolBalance] = useState(0);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const userId = getUserId();
      
      // Загружаем тарифы
      const plansRes = await fetch('https://functions.poehali.dev/f81f82f7-d9c7-4858-87bc-6701c67f2187?action=subscription_plans');
      const plansData = await plansRes.json();
      setPlans(plansData.plans || []);

      // Загружаем текущую подписку и использование
      const subRes = await fetch(`https://functions.poehali.dev/f81f82f7-d9c7-4858-87bc-6701c67f2187?action=my_subscription`, {
        headers: { 'X-User-Id': userId }
      });
      const subData = await subRes.json();
      setActiveSubscription(subData.subscription || null);
      setUsage(subData.usage || { courses_published_this_month: 0, messages_sent_today: 0, top_promotions_used_this_month: 0 });

      // Загружаем баланс школы
      const balanceRes = await fetch('https://functions.poehali.dev/da7e3de6-b82e-41a5-8be4-6b3b0fb15deb?action=get_balance', {
        headers: { 'X-User-Id': userId }
      });
      const balanceData = await balanceRes.json();
      setSchoolBalance(balanceData.balance || 0);
    } catch (error) {
      console.error('Failed to load subscription data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectPlan = (plan: SubscriptionPlan) => {
    setSelectedPlan(plan);
    setShowConfirmDialog(true);
  };

  const confirmActivation = async () => {
    if (!selectedPlan) return;

    try {
      const userId = getUserId();
      const res = await fetch('https://functions.poehali.dev/f81f82f7-d9c7-4858-87bc-6701c67f2187?action=activate_subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-User-Id': userId
        },
        body: JSON.stringify({ plan_id: selectedPlan.id })
      });

      if (res.ok) {
        alert('Тариф успешно активирован!');
        setShowConfirmDialog(false);
        setSelectedPlan(null);
        loadData();
      } else {
        const error = await res.json();
        alert(`Ошибка: ${error.error || 'Не удалось активировать тариф'}`);
      }
    } catch (error) {
      console.error('Failed to activate plan:', error);
      alert('Ошибка при активации тарифа');
    }
  };

  if (loading) {
    return <div className="text-center py-8">Загрузка...</div>;
  }

  const currentPlan = activeSubscription?.plan;

  return (
    <div className="space-y-6">
      {/* Текущий тариф и статистика использования */}
      {currentPlan && (
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="Crown" className="text-blue-600" size={24} />
              Ваш текущий тариф: {currentPlan.name}
            </CardTitle>
            <CardDescription>
              {activeSubscription.expires_at 
                ? `Активен до ${new Date(activeSubscription.expires_at).toLocaleDateString('ru-RU')}`
                : 'Бессрочный доступ'
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-lg">
                <div className="text-sm text-muted-foreground mb-1">Курсы в этом месяце</div>
                <div className="text-2xl font-bold">
                  {usage.courses_published_this_month}
                  {currentPlan.courses_limit && ` / ${currentPlan.courses_limit}`}
                </div>
                {currentPlan.courses_limit === null && (
                  <div className="text-xs text-green-600 mt-1">Безлимит</div>
                )}
              </div>
              <div className="bg-white p-4 rounded-lg">
                <div className="text-sm text-muted-foreground mb-1">Выводы в топ</div>
                <div className="text-2xl font-bold">
                  {currentPlan.top_promotions_limit === 0 ? (
                    <span className="text-gray-400">Недоступно</span>
                  ) : currentPlan.top_promotions_limit === null ? (
                    <span className="text-green-600">Безлимит</span>
                  ) : (
                    `${usage.top_promotions_used_this_month} / ${currentPlan.top_promotions_limit}`
                  )}
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <div className="text-sm text-muted-foreground mb-1">Сообщения сегодня</div>
                <div className="text-2xl font-bold">
                  {currentPlan.messages_limit_per_day === 0 ? (
                    <span className="text-gray-400">Недоступно</span>
                  ) : currentPlan.messages_limit_per_day === null ? (
                    <span className="text-green-600">Безлимит</span>
                  ) : (
                    `${usage.messages_sent_today} / ${currentPlan.messages_limit_per_day}`
                  )}
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <div className="text-sm text-muted-foreground mb-1">Запросы скидок</div>
                <div className="text-2xl font-bold">
                  {currentPlan.promo_requests_allowed ? (
                    <span className="text-green-600">Доступны</span>
                  ) : (
                    <span className="text-gray-400">Недоступны</span>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Доступные тарифы */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Доступные тарифы</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {plans.map((plan) => {
            const isActive = currentPlan?.id === plan.id;
            const isUpgrade = currentPlan && plan.price > currentPlan.price;
            
            return (
              <Card key={plan.id} className={`relative ${isActive ? 'border-blue-500 border-2' : ''}`}>
                {isActive && (
                  <div className="absolute top-4 right-4 bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                    Текущий
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {plan.name}
                    {plan.price === 0 && <Icon name="Gift" size={20} className="text-green-600" />}
                    {plan.price > 0 && plan.courses_limit && <Icon name="Zap" size={20} className="text-orange-600" />}
                    {plan.courses_limit === null && <Icon name="Crown" size={20} className="text-purple-600" />}
                  </CardTitle>
                  <div className="text-3xl font-bold">
                    {plan.price === 0 ? 'Бесплатно' : `₽${plan.price.toLocaleString('ru-RU')}`}
                    {plan.price > 0 && <span className="text-sm font-normal text-muted-foreground">/месяц</span>}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{plan.description}</p>
                  
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <Icon name="BookOpen" size={18} className="text-blue-600 mt-0.5" />
                      <div className="text-sm">
                        <strong>Курсы:</strong>{' '}
                        {plan.courses_limit === null ? 'Безлимит' : `До ${plan.courses_limit} в месяц`}
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Icon name="MessageSquare" size={18} className="text-green-600 mt-0.5" />
                      <div className="text-sm">
                        <strong>Сообщения:</strong>{' '}
                        {plan.messages_limit_per_day === null ? 'Безлимит' : `До ${plan.messages_limit_per_day} в день`}
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Icon name="TrendingUp" size={18} className={`mt-0.5 ${plan.top_promotions_limit ? 'text-orange-600' : 'text-gray-400'}`} />
                      <div className="text-sm">
                        <strong>Вывод в топ:</strong>{' '}
                        {plan.top_promotions_limit === null ? 'Безлимит' : plan.top_promotions_limit > 0 ? `До ${plan.top_promotions_limit} раз/мес (от 100 ₽ за вывод)` : 'Недоступно'}
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Icon name="Tag" size={18} className={`mt-0.5 ${plan.promo_requests_allowed ? 'text-purple-600' : 'text-gray-400'}`} />
                      <div className="text-sm">
                        <strong>Запросы скидок:</strong>{' '}
                        {plan.promo_requests_allowed ? 'Безлимит' : 'Недоступны'}
                      </div>
                    </div>
                  </div>

                  <Button 
                    className="w-full mt-4"
                    disabled={isActive}
                    onClick={() => handleSelectPlan(plan)}
                    variant={isUpgrade ? 'default' : 'outline'}
                  >
                    {isActive ? 'Активен' : 'Выбрать тариф'}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Информация о лимитах */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Info" size={20} />
            Как работают тарифы?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>• <strong>Период действия:</strong> Тариф действует 30 дней с момента активации. Лимиты на курсы и выводы в топ обновляются автоматически каждые 30 дней</p>
          <p>• <strong>Вывод в топ:</strong> Каждый вывод — это одна покупка продвижения курса в топ каталога</p>
          <p>• <strong>Сообщения:</strong> Лимит обновляется ежедневно в 00:00 по МСК</p>
          <p>• <strong>Запросы скидок:</strong> Доступны только на тарифе "Безлимит". Массажисты могут запрашивать индивидуальную скидку на ваши курсы — это увеличивает конверсию на 60%</p>
          <p>• <strong>Оплата:</strong> Деньги списываются с баланса сразу при активации. Повышение тарифа начинает действовать немедленно</p>
          <p>• <strong>Понижение тарифа:</strong> Возможно в любой момент, новый тариф вступит в силу после окончания текущего периода</p>
        </CardContent>
      </Card>

      {/* Модальное окно подтверждения */}
      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Подтверждение активации тарифа</DialogTitle>
            <DialogDescription>
              Вы собираетесь активировать тариф <strong>{selectedPlan?.name}</strong>
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Стоимость тарифа:</span>
                <span className="font-semibold">{selectedPlan?.price.toLocaleString('ru-RU')} ₽</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Ваш баланс:</span>
                <span className={schoolBalance >= (selectedPlan?.price || 0) ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'}>
                  {schoolBalance.toLocaleString('ru-RU')} ₽
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Период действия:</span>
                <span className="font-semibold">30 дней</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Начало действия:</span>
                <span className="font-semibold">Сразу после активации</span>
              </div>
            </div>

            <div className="border-t pt-4 space-y-2">
              <p className="text-sm font-medium">Что вы получаете:</p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Курсы: {selectedPlan?.courses_limit === null ? 'Безлимит' : `До ${selectedPlan?.courses_limit} в месяц`}</li>
                <li>• Вывод в топ: {selectedPlan?.top_promotions_limit === null ? 'Безлимит' : selectedPlan?.top_promotions_limit ? `До ${selectedPlan?.top_promotions_limit} раз/мес` : 'Недоступно'}</li>
                <li>• Сообщения: {selectedPlan?.messages_limit_per_day === null ? 'Безлимит' : `До ${selectedPlan?.messages_limit_per_day} в день`}</li>
                <li>• Запросы скидок: {selectedPlan?.promo_requests_allowed ? 'Доступны (повышают конверсию продаж)' : 'Недоступны'}</li>
              </ul>
            </div>

            {schoolBalance < (selectedPlan?.price || 0) && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-sm text-red-600">
                  ⚠️ Недостаточно средств на балансе. Пополните баланс для активации тарифа.
                </p>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowConfirmDialog(false)}>
              Отмена
            </Button>
            <Button 
              onClick={confirmActivation}
              disabled={schoolBalance < (selectedPlan?.price || 0)}
            >
              Активировать тариф
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}