import Icon from '@/components/ui/icon';

type TabType = 'courses' | 'masterminds' | 'offline-training' | 'promo-requests' | 'subscription' | 'landing-order';

interface DashboardTabsProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  pendingPromoRequestsCount?: number;
}

export default function DashboardTabs({ activeTab, onTabChange, pendingPromoRequestsCount = 0 }: DashboardTabsProps) {
  return (
    <div className="flex gap-2 mb-6 border-b overflow-x-auto">
      <button
        onClick={() => onTabChange('offline-training')}
        className={`px-4 py-2 font-medium transition-colors whitespace-nowrap ${activeTab === 'offline-training' ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground hover:text-foreground'}`}
      >
        <Icon name="GraduationCap" size={18} className="inline mr-2" />
        Очное обучение
      </button>
      <button
        onClick={() => onTabChange('courses')}
        className={`px-4 py-2 font-medium transition-colors whitespace-nowrap ${activeTab === 'courses' ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground hover:text-foreground'}`}
      >
        <Icon name="BookOpen" size={18} className="inline mr-2" />
        Курсы
      </button>
      <button
        onClick={() => onTabChange('masterminds')}
        className={`px-4 py-2 font-medium transition-colors whitespace-nowrap ${activeTab === 'masterminds' ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground hover:text-foreground'}`}
      >
        <Icon name="Users" size={18} className="inline mr-2" />
        Мастермайнды
      </button>
      <button
        onClick={() => onTabChange('promo-requests')}
        className={`px-4 py-2 font-medium transition-colors whitespace-nowrap relative ${activeTab === 'promo-requests' ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground hover:text-foreground'}`}
      >
        <Icon name="Tag" size={18} className="inline mr-2" />
        Запросы скидок
        {pendingPromoRequestsCount > 0 && (
          <span className="ml-2 inline-flex items-center justify-center px-2 py-0.5 text-xs font-bold leading-none text-white bg-red-500 rounded-full">
            {pendingPromoRequestsCount}
          </span>
        )}
      </button>
      <button
        onClick={() => onTabChange('landing-order')}
        className={`px-4 py-2 font-medium transition-colors whitespace-nowrap ${activeTab === 'landing-order' ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground hover:text-foreground'}`}
      >
        <Icon name="Sparkles" size={18} className="inline mr-2" />
        Заказать лендинг
      </button>
      <button
        onClick={() => onTabChange('subscription')}
        className={`px-4 py-2 font-medium transition-colors whitespace-nowrap ${activeTab === 'subscription' ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground hover:text-foreground'}`}
      >
        <Icon name="Crown" size={18} className="inline mr-2" />
        Тарифы
      </button>
    </div>
  );
}