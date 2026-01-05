import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface User {
  id: number;
  email: string;
  role: 'masseur' | 'school' | 'salon' | 'admin' | 'moderator';
}

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (!token || !userData) {
      navigate('/login');
      return;
    }

    setUser(JSON.parse(userData));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  if (!user) return null;

  const getRoleTitle = () => {
    switch (user.role) {
      case 'masseur':
        return 'Массажист';
      case 'school':
        return 'Школа массажа';
      case 'salon':
        return 'Массажный салон';
      case 'admin':
        return 'Администратор';
      case 'moderator':
        return 'Модератор';
      default:
        return '';
    }
  };

  const isAdminOrModerator = user.role === 'admin' || user.role === 'moderator';

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50">
      <Navigation />
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold mb-2">Личный кабинет</h1>
              <p className="text-gray-600">{user.email} • {getRoleTitle()}</p>
            </div>
            <div className="flex gap-2">
              {isAdminOrModerator && (
                <Link to="/admin">
                  <Button variant="secondary">
                    <Icon name="Shield" size={18} className="mr-2" />
                    Админ-панель
                  </Button>
                </Link>
              )}
              <Button onClick={handleLogout} variant="outline">
                <Icon name="LogOut" size={18} className="mr-2" />
                Выйти
              </Button>
            </div>
          </div>

          {user.role === 'masseur' && (
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
                    <Icon name="Users" className="text-primary" size={24} />
                  </div>
                  <h3 className="text-xl font-semibold">База клиентов</h3>
                </div>
                <p className="text-gray-600 mb-4">CRM и повторные записи</p>
                <Link to="/dashboard/clients">
                  <Button className="w-full">Управлять клиентами</Button>
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
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Icon name="Award" className="text-primary" size={24} />
                  </div>
                  <h3 className="text-xl font-semibold">Бейджи доверия</h3>
                </div>
                <p className="text-gray-600 mb-4">Система верификации и репутация</p>
                <Link to="/dashboard/badges">
                  <Button className="w-full" variant="outline">Мои бейджи</Button>
                </Link>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:border-primary/50 transition-colors">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Icon name="GraduationCap" className="text-primary" size={24} />
                  </div>
                  <h3 className="text-xl font-semibold">Обучение</h3>
                </div>
                <p className="text-gray-600 mb-4">Курсы по работе с клиентами</p>
                <Link to="/dashboard/education">
                  <Button className="w-full" variant="outline">К курсам</Button>
                </Link>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:border-primary/50 transition-colors">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Icon name="MessageSquare" className="text-primary" size={24} />
                  </div>
                  <h3 className="text-xl font-semibold">Сообщения</h3>
                </div>
                <p className="text-gray-600 mb-4">Чаты с клиентами и салонами</p>
                <Link to="/dashboard/messages">
                  <Button className="w-full">Открыть чаты</Button>
                </Link>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:border-primary/50 transition-colors">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Icon name="Users" className="text-primary" size={24} />
                  </div>
                  <h3 className="text-xl font-semibold">Сообщество</h3>
                </div>
                <p className="text-gray-600 mb-4">Обмен опытом и рекомендации</p>
                <Link to="/dashboard/community">
                  <Button className="w-full" variant="outline">В сообщество</Button>
                </Link>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Icon name="Search" className="text-primary" size={24} />
                  </div>
                  <h3 className="text-xl font-semibold">Каталог массажистов</h3>
                </div>
                <p className="text-gray-600 mb-4">Найти коллег и обменяться опытом</p>
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
          )}

          {user.role === 'school' && (
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

            </div>
          )}

          {user.role === 'salon' && (
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
                  <h3 className="text-xl font-semibold">Отклики</h3>
                </div>
                <p className="text-gray-600 mb-4">Просмотр откликов специалистов</p>
                <Button className="w-full" variant="outline">Смотреть отклики</Button>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Icon name="Building2" className="text-primary" size={24} />
                  </div>
                  <h3 className="text-xl font-semibold">Страница салона</h3>
                </div>
                <p className="text-gray-600 mb-4">Редактировать профиль</p>
                <Button className="w-full" variant="outline">Редактировать</Button>
              </div>
            </div>
          )}

          {(user.role === 'admin' || user.role === 'moderator') && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-red-500/10 rounded-full flex items-center justify-center">
                    <Icon name="Shield" className="text-red-600" size={24} />
                  </div>
                  <h3 className="text-xl font-semibold">Админ-панель</h3>
                </div>
                <p className="text-gray-600 mb-4">Модерация и управление платформой</p>
                <Link to="/admin">
                  <Button className="w-full">Открыть панель</Button>
                </Link>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Icon name="BookOpen" className="text-primary" size={24} />
                  </div>
                  <h3 className="text-xl font-semibold">Все курсы</h3>
                </div>
                <p className="text-gray-600 mb-4">Просмотр всех курсов на платформе</p>
                <Link to="/courses">
                  <Button className="w-full" variant="outline">Смотреть курсы</Button>
                </Link>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Icon name="Users" className="text-primary" size={24} />
                  </div>
                  <h3 className="text-xl font-semibold">Массажисты</h3>
                </div>
                <p className="text-gray-600 mb-4">База массажистов платформы</p>
                <Link to="/masseurs">
                  <Button className="w-full" variant="outline">Смотреть каталог</Button>
                </Link>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Icon name="Building2" className="text-primary" size={24} />
                  </div>
                  <h3 className="text-xl font-semibold">Салоны</h3>
                </div>
                <p className="text-gray-600 mb-4">Массажные салоны и вакансии</p>
                <Button className="w-full" variant="outline">Смотреть салоны</Button>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Icon name="MessageSquare" className="text-primary" size={24} />
                  </div>
                  <h3 className="text-xl font-semibold">Чат с клиентами</h3>
                </div>
                <p className="text-gray-600 mb-4">Сообщения и поддержка</p>
                <Button className="w-full" variant="outline">Открыть чат</Button>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center">
                    <Icon name="Coins" className="text-green-600" size={24} />
                  </div>
                  <h3 className="text-xl font-semibold">Биллинг</h3>
                </div>
                <p className="text-gray-600 mb-4">Платежи и подписки</p>
                <Button className="w-full" variant="outline">Открыть биллинг</Button>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Icon name="BarChart3" className="text-primary" size={24} />
                  </div>
                  <h3 className="text-xl font-semibold">Аналитика</h3>
                </div>
                <p className="text-gray-600 mb-4">Статистика и отчёты</p>
                <Button className="w-full" variant="outline">Смотреть отчёты</Button>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Icon name="Settings" className="text-primary" size={24} />
                  </div>
                  <h3 className="text-xl font-semibold">Настройки</h3>
                </div>
                <p className="text-gray-600 mb-4">Настройки платформы</p>
                <Button className="w-full" variant="outline">Открыть настройки</Button>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-purple-500/10 rounded-full flex items-center justify-center">
                    <Icon name="Mail" className="text-purple-600" size={24} />
                  </div>
                  <h3 className="text-xl font-semibold">Рассылки</h3>
                </div>
                <p className="text-gray-600 mb-4">Email и уведомления</p>
                <Button className="w-full" variant="outline">Создать рассылку</Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}