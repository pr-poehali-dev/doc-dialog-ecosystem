import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

interface SubscriptionData {
  current_tier: string;
  ai_dialogs_limit: number;
  dialogs_used: number;
  tools_used: number;
  total_used: number;
  subscription_expires?: string;
}

const PAYMENT_URL = 'https://functions.poehali.dev/YOUR_PAYMENT_FUNCTION_ID';

const AISubscription = () => {
  const [subscription, setSubscription] = useState<SubscriptionData | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  const plans = [
    {
      id: 'free',
      name: 'Бесплатный',
      price: 0,
      operations: 5,
      features: [
        '5 AI-операций в месяц',
        'Диалоги + Инструменты',
        'Все типы супервизии',
        'Медицинский анализ',
        'Анализ симптомов',
        'Конструктор программ'
      ],
      color: 'from-gray-500/10 to-gray-500/5',
      icon: 'Sparkles'
    },
    {
      id: 'basic',
      name: 'Базовый',
      price: 299,
      operations: 20,
      features: [
        '20 AI-операций в месяц',
        'Диалоги + Инструменты',
        'Все типы супервизии',
        'Медицинский анализ',
        'Анализ симптомов',
        'Конструктор программ',
        'История всех операций'
      ],
      color: 'from-blue-500/10 to-blue-500/5',
      icon: 'Zap',
      popular: false
    },
    {
      id: 'pro',
      name: 'Профи',
      price: 599,
      operations: 100,
      features: [
        '100 AI-операций в месяц',
        'Диалоги + Инструменты',
        'Все типы супервизии',
        'Медицинский анализ',
        'Анализ симптомов',
        'Конструктор программ',
        'История всех операций',
        'Приоритетная обработка'
      ],
      color: 'from-purple-500/10 to-purple-500/5',
      icon: 'Crown',
      popular: true
    },
    {
      id: 'unlimited',
      name: 'Безлимит',
      price: 999,
      operations: -1,
      features: [
        'Неограниченные AI-операции',
        'Диалоги + Инструменты',
        'Все типы супервизии',
        'Медицинский анализ',
        'Анализ симптомов',
        'Конструктор программ',
        'История всех операций',
        'Максимальный приоритет',
        'VIP поддержка 24/7'
      ],
      color: 'from-orange-500/10 to-orange-500/5',
      icon: 'Infinity',
      popular: false
    }
  ];

  useEffect(() => {
    loadSubscription();
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

  const loadSubscription = async () => {
    try {
      const userId = getUserId();
      if (!userId) return;

      // Временно: показываем free тариф
      setSubscription({
        current_tier: 'free',
        ai_dialogs_limit: 5,
        dialogs_used: 0,
        tools_used: 0,
        total_used: 0
      });
    } catch (error) {
      toast({ title: 'Ошибка', description: 'Не удалось загрузить данные подписки', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const handleUpgrade = async (planId: string, price: number) => {
    if (planId === 'free') return;

    try {
      const userId = getUserId();
      if (!userId) {
        toast({ title: 'Ошибка', description: 'Необходима авторизация', variant: 'destructive' });
        return;
      }

      // TODO: Подключить реальную оплату через ЮMoney
      toast({ 
        title: 'В разработке', 
        description: 'Оплата через ЮMoney будет доступна после настройки секретов',
        variant: 'default'
      });

      // Пример будущего запроса:
      // const response = await fetch(PAYMENT_URL, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'X-User-Id': userId
      //   },
      //   body: JSON.stringify({
      //     action: 'create_payment',
      //     plan: planId,
      //     amount: price
      //   })
      // });
      
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

  const currentPlan = plans.find(p => p.id === subscription?.current_tier) || plans[0];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <Button
          variant="ghost"
          onClick={() => navigate('/dashboard/ai-dialogs')}
          className="mb-6"
        >
          <Icon name="ArrowLeft" size={20} className="mr-2" />
          Вернуться к диалогам
        </Button>

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Тарифы и подписка</h1>
          <p className="text-muted-foreground">
            Единая подписка на все AI-возможности: диалоги, инструменты и анализы
          </p>
        </div>

        {subscription && (
          <Card className="mb-8 bg-gradient-to-br from-primary/5 to-primary/10 border-2 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name={currentPlan.icon as any} size={24} />
                Ваш текущий тариф: {currentPlan.name}
              </CardTitle>
              <CardDescription>
                Использовано AI-операций в этом месяце: {subscription.total_used} из {subscription.ai_dialogs_limit === -1 ? '∞' : subscription.ai_dialogs_limit}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-3 text-sm text-muted-foreground">
                Диалоги: {subscription.dialogs_used} • Инструменты: {subscription.tools_used}
              </div>
              <div className="w-full bg-secondary rounded-full h-3 overflow-hidden">
                <div 
                  className="bg-primary h-full transition-all rounded-full"
                  style={{ 
                    width: subscription.ai_dialogs_limit === -1 
                      ? '100%' 
                      : `${Math.min((subscription.total_used / subscription.ai_dialogs_limit) * 100, 100)}%` 
                  }}
                />
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan) => {
            const isCurrent = plan.id === subscription?.current_tier;
            
            return (
              <Card 
                key={plan.id}
                className={`relative flex flex-col ${plan.popular ? 'border-2 border-primary shadow-xl' : ''} bg-gradient-to-br ${plan.color}`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
                    Популярный
                  </div>
                )}
                
                <CardHeader>
                  <Icon name={plan.icon as any} size={40} className="text-primary mb-3" />
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription className="text-3xl font-bold text-foreground mt-2">
                    {plan.price === 0 ? 'Бесплатно' : `${plan.price}₽`}
                    {plan.price > 0 && <span className="text-sm font-normal text-muted-foreground">/месяц</span>}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="flex-1 flex flex-col">
                  <div className="mb-4 p-3 bg-background/50 rounded-lg">
                    <p className="text-sm text-center font-semibold">
                      {plan.operations === -1 ? 'Неограниченно' : `${plan.operations} операций`}
                    </p>
                  </div>
                  
                  <ul className="space-y-3 mb-6 flex-1">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <Icon name="Check" size={16} className="mt-0.5 text-primary flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    onClick={() => handleUpgrade(plan.id, plan.price)}
                    disabled={isCurrent || plan.id === 'free'}
                    className={`w-full ${plan.popular ? 'bg-primary hover:bg-primary/90' : ''}`}
                    variant={plan.popular ? 'default' : 'outline'}
                  >
                    {isCurrent ? (
                      <>
                        <Icon name="Check" size={16} className="mr-2" />
                        Текущий тариф
                      </>
                    ) : plan.id === 'free' ? (
                      'Базовый тариф'
                    ) : (
                      'Выбрать тариф'
                    )}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Card className="mt-8 bg-secondary/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="Info" size={20} />
              Информация об оплате
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <p>• Оплата производится через ЮMoney (безопасный платёжный сервис)</p>
            <p>• Подписка продлевается автоматически каждый месяц</p>
            <p>• Отменить подписку можно в любой момент</p>
            <p>• Неиспользованные диалоги не переносятся на следующий месяц</p>
            <p>• При смене тарифа изменения вступают в силу немедленно</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AISubscription;