import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

const BALANCE_API_URL = 'https://functions.poehali.dev/8c82911e-481f-4a63-92ff-aae203e992cc';

interface Prices {
  own_city: { [key: number]: number };
  all_cities: { [key: number]: number };
}

interface PromoteMasseurDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  masseurId: number;
  masseurName: string;
  city: string;
  onSuccess: () => void;
}

export default function PromoteMasseurDialog({
  open,
  onOpenChange,
  masseurId,
  masseurName,
  city,
  onSuccess
}: PromoteMasseurDialogProps) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState(0);
  const [selectedType, setSelectedType] = useState<'own_city' | 'all_cities'>('own_city');
  const [selectedDays, setSelectedDays] = useState<1 | 3 | 7>(1);

  // Фиксированные цены для массажистов
  const prices: Prices = {
    own_city: { 1: 150, 3: 400, 7: 800 },
    all_cities: { 1: 500, 3: 1300, 7: 2500 }
  };

  useEffect(() => {
    if (open) {
      loadBalance();
    }
  }, [open]);

  const loadBalance = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const balanceRes = await fetch(`${BALANCE_API_URL}?action=balance`, {
        headers: { 
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (balanceRes.ok) {
        const balanceData = await balanceRes.json();
        setBalance(balanceData.balance || 0);
      }
    } catch (error) {
      console.error('Error loading balance:', error);
    }
  };

  const handlePromote = async () => {
    const price = prices[selectedType][selectedDays];
    
    if (balance < price) {
      toast({
        title: 'Недостаточно средств',
        description: `Необходимо ${price} ₽, доступно ${balance} ₽. Пополните баланс.`,
        variant: 'destructive'
      });
      return;
    }

    toast({
      title: 'Функция в разработке',
      description: 'Продвижение массажистов скоро будет доступно!',
    });
  };

  const selectedPrice = prices[selectedType][selectedDays];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Попасть в топ каталога</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div>
            <p className="font-semibold mb-1">{masseurName}</p>
            <p className="text-sm text-gray-500">Город: {city}</p>
          </div>

          <div>
            <Label className="mb-3 block">Тип продвижения</Label>
            <RadioGroup value={selectedType} onValueChange={(v) => setSelectedType(v as any)}>
              <div className="flex items-start space-x-2 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                <RadioGroupItem value="own_city" id="city" />
                <Label htmlFor="city" className="flex-1 cursor-pointer">
                  <div className="font-medium">В своём городе</div>
                  <div className="text-sm text-gray-500">Ваш профиль будет выше в каталоге города "{city}"</div>
                </Label>
              </div>
              <div className="flex items-start space-x-2 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                <RadioGroupItem value="all_cities" id="all" />
                <Label htmlFor="all" className="flex-1 cursor-pointer">
                  <div className="font-medium">Во всех городах</div>
                  <div className="text-sm text-gray-500">Ваш профиль будет выше во всех городах и на главной странице</div>
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div>
            <Label className="mb-3 block">Срок продвижения</Label>
            <div className="grid grid-cols-3 gap-3">
              {[1, 3, 7].map((days) => (
                <button
                  key={days}
                  onClick={() => setSelectedDays(days as any)}
                  className={`p-4 border-2 rounded-lg text-center transition-all ${
                    selectedDays === days
                      ? 'border-primary bg-primary/5'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="font-bold text-lg">{days} {days === 1 ? 'день' : days <= 4 ? 'дня' : 'дней'}</div>
                  <div className="text-sm text-gray-600 mt-1">
                    {prices[selectedType][days].toLocaleString('ru-RU')} ₽
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Стоимость:</span>
              <span className="font-semibold">{selectedPrice.toLocaleString('ru-RU')} ₽</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Текущий баланс:</span>
              <span className={balance >= selectedPrice ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'}>
                {balance.toLocaleString('ru-RU')} ₽
              </span>
            </div>
            <div className="border-t pt-2 flex justify-between">
              <span className="font-semibold">Останется после оплаты:</span>
              <span className={`font-bold ${balance >= selectedPrice ? 'text-gray-900' : 'text-red-600'}`}>
                {(balance - selectedPrice).toLocaleString('ru-RU')} ₽
              </span>
            </div>
          </div>

          <Button
            className="w-full"
            onClick={handlePromote}
            disabled={loading}
          >
            {loading ? (
              <>
                <Icon name="Loader2" className="mr-2 animate-spin" size={18} />
                Обработка...
              </>
            ) : (
              <>
                <Icon name="TrendingUp" className="mr-2" size={18} />
                Попасть в топ за {selectedPrice.toLocaleString('ru-RU')} ₽
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
