import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { useUnreadMessages } from '@/hooks/useUnreadMessages';

const SALON_API = 'https://functions.poehali.dev/01aa5a2f-6476-4fbc-ba10-6808960c8a21';

export default function SalonDashboard() {
  const { unreadCount } = useUnreadMessages();
  const [isVerified, setIsVerified] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSalonStatus();
  }, []);

  const loadSalonStatus = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const res = await fetch(`${SALON_API}?action=salon_profile`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (res.ok) {
        const data = await res.json();
        if (data.salon) {
          setIsVerified(data.salon.is_verified);
        }
      }
    } catch (error) {
      console.error('Ошибка загрузки статуса салона:', error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <>
      {!loading && isVerified === false && (
        <Card className="mb-6 bg-amber-50 border-amber-200">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Icon name="Clock" className="text-amber-600" size={24} />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-amber-900 mb-2">Ожидает модерации</h3>
                <p className="text-sm text-amber-800 mb-3">
                  Ваш профиль салона находится на проверке. После успешной верификации вы появитесь в каталоге салонов 
                  и сможете получить значок "Verified". Обычно проверка занимает 1-2 рабочих дня.
                </p>
                <p className="text-xs text-amber-700 mb-4">
                  <Icon name="Info" size={14} className="inline mr-1" />
                  До верификации ваш профиль не виден другим пользователям в каталоге
                </p>
                <Link to="/salon-cabinet">
                  <Button size="sm" className="bg-amber-600 hover:bg-amber-700">
                    <Icon name="Edit" size={16} className="mr-2" />
                    Заполнить профиль салона
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
            <Icon name="Briefcase" className="text-primary" size={24} />
          </div>
          <h3 className="text-xl font-semibold">Вакансии</h3>
        </div>
        <p className="text-gray-600 mb-4">Управление вакансиями салона</p>
        <Button className="w-full">Добавить вакансию</Button>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
            <Icon name="Users" className="text-primary" size={24} />
          </div>
          <h3 className="text-xl font-semibold">Команда</h3>
        </div>
        <p className="text-gray-600 mb-4">Управление персоналом</p>
        <Link to="/salons">
          <Button className="w-full" variant="outline">Мои сотрудники</Button>
        </Link>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
            <Icon name="BarChart" className="text-primary" size={24} />
          </div>
          <h3 className="text-xl font-semibold">Аналитика</h3>
        </div>
        <p className="text-gray-600 mb-4">Отчеты и статистика</p>
        <Button className="w-full" variant="outline">Отчёты</Button>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:border-primary/50 transition-colors">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
            <Icon name="Calendar" className="text-primary" size={24} />
          </div>
          <h3 className="text-xl font-semibold">Записи клиентов</h3>
        </div>
        <p className="text-gray-600 mb-4">Управление записями</p>
        <Link to="/dashboard/bookings">
          <Button className="w-full">Посмотреть записи</Button>
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
        <p className="text-gray-600 mb-4">Чаты с клиентами</p>
        <Link to="/dashboard/messages">
          <Button className="w-full">Открыть чаты</Button>
        </Link>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:border-primary/50 transition-colors">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
            <Icon name="Star" className="text-primary" size={24} />
          </div>
          <h3 className="text-xl font-semibold">Отзывы</h3>
        </div>
        <p className="text-gray-600 mb-4">Отзывы клиентов о салоне</p>
        <Button className="w-full">Посмотреть отзывы</Button>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
            <Icon name="Search" className="text-primary" size={24} />
          </div>
          <h3 className="text-xl font-semibold">Поиск специалистов</h3>
        </div>
        <p className="text-gray-600 mb-4">Найти новых сотрудников</p>
        <Link to="/masseurs">
          <Button className="w-full" variant="outline">Найти массажиста</Button>
        </Link>
      </div>
      </div>
    </>
  );
}