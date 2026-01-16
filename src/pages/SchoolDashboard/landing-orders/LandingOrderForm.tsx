import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { LandingOrderForm as FormData } from './LandingOrderTypes';

interface LandingOrderFormProps {
  form: FormData;
  isSubmitting: boolean;
  hasExistingOrders: boolean;
  onFormChange: (form: FormData) => void;
  onSubmit: (e: React.FormEvent) => void;
  onBack: () => void;
}

export default function LandingOrderForm({ 
  form, 
  isSubmitting, 
  hasExistingOrders,
  onFormChange, 
  onSubmit,
  onBack 
}: LandingOrderFormProps) {
  return (
    <Card className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold">Заказать продающий лендинг</h3>
        {hasExistingOrders && (
          <Button variant="ghost" onClick={onBack}>
            <Icon name="ArrowLeft" size={20} className="mr-2" />
            Назад
          </Button>
        )}
      </div>

      <form onSubmit={onSubmit} className="space-y-8">
        <div className="space-y-4">
          <h4 className="text-lg font-semibold">Информация о курсе</h4>
          
          <div>
            <Label htmlFor="courseName">Название курса *</Label>
            <Input
              id="courseName"
              value={form.courseName}
              onChange={(e) => onFormChange({ ...form, courseName: e.target.value })}
              required
            />
          </div>

          <div>
            <Label htmlFor="courseType">Тип обучения *</Label>
            <select
              id="courseType"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              value={form.courseType}
              onChange={(e) => onFormChange({ ...form, courseType: e.target.value as any })}
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
              onChange={(e) => onFormChange({ ...form, description: e.target.value })}
              rows={2}
              required
            />
          </div>

          <div>
            <Label htmlFor="targetAudience">Для кого этот курс? *</Label>
            <Textarea
              id="targetAudience"
              value={form.targetAudience}
              onChange={(e) => onFormChange({ ...form, targetAudience: e.target.value })}
              rows={2}
              required
            />
          </div>

          <div>
            <Label htmlFor="uniqueSellingPoints">Уникальные преимущества (через запятую) *</Label>
            <Textarea
              id="uniqueSellingPoints"
              value={form.uniqueSellingPoints}
              onChange={(e) => onFormChange({ ...form, uniqueSellingPoints: e.target.value })}
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
                onChange={(e) => onFormChange({ ...form, price: e.target.value })}
                required
              />
            </div>

            <div>
              <Label htmlFor="courseDuration">Длительность *</Label>
              <Input
                id="courseDuration"
                value={form.courseDuration}
                onChange={(e) => onFormChange({ ...form, courseDuration: e.target.value })}
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
              onChange={(e) => onFormChange({ ...form, whatStudentsGet: e.target.value })}
              rows={3}
              required
            />
          </div>

          <div>
            <Label htmlFor="program">Программа курса *</Label>
            <Textarea
              id="program"
              value={form.program}
              onChange={(e) => onFormChange({ ...form, program: e.target.value })}
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
              onChange={(e) => onFormChange({ ...form, authorName: e.target.value })}
              required
            />
          </div>

          <div>
            <Label htmlFor="authorBio">Биография/достижения *</Label>
            <Textarea
              id="authorBio"
              value={form.authorBio}
              onChange={(e) => onFormChange({ ...form, authorBio: e.target.value })}
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
              onChange={(e) => onFormChange({ ...form, schoolName: e.target.value })}
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
            <Label htmlFor="externalFormUrl">Ссылка на вашу форму записи *</Label>
            <Input
              id="externalFormUrl"
              type="url"
              value={form.externalFormUrl}
              onChange={(e) => onFormChange({ ...form, externalFormUrl: e.target.value })}
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
              onChange={(e) => onFormChange({ ...form, additionalInfo: e.target.value })}
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
  );
}
