import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

const PROMO_API_URL = 'https://functions.poehali.dev/0e44bf6d-cb4d-404e-832f-02070e6e8b13';

interface DiscountRequest {
  id: number;
  school_email: string;
  course_title: string;
  entity_type: string;
  status: 'pending' | 'approved' | 'rejected';
  promo_code?: string;
  purchase_url?: string;
  discount_percentage?: number;
  created_at: string;
  responded_at?: string;
}

export default function MasseurDiscountRequests() {
  const navigate = useNavigate();
  const [requests, setRequests] = useState<DiscountRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRequests();
  }, []);

  const getUserToken = () => localStorage.getItem('token');

  const loadRequests = async () => {
    try {
      const token = getUserToken();
      if (!token) {
        navigate('/login');
        return;
      }

      const response = await fetch(`${PROMO_API_URL}?action=my_requests`, {
        headers: { 'X-Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        const data = await response.json();
        setRequests(data || []);
      } else {
        toast.error('Не удалось загрузить запросы');
      }
    } catch (error) {
      console.error('Failed to load discount requests:', error);
      toast.error('Ошибка загрузки запросов');
    } finally {
      setLoading(false);
    }
  };

  const getEntityTypeLabel = (type: string) => {
    switch (type) {
      case 'course': return 'Курс';
      case 'mastermind': return 'Мастермайнд';
      case 'offline_training': return 'Очное обучение';
      default: return type;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Ожидает ответа</Badge>;
      case 'approved':
        return <Badge variant="secondary" className="bg-green-100 text-green-800">Одобрен</Badge>;
      case 'rejected':
        return <Badge variant="secondary" className="bg-red-100 text-red-800">Отклонён</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const pendingRequests = requests.filter(r => r.status === 'pending');
  const approvedRequests = requests.filter(r => r.status === 'approved');
  const rejectedRequests = requests.filter(r => r.status === 'rejected');

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center py-12">
            <Icon name="Loader2" className="animate-spin" size={48} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <Button variant="ghost" onClick={() => navigate('/dashboard')}>
            <Icon name="ArrowLeft" size={16} className="mr-2" />
            Назад в кабинет
          </Button>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Мои запросы на скидки</h1>
          <p className="text-gray-600">
            Отслеживайте статус ваших запросов на скидки от школ
          </p>
        </div>

        <Card className="mb-8 bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="Info" size={20} className="text-blue-600" />
              Как это работает
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-gray-700 space-y-2">
            <p>
              📝 Найдите курс в каталоге и нажмите "Запросить скидку"
            </p>
            <p>
              ⏳ Школа получит ваш запрос и рассмотрит его
            </p>
            <p>
              ✅ При одобрении вы получите промокод и ссылку на курс со скидкой
            </p>
            <p>
              🎓 Используйте промокод при покупке курса
            </p>
          </CardContent>
        </Card>

        <Tabs defaultValue="all" className="space-y-6">
          <TabsList>
            <TabsTrigger value="all">
              Все запросы ({requests.length})
            </TabsTrigger>
            <TabsTrigger value="pending">
              Ожидают ({pendingRequests.length})
            </TabsTrigger>
            <TabsTrigger value="approved">
              Одобрены ({approvedRequests.length})
            </TabsTrigger>
            <TabsTrigger value="rejected">
              Отклонены ({rejectedRequests.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            {requests.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center text-gray-500">
                  <Icon name="Percent" size={48} className="mx-auto mb-4 opacity-50" />
                  <p className="text-lg mb-2">Пока нет запросов</p>
                  <p className="text-sm mb-4">Найдите интересный курс и запросите скидку</p>
                  <Button onClick={() => navigate('/courses-catalog')}>
                    <Icon name="Search" size={16} className="mr-2" />
                    Перейти в каталог курсов
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {requests.map((request) => (
                  <Card key={request.id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <CardTitle className="text-xl">{request.course_title}</CardTitle>
                            {getStatusBadge(request.status)}
                          </div>
                          <CardDescription className="flex items-center gap-4 text-sm">
                            <span className="flex items-center gap-1">
                              <Icon name="Tag" size={14} />
                              {getEntityTypeLabel(request.entity_type)}
                            </span>
                            <span className="flex items-center gap-1">
                              <Icon name="Building2" size={14} />
                              {request.school_email}
                            </span>
                          </CardDescription>
                        </div>
                        {request.status === 'approved' && request.discount_percentage && (
                          <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-lg px-3 py-1">
                            -{request.discount_percentage}%
                          </Badge>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <span>
                            <Icon name="Calendar" size={14} className="inline mr-1" />
                            Запрошено: {new Date(request.created_at).toLocaleDateString('ru-RU', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric'
                            })}
                          </span>
                          {request.responded_at && (
                            <span>
                              <Icon name="CheckCircle" size={14} className="inline mr-1" />
                              Отвечено: {new Date(request.responded_at).toLocaleDateString('ru-RU', {
                                day: 'numeric',
                                month: 'long'
                              })}
                            </span>
                          )}
                        </div>

                        {request.status === 'approved' && request.promo_code && (
                          <div className="bg-green-50 border border-green-200 rounded-lg p-4 space-y-3">
                            <div className="flex items-center gap-2">
                              <Icon name="Gift" size={16} className="text-green-600" />
                              <span className="font-semibold text-green-900">Промокод одобрен!</span>
                            </div>
                            <div className="bg-white rounded p-2 border border-green-300">
                              <p className="text-xs text-gray-500 mb-1">Ваш промокод:</p>
                              <p className="text-lg font-mono font-bold text-green-900">{request.promo_code}</p>
                            </div>
                            {request.purchase_url && (
                              <Button 
                                className="w-full"
                                onClick={() => window.open(request.purchase_url, '_blank')}
                              >
                                <Icon name="ExternalLink" size={16} className="mr-2" />
                                Перейти к курсу со скидкой
                              </Button>
                            )}
                          </div>
                        )}

                        {request.status === 'pending' && (
                          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 flex items-center gap-2">
                            <Icon name="Clock" size={16} className="text-yellow-600" />
                            <span className="text-sm text-yellow-900">Школа рассматривает ваш запрос</span>
                          </div>
                        )}

                        {request.status === 'rejected' && (
                          <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center gap-2">
                            <Icon name="XCircle" size={16} className="text-red-600" />
                            <span className="text-sm text-red-900">К сожалению, школа отклонила запрос</span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="pending">
            {pendingRequests.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center text-gray-500">
                  <Icon name="Clock" size={48} className="mx-auto mb-4 opacity-50" />
                  <p className="text-lg">Нет ожидающих запросов</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {pendingRequests.map((request) => (
                  <Card key={request.id}>
                    <CardHeader>
                      <CardTitle>{request.course_title}</CardTitle>
                      <CardDescription>{request.school_email}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 flex items-center gap-2">
                        <Icon name="Clock" size={16} className="text-yellow-600" />
                        <span className="text-sm text-yellow-900">Ожидает ответа школы</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="approved">
            {approvedRequests.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center text-gray-500">
                  <Icon name="CheckCircle" size={48} className="mx-auto mb-4 opacity-50" />
                  <p className="text-lg">Пока нет одобренных запросов</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {approvedRequests.map((request) => (
                  <Card key={request.id} className="border-green-200">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle>{request.course_title}</CardTitle>
                          <CardDescription>{request.school_email}</CardDescription>
                        </div>
                        {request.discount_percentage && (
                          <Badge className="bg-green-600 text-white">-{request.discount_percentage}%</Badge>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      {request.promo_code && (
                        <div className="bg-green-50 rounded-lg p-4 space-y-3">
                          <div className="bg-white rounded p-2 border">
                            <p className="text-xs text-gray-500">Промокод:</p>
                            <p className="text-lg font-mono font-bold">{request.promo_code}</p>
                          </div>
                          {request.purchase_url && (
                            <Button 
                              className="w-full"
                              onClick={() => window.open(request.purchase_url, '_blank')}
                            >
                              Перейти к курсу
                            </Button>
                          )}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="rejected">
            {rejectedRequests.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center text-gray-500">
                  <Icon name="XCircle" size={48} className="mx-auto mb-4 opacity-50" />
                  <p className="text-lg">Нет отклонённых запросов</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {rejectedRequests.map((request) => (
                  <Card key={request.id} className="border-red-200">
                    <CardHeader>
                      <CardTitle>{request.course_title}</CardTitle>
                      <CardDescription>{request.school_email}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                        <p className="text-sm text-red-900">Запрос отклонён школой</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
