import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface ProfileData {
  fullName: string;
  city: string;
  address: string;
  specialization: string;
  workFormats: string[];
  experience: string;
  education: string;
  about: string;
  phone: string;
  telegram: string;
  whatsapp: string;
  photo: string;
  serviceDescriptions: Record<string, string>;
}

interface ProfileWorkFormatsProps {
  profileData: ProfileData;
  setProfileData: (data: ProfileData) => void;
  workFormatOptions: string[];
  defaultDescriptions: Record<string, string>;
  toggleWorkFormat: (format: string) => void;
  updateServiceDescription: (format: string, description: string) => void;
}

export default function ProfileWorkFormats({ 
  profileData, 
  workFormatOptions,
  defaultDescriptions,
  toggleWorkFormat,
  updateServiceDescription
}: ProfileWorkFormatsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Форматы работы и услуги</CardTitle>
        <CardDescription>Выберите услуги и отредактируйте описания</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {workFormatOptions.map((format) => (
            <Badge
              key={format}
              variant={profileData.workFormats.includes(format) ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => toggleWorkFormat(format)}
            >
              {format}
            </Badge>
          ))}
        </div>

        {profileData.workFormats.length > 0 && (
          <div className="mt-6 space-y-4">
            <div className="text-sm font-medium text-muted-foreground mb-2">
              Описания выбранных услуг (будут видны клиентам)
            </div>
            {profileData.workFormats.map((format) => (
              <div key={format} className="space-y-2 p-4 border rounded-lg bg-secondary/30">
                <Label className="flex items-center gap-2">
                  <Icon name="FileText" size={16} />
                  {format}
                </Label>
                <Textarea
                  placeholder="Описание услуги для клиентов"
                  value={(profileData.serviceDescriptions && profileData.serviceDescriptions[format]) || defaultDescriptions[format] || ''}
                  onChange={(e) => updateServiceDescription(format, e.target.value)}
                  rows={3}
                  className="text-sm"
                />
                <div className="text-xs text-muted-foreground">
                  {((profileData.serviceDescriptions && profileData.serviceDescriptions[format]) || defaultDescriptions[format] || '').length} символов
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
