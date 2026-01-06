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
  const [uploading, setUploading] = useState<string | null>(null);

  useEffect(() => {
    loadVerificationStatus();
  }, []);

  const loadVerificationStatus = async () => {
    // TODO: загрузка статуса верификации из API
    setLoading(false);
    setStatus({
      education_verified: false,
      experience_verified: false,
      identity_verified: false,
      insurance_verified: false,
      education_status: 'pending',
      experience_status: 'pending',
      identity_status: 'pending',
      insurance_status: 'pending',
    });
  };

  const handleFileUpload = async (type: string, files: FileList | null) => {
    if (!files || files.length === 0) return;

    setUploading(type);
    try {
      // TODO: загрузка файлов в S3 через backend
      const formData = new FormData();
      Array.from(files).forEach((file) => {
        formData.append('files', file);
      });
      formData.append('type', type);

      // Временная заглушка
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: 'Документы загружены',
        description: 'Ваши документы отправлены на проверку',
      });
      
      loadVerificationStatus();
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось загрузить документы',
        variant: 'destructive',
      });
    } finally {
      setUploading(null);
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
      statusValue: status?.education_status || 'pending',
      comment: status?.education_comment,
    },
    {
      id: 'experience',
      title: 'Опыт работы',
      description: 'Рекомендательные письма, портфолио',
      icon: 'Award',
      verified: status?.experience_verified || false,
      statusValue: status?.experience_status || 'pending',
      comment: status?.experience_comment,
    },
    {
      id: 'identity',
      title: 'Личность',
      description: 'Паспорт или другой документ с фото',
      icon: 'BadgeCheck',
      verified: status?.identity_verified || false,
      statusValue: status?.identity_status || 'pending',
      comment: status?.identity_comment,
    },
    {
      id: 'insurance',
      title: 'Страхование',
      description: 'Полис страхования ответственности',
      icon: 'Shield',
      verified: status?.insurance_verified || false,
      statusValue: status?.insurance_status || 'pending',
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
                    Получите все 4 бейджа верификации и ваш профиль будет выделен золотой рамкой в каталоге! 
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
                    <div className="space-y-2">
                      <Label htmlFor={`file-${type.id}`}>
                        Загрузите документы (JPEG, PNG, PDF)
                      </Label>
                      <div className="flex gap-2">
                        <Input
                          id={`file-${type.id}`}
                          type="file"
                          accept="image/*,.pdf"
                          multiple={type.id === 'education' || type.id === 'experience'}
                          onChange={(e) => handleFileUpload(type.id, e.target.files)}
                          disabled={uploading === type.id}
                        />
                        <Button
                          disabled={uploading === type.id}
                          onClick={() => document.getElementById(`file-${type.id}`)?.click()}
                        >
                          {uploading === type.id ? (
                            <Icon name="Loader2" className="animate-spin" size={16} />
                          ) : (
                            <Icon name="Upload" size={16} />
                          )}
                        </Button>
                      </div>
                      {type.statusValue === 'pending' && (
                        <p className="text-xs text-muted-foreground">
                          Документы на проверке. Обычно проверка занимает 1-2 рабочих дня.
                        </p>
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
