import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import { 
  SpecialistLandingOrderForm as FormData, 
  SavedSpecialistOrder, 
  INITIAL_SPECIALIST_FORM, 
  SPECIALIST_ORDERS_API, 
  EMAIL_API 
} from './SpecialistLandingOrderTypes';
import SpecialistLandingOrderEmptyState from './SpecialistLandingOrderEmptyState';
import SpecialistLandingOrdersList from './SpecialistLandingOrdersList';
import SpecialistLandingOrderForm from './SpecialistLandingOrderForm';

export default function SpecialistLandingOrder() {
  const [form, setForm] = useState<FormData>(INITIAL_SPECIALIST_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [orders, setOrders] = useState<SavedSpecialistOrder[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const userId = localStorage.getItem('userId');
      const response = await fetch(SPECIALIST_ORDERS_API, {
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
      
      await fetch(SPECIALIST_ORDERS_API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': `Bearer ${userId}`
        },
        body: JSON.stringify(form)
      });
      
      const htmlContent = `
        <h2 style="color: #667eea;">Новая заявка на создание лендинга для специалиста</h2>
        
        <h3 style="color: #333; margin-top: 20px;">Информация о специалисте:</h3>
        <p><strong>Имя:</strong> ${form.name}</p>
        <p><strong>Email:</strong> ${form.email}</p>
        <p><strong>Телефон:</strong> ${form.phone}</p>
        <p><strong>Специализация в массаже:</strong></p>
        <p>${form.specialization}</p>
        
        <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;" />
        
        <p style="color: #666; font-size: 14px;">
          <strong>Стоимость:</strong> 5 000 ₽<br />
          <strong>Включено:</strong> Год хостинга бесплатно
        </p>
      `;
      
      const emailData = {
        to: 'a.docdialog@mail.ru',
        subject: `Заявка на лендинг от специалиста: ${form.name}`,
        template: 'notification',
        data: {
          title: 'Новая заявка на создание лендинга',
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
        description: 'Мы свяжемся с вами в течение 24 часов для уточнения деталей'
      });

      setForm(INITIAL_SPECIALIST_FORM);
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
      await fetch(`${SPECIALIST_ORDERS_API}?id=${orderId}`, {
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
    return <SpecialistLandingOrderEmptyState onCreateClick={() => setShowForm(true)} />;
  }

  return (
    <div className="space-y-6">
      {!showForm && orders.length > 0 && (
        <SpecialistLandingOrdersList 
          orders={orders}
          onCreateClick={() => setShowForm(true)}
          onDelete={handleDelete}
        />
      )}

      {showForm && (
        <SpecialistLandingOrderForm 
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
