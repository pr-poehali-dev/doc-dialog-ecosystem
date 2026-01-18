import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { WebinarOrderForm as FormData, PACKAGE_PRICES } from './WebinarOrderTypes';

interface WebinarOrderFormProps {
  form: FormData;
  isSubmitting: boolean;
  hasExistingOrders: boolean;
  onFormChange: (form: FormData) => void;
  onSubmit: (e: React.FormEvent) => void;
  onBack: () => void;
}

export default function WebinarOrderForm({ 
  form, 
  isSubmitting, 
  hasExistingOrders,
  onFormChange, 
  onSubmit,
  onBack 
}: WebinarOrderFormProps) {
  return (
    <Card className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold">Заказать размещение автовебинара</h3>
        {hasExistingOrders && (
          <Button variant="ghost" onClick={onBack}>
            <Icon name="ArrowLeft" size={20} className="mr-2" />
            Назад
          </Button>
        )}
      </div>

      <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-lg mb-8">
        <h4 className="font-semibold mb-3 flex items-center gap-2">
          <Icon name="Sparkles" size={20} className="text-primary" />
          Преимущества автовебинаров на нашей платформе:
        </h4>
        <ul className="space-y-2 text-sm text-gray-700">
          <li className="flex items-start gap-2">
            <Icon name="Check" size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
            <span><strong>Эффект прямого эфира:</strong> Посетители уверены, что вебинар проходит в реальном времени</span>
          </li>
          <li className="flex items-start gap-2">
            <Icon name="Check" size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
            <span><strong>Умные боты:</strong> Автоматические вопросы и ответы создают атмосферу живого общения</span>
          </li>
          <li className="flex items-start gap-2">
            <Icon name="Check" size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
            <span><strong>Встроенные офферы:</strong> Кнопки покупки появляются в нужный момент, клиенты покупают курсы без вашего участия</span>
          </li>
          <li className="flex items-start gap-2">
            <Icon name="Check" size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
            <span><strong>Гибкое расписание:</strong> Настройте удобное время трансляций под вашу аудиторию</span>
          </li>
          <li className="flex items-start gap-2">
            <Icon name="Check" size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
            <span><strong>Автоматическая рассылка:</strong> Запись вебинара отправляется клиентам после просмотра</span>
          </li>
          <li className="flex items-start gap-2">
            <Icon name="Check" size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
            <span><strong>Без вашего присутствия:</strong> Вебинары работают и продают 24/7</span>
          </li>
        </ul>
      </div>

      <form onSubmit={onSubmit} className="space-y-8">
        <div className="space-y-4">
          <h4 className="text-lg font-semibold">Информация о школе и вебинаре</h4>
          
          <div>
            <Label htmlFor="schoolName">Название вашей школы *</Label>
            <Input
              id="schoolName"
              value={form.schoolName}
              onChange={(e) => onFormChange({ ...form, schoolName: e.target.value })}
              placeholder="Например: Академия психологии"
              required
            />
          </div>

          <div>
            <Label htmlFor="webinarTopic">О чём ваш вебинар? *</Label>
            <Textarea
              id="webinarTopic"
              value={form.webinarTopic}
              onChange={(e) => onFormChange({ ...form, webinarTopic: e.target.value })}
              rows={2}
              placeholder="Опишите тему вебинара"
              required
            />
          </div>

          <div>
            <Label htmlFor="webinarGoal">Какая цель вебинара? *</Label>
            <Textarea
              id="webinarGoal"
              value={form.webinarGoal}
              onChange={(e) => onFormChange({ ...form, webinarGoal: e.target.value })}
              rows={2}
              placeholder="Например: Продажа курса по таро-консультированию"
              required
            />
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-lg font-semibold">Выберите тариф</h4>
          
          <div className="grid gap-3">
            {Object.entries(PACKAGE_PRICES).map(([key, data]) => (
              <label 
                key={key}
                className={`flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  form.packageType === key 
                    ? 'border-primary bg-primary/5' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <input
                  type="radio"
                  name="packageType"
                  value={key}
                  checked={form.packageType === key}
                  onChange={(e) => onFormChange({ ...form, packageType: e.target.value as any })}
                  className="mt-1"
                />
                <div className="flex-1">
                  <div className="font-semibold">{data.label} — {data.price} ₽</div>
                  <div className="text-sm text-gray-600">{data.description}</div>
                </div>
              </label>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-lg font-semibold">Контактная информация</h4>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="contactEmail">Email для связи *</Label>
              <Input
                id="contactEmail"
                type="email"
                value={form.contactEmail}
                onChange={(e) => onFormChange({ ...form, contactEmail: e.target.value })}
                required
              />
            </div>

            <div>
              <Label htmlFor="contactPhone">Телефон *</Label>
              <Input
                id="contactPhone"
                type="tel"
                value={form.contactPhone}
                onChange={(e) => onFormChange({ ...form, contactPhone: e.target.value })}
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="additionalInfo">Дополнительная информация</Label>
            <Textarea
              id="additionalInfo"
              value={form.additionalInfo}
              onChange={(e) => onFormChange({ ...form, additionalInfo: e.target.value })}
              rows={3}
              placeholder="Укажите любые важные детали"
            />
          </div>
        </div>

        <div className="bg-gradient-to-br from-primary/5 to-purple-50 p-6 rounded-lg">
          <h4 className="font-semibold mb-3">Что будет дальше:</h4>
          <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
            <li>Мы получим вашу заявку и отправим ссылку на подробный бриф</li>
            <li>Вы заполните бриф с деталями вашего вебинара и сценарием</li>
            <li>Мы свяжемся с вами для уточнения деталей</li>
            <li>Заключим договор и вышлем счёт на оплату</li>
            <li>После оплаты настроим и разместим автовебинар на платформе</li>
            <li>Вы получите доступ к управлению расписанием и статистикой</li>
          </ol>
        </div>

        <div className="flex gap-3">
          <Button type="submit" size="lg" disabled={isSubmitting} className="flex-1">
            {isSubmitting ? (
              <>
                <Icon name="Loader2" size={20} className="mr-2 animate-spin" />
                Отправка...
              </>
            ) : (
              <>
                <Icon name="Send" size={20} className="mr-2" />
                Отправить заявку
              </>
            )}
          </Button>
        </div>
      </form>
    </Card>
  );
}
