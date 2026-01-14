import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface ToolsHeaderProps {
  onBackClick: () => void;
  onHistoryClick: () => void;
}

export default function ToolsHeader({ onBackClick, onHistoryClick }: ToolsHeaderProps) {
  return (
    <div className="flex items-center justify-between gap-4 mb-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={onBackClick}>
          <Icon name="ArrowLeft" size={20} />
        </Button>
        <div>
          <h1 className="text-3xl font-bold">AI-инструменты</h1>
          <p className="text-muted-foreground">
            Профессиональные инструменты для анализа и планирования работы с клиентами
          </p>
        </div>
      </div>
      <Button
        variant="outline"
        onClick={onHistoryClick}
      >
        <Icon name="FileText" size={16} className="mr-2" />
        История анамнезов
      </Button>
    </div>
  );
}
