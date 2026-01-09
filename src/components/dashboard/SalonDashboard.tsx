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
        <Card className="mb-6 bg-amber-50 border-amber-200">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Icon name="Clock" className="text-amber-600" size={24} />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-amber-900 mb-2">Ожидает модерации</h3>
                <p className="text-sm text-amber-800 mb-3">
                  Ваш профиль салона находится на проверке. После успешной верификации вы появитесь в каталоге салонов 
                  и сможете получить значок "Verified". Обычно проверка занимает 1-2 рабочих дня.
                </p>
                <p className="text-xs text-amber-700 mb-4">
                  <Icon name="Info" size={14} className="inline mr-1" />
                  До верификации ваш профиль не виден другим пользователям в каталоге
                </p>
                <Button size="sm" className="bg-amber-600 hover:bg-amber-700" onClick={() => setShowForm(true)}>
                  <Icon name="Edit" size={16} className="mr-2" />
                  Заполнить профиль салона
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
            <Icon name="Briefcase" className="text-primary" size={24} />
          </div>
          <h3 className="text-xl font-semibold">Вакансии</h3>
        </div>
        <p className="text-gray-600 mb-4">Управление вакансиями салона</p>
        <Button className="w-full">Добавить вакансию</Button>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
            <Icon name="Users" className="text-primary" size={24} />
          </div>
          <h3 className="text-xl font-semibold">Команда</h3>
        </div>
        <p className="text-gray-600 mb-4">Управление персоналом</p>
        <Link to="/salons">
          <Button className="w-full" variant="outline">Мои сотрудники</Button>
        </Link>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
            <Icon name="BarChart" className="text-primary" size={24} />
          </div>
          <h3 className="text-xl font-semibold">Аналитика</h3>
        </div>
        <p className="text-gray-600 mb-4">Отчеты и статистика</p>
        <Button className="w-full" variant="outline">Отчёты</Button>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:border-primary/50 transition-colors">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
            <Icon name="Calendar" className="text-primary" size={24} />
          </div>
          <h3 className="text-xl font-semibold">Записи клиентов</h3>
        </div>
        <p className="text-gray-600 mb-4">Управление записями</p>
        <Link to="/dashboard/bookings">
          <Button className="w-full">Посмотреть записи</Button>
        </Link>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:border-primary/50 transition-colors">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center relative">
            <Icon name="MessageSquare" className="text-primary" size={24} />
            {unreadCount > 0 && (
              <Badge className="absolute -top-1 -right-1 h-5 min-w-5 flex items-center justify-center p-0 px-1.5 text-xs bg-primary border-2 border-white">
                {unreadCount}
              </Badge>
            )}
          </div>
          <h3 className="text-xl font-semibold">Сообщения</h3>
        </div>
        <p className="text-gray-600 mb-4">Чаты с клиентами</p>
        <Link to="/dashboard/messages">
          <Button className="w-full">Открыть чаты</Button>
        </Link>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:border-primary/50 transition-colors">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
            <Icon name="Star" className="text-primary" size={24} />
          </div>
          <h3 className="text-xl font-semibold">Отзывы</h3>
        </div>
        <p className="text-gray-600 mb-4">Отзывы клиентов о салоне</p>
        <Button className="w-full">Посмотреть отзывы</Button>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
            <Icon name="Search" className="text-primary" size={24} />
          </div>
          <h3 className="text-xl font-semibold">Поиск специалистов</h3>
        </div>
        <p className="text-gray-600 mb-4">Найти новых сотрудников</p>
        <Link to="/masseurs">
          <Button className="w-full" variant="outline">Найти массажиста</Button>
        </Link>
      </div>
      </div>

      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl flex items-center gap-2">
              <Icon name="Building2" className="text-primary" size={28} />
              Профиль салона
            </DialogTitle>
            <DialogDescription>
              Заполните информацию о вашем салоне для публикации в каталоге
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-base font-semibold">
                Название салона *
              </Label>
              <Input
                id="name"
                placeholder="Название вашего салона"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-base font-semibold">
                Описание салона *
              </Label>
              <Textarea
                id="description"
                placeholder="Расскажите о вашем салоне, услугах, атмосфере..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city" className="text-base font-semibold">
                  Город *
                </Label>
                <Input
                  id="city"
                  placeholder="Москва"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address" className="text-base font-semibold">
                  Адрес *
                </Label>
                <Input
                  id="address"
                  placeholder="ул. Примерная, д. 1"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-base font-semibold">
                  Телефон *
                </Label>
                <Input
                  id="phone"
                  placeholder="+7 (999) 123-45-67"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-base font-semibold">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="salon@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="website" className="text-base font-semibold">
                Сайт
              </Label>
              <Input
                id="website"
                placeholder="https://your-salon.com"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="logo_url" className="text-base font-semibold">
                Логотип (ссылка)
              </Label>
              <Input
                id="logo_url"
                placeholder="https://example.com/logo.png"
                value={formData.logo_url}
                onChange={(e) => setFormData({ ...formData, logo_url: e.target.value })}
              />
              {formData.logo_url && (
                <div className="mt-2">
                  <img src={formData.logo_url} alt="Logo preview" className="w-24 h-24 object-cover rounded-lg border" />
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-base font-semibold flex items-center gap-2">
                <Icon name="Image" size={18} />
                Фотографии салона (ссылки)
              </Label>
              <div className="flex gap-2">
                <Input
                  placeholder="https://example.com/photo.jpg"
                  value={photoInput}
                  onChange={(e) => setPhotoInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && photoInput.trim()) {
                      e.preventDefault();
                      setFormData({ ...formData, photos: [...formData.photos, photoInput.trim()] });
                      setPhotoInput('');
                    }
                  }}
                />
                <Button
                  type="button"
                  onClick={() => {
                    if (photoInput.trim()) {
                      setFormData({ ...formData, photos: [...formData.photos, photoInput.trim()] });
                      setPhotoInput('');
                    }
                  }}
                  variant="outline"
                >
                  <Icon name="Plus" size={18} />
                </Button>
              </div>
              {formData.photos.length > 0 && (
                <div className="grid grid-cols-4 gap-2 mt-3">
                  {formData.photos.map((photo, idx) => (
                    <div key={idx} className="relative group">
                      <img src={photo} alt={`Photo ${idx + 1}`} className="w-full h-24 object-cover rounded-lg border" />
                      <Button
                        size="sm"
                        variant="destructive"
                        className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 p-0"
                        onClick={() => setFormData({ ...formData, photos: formData.photos.filter((_, i) => i !== idx) })}
                      >
                        <Icon name="X" size={14} />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex gap-3 pt-4 border-t">
              <Button
                onClick={async () => {
                  if (!formData.name.trim() || !formData.description.trim() || !formData.city.trim() || !formData.address.trim() || !formData.phone.trim()) {
                    toast({
                      title: 'Заполните обязательные поля',
                      description: 'Название, описание, город, адрес и телефон обязательны',
                      variant: 'destructive'
                    });
                    return;
                  }

                  setSaving(true);
                  try {
                    const token = localStorage.getItem('token');
                    const res = await fetch(SALON_API, {
                      method: salonExists ? 'PUT' : 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                      },
                      body: JSON.stringify(formData)
                    });

                    const data = await res.json();
                    if (res.ok && data.salon) {
                      toast({ 
                        title: salonExists ? 'Профиль обновлён!' : 'Профиль салона создан!', 
                        description: salonExists ? 'Изменения сохранены' : 'Ожидайте модерацию' 
                      });
                      setShowForm(false);
                      setSalonExists(true);
                      setIsVerified(data.salon.is_verified);
                      await loadSalonStatus();
                    } else {
                      toast({ title: data.error || 'Ошибка сохранения', variant: 'destructive' });
                    }
                  } catch (error) {
                    toast({ title: 'Ошибка сервера', variant: 'destructive' });
                  } finally {
                    setSaving(false);
                  }
                }}
                disabled={saving}
                className="flex-1"
              >
                {saving ? (
                  <><Icon name="Loader2" className="animate-spin mr-2" size={18} />Сохранение...</>
                ) : (
                  <><Icon name="Save" size={18} className="mr-2" />Сохранить профиль</>
                )}
              </Button>
              <Button onClick={() => setShowForm(false)} variant="outline">
                Отмена
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}