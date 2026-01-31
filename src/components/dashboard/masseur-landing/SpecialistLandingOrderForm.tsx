import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { SpecialistLandingOrderForm } from './SpecialistLandingOrderTypes';

interface Props {
  form: SpecialistLandingOrderForm;
  isSubmitting: boolean;
  hasExistingOrders: boolean;
  onFormChange: (form: SpecialistLandingOrderForm) => void;
  onSubmit: (e: React.FormEvent) => void;
  onBack: () => void;
}

export default function SpecialistLandingOrderFormComponent({ 
  form, 
  isSubmitting, 
  hasExistingOrders,
  onFormChange, 
  onSubmit,
  onBack
}: Props) {
  const handleChange = (field: keyof SpecialistLandingOrderForm, value: string) => {
    onFormChange({ ...form, [field]: value });
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      {hasExistingOrders && (
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-primary mb-4 transition-colors"
        >
          <Icon name="ArrowLeft" size={20} />
          <span>Назад к заявкам</span>
        </button>
      )}

      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Создадим лендинг для вас</h2>
        <p className="text-gray-600">
          Заполните форму, и мы свяжемся с вами для обсуждения деталей
        </p>
      </div>

      <div className="bg-gradient-to-br from-primary/5 to-blue-500/5 rounded-lg p-6 mb-6 border border-primary/20">
        <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
          <Icon name="Sparkles" className="text-primary" size={20} />
          Что вы получите
        </h3>
        <ul className="space-y-2">
          <li className="flex items-start gap-2">
            <Icon name="Check" className="text-primary mt-0.5 flex-shrink-0" size={18} />
            <span className="text-gray-700">
              <strong>Профессиональный лендинг</strong> на нашем домене — быстрее попадает в поиск
            </span>
          </li>
          <li className="flex items-start gap-2">
            <Icon name="Check" className="text-primary mt-0.5 flex-shrink-0" size={18} />
            <span className="text-gray-700">
              <strong>Бесплатный хостинг</strong> на год — никаких дополнительных платежей
            </span>
          </li>
          <li className="flex items-start gap-2">
            <Icon name="Check" className="text-primary mt-0.5 flex-shrink-0" size={18} />
            <span className="text-gray-700">
              <strong>Клиенты из поиска</strong> — ваш лендинг увидят в Google и Яндекс
            </span>
          </li>
          <li className="flex items-start gap-2">
            <Icon name="Check" className="text-primary mt-0.5 flex-shrink-0" size={18} />
            <span className="text-gray-700">
              <strong>Стоимость:</strong> <span className="text-primary font-semibold">5 000 ₽</span>
            </span>
          </li>
        </ul>
      </div>

      <form onSubmit={onSubmit} className="space-y-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Ваше имя *</Label>
            <Input
              id="name"
              value={form.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="Например: Елена Петрова"
              required
            />
          </div>

          <div>
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              value={form.email}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder="your@email.com"
              required
            />
          </div>

          <div>
            <Label htmlFor="phone">Телефон *</Label>
            <Input
              id="phone"
              type="tel"
              value={form.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              placeholder="+7 (999) 123-45-67"
              required
            />
          </div>

          <div>
            <Label htmlFor="specialization">Специализация в массаже *</Label>
            <Textarea
              id="specialization"
              value={form.specialization}
              onChange={(e) => handleChange('specialization', e.target.value)}
              placeholder="Например: Классический массаж, спортивный массаж, лимфодренажный массаж..."
              rows={4}
              required
            />
            <p className="text-sm text-gray-500 mt-1">
              Опишите, какие виды массажа вы делаете
            </p>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex gap-3">
            <Icon name="Info" className="text-blue-600 flex-shrink-0 mt-0.5" size={20} />
            <div className="text-sm text-blue-800">
              <p className="font-semibold mb-1">Что дальше?</p>
              <p>После отправки заявки мы свяжемся с вами в течение 24 часов. Вы заполните бриф, и мы создадим лендинг специально под ваши услуги.</p>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <Button 
            type="submit" 
            className="flex-1"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Icon name="Loader2" className="mr-2 animate-spin" size={18} />
                Отправка...
              </>
            ) : (
              <>
                <Icon name="Send" className="mr-2" size={18} />
                Отправить заявку
              </>
            )}
          </Button>
          {hasExistingOrders && (
            <Button 
              type="button" 
              variant="outline"
              onClick={onBack}
            >
              Отмена
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
