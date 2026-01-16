import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface Stats {
  total_users: number;
  total_masseurs: number;
  total_appointments: number;
  pending_reviews: number;
  pending_moderations: number;
  pending_courses: number;
  pending_masterminds: number;
  pending_offline_trainings: number;
  pending_verifications: number;
}

interface AdminTabNavigationProps {
  activeTab: string;
  setActiveTab: (tab: any) => void;
  stats: Stats | null;
  pendingVerifications: number;
}

export default function AdminTabNavigation({ activeTab, setActiveTab, stats, pendingVerifications }: AdminTabNavigationProps) {
  const navigate = useNavigate();

  return (
    <div className="flex gap-2 mb-6 sm:mb-8 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
      <Button 
        variant={activeTab === 'dashboard' ? 'default' : 'outline'}
        onClick={() => setActiveTab('dashboard')}
        className="whitespace-nowrap flex-shrink-0 text-xs sm:text-sm"
      >
        <Icon name="LayoutDashboard" size={16} className="sm:mr-2" />
        <span className="hidden sm:inline">Статистика</span>
      </Button>
      <Button 
        variant={activeTab === 'users' ? 'default' : 'outline'}
        onClick={() => setActiveTab('users')}
        className="whitespace-nowrap flex-shrink-0 text-xs sm:text-sm"
      >
        <Icon name="Users" size={16} className="sm:mr-2" />
        <span className="hidden sm:inline">Пользователи</span>
      </Button>
      <Button 
        variant={activeTab === 'courses' ? 'default' : 'outline'}
        onClick={() => setActiveTab('courses')}
        className="whitespace-nowrap flex-shrink-0 text-xs sm:text-sm"
      >
        <Icon name="BookOpen" size={16} className="sm:mr-2" />
        <span className="hidden sm:inline">Курсы</span>
        {stats && stats.pending_courses > 0 && (
          <Badge className="ml-1 sm:ml-2" variant="destructive">{stats.pending_courses}</Badge>
        )}
      </Button>
      <Button 
        variant={activeTab === 'masterminds' ? 'default' : 'outline'}
        onClick={() => setActiveTab('masterminds')}
        className="whitespace-nowrap flex-shrink-0 text-xs sm:text-sm"
      >
        <Icon name="Users" size={16} className="sm:mr-2" />
        <span className="hidden sm:inline">Мастермайнды</span>
        {stats && stats.pending_masterminds > 0 && (
          <Badge className="ml-1 sm:ml-2" variant="destructive">{stats.pending_masterminds}</Badge>
        )}
      </Button>
      <Button 
        variant={activeTab === 'offline-training' ? 'default' : 'outline'}
        onClick={() => setActiveTab('offline-training')}
        className="whitespace-nowrap flex-shrink-0 text-xs sm:text-sm"
      >
        <Icon name="GraduationCap" size={16} className="sm:mr-2" />
        <span className="hidden sm:inline">Очное обучение</span>
        {stats && stats.pending_offline_trainings > 0 && (
          <Badge className="ml-1 sm:ml-2" variant="destructive">{stats.pending_offline_trainings}</Badge>
        )}
      </Button>
      <Button 
        variant={activeTab === 'reviews' ? 'default' : 'outline'}
        onClick={() => setActiveTab('reviews')}
        className="whitespace-nowrap flex-shrink-0 text-xs sm:text-sm"
      >
        <Icon name="MessageSquare" size={16} className="sm:mr-2" />
        <span className="hidden sm:inline">Отзывы</span>
        {stats && stats.pending_reviews > 0 && (
          <Badge className="ml-1 sm:ml-2" variant="destructive">{stats.pending_reviews}</Badge>
        )}
      </Button>
      <Button 
        variant={activeTab === 'schools' ? 'default' : 'outline'}
        onClick={() => setActiveTab('schools')}
        className="whitespace-nowrap flex-shrink-0 text-xs sm:text-sm"
      >
        <Icon name="Building2" size={16} className="sm:mr-2" />
        <span className="hidden sm:inline">Школы</span>
      </Button>
      <Button 
        variant={activeTab === 'knowledge' ? 'default' : 'outline'}
        onClick={() => setActiveTab('knowledge')}
        className="whitespace-nowrap flex-shrink-0 text-xs sm:text-sm"
      >
        <Icon name="BookOpen" size={16} className="sm:mr-2" />
        <span className="hidden sm:inline">База знаний</span>
      </Button>
      <Button 
        variant={activeTab === 'verifications' ? 'default' : 'outline'}
        onClick={() => setActiveTab('verifications')}
        className="whitespace-nowrap flex-shrink-0 text-xs sm:text-sm relative"
      >
        <Icon name="BadgeCheck" size={16} className="sm:mr-2" />
        <span className="hidden sm:inline">Верификации</span>
        {pendingVerifications > 0 && (
          <Badge className="ml-1 sm:ml-2" variant="destructive">{pendingVerifications}</Badge>
        )}
      </Button>
      <Button 
        variant={activeTab === 'salons' ? 'default' : 'outline'}
        onClick={() => setActiveTab('salons')}
        className="whitespace-nowrap flex-shrink-0 text-xs sm:text-sm"
      >
        <Icon name="Building" size={16} className="sm:mr-2" />
        <span className="hidden sm:inline">Салоны</span>
      </Button>
      <Button 
        variant={activeTab === 'payments' ? 'default' : 'outline'}
        onClick={() => setActiveTab('payments')}
        className="whitespace-nowrap flex-shrink-0 text-xs sm:text-sm"
      >
        <Icon name="CreditCard" size={16} className="sm:mr-2" />
        <span className="hidden sm:inline">Платежи</span>
      </Button>
      <Button 
        variant={activeTab === 'tools' ? 'default' : 'outline'}
        onClick={() => setActiveTab('tools')}
        className="whitespace-nowrap flex-shrink-0 text-xs sm:text-sm"
      >
        <Icon name="Wrench" size={16} className="sm:mr-2" />
        <span className="hidden sm:inline">Инструменты</span>
      </Button>
      <Button 
        onClick={() => navigate('/admin/import-specialists')}
        className="whitespace-nowrap flex-shrink-0 text-xs sm:text-sm bg-gradient-to-r from-primary to-purple-600"
      >
        <Icon name="Upload" size={16} className="sm:mr-2" />
        <span className="hidden sm:inline">Импорт специалистов</span>
      </Button>
      <Button 
        onClick={() => navigate('/admin/import-salons')}
        className="whitespace-nowrap flex-shrink-0 text-xs sm:text-sm bg-gradient-to-r from-purple-600 to-pink-600"
      >
        <Icon name="Building" size={16} className="sm:mr-2" />
        <span className="hidden sm:inline">Импорт салонов</span>
      </Button>
      <Button 
        onClick={() => navigate('/admin/import-vacancies')}
        className="whitespace-nowrap flex-shrink-0 text-xs sm:text-sm bg-gradient-to-r from-emerald-600 to-teal-600"
      >
        <Icon name="Briefcase" size={16} className="sm:mr-2" />
        <span className="hidden sm:inline">Импорт вакансий</span>
      </Button>
    </div>
  );
}