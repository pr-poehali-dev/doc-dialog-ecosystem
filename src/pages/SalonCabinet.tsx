import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

interface Salon {
  id: number;
  user_id: number;
  name: string;
  description: string;
  logo_url: string;
  website: string;
  phone: string;
  email: string;
  city: string;
  address: string;
  is_verified: boolean;
  subscription_type: string;
  subscription_expires_at?: string;
  created_at: string;
}

interface Request {
  id: number;
  school_id: number;
  school_name: string;
  title: string;
  description: string;
  specialty: string;
  budget_from: number;
  budget_to: number;
  currency: string;
  location: string;
  deadline_date: string;
  status: string;
  created_at: string;
}

const SALON_API = 'https://functions.poehali.dev/01aa5a2f-6476-4fbc-ba10-6808960c8a21';

export default function SalonCabinet() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [salon, setSalon] = useState<Salon | null>(null);
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [creating, setCreating] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    logo_url: '',
    website: '',
    phone: '',
    email: '',
    city: '',
    address: ''
  });

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }
    loadSalon();
    loadRequests();
  }, [token, navigate]);

  const loadSalon = async () => {
    try {
      const res = await fetch(`${SALON_API}?action=salon_profile`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (res.status === 404) {
        setCreating(true);
        setLoading(false);
        return;
      }

      const data = await res.json();
      if (data.salon) {
        setSalon(data.salon);
        setFormData({
          name: data.salon.name || '',
          description: data.salon.description || '',
          logo_url: data.salon.logo_url || '',
          website: data.salon.website || '',
          phone: data.salon.phone || '',
          email: data.salon.email || '',
          city: data.salon.city || '',
          address: data.salon.address || ''
        });
      }
    } catch (error) {
      toast({ title: 'Ошибка загрузки профиля', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const loadRequests = async () => {
    try {
      const res = await fetch(`${SALON_API}?action=requests`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (res.ok) {
        const data = await res.json();
        setRequests(data.requests || []);
      }
    } catch (error) {
      console.error('Ошибка загрузки заявок:', error);
    }
  };

  const handleCreateSalon = async () => {
    if (!formData.name.trim()) {
      toast({ title: 'Введите название салона', variant: 'destructive' });
      return;
    }

    try {
      const res = await fetch(SALON_API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (res.ok && data.salon) {
        setSalon(data.salon);
        setCreating(false);
        toast({ title: 'Салон создан!' });
      } else {
        toast({ title: data.error || 'Ошибка создания', variant: 'destructive' });
      }
    } catch (error) {
      toast({ title: 'Ошибка сервера', variant: 'destructive' });
    }
  };

  const handleUpdateSalon = async () => {
    try {
      const res = await fetch(SALON_API, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (res.ok && data.salon) {
        setSalon(data.salon);
        setEditing(false);
        toast({ title: 'Профиль обновлён!' });
      } else {
        toast({ title: data.error || 'Ошибка обновления', variant: 'destructive' });
      }
    } catch (error) {
      toast({ title: 'Ошибка сервера', variant: 'destructive' });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 flex items-center justify-center">
        <Icon name="Loader2" className="animate-spin text-purple-600" size={48} />
      </div>
    );
  }

  if (creating) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 p-6">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Создание профиля салона</CardTitle>
              <CardDescription>Заполните информацию о вашем салоне красоты</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name">Название салона *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Название вашего салона"
                />
              </div>
              <div>
                <Label htmlFor="description">Описание</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Расскажите о вашем салоне"
                  rows={4}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city">Город</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="Москва"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Телефон</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+7 (999) 123-45-67"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="address">Адрес</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Улица, дом"
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="salon@example.com"
                />
              </div>
              <div>
                <Label htmlFor="website">Сайт</Label>
                <Input
                  id="website"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  placeholder="https://example.com"
                />
              </div>
              <Button onClick={handleCreateSalon} className="w-full">
                Создать профиль
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      <div className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Icon name="Sparkles" className="text-purple-600" size={28} />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Личный кабинет салона
            </h1>
          </div>
          <Button variant="outline" onClick={() => navigate('/')}>
            На главную
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="profile">Профиль</TabsTrigger>
            <TabsTrigger value="requests">
              Заявки {requests.length > 0 && `(${requests.length})`}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>{salon?.name}</CardTitle>
                  <CardDescription>Управление профилем салона</CardDescription>
                </div>
                <div className="flex gap-2">
                  {salon?.is_verified && (
                    <Badge variant="default">
                      <Icon name="CheckCircle" size={14} className="mr-1" />
                      Verified
                    </Badge>
                  )}
                  <Badge variant="outline">{salon?.subscription_type || 'free'}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                {editing ? (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="edit-name">Название салона</Label>
                      <Input
                        id="edit-name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="edit-description">Описание</Label>
                      <Textarea
                        id="edit-description"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        rows={4}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="edit-city">Город</Label>
                        <Input
                          id="edit-city"
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="edit-phone">Телефон</Label>
                        <Input
                          id="edit-phone"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="edit-address">Адрес</Label>
                      <Input
                        id="edit-address"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="edit-email">Email</Label>
                      <Input
                        id="edit-email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="edit-website">Сайт</Label>
                      <Input
                        id="edit-website"
                        value={formData.website}
                        onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={handleUpdateSalon}>Сохранить</Button>
                      <Button variant="outline" onClick={() => setEditing(false)}>
                        Отмена
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <p className="text-sm text-muted-foreground">Описание</p>
                        <p className="mt-1">{salon?.description || 'Не указано'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Город</p>
                        <p className="mt-1">{salon?.city || 'Не указан'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Адрес</p>
                        <p className="mt-1">{salon?.address || 'Не указан'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Телефон</p>
                        <p className="mt-1">{salon?.phone || 'Не указан'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Email</p>
                        <p className="mt-1">{salon?.email || 'Не указан'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Сайт</p>
                        <p className="mt-1">{salon?.website || 'Не указан'}</p>
                      </div>
                    </div>
                    <Button onClick={() => setEditing(true)}>
                      <Icon name="Edit" size={16} className="mr-2" />
                      Редактировать
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="requests">
            <div className="space-y-4">
              {requests.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <Icon name="Inbox" size={48} className="mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">Пока нет активных заявок</p>
                  </CardContent>
                </Card>
              ) : (
                requests.map((req) => (
                  <Card key={req.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle>{req.title}</CardTitle>
                          <CardDescription>
                            {req.school_name} • {req.location}
                          </CardDescription>
                        </div>
                        <Badge>{req.specialty}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm mb-4">{req.description}</p>
                      <div className="flex items-center gap-6 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Icon name="DollarSign" size={16} />
                          <span>
                            {req.budget_from.toLocaleString()} - {req.budget_to.toLocaleString()} {req.currency}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Icon name="Calendar" size={16} />
                          <span>до {new Date(req.deadline_date).toLocaleDateString('ru-RU')}</span>
                        </div>
                      </div>
                      <Button className="mt-4">
                        <Icon name="Send" size={16} className="mr-2" />
                        Откликнуться
                      </Button>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
