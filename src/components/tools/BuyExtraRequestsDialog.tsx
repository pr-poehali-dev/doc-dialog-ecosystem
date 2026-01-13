import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface BuyExtraRequestsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onBuyRequests: (count: number) => void;
}

const PRICE_PER_REQUEST = 25;

export default function BuyExtraRequestsDialog({
  open,
  onOpenChange,
  onBuyRequests
}: BuyExtraRequestsDialogProps) {
  const [selectedCount, setSelectedCount] = useState(5);

  const packages = [
    { count: 5, price: 125, popular: false },
    { count: 10, price: 250, popular: true },
    { count: 20, price: 500, popular: false },
    { count: 50, price: 1250, popular: false }
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Icon name="ShoppingCart" size={24} />
            Докупить AI-запросы
          </DialogTitle>
          <DialogDescription>
            Выберите количество дополнительных запросов. Один запрос = 25₽
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {packages.map((pkg) => (
            <button
              key={pkg.count}
              onClick={() => setSelectedCount(pkg.count)}
              className={`relative p-4 rounded-xl border-2 transition-all hover:shadow-md ${
                selectedCount === pkg.count
                  ? 'border-primary bg-blue-50'
                  : 'border-gray-200 hover:border-primary/50'
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-primary text-white text-xs rounded-full">
                  Выгодно
                </div>
              )}
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{pkg.count}</div>
                <div className="text-xs text-muted-foreground mb-2">запросов</div>
                <div className="text-lg font-semibold text-primary">{pkg.price}₽</div>
              </div>
            </button>
          ))}
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-4 border border-primary/20">
          <div className="flex items-start gap-3">
            <Icon name="Info" size={20} className="text-primary mt-0.5 flex-shrink-0" />
            <div className="text-sm space-y-2">
              <p className="font-medium text-gray-900">Что такое дополнительные запросы?</p>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Работают так же, как обычные запросы</li>
                <li>• Не сгорают в конце месяца</li>
                <li>• Используются после основного лимита</li>
                <li>• Подходят для анализа заключений и диалогов</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t">
          <div>
            <div className="text-sm text-muted-foreground">Итого к оплате:</div>
            <div className="text-2xl font-bold text-gray-900">
              {selectedCount * PRICE_PER_REQUEST}₽
            </div>
          </div>
          <Button
            size="lg"
            onClick={() => onBuyRequests(selectedCount)}
            className="min-w-[180px]"
          >
            <Icon name="CreditCard" size={18} className="mr-2" />
            Купить {selectedCount} запросов
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
