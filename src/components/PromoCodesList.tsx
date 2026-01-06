import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface PromoRequest {
  id: number;
  school_email: string;
  course_title: string;
  entity_type: string;
  status: string;
  promo_code: string | null;
  purchase_url: string | null;
  discount_percentage: number | null;
  expires_at: string | null;
  opened_at: string | null;
  created_at: string;
  responded_at: string | null;
}

const PROMO_API_URL = 'https://functions.poehali.dev/0e44bf6d-cb4d-404e-832f-02070e6e8b13';

export default function PromoCodesList() {
  const { toast } = useToast();
  const [requests, setRequests] = useState<PromoRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPromo, setSelectedPromo] = useState<PromoRequest | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  const [timeLeft, setTimeLeft] = useState<{ hours: number; minutes: number; seconds: number } | null>(null);

  useEffect(() => {
    loadRequests();
  }, []);

  useEffect(() => {
    if (selectedPromo?.expires_at) {
      const timer = setInterval(() => {
        const now = new Date().getTime();
        const expiry = new Date(selectedPromo.expires_at!).getTime();
        const diff = expiry - now;

        if (diff <= 0) {
          setTimeLeft(null);
          setShowDialog(false);
          toast({ title: 'Промокод истёк', description: 'Время действия промокода закончилось', variant: 'destructive' });
        } else {
          const hours = Math.floor(diff / (1000 * 60 * 60));
          const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((diff % (1000 * 60)) / 1000);
          setTimeLeft({ hours, minutes, seconds });
        }
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [selectedPromo]);

  const loadRequests = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${PROMO_API_URL}?action=my_requests`, {
        headers: {
          'X-Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setRequests(data);
      }
    } catch (error) {
      toast({ title: 'Ошибка', description: 'Не удалось загрузить запросы', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const handleOpenPromo = async (request: PromoRequest) => {
    if (request.opened_at) {
      // Промокод уже был открыт
      setSelectedPromo(request);
      setShowDialog(true);
    } else {
      // Открываем промокод впервые (запускаем таймер)
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${PROMO_API_URL}?action=open`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ request_id: request.id })
        });

        if (response.ok) {
          const data = await response.json();
          const updatedRequest = { ...request, ...data, opened_at: new Date().toISOString() };
          setSelectedPromo(updatedRequest);
          setShowDialog(true);
          loadRequests(); // Обновляем список
        } else {
          const error = await response.json();
          toast({ title: 'Ошибка', description: error.error, variant: 'destructive' });
        }
      } catch (error) {
        toast({ title: 'Ошибка', description: 'Не удалось открыть промокод', variant: 'destructive' });
      }
    }
  };

  const copyPromoCode = () => {
    if (selectedPromo?.promo_code) {
      navigator.clipboard.writeText(selectedPromo.promo_code);
      toast({ title: 'Скопировано', description: 'Промокод скопирован в буфер обмена' });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary">Ожидает ответа</Badge>;
      case 'approved':
        return <Badge className="bg-green-500">Одобрен</Badge>;
      case 'rejected':
        return <Badge variant="destructive">Отклонён</Badge>;
      case 'expired':
        return <Badge variant="outline">Истёк</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Icon name="Loader2" className="animate-spin" size={32} />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Мои запросы на скидку</h2>
        <Button variant="outline" size="sm" onClick={loadRequests}>
          <Icon name="RefreshCw" size={16} className="mr-2" />
          Обновить
        </Button>
      </div>

      {requests.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <Icon name="Tag" className="mx-auto mb-4 text-muted-foreground" size={48} />
            <p className="text-lg font-medium mb-2">Нет запросов</p>
            <p className="text-muted-foreground">Запросите скидку на курс в каталоге</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {requests.map((request) => (
            <Card key={request.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-2">{request.course_title}</CardTitle>
                    <p className="text-sm text-muted-foreground">Школа: {request.school_email}</p>
                  </div>
                  {getStatusBadge(request.status)}
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Icon name="Calendar" size={16} />
                  <span>Запрос от {new Date(request.created_at).toLocaleDateString('ru-RU')}</span>
                </div>

                {request.status === 'approved' && request.promo_code && (
                  <Button 
                    className="w-full"
                    onClick={() => handleOpenPromo(request)}
                  >
                    <Icon name="Gift" size={16} className="mr-2" />
                    {request.opened_at ? 'Открыть промокод снова' : 'Получить промокод'}
                  </Button>
                )}

                {request.status === 'rejected' && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded text-sm text-red-800">
                    К сожалению, школа отклонила ваш запрос
                  </div>
                )}

                {request.status === 'pending' && (
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded text-sm text-blue-800 flex items-center gap-2">
                    <Icon name="Clock" size={16} />
                    Ожидаем ответ от школы...
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Ваш промокод</DialogTitle>
          </DialogHeader>
          {selectedPromo && (
            <div className="space-y-4">
              <div className="p-4 bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-300 rounded-lg">
                <p className="text-sm text-muted-foreground mb-2">Промокод</p>
                <div className="flex items-center gap-2">
                  <code className="text-2xl font-bold">{selectedPromo.promo_code}</code>
                  <Button size="sm" variant="ghost" onClick={copyPromoCode}>
                    <Icon name="Copy" size={16} />
                  </Button>
                </div>
              </div>

              {timeLeft && (
                <div className="p-4 bg-amber-50 border border-amber-300 rounded-lg text-center">
                  <p className="text-sm text-amber-800 mb-2">⏱️ Осталось времени</p>
                  <p className="text-3xl font-bold text-amber-900">
                    {String(timeLeft.hours).padStart(2, '0')}:
                    {String(timeLeft.minutes).padStart(2, '0')}:
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </p>
                </div>
              )}

              {selectedPromo.discount_percentage && (
                <div className="text-center">
                  <Badge className="text-lg px-4 py-2">Скидка {selectedPromo.discount_percentage}%</Badge>
                </div>
              )}

              <Button 
                className="w-full" 
                size="lg"
                onClick={() => window.open(selectedPromo.purchase_url!, '_blank')}
              >
                <Icon name="ExternalLink" size={18} className="mr-2" />
                Перейти к оформлению
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                У вас есть 1 час с момента первого открытия промокода
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
