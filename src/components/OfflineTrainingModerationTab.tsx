import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

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
  original_price?: number;
  discount_price?: number;
  author_name?: string;
  author_photo?: string;
  event_content?: string;
}

interface OfflineTrainingModerationTabProps {
  onModerationComplete?: () => void;
}

export default function OfflineTrainingModerationTab({ onModerationComplete }: OfflineTrainingModerationTabProps) {
  const { toast } = useToast();
  const [trainings, setTrainings] = useState<OfflineTraining[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadTrainings();
  }, []);

  const loadTrainings = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://functions.poehali.dev/95b5e0a7-51f7-4fb1-b196-a49f5feff58f?action=offline_trainings&status=all', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
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
      const response = await fetch(`https://functions.poehali.dev/95b5e0a7-51f7-4fb1-b196-a49f5feff58f?type=offline_trainings&id=${trainingId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: 'approved' })
      });
      
      if (response.ok) {
        toast({
          title: "Успешно",
          description: "Очное обучение одобрено"
        });
        loadTrainings();
        onModerationComplete?.();
      }
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось одобрить обучение",
        variant: "destructive"
      });
    }
  };

  const deleteTraining = async (trainingId: number) => {
    if (!confirm('Вы уверены, что хотите удалить это обучение?')) return;
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`https://functions.poehali.dev/95b5e0a7-51f7-4fb1-b196-a49f5feff58f?type=offline_trainings&id=${trainingId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
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

  const pendingTrainings = trainings.filter(t => t.status === 'pending');
  const approvedTrainings = trainings.filter(t => t.status === 'approved');

  if (loading) {
    return <div className="text-center py-8">Загрузка...</div>;
  }

  return (
    <div className="space-y-8">
      {pendingTrainings.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-4">На модерации ({pendingTrainings.length})</h2>
          <div className="space-y-4">
            {pendingTrainings.map((training) => (
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
                      <p className="text-sm"><strong>Дата:</strong> {new Date(training.event_date).toLocaleString('ru-RU')}</p>
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
                  <div className="flex gap-2">
                    <Button onClick={() => approveTraining(training.id)} size="sm">
                      <Icon name="Check" size={16} className="mr-2" />
                      Одобрить
                    </Button>
                    <Button onClick={() => deleteTraining(training.id)} variant="destructive" size="sm">
                      <Icon name="X" size={16} className="mr-2" />
                      Удалить
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {approvedTrainings.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Одобренные ({approvedTrainings.length})</h2>
          <div className="space-y-4">
            {approvedTrainings.map((training) => (
              <Card key={training.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{training.title}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">{training.school_name}</p>
                    </div>
                    <Badge variant="default">Одобрено</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    {training.image_url && (
                      <img src={training.image_url} alt={training.title} className="w-full h-48 object-cover rounded-lg" />
                    )}
                    <div className="space-y-2">
                      <p className="text-sm"><strong>Описание:</strong> {training.description}</p>
                      <p className="text-sm"><strong>Дата:</strong> {new Date(training.event_date).toLocaleString('ru-RU')}</p>
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
                  <Button onClick={() => deleteTraining(training.id)} variant="outline" size="sm">
                    <Icon name="Trash2" size={16} className="mr-2" />
                    Удалить
                  </Button>
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