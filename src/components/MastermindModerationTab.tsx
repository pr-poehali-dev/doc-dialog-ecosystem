import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface Mastermind {
  id: number;
  school_id: number;
  school_name: string;
  title: string;
  description: string;
  event_date: string;
  location: string | null;
  max_participants: number | null;
  current_participants?: number;
  price: number | null;
  currency: string;
  image_url: string | null;
  external_url: string;
  status: string;
  created_at: string;
  original_price?: number | null;
  discount_price?: number | null;
  author_name?: string;
  author_photo?: string | null;
  author_position?: string;
  event_content?: string;
  co_authors?: any[];
}

const ADMIN_API_URL = 'https://functions.poehali.dev/d9ed333b-313d-40b6-8ca2-016db5854f7c';
const REVIEWS_API_URL = 'https://functions.poehali.dev/dacb9e9b-c76e-4430-8ed9-362ffc8b9566';
const MASTERMIND_API_URL = 'https://functions.poehali.dev/95b5e0a7-51f7-4fb1-b196-a49f5feff58f';

interface MastermindModerationTabProps {
  onModerationComplete?: () => void;
}

export default function MastermindModerationTab({ onModerationComplete }: MastermindModerationTabProps) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [masterminds, setMasterminds] = useState<Mastermind[]>([]);
  const [selectedMastermind, setSelectedMastermind] = useState<number | null>(null);
  const [moderationComment, setModerationComment] = useState('');
  const [viewDetailsId, setViewDetailsId] = useState<number | null>(null);
  const [detailsMastermind, setDetailsMastermind] = useState<Mastermind | null>(null);

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
        // Generate auto reviews after approval
        try {
          await fetch(`${REVIEWS_API_URL}?action=generate_auto`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ entity_type: 'mastermind', entity_id: mastermindId })
          });
        } catch (err) {
          console.error('Failed to generate auto reviews:', err);
        }
        
        toast({ title: 'Мастермайнд одобрен', description: 'Мастермайнд опубликован с автоматическими отзывами' });
        setModerationComment('');
        setSelectedMastermind(null);
        loadPendingMasterminds();
        if (onModerationComplete) onModerationComplete();
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
        if (onModerationComplete) onModerationComplete();
      } else {
        toast({ title: 'Ошибка', description: 'Не удалось отклонить мастермайнд', variant: 'destructive' });
      }
    } catch (error) {
      toast({ title: 'Ошибка', description: 'Не удалось отклонить мастермайнд', variant: 'destructive' });
    }
  };

  const loadMastermindDetails = async (mastermindId: number) => {
    try {
      const response = await fetch(`${MASTERMIND_API_URL}?action=masterminds&id=${mastermindId}&skip_status_check=true`);
      if (response.ok) {
        const data = await response.json();
        setDetailsMastermind(data);
        setViewDetailsId(mastermindId);
      } else {
        toast({ title: 'Ошибка', description: 'Не удалось загрузить детали мастермайнда', variant: 'destructive' });
      }
    } catch (error) {
      toast({ title: 'Ошибка', description: 'Не удалось загрузить детали мастермайнда', variant: 'destructive' });
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

              <div className="flex gap-2 pt-2 border-t flex-wrap">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => loadMastermindDetails(mastermind.id)}
                >
                  <Icon name="Eye" size={16} className="mr-2" />
                  Посмотреть детали
                </Button>
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

      <Dialog open={viewDetailsId !== null} onOpenChange={(open) => !open && setViewDetailsId(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{detailsMastermind?.title}</DialogTitle>
            <DialogDescription>Полная информация о мастермайнде для модерации</DialogDescription>
          </DialogHeader>

          {detailsMastermind && (
            <div className="space-y-6">
              {/* Основная информация */}
              <div className="border-l-4 border-primary pl-4">
                <h3 className="font-semibold mb-2">Основная информация</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Icon name="School" size={16} className="text-muted-foreground" />
                    <span className="font-medium">Школа:</span> {detailsMastermind.school_name}
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="Calendar" size={16} className="text-muted-foreground" />
                    <span className="font-medium">Дата:</span> {new Date(detailsMastermind.event_date).toLocaleString('ru-RU')}
                  </div>
                  {detailsMastermind.location && (
                    <div className="flex items-center gap-2">
                      <Icon name="MapPin" size={16} className="text-muted-foreground" />
                      <span className="font-medium">Место:</span> {detailsMastermind.location}
                    </div>
                  )}
                  {detailsMastermind.max_participants && (
                    <div className="flex items-center gap-2">
                      <Icon name="Users" size={16} className="text-muted-foreground" />
                      <span className="font-medium">Макс. участников:</span> {detailsMastermind.max_participants}
                    </div>
                  )}
                </div>
              </div>

              {/* Описание */}
              {detailsMastermind.description && (
                <div>
                  <h3 className="font-semibold mb-2">Краткое описание</h3>
                  <p className="text-sm whitespace-pre-wrap">{detailsMastermind.description}</p>
                </div>
              )}

              {/* Программа события */}
              {detailsMastermind.event_content && (
                <div>
                  <h3 className="font-semibold mb-2">Программа мастермайнда</h3>
                  <p className="text-sm whitespace-pre-wrap bg-secondary/10 p-4 rounded-lg">{detailsMastermind.event_content}</p>
                </div>
              )}

              {/* Ведущий */}
              {(detailsMastermind.author_name || detailsMastermind.author_photo) && (
                <div className="border rounded-lg p-4 bg-secondary/10">
                  <h3 className="font-semibold mb-3">Ведущий мастермайнда</h3>
                  <div className="flex items-start gap-4">
                    {detailsMastermind.author_photo && (
                      <img 
                        src={detailsMastermind.author_photo} 
                        alt={detailsMastermind.author_name} 
                        className="w-16 h-16 rounded-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = 'https://i.pravatar.cc/150?img=1';
                        }}
                      />
                    )}
                    <div className="flex-1">
                      {detailsMastermind.author_name && <p className="font-medium">{detailsMastermind.author_name}</p>}
                      {detailsMastermind.author_position && <p className="text-sm text-muted-foreground">{detailsMastermind.author_position}</p>}
                    </div>
                  </div>
                </div>
              )}

              {/* Со-ведущие */}
              {detailsMastermind.co_authors && detailsMastermind.co_authors.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-2">Со-ведущие</h3>
                  <div className="space-y-2">
                    {detailsMastermind.co_authors.map((author: any, idx: number) => (
                      <div key={idx} className="flex items-center gap-3 border rounded p-3">
                        {author.photo && (
                          <img src={author.photo} alt={author.name} className="w-10 h-10 rounded-full object-cover" />
                        )}
                        <div>
                          <p className="font-medium text-sm">{author.name}</p>
                          {author.position && <p className="text-xs text-muted-foreground">{author.position}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Изображение */}
              {detailsMastermind.image_url && (
                <div>
                  <h3 className="font-semibold mb-2">Изображение события</h3>
                  <img 
                    src={detailsMastermind.image_url} 
                    alt={detailsMastermind.title}
                    className="w-full rounded-lg object-cover max-h-96"
                    onError={(e) => {
                      e.currentTarget.src = 'https://placehold.co/800x400/e2e8f0/64748b?text=Ошибка+загрузки';
                    }}
                  />
                </div>
              )}

              {/* Цена и скидки */}
              <div className="border-t pt-4 flex gap-6 flex-wrap">
                {detailsMastermind.original_price && (
                  <div>
                    <span className="text-sm text-muted-foreground">Оригинальная цена:</span>
                    <p className="font-semibold line-through">{detailsMastermind.original_price.toLocaleString()} {detailsMastermind.currency}</p>
                  </div>
                )}
                {detailsMastermind.discount_price && (
                  <div>
                    <span className="text-sm text-muted-foreground">Цена со скидкой:</span>
                    <p className="font-semibold text-red-600">{detailsMastermind.discount_price.toLocaleString()} {detailsMastermind.currency}</p>
                  </div>
                )}
                {detailsMastermind.price && !detailsMastermind.discount_price && (
                  <div>
                    <span className="text-sm text-muted-foreground">Цена:</span>
                    <p className="font-semibold">{detailsMastermind.price.toLocaleString()} {detailsMastermind.currency}</p>
                  </div>
                )}
                {detailsMastermind.current_participants !== undefined && (
                  <div>
                    <span className="text-sm text-muted-foreground">Текущие участники:</span>
                    <p className="font-semibold">{detailsMastermind.current_participants} / {detailsMastermind.max_participants || '∞'}</p>
                  </div>
                )}
              </div>

              {/* Ссылка для регистрации */}
              <div className="border-t pt-4">
                <h3 className="font-semibold mb-2">Ссылка для регистрации</h3>
                <a 
                  href={detailsMastermind.external_url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-sm text-primary hover:underline flex items-center gap-2"
                >
                  {detailsMastermind.external_url}
                  <Icon name="ExternalLink" size={14} />
                </a>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}