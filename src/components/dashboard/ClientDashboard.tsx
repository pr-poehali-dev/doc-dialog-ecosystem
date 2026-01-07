import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { useUnreadMessages } from '@/hooks/useUnreadMessages';
import { useToast } from '@/hooks/use-toast';

export default function ClientDashboard() {
  const { unreadCount } = useUnreadMessages();
  const { toast } = useToast();

  const handleInDevelopment = () => {
    toast({
      title: "Функция в разработке",
      description: "Этот раздел скоро будет доступен. Следите за обновлениями!",
    });
  };
  
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:border-primary/50 transition-colors">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
            <Icon name="Search" className="text-primary" size={24} />
          </div>
          <h3 className="text-xl font-semibold">Каталог специалистов</h3>
        </div>
        <p className="text-gray-600 mb-4">Найдите своего массажиста</p>
        <Link to="/masseurs">
          <Button className="w-full">Перейти в каталог</Button>
        </Link>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:border-primary/50 transition-colors">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
            <Icon name="Star" className="text-primary" size={24} />
          </div>
          <h3 className="text-xl font-semibold">Мои отзывы</h3>
        </div>
        <p className="text-gray-600 mb-4">Отзывы о посещенных специалистах</p>
        <Link to="/dashboard/my-reviews">
          <Button className="w-full">Мои отзывы</Button>
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
        <p className="text-gray-600 mb-4">Чаты со специалистами</p>
        <Link to="/dashboard/messages">
          <Button className="w-full">Открыть чаты</Button>
        </Link>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:border-primary/50 transition-colors">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
            <Icon name="ShoppingBag" className="text-primary" size={24} />
          </div>
          <h3 className="text-xl font-semibold">Мои заказы</h3>
        </div>
        <p className="text-gray-600 mb-4">Запросы на услуги массажистов</p>
        <Link to="/dashboard/my-orders">
          <Button className="w-full">Смотреть заказы</Button>
        </Link>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:border-primary/50 transition-colors">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
            <Icon name="Calendar" className="text-primary" size={24} />
          </div>
          <h3 className="text-xl font-semibold">Записи в салоны</h3>
        </div>
        <p className="text-gray-600 mb-4">История бронирований в салонах</p>
        <Button className="w-full" onClick={handleInDevelopment}>Мои записи</Button>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
            <Icon name="Heart" className="text-primary" size={24} />
          </div>
          <h3 className="text-xl font-semibold">Избранное</h3>
        </div>
        <p className="text-gray-600 mb-4">Сохраненные специалисты</p>
        <Link to="/dashboard/favorites">
          <Button className="w-full" variant="outline">Мои избранные</Button>
        </Link>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
            <Icon name="MapPin" className="text-primary" size={24} />
          </div>
          <h3 className="text-xl font-semibold">Салоны</h3>
        </div>
        <p className="text-gray-600 mb-4">Массажные салоны в вашем городе</p>
        <Button className="w-full" variant="outline" onClick={handleInDevelopment}>Найти салон</Button>
      </div>
    </div>
  );
}