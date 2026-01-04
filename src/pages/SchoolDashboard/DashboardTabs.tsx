import Icon from '@/components/ui/icon';

type TabType = 'courses' | 'masterminds' | 'offline-training' | 'specialists' | 'landings';

interface DashboardTabsProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export default function DashboardTabs({ activeTab, onTabChange }: DashboardTabsProps) {
  return (
    <div className="flex gap-2 mb-6 border-b">
      <button
        onClick={() => onTabChange('landings')}
        className={`px-4 py-2 font-medium transition-colors ${activeTab === 'landings' ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground hover:text-foreground'}`}
      >
        <Icon name="Layout" size={18} className="inline mr-2" />
        Лендинг школы
      </button>
      <button
        onClick={() => onTabChange('offline-training')}
        className={`px-4 py-2 font-medium transition-colors ${activeTab === 'offline-training' ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground hover:text-foreground'}`}
      >
        <Icon name="GraduationCap" size={18} className="inline mr-2" />
        Очное обучение
      </button>
      <button
        onClick={() => onTabChange('courses')}
        className={`px-4 py-2 font-medium transition-colors ${activeTab === 'courses' ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground hover:text-foreground'}`}
      >
        <Icon name="BookOpen" size={18} className="inline mr-2" />
        Курсы
      </button>
      <button
        onClick={() => onTabChange('masterminds')}
        className={`px-4 py-2 font-medium transition-colors ${activeTab === 'masterminds' ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground hover:text-foreground'}`}
      >
        <Icon name="Users" size={18} className="inline mr-2" />
        Мастермайнды
      </button>
    </div>
  );
}