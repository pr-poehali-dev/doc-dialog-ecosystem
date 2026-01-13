import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import SalonCreationForm from '@/components/salon/SalonCreationForm';
import SalonProfileForm from '@/components/salon/SalonProfileForm';
import SalonProfileView from '@/components/salon/SalonProfileView';
import SalonRequestsList from '@/components/salon/SalonRequestsList';

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
  photos: string[];
  is_verified: boolean;
  subscription_type: string;
  subscription_expires_at?: string;
  created_at: string;
}

interface Vacancy {
  id?: number;
  specializations: string[];
  schedule: string;
  salary_from: number | null;
  salary_to: number | null;
  salary_currency: string;
  requirements: string;
  requires_partner_courses: boolean;
  is_active?: boolean;
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
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [creating, setCreating] = useState(false);
  const [unreadCount, setUnreadCount] = useState<number>(0);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    logo_url: '',
    website: '',
    phone: '',
    email: '',
    city: '',
    address: '',
    photos: [] as string[],
    vacancies: [] as Vacancy[]
  });
  
  const [photoInput, setPhotoInput] = useState('');

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }
    loadSalon();
    loadRequests();
    loadUnreadCount();
  }, [token, navigate]);

  const loadUnreadCount = async () => {
    try {
      if (!token) return;

      const response = await fetch('https://functions.poehali.dev/04d0b538-1cf5-4941-9c06-8d1bef5854ec?action=get-chats', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        const total = data.chats?.reduce((sum: number, chat: any) => sum + (chat.unread_count || 0), 0) || 0;
        setUnreadCount(total);
      }
    } catch (error) {
      console.error('Error loading unread count:', error);
    }
  };

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
        setVacancies(data.vacancies || []);
        setFormData({
          name: data.salon.name || '',
          description: data.salon.description || '',
          logo_url: data.salon.logo_url || '',
          website: data.salon.website || '',
          phone: data.salon.phone || '',
          email: data.salon.email || '',
          city: data.salon.city || '',
          address: data.salon.address || '',
          photos: data.salon.photos || [],
          vacancies: data.vacancies || []
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
        setVacancies(formData.vacancies);
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
      <SalonCreationForm
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleCreateSalon}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      <div className="bg-gradient-to-r from-pink-600 to-purple-600 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">
              Личный кабинет салона
            </h1>
          </div>
          <Button variant="secondary" onClick={() => navigate('/')}>
            На главную
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {!salon?.is_verified && salon && (
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
                  <p className="text-xs text-amber-700">
                    <Icon name="Info" size={14} className="inline mr-1" />
                    До верификации ваш профиль не виден другим пользователям в каталоге
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="mb-6 flex gap-4">
          <Button onClick={() => navigate('/dashboard/messages')} size="lg" className="relative">
            <Icon name="MessageSquare" size={20} className="mr-2" />
            Сообщения
            {unreadCount > 0 && (
              <Badge className="absolute -top-2 -right-2 bg-red-500 text-white min-w-[20px] h-5 flex items-center justify-center px-1.5 text-xs">
                {unreadCount}
              </Badge>
            )}
          </Button>
          <Button onClick={() => navigate('/masseurs')} variant="outline" size="lg">
            <Icon name="Search" size={20} className="mr-2" />
            Найти массажистов
          </Button>
        </div>

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
                  <SalonProfileForm
                    formData={formData}
                    photoInput={photoInput}
                    setFormData={setFormData}
                    setPhotoInput={setPhotoInput}
                    onSubmit={handleUpdateSalon}
                    onCancel={() => setEditing(false)}
                  />
                ) : (
                  <SalonProfileView
                    salon={salon}
                    vacancies={vacancies}
                    onEdit={() => setEditing(true)}
                  />
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="requests">
            <SalonRequestsList requests={requests} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}