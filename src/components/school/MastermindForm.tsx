import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface MastermindFormProps {
  mastermindForm: {
    title: string;
    description: string;
    event_date: string;
    location: string;
    max_participants: string;
    price: string;
    image_url: string;
    external_url: string;
  };
  setMastermindForm: React.Dispatch<React.SetStateAction<{
    title: string;
    description: string;
    event_date: string;
    location: string;
    max_participants: string;
    price: string;
    image_url: string;
    external_url: string;
  }>>;
  onSubmit: () => void;
  onCancel: () => void;
}

export default function MastermindForm({ mastermindForm, setMastermindForm, onSubmit, onCancel }: MastermindFormProps) {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Добавить мастермайнд</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label>Название*</Label>
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
          <Input value={mastermindForm.external_url} onChange={(e) => setMastermindForm({...mastermindForm, external_url: e.target.value})} placeholder="https://..." />
        </div>
        <div className="flex gap-2">
          <Button onClick={onSubmit}>Добавить мастермайнд</Button>
          <Button variant="outline" onClick={onCancel}>Отмена</Button>
        </div>
      </CardContent>
    </Card>
  );
}
