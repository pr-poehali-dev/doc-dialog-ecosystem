import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';

interface CourseFormProps {
  courseForm: {
    title: string;
    course_type: string;
    category: string;
    description: string;
    has_certificate: boolean;
    duration_hours: string;
    image_url: string;
    external_url: string;
    price: string;
  };
  setCourseForm: React.Dispatch<React.SetStateAction<{
    title: string;
    course_type: string;
    category: string;
    description: string;
    has_certificate: boolean;
    duration_hours: string;
    image_url: string;
    external_url: string;
    price: string;
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
          <Label>Название*</Label>
          <Input value={courseForm.title} onChange={(e) => setCourseForm({...courseForm, title: e.target.value})} placeholder="Висцеральная терапия" />
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label>Формат*</Label>
            <select value={courseForm.course_type} onChange={(e) => setCourseForm({...courseForm, course_type: e.target.value})} className="w-full px-3 py-2 border rounded-md">
              <option value="online">Онлайн</option>
              <option value="offline">Офлайн</option>
              <option value="free">Бесплатный</option>
            </select>
          </div>
          <div>
            <Label>Категория*</Label>
            <select value={courseForm.category} onChange={(e) => setCourseForm({...courseForm, category: e.target.value})} className="w-full px-3 py-2 border rounded-md">
              <option value="Классический массаж">Классический массаж</option>
              <option value="Лимфодренажный массаж">Лимфодренажный массаж</option>
              <option value="Антицеллюлитный массаж">Антицеллюлитный массаж</option>
              <option value="Висцеральный массаж">Висцеральный массаж</option>
              <option value="Спортивный массаж">Спортивный массаж</option>
              <option value="Детский массаж">Детский массаж</option>
              <option value="Восстановительные техники">Восстановительные техники</option>
              <option value="Для беременных">Для беременных</option>
              <option value="Массажные техники">Массажные техники</option>
              <option value="Бизнес и маркетинг">Бизнес и маркетинг</option>
              <option value="Общение и психология">Общение и психология</option>
              <option value="Здоровье и безопасность">Здоровье и безопасность</option>
              <option value="Цифровые навыки">Цифровые навыки</option>
            </select>
          </div>
        </div>
        <div>
          <Label>Краткое описание (до 150 символов)*</Label>
          <Textarea value={courseForm.description} onChange={(e) => setCourseForm({...courseForm, description: e.target.value.slice(0, 150)})} rows={2} maxLength={150} placeholder="Изучите висцеральную терапию с нуля" />
          <p className="text-xs text-muted-foreground mt-1">{courseForm.description.length}/150</p>
        </div>
        <div className="flex items-center gap-2">
          <input type="checkbox" checked={courseForm.has_certificate} onChange={(e) => setCourseForm({...courseForm, has_certificate: e.target.checked})} className="w-4 h-4" id="cert" />
          <Label htmlFor="cert" className="cursor-pointer">Выдаётся сертификат</Label>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label>Длительность (часов)*</Label>
            <Input type="number" value={courseForm.duration_hours} onChange={(e) => setCourseForm({...courseForm, duration_hours: e.target.value})} placeholder="40" />
          </div>
          <div>
            <Label>Стоимость (руб.)</Label>
            <Input type="number" value={courseForm.price} onChange={(e) => setCourseForm({...courseForm, price: e.target.value})} placeholder="25000" />
          </div>
        </div>
        <div>
          <Label>Картинка (URL)*</Label>
          <Input value={courseForm.image_url} onChange={(e) => setCourseForm({...courseForm, image_url: e.target.value})} placeholder="https://..." />
        </div>
        <div>
          <Label>Ссылка на лендинг*</Label>
          <Input value={courseForm.external_url} onChange={(e) => setCourseForm({...courseForm, external_url: e.target.value})} placeholder="https://ваш-сайт.ru/курс" />
          <p className="text-xs text-muted-foreground mt-1">Пользователи перейдут на эту ссылку по кнопке "Подробнее"</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={onSubmit}>{isEditing ? 'Сохранить изменения' : 'Добавить курс'}</Button>
          <Button variant="outline" onClick={onCancel}>Отмена</Button>
        </div>
      </CardContent>
    </Card>
  );
}