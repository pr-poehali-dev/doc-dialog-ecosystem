import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface OfflineTrainingFormProps {
  trainingForm: {
    title: string;
    course_type: string;
    category: 'technique' | 'business' | 'soft_skills' | 'health' | 'digital';
    description: string;
    has_certificate: boolean;
    duration_hours: string;
    image_url: string;
    external_url: string;
    price: string;
    event_date: string;
  };
  setTrainingForm: React.Dispatch<React.SetStateAction<{
    title: string;
    course_type: string;
    category: 'technique' | 'business' | 'soft_skills' | 'health' | 'digital';
    description: string;
    has_certificate: boolean;
    duration_hours: string;
    image_url: string;
    external_url: string;
    price: string;
    event_date: string;
  }>>;
  onSubmit: () => void;
  onCancel: () => void;
  isEditing?: boolean;
}

export default function OfflineTrainingForm({ trainingForm, setTrainingForm, onSubmit, onCancel, isEditing }: OfflineTrainingFormProps) {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>{isEditing ? 'Редактировать очное обучение' : 'Добавить очное обучение'}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label>Название*</Label>
          <Input value={trainingForm.title} onChange={(e) => setTrainingForm({...trainingForm, title: e.target.value})} placeholder="Очное обучение массажу" />
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label>Формат*</Label>
            <select value={trainingForm.course_type} onChange={(e) => setTrainingForm({...trainingForm, course_type: e.target.value})} className="w-full px-3 py-2 border rounded-md">
              <option value="online">Онлайн</option>
              <option value="offline">Офлайн</option>
              <option value="free">Бесплатный</option>
            </select>
          </div>
          <div>
            <Label>Категория*</Label>
            <select value={trainingForm.category} onChange={(e) => setTrainingForm({...trainingForm, category: e.target.value as any})} className="w-full px-3 py-2 border rounded-md">
              <option value="technique">Массажные техники</option>
              <option value="business">Бизнес и маркетинг</option>
              <option value="soft_skills">Общение и психология</option>
              <option value="health">Здоровье и безопасность</option>
              <option value="digital">Цифровые навыки</option>
            </select>
          </div>
        </div>
        <div>
          <Label>Краткое описание (до 150 символов)*</Label>
          <Textarea value={trainingForm.description} onChange={(e) => setTrainingForm({...trainingForm, description: e.target.value.slice(0, 150)})} rows={2} maxLength={150} placeholder="Очное обучение с практикой" />
          <p className="text-xs text-muted-foreground mt-1">{trainingForm.description.length}/150</p>
        </div>
        <div className="flex items-center gap-2">
          <input type="checkbox" checked={trainingForm.has_certificate} onChange={(e) => setTrainingForm({...trainingForm, has_certificate: e.target.checked})} className="w-4 h-4" id="cert-ot" />
          <Label htmlFor="cert-ot" className="cursor-pointer">Выдаётся сертификат</Label>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <Label>Дата проведения*</Label>
            <Input type="datetime-local" value={trainingForm.event_date} onChange={(e) => setTrainingForm({...trainingForm, event_date: e.target.value})} />
          </div>
          <div>
            <Label>Длительность (часов)*</Label>
            <Input type="number" value={trainingForm.duration_hours} onChange={(e) => setTrainingForm({...trainingForm, duration_hours: e.target.value})} placeholder="16" />
          </div>
          <div>
            <Label>Стоимость (₽)*</Label>
            <Input type="number" value={trainingForm.price} onChange={(e) => setTrainingForm({...trainingForm, price: e.target.value})} placeholder="25000" />
          </div>
        </div>
        <div>
          <Label>Картинка (URL)*</Label>
          <Input value={trainingForm.image_url} onChange={(e) => setTrainingForm({...trainingForm, image_url: e.target.value})} placeholder="https://..." />
        </div>
        <div>
          <Label>Ссылка на лендинг*</Label>
          <Input value={trainingForm.external_url} onChange={(e) => setTrainingForm({...trainingForm, external_url: e.target.value})} placeholder="https://ваш-сайт.ru/обучение" />
          <p className="text-xs text-muted-foreground mt-1">Пользователи перейдут на эту ссылку по кнопке "Подробнее"</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={onSubmit}>{isEditing ? 'Сохранить изменения' : 'Добавить очное обучение'}</Button>
          <Button variant="outline" onClick={onCancel}>Отмена</Button>
        </div>
      </CardContent>
    </Card>
  );
}