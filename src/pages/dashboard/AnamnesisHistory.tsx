import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const USER_TOOLS_URL = 'https://functions.poehali.dev/41dbcf47-a8d5-45ff-bb56-f9754581a0d7';

interface AnamnesisRecord {
  id: number;
  clientFullName: string;
  clientAge: number;
  mainComplaint: string;
  createdAt: string;
  updatedAt: string;
}

interface FullAnamnesis {
  id: number;
  formData: {
    fullName: string;
    age: string;
    gender: string;
    mainComplaint: string;
    complaintDuration: string;
    painLocation: string;
    painIntensity: string;
    painCharacter: string;
    chronicDiseases: string;
    medications: string;
    injuries: string;
    surgeries: string;
    lifestyle: string;
    physicalActivity: string;
    sleep: string;
    stress: string;
    goals: string;
    contraindications: string;
    additionalInfo: string;
  };
  aiAnalysis: string;
  createdAt: string;
  updatedAt: string;
}

export default function AnamnesisHistory() {
  const [records, setRecords] = useState<AnamnesisRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAnamnesis, setSelectedAnamnesis] = useState<FullAnamnesis | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const getUserId = () => {
    const token = localStorage.getItem('token');
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.user_id || payload.userId || payload.sub;
    } catch {
      return null;
    }
  };

  useEffect(() => {
    loadRecords();
  }, []);

  const loadRecords = async () => {
    try {
      const userId = getUserId();
      if (!userId) {
        toast({ title: 'Ошибка', description: 'Необходима авторизация', variant: 'destructive' });
        navigate('/login');
        return;
      }

      const response = await fetch(USER_TOOLS_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-User-Id': userId
        },
        body: JSON.stringify({
          action: 'get_anamnesis_list'
        })
      });

      if (!response.ok) throw new Error('Ошибка загрузки');

      const data = await response.json();
      setRecords(data.records || []);
    } catch (error: any) {
      toast({
        title: 'Ошибка',
        description: error.message || 'Не удалось загрузить анамнезы',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const loadFullAnamnesis = async (id: number) => {
    try {
      const userId = getUserId();
      if (!userId) return;

      const response = await fetch(USER_TOOLS_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-User-Id': userId
        },
        body: JSON.stringify({
          action: 'get_anamnesis',
          id: id
        })
      });

      if (!response.ok) throw new Error('Ошибка загрузки');

      const data = await response.json();
      setSelectedAnamnesis(data);
      setShowDetails(true);
    } catch (error: any) {
      toast({
        title: 'Ошибка',
        description: error.message || 'Не удалось загрузить анамнез',
        variant: 'destructive'
      });
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white to-blue-50">
        <Navigation />
        <div className="flex items-center justify-center min-h-screen">
          <Icon name="Loader2" className="animate-spin" size={32} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <Button variant="ghost" onClick={() => navigate('/dashboard/tools')}>
              <Icon name="ArrowLeft" size={20} />
            </Button>
            <div>
              <h1 className="text-3xl font-bold">История анамнезов</h1>
              <p className="text-muted-foreground">
                Все сохранённые анамнезы клиентов
              </p>
            </div>
          </div>

          {records.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <Icon name="FileText" size={48} className="mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-semibold mb-2">Пока нет анамнезов</h3>
                <p className="text-muted-foreground mb-4">
                  Создайте первый анамнез в AI-инструментах
                </p>
                <Button onClick={() => navigate('/dashboard/tools')}>
                  <Icon name="Plus" size={16} className="mr-2" />
                  Создать анамнез
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {records.map((record) => (
                <Card
                  key={record.id}
                  className="cursor-pointer hover:shadow-lg transition-all"
                  onClick={() => loadFullAnamnesis(record.id)}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                          <Icon name="User" size={24} className="text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">
                            {record.clientFullName}
                          </CardTitle>
                          <p className="text-sm text-muted-foreground">
                            {record.clientAge} лет
                          </p>
                        </div>
                      </div>
                      <Icon name="ChevronRight" size={20} className="text-muted-foreground" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-2 line-clamp-2">
                      {record.mainComplaint}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Создано: {formatDate(record.createdAt)}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Icon name="FileText" size={24} className="text-primary" />
              Анамнез клиента
            </DialogTitle>
            <DialogDescription>
              {selectedAnamnesis && formatDate(selectedAnamnesis.createdAt)}
            </DialogDescription>
          </DialogHeader>

          {selectedAnamnesis && (
            <div className="space-y-6 py-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Общая информация</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div>
                    <span className="font-semibold">ФИО:</span> {selectedAnamnesis.formData.fullName}
                  </div>
                  <div>
                    <span className="font-semibold">Возраст:</span> {selectedAnamnesis.formData.age} лет
                  </div>
                  <div>
                    <span className="font-semibold">Пол:</span>{' '}
                    {selectedAnamnesis.formData.gender === 'male' ? 'Мужской' : 
                     selectedAnamnesis.formData.gender === 'female' ? 'Женский' : 'Не указан'}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Жалобы и симптомы</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div>
                    <span className="font-semibold">Основная жалоба:</span>
                    <p className="mt-1">{selectedAnamnesis.formData.mainComplaint}</p>
                  </div>
                  {selectedAnamnesis.formData.complaintDuration && (
                    <div>
                      <span className="font-semibold">Длительность:</span> {selectedAnamnesis.formData.complaintDuration}
                    </div>
                  )}
                  {selectedAnamnesis.formData.painLocation && (
                    <div>
                      <span className="font-semibold">Локализация:</span> {selectedAnamnesis.formData.painLocation}
                    </div>
                  )}
                  {selectedAnamnesis.formData.painIntensity && (
                    <div>
                      <span className="font-semibold">Интенсивность боли:</span> {selectedAnamnesis.formData.painIntensity}/10
                    </div>
                  )}
                  {selectedAnamnesis.formData.painCharacter && (
                    <div>
                      <span className="font-semibold">Характер боли:</span> {selectedAnamnesis.formData.painCharacter}
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Медицинская история</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {selectedAnamnesis.formData.chronicDiseases && (
                    <div>
                      <span className="font-semibold">Хронические заболевания:</span>
                      <p className="mt-1">{selectedAnamnesis.formData.chronicDiseases}</p>
                    </div>
                  )}
                  {selectedAnamnesis.formData.medications && (
                    <div>
                      <span className="font-semibold">Препараты:</span>
                      <p className="mt-1">{selectedAnamnesis.formData.medications}</p>
                    </div>
                  )}
                  {selectedAnamnesis.formData.injuries && (
                    <div>
                      <span className="font-semibold">Травмы:</span>
                      <p className="mt-1">{selectedAnamnesis.formData.injuries}</p>
                    </div>
                  )}
                  {selectedAnamnesis.formData.surgeries && (
                    <div>
                      <span className="font-semibold">Операции:</span>
                      <p className="mt-1">{selectedAnamnesis.formData.surgeries}</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Образ жизни</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {selectedAnamnesis.formData.lifestyle && (
                    <div>
                      <span className="font-semibold">Профессия:</span> {selectedAnamnesis.formData.lifestyle}
                    </div>
                  )}
                  {selectedAnamnesis.formData.physicalActivity && (
                    <div>
                      <span className="font-semibold">Физическая активность:</span>
                      <p className="mt-1">{selectedAnamnesis.formData.physicalActivity}</p>
                    </div>
                  )}
                  {selectedAnamnesis.formData.sleep && (
                    <div>
                      <span className="font-semibold">Качество сна:</span> {selectedAnamnesis.formData.sleep}
                    </div>
                  )}
                  {selectedAnamnesis.formData.stress && (
                    <div>
                      <span className="font-semibold">Уровень стресса:</span> {selectedAnamnesis.formData.stress}
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Цели и ограничения</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {selectedAnamnesis.formData.goals && (
                    <div>
                      <span className="font-semibold">Цели:</span>
                      <p className="mt-1">{selectedAnamnesis.formData.goals}</p>
                    </div>
                  )}
                  {selectedAnamnesis.formData.contraindications && (
                    <div>
                      <span className="font-semibold">Противопоказания:</span>
                      <p className="mt-1">{selectedAnamnesis.formData.contraindications}</p>
                    </div>
                  )}
                  {selectedAnamnesis.formData.additionalInfo && (
                    <div>
                      <span className="font-semibold">Дополнительно:</span>
                      <p className="mt-1">{selectedAnamnesis.formData.additionalInfo}</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {selectedAnamnesis.aiAnalysis && (
                <Card className="border-primary/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base">
                      <Icon name="Brain" className="text-primary" size={20} />
                      AI-анализ
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="prose prose-sm max-w-none whitespace-pre-wrap">
                      {selectedAnamnesis.aiAnalysis}
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setShowDetails(false)} className="flex-1">
                  Закрыть
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
