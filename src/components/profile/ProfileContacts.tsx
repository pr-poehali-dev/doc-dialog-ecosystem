import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

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
  max_messenger: string;
  inn: string;
  photo: string;
  serviceDescriptions: Record<string, string>;
}

interface ProfileContactsProps {
  profileData: ProfileData;
  setProfileData: (data: ProfileData) => void;
}

export default function ProfileContacts({ profileData, setProfileData }: ProfileContactsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Контакты</CardTitle>
        <CardDescription>Как клиенты могут с вами связаться</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Телефон</Label>
          <Input
            placeholder="+7 (999) 123-45-67"
            value={profileData.phone}
            onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label>Telegram</Label>
          <Input
            placeholder="@username"
            value={profileData.telegram}
            onChange={(e) => setProfileData({ ...profileData, telegram: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label>WhatsApp</Label>
          <Input
            placeholder="+7 (999) 123-45-67"
            value={profileData.whatsapp}
            onChange={(e) => setProfileData({ ...profileData, whatsapp: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label>MAX мессенджер</Label>
          <Input
            placeholder="+7 (999) 123-45-67"
            value={profileData.max_messenger}
            onChange={(e) => setProfileData({ ...profileData, max_messenger: e.target.value })}
          />
          <p className="text-xs text-muted-foreground">
            Будет отображаться на лендинге как кнопка MAX
          </p>
        </div>
        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            ИНН
            <span className="text-red-500">*</span>
          </Label>
          <Input
            placeholder="123456789012"
            value={profileData.inn}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, '').slice(0, 12);
              setProfileData({ ...profileData, inn: value });
            }}
            maxLength={12}
          />
          <p className="text-xs text-amber-600 font-medium">
            ⚠️ Обязательно для публикации лендинга. Без ИНН опубликовать лендинг нельзя.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}