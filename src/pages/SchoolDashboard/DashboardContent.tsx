import ItemsList from '@/components/school/ItemsList';
import LandingsTab from './LandingsTab';
import KnowledgeBasePublic from '@/components/school/KnowledgeBasePublic';
import PromoRequestsTab from '@/components/school/PromoRequestsTab';
import SubscriptionTab from './SubscriptionTab';
import { Course, Mastermind, SpecialistRequest } from './types';
import Icon from '@/components/ui/icon';

interface DashboardContentProps {
  activeTab: 'courses' | 'masterminds' | 'offline-training' | 'specialists' | 'landings' | 'knowledge' | 'promo-requests' | 'subscription';
  showAddForm: boolean;
  courses: Course[];
  masterminds: Mastermind[];
  offlineTrainings: any[];
  specialists: SpecialistRequest[];
  landings: any[];
  canPromoteToTop: boolean;
  onEditCourse: (id: number) => void;
  onPromoteCourse: (id: number, title: string, category: string) => void;
  onDeleteCourse: (id: number) => void;
  onPromoteMastermind: (id: number, title: string) => void;
  onPromoteTraining: (id: number, title: string) => void;
  onEditMastermind: (id: number) => void;
  onDeleteMastermind: (id: number) => void;
  onEditTraining: (id: number) => void;
  onDeleteTraining: (id: number) => void;
  onEditSpecialist: (id: number) => void;
  onDeleteSpecialist: (id: number) => void;
  onSubmitDraftCourse: (id: number) => void;
  onSubmitDraftMastermind: (id: number) => void;
  onSubmitDraftTraining: (id: number) => void;
  onReloadLandings: () => void;
  setPendingPromoRequestsCount: (count: number) => void;
}

function getStatusBadge(status: string) {
  const colors: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-800',
    moderation: 'bg-yellow-100 text-yellow-800',
    approved: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800',
    active: 'bg-blue-100 text-blue-800',
    closed: 'bg-gray-100 text-gray-800',
    draft: 'bg-gray-100 text-gray-600'
  };
  
  const labels: Record<string, string> = {
    pending: 'На модерации',
    moderation: 'На модерации',
    approved: 'Одобрено',
    rejected: 'Отклонено',
    active: 'Активно',
    closed: 'Закрыто',
    draft: 'Черновик'
  };
  
  if (status === 'draft') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-600">
        <span>Черновик</span>
        <div className="relative group">
          <Icon name="HelpCircle" size={14} className="text-gray-500 cursor-help" />
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block w-64 p-3 bg-gray-900 text-white text-xs rounded-lg shadow-lg z-50">
            <p className="mb-2">Превышен лимит публикаций по вашему тарифу.</p>
            <p className="text-gray-300">Чтобы отправить на модерацию после обновления тарифа: нажмите <strong>Редактировать</strong> → <strong>Сохранить</strong></p>
            <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-900"></div>
          </div>
        </div>
      </span>
    );
  }
  
  return (
    <span className={`px-2 py-1 rounded text-xs font-medium ${colors[status] || 'bg-gray-100 text-gray-800'}`}>
      {labels[status] || status}
    </span>
  );
}

export default function DashboardContent({
  activeTab,
  showAddForm,
  courses,
  masterminds,
  offlineTrainings,
  specialists,
  landings,
  canPromoteToTop,
  onEditCourse,
  onPromoteCourse,
  onDeleteCourse,
  onPromoteMastermind,
  onPromoteTraining,
  onEditMastermind,
  onDeleteMastermind,
  onEditTraining,
  onDeleteTraining,
  onEditSpecialist,
  onDeleteSpecialist,
  onSubmitDraftCourse,
  onSubmitDraftMastermind,
  onSubmitDraftTraining,
  onReloadLandings,
  setPendingPromoRequestsCount
}: DashboardContentProps) {
  if (!showAddForm && activeTab !== 'landings' && activeTab !== 'knowledge' && activeTab !== 'promo-requests' && activeTab !== 'subscription') {
    return (
      <ItemsList
        activeTab={activeTab}
        courses={courses}
        masterminds={masterminds}
        offlineTrainings={offlineTrainings}
        specialists={specialists}
        canPromoteToTop={canPromoteToTop}
        getStatusBadge={getStatusBadge}
        onEditCourse={onEditCourse}
        onPromoteCourse={onPromoteCourse}
        onDeleteCourse={onDeleteCourse}
        onPromoteMastermind={onPromoteMastermind}
        onPromoteTraining={onPromoteTraining}
        onEditMastermind={onEditMastermind}
        onDeleteMastermind={onDeleteMastermind}
        onEditTraining={onEditTraining}
        onDeleteTraining={onDeleteTraining}
        onEditSpecialist={onEditSpecialist}
        onDeleteSpecialist={onDeleteSpecialist}
        onSubmitDraftCourse={onSubmitDraftCourse}
        onSubmitDraftMastermind={onSubmitDraftMastermind}
        onSubmitDraftTraining={onSubmitDraftTraining}
      />
    );
  }

  if (activeTab === 'landings') {
    return <LandingsTab landings={landings} onReload={onReloadLandings} />;
  }

  if (activeTab === 'knowledge') {
    return <KnowledgeBasePublic targetType="school" />;
  }

  if (activeTab === 'promo-requests') {
    return <PromoRequestsTab onRequestsCountChange={setPendingPromoRequestsCount} />;
  }

  if (activeTab === 'subscription') {
    return <SubscriptionTab />;
  }

  return null;
}