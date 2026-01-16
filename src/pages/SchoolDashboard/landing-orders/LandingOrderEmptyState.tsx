import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface LandingOrderEmptyStateProps {
  onCreateClick: () => void;
}

export default function LandingOrderEmptyState({ onCreateClick }: LandingOrderEmptyStateProps) {
  return (
    <Card className="p-8">
      <div className="text-center">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="FileText" size={32} className="text-primary" />
        </div>
        <h3 className="text-xl font-bold mb-2">Создайте свой первый лендинг</h3>
        <p className="text-gray-600 mb-6">
          Закажите продающий лендинг для вашего курса всего за 2990 ₽
        </p>
        <Button size="lg" onClick={onCreateClick}>
          <Icon name="Plus" size={20} className="mr-2" />
          Создать заявку
        </Button>
      </div>
    </Card>
  );
}
