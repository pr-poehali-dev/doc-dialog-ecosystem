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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm border border-gray-100 hover:border-primary/50 transition-colors">
        <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
            <Icon name="Globe" className="text-primary" size={20} />
          </div>
          <h3 className="text-lg md:text-xl font-semibold">Публичный профиль</h3>
        </div>
        <p className="text-sm md:text-base text-gray-600 mb-3 md:mb-4">Ваша страница для клиентов в каталоге</p>
        <Link to="/dashboard/public-profile">
          <Button className="w-full">Настроить профиль</Button>
        </Link>
      </div>

      <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm border border-gray-100 hover:border-primary/50 transition-colors">
        <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
            <Icon name="Layout" className="text-primary" size={20} />
          </div>
          <h3 className="text-lg md:text-xl font-semibold">Личная страница</h3>
        </div>
        <p className="text-sm md:text-base text-gray-600 mb-3 md:mb-4">Конструктор лендинга для клиентов</p>
        <Link to="/dashboard/page-builder">
          <Button className="w-full">Создать страницу</Button>
        </Link>
      </div>

      <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm border border-gray-100 hover:border-primary/50 transition-colors">
        <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 relative">
            <Icon name="Star" className="text-primary" size={20} />
            {newReviewsCount > 0 && (
              <Badge className="absolute -top-1 -right-1 h-5 min-w-5 flex items-center justify-center p-0 px-1.5 text-xs bg-primary border-2 border-white">
                {newReviewsCount}
              </Badge>
            )}
          </div>
          <h3 className="text-lg md:text-xl font-semibold">Мои отзывы</h3>
        </div>
        <p className="text-sm md:text-base text-gray-600 mb-3 md:mb-4">Отзывы клиентов о вашей работе</p>
        <Link to="/dashboard/reviews">
          <Button className="w-full">Посмотреть отзывы</Button>
        </Link>
      </div>

      <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm border border-gray-100 hover:border-primary/50 transition-colors">
        <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 relative">
            <Icon name="MessageSquare" className="text-primary" size={20} />
            {unreadCount > 0 && (
              <Badge className="absolute -top-1 -right-1 h-5 min-w-5 flex items-center justify-center p-0 px-1.5 text-xs bg-primary border-2 border-white">
                {unreadCount}
              </Badge>
            )}
          </div>
          <h3 className="text-lg md:text-xl font-semibold">Сообщения</h3>
        </div>
        <p className="text-sm md:text-base text-gray-600 mb-3 md:mb-4">Чаты с клиентами</p>
        <Link to="/dashboard/messages">
          <Button className="w-full">Открыть чаты</Button>
        </Link>
      </div>

      <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm border border-gray-100 hover:border-primary/50 transition-colors">
        <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 relative">
            <Icon name="ShoppingBag" className="text-primary" size={20} />
            {newOrdersCount > 0 && (
              <Badge className="absolute -top-1 -right-1 h-5 min-w-5 flex items-center justify-center p-0 px-1.5 text-xs bg-primary border-2 border-white">
                {newOrdersCount}
              </Badge>
            )}
          </div>
          <h3 className="text-lg md:text-xl font-semibold">Заказы услуг</h3>
        </div>
        <p className="text-sm md:text-base text-gray-600 mb-3 md:mb-4">Запросы клиентов на ваши услуги</p>
        <Link to="/dashboard/orders">
          <Button className="w-full">Смотреть заказы</Button>
        </Link>
      </div>

      <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm border border-gray-100">
        <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
            <Icon name="Calendar" className="text-primary" size={20} />
          </div>
          <h3 className="text-lg md:text-xl font-semibold">Записи клиентов</h3>
        </div>
        <p className="text-sm md:text-base text-gray-600 mb-3 md:mb-4">Управление записями на сеансы</p>
        <Link to="/dashboard/bookings">
          <Button className="w-full" variant="outline">Мои записи</Button>
        </Link>
      </div>

      <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm border border-gray-100">
        <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
            <Icon name="Search" className="text-primary" size={20} />
          </div>
          <h3 className="text-lg md:text-xl font-semibold">Каталог массажистов</h3>
        </div>
        <p className="text-sm md:text-base text-gray-600 mb-3 md:mb-4">Узнайте о коллегах по цеху</p>
        <Link to="/masseurs">
          <Button className="w-full" variant="outline">Перейти в каталог</Button>
        </Link>
      </div>

      <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm border border-gray-100">
        <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
            <Icon name="Briefcase" className="text-primary" size={20} />
          </div>
          <h3 className="text-lg md:text-xl font-semibold">Вакансии в салонах</h3>
        </div>
        <p className="text-sm md:text-base text-gray-600 mb-3 md:mb-4">Найти работу в проверенных салонах</p>
        <Link to="/salons">
          <Button className="w-full" variant="outline">Смотреть вакансии</Button>
        </Link>
      </div>

      <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm border border-gray-100 hover:border-primary/50 transition-colors">
        <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
            <Icon name="Wallet" className="text-primary" size={20} />
          </div>
          <h3 className="text-lg md:text-xl font-semibold">Баланс</h3>
        </div>
        <p className="text-sm md:text-base text-gray-600 mb-3 md:mb-4">Пополните баланс для продвижения</p>
        <Link to="/dashboard/balance">
          <Button className="w-full">Управление балансом</Button>
        </Link>
      </div>

      <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-4 md:p-6 shadow-sm border-2 border-amber-200 hover:border-amber-300 transition-colors">
        <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
            <Icon name="TrendingUp" className="text-white" size={20} />
          </div>
          <h3 className="text-lg md:text-xl font-semibold">Продвижение</h3>
        </div>
        <p className="text-sm md:text-base text-gray-700 mb-3 md:mb-4">Поднимите профиль в ТОП и привлеките больше клиентов</p>
        <Link to="/dashboard/balance">
          <Button 
            className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold shadow-md hover:shadow-lg transition-all"
          >
            <Icon name="Zap" size={16} className="mr-2" />
            Продвинуть профиль
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm border border-gray-100 hover:border-primary/50 transition-colors">
        <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
            <Icon name="BookOpen" className="text-primary" size={20} />
          </div>
          <h3 className="text-lg md:text-xl font-semibold">База знаний</h3>
        </div>
        <p className="text-sm md:text-base text-gray-600 mb-3 md:mb-4">Ответы на все вопросы по работе в кабинете</p>
        <Link to="/dashboard/knowledge-base">
          <Button className="w-full" variant="outline">Открыть базу знаний</Button>
        </Link>
      </div>

      <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm border border-gray-100 hover:border-primary/50 transition-colors">
        <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
            <Icon name="Wrench" className="text-primary" size={20} />
          </div>
          <h3 className="text-lg md:text-xl font-semibold">Инструменты</h3>
        </div>
        <p className="text-sm md:text-base text-gray-600 mb-3 md:mb-4">Полезные инструменты для автоматизации работы</p>
        <Link to="/dashboard/tools">
          <Button className="w-full" variant="outline">Открыть инструменты</Button>
        </Link>
      </div>

      <PromoteMasseurDialog
        isOpen={promoteDialogOpen}
        onClose={() => setPromoteDialogOpen(false)}
        masseurData={masseurData}
      />
    </div>
  );
}