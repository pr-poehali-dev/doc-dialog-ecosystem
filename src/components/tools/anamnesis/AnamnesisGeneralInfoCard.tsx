import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { AnamnesisFormData } from '../AnamnesisTool';

interface AnamnesisGeneralInfoCardProps {
  formData: AnamnesisFormData;
  onChange: (field: keyof AnamnesisFormData, value: string) => void;
}

export default function AnamnesisGeneralInfoCard({ formData, onChange }: AnamnesisGeneralInfoCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Общая информация</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="fullName">ФИО клиента *</Label>
          <Input
            id="fullName"
            value={formData.fullName}
            onChange={(e) => onChange('fullName', e.target.value)}
            placeholder="Иванов Иван Иванович"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="age">Возраст *</Label>
            <Input
              id="age"
              type="number"
              value={formData.age}
              onChange={(e) => onChange('age', e.target.value)}
              placeholder="35"
            />
          </div>
          <div>
            <Label htmlFor="gender">Пол</Label>
            <Select value={formData.gender} onValueChange={(val) => onChange('gender', val)}>
              <SelectTrigger>
                <SelectValue placeholder="Выберите" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Мужской</SelectItem>
                <SelectItem value="female">Женский</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
