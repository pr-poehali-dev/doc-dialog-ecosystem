import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { getUserId } from '@/utils/auth';
import { toast } from 'sonner';

interface PromoRequest {
  id: number;
  course_title: string;
  promo_text: string;
  discount_percent: number;
  created_at: string;
  status: string;
  sent_count: number;
}

export default function SchoolPromoRequests() {
  const navigate = useNavigate();
  const [promoRequests, setPromoRequests] = useState<PromoRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [showForm, setShowForm] = useState(false);
  
  const [formData, setFormData] = useState({
    course_title: '',
    promo_text: '',
    discount_percent: 10
  });

  useEffect(() => {
    loadPromoRequests();
  }, []);

  const loadPromoRequests = async () => {
    try {
      const userId = getUserId();
      if (!userId) {
        navigate('/login');
        return;
      }

      const response = await fetch('https://functions.poehali.dev/f81f82f7-d9c7-4858-87bc-6701c67f2187?action=my_promo_requests', {
        headers: { 'X-User-Id': userId }
      });

      if (response.ok) {
        const data = await response.json();
        setPromoRequests(data.requests || []);
      }
    } catch (error) {
      console.error('Failed to load promo requests:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.course_title.trim() || !formData.promo_text.trim()) {
      toast.error('Заполните все поля');
      return;
    }

    if (formData.discount_percent < 1 || formData.discount_percent > 100) {
      toast.error('Скидка должна быть от 1 до 100%');
      return;
    }

    setSending(true);
    try {
      const userId = getUserId();
      if (!userId) return;

      const response = await fetch('https://functions.poehali.dev/f81f82f7-d9c7-4858-87bc-6701c67f2187?action=send_promo_request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-User-Id': userId
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const result = await response.json();
        toast.success(`Промо-запрос отправлен ${result.sent_count} массажистам!`);
        setFormData({ course_title: '', promo_text: '', discount_percent: 10 });
        setShowForm(false);
        loadPromoRequests();
      } else {
        const error = await response.json();
        toast.error(error.error || 'Не удалось отправить промо-запрос');
      }
    } catch (error) {
      console.error('Failed to send promo request:', error);
      toast.error('Произошла ошибка при отправке');
    } finally {
      setSending(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center py-12">
            <Icon name="Loader2" className="animate-spin" size={48} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Button variant="ghost" onClick={() => navigate('/school/dashboard')}>
            <Icon name="ArrowLeft" size={16} className="mr-2" />
            Назад в кабинет
          </Button>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Промо-запросы массажистам</h1>
          <p className="text-gray-600">
            Отправьте предложение о своих курсах со скидкой всем массажистам платформы
          </p>
        </div>

        <Card className="mb-8 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="Info" size={20} className="text-blue-600" />
              Как это работает
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-gray-700 space-y-2">
            <p>
              📢 Ваше промо-предложение получат все массажисты, зарегистрированные на платформе
            </p>
            <p>
              💬 Массажисты увидят уведомление в своём личном кабинете
            </p>
            <p>
              🎁 Укажите интересную скидку, чтобы привлечь внимание к вашим курсам
            </p>
            <p>
              ⚡ Эта функция доступна на платных тарифах подписки
            </p>
          </CardContent>
        </Card>

        {!showForm ? (
          <div className="mb-8">
            <Button 
              size="lg" 
              className="w-full md:w-auto"
              onClick={() => setShowForm(true)}
            >
              <Icon name="Plus" size={16} className="mr-2" />
              Создать промо-запрос
            </Button>
          </div>
        ) : (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Новый промо-запрос</CardTitle>
              <CardDescription>
                Заполните информацию о вашем предложении
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="course_title">Название курса</Label>
                  <Input
                    id="course_title"
                    value={formData.course_title}
                    onChange={(e) => setFormData({ ...formData, course_title: e.target.value })}
                    placeholder="Например: Базовый курс классического массажа"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="discount_percent">Скидка (%)</Label>
                  <Input
                    id="discount_percent"
                    type="number"
                    min="1"
                    max="100"
                    value={formData.discount_percent}
                    onChange={(e) => setFormData({ ...formData, discount_percent: parseInt(e.target.value) || 0 })}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="promo_text">Текст предложения</Label>
                  <Textarea
                    id="promo_text"
                    value={formData.promo_text}
                    onChange={(e) => setFormData({ ...formData, promo_text: e.target.value })}
                    placeholder="Расскажите о вашем курсе и специальном предложении для массажистов..."
                    rows={6}
                    required
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Опишите программу курса, его преимущества и условия акции
                  </p>
                </div>

                <div className="flex gap-2">
                  <Button type="submit" disabled={sending}>
                    {sending ? (
                      <>
                        <Icon name="Loader2" className="animate-spin mr-2" size={16} />
                        Отправка...
                      </>
                    ) : (
                      <>
                        <Icon name="Send" size={16} className="mr-2" />
                        Отправить всем массажистам
                      </>
                    )}
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setShowForm(false)}
                    disabled={sending}
                  >
                    Отмена
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        <div>
          <h2 className="text-2xl font-semibold mb-4">История промо-запросов</h2>
          
          {promoRequests.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center text-gray-500">
                <Icon name="Megaphone" size={48} className="mx-auto mb-4 opacity-50" />
                <p>Вы ещё не отправляли промо-запросы</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {promoRequests.map((request) => (
                <Card key={request.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-xl mb-1">{request.course_title}</CardTitle>
                        <CardDescription>
                          Скидка {request.discount_percent}% • Отправлено {request.sent_count} массажистам
                        </CardDescription>
                      </div>
                      <Badge variant={request.status === 'sent' ? 'default' : 'secondary'}>
                        {request.status === 'sent' ? 'Отправлено' : request.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-3 whitespace-pre-wrap">{request.promo_text}</p>
                    <p className="text-sm text-gray-500">
                      <Icon name="Calendar" size={14} className="inline mr-1" />
                      {new Date(request.created_at).toLocaleDateString('ru-RU', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
