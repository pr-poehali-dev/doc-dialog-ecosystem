import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

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

interface ProfileBasicInfoProps {
  profileData: ProfileData;
  setProfileData: (data: ProfileData) => void;
}

export default function ProfileBasicInfo({ profileData, setProfileData }: ProfileBasicInfoProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Основная информация</CardTitle>
        <CardDescription>Заполните данные о себе как о специалисте</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Фото профиля</Label>
          <div className="flex items-center gap-4">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white text-3xl overflow-hidden">
              {profileData.photo ? (
                <img src={profileData.photo} alt="Аватар" className="w-full h-full object-cover" />
              ) : (
                <span>{profileData.fullName.charAt(0) || 'М'}</span>
              )}
            </div>
            <div className="flex-1">
              <Input
                type="url"
                placeholder="Ссылка на фото (https://...)"
                value={profileData.photo}
                onChange={(e) => setProfileData({ ...profileData, photo: e.target.value })}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Загрузите фото в облако и вставьте прямую ссылку
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Полное имя</Label>
            <Input
              placeholder="Иван Иванов"
              value={profileData.fullName}
              onChange={(e) => setProfileData({ ...profileData, fullName: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label>Город</Label>
            <Input
              placeholder="Москва"
              value={profileData.city}
              onChange={(e) => setProfileData({ ...profileData, city: e.target.value })}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Адрес приёма</Label>
          <Input
            placeholder="ул. Пушкина, д. 10, офис 5"
            value={profileData.address}
            onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
          />
          <p className="text-xs text-muted-foreground">
            💡 Укажите полный адрес для показа на Яндекс.Картах
          </p>
        </div>

        <div className="space-y-2">
          <Label>Специализация</Label>
          <Input
            placeholder="Классический массаж, релаксация"
            value={profileData.specialization}
            onChange={(e) => setProfileData({ ...profileData, specialization: e.target.value })}
          />
          <p className="text-xs text-muted-foreground">
            ⚠️ Используйте формулировки: "оздоровительные практики", "релакс", "восстановление" (не медицинские услуги)
          </p>
        </div>

        <div className="space-y-2">
          <Label>Опыт работы</Label>
          <Input
            placeholder="5 лет"
            value={profileData.experience}
            onChange={(e) => setProfileData({ ...profileData, experience: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label>Образование</Label>
          <Textarea
            placeholder="Укажите пройденные курсы и образование"
            value={profileData.education}
            onChange={(e) => setProfileData({ ...profileData, education: e.target.value })}
            rows={3}
          />
        </div>

        <div className="space-y-2">
          <Label>О себе</Label>
          <Textarea
            placeholder="Расскажите о своём подходе к работе"
            value={profileData.about}
            onChange={(e) => setProfileData({ ...profileData, about: e.target.value })}
            rows={4}
          />
        </div>
      </CardContent>
    </Card>
  );
}
