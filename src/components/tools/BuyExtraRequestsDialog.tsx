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
  firstPurchaseBonusAvailable?: boolean;
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
  onBuyRequests,
  firstPurchaseBonusAvailable = false
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
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Icon name="ShoppingCart" size={24} />
            Докупить AI-запросы
          </DialogTitle>
          <DialogDescription>
            Выберите пакет. Чем больше — тем выгоднее! Скидки до 40%
          </DialogDescription>
        </DialogHeader>

        {firstPurchaseBonusAvailable && (
          <div className="bg-gradient-to-r from-orange-50 via-red-50 to-pink-50 border-2 border-orange-300 rounded-xl p-3 sm:p-4 shadow-lg animate-pulse-slow">
            <div className="flex items-start gap-2 sm:gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center flex-shrink-0 shadow-md">
                <Icon name="Gift" size={20} className="text-white sm:w-6 sm:h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-sm sm:text-base text-gray-900 mb-1">
                  🎉 ПЕРВАЯ ПОКУПКА x2!
                </h3>
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                  Получите <span className="font-bold text-orange-600">УДВОЕННОЕ</span> количество запросов! Купите 10 — получите 20!
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 sm:gap-3">
          {packages.map((pkg) => (
            <button
              key={pkg.count}
              onClick={() => setSelectedCount(pkg.count)}
              className={`relative p-3 sm:p-4 rounded-xl border-2 transition-all hover:shadow-md ${
                selectedCount === pkg.count
                  ? 'border-primary bg-blue-50 shadow-lg'
                  : 'border-gray-200 hover:border-primary/50'
              }`}
            >
              {pkg.badge && (
                <div className={`absolute -top-2 left-1/2 -translate-x-1/2 px-1.5 sm:px-2 py-0.5 text-white text-[10px] sm:text-xs rounded-full whitespace-nowrap ${
                  pkg.popular ? 'bg-primary' : 'bg-green-500'
                }`}>
                  {pkg.badge}
                </div>
              )}
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-gray-900">{pkg.count}</div>
                <div className="text-[10px] sm:text-xs text-muted-foreground mb-1">запросов</div>
                {firstPurchaseBonusAvailable && (
                  <div className="text-xs sm:text-sm font-bold text-orange-600 mb-1">→ {pkg.count * 2}!</div>
                )}
                {pkg.discount > 0 && (
                  <div className="text-[10px] sm:text-xs text-gray-400 line-through mb-1">{pkg.originalPrice}₽</div>
                )}
                <div className="text-base sm:text-lg font-semibold text-primary">{pkg.price}₽</div>
                {pkg.discount > 0 && !firstPurchaseBonusAvailable && (
                  <div className="text-[10px] sm:text-xs text-green-600 font-medium mt-1">-{pkg.originalPrice - pkg.price}₽</div>
                )}
              </div>
            </button>
          ))}
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-3 sm:p-4 border border-primary/20">
          <div className="flex items-start gap-2 sm:gap-3">
            <Icon name="Info" size={18} className="text-primary mt-0.5 flex-shrink-0 sm:w-5 sm:h-5" />
            <div className="text-xs sm:text-sm space-y-1 sm:space-y-2 min-w-0">
              <p className="font-medium text-gray-900">Что такое дополнительные запросы?</p>
              <ul className="space-y-0.5 sm:space-y-1 text-muted-foreground">
                <li>• Никогда не сгорают</li>
                <li>• Чем больше пакет — тем дешевле</li>
                <li>• Подходят для всех AI-инструментов</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 pt-4 border-t">
          <div className="min-w-0">
            <div className="text-xs sm:text-sm text-muted-foreground">Итого к оплате:</div>
            <div className="text-xl sm:text-2xl font-bold text-gray-900">
              {packages.find(p => p.count === selectedCount)?.price}₽
            </div>
            {firstPurchaseBonusAvailable && (
              <div className="text-xs sm:text-sm font-bold text-orange-600">
                🎁 Вы получите {selectedCount * 2} запросов!
              </div>
            )}
            {packages.find(p => p.count === selectedCount)?.discount && !firstPurchaseBonusAvailable ? (
              <div className="text-xs text-green-600 font-medium">
                Экономия {packages.find(p => p.count === selectedCount)!.originalPrice - packages.find(p => p.count === selectedCount)!.price}₽
              </div>
            ) : null}
          </div>
          <Button
            size="lg"
            onClick={() => {
              const pkg = packages.find(p => p.count === selectedCount);
              if (pkg) onBuyRequests(selectedCount);
            }}
            className="w-full sm:w-auto sm:min-w-[200px]"
          >
            <Icon name="CreditCard" size={18} className="mr-2" />
            <span className="hidden sm:inline">Купить {selectedCount} запросов</span>
            <span className="sm:hidden">Оплатить {selectedCount} зап.</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}