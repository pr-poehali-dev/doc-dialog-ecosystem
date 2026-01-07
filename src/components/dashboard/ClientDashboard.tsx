import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

export default function ClientDashboard() {
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
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
            <Icon name="MessageSquare" className="text-primary" size={24} />
          </div>
          <h3 className="text-xl font-semibold">Сообщения</h3>
        </div>
        <p className="text-gray-600 mb-4">Чаты со специалистами</p>
        <Link to="/dashboard/messages">
          <Button className="w-full">Открыть чаты</Button>
        </Link>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
            <Icon name="Calendar" className="text-primary" size={24} />
          </div>
          <h3 className="text-xl font-semibold">Мои записи</h3>
        </div>
        <p className="text-gray-600 mb-4">История бронирований</p>
        <Link to="/dashboard/bookings">
          <Button className="w-full" variant="outline">Мои записи</Button>
        </Link>
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
        <Link to="/salons">
          <Button className="w-full" variant="outline">Найти салон</Button>
        </Link>
      </div>
    </div>
  );
}
