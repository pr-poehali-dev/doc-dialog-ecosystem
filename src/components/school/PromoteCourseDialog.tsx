import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import { getUserId } from '@/utils/auth';

const PROMOTIONS_API_URL = 'https://functions.poehali.dev/2ea3a11a-0b11-4f52-9c5e-29fe60c40675';
const BALANCE_API_URL = 'https://functions.poehali.dev/8c82911e-481f-4a63-92ff-aae203e992cc';

interface Prices {
  own_category: { [key: number]: number };
  all_categories: { [key: number]: number };
}

interface PromoteCourseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  courseId: number;
  courseTitle: string;
  courseCategory: string;
  onSuccess: () => void;
}

export default function PromoteCourseDialog({
  open,
  onOpenChange,
  courseId,
  courseTitle,
  courseCategory,
  onSuccess
}: PromoteCourseDialogProps) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState(0);
  const [prices, setPrices] = useState<Prices | null>(null);
  const [selectedType, setSelectedType] = useState<'own_category' | 'all_categories'>('own_category');
  const [selectedDays, setSelectedDays] = useState<1 | 3 | 7>(1);

  useEffect(() => {
    if (open) {
      loadData();
    }
  }, [open]);

  const loadData = async () => {
    // Сначала устанавливаем фиксированные цены как fallback
    const defaultPrices: Prices = {
      own_category: { 1: 100, 3: 250, 7: 500 },
      all_categories: { 1: 300, 3: 750, 7: 1500 }
    };
    setPrices(defaultPrices);
    
    try {
      const userId = getUserId();
      console.log('Loading data for user:', userId);
      
      // Загружаем баланс
      try {
        const balanceRes = await fetch(`${BALANCE_API_URL}?action=balance`, {
          headers: { 'X-User-Id': userId }
        });
        
        if (balanceRes.ok) {
          const balanceData = await balanceRes.json();
          setBalance(balanceData.balance);
          console.log('Balance loaded:', balanceData.balance);
        }
      } catch (balanceError) {
        console.log('Balance load failed, using 0:', balanceError);
      }

      // Загружаем прайс-лист
      try {
        const pricesRes = await fetch(`${PROMOTIONS_API_URL}?action=prices`, {
          headers: { 'X-User-Id': userId }
        });
        
        if (pricesRes.ok) {
          const pricesData = await pricesRes.json();
          console.log('Prices loaded from API:', pricesData);
          setPrices(pricesData.prices);
        } else {
          console.log('Prices API failed, using defaults');
        }
      } catch (pricesError) {
        console.log('Prices load failed, using defaults:', pricesError);
      }
    } catch (error) {
      console.log('Load data error, using defaults:', error);
    }
  };

  const handlePromote = async () => {
    if (!prices) return;

    const price = prices[selectedType][selectedDays];
    
    if (balance < price) {
      toast({
        title: 'Недостаточно средств',
        description: `Необходимо ${price} ₽, доступно ${balance} ₽`,
        variant: 'destructive'
      });
      return;
    }

    setLoading(true);
    try {
      const userId = getUserId();
      const response = await fetch(PROMOTIONS_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-User-Id': userId
        },
        body: JSON.stringify({
          course_id: courseId,
          promotion_type: selectedType,
          days: selectedDays
        })
      });

      if (response.ok) {
        const data = await response.json();
        toast({
          title: 'Успешно!',
          description: `Курс поднят в топ до ${new Date(data.promoted_until).toLocaleDateString('ru-RU')}`
        });
        onOpenChange(false);
        onSuccess();
      } else {
        const error = await response.json();
        toast({
          title: 'Ошибка',
          description: error.error || 'Не удалось поднять курс',
          variant: 'destructive'
        });
      }
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Ошибка при подъёме курса',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const selectedPrice = prices ? prices[selectedType][selectedDays] : 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Поднять курс в топ</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div>
            <p className="font-semibold mb-1">{courseTitle}</p>
            <p className="text-sm text-gray-500">Категория: {courseCategory}</p>
          </div>

          <div>
            <Label className="mb-3 block">Тип продвижения</Label>
            <RadioGroup value={selectedType} onValueChange={(v) => setSelectedType(v as any)}>
              <div className="flex items-start space-x-2 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                <RadioGroupItem value="own_category" id="own" />
                <Label htmlFor="own" className="flex-1 cursor-pointer">
                  <div className="font-medium">В своей категории</div>
                  <div className="text-sm text-gray-500">Курс будет показываться выше в категории "{courseCategory}"</div>
                </Label>
              </div>
              <div className="flex items-start space-x-2 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                <RadioGroupItem value="all_categories" id="all" />
                <Label htmlFor="all" className="flex-1 cursor-pointer">
                  <div className="font-medium">Во всех категориях</div>
                  <div className="text-sm text-gray-500">Курс будет показываться выше во всех категориях и на главной</div>
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
                  <div className="font-bold text-lg">{days} {days === 1 ? 'день' : 'дня'}</div>
                  <div className="text-sm text-gray-600 mt-1">
                    {prices ? prices[selectedType][days].toLocaleString('ru-RU') : '---'} ₽
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
            disabled={loading || balance < selectedPrice}
          >
            <Icon name="TrendingUp" size={16} className="mr-2" />
            {loading ? 'Обработка...' : `Поднять курс за ${selectedPrice.toLocaleString('ru-RU')} ₽`}
          </Button>

          {balance < selectedPrice && (
            <p className="text-sm text-red-600 text-center">
              Недостаточно средств. Пополните баланс на {(selectedPrice - balance).toLocaleString('ru-RU')} ₽
            </p>
          )}

          <p className="text-xs text-gray-500 text-center">
            Курсы с активным продвижением показываются выше. 
            Если кто-то позже поднимет свой курс — он окажется выше вашего.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}