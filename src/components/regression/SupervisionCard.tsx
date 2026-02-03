import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface SupervisionCardProps {
  onBooking: () => void;
}

export default function SupervisionCard({ onBooking }: SupervisionCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 border-2 border-amber-500/30 bg-gradient-to-br from-amber-50/50 to-orange-50/50 dark:from-amber-950/20 dark:to-orange-950/20">
      <div className="p-6 sm:p-8 md:p-10">
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-amber-100 dark:bg-amber-900/30 mb-4">
            <Icon name="Users" size={32} className="text-amber-600 dark:text-amber-500" />
          </div>
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">Супервизия</h3>
          <p className="text-muted-foreground text-base sm:text-lg font-medium">
            Профессиональная поддержка и разбор практики
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 mb-6 sm:mb-8">
          <div className="space-y-3">
            <h4 className="font-semibold text-lg flex items-center gap-2">
              <Icon name="Target" size={20} className="text-amber-600" />
              Групповая супервизия
            </h4>
            <ul className="space-y-2 text-sm sm:text-base text-muted-foreground">
              <li className="flex items-start gap-2">
                <Icon name="Check" size={16} className="text-amber-600 mt-1 flex-shrink-0" />
                <span>Разбор реальных кейсов участников</span>
              </li>
              <li className="flex items-start gap-2">
                <Icon name="Check" size={16} className="text-amber-600 mt-1 flex-shrink-0" />
                <span>Работа со сложными ситуациями</span>
              </li>
              <li className="flex items-start gap-2">
                <Icon name="Check" size={16} className="text-amber-600 mt-1 flex-shrink-0" />
                <span>Обмен опытом в профессиональном сообществе</span>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-lg flex items-center gap-2">
              <Icon name="User" size={20} className="text-amber-600" />
              Индивидуальная супервизия
            </h4>
            <ul className="space-y-2 text-sm sm:text-base text-muted-foreground">
              <li className="flex items-start gap-2">
                <Icon name="Check" size={16} className="text-amber-600 mt-1 flex-shrink-0" />
                <span>Персональный разбор ваших сеансов</span>
              </li>
              <li className="flex items-start gap-2">
                <Icon name="Check" size={16} className="text-amber-600 mt-1 flex-shrink-0" />
                <span>Этические дилеммы и границы</span>
              </li>
              <li className="flex items-start gap-2">
                <Icon name="Check" size={16} className="text-amber-600 mt-1 flex-shrink-0" />
                <span>Точки профессионального роста</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-amber-100 dark:bg-amber-900/30 p-4 sm:p-5 rounded-lg mb-6">
          <p className="text-sm font-medium text-center">
            🎯 Для специалистов, практикующих регрессивный гипноз
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <div className="text-center sm:text-left">
            <div className="text-2xl sm:text-3xl font-bold text-amber-600 dark:text-amber-500">
              от 5 000 ₽
            </div>
            <p className="text-sm text-muted-foreground">за сессию</p>
          </div>
          <Button 
            size="lg"
            className="bg-amber-600 hover:bg-amber-700 text-white"
            onClick={onBooking}
          >
            Записаться на супервизию
          </Button>
        </div>
      </div>
    </Card>
  );
}
