import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface ToolsHeaderProps {
  onBackClick: () => void;
  onHistoryClick: () => void;
  showHistoryButton?: boolean;
}

export default function ToolsHeader({ onBackClick, onHistoryClick, showHistoryButton = true }: ToolsHeaderProps) {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between gap-2 mb-4">
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <Button variant="ghost" onClick={onBackClick} className="flex-shrink-0">
            <Icon name="ArrowLeft" size={20} />
          </Button>
          <div className="min-w-0 flex-1">
            <h1 className="text-2xl md:text-3xl font-bold truncate">AI-инструменты</h1>
          </div>
        </div>
        {showHistoryButton && (
          <Button
            variant="outline"
            onClick={onHistoryClick}
            className="flex-shrink-0"
            size="sm"
          >
            <Icon name="FileText" size={16} className="sm:mr-2" />
            <span className="hidden sm:inline">История анамнезов</span>
          </Button>
        )}
      </div>
      <p className="text-sm md:text-base text-muted-foreground px-2">
        Профессиональные инструменты для анализа и планирования работы с клиентами
      </p>
    </div>
  );
}