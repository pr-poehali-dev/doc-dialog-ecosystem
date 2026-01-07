import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { useUnreadMessages } from '@/hooks/useUnreadMessages';

export default function SchoolDashboard() {
  const { unreadCount } = useUnreadMessages();
  
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
        <Link to="/dashboard/messages">
          <Button className="w-full">Открыть чаты</Button>
        </Link>
      </div>

    </div>
  );
}