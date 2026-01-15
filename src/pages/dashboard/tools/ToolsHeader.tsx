import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface ToolsHeaderProps {
  onBackClick: () => void;
}

export default function ToolsHeader({ onBackClick }: ToolsHeaderProps) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-4">
        <Button variant="ghost" onClick={onBackClick} className="flex-shrink-0">
          <Icon name="ArrowLeft" size={20} />
        </Button>
        <div className="min-w-0 flex-1">
          <h1 className="text-2xl md:text-3xl font-bold truncate">AI-инструменты</h1>
        </div>
      </div>
      <p className="text-sm md:text-base text-muted-foreground px-2">
        Профессиональные инструменты для анализа и планирования работы с клиентами
      </p>
    </div>
  );
}