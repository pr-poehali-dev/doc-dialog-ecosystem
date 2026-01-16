import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface LandingOrderForm {
  courseName: string;
  courseType: 'course' | 'mastermind' | 'offline';
  description: string;
  targetAudience: string;
  uniqueSellingPoints: string;
  price: string;
  courseDuration: string;
  whatStudentsGet: string;
  program: string;
  authorName: string;
  authorBio: string;
  schoolName: string;
  contactEmail: string;
  contactPhone: string;
  externalFormUrl: string;
  additionalInfo: string;
}

interface SavedOrder extends LandingOrderForm {
  id: number;
  status: string;
  created_at: string;
}

const INITIAL_FORM: LandingOrderForm = {
  courseName: '',
  courseType: 'course',
  description: '',
  targetAudience: '',
  uniqueSellingPoints: '',
  price: '',
  courseDuration: '',
  whatStudentsGet: '',
  program: '',
  authorName: '',
  authorBio: '',
  schoolName: '',
  contactEmail: '',
  contactPhone: '',
  externalFormUrl: '',
  additionalInfo: ''
};

export default function LandingOrderTab() {
  const [form, setForm] = useState<LandingOrderForm>(INITIAL_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [orders, setOrders] = useState<SavedOrder[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const ORDERS_API = 'https://functions.poehali.dev/ab0a2627-04a3-4717-8ee6-05c7c08f9807';

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const userId = localStorage.getItem('userId');
      const response = await fetch(ORDERS_API, {
        headers: {
          'X-Authorization': `Bearer ${userId}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setOrders(data);
      }
    } catch (error) {
      console.error('Error loading orders:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const userId = localStorage.getItem('userId');
      
      await fetch(ORDERS_API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': `Bearer ${userId}`
        },
        body: JSON.stringify(form)
      });

      const EMAIL_API = 'https://functions.poehali.dev/21920113-c479-4edd-9a41-cf0b8a08f47c';
      const courseTypeText = form.courseType === 'course' ? 'Курс' : form.courseType === 'mastermind' ? 'Мастермайнд' : 'Очное обучение';
      
      const htmlContent = `
        <h2 style="color: #667eea;">Новый заказ продающего лендинга</h2>
        
        <h3 style="color: #333; margin-top: 20px;">Информация о курсе:</h3>
        <p><strong>Название:</strong> ${form.courseName}</p>
        <p><strong>Тип:</strong> ${courseTypeText}</p>
        <p><strong>Описание:</strong> ${form.description}</p>
        <p><strong>Целевая аудитория:</strong> ${form.targetAudience}</p>
        <p><strong>УТП:</strong> ${form.uniqueSellingPoints}</p>
        <p><strong>Цена:</strong> ${form.price} ₽</p>
        <p><strong>Длительность:</strong> ${form.courseDuration}</p>
        
        <h3 style="color: #333; margin-top: 20px;">Что получат студенты:</h3>
        <p>${form.whatStudentsGet}</p>
        
        <h3 style="color: #333; margin-top: 20px;">Программа:</h3>
        <p>${form.program}</p>
        
        <h3 style="color: #333; margin-top: 20px;">Автор/преподаватель:</h3>
        <p><strong>Имя:</strong> ${form.authorName}</p>
        <p><strong>Биография:</strong> ${form.authorBio}</p>
        
        <h3 style="color: #333; margin-top: 20px;">Контакты школы:</h3>
        <p><strong>Название:</strong> ${form.schoolName}</p>
        <p><strong>Email:</strong> ${form.contactEmail}</p>
        <p><strong>Телефон:</strong> ${form.contactPhone}</p>
        <p><strong>Ссылка на форму записи:</strong> ${form.externalFormUrl}</p>
        
        ${form.additionalInfo ? `<h3 style="color: #333; margin-top: 20px;">Дополнительная информация:</h3><p>${form.additionalInfo}</p>` : ''}
      `;
      
      const emailData = {
        to: 'a.docdialog@mail.ru',
        subject: `Заказ лендинга: ${form.courseName}`,
        template: 'notification',
        data: {
          title: 'Новый заказ лендинга',
          message: htmlContent
        }
      };

      await fetch(EMAIL_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(emailData)
      });

      toast({
        title: '✅ Заявка отправлена!',
        description: 'Мы получили ваш заказ и свяжемся с вами в течение 24 часов'
      });

      setForm(INITIAL_FORM);
      setShowForm(false);
      loadOrders();
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: '❌ Ошибка',
        description: 'Не удалось отправить заявку. Попробуйте позже',
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (orderId: number) => {
    try {
      const userId = localStorage.getItem('userId');
      await fetch(`${ORDERS_API}?id=${orderId}`, {
        method: 'DELETE',
        headers: {
          'X-Authorization': `Bearer ${userId}`
        }
      });
      
      toast({
        title: 'Заявка удалена',
        description: 'Заявка успешно удалена из списка'
      });
      
      loadOrders();
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось удалить заявку',
        variant: 'destructive'
      });
    }
  };

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { label: string; className: string }> = {
      pending: { label: 'В обработке', className: 'bg-yellow-100 text-yellow-800' },
      processing: { label: 'В работе', className: 'bg-blue-100 text-blue-800' },
      completed: { label: 'Готово', className: 'bg-green-100 text-green-800' },
      cancelled: { label: 'Отменено', className: 'bg-gray-100 text-gray-800' }
    };
    
    const config = statusMap[status] || statusMap.pending;
    return <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.className}`}>{config.label}</span>;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Icon name="Loader2" size={32} className="animate-spin text-primary" />
      </div>
    );
  }

  if (!showForm && orders.length === 0) {
    return (
      <Card className="p-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="FileText" size={32} className="text-primary" />
          </div>
          <h3 className="text-xl font-bold mb-2">Создайте свой первый лендинг</h3>
          <p className="text-gray-600 mb-6">
            Закажите продающий лендинг для вашего курса всего за 2990 ₽
          </p>
          <Button size="lg" onClick={() => setShowForm(true)}>
            <Icon name="Plus" size={20} className="mr-2" />
            Создать заявку
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {!showForm && orders.length > 0 && (
        <>
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold">Мои заявки</h3>
            <Button onClick={() => setShowForm(true)}>
              <Icon name="Plus" size={20} className="mr-2" />
              Новая заявка
            </Button>
          </div>

          <div className="grid gap-4">
            {orders.map((order) => (
              <Card key={order.id} className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="text-lg font-bold mb-1">{order.courseName}</h4>
                    <p className="text-sm text-gray-600">
                      {new Date(order.created_at).toLocaleDateString('ru-RU', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusBadge(order.status)}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(order.id)}
                    >
                      <Icon name="Trash2" size={16} />
                    </Button>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Тип:</p>
                    <p className="font-medium">
                      {order.courseType === 'course' ? 'Онлайн-курс' : 
                       order.courseType === 'mastermind' ? 'Мастермайнд' : 'Очное обучение'}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Цена:</p>
                    <p className="font-medium">{order.price} ₽</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Длительность:</p>
                    <p className="font-medium">{order.courseDuration}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Контакт:</p>
                    <p className="font-medium">{order.contactEmail}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </>
      )}

      {showForm && (
        <Card className="p-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold">Заказать продающий лендинг</h3>
            {orders.length > 0 && (
              <Button variant="ghost" onClick={() => setShowForm(false)}>
                <Icon name="ArrowLeft" size={20} className="mr-2" />
                Назад
              </Button>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Existing form fields... */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Информация о курсе</h4>
              
              <div>
                <Label htmlFor="courseName">Название курса *</Label>
                <Input
                  id="courseName"
                  value={form.courseName}
                  onChange={(e) => setForm({ ...form, courseName: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label htmlFor="courseType">Тип обучения *</Label>
                <select
                  id="courseType"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={form.courseType}
                  onChange={(e) => setForm({ ...form, courseType: e.target.value as any })}
                  required
                >
                  <option value="course">Онлайн-курс</option>
                  <option value="mastermind">Мастермайнд</option>
                  <option value="offline">Очное обучение</option>
                </select>
              </div>

              <div>
                <Label htmlFor="description">Краткое описание (1-2 предложения) *</Label>
                <Textarea
                  id="description"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  rows={2}
                  required
                />
              </div>

              <div>
                <Label htmlFor="targetAudience">Для кого этот курс? *</Label>
                <Textarea
                  id="targetAudience"
                  value={form.targetAudience}
                  onChange={(e) => setForm({ ...form, targetAudience: e.target.value })}
                  rows={2}
                  required
                />
              </div>

              <div>
                <Label htmlFor="uniqueSellingPoints">Уникальные преимущества (через запятую) *</Label>
                <Textarea
                  id="uniqueSellingPoints"
                  value={form.uniqueSellingPoints}
                  onChange={(e) => setForm({ ...form, uniqueSellingPoints: e.target.value })}
                  rows={2}
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="price">Цена (₽) *</Label>
                  <Input
                    id="price"
                    type="text"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="courseDuration">Длительность *</Label>
                  <Input
                    id="courseDuration"
                    value={form.courseDuration}
                    onChange={(e) => setForm({ ...form, courseDuration: e.target.value })}
                    placeholder="Например: 2 месяца"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="whatStudentsGet">Что получат студенты? *</Label>
                <Textarea
                  id="whatStudentsGet"
                  value={form.whatStudentsGet}
                  onChange={(e) => setForm({ ...form, whatStudentsGet: e.target.value })}
                  rows={3}
                  required
                />
              </div>

              <div>
                <Label htmlFor="program">Программа курса *</Label>
                <Textarea
                  id="program"
                  value={form.program}
                  onChange={(e) => setForm({ ...form, program: e.target.value })}
                  rows={5}
                  required
                />
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Автор/Преподаватель</h4>
              
              <div>
                <Label htmlFor="authorName">Имя преподавателя *</Label>
                <Input
                  id="authorName"
                  value={form.authorName}
                  onChange={(e) => setForm({ ...form, authorName: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label htmlFor="authorBio">Биография/достижения *</Label>
                <Textarea
                  id="authorBio"
                  value={form.authorBio}
                  onChange={(e) => setForm({ ...form, authorBio: e.target.value })}
                  rows={4}
                  required
                />
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Контактная информация</h4>
              
              <div>
                <Label htmlFor="schoolName">Название школы *</Label>
                <Input
                  id="schoolName"
                  value={form.schoolName}
                  onChange={(e) => setForm({ ...form, schoolName: e.target.value })}
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="contactEmail">Email для связи *</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    value={form.contactEmail}
                    onChange={(e) => setForm({ ...form, contactEmail: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="contactPhone">Телефон *</Label>
                  <Input
                    id="contactPhone"
                    type="tel"
                    value={form.contactPhone}
                    onChange={(e) => setForm({ ...form, contactPhone: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="externalFormUrl">Ссылка на вашу форму записи *</Label>
                <Input
                  id="externalFormUrl"
                  type="url"
                  value={form.externalFormUrl}
                  onChange={(e) => setForm({ ...form, externalFormUrl: e.target.value })}
                  required
                />
                <p className="text-sm text-gray-500 mt-1">
                  На эту форму будут вести кнопки записи с лендинга
                </p>
              </div>

              <div>
                <Label htmlFor="additionalInfo">Дополнительная информация</Label>
                <Textarea
                  id="additionalInfo"
                  value={form.additionalInfo}
                  onChange={(e) => setForm({ ...form, additionalInfo: e.target.value })}
                  rows={3}
                />
              </div>
            </div>

            <div className="bg-gradient-to-br from-primary/5 to-purple-50 p-6 rounded-lg">
              <h4 className="font-semibold mb-3">Что будет дальше:</h4>
              <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
                <li>Мы получим вашу заявку и свяжемся в течение 24 часов</li>
                <li>Обсудим детали и вышлем счёт на 2990 ₽</li>
                <li>После оплаты создадим лендинг за 2-3 дня</li>
                <li>Лендинг разместим на нашем домене с вашим брендингом</li>
                <li>Карточка курса в каталоге будет вести на этот лендинг</li>
              </ol>
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Icon name="Loader2" size={20} className="mr-2 animate-spin" />
                  Отправка...
                </>
              ) : (
                <>
                  <Icon name="Send" size={20} className="mr-2" />
                  Отправить заказ
                </>
              )}
            </Button>
          </form>
        </Card>
      )}
    </div>
  );
}
