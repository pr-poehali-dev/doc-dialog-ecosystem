import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface OfflineTrainingFormProps {
  trainingForm: {
    school_name: string;
    title: string;
    description: string;
    event_date: string;
    location: string;
    max_participants: string;
    price: string;
    image_url: string;
    external_url: string;
    original_price: string;
    discount_price: string;
    author_name: string;
    author_photo: string;
    event_content: string;
    category: 'technique' | 'business' | 'soft_skills' | 'health' | 'digital';
  };
  setTrainingForm: React.Dispatch<React.SetStateAction<{
    school_name: string;
    title: string;
    description: string;
    event_date: string;
    location: string;
    max_participants: string;
    price: string;
    image_url: string;
    external_url: string;
    original_price: string;
    discount_price: string;
    author_name: string;
    author_photo: string;
    event_content: string;
    category: 'technique' | 'business' | 'soft_skills' | 'health' | 'digital';
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
          <Label>Название школы*</Label>
          <Input value={trainingForm.school_name} onChange={(e) => setTrainingForm({...trainingForm, school_name: e.target.value})} placeholder="Школа массажа 'Название'" />
          <p className="text-xs text-muted-foreground mt-1">Укажите полное название вашей школы, как оно отображается для учеников</p>
        </div>
        <div>
          <Label>Категория курса*</Label>
          <select 
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={trainingForm.category} 
            onChange={(e) => setTrainingForm({...trainingForm, category: e.target.value as any})}
          >
            <option value="technique">Массажные техники</option>
            <option value="business">Бизнес и маркетинг</option>
            <option value="soft_skills">Общение и психология</option>
            <option value="health">Здоровье и безопасность</option>
            <option value="digital">Цифровые навыки</option>
          </select>
          <p className="text-xs text-muted-foreground mt-1">Выберите основную категорию курса для удобства поиска</p>
        </div>
        <div>
          <Label>Название обучения*</Label>
          <Input value={trainingForm.title} onChange={(e) => setTrainingForm({...trainingForm, title: e.target.value})} />
        </div>
        <div>
          <Label>Описание</Label>
          <Textarea value={trainingForm.description} onChange={(e) => setTrainingForm({...trainingForm, description: e.target.value})} rows={3} />
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label>Дата и время*</Label>
            <Input type="datetime-local" value={trainingForm.event_date} onChange={(e) => setTrainingForm({...trainingForm, event_date: e.target.value})} />
          </div>
          <div>
            <Label>Место проведения</Label>
            <Input value={trainingForm.location} onChange={(e) => setTrainingForm({...trainingForm, location: e.target.value})} placeholder="Москва, ул. ..." />
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label>Макс. участников</Label>
            <Input type="number" value={trainingForm.max_participants} onChange={(e) => setTrainingForm({...trainingForm, max_participants: e.target.value})} />
          </div>
          <div>
            <Label>Цена (₽)</Label>
            <Input type="number" value={trainingForm.price} onChange={(e) => setTrainingForm({...trainingForm, price: e.target.value})} />
          </div>
        </div>
        <div>
          <Label>URL изображения</Label>
          <Input value={trainingForm.image_url} onChange={(e) => setTrainingForm({...trainingForm, image_url: e.target.value})} placeholder="https://..." />
        </div>
        <div>
          <Label>Ссылка для регистрации*</Label>
          <Input value={trainingForm.external_url} onChange={(e) => setTrainingForm({...trainingForm, external_url: e.target.value})} placeholder="https://... (ссылка на страницу оплаты)" />
          <p className="text-xs text-muted-foreground mt-1">Укажите прямую ссылку на страницу оплаты</p>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label>Полная цена (перечеркнутая, ₽)</Label>
            <Input type="number" value={trainingForm.original_price} onChange={(e) => setTrainingForm({...trainingForm, original_price: e.target.value})} placeholder="Необязательно" />
          </div>
          <div>
            <Label>Цена со скидкой (красная, ₽)</Label>
            <Input type="number" value={trainingForm.discount_price} onChange={(e) => setTrainingForm({...trainingForm, discount_price: e.target.value})} placeholder="Необязательно" />
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label>Имя преподавателя</Label>
            <Input value={trainingForm.author_name} onChange={(e) => setTrainingForm({...trainingForm, author_name: e.target.value})} placeholder="Иван Иванов" />
          </div>
          <div>
            <Label>Фото преподавателя (URL)</Label>
            <Input value={trainingForm.author_photo} onChange={(e) => setTrainingForm({...trainingForm, author_photo: e.target.value})} placeholder="https://..." />
          </div>
        </div>
        <div>
          <Label>Программа обучения</Label>
          <Textarea value={trainingForm.event_content} onChange={(e) => setTrainingForm({...trainingForm, event_content: e.target.value})} rows={6} placeholder="Подробное описание программы, темы, расписание занятий..." />
        </div>
        <div className="flex gap-2">
          <Button onClick={onSubmit}>{isEditing ? 'Сохранить изменения' : 'Добавить очное обучение'}</Button>
          <Button variant="outline" onClick={onCancel}>Отмена</Button>
        </div>
      </CardContent>
    </Card>
  );
}