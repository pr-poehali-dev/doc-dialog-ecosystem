import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { AnamnesisFormData } from '../AnamnesisTool';

interface AnamnesisMedicalHistoryCardProps {
  formData: AnamnesisFormData;
  onChange: (field: keyof AnamnesisFormData, value: string) => void;
}

export default function AnamnesisMedicalHistoryCard({ formData, onChange }: AnamnesisMedicalHistoryCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Медицинская история</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="chronicDiseases">Хронические заболевания</Label>
          <Textarea
            id="chronicDiseases"
            value={formData.chronicDiseases}
            onChange={(e) => onChange('chronicDiseases', e.target.value)}
            placeholder="Гипертония, диабет, артрит..."
            rows={2}
          />
        </div>
        <div>
          <Label htmlFor="medications">Принимаемые препараты</Label>
          <Textarea
            id="medications"
            value={formData.medications}
            onChange={(e) => onChange('medications', e.target.value)}
            placeholder="Названия препаратов и дозировки..."
            rows={2}
          />
        </div>
        <div>
          <Label htmlFor="injuries">Травмы в анамнезе</Label>
          <Textarea
            id="injuries"
            value={formData.injuries}
            onChange={(e) => onChange('injuries', e.target.value)}
            placeholder="Переломы, вывихи, растяжения..."
            rows={2}
          />
        </div>
        <div>
          <Label htmlFor="surgeries">Операции</Label>
          <Textarea
            id="surgeries"
            value={formData.surgeries}
            onChange={(e) => onChange('surgeries', e.target.value)}
            placeholder="Перенесённые операции..."
            rows={2}
          />
        </div>
      </CardContent>
    </Card>
  );
}
