import { useState, useEffect } from 'react';
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
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isPublished, setIsPublished] = useState(false);
  const [profileData, setProfileData] = useState({
    fullName: '',
    city: '',
    address: '',
    specialization: '',
    workFormats: [] as string[],
    experience: '',
    education: '',
    about: '',
    phone: '',
    telegram: '',
    whatsapp: '',
    photo: '',
    serviceDescriptions: {} as Record<string, string>,
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://functions.poehali.dev/bf27da5d-a5ee-4dc7-b5bb-fcc474598d37', {
        headers: { 'X-Authorization': `Bearer ${token}` }
      });
      
      if (response.ok) {
        const data = await response.json();
        setProfileData({
          fullName: data.full_name || '',
          city: data.city || '',
          address: data.address || '',
          specialization: (data.specializations || []).join(', '),
          workFormats: data.specializations || [],
          experience: String(data.experience_years || ''),
          education: data.education || '',
          about: data.about || '',
          phone: data.phone || '',
          telegram: data.telegram || '',
          whatsapp: '',
          photo: data.avatar_url || '',
        });
      }
    } catch (error) {
      console.error('Ошибка загрузки профиля:', error);
    } finally {
      setLoading(false);
    }
  };

  const workFormatOptions = [
    'Релакс тела',
    'Восстановительные техники',
    'Профилактика тела',
    'Для спортсменов',
    'Коррекция фигуры',
    'Работа с лицом',
    'Выезд к клиенту',
    'Прием в кабинете/салоне',
  ];

  const defaultDescriptions: Record<string, string> = {
    "Релакс тела": "Полное расслабление и снятие напряжения после интенсивного рабочего дня. Помогаю восстановить энергию, улучшить настроение и общее самочувствие.",
    "Восстановительные техники": "Индивидуальный подход к восстановлению после нагрузок. Возвращаю подвижность и помогаю вернуться к активной жизни с комфортом.",
    "Профилактика тела": "Регулярные сеансы для поддержания здоровья и хорошего самочувствия. Работаю со всем телом, помогая сохранить отличную форму на долгие годы.",
    "Для спортсменов": "Специализированные программы для тех, кто активно занимается спортом. Ускоренное восстановление, профилактика перегрузок, повышение выносливости.",
    "Коррекция фигуры": "Комплексная программа для улучшения контуров тела. Помогаю улучшить состояние кожи, вывести лишнюю жидкость и достичь желаемых форм.",
    "Работа с лицом": "Омолаживающие техники для улучшения тонуса кожи и контура лица. Естественный эффект лифтинга без каких-либо вмешательств.",
    "Выезд к клиенту": "Удобный формат для занятых людей. Привожу все необходимое оборудование. Сеанс проходит в комфортной домашней обстановке в удобное время.",
    "Прием в кабинете/салоне": "Комфортные условия для проведения сеансов в оборудованном кабинете с профессиональным столом, приятной музыкой и атмосферой."
  };

  const toggleWorkFormat = (format: string) => {
    const isRemoving = profileData.workFormats.includes(format);
    const newFormats = isRemoving
      ? profileData.workFormats.filter(f => f !== format)
      : [...profileData.workFormats, format];
    
    const newDescriptions = { ...(profileData.serviceDescriptions || {}) };
    if (!isRemoving && !newDescriptions[format]) {
      newDescriptions[format] = defaultDescriptions[format] || '';
    }
    
    setProfileData({
      ...profileData,
      workFormats: newFormats,
      serviceDescriptions: newDescriptions
    });
  };

  const updateServiceDescription = (format: string, description: string) => {
    setProfileData({
      ...profileData,
      serviceDescriptions: {
        ...(profileData.serviceDescriptions || {}),
        [format]: description
      }
    });
  };

  const handleSave = async () => {
    if (!profileData.fullName || !profileData.phone || !profileData.city) {
      toast({
        title: 'Ошибка',
        description: 'Заполните обязательные поля: имя, телефон, город',
        variant: 'destructive'
      });
      return;
    }

    setSaving(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://functions.poehali.dev/bf27da5d-a5ee-4dc7-b5bb-fcc474598d37', {
        method: 'PUT',
        headers: {
          'X-Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          full_name: profileData.fullName,
          phone: profileData.phone,
          telegram: profileData.telegram,
          city: profileData.city,
          address: profileData.address,
          experience_years: parseInt(profileData.experience) || 0,
          about: profileData.about,
          education: profileData.education,
          specializations: profileData.workFormats,
          languages: ['Русский'],
          certificates: [],
          avatar_url: profileData.photo
        })
      });
      
      if (response.ok) {
        toast({
          title: 'Профиль сохранён',
          description: 'Ваш публичный профиль успешно обновлён',
        });
        await loadProfile();
      } else {
        throw new Error('Failed to save');
      }
    } catch (error) {
      console.error('Ошибка сохранения:', error);
      toast({
        title: 'Ошибка',
        description: 'Не удалось сохранить профиль',
        variant: 'destructive'
      });
    } finally {
      setSaving(false);
    }
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

            <Card className="border-primary/20 bg-gradient-to-br from-blue-50 to-indigo-50">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center flex-shrink-0">
                    <Icon name="ShieldCheck" className="text-white" size={24} />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-xl mb-2">Верификация профиля</CardTitle>
                    <CardDescription className="text-base">
                      Получите до 4 бейджей доверия и станьте Premium-специалистом
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-3">
                  <div className="flex items-start gap-3">
                    <Icon name="Check" size={18} className="text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-sm">Больше заявок от клиентов</p>
                      <p className="text-xs text-muted-foreground">Проверенные массажисты получают на 70% больше обращений</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Icon name="Check" size={18} className="text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-sm">Приоритет в поиске</p>
                      <p className="text-xs text-muted-foreground">Ваш профиль показывается первым в каталоге</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Icon name="Check" size={18} className="text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-sm">Золотая рамка профиля</p>
                      <p className="text-xs text-muted-foreground">Premium статус при получении всех 4 бейджей</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Icon name="Check" size={18} className="text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-sm">Знак доверия</p>
                      <p className="text-xs text-muted-foreground">Бейджи подтверждают вашу квалификацию перед клиентами</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <p className="text-sm text-muted-foreground mb-4">
                    Подтвердите образование, опыт работы, личность и пройдите сертификацию Док диалог
                  </p>
                  <Button 
                    className="w-full" 
                    size="lg"
                    onClick={() => window.location.href = '/dashboard/verification'}
                  >
                    <Icon name="BadgeCheck" size={18} className="mr-2" />
                    Перейти к верификации
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end gap-4">
              <Button variant="outline" onClick={() => window.history.back()} disabled={saving}>Отмена</Button>
              <Button onClick={handleSave} disabled={saving || loading}>
                <Icon name="Save" size={18} className="mr-2" />
                {saving ? 'Сохранение...' : 'Сохранить профиль'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}