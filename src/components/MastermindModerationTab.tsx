import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';

interface Mastermind {
  id: number;
  school_id: number;
  school_name: string;
  title: string;
  description: string;
  event_date: string;
  location: string | null;
  max_participants: number | null;
  price: number | null;
  currency: string;
  image_url: string | null;
  external_url: string;
  status: string;
  created_at: string;
}

const ADMIN_API_URL = 'https://functions.poehali.dev/d9ed333b-313d-40b6-8ca2-016db5854f7c';

export default function MastermindModerationTab() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [masterminds, setMasterminds] = useState<Mastermind[]>([]);
  const [selectedMastermind, setSelectedMastermind] = useState<number | null>(null);
  const [moderationComment, setModerationComment] = useState('');

  useEffect(() => {
    loadPendingMasterminds();
  }, []);

  const loadPendingMasterminds = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${ADMIN_API_URL}?action=masterminds`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      setMasterminds(data);
    } catch (error) {
      toast({ title: 'Ошибка', description: 'Не удалось загрузить мастермайнды', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const approveMastermind = async (mastermindId: number) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${ADMIN_API_URL}?action=moderate_mastermind`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          mastermind_id: mastermindId,
          approve: true,
          comment: moderationComment
        })
      });

      if (response.ok) {
        toast({ title: 'Мастермайнд одобрен', description: 'Мастермайнд опубликован' });
        setModerationComment('');
        setSelectedMastermind(null);
        loadPendingMasterminds();
      } else {
        toast({ title: 'Ошибка', description: 'Не удалось одобрить мастермайнд', variant: 'destructive' });
      }
    } catch (error) {
      toast({ title: 'Ошибка', description: 'Не удалось одобрить мастермайнд', variant: 'destructive' });
    }
  };

  const rejectMastermind = async (mastermindId: number) => {
    if (!moderationComment.trim()) {
      toast({ title: 'Укажите причину', description: 'Необходимо указать причину отклонения', variant: 'destructive' });
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${ADMIN_API_URL}?action=moderate_mastermind`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          mastermind_id: mastermindId,
          approve: false,
          comment: moderationComment
        })
      });

      if (response.ok) {
        toast({ title: 'Мастермайнд отклонен', description: 'Школа получит уведомление об отклонении' });
        setModerationComment('');
        setSelectedMastermind(null);
        loadPendingMasterminds();
      } else {
        toast({ title: 'Ошибка', description: 'Не удалось отклонить мастермайнд', variant: 'destructive' });
      }
    } catch (error) {
      toast({ title: 'Ошибка', description: 'Не удалось отклонить мастермайнд', variant: 'destructive' });
    }
  };

  return (
    <div className="space-y-4">
      {loading ? (
        <Card>
          <CardContent className="p-8 text-center">
            <Icon name="Loader2" className="animate-spin mx-auto mb-4" size={32} />
            <p>Загрузка мастермайндов на модерации...</p>
          </CardContent>
        </Card>
      ) : masterminds.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <Icon name="CheckCircle" className="mx-auto mb-4 text-green-500" size={48} />
            <p className="text-lg font-medium">Нет мастермайндов на модерации</p>
            <p className="text-muted-foreground">Все мастермайнды обработаны</p>
          </CardContent>
        </Card>
      ) : (
        masterminds.map(mastermind => (
          <Card key={mastermind.id}>
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <CardTitle className="mb-2">{mastermind.title}</CardTitle>
                  <CardDescription>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Icon name="School" size={14} />
                        <span>Школа: {mastermind.school_name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Icon name="Calendar" size={14} />
                        <span>Дата: {new Date(mastermind.event_date).toLocaleString('ru-RU')}</span>
                      </div>
                      {mastermind.location && (
                        <div className="flex items-center gap-2">
                          <Icon name="MapPin" size={14} />
                          <span>Место: {mastermind.location}</span>
                        </div>
                      )}
                      {mastermind.price && (
                        <div className="flex items-center gap-2">
                          <Icon name="Coins" size={14} />
                          <span>Цена: {mastermind.price.toLocaleString()} {mastermind.currency}</span>
                        </div>
                      )}
                      {mastermind.max_participants && (
                        <div className="flex items-center gap-2">
                          <Icon name="Users" size={14} />
                          <span>Макс. участников: {mastermind.max_participants}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <Icon name="Clock" size={14} />
                        <span>Добавлен: {new Date(mastermind.created_at).toLocaleString('ru-RU')}</span>
                      </div>
                    </div>
                  </CardDescription>
                </div>
                <Badge variant="secondary">На модерации</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium mb-2">Описание:</p>
                <p className="text-sm text-muted-foreground">{mastermind.description || 'Нет описания'}</p>
              </div>

              {mastermind.image_url && (
                <div>
                  <p className="text-sm font-medium mb-2">Изображение:</p>
                  <img 
                    src={mastermind.image_url} 
                    alt={mastermind.title}
                    className="w-full max-w-md h-48 object-cover rounded-lg"
                    onError={(e) => {
                      e.currentTarget.src = 'https://placehold.co/600x400/e2e8f0/64748b?text=Ошибка+загрузки';
                    }}
                  />
                </div>
              )}

              <div>
                <p className="text-sm font-medium mb-2">Ссылка для регистрации:</p>
                <a href={mastermind.external_url} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline flex items-center gap-2">
                  {mastermind.external_url}
                  <Icon name="ExternalLink" size={14} />
                </a>
              </div>

              {selectedMastermind === mastermind.id && (
                <div className="space-y-2">
                  <p className="text-sm font-medium">Комментарий к модерации:</p>
                  <Textarea
                    value={moderationComment}
                    onChange={(e) => setModerationComment(e.target.value)}
                    placeholder="Укажите причину отклонения или комментарий (необязательно для одобрения)"
                    rows={3}
                  />
                </div>
              )}

              <div className="flex gap-2 pt-2 border-t">
                {selectedMastermind === mastermind.id ? (
                  <>
                    <Button onClick={() => approveMastermind(mastermind.id)} className="bg-green-600 hover:bg-green-700">
                      <Icon name="Check" size={18} className="mr-2" />
                      Подтвердить одобрение
                    </Button>
                    <Button onClick={() => rejectMastermind(mastermind.id)} variant="destructive">
                      <Icon name="X" size={18} className="mr-2" />
                      Подтвердить отклонение
                    </Button>
                    <Button onClick={() => { setSelectedMastermind(null); setModerationComment(''); }} variant="outline">
                      Отмена
                    </Button>
                  </>
                ) : (
                  <>
                    <Button onClick={() => setSelectedMastermind(mastermind.id)} className="bg-green-600 hover:bg-green-700">
                      <Icon name="CheckCircle" size={18} className="mr-2" />
                      Одобрить
                    </Button>
                    <Button onClick={() => setSelectedMastermind(mastermind.id)} variant="destructive">
                      <Icon name="XCircle" size={18} className="mr-2" />
                      Отклонить
                    </Button>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
}
