import { useState, useEffect } from 'react';
import { Navigation } from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';

interface VerificationStatus {
  education_verified: boolean;
  experience_verified: boolean;
  identity_verified: boolean;
  insurance_verified: boolean;
  education_status: string;
  experience_status: string;
  identity_status: string;
  insurance_status: string;
  education_comment?: string;
  experience_comment?: string;
  identity_comment?: string;
  insurance_comment?: string;
}

export default function Verification() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [status, setStatus] = useState<VerificationStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState<string | null>(null);
  const [folderUrls, setFolderUrls] = useState<Record<string, string>>({});

  useEffect(() => {
    loadVerificationStatus();
  }, []);

  const loadVerificationStatus = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://functions.poehali.dev/63af3811-f2f6-4a51-9544-cc8f6e6b73b3', {
        headers: { 'X-Authorization': `Bearer ${token}` }
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data) {
          setStatus(data);
        } else {
          // Если записи еще нет, показываем дефолтные значения
          setStatus({
            education_verified: false,
            experience_verified: false,
            identity_verified: false,
            insurance_verified: false,
            education_status: 'not_submitted',
            experience_status: 'not_submitted',
            identity_status: 'not_submitted',
            insurance_status: 'not_submitted',
          });
        }
      }
    } catch (error) {
      console.error('Ошибка загрузки статуса:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitFolder = async (type: string) => {
    const url = folderUrls[type];
    if (!url || !url.trim()) {
      toast({
        title: 'Ошибка',
        description: 'Введите ссылку на папку',
        variant: 'destructive',
      });
      return;
    }

    setSubmitting(type);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://functions.poehali.dev/63af3811-f2f6-4a51-9544-cc8f6e6b73b3', {
        method: 'POST',
        headers: {
          'X-Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          type: type,
          folder_url: url
        })
      });
      
      if (!response.ok) {
        throw new Error('Failed to submit');
      }
      
      toast({
        title: 'Ссылка отправлена',
        description: 'Документы отправлены на проверку',
      });
      
      setFolderUrls({ ...folderUrls, [type]: '' });
      loadVerificationStatus();
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось отправить ссылку',
        variant: 'destructive',
      });
    } finally {
      setSubmitting(null);
    }
  };

  const getStatusBadge = (statusValue: string, verified: boolean) => {
    if (verified) {
      return (
        <Badge className="bg-green-500">
          <Icon name="Check" size={12} className="mr-1" />
          Подтверждено
        </Badge>
      );
    }
    
    switch (statusValue) {
      case 'pending':
        return <Badge variant="secondary">На проверке</Badge>;
      case 'rejected':
        return <Badge variant="destructive">Отклонено</Badge>;
      default:
        return <Badge variant="outline">Не загружено</Badge>;
    }
  };

  const verificationTypes = [
    {
      id: 'education',
      title: 'Образование',
      description: 'Дипломы, сертификаты курсов массажа',
      icon: 'GraduationCap',
      verified: status?.education_verified || false,
      statusValue: status?.education_status || null,
      comment: status?.education_comment,
    },
    {
      id: 'experience',
      title: 'Опыт работы',
      description: 'Рекомендательные письма, портфолио',
      icon: 'Award',
      verified: status?.experience_verified || false,
      statusValue: status?.experience_status || null,
      comment: status?.experience_comment,
    },
    {
      id: 'identity',
      title: 'Личность',
      description: 'Паспорт или другой документ с фото',
      icon: 'BadgeCheck',
      verified: status?.identity_verified || false,
      statusValue: status?.identity_status || null,
      comment: status?.identity_comment,
    },
    {
      id: 'insurance',
      title: 'Сертифицирован Док диалог',
      description: 'Сертификат от Док диалог',
      icon: 'Shield',
      verified: status?.insurance_verified || false,
      statusValue: status?.insurance_status || null,
      comment: status?.insurance_comment,
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white to-blue-50 flex items-center justify-center">
        <Icon name="Loader2" className="animate-spin" size={48} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <Button variant="ghost" onClick={() => navigate('/dashboard')}>
              <Icon name="ArrowLeft" size={20} />
            </Button>
            <div>
              <h1 className="text-3xl font-bold">Верификация профиля</h1>
              <p className="text-muted-foreground">Подтвердите свою квалификацию и получите бейджи доверия</p>
            </div>
          </div>

          <Card className="mb-6 bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
            <CardHeader>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center flex-shrink-0">
                  <Icon name="Crown" size={24} className="text-white" />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-xl mb-2">Premium статус</CardTitle>
                  <CardDescription className="text-base">
                    Получите все 3 бейджа верификации и ваш профиль будет выделен в каталоге! 
                    Клиенты доверяют проверенным специалистам.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>

          <div className="grid gap-6">
            {verificationTypes.map((type) => (
              <Card key={type.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Icon name={type.icon as any} size={24} className="text-primary" />
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <CardTitle>{type.title}</CardTitle>
                          {getStatusBadge(type.statusValue, type.verified)}
                        </div>
                        <CardDescription>{type.description}</CardDescription>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {type.comment && type.statusValue === 'rejected' && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded text-sm text-red-800">
                      <p className="font-semibold mb-1">Комментарий модератора:</p>
                      <p>{type.comment}</p>
                    </div>
                  )}

                  {!type.verified && (
                    <div className="space-y-4">
                      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg space-y-2">
                        <div className="flex items-start gap-2">
                          <Icon name="Info" size={16} className="text-blue-600 mt-0.5 flex-shrink-0" />
                          <div className="text-sm text-blue-800">
                            <p className="font-semibold mb-2">Как подготовить документы:</p>
                            <ol className="list-decimal list-inside space-y-1 text-xs">
                              <li>Сфотографируйте или отсканируйте документы</li>
                              <li>Загрузите в облако (Google Диск, Яндекс.Диск, Dropbox)</li>
                              <li>Откройте доступ «Просмотр для всех, у кого есть ссылка»</li>
                              <li>Скопируйте ссылку на папку и вставьте ниже</li>
                            </ol>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`url-${type.id}`}>
                          Ссылка на папку с документами
                        </Label>
                        <div className="flex gap-2">
                          <Input
                            id={`url-${type.id}`}
                            type="url"
                            placeholder="https://drive.google.com/... или https://disk.yandex.ru/..."
                            value={folderUrls[type.id] || ''}
                            onChange={(e) => setFolderUrls({ ...folderUrls, [type.id]: e.target.value })}
                            disabled={submitting === type.id}
                          />
                          <Button
                            disabled={submitting === type.id || !folderUrls[type.id]}
                            onClick={() => handleSubmitFolder(type.id)}
                          >
                            {submitting === type.id ? (
                              <Icon name="Loader2" className="animate-spin" size={16} />
                            ) : (
                              <Icon name="Send" size={16} />
                            )}
                          </Button>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          ⚠️ Убедитесь, что доступ к папке открыт для просмотра по ссылке
                        </p>
                      </div>

                      {type.statusValue === 'pending' && (
                        <div className="p-3 bg-amber-50 border border-amber-200 rounded text-sm text-amber-800">
                          <Icon name="Clock" size={14} className="inline mr-1" />
                          Документы на проверке. Обычно проверка занимает 1-2 рабочих дня.
                        </div>
                      )}
                    </div>
                  )}

                  {type.verified && (
                    <div className="p-3 bg-green-50 border border-green-200 rounded text-sm text-green-800 flex items-center gap-2">
                      <Icon name="Check" size={16} />
                      <span className="font-medium">Верификация пройдена! Бейдж отображается в вашем профиле.</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Как правильно открыть доступ к папке?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="font-semibold flex items-center gap-2">
                  <Icon name="HardDrive" size={18} className="text-blue-500" />
                  Google Диск:
                </div>
                <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground ml-6">
                  <li>Создайте папку и загрузите документы</li>
                  <li>Нажмите правой кнопкой → «Настроить доступ»</li>
                  <li>Выберите «Доступ для всех, у кого есть ссылка»</li>
                  <li>Роль: «Читатель» → Скопировать ссылку</li>
                </ol>

                <div className="font-semibold flex items-center gap-2 mt-4">
                  <Icon name="Cloud" size={18} className="text-red-500" />
                  Яндекс.Диск:
                </div>
                <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground ml-6">
                  <li>Создайте папку и загрузите документы</li>
                  <li>Нажмите «Поделиться» → «Получить ссылку»</li>
                  <li>Включите доступ по ссылке</li>
                  <li>Скопировать ссылку</li>
                </ol>

                <div className="font-semibold flex items-center gap-2 mt-4">
                  <Icon name="Box" size={18} className="text-blue-600" />
                  Dropbox:
                </div>
                <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground ml-6">
                  <li>Создайте папку и загрузите документы</li>
                  <li>Нажмите «Поделиться» → «Создать ссылку»</li>
                  <li>Настройки: «Все, у кого есть ссылка»</li>
                  <li>Скопировать ссылку</li>
                </ol>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Зачем нужна верификация?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-3">
                <Icon name="CheckCircle2" size={20} className="text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Больше доверия от клиентов</p>
                  <p className="text-sm text-muted-foreground">Подтвержденные специалисты получают на 40% больше обращений</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Icon name="TrendingUp" size={20} className="text-blue-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Выше позиция в каталоге</p>
                  <p className="text-sm text-muted-foreground">Проверенные массажисты показываются в топе результатов поиска</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Icon name="Crown" size={20} className="text-amber-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Premium-статус бесплатно</p>
                  <p className="text-sm text-muted-foreground">При 4 подтвержденных бейджах ваш профиль выделяется золотой рамкой</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}