import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { useUnreadMessages } from '@/hooks/useUnreadMessages';
import { useNewReviews } from '@/hooks/useNewReviews';

export default function MasseurDashboard() {
  const { unreadCount } = useUnreadMessages();
  const { newReviewsCount } = useNewReviews();
  
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
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
            <Icon name="ShoppingBag" className="text-primary" size={24} />
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
    </div>
  );
}