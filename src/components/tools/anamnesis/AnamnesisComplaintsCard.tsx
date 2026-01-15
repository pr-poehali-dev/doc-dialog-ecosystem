import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { AnamnesisFormData } from '../AnamnesisTool';

interface AnamnesisComplaintsCardProps {
  formData: AnamnesisFormData;
  onChange: (field: keyof AnamnesisFormData, value: string) => void;
}

export default function AnamnesisComplaintsCard({ formData, onChange }: AnamnesisComplaintsCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Жалобы и симптомы</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="mainComplaint">Основная жалоба *</Label>
          <Textarea
            id="mainComplaint"
            value={formData.mainComplaint}
            onChange={(e) => onChange('mainComplaint', e.target.value)}
            placeholder="Опишите основную проблему клиента..."
            rows={3}
          />
        </div>
        <div>
          <Label htmlFor="complaintDuration">Как давно беспокоит</Label>
          <Input
            id="complaintDuration"
            value={formData.complaintDuration}
            onChange={(e) => onChange('complaintDuration', e.target.value)}
            placeholder="2 недели / 3 месяца / 1 год"
          />
        </div>
        <div>
          <Label htmlFor="painLocation">Локализация боли/дискомфорта</Label>
          <Input
            id="painLocation"
            value={formData.painLocation}
            onChange={(e) => onChange('painLocation', e.target.value)}
            placeholder="Поясница, шея, плечи..."
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="painIntensity">Интенсивность боли (1-10)</Label>
            <Input
              id="painIntensity"
              type="number"
              min="1"
              max="10"
              value={formData.painIntensity}
              onChange={(e) => onChange('painIntensity', e.target.value)}
              placeholder="5"
            />
          </div>
          <div>
            <Label htmlFor="painCharacter">Характер боли</Label>
            <Input
              id="painCharacter"
              value={formData.painCharacter}
              onChange={(e) => onChange('painCharacter', e.target.value)}
              placeholder="Острая, тупая, ноющая..."
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
