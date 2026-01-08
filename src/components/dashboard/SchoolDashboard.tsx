import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { useUnreadMessages } from '@/hooks/useUnreadMessages';
import { getUserId } from '@/utils/auth';

export default function SchoolDashboard() {
  const { unreadCount } = useUnreadMessages();
  const [canSendMessages, setCanSendMessages] = useState(false);
  
  useEffect(() => {
    const loadMessagingPermission = async () => {
      try {
        const userId = getUserId();
        if (!userId) return;

        const response = await fetch('https://functions.poehali.dev/f81f82f7-d9c7-4858-87bc-6701c67f2187?action=my_subscription', {
          headers: { 'X-User-Id': userId }
        });
        
        if (response.ok) {
          const data = await response.json();
          const plan = data.subscription?.plan;
          // Базовый тариф не может отправлять сообщения (messages_limit_per_day=0 или null)
          // Доступно только если messages_limit_per_day > 0
          setCanSendMessages(plan?.messages_limit_per_day > 0);
        }
      } catch (error) {
        console.error('Failed to load messaging permission:', error);
      }
    };
    
    loadMessagingPermission();
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

    </div>
  );
}