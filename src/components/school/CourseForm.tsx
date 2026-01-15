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
    has_certificate: boolean;
    has_employment: boolean;
    has_practice: boolean;
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
    has_certificate: boolean;
    has_employment: boolean;
    has_practice: boolean;
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
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label>Название курса*</Label>
            <Input value={courseForm.title} onChange={(e) => setCourseForm({...courseForm, title: e.target.value})} placeholder="Висцеральная терапия" />
          </div>
          <div>
            <Label>Формат*</Label>
            <select value={courseForm.course_type} onChange={(e) => setCourseForm({...courseForm, course_type: e.target.value})} className="w-full px-3 py-2 border rounded-md">
              <option value="online">Онлайн</option>
              <option value="offline">Офлайн</option>
              <option value="free">Бесплатный</option>
            </select>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label>Длительность (часов)*</Label>
            <Input type="number" value={courseForm.duration_hours} onChange={(e) => setCourseForm({...courseForm, duration_hours: e.target.value})} placeholder="40" />
          </div>
          <div>
            <Label>Стоимость (₽)*</Label>
            <Input type="number" value={courseForm.price} onChange={(e) => setCourseForm({...courseForm, price: e.target.value})} placeholder="25000" />
          </div>
        </div>
        <div>
          <Label>Картинка (URL)*</Label>
          <Input value={courseForm.image_url} onChange={(e) => setCourseForm({...courseForm, image_url: e.target.value})} placeholder="https://..." />
        </div>
        <div>
          <Label>Краткое описание*</Label>
          <Textarea value={courseForm.description} onChange={(e) => setCourseForm({...courseForm, description: e.target.value})} rows={2} placeholder="Изучите висцеральную терапию с нуля. Работа с органами, диагностика, безопасные техники." />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={courseForm.has_certificate} onChange={(e) => setCourseForm({...courseForm, has_certificate: e.target.checked})} className="w-4 h-4" />
            <span className="text-sm">Сертификат</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={courseForm.has_employment} onChange={(e) => setCourseForm({...courseForm, has_employment: e.target.checked})} className="w-4 h-4" />
            <span className="text-sm">Трудоустройство</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={courseForm.has_practice} onChange={(e) => setCourseForm({...courseForm, has_practice: e.target.checked})} className="w-4 h-4" />
            <span className="text-sm">Практика</span>
          </label>
        </div>
        <div>
          <Label>Ссылка "Подробнее" (внешний сайт)*</Label>
          <Input value={courseForm.external_url} onChange={(e) => setCourseForm({...courseForm, external_url: e.target.value})} placeholder="https://ваш-сайт.ru/курс" />
        </div>
        <div className="flex gap-2">
          <Button onClick={onSubmit}>{isEditing ? 'Сохранить изменения' : 'Добавить курс'}</Button>
          <Button variant="outline" onClick={onCancel}>Отмена</Button>
        </div>
      </CardContent>
    </Card>
  );
}