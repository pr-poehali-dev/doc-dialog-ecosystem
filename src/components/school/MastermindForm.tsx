import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';

interface MastermindFormProps {
  mastermindForm: {
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
  setMastermindForm: React.Dispatch<React.SetStateAction<{
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

export default function MastermindForm({ mastermindForm, setMastermindForm, onSubmit, onCancel, isEditing }: MastermindFormProps) {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>{isEditing ? 'Редактировать мастермайнд' : 'Добавить мастермайнд'}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!isEditing && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
            <Icon name="Info" className="text-blue-600 mt-0.5" size={20} />
            <div>
              <p className="font-medium text-blue-900">Публикация мастермайнда</p>
              <p className="text-sm text-blue-700 mt-1">
                Количество публикаций зависит от вашего тарифного плана. 
                Перейдите во вкладку <strong>"Тарифы"</strong>, чтобы посмотреть лимиты и повысить тариф.
              </p>
            </div>
          </div>
        )}
        <div>
          <Label>Название школы*</Label>
          <Input value={mastermindForm.school_name} onChange={(e) => setMastermindForm({...mastermindForm, school_name: e.target.value})} placeholder="Школа массажа 'Название'" />
          <p className="text-xs text-muted-foreground mt-1">Укажите полное название вашей школы, как оно отображается для учеников</p>
        </div>
        <div>
          <Label>Категория мастермайнда*</Label>
          <select 
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={mastermindForm.category} 
            onChange={(e) => setMastermindForm({...mastermindForm, category: e.target.value as any})}
          >
            <option value="technique">Массажные техники</option>
            <option value="business">Бизнес и маркетинг</option>
            <option value="soft_skills">Общение и психология</option>
            <option value="health">Здоровье и безопасность</option>
            <option value="digital">Цифровые навыки</option>
          </select>
          <p className="text-xs text-muted-foreground mt-1">Выберите основную категорию мастермайнда для удобства поиска</p>
        </div>
        <div>
          <Label>Название мастермайнда*</Label>
          <Input value={mastermindForm.title} onChange={(e) => setMastermindForm({...mastermindForm, title: e.target.value})} />
        </div>
        <div>
          <Label>Описание</Label>
          <Textarea value={mastermindForm.description} onChange={(e) => setMastermindForm({...mastermindForm, description: e.target.value})} rows={3} />
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label>Дата и время*</Label>
            <Input type="datetime-local" value={mastermindForm.event_date} onChange={(e) => setMastermindForm({...mastermindForm, event_date: e.target.value})} />
          </div>
          <div>
            <Label>Место проведения</Label>
            <Input value={mastermindForm.location} onChange={(e) => setMastermindForm({...mastermindForm, location: e.target.value})} placeholder="Москва, ул. ..." />
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label>Макс. участников</Label>
            <Input type="number" value={mastermindForm.max_participants} onChange={(e) => setMastermindForm({...mastermindForm, max_participants: e.target.value})} />
          </div>
          <div>
            <Label>Цена (₽)</Label>
            <Input type="number" value={mastermindForm.price} onChange={(e) => setMastermindForm({...mastermindForm, price: e.target.value})} />
          </div>
        </div>
        <div>
          <Label>URL изображения</Label>
          <Input value={mastermindForm.image_url} onChange={(e) => setMastermindForm({...mastermindForm, image_url: e.target.value})} placeholder="https://..." />
        </div>
        <div>
          <Label>Ссылка для регистрации*</Label>
          <Input value={mastermindForm.external_url} onChange={(e) => setMastermindForm({...mastermindForm, external_url: e.target.value})} placeholder="https://... (ссылка на страницу оплаты)" />
          <p className="text-xs text-muted-foreground mt-1">Укажите прямую ссылку на страницу оплаты</p>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label>Полная цена (перечеркнутая, ₽)</Label>
            <Input type="number" value={mastermindForm.original_price} onChange={(e) => setMastermindForm({...mastermindForm, original_price: e.target.value})} placeholder="Необязательно" />
          </div>
          <div>
            <Label>Цена со скидкой (красная, ₽)</Label>
            <Input type="number" value={mastermindForm.discount_price} onChange={(e) => setMastermindForm({...mastermindForm, discount_price: e.target.value})} placeholder="Необязательно" />
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label>Имя ведущего</Label>
            <Input value={mastermindForm.author_name} onChange={(e) => setMastermindForm({...mastermindForm, author_name: e.target.value})} placeholder="Иван Иванов" />
          </div>
          <div>
            <Label>Фото ведущего (URL)</Label>
            <Input value={mastermindForm.author_photo} onChange={(e) => setMastermindForm({...mastermindForm, author_photo: e.target.value})} placeholder="https://..." />
          </div>
        </div>
        <div>
          <Label>Программа мастермайнда</Label>
          <Textarea value={mastermindForm.event_content} onChange={(e) => setMastermindForm({...mastermindForm, event_content: e.target.value})} rows={6} placeholder="Подробное описание программы, темы, агенда..." />
        </div>
        <div className="flex gap-2">
          <Button onClick={onSubmit}>{isEditing ? 'Сохранить изменения' : 'Добавить мастермайнд'}</Button>
          <Button variant="outline" onClick={onCancel}>Отмена</Button>
        </div>
      </CardContent>
    </Card>
  );
}