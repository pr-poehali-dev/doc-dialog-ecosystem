import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [unreadCount, setUnreadCount] = useState<number>(0);

  useEffect(() => {
    loadUnreadCount();
  }, []);

  const loadUnreadCount = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const response = await fetch('https://functions.poehali.dev/04d0b538-1cf5-4941-9c06-8d1bef5854ec?action=get-chats', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        const total = data.chats?.reduce((sum: number, chat: any) => sum + (chat.unread_count || 0), 0) || 0;
        setUnreadCount(total);
      }
    } catch (error) {
      console.error('Error loading unread count:', error);
    }
  };

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:border-primary/50 transition-colors">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center">
            <Icon name="Shield" className="text-blue-600" size={24} />
          </div>
          <h3 className="text-xl font-semibold">Админ-панель</h3>
        </div>
        <p className="text-gray-600 mb-4">Управление платформой и модерация</p>
        <Button className="w-full" onClick={() => navigate('/admin')}>
          Открыть панель
        </Button>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:border-primary/50 transition-colors">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-amber-500/10 rounded-full flex items-center justify-center">
            <Icon name="CheckCircle" className="text-amber-600" size={24} />
          </div>
          <h3 className="text-xl font-semibold">Верификация</h3>
        </div>
        <p className="text-gray-600 mb-4">Проверка заявок на верификацию</p>
        <Button className="w-full" variant="outline" onClick={() => navigate('/admin')}>
          Проверить заявки
        </Button>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:border-primary/50 transition-colors">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center relative">
            <Icon name="MessageSquare" className="text-primary" size={24} />
            {unreadCount > 0 && (
              <Badge className="absolute -top-1 -right-1 bg-red-500 text-white min-w-[20px] h-5 flex items-center justify-center px-1.5 text-xs">
                {unreadCount}
              </Badge>
            )}
          </div>
          <h3 className="text-xl font-semibold">Чат с пользователями</h3>
        </div>
        <p className="text-gray-600 mb-4">
          {unreadCount > 0 ? (
            <span className="font-semibold text-red-600">{unreadCount} новых сообщений</span>
          ) : (
            'Сообщения от пользователей платформы'
          )}
        </p>
        <Button className="w-full" variant="outline" onClick={() => navigate('/dashboard/admin-messages')}>
          Открыть чат
        </Button>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center">
            <Icon name="Users" className="text-green-600" size={24} />
          </div>
          <h3 className="text-xl font-semibold">Пользователи</h3>
        </div>
        <p className="text-gray-600 mb-4">Управление базой пользователей</p>
        <Button className="w-full" variant="outline" onClick={() => navigate('/admin')}>
          База пользователей
        </Button>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-purple-500/10 rounded-full flex items-center justify-center">
            <Icon name="FileText" className="text-purple-600" size={24} />
          </div>
          <h3 className="text-xl font-semibold">База знаний</h3>
        </div>
        <p className="text-gray-600 mb-4">Управление статьями и материалами</p>
        <Button className="w-full" variant="outline" onClick={() => navigate('/admin')}>
          Редактировать базу
        </Button>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-red-500/10 rounded-full flex items-center justify-center">
            <Icon name="BarChart3" className="text-red-600" size={24} />
          </div>
          <h3 className="text-xl font-semibold">Аналитика</h3>
        </div>
        <p className="text-gray-600 mb-4">Статистика платформы</p>
        <Button className="w-full" variant="outline" onClick={() => navigate('/admin')}>
          Смотреть отчёты
        </Button>
      </div>
    </div>
  );
}