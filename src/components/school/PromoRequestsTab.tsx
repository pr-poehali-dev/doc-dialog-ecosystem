import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';

interface PromoRequest {
  id: number;
  masseur_email: string;
  masseur_name: string;
  course_title: string;
  entity_type: string;
  status: string;
  promo_code: string | null;
  purchase_url: string | null;
  discount_percentage: number | null;
  created_at: string;
  responded_at: string | null;
}

const PROMO_API_URL = 'https://functions.poehali.dev/0e44bf6d-cb4d-404e-832f-02070e6e8b13';

export default function PromoRequestsTab() {
  const { toast } = useToast();
  const [requests, setRequests] = useState<PromoRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [showDialog, setShowDialog] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<PromoRequest | null>(null);
  const [responding, setResponding] = useState(false);
  
  const [promoCode, setPromoCode] = useState('');
  const [purchaseUrl, setPurchaseUrl] = useState('');
  const [discountPercentage, setDiscountPercentage] = useState<number | undefined>();

  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${PROMO_API_URL}?action=school_requests`, {
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

  const handleApprove = (request: PromoRequest) => {
    setSelectedRequest(request);
    setPromoCode('');
    setPurchaseUrl('');
    setDiscountPercentage(undefined);
    setShowDialog(true);
  };

  const handleReject = async (requestId: number) => {
    if (!confirm('Вы уверены, что хотите отклонить запрос?')) return;

    setResponding(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(PROMO_API_URL, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          request_id: requestId,
          action: 'reject'
        })
      });

      if (response.ok) {
        toast({ title: 'Запрос отклонён' });
        loadRequests();
      } else {
        const error = await response.json();
        toast({ title: 'Ошибка', description: error.error, variant: 'destructive' });
      }
    } catch (error) {
      toast({ title: 'Ошибка', description: 'Не удалось отклонить запрос', variant: 'destructive' });
    } finally {
      setResponding(false);
    }
  };

  const handleSubmitPromo = async () => {
    if (!promoCode || !purchaseUrl || !selectedRequest) {
      toast({ title: 'Ошибка', description: 'Заполните все поля', variant: 'destructive' });
      return;
    }

    setResponding(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(PROMO_API_URL, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          request_id: selectedRequest.id,
          action: 'approve',
          promo_code: promoCode,
          purchase_url: purchaseUrl,
          discount_percentage: discountPercentage
        })
      });

      if (response.ok) {
        toast({ title: 'Промокод отправлен', description: 'Массажист получит уведомление' });
        setShowDialog(false);
        loadRequests();
      } else {
        const error = await response.json();
        toast({ title: 'Ошибка', description: error.error, variant: 'destructive' });
      }
    } catch (error) {
      toast({ title: 'Ошибка', description: 'Не удалось отправить промокод', variant: 'destructive' });
    } finally {
      setResponding(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Новый запрос</Badge>;
      case 'approved':
        return <Badge className="bg-green-500">Одобрен</Badge>;
      case 'rejected':
        return <Badge variant="destructive">Отклонён</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const pendingCount = requests.filter(r => r.status === 'pending').length;

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
        <div>
          <h2 className="text-2xl font-bold">Запросы на скидку</h2>
          {pendingCount > 0 && (
            <p className="text-sm text-muted-foreground mt-1">
              {pendingCount} {pendingCount === 1 ? 'новый запрос' : 'новых запросов'}
            </p>
          )}
        </div>
        <Button variant="outline" size="sm" onClick={loadRequests}>
          <Icon name="RefreshCw" size={16} className="mr-2" />
          Обновить
        </Button>
      </div>

      {requests.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <Icon name="Inbox" className="mx-auto mb-4 text-muted-foreground" size={48} />
            <p className="text-lg font-medium mb-2">Нет запросов</p>
            <p className="text-muted-foreground">Массажисты смогут запросить скидку на ваши курсы</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {requests.map((request) => (
            <Card key={request.id} className={request.status === 'pending' ? 'border-yellow-300 bg-yellow-50/30' : ''}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <CardTitle className="text-lg">{request.course_title}</CardTitle>
                      <Badge variant="outline" className="text-xs">
                        {request.entity_type === 'mastermind' ? 'Мастермайнд' : 
                         request.entity_type === 'offline_training' ? 'Очное обучение' : 'Курс'}
                      </Badge>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">
                        <Icon name="User" size={14} className="inline mr-1" />
                        {request.masseur_name} ({request.masseur_email})
                      </p>
                      <p className="text-sm text-muted-foreground">
                        <Icon name="Calendar" size={14} className="inline mr-1" />
                        {new Date(request.created_at).toLocaleDateString('ru-RU', { 
                          day: 'numeric', 
                          month: 'long',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                  </div>
                  {getStatusBadge(request.status)}
                </div>
              </CardHeader>
              <CardContent>
                {request.status === 'pending' && (
                  <div className="flex gap-2">
                    <Button 
                      className="flex-1"
                      onClick={() => handleApprove(request)}
                      disabled={responding}
                    >
                      <Icon name="Check" size={16} className="mr-2" />
                      Предоставить скидку
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => handleReject(request.id)}
                      disabled={responding}
                    >
                      <Icon name="X" size={16} className="mr-2" />
                      Отклонить
                    </Button>
                  </div>
                )}

                {request.status === 'approved' && (
                  <div className="p-3 bg-green-50 border border-green-200 rounded text-sm">
                    <p className="font-semibold text-green-800 mb-1">Промокод отправлен</p>
                    <p className="text-green-700">
                      Код: <code className="font-mono font-bold">{request.promo_code}</code>
                      {request.discount_percentage && ` • ${request.discount_percentage}% скидка`}
                    </p>
                  </div>
                )}

                {request.status === 'rejected' && (
                  <div className="p-3 bg-gray-50 border border-gray-200 rounded text-sm text-gray-700">
                    Запрос отклонён {request.responded_at && `• ${new Date(request.responded_at).toLocaleDateString('ru-RU')}`}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Предоставить промокод</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="promo-code">Промокод *</Label>
              <Input
                id="promo-code"
                placeholder="DISCOUNT20"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="purchase-url">Ссылка на оформление *</Label>
              <Input
                id="purchase-url"
                type="url"
                placeholder="https://..."
                value={purchaseUrl}
                onChange={(e) => setPurchaseUrl(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="discount">Процент скидки (необязательно)</Label>
              <Input
                id="discount"
                type="number"
                min="1"
                max="100"
                placeholder="20"
                value={discountPercentage || ''}
                onChange={(e) => setDiscountPercentage(e.target.value ? parseInt(e.target.value) : undefined)}
              />
            </div>

            <div className="p-3 bg-amber-50 border border-amber-200 rounded text-xs text-amber-800">
              <Icon name="Info" size={14} className="inline mr-1" />
              У массажиста будет 1 час с момента открытия промокода для оформления заказа
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDialog(false)}>
              Отмена
            </Button>
            <Button onClick={handleSubmitPromo} disabled={responding}>
              {responding ? 'Отправка...' : 'Отправить промокод'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}