import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';

interface VacancyPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  salonName?: string;
  onPaymentSuccess: () => void;
}

export default function VacancyPaymentModal({
  isOpen,
  onClose,
  salonName: propSalonName,
  onPaymentSuccess,
}: VacancyPaymentModalProps) {
  const [vacancyCount, setVacancyCount] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [salonName, setSalonName] = useState(propSalonName || '');
  const { toast } = useToast();

  useEffect(() => {
    const fetchSalonName = async () => {
      if (propSalonName) {
        setSalonName(propSalonName);
        return;
      }

      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        const res = await fetch('https://functions.poehali.dev/7e0aa476-d2dc-4e24-829a-a5dbda9ab76b?action=salon_profile', {
          headers: {
            'X-Authorization': `Bearer ${token}`,
          },
        });

        if (res.ok) {
          const data = await res.json();
          if (data.salon?.name) {
            setSalonName(data.salon.name);
          }
        }
      } catch (error) {
        console.error('Failed to fetch salon name:', error);
      }
    };

    if (isOpen) {
      fetchSalonName();
    }
  }, [isOpen, propSalonName]);

  const pricePerVacancy = 500;
  const totalAmount = pricePerVacancy * vacancyCount;

  const handlePayment = async () => {
    if (!salonName) {
      toast({
        title: 'Ошибка',
        description: 'Название салона не указано',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast({
          title: 'Ошибка',
          description: 'Необходима авторизация',
          variant: 'destructive',
        });
        setIsLoading(false);
        return;
      }

      const res = await fetch('https://functions.poehali.dev/7497cf71-d442-407d-99d7-d6ec11e01322', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          salon_name: salonName,
          vacancy_count: vacancyCount,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        
        window.location.href = data.confirmation_url;
      } else {
        const error = await res.json();
        toast({
          title: 'Ошибка',
          description: error.error || 'Не удалось создать платеж',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Произошла ошибка при создании платежа',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Icon name="CreditCard" size={24} />
            Оплата дополнительных вакансий
          </DialogTitle>
          <DialogDescription>
            Первая вакансия бесплатна. Дополнительные вакансии — 500₽ за штуку.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="salon">Салон</Label>
            <Input 
              id="salon" 
              value={salonName} 
              onChange={(e) => setSalonName(e.target.value)}
              placeholder="Введите название салона"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="count">Количество вакансий</Label>
            <Input
              id="count"
              type="number"
              min={1}
              max={10}
              value={vacancyCount}
              onChange={(e) => setVacancyCount(Math.max(1, Math.min(10, parseInt(e.target.value) || 1)))}
            />
            <p className="text-sm text-muted-foreground">
              Можно купить от 1 до 10 вакансий за раз
            </p>
          </div>

          <div className="rounded-lg border bg-muted/50 p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Цена за вакансию:</span>
              <span className="font-medium">{pricePerVacancy}₽</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Количество:</span>
              <span className="font-medium">×{vacancyCount}</span>
            </div>
            <div className="mt-3 pt-3 border-t flex items-center justify-between">
              <span className="font-semibold">Итого к оплате:</span>
              <span className="text-2xl font-bold text-primary">{totalAmount}₽</span>
            </div>
          </div>

          <div className="rounded-lg border border-blue-200 bg-blue-50 p-3">
            <div className="flex gap-2">
              <Icon name="Info" size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-blue-900">
                <p className="font-medium mb-1">Как это работает:</p>
                <ul className="space-y-1 text-blue-800">
                  <li>• После оплаты слоты добавятся к вашему салону</li>
                  <li>• Вы сможете создать вакансии в любое время</li>
                  <li>• Слоты не сгорают и действуют бессрочно</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Отмена
          </Button>
          <Button onClick={handlePayment} disabled={isLoading}>
            {isLoading ? (
              <>
                <Icon name="Loader2" className="mr-2 h-4 w-4 animate-spin" />
                Создание платежа...
              </>
            ) : (
              <>
                <Icon name="CreditCard" className="mr-2 h-4 w-4" />
                Оплатить {totalAmount}₽
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}