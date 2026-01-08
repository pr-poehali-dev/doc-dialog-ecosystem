import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { useUnreadMessages } from '@/hooks/useUnreadMessages';
import { getUserId } from '@/utils/auth';

interface SubscriptionPlan {
  name: string;
  price: number;
  courses_limit: number | null;
  messages_limit_per_day: number | null;
  promo_requests_allowed: boolean;
  top_promotions_limit: number | null;
}

export default function SchoolDashboard() {
  const { unreadCount } = useUnreadMessages();
  const [canSendMessages, setCanSendMessages] = useState(false);
  const [subscriptionPlan, setSubscriptionPlan] = useState<SubscriptionPlan | null>(null);
  
  useEffect(() => {
    const loadSubscription = async () => {
      try {
        const userId = getUserId();
        if (!userId) return;

        const response = await fetch('https://functions.poehali.dev/f81f82f7-d9c7-4858-87bc-6701c67f2187?action=my_subscription', {
          headers: { 'X-User-Id': userId }
        });
        
        if (response.ok) {
          const data = await response.json();
          const plan = data.subscription?.plan;
          if (plan) {
            setSubscriptionPlan(plan);
            // Сообщения доступны, если лимит не равен 0 (NULL = безлимит, >0 = ограничен, 0 = недоступно)
            setCanSendMessages(plan.messages_limit_per_day !== 0);
          }
        }
      } catch (error) {
        console.error('Failed to load subscription:', error);
      }
    };
    
    loadSubscription();
  }, []);
  
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
            <Icon name="GraduationCap" className="text-primary" size={24} />
          </div>
          <h3 className="text-xl font-semibold">Кабинет школы</h3>
        </div>
        <p className="text-gray-600 mb-4">Управление курсами и мастермайндами</p>
        <Link to="/school/dashboard">
          <Button className="w-full">Перейти в кабинет</Button>
        </Link>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
            <Icon name="BarChart3" className="text-primary" size={24} />
          </div>
          <h3 className="text-xl font-semibold">Аналитика</h3>
        </div>
        <p className="text-gray-600 mb-4">Статистика продаж и просмотров</p>
        <Link to="/school/analytics">
          <Button className="w-full" variant="outline">Смотреть отчёты</Button>
        </Link>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center">
            <Icon name="Wallet" className="text-green-600" size={24} />
          </div>
          <h3 className="text-xl font-semibold">Баланс</h3>
        </div>
        <p className="text-gray-600 mb-4">Пополнение и история транзакций</p>
        <Link to="/school/balance">
          <Button className="w-full" variant="outline">Управление балансом</Button>
        </Link>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:border-primary/50 transition-colors">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center relative">
            <Icon name="MessageSquare" className="text-primary" size={24} />
            {unreadCount > 0 && (
              <Badge className="absolute -top-1 -right-1 h-5 min-w-5 flex items-center justify-center p-0 px-1.5 text-xs bg-primary border-2 border-white">
                {unreadCount}
              </Badge>
            )}
          </div>
          <h3 className="text-xl font-semibold">Сообщения</h3>
        </div>
        <p className="text-gray-600 mb-4">Чаты с клиентами и массажистами</p>
        {canSendMessages ? (
          <Link to="/dashboard/messages">
            <Button className="w-full">Открыть чаты</Button>
          </Link>
        ) : (
          <div className="relative group">
            <Button 
              className="w-full" 
              disabled
              title="Недоступно на базовом тарифе"
            >
              Открыть чаты
            </Button>
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block w-64 p-3 bg-gray-900 text-white text-xs rounded-lg shadow-lg z-50">
              <p>Недоступно на базовом тарифе.</p>
              <p className="text-gray-300 mt-1">Обновите тариф в разделе "Подписка"</p>
              <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-900"></div>
            </div>
          </div>
        )}
      </div>

      {subscriptionPlan && (
        <div className="md:col-span-2 lg:col-span-3 bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 rounded-xl p-6 shadow-sm border-2 border-primary/20">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                  <Icon name="Crown" className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Тариф: {subscriptionPlan.name}</h3>
                  <p className="text-sm text-gray-600">
                    {subscriptionPlan.price === 0 ? 'Бесплатный тариф' : `${subscriptionPlan.price.toLocaleString()} ₽/мес`}
                  </p>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <Icon name="Check" 
                        size={18} 
                        className="text-green-600" />
                  <span className="text-sm text-gray-700">
                    Курсов: {subscriptionPlan.courses_limit || 'Безлимит'}
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Icon name={subscriptionPlan.messages_limit_per_day !== 0 ? 'Check' : 'X'} 
                        size={18} 
                        className={subscriptionPlan.messages_limit_per_day !== 0 ? 'text-green-600' : 'text-red-500'} />
                  <span className="text-sm text-gray-700">
                    Сообщения: {subscriptionPlan.messages_limit_per_day === null ? 'Безлимит' : subscriptionPlan.messages_limit_per_day > 0 ? `${subscriptionPlan.messages_limit_per_day}/день` : 'Недоступно'}
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Icon name={subscriptionPlan.top_promotions_limit ? 'Check' : 'X'} 
                        size={18} 
                        className={subscriptionPlan.top_promotions_limit ? 'text-green-600' : 'text-red-500'} />
                  <span className="text-sm text-gray-700">
                    Продвижение: {subscriptionPlan.top_promotions_limit ? `${subscriptionPlan.top_promotions_limit}/мес` : 'Недоступно'}
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Icon name={subscriptionPlan.promo_requests_allowed ? 'Check' : 'X'} 
                        size={18} 
                        className={subscriptionPlan.promo_requests_allowed ? 'text-green-600' : 'text-red-500'} />
                  <span className="text-sm text-gray-700">
                    Запросы скидок: {subscriptionPlan.promo_requests_allowed ? 'Доступно' : 'Недоступно'}
                  </span>
                  <div className="relative group">
                    <Icon name="HelpCircle" size={16} className="text-gray-400 cursor-help" />
                    <div className="absolute left-0 bottom-full mb-2 hidden group-hover:block w-64 p-3 bg-gray-900 text-white text-xs rounded-lg shadow-lg z-50">
                      <p className="font-semibold">Увеличивает конверсию на 60%</p>
                      <p className="text-gray-300 mt-1">Массажисты могут запрашивать индивидуальную скидку на ваши курсы, что значительно повышает продажи</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <Link to="/school/dashboard?tab=subscription">
              <Button variant="outline" className="bg-white hover:bg-gray-50">
                <Icon name="Settings" size={16} className="mr-2" />
                Управление тарифом
              </Button>
            </Link>
          </div>
        </div>
      )}

    </div>
  );
}