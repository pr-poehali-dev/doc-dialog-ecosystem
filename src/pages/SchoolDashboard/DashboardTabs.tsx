import Icon from '@/components/ui/icon';

type TabType = 'courses' | 'masterminds' | 'offline-training' | 'promo-requests' | 'subscription' | 'landing-order' | 'webinar-order';

interface DashboardTabsProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  pendingPromoRequestsCount?: number;
}

export default function DashboardTabs({ activeTab, onTabChange, pendingPromoRequestsCount = 0 }: DashboardTabsProps) {
  return (
    <div className="flex gap-1 sm:gap-2 mb-6 border-b overflow-x-auto pb-px scrollbar-hide">
      <button
        onClick={() => onTabChange('offline-training')}
        className={`px-2 sm:px-4 py-2 text-sm sm:text-base font-medium transition-colors whitespace-nowrap ${activeTab === 'offline-training' ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground hover:text-foreground'}`}
      >
        <Icon name="GraduationCap" size={18} className="inline sm:mr-2" />
        <span className="hidden sm:inline">Очное обучение</span>
      </button>
      <button
        onClick={() => onTabChange('courses')}
        className={`px-2 sm:px-4 py-2 text-sm sm:text-base font-medium transition-colors whitespace-nowrap ${activeTab === 'courses' ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground hover:text-foreground'}`}
      >
        <Icon name="BookOpen" size={18} className="inline sm:mr-2" />
        <span className="hidden sm:inline">Курсы</span>
      </button>
      <button
        onClick={() => onTabChange('masterminds')}
        className={`px-2 sm:px-4 py-2 text-sm sm:text-base font-medium transition-colors whitespace-nowrap ${activeTab === 'masterminds' ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground hover:text-foreground'}`}
      >
        <Icon name="Users" size={18} className="inline sm:mr-2" />
        <span className="hidden sm:inline">Мастермайнды</span>
      </button>
      <button
        onClick={() => onTabChange('promo-requests')}
        className={`px-2 sm:px-4 py-2 text-sm sm:text-base font-medium transition-colors whitespace-nowrap relative ${activeTab === 'promo-requests' ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground hover:text-foreground'}`}
      >
        <Icon name="Tag" size={18} className="inline sm:mr-2" />
        <span className="hidden sm:inline">Запросы скидок</span>
        {pendingPromoRequestsCount > 0 && (
          <span className="absolute -top-1 -right-1 sm:relative sm:top-0 sm:right-0 sm:ml-2 inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 text-xs font-bold leading-none text-white bg-red-500 rounded-full animate-pulse">
            {pendingPromoRequestsCount}
          </span>
        )}
      </button>
      <button
        onClick={() => onTabChange('landing-order')}
        className={`px-2 sm:px-4 py-2 text-sm sm:text-base font-medium transition-colors whitespace-nowrap ${activeTab === 'landing-order' ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground hover:text-foreground'}`}
      >
        <Icon name="Sparkles" size={18} className="inline sm:mr-2" />
        <span className="hidden sm:inline">Заказать лендинг</span>
      </button>
      <button
        onClick={() => onTabChange('webinar-order')}
        className={`px-2 sm:px-4 py-2 text-sm sm:text-base font-medium transition-colors whitespace-nowrap ${activeTab === 'webinar-order' ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground hover:text-foreground'}`}
      >
        <Icon name="Video" size={18} className="inline sm:mr-2" />
        <span className="hidden sm:inline">Автовебинары</span>
      </button>
      <button
        onClick={() => onTabChange('subscription')}
        className={`px-2 sm:px-4 py-2 text-sm sm:text-base font-medium transition-colors whitespace-nowrap ${activeTab === 'subscription' ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground hover:text-foreground'}`}
      >
        <Icon name="Crown" size={18} className="inline sm:mr-2" />
        <span className="hidden sm:inline">Тарифы</span>
      </button>
    </div>
  );
}