import { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

export default function PublicProfile() {
  const { toast } = useToast();
  const [isPublished, setIsPublished] = useState(false);
  const [profileData, setProfileData] = useState({
    fullName: '',
    city: '',
    specialization: '',
    workFormats: [] as string[],
    experience: '',
    education: '',
    about: '',
    phone: '',
    telegram: '',
    whatsapp: '',
    photo: '',
  });

  const workFormatOptions = [
    'Релаксационный массаж',
    'Восстановительный массаж',
    'Профилактический массаж',
    'Спортивный массаж',
    'Антицеллюлитный массаж',
    'Выездной массаж',
    'Массаж в салоне',
  ];

  const toggleWorkFormat = (format: string) => {
    setProfileData({
      ...profileData,
      workFormats: profileData.workFormats.includes(format)
        ? profileData.workFormats.filter(f => f !== format)
        : [...profileData.workFormats, format]
    });
  };

  const handleSave = () => {
    toast({
      title: "Профиль сохранён",
      description: "Ваш публичный профиль успешно обновлён",
    });
  };

  const copyProfileLink = () => {
    const link = `https://dokdialog.ru/masseur/${profileData.fullName.toLowerCase().replace(/\s+/g, '-')}`;
    navigator.clipboard.writeText(link);
    toast({
      title: "Ссылка скопирована",
      description: "Поделитесь ей в соцсетях или мессенджерах",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <Button variant="ghost" onClick={() => window.history.back()}>
              <Icon name="ArrowLeft" size={20} />
            </Button>
            <div>
              <h1 className="text-3xl font-bold">Публичный профиль</h1>
              <p className="text-muted-foreground">Ваша профессиональная страница для клиентов</p>
            </div>
          </div>

          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Видимость профиля</CardTitle>
                    <CardDescription>Показывать профиль в каталоге специалистов</CardDescription>
                  </div>
                  <Switch checked={isPublished} onCheckedChange={setIsPublished} />
                </div>
              </CardHeader>
              {isPublished && (
                <CardContent>
                  <div className="flex items-center gap-4 p-4 bg-primary/5 rounded-lg">
                    <Icon name="Globe" className="text-primary" size={24} />
                    <div className="flex-1">
                      <p className="font-medium">Ваша страница опубликована</p>
                      <p className="text-sm text-muted-foreground">Клиенты могут найти вас в каталоге</p>
                    </div>
                    <Button onClick={copyProfileLink} variant="outline" size="sm">
                      <Icon name="Copy" size={16} className="mr-2" />
                      Копировать ссылку
                    </Button>
                  </div>
                </CardContent>
              )}
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Основная информация</CardTitle>
                <CardDescription>Заполните данные о себе как о специалисте</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
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
                  <Label>Специализация</Label>
                  <Input
                    placeholder="Оздоровительный массаж, релаксация"
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

            <Card>
              <CardHeader>
                <CardTitle>Форматы работы</CardTitle>
                <CardDescription>Выберите, какие услуги вы предоставляете</CardDescription>
              </CardHeader>
              <CardContent>
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
              </CardContent>
            </Card>

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
              </CardContent>
            </Card>

            <Card className="border-primary/20 bg-primary/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="ShieldCheck" className="text-primary" size={24} />
                  Верификация профиля
                </CardTitle>
                <CardDescription>Подтвердите образование и получите бейдж доверия</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-background rounded-full flex items-center justify-center">
                    <Icon name="Award" className="text-primary" size={24} />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Подтверждение от школы</p>
                    <p className="text-sm text-muted-foreground">Запросите подтверждение у школы, где обучались</p>
                  </div>
                  <Button variant="outline">Запросить</Button>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-background rounded-full flex items-center justify-center">
                    <Icon name="FileText" className="text-primary" size={24} />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Загрузить сертификаты</p>
                    <p className="text-sm text-muted-foreground">Прикрепите документы об образовании</p>
                  </div>
                  <Button variant="outline">Загрузить</Button>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end gap-4">
              <Button variant="outline" onClick={() => window.history.back()}>Отмена</Button>
              <Button onClick={handleSave}>
                <Icon name="Save" size={18} className="mr-2" />
                Сохранить профиль
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
