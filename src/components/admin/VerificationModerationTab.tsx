import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';

interface VerificationRequest {
  id: number;
  user_id: number;
  masseur_name: string;
  masseur_email: string;
  type: 'education' | 'experience' | 'identity' | 'insurance';
  folder_url: string;
  status: 'pending' | 'approved' | 'rejected';
  submitted_at: string;
  moderator_comment?: string;
}

interface VerificationModerationTabProps {
  onModerationComplete?: () => void;
}

export default function VerificationModerationTab({ onModerationComplete }: VerificationModerationTabProps) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [requests, setRequests] = useState<VerificationRequest[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<VerificationRequest | null>(null);
  const [actionType, setActionType] = useState<'approve' | 'reject' | null>(null);
  const [comment, setComment] = useState('');
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    loadVerificationRequests();
  }, []);

  const loadVerificationRequests = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://functions.poehali.dev/f94ccac9-1077-4744-892a-ab95e9e41ecb', {
        headers: { 'X-Authorization': `Bearer ${token}` }
      });
      
      if (response.ok) {
        const data = await response.json();
        setRequests(data);
      } else {
        throw new Error('Failed to load');
      }
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось загрузить запросы на верификацию',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAction = (request: VerificationRequest, action: 'approve' | 'reject') => {
    setSelectedRequest(request);
    setActionType(action);
    setComment('');
  };

  const submitAction = async () => {
    if (!selectedRequest || !actionType) return;

    if (actionType === 'reject' && !comment.trim()) {
      toast({
        title: 'Укажите причину',
        description: 'При отклонении необходимо указать причину',
        variant: 'destructive',
      });
      return;
    }

    setProcessing(true);
    try {
      const token = localStorage.getItem('token');
      const [verification_id, type] = selectedRequest.id.toString().split('_');
      
      const response = await fetch('https://functions.poehali.dev/f94ccac9-1077-4744-892a-ab95e9e41ecb', {
        method: 'POST',
        headers: {
          'X-Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          verification_id: parseInt(verification_id),
          type: type || selectedRequest.type,
          action: actionType,
          comment: comment
        })
      });

      if (!response.ok) {
        throw new Error('Failed to process');
      }

      toast({
        title: actionType === 'approve' ? 'Верификация одобрена' : 'Верификация отклонена',
        description: `${getTypeLabel(selectedRequest.type)} для ${selectedRequest.masseur_name}`,
      });

      setSelectedRequest(null);
      setActionType(null);
      setComment('');
      loadVerificationRequests();
      if (onModerationComplete) {
        onModerationComplete();
      }
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось обработать запрос',
        variant: 'destructive',
      });
    } finally {
      setProcessing(false);
    }
  };

  const getTypeLabel = (type: string) => {
    const labels = {
      education: 'Образование',
      experience: 'Опыт работы',
      identity: 'Личность',
      insurance: 'Сертифицирован Док диалог',
    };
    return labels[type as keyof typeof labels] || type;
  };

  const getTypeIcon = (type: string) => {
    const icons = {
      education: 'GraduationCap',
      experience: 'Award',
      identity: 'BadgeCheck',
      insurance: 'Shield',
    };
    return icons[type as keyof typeof icons] || 'FileText';
  };

  const getTypeColor = (type: string) => {
    const colors = {
      education: 'text-green-600 bg-green-50 border-green-200',
      experience: 'text-blue-600 bg-blue-50 border-blue-200',
      identity: 'text-purple-600 bg-purple-50 border-purple-200',
      insurance: 'text-amber-600 bg-amber-50 border-amber-200',
    };
    return colors[type as keyof typeof colors] || 'text-gray-600 bg-gray-50 border-gray-200';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('ru-RU', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Icon name="Loader2" className="animate-spin" size={48} />
      </div>
    );
  }

  const pendingRequests = requests.filter(r => r.status === 'pending');

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Запросы на верификацию</CardTitle>
          <CardDescription>
            {pendingRequests.length === 0
              ? 'Нет ожидающих запросов'
              : `${pendingRequests.length} ${pendingRequests.length === 1 ? 'запрос' : 'запросов'} на проверке`}
          </CardDescription>
        </CardHeader>
      </Card>

      {pendingRequests.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Icon name="CheckCircle2" size={48} className="mx-auto mb-4 text-green-500" />
            <p className="text-lg font-medium text-muted-foreground">Все запросы обработаны</p>
            <p className="text-sm text-muted-foreground mt-2">Новые запросы появятся здесь</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {pendingRequests.map((request) => (
            <Card key={request.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 border-2 ${getTypeColor(request.type)}`}>
                      <Icon name={getTypeIcon(request.type) as any} size={24} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <CardTitle className="text-lg">{request.masseur_name}</CardTitle>
                        <Badge variant="outline" className={getTypeColor(request.type)}>
                          {getTypeLabel(request.type)}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">{request.masseur_email}</p>
                      <p className="text-xs text-muted-foreground">
                        Отправлено: {formatDate(request.submitted_at)}
                      </p>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-start gap-2">
                    <Icon name="Link" size={16} className="text-blue-600 mt-0.5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-blue-900 mb-1">Ссылка на документы:</p>
                      <a
                        href={request.folder_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:text-blue-800 underline break-all"
                      >
                        {request.folder_url}
                      </a>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => window.open(request.folder_url, '_blank')}
                    >
                      <Icon name="ExternalLink" size={16} />
                    </Button>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    className="flex-1"
                    onClick={() => handleAction(request, 'approve')}
                    disabled={processing}
                  >
                    <Icon name="Check" size={16} className="mr-2" />
                    Одобрить
                  </Button>
                  <Button
                    variant="destructive"
                    className="flex-1"
                    onClick={() => handleAction(request, 'reject')}
                    disabled={processing}
                  >
                    <Icon name="X" size={16} className="mr-2" />
                    Отклонить
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Confirmation Dialog */}
      <Dialog open={!!selectedRequest} onOpenChange={() => {
        setSelectedRequest(null);
        setActionType(null);
        setComment('');
      }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {actionType === 'approve' ? 'Одобрить верификацию?' : 'Отклонить верификацию?'}
            </DialogTitle>
            <DialogDescription>
              {selectedRequest && (
                <>
                  {getTypeLabel(selectedRequest.type)} для массажиста {selectedRequest.masseur_name}
                </>
              )}
            </DialogDescription>
          </DialogHeader>

          {actionType === 'reject' && (
            <div className="space-y-2 py-4">
              <Label htmlFor="comment">Причина отклонения *</Label>
              <Textarea
                id="comment"
                placeholder="Укажите, что нужно исправить в документах..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={4}
              />
              <p className="text-xs text-muted-foreground">
                Массажист получит это сообщение и сможет отправить документы повторно
              </p>
            </div>
          )}

          {actionType === 'approve' && (
            <div className="py-4 space-y-3">
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-start gap-2">
                  <Icon name="CheckCircle2" size={16} className="text-green-600 mt-0.5" />
                  <div className="text-sm text-green-800">
                    <p className="font-semibold mb-1">После одобрения:</p>
                    <ul className="list-disc list-inside space-y-1 text-xs">
                      <li>Бейдж появится в профиле массажиста</li>
                      <li>Карточка будет выделена в каталоге</li>
                      {selectedRequest?.type === 'identity' && (
                        <li>Появится синяя галочка подтверждения личности</li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setSelectedRequest(null);
                setActionType(null);
                setComment('');
              }}
              disabled={processing}
            >
              Отмена
            </Button>
            <Button
              onClick={submitAction}
              disabled={processing || (actionType === 'reject' && !comment.trim())}
              variant={actionType === 'approve' ? 'default' : 'destructive'}
            >
              {processing ? (
                <Icon name="Loader2" className="animate-spin mr-2" size={16} />
              ) : (
                <Icon name={actionType === 'approve' ? 'Check' : 'X'} size={16} className="mr-2" />
              )}
              {actionType === 'approve' ? 'Одобрить' : 'Отклонить'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}