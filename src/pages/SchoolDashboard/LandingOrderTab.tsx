import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import { 
  LandingOrderForm as FormData, 
  SavedOrder, 
  INITIAL_FORM, 
  ORDERS_API, 
  EMAIL_API 
} from './landing-orders/LandingOrderTypes';
import LandingOrderEmptyState from './landing-orders/LandingOrderEmptyState';
import LandingOrdersList from './landing-orders/LandingOrdersList';
import LandingOrderForm from './landing-orders/LandingOrderForm';

export default function LandingOrderTab() {
  const [form, setForm] = useState<FormData>(INITIAL_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [orders, setOrders] = useState<SavedOrder[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Icon name="Loader2" size={32} className="animate-spin text-primary" />
      </div>
    );
  }

  if (!showForm && orders.length === 0) {
    return <LandingOrderEmptyState onCreateClick={() => setShowForm(true)} />;
  }

  return (
    <div className="space-y-6">
      {!showForm && orders.length > 0 && (
        <LandingOrdersList 
          orders={orders}
          onCreateClick={() => setShowForm(true)}
          onDelete={handleDelete}
        />
      )}

      {showForm && (
        <LandingOrderForm 
          form={form}
          isSubmitting={isSubmitting}
          hasExistingOrders={orders.length > 0}
          onFormChange={setForm}
          onSubmit={handleSubmit}
          onBack={() => setShowForm(false)}
        />
      )}
    </div>
  );
}
