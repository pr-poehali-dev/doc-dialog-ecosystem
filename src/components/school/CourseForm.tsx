import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface CourseFormProps {
  courseForm: {
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
    author_name: string;
    author_photo: string;
    course_content: string;
  };
  setCourseForm: React.Dispatch<React.SetStateAction<{
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
    author_name: string;
    author_photo: string;
    course_content: string;
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
          <Input value={courseForm.external_url} onChange={(e) => setCourseForm({...courseForm, external_url: e.target.value})} placeholder="https://... (ссылка на страницу оплаты)" />
          <p className="text-xs text-muted-foreground mt-1">Укажите прямую ссылку на страницу оплаты вашей школы</p>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label>Имя автора курса</Label>
            <Input value={courseForm.author_name} onChange={(e) => setCourseForm({...courseForm, author_name: e.target.value})} placeholder="Иван Иванов" />
          </div>
          <div>
            <Label>Фото автора (URL)</Label>
            <Input value={courseForm.author_photo} onChange={(e) => setCourseForm({...courseForm, author_photo: e.target.value})} placeholder="https://..." />
          </div>
        </div>
        <div>
          <Label>Содержание курса (программа)</Label>
          <Textarea value={courseForm.course_content} onChange={(e) => setCourseForm({...courseForm, course_content: e.target.value})} rows={6} placeholder="Подробное описание программы курса, модули, темы..." />
        </div>
        <div className="flex gap-2">
          <Button onClick={onSubmit}>{isEditing ? 'Сохранить изменения' : 'Добавить курс'}</Button>
          <Button variant="outline" onClick={onCancel}>Отмена</Button>
        </div>
      </CardContent>
    </Card>
  );
}