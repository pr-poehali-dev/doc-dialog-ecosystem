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

interface Package {
  count: number;
  price: number;
  originalPrice: number;
  discount: number;
  popular: boolean;
  badge?: string;
}

const PRICE_PER_REQUEST = 12;

export default function BuyExtraRequestsDialog({
  open,
  onOpenChange,
  onBuyRequests
}: BuyExtraRequestsDialogProps) {
  const [selectedCount, setSelectedCount] = useState(10);

  const packages: Package[] = [
    { count: 5, price: 60, originalPrice: 60, discount: 0, popular: false },
    { count: 10, price: 108, originalPrice: 120, discount: 10, popular: true, badge: 'Выгодно' },
    { count: 20, price: 192, originalPrice: 240, discount: 20, popular: false, badge: '-20%' },
    { count: 50, price: 420, originalPrice: 600, discount: 30, popular: false, badge: '-30%' },
    { count: 100, price: 720, originalPrice: 1200, discount: 40, popular: false, badge: '-40%' }
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
            Выберите пакет. Чем больше — тем выгоднее! Скидки до 40%
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {packages.map((pkg) => (
            <button
              key={pkg.count}
              onClick={() => setSelectedCount(pkg.count)}
              className={`relative p-4 rounded-xl border-2 transition-all hover:shadow-md ${
                selectedCount === pkg.count
                  ? 'border-primary bg-blue-50 shadow-lg scale-105'
                  : 'border-gray-200 hover:border-primary/50'
              }`}
            >
              {pkg.badge && (
                <div className={`absolute -top-2 left-1/2 -translate-x-1/2 px-2 py-0.5 text-white text-xs rounded-full whitespace-nowrap ${
                  pkg.popular ? 'bg-primary' : 'bg-green-500'
                }`}>
                  {pkg.badge}
                </div>
              )}
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{pkg.count}</div>
                <div className="text-xs text-muted-foreground mb-2">запросов</div>
                {pkg.discount > 0 && (
                  <div className="text-xs text-gray-400 line-through mb-1">{pkg.originalPrice}₽</div>
                )}
                <div className="text-lg font-semibold text-primary">{pkg.price}₽</div>
                {pkg.discount > 0 && (
                  <div className="text-xs text-green-600 font-medium mt-1">Экономия {pkg.originalPrice - pkg.price}₽</div>
                )}
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
                <li>• Никогда не сгорают</li>
                <li>• Чем больше пакет — тем ниже цена за запрос</li>
                <li>• Подходят для всех AI-инструментов</li>
                <li>• Пакет от 10 запросов — скидка 10%</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t">
          <div>
            <div className="text-sm text-muted-foreground">Итого к оплате:</div>
            <div className="text-2xl font-bold text-gray-900">
              {packages.find(p => p.count === selectedCount)?.price}₽
            </div>
            {packages.find(p => p.count === selectedCount)?.discount ? (
              <div className="text-xs text-green-600 font-medium">
                Вы экономите {packages.find(p => p.count === selectedCount)!.originalPrice - packages.find(p => p.count === selectedCount)!.price}₽
              </div>
            ) : null}
          </div>
          <Button
            size="lg"
            onClick={() => {
              const pkg = packages.find(p => p.count === selectedCount);
              if (pkg) onBuyRequests(selectedCount);
            }}
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