import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

export default function SalonDashboard() {
  return (
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
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
            <Icon name="MessageSquare" className="text-primary" size={24} />
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
  );
}
