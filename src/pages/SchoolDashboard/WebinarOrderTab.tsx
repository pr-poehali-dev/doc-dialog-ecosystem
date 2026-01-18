import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import { 
  WebinarOrderForm as FormData, 
  SavedWebinarOrder, 
  INITIAL_WEBINAR_FORM, 
  WEBINAR_ORDERS_API, 
  EMAIL_API,
  PACKAGE_PRICES
} from './webinar-orders/WebinarOrderTypes';
import WebinarOrderEmptyState from './webinar-orders/WebinarOrderEmptyState';
import WebinarOrdersList from './webinar-orders/WebinarOrdersList';
import WebinarOrderForm from './webinar-orders/WebinarOrderForm';

export default function WebinarOrderTab() {
  const [form, setForm] = useState<FormData>(INITIAL_WEBINAR_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [orders, setOrders] = useState<SavedWebinarOrder[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const userId = localStorage.getItem('userId');
      const response = await fetch(WEBINAR_ORDERS_API, {
        headers: {
          'X-Authorization': `Bearer ${userId}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setOrders(data);
      }
    } catch (error) {
      console.error('Error loading webinar orders:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const userId = localStorage.getItem('userId');
      
      await fetch(WEBINAR_ORDERS_API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': `Bearer ${userId}`
        },
        body: JSON.stringify(form)
      });

      const packageInfo = PACKAGE_PRICES[form.packageType];
      
      const htmlContent = `
        <h2 style="color: #667eea;">Новый заказ на размещение автовебинара</h2>
        
        <h3 style="color: #333; margin-top: 20px;">Информация о школе:</h3>
        <p><strong>Название школы:</strong> ${form.schoolName}</p>
        
        <h3 style="color: #333; margin-top: 20px;">О вебинаре:</h3>
        <p><strong>Тема:</strong> ${form.webinarTopic}</p>
        <p><strong>Цель:</strong> ${form.webinarGoal}</p>
        
        <h3 style="color: #333; margin-top: 20px;">Выбранный тариф:</h3>
        <p><strong>${packageInfo.label}</strong> — ${packageInfo.price} ₽</p>
        <p>${packageInfo.description}</p>
        
        <h3 style="color: #333; margin-top: 20px;">Контакты:</h3>
        <p><strong>Email:</strong> ${form.contactEmail}</p>
        <p><strong>Телефон:</strong> ${form.contactPhone}</p>
        
        ${form.additionalInfo ? `<h3 style="color: #333; margin-top: 20px;">Дополнительная информация:</h3><p>${form.additionalInfo}</p>` : ''}
        
        <p style="margin-top: 20px; color: #666;">
          <strong>Следующий шаг:</strong> Отправить клиенту ссылку на бриф для заполнения деталей вебинара.
        </p>
      `;
      
      const emailData = {
        to: 'a.docdialog@mail.ru',
        subject: `Заказ автовебинара: ${form.schoolName}`,
        template: 'notification',
        data: {
          title: 'Новый заказ автовебинара',
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
        description: 'Мы получили ваш заказ и отправим ссылку на бриф в течение 24 часов'
      });

      setForm(INITIAL_WEBINAR_FORM);
      setShowForm(false);
      loadOrders();
    } catch (error) {
      console.error('Error submitting webinar order:', error);
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
      await fetch(`${WEBINAR_ORDERS_API}?id=${orderId}`, {
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
    return <WebinarOrderEmptyState onCreateClick={() => setShowForm(true)} />;
  }

  return (
    <div className="space-y-6">
      {!showForm && orders.length > 0 && (
        <WebinarOrdersList 
          orders={orders}
          onCreateClick={() => setShowForm(true)}
          onDelete={handleDelete}
        />
      )}

      {showForm && (
        <WebinarOrderForm 
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
