import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface SpecialistFormProps {
  specialistForm: {
    title: string;
    description: string;
    specialty: string;
    budget_from: string;
    budget_to: string;
    location: string;
    deadline_date: string;
  };
  setSpecialistForm: React.Dispatch<React.SetStateAction<{
    title: string;
    description: string;
    specialty: string;
    budget_from: string;
    budget_to: string;
    location: string;
    deadline_date: string;
  }>>;
  onSubmit: () => void;
  onCancel: () => void;
}

export default function SpecialistForm({ specialistForm, setSpecialistForm, onSubmit, onCancel }: SpecialistFormProps) {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Найти специалиста</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label>Название вакансии*</Label>
          <Input value={specialistForm.title} onChange={(e) => setSpecialistForm({...specialistForm, title: e.target.value})} placeholder="Требуется видеооператор" />
        </div>
        <div>
          <Label>Описание*</Label>
          <Textarea value={specialistForm.description} onChange={(e) => setSpecialistForm({...specialistForm, description: e.target.value})} rows={4} placeholder="Подробное описание требований..." />
        </div>
        <div>
          <Label>Специализация*</Label>
          <select value={specialistForm.specialty} onChange={(e) => setSpecialistForm({...specialistForm, specialty: e.target.value})} className="w-full px-3 py-2 border rounded-md">
            <option>Видеооператор</option>
            <option>Фотограф</option>
            <option>Монтажер</option>
            <option>Дизайнер</option>
            <option>Копирайтер</option>
            <option>SMM-специалист</option>
            <option>Другое</option>
          </select>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label>Бюджет от (₽)</Label>
            <Input type="number" value={specialistForm.budget_from} onChange={(e) => setSpecialistForm({...specialistForm, budget_from: e.target.value})} />
          </div>
          <div>
            <Label>Бюджет до (₽)</Label>
            <Input type="number" value={specialistForm.budget_to} onChange={(e) => setSpecialistForm({...specialistForm, budget_to: e.target.value})} />
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label>Город</Label>
            <Input value={specialistForm.location} onChange={(e) => setSpecialistForm({...specialistForm, location: e.target.value})} placeholder="Москва" />
          </div>
          <div>
            <Label>Срок до</Label>
            <Input type="date" value={specialistForm.deadline_date} onChange={(e) => setSpecialistForm({...specialistForm, deadline_date: e.target.value})} />
          </div>
        </div>
        <div className="flex gap-2">
          <Button onClick={onSubmit}>Опубликовать</Button>
          <Button variant="outline" onClick={onCancel}>Отмена</Button>
        </div>
      </CardContent>
    </Card>
  );
}
