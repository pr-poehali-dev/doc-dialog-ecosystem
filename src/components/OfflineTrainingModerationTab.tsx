import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import Icon from "@/components/ui/icon";
import { formatMoscowDateTime } from '@/utils/datetime';

interface OfflineTraining {
  id: number;
  school_name: string;
  title: string;
  description: string;
  event_date: string;
  location: string;
  max_participants: number;
  price: number;
  image_url: string;
  external_url: string;
  status: string;
  created_at: string;
  slug: string;
  original_price?: number;
  discount_price?: number;
  author_name?: string;
  author_photo?: string;
  event_content?: string;
}

interface OfflineTrainingModerationTabProps {
  onModerationComplete?: () => void;
}

const ADMIN_API_URL = 'https://functions.poehali.dev/d9ed333b-313d-40b6-8ca2-016db5854f7c';
const REVIEWS_API_URL = 'https://functions.poehali.dev/dacb9e9b-c76e-4430-8ed9-362ffc8b9566';

export default function OfflineTrainingModerationTab({ onModerationComplete }: OfflineTrainingModerationTabProps) {
  const { toast } = useToast();
  const [trainings, setTrainings] = useState<OfflineTraining[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedTraining, setSelectedTraining] = useState<number | null>(null);
  const [moderationComment, setModerationComment] = useState('');

  useEffect(() => {
    loadTrainings();
  }, []);

  const loadTrainings = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://functions.poehali.dev/95b5e0a7-51f7-4fb1-b196-a49f5feff58f?action=offline_trainings&status=pending');
      
      if (response.ok) {
        const data = await response.json();
        setTrainings(data);
      }
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось загрузить список очных обучений",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const approveTraining = async (trainingId: number) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${ADMIN_API_URL}?action=moderate_offline_training`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          training_id: trainingId,
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
            body: JSON.stringify({ entity_type: 'offline_training', entity_id: trainingId })
          });
        } catch (err) {
          console.error('Failed to generate auto reviews:', err);
        }
        
        toast({
          title: "Очное обучение одобрено",
          description: "Обучение опубликовано с автоматическими отзывами"
        });
        setModerationComment('');
        setSelectedTraining(null);
        loadTrainings();
        onModerationComplete?.();
      } else {
        toast({
          title: "Ошибка",
          description: "Не удалось одобрить обучение",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось одобрить обучение",
        variant: "destructive"
      });
    }
  };

  const rejectTraining = async (trainingId: number) => {
    if (!moderationComment.trim()) {
      toast({ title: 'Укажите причину', description: 'Необходимо указать причину отклонения', variant: 'destructive' });
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${ADMIN_API_URL}?action=moderate_offline_training`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          training_id: trainingId,
          approve: false,
          comment: moderationComment
        })
      });

      if (response.ok) {
        toast({ title: 'Очное обучение отклонено', description: 'Школа получит уведомление об отклонении' });
        setModerationComment('');
        setSelectedTraining(null);
        loadTrainings();
        onModerationComplete?.();
      } else {
        toast({ title: 'Ошибка', description: 'Не удалось отклонить обучение', variant: 'destructive' });
      }
    } catch (error) {
      toast({ title: 'Ошибка', description: 'Не удалось отклонить обучение', variant: 'destructive' });
    }
  };

  const deleteTraining = async (trainingId: number) => {
    if (!confirm('Вы уверены, что хотите удалить это обучение?')) return;
    
    try {
      const response = await fetch(`https://functions.poehali.dev/95b5e0a7-51f7-4fb1-b196-a49f5feff58f?type=offline_trainings&id=${trainingId}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        toast({
          title: "Успешно",
          description: "Очное обучение удалено"
        });
        loadTrainings();
        onModerationComplete?.();
      }
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось удалить обучение",
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return <div className="text-center py-8">Загрузка...</div>;
  }

  return (
    <div className="space-y-8">
      {trainings.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-4">На модерации ({trainings.length})</h2>
          <div className="space-y-4">
            {trainings.map((training) => (
              <Card key={training.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{training.title}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">{training.school_name}</p>
                    </div>
                    <Badge variant="secondary">На модерации</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    {training.image_url && (
                      <img src={training.image_url} alt={training.title} className="w-full h-48 object-cover rounded-lg" />
                    )}
                    <div className="space-y-2">
                      <p className="text-sm"><strong>Описание:</strong> {training.description}</p>
                      <p className="text-sm"><strong>Дата:</strong> {formatMoscowDateTime(training.event_date)}</p>
                      <p className="text-sm"><strong>Место:</strong> {training.location}</p>
                      <p className="text-sm"><strong>Макс. участников:</strong> {training.max_participants}</p>
                      <p className="text-sm"><strong>Цена:</strong> {training.price} ₽</p>
                      {training.external_url && (
                        <a href={training.external_url} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline flex items-center gap-1">
                          <Icon name="ExternalLink" size={14} />
                          Ссылка на регистрацию
                        </a>
                      )}
                    </div>
                  </div>
                  
                  {selectedTraining === training.id && (
                    <div className="mb-4 space-y-2">
                      <label className="text-sm font-medium">Комментарий модератора</label>
                      <Textarea
                        value={moderationComment}
                        onChange={(e) => setModerationComment(e.target.value)}
                        placeholder="Укажите причину отклонения (обязательно для отклонения)"
                        className="min-h-[80px]"
                      />
                    </div>
                  )}
                  
                  <div className="flex gap-2">
                    <Button onClick={() => window.open(`/offline-training/${training.slug}?preview=true`, '_blank')} variant="outline" size="sm">
                      <Icon name="Eye" size={16} className="mr-2" />
                      Просмотреть
                    </Button>
                    <Button onClick={() => approveTraining(training.id)} size="sm">
                      <Icon name="Check" size={16} className="mr-2" />
                      Одобрить
                    </Button>
                    {selectedTraining === training.id ? (
                      <>
                        <Button onClick={() => rejectTraining(training.id)} variant="destructive" size="sm">
                          <Icon name="X" size={16} className="mr-2" />
                          Подтвердить отклонение
                        </Button>
                        <Button onClick={() => { setSelectedTraining(null); setModerationComment(''); }} variant="outline" size="sm">
                          Отмена
                        </Button>
                      </>
                    ) : (
                      <Button onClick={() => setSelectedTraining(training.id)} variant="outline" size="sm">
                        <Icon name="X" size={16} className="mr-2" />
                        Отклонить
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {trainings.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          Нет очных обучений для отображения
        </div>
      )}
    </div>
  );
}