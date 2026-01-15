import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { useUnreadMessages } from '@/hooks/useUnreadMessages';
import { useToast } from '@/hooks/use-toast';
import VacancyForm from '@/components/dashboard/VacancyForm';

const SALON_API = 'https://functions.poehali.dev/01aa5a2f-6476-4fbc-ba10-6808960c8a21';

export default function SalonDashboard() {
  const { unreadCount } = useUnreadMessages();
  const { toast } = useToast();
  const [isVerified, setIsVerified] = useState<boolean | null>(null);
  const [salonExists, setSalonExists] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    logo_url: '',
    website: '',
    phone: '',
    email: '',
    city: '',
    address: '',
    photos: [] as string[]
  });
  const [photoInput, setPhotoInput] = useState('');
  const [showVacancyForm, setShowVacancyForm] = useState(false);

  useEffect(() => {
    loadSalonStatus();
  }, []);

  const loadSalonStatus = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const res = await fetch(`${SALON_API}?action=salon_profile`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (res.ok) {
        const data = await res.json();
        if (data.salon) {
          setSalonExists(true);
          setIsVerified(data.salon.is_verified);
          setFormData({
            name: data.salon.name || '',
            description: data.salon.description || '',
            logo_url: data.salon.logo_url || '',
            website: data.salon.website || '',
            phone: data.salon.phone || '',
            email: data.salon.email || '',
            city: data.salon.city || '',
            address: data.salon.address || '',
            photos: data.salon.photos || []
          });
        }
      } else if (res.status === 404) {
        setSalonExists(false);
      }
    } catch (error) {
      console.error('Ошибка загрузки статуса салона:', error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <>
      {!loading && isVerified === false && (
        <Card className="mb-4 md:mb-6 bg-blue-50 border-blue-200">
          <CardContent className="pt-4 md:pt-6 px-4 md:px-6">
            <div className="flex items-start gap-3 md:gap-4">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Icon name="AlertCircle" className="text-blue-600" size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-blue-900 mb-2 text-sm md:text-base">Профиль не заполнен</h3>
                <p className="text-xs md:text-sm text-blue-800 mb-3">
                  {salonExists 
                    ? 'Ваш профиль салона находится на модерации. После успешной верификации вы появитесь в каталоге салонов и сможете получить значок "Verified". Обычно проверка занимает 1-2 рабочих дня.'
                    : 'Заполните информацию о вашем салоне, чтобы отправить профиль на модерацию. После одобрения администратором вы появитесь в каталоге салонов и получите значок "Verified".'
                  }
                </p>
                <p className="text-xs text-blue-700 mb-4">
                  <Icon name="Info" size={14} className="inline mr-1" />
                  {salonExists 
                    ? 'До верификации ваш профиль не виден другим пользователям в каталоге'
                    : 'Вам нужно указать: название, описание, адрес, контакты и фотографии салона'
                  }
                </p>
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto" onClick={() => setShowForm(true)}>
                  <Icon name="Edit" size={16} className="mr-2" />
                  {salonExists ? 'Редактировать профиль' : 'Заполнить профиль салона'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {!loading && isVerified === true && (
        <Card className="mb-4 md:mb-6 bg-green-50 border-green-200">
          <CardContent className="pt-4 md:pt-6 px-4 md:px-6">
            <div className="flex items-start gap-3 md:gap-4">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Icon name="CheckCircle" className="text-green-600" size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-green-900 mb-2 text-sm md:text-base">Профиль верифицирован</h3>
                <p className="text-xs md:text-sm text-green-800 mb-3">
                  Ваш салон прошел модерацию и доступен в каталоге. Вы можете редактировать информацию о салоне в любое время.
                </p>
                <Button size="sm" className="bg-green-600 hover:bg-green-700 w-full sm:w-auto" onClick={() => setShowForm(true)}>
                  <Icon name="Edit" size={16} className="mr-2" />
                  Редактировать профиль салона
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm border border-gray-100">
        <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
            <Icon name="Settings" className="text-primary" size={20} />
          </div>
          <h3 className="text-lg md:text-xl font-semibold">Профиль салона</h3>
        </div>
        <p className="text-sm md:text-base text-gray-600 mb-3 md:mb-4">Редактировать информацию о салоне</p>
        <Button className="w-full" onClick={() => setShowForm(true)}>
          <Icon name="Edit" size={16} className="mr-2" />
          Редактировать профиль
        </Button>
      </div>

      <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm border border-gray-100">
        <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
            <Icon name="Briefcase" className="text-primary" size={20} />
          </div>
          <h3 className="text-lg md:text-xl font-semibold">Вакансии</h3>
        </div>
        <p className="text-sm md:text-base text-gray-600 mb-3 md:mb-4">Управление вакансиями салона</p>
        <Button className="w-full" onClick={() => setShowVacancyForm(true)}>Добавить вакансию</Button>
      </div>

      <div className="relative bg-gradient-to-br from-primary/5 via-white to-primary/10 rounded-xl p-4 md:p-6 shadow-lg border-2 border-primary/30 hover:border-primary/60 transition-all hover:shadow-xl">
        <div className="absolute -top-3 -right-3 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
          Premium
        </div>
        <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
            <Icon name="Wrench" className="text-white" size={20} />
          </div>
          <h3 className="text-lg md:text-xl font-semibold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">Инструменты</h3>
        </div>
        <p className="text-sm md:text-base text-gray-700 mb-3 md:mb-4 font-medium">Полезные инструменты для автоматизации работы</p>
        <Link to="/dashboard/tools">
          <Button className="w-full shadow-md">Открыть инструменты</Button>
        </Link>
      </div>

      <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm border border-gray-100">
        <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
            <Icon name="Store" className="text-primary" size={20} />
          </div>
          <h3 className="text-lg md:text-xl font-semibold">Каталог салонов</h3>
        </div>
        <p className="text-sm md:text-base text-gray-600 mb-3 md:mb-4">Смотреть салоны в каталоге</p>
        <Link to="/salons">
          <Button className="w-full">Перейти в каталог</Button>
        </Link>
      </div>

      <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm border border-gray-100">
        <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
            <Icon name="BarChart" className="text-primary" size={20} />
          </div>
          <h3 className="text-lg md:text-xl font-semibold">Аналитика</h3>
        </div>
        <p className="text-sm md:text-base text-gray-600 mb-3 md:mb-4">Отчеты и статистика</p>
        <Button className="w-full">Отчёты</Button>
      </div>

      <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm border border-gray-100 hover:border-primary/50 transition-colors">
        <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
            <Icon name="Calendar" className="text-primary" size={20} />
          </div>
          <h3 className="text-lg md:text-xl font-semibold">Записи клиентов</h3>
        </div>
        <p className="text-sm md:text-base text-gray-600 mb-3 md:mb-4">Управление записями</p>
        <Link to="/dashboard/bookings">
          <Button className="w-full">Посмотреть записи</Button>
        </Link>
      </div>

      <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm border border-gray-100 hover:border-primary/50 transition-colors">
        <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 relative">
            <Icon name="MessageSquare" className="text-primary" size={20} />
            {unreadCount > 0 && (
              <Badge className="absolute -top-1 -right-1 h-5 min-w-5 flex items-center justify-center p-0 px-1.5 text-xs bg-primary border-2 border-white">
                {unreadCount}
              </Badge>
            )}
          </div>
          <h3 className="text-lg md:text-xl font-semibold">Сообщения</h3>
        </div>
        <p className="text-sm md:text-base text-gray-600 mb-3 md:mb-4">Чаты с клиентами</p>
        <Link to="/dashboard/messages">
          <Button className="w-full">Открыть чаты</Button>
        </Link>
      </div>

      <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm border border-gray-100 hover:border-primary/50 transition-colors">
        <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
            <Icon name="Star" className="text-primary" size={20} />
          </div>
          <h3 className="text-lg md:text-xl font-semibold">Отзывы</h3>
        </div>
        <p className="text-sm md:text-base text-gray-600 mb-3 md:mb-4">Отзывы клиентов о салоне</p>
        <Button className="w-full">Посмотреть отзывы</Button>
      </div>

      <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm border border-gray-100 hover:border-primary/50 transition-colors">
        <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
            <Icon name="BookOpen" className="text-primary" size={20} />
          </div>
          <h3 className="text-lg md:text-xl font-semibold">База знаний</h3>
        </div>
        <p className="text-sm md:text-base text-gray-600 mb-3 md:mb-4">Инструкции и ответы на вопросы</p>
        <Link to="/dashboard/knowledge-base">
          <Button className="w-full" variant="outline">Открыть базу знаний</Button>
        </Link>
      </div>

      <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm border border-gray-100 hover:border-primary/50 transition-colors">
        <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
            <Icon name="Settings" className="text-primary" size={20} />
          </div>
          <h3 className="text-lg md:text-xl font-semibold">Настройки аккаунта</h3>
        </div>
        <p className="text-sm md:text-base text-gray-600 mb-3 md:mb-4">Смена пароля и безопасность</p>
        <Link to="/dashboard/account-settings">
          <Button className="w-full">Открыть настройки</Button>
        </Link>
      </div>
    </div>

      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{salonExists ? 'Редактировать профиль салона' : 'Создать профиль салона'}</DialogTitle>
            <DialogDescription>
              {salonExists 
                ? 'Обновите информацию о вашем салоне. Изменения будут отправлены на повторную модерацию.'
                : 'Заполните информацию о салоне. После отправки профиль будет рассмотрен администратором.'
              }
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Название салона *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="Например: Салон массажа «Релакс»"
              />
            </div>

            <div>
              <Label htmlFor="description">Описание *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="Расскажите о вашем салоне, услугах, специализации..."
                rows={4}
              />
            </div>

            <div>
              <Label htmlFor="city">Город *</Label>
              <Input
                id="city"
                value={formData.city}
                onChange={(e) => setFormData({...formData, city: e.target.value})}
                placeholder="Например: Москва"
              />
            </div>

            <div>
              <Label htmlFor="address">Адрес *</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
                placeholder="Например: ул. Ленина, д. 10"
              />
            </div>

            <div>
              <Label htmlFor="phone">Телефон *</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                placeholder="+7 (999) 123-45-67"
              />
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder="salon@example.com"
              />
            </div>

            <div>
              <Label htmlFor="website">Сайт</Label>
              <Input
                id="website"
                value={formData.website}
                onChange={(e) => setFormData({...formData, website: e.target.value})}
                placeholder="https://example.com"
              />
            </div>

            <div>
              <Label htmlFor="logo_url">URL логотипа</Label>
              <Input
                id="logo_url"
                value={formData.logo_url}
                onChange={(e) => setFormData({...formData, logo_url: e.target.value})}
                placeholder="https://example.com/logo.png"
              />
            </div>

            <div>
              <Label>Фотографии салона</Label>
              <div className="space-y-2">
                <div className="flex gap-2">
                  <Input
                    value={photoInput}
                    onChange={(e) => setPhotoInput(e.target.value)}
                    placeholder="URL фотографии"
                  />
                  <Button
                    type="button"
                    onClick={() => {
                      if (photoInput.trim()) {
                        setFormData({...formData, photos: [...formData.photos, photoInput.trim()]});
                        setPhotoInput('');
                      }
                    }}
                  >
                    Добавить
                  </Button>
                </div>
                {formData.photos.length > 0 && (
                  <div className="space-y-1">
                    {formData.photos.map((photo, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <span className="flex-1 truncate">{photo}</span>
                        <Button
                          type="button"
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            setFormData({
                              ...formData,
                              photos: formData.photos.filter((_, i) => i !== index)
                            });
                          }}
                        >
                          Удалить
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-2 pt-4">
              <Button
                onClick={async () => {
                  if (!formData.name || !formData.description || !formData.city || !formData.address || !formData.phone) {
                    toast({
                      title: 'Ошибка',
                      description: 'Заполните все обязательные поля',
                      variant: 'destructive',
                    });
                    return;
                  }

                  setSaving(true);
                  try {
                    const token = localStorage.getItem('token');
                    const res = await fetch(`${SALON_API}?action=update_salon`, {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                      },
                      body: JSON.stringify(formData)
                    });

                    if (res.ok) {
                      toast({
                        title: 'Успешно',
                        description: salonExists 
                          ? 'Профиль обновлен и отправлен на модерацию'
                          : 'Профиль создан и отправлен на модерацию',
                      });
                      setShowForm(false);
                      loadSalonStatus();
                    } else {
                      const error = await res.json();
                      toast({
                        title: 'Ошибка',
                        description: error.error || 'Не удалось сохранить профиль',
                        variant: 'destructive',
                      });
                    }
                  } catch (error) {
                    toast({
                      title: 'Ошибка',
                      description: 'Произошла ошибка при сохранении',
                      variant: 'destructive',
                    });
                  } finally {
                    setSaving(false);
                  }
                }}
                disabled={saving}
              >
                {saving ? 'Сохранение...' : (salonExists ? 'Обновить профиль' : 'Создать профиль')}
              </Button>
              <Button variant="outline" onClick={() => setShowForm(false)}>
                Отмена
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <VacancyForm
        isOpen={showVacancyForm}
        onClose={() => setShowVacancyForm(false)}
        salonName={formData.name}
      />
    </>
  );
}