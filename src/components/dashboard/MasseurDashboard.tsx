import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { useUnreadMessages } from '@/hooks/useUnreadMessages';
import { useNewReviews } from '@/hooks/useNewReviews';
import { useNewOrders } from '@/hooks/useNewOrders';
import PromoteMasseurDialog from '@/components/masseur/PromoteMasseurDialog';

const MASSEURS_API = 'https://functions.poehali.dev/49394b85-90a2-40ca-a843-19e551c6c436';

export default function MasseurDashboard() {
  const { unreadCount } = useUnreadMessages();
  const { newReviewsCount } = useNewReviews();
  const { newOrdersCount } = useNewOrders();
  const [promoteDialogOpen, setPromoteDialogOpen] = useState(false);
  const [masseurData, setMasseurData] = useState<any>(null);

  useEffect(() => {
    loadMasseurData();
  }, []);

  const loadMasseurData = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const user = JSON.parse(atob(token.split('.')[1]));
      const userId = user.user_id;

      const response = await fetch(MASSEURS_API);
      if (response.ok) {
        const data = await response.json();
        const masseurs = data.masseurs || data;
        const found = masseurs.find((m: any) => m.user_id === userId);
        setMasseurData(found);
      }
    } catch (error) {
      console.error('Error loading masseur data:', error);
    }
  };
  
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:border-primary/50 transition-colors">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
            <Icon name="Globe" className="text-primary" size={24} />
          </div>
          <h3 className="text-xl font-semibold">Публичный профиль</h3>
        </div>
        <p className="text-gray-600 mb-4">Ваша страница для клиентов в каталоге</p>
        <Link to="/dashboard/public-profile">
          <Button className="w-full">Настроить профиль</Button>
        </Link>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:border-primary/50 transition-colors">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
            <Icon name="Layout" className="text-primary" size={24} />
          </div>
          <h3 className="text-xl font-semibold">Личная страница</h3>
        </div>
        <p className="text-gray-600 mb-4">Конструктор лендинга для клиентов</p>
        <Link to="/dashboard/page-builder">
          <Button className="w-full">Создать страницу</Button>
        </Link>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:border-primary/50 transition-colors">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center relative">
            <Icon name="Star" className="text-primary" size={24} />
            {newReviewsCount > 0 && (
              <Badge className="absolute -top-1 -right-1 h-5 min-w-5 flex items-center justify-center p-0 px-1.5 text-xs bg-primary border-2 border-white">
                {newReviewsCount}
              </Badge>
            )}
          </div>
          <h3 className="text-xl font-semibold">Мои отзывы</h3>
        </div>
        <p className="text-gray-600 mb-4">Отзывы клиентов о вашей работе</p>
        <Link to="/dashboard/reviews">
          <Button className="w-full">Посмотреть отзывы</Button>
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
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center relative">
            <Icon name="ShoppingBag" className="text-primary" size={24} />
            {newOrdersCount > 0 && (
              <Badge className="absolute -top-1 -right-1 h-5 min-w-5 flex items-center justify-center p-0 px-1.5 text-xs bg-primary border-2 border-white">
                {newOrdersCount}
              </Badge>
            )}
          </div>
          <h3 className="text-xl font-semibold">Заказы услуг</h3>
        </div>
        <p className="text-gray-600 mb-4">Запросы клиентов на ваши услуги</p>
        <Link to="/dashboard/orders">
          <Button className="w-full">Смотреть заказы</Button>
        </Link>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
            <Icon name="Calendar" className="text-primary" size={24} />
          </div>
          <h3 className="text-xl font-semibold">Записи клиентов</h3>
        </div>
        <p className="text-gray-600 mb-4">Управление записями на сеансы</p>
        <Link to="/dashboard/bookings">
          <Button className="w-full" variant="outline">Мои записи</Button>
        </Link>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
            <Icon name="Search" className="text-primary" size={24} />
          </div>
          <h3 className="text-xl font-semibold">Каталог массажистов</h3>
        </div>
        <p className="text-gray-600 mb-4">Узнайте о коллегах по цеху</p>
        <Link to="/masseurs">
          <Button className="w-full" variant="outline">Перейти в каталог</Button>
        </Link>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
            <Icon name="Briefcase" className="text-primary" size={24} />
          </div>
          <h3 className="text-xl font-semibold">Вакансии в салонах</h3>
        </div>
        <p className="text-gray-600 mb-4">Найти работу в проверенных салонах</p>
        <Link to="/salons">
          <Button className="w-full" variant="outline">Смотреть вакансии</Button>
        </Link>
      </div>

      <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-6 shadow-sm border-2 border-amber-200 hover:border-amber-300 transition-colors">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center">
            <Icon name="TrendingUp" className="text-white" size={24} />
          </div>
          <h3 className="text-xl font-semibold">Попасть в топ</h3>
        </div>
        <p className="text-gray-600 mb-4">Продвиньте профиль и получайте больше клиентов</p>
        <Button 
          className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
          onClick={() => setPromoteDialogOpen(true)}
        >
          <Icon name="Crown" size={18} className="mr-2" />
          Попасть в топ
        </Button>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:border-primary/50 transition-colors">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
            <Icon name="Tag" className="text-amber-600" size={24} />
          </div>
          <h3 className="text-xl font-semibold">Мои промокоды</h3>
        </div>
        <p className="text-gray-600 mb-4">Скидки на курсы от школ</p>
        <Link to="/dashboard/promo-codes">
          <Button className="w-full">Мои скидки</Button>
        </Link>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
            <Icon name="BookOpen" className="text-primary" size={24} />
          </div>
          <h3 className="text-xl font-semibold">Каталог курсов</h3>
        </div>
        <p className="text-gray-600 mb-4">Обучающие курсы от школ-партнёров</p>
        <Link to="/courses">
          <Button className="w-full" variant="outline">Перейти к курсам</Button>
        </Link>
      </div>

      {masseurData && (
        <PromoteMasseurDialog
          open={promoteDialogOpen}
          onOpenChange={setPromoteDialogOpen}
          masseurId={masseurData.id}
          masseurName={masseurData.full_name}
          city={masseurData.city}
          onSuccess={loadMasseurData}
        />
      )}
    </div>
  );
}