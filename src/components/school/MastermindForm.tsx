import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';

interface MastermindFormProps {
  mastermindForm: {
    title: string;
    course_type: string;
    category: 'technique' | 'business' | 'soft_skills' | 'health' | 'digital';
    description: string;
    has_certificate: boolean;
    duration_hours: string;
    image_url: string;
    external_url: string;
    price: string;
  };
  setMastermindForm: React.Dispatch<React.SetStateAction<{
    title: string;
    course_type: string;
    category: 'technique' | 'business' | 'soft_skills' | 'health' | 'digital';
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

export default function MastermindForm({ mastermindForm, setMastermindForm, onSubmit, onCancel, isEditing }: MastermindFormProps) {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>{isEditing ? 'Редактировать мастермайнд' : 'Добавить мастермайнд'}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label>Название*</Label>
          <Input value={mastermindForm.title} onChange={(e) => setMastermindForm({...mastermindForm, title: e.target.value})} placeholder="Мастермайнд по массажу" />
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label>Формат*</Label>
            <select value={mastermindForm.course_type} onChange={(e) => setMastermindForm({...mastermindForm, course_type: e.target.value})} className="w-full px-3 py-2 border rounded-md">
              <option value="online">Онлайн</option>
              <option value="offline">Офлайн</option>
              <option value="free">Бесплатный</option>
            </select>
          </div>
          <div>
            <Label>Категория*</Label>
            <select value={mastermindForm.category} onChange={(e) => setMastermindForm({...mastermindForm, category: e.target.value as any})} className="w-full px-3 py-2 border rounded-md">
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
          <Textarea value={mastermindForm.description} onChange={(e) => setMastermindForm({...mastermindForm, description: e.target.value.slice(0, 150)})} rows={2} maxLength={150} placeholder="Прокачайте навыки вместе с профессионалами" />
          <p className="text-xs text-muted-foreground mt-1">{mastermindForm.description.length}/150</p>
        </div>
        <div className="flex items-center gap-2">
          <input type="checkbox" checked={mastermindForm.has_certificate} onChange={(e) => setMastermindForm({...mastermindForm, has_certificate: e.target.checked})} className="w-4 h-4" id="cert-mm" />
          <Label htmlFor="cert-mm" className="cursor-pointer">Выдаётся сертификат</Label>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label>Длительность (часов)*</Label>
            <Input type="number" value={mastermindForm.duration_hours} onChange={(e) => setMastermindForm({...mastermindForm, duration_hours: e.target.value})} placeholder="8" />
          </div>
          <div>
            <Label>Стоимость (₽)*</Label>
            <Input type="number" value={mastermindForm.price} onChange={(e) => setMastermindForm({...mastermindForm, price: e.target.value})} placeholder="15000" />
          </div>
        </div>
        <div>
          <Label>Картинка (URL)*</Label>
          <Input value={mastermindForm.image_url} onChange={(e) => setMastermindForm({...mastermindForm, image_url: e.target.value})} placeholder="https://..." />
        </div>
        <div>
          <Label>Ссылка на лендинг*</Label>
          <Input value={mastermindForm.external_url} onChange={(e) => setMastermindForm({...mastermindForm, external_url: e.target.value})} placeholder="https://ваш-сайт.ru/мастермайнд" />
          <p className="text-xs text-muted-foreground mt-1">Пользователи перейдут на эту ссылку по кнопке "Подробнее"</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={onSubmit}>{isEditing ? 'Сохранить изменения' : 'Добавить мастермайнд'}</Button>
          <Button variant="outline" onClick={onCancel}>Отмена</Button>
        </div>
      </CardContent>
    </Card>
  );
}