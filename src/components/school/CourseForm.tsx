import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';

interface CourseFormProps {
  courseForm: {
    school_name: string;
    title: string;
    description: string;
    category: string;
    course_type: string;
    price: string;
    duration_hours: string;
    image_url: string;
    external_url: string;
    original_price: string;
    discount_price: string;
  };
  setCourseForm: React.Dispatch<React.SetStateAction<{
    school_name: string;
    title: string;
    description: string;
    category: string;
    course_type: string;
    price: string;
    duration_hours: string;
    image_url: string;
    external_url: string;
    original_price: string;
    discount_price: string;
  }>>;
  onSubmit: () => void;
  onCancel: () => void;
  isEditing?: boolean;
}

export default function CourseForm({ courseForm, setCourseForm, onSubmit, onCancel, isEditing }: CourseFormProps) {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>{isEditing ? 'Редактировать курс' : 'Добавить новый курс'}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!isEditing && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
            <Icon name="Info" className="text-blue-600 mt-0.5" size={20} />
            <div>
              <p className="font-medium text-blue-900">Публикация курса</p>
              <p className="text-sm text-blue-700 mt-1">
                Количество публикаций зависит от вашего тарифного плана. 
                Перейдите во вкладку <strong>"Тарифы"</strong>, чтобы посмотреть лимиты и повысить тариф.
              </p>
            </div>
          </div>
        )}
        <div>
          <Label>Название школы*</Label>
          <Input value={courseForm.school_name} onChange={(e) => setCourseForm({...courseForm, school_name: e.target.value})} placeholder="Школа массажа 'Название'" />
          <p className="text-xs text-muted-foreground mt-1">Укажите полное название вашей школы, как оно отображается для учеников</p>
        </div>
        <div>
          <Label>Название курса*</Label>
          <Input value={courseForm.title} onChange={(e) => setCourseForm({...courseForm, title: e.target.value})} />
        </div>
        <div>
          <Label>Описание</Label>
          <Textarea value={courseForm.description} onChange={(e) => setCourseForm({...courseForm, description: e.target.value})} rows={3} />
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label>Категория*</Label>
            <select value={courseForm.category} onChange={(e) => setCourseForm({...courseForm, category: e.target.value})} className="w-full px-3 py-2 border rounded-md">
              <option>Классический массаж</option>
              <option>Спортивный массаж</option>
              <option>Лечебный массаж</option>
              <option>SPA массаж</option>
              <option>Косметический массаж</option>
              <option>Детский массаж</option>
              <option>Массажные техники</option>
              <option>Бизнес и маркетинг</option>
              <option>Общение и психология</option>
              <option>Здоровье и безопасность</option>
              <option>Цифровые навыки</option>
              <option>Другое</option>
            </select>
          </div>
          <div>
            <Label>Тип курса*</Label>
            <select value={courseForm.course_type} onChange={(e) => setCourseForm({...courseForm, course_type: e.target.value})} className="w-full px-3 py-2 border rounded-md">
              <option value="online">Онлайн</option>
              <option value="offline">Офлайн</option>
              <option value="free">Бесплатный</option>
            </select>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label>Цена (₽)</Label>
            <Input type="number" value={courseForm.price} onChange={(e) => setCourseForm({...courseForm, price: e.target.value})} />
          </div>
          <div>
            <Label>Длительность (часов)</Label>
            <Input type="number" value={courseForm.duration_hours} onChange={(e) => setCourseForm({...courseForm, duration_hours: e.target.value})} />
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label>Полная цена (перечеркнутая, ₽)</Label>
            <Input type="number" value={courseForm.original_price} onChange={(e) => setCourseForm({...courseForm, original_price: e.target.value})} placeholder="Необязательно" />
          </div>
          <div>
            <Label>Цена со скидкой (красная, ₽)</Label>
            <Input type="number" value={courseForm.discount_price} onChange={(e) => setCourseForm({...courseForm, discount_price: e.target.value})} placeholder="Необязательно" />
          </div>
        </div>
        <div>
          <Label>URL изображения</Label>
          <Input value={courseForm.image_url} onChange={(e) => setCourseForm({...courseForm, image_url: e.target.value})} placeholder="https://..." />
        </div>
        <div>
          <Label>Ссылка на курс (внешний сайт)*</Label>
          <Input value={courseForm.external_url} onChange={(e) => setCourseForm({...courseForm, external_url: e.target.value})} placeholder="https://... (ссылка на ваш сайт/страницу курса)" />
          <p className="text-xs text-muted-foreground mt-1">Укажите ссылку на страницу курса вашей школы. По кнопке &quot;Подробнее&quot; пользователь перейдёт на эту ссылку.</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={onSubmit}>{isEditing ? 'Сохранить изменения' : 'Добавить курс'}</Button>
          <Button variant="outline" onClick={onCancel}>Отмена</Button>
        </div>
      </CardContent>
    </Card>
  );
}