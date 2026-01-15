import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { AnamnesisFormData } from '../AnamnesisTool';

interface AnamnesisLifestyleCardProps {
  formData: AnamnesisFormData;
  onChange: (field: keyof AnamnesisFormData, value: string) => void;
}

export default function AnamnesisLifestyleCard({ formData, onChange }: AnamnesisLifestyleCardProps) {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Образ жизни</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="lifestyle">Профессия / Образ жизни</Label>
            <Input
              id="lifestyle"
              value={formData.lifestyle}
              onChange={(e) => onChange('lifestyle', e.target.value)}
              placeholder="Офисная работа, физический труд..."
            />
          </div>
          <div>
            <Label htmlFor="physicalActivity">Физическая активность</Label>
            <Textarea
              id="physicalActivity"
              value={formData.physicalActivity}
              onChange={(e) => onChange('physicalActivity', e.target.value)}
              placeholder="Спорт, фитнес, прогулки..."
              rows={2}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="sleep">Качество сна</Label>
              <Input
                id="sleep"
                value={formData.sleep}
                onChange={(e) => onChange('sleep', e.target.value)}
                placeholder="Хорошее / Плохое / Бессонница"
              />
            </div>
            <div>
              <Label htmlFor="stress">Уровень стресса</Label>
              <Input
                id="stress"
                value={formData.stress}
                onChange={(e) => onChange('stress', e.target.value)}
                placeholder="Низкий / Средний / Высокий"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Цели и ограничения</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="goals">Цели клиента</Label>
            <Textarea
              id="goals"
              value={formData.goals}
              onChange={(e) => onChange('goals', e.target.value)}
              placeholder="Убрать боль, улучшить осанку, расслабиться..."
              rows={2}
            />
          </div>
          <div>
            <Label htmlFor="contraindications">Противопоказания</Label>
            <Textarea
              id="contraindications"
              value={formData.contraindications}
              onChange={(e) => onChange('contraindications', e.target.value)}
              placeholder="Известные противопоказания к массажу..."
              rows={2}
            />
          </div>
          <div>
            <Label htmlFor="additionalInfo">Дополнительная информация</Label>
            <Textarea
              id="additionalInfo"
              value={formData.additionalInfo}
              onChange={(e) => onChange('additionalInfo', e.target.value)}
              placeholder="Любая другая важная информация..."
              rows={3}
            />
          </div>
        </CardContent>
      </Card>
    </>
  );
}
