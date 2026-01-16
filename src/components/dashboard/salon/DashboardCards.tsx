import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';

interface DashboardCardsProps {
  unreadCount: number;
  showCatalogInfo: boolean;
  onShowCatalogInfo: (show: boolean) => void;
  onEditProfile: () => void;
  onAddVacancy: () => void;
}

export default function DashboardCards({
  unreadCount,
  showCatalogInfo,
  onShowCatalogInfo,
  onEditProfile,
  onAddVacancy
}: DashboardCardsProps) {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
              <Icon name="Settings" className="text-primary" size={20} />
            </div>
            <h3 className="text-lg md:text-xl font-semibold">Профиль салона</h3>
          </div>
          <p className="text-sm md:text-base text-gray-600 mb-3 md:mb-4">Редактировать информацию о салоне</p>
          <Button className="w-full" onClick={onEditProfile}>
            <Icon name="Edit" size={16} className="mr-2" />
            Редактировать профиль
          </Button>
        </div>

        <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
              <Icon name="Briefcase" className="text-primary" size={20} />
            </div>
            <h3 className="text-lg md:text-xl font-semibold">Вакансии</h3>
          </div>
          <p className="text-sm md:text-base text-gray-600 mb-3 md:mb-4">Управление вакансиями салона</p>
          <Button className="w-full" onClick={onAddVacancy}>Добавить вакансию</Button>
        </div>

        <div className="relative bg-gradient-to-br from-primary/5 via-white to-primary/10 rounded-xl p-4 md:p-6 shadow-lg border-2 border-primary/30 hover:border-primary/60 transition-all hover:shadow-xl">
          <div className="absolute -top-3 -right-3 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
            Premium
          </div>
          <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
              <Icon name="Wrench" className="text-white" size={20} />
            </div>
            <h3 className="text-lg md:text-xl font-semibold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">Инструменты</h3>
          </div>
          <p className="text-sm md:text-base text-gray-700 mb-3 md:mb-4 font-medium">Полезные инструменты для автоматизации работы</p>
          <Link to="/dashboard/tools">
            <Button className="w-full shadow-md">Открыть инструменты</Button>
          </Link>
        </div>

        <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm border border-gray-100 relative">
          <div className="absolute top-3 right-3">
            <Badge variant="secondary" className="bg-amber-100 text-amber-700">
              Временно
            </Badge>
          </div>
          <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Icon name="Store" className="text-gray-400" size={20} />
            </div>
            <h3 className="text-lg md:text-xl font-semibold text-gray-400">Каталог салонов</h3>
          </div>
          <p className="text-sm md:text-base text-gray-500 mb-3 md:mb-4">Каталог временно в разработке</p>
          <Button 
            className="w-full" 
            variant="outline"
            onClick={() => onShowCatalogInfo(true)}
          >
            <Icon name="Info" size={18} className="mr-2" />
            Подробнее
          </Button>
        </div>

        <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
              <Icon name="BarChart" className="text-primary" size={20} />
            </div>
            <h3 className="text-lg md:text-xl font-semibold">Аналитика</h3>
          </div>
          <p className="text-sm md:text-base text-gray-600 mb-3 md:mb-4">Отчеты и статистика</p>
          <Button className="w-full">Отчёты</Button>
        </div>

        <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm border border-gray-100 hover:border-primary/50 transition-colors">
          <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
              <Icon name="Calendar" className="text-primary" size={20} />
            </div>
            <h3 className="text-lg md:text-xl font-semibold">Записи клиентов</h3>
          </div>
          <p className="text-sm md:text-base text-gray-600 mb-3 md:mb-4">Управление записями</p>
          <Link to="/dashboard/bookings">
            <Button className="w-full">Посмотреть записи</Button>
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
            <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
              <Icon name="Star" className="text-primary" size={20} />
            </div>
            <h3 className="text-lg md:text-xl font-semibold">Отзывы</h3>
          </div>
          <p className="text-sm md:text-base text-gray-600 mb-3 md:mb-4">Отзывы клиентов о салоне</p>
          <Button className="w-full">Посмотреть отзывы</Button>
        </div>

        <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm border border-gray-100 hover:border-primary/50 transition-colors">
          <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
              <Icon name="BookOpen" className="text-primary" size={20} />
            </div>
            <h3 className="text-lg md:text-xl font-semibold">База знаний</h3>
          </div>
          <p className="text-sm md:text-base text-gray-600 mb-3 md:mb-4">Инструкции и ответы на вопросы</p>
          <Link to="/dashboard/knowledge-base">
            <Button className="w-full" variant="outline">Открыть базу знаний</Button>
          </Link>
        </div>

        <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm border border-gray-100 hover:border-primary/50 transition-colors">
          <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
              <Icon name="Settings" className="text-primary" size={20} />
            </div>
            <h3 className="text-lg md:text-xl font-semibold">Настройки аккаунта</h3>
          </div>
          <p className="text-sm md:text-base text-gray-600 mb-3 md:mb-4">Смена пароля и безопасность</p>
          <Link to="/dashboard/account-settings">
            <Button className="w-full">Открыть настройки</Button>
          </Link>
        </div>
      </div>

      <Dialog open={showCatalogInfo} onOpenChange={onShowCatalogInfo}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Icon name="Store" size={24} className="text-primary" />
              Каталог салонов
            </DialogTitle>
            <DialogDescription className="text-left space-y-3 pt-4">
              <p className="text-base text-gray-700">
                Каталог салонов временно находится в разработке и скоро будет запущен.
              </p>
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                <p className="text-sm text-emerald-800 font-medium mb-2">
                  ✓ Вы можете продолжать работу с карточкой салона:
                </p>
                <ul className="text-sm text-emerald-700 space-y-1 list-disc list-inside">
                  <li>Оформляйте и отправляйте карточку на модерацию</li>
                  <li>Размещайте вакансии массажистов</li>
                  <li>Обновляйте информацию о салоне</li>
                </ul>
              </div>
              <p className="text-sm text-gray-600">
                Все карточки проходят модерацию, и как только каталог заработает — ваш салон автоматически появится в нём.
              </p>
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-2">
            <Button onClick={() => onShowCatalogInfo(false)} className="flex-1">
              Понятно
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
