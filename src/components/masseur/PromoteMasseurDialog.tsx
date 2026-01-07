import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';

const BALANCE_API_URL = 'https://functions.poehali.dev/8c82911e-481f-4a63-92ff-aae203e992cc';
const PROMOTION_API_URL = 'https://functions.poehali.dev/71ef96ce-7019-4622-8253-573a2e8a6567';



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
  const [selectedDays, setSelectedDays] = useState<1 | 3 | 7>(1);

  // Фиксированные цены для продвижения в своем городе
  const prices: { [key: number]: number } = {
    1: 150,
    3: 400,
    7: 800
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
    const price = prices[selectedDays];
    
    if (balance < price) {
      toast({
        title: 'Недостаточно средств',
        description: `Необходимо ${price} ₽, доступно ${balance} ₽. Пополните баланс.`,
        variant: 'destructive'
      });
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast({
          title: 'Ошибка',
          description: 'Требуется авторизация',
          variant: 'destructive'
        });
        return;
      }

      const response = await fetch(PROMOTION_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          days: selectedDays
        })
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: 'Успешно!',
          description: data.message || `Профиль продвигается на ${selectedDays} ${selectedDays === 1 ? 'день' : selectedDays <= 4 ? 'дня' : 'дней'}`,
        });
        onOpenChange(false);
        onSuccess();
      } else {
        toast({
          title: 'Ошибка',
          description: data.error || 'Не удалось активировать продвижение',
          variant: 'destructive'
        });
      }
    } catch (error) {
      console.error('Promotion error:', error);
      toast({
        title: 'Ошибка',
        description: 'Произошла ошибка при активации продвижения',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const selectedPrice = prices[selectedDays];

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

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Icon name="Info" size={20} className="text-blue-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-blue-900">Продвижение в вашем городе</p>
                <p className="text-sm text-blue-700 mt-1">Ваш профиль будет отображаться выше в каталоге города "{city}"</p>
              </div>
            </div>
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
                    {prices[days].toLocaleString('ru-RU')} ₽
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

          {balance < selectedPrice ? (
            <Link to="/dashboard/balance" className="block">
              <Button className="w-full" variant="outline">
                <Icon name="Wallet" className="mr-2" size={18} />
                Пополнить баланс
              </Button>
            </Link>
          ) : null}

          <Button
            className="w-full"
            onClick={handlePromote}
            disabled={loading || balance < selectedPrice}
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