import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import ProfileBasicInfo from '@/components/profile/ProfileBasicInfo';
import ProfileWorkFormats from '@/components/profile/ProfileWorkFormats';
import ProfileContacts from '@/components/profile/ProfileContacts';
import ProfileVerificationCard from '@/components/profile/ProfileVerificationCard';

export default function PublicProfile() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [isPublished, setIsPublished] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
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
          serviceDescriptions: data.service_descriptions || {},
        });
        setIsVisible(data.is_visible !== false);
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

  const handleDeleteAccount = async () => {
    setDeleting(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://functions.poehali.dev/049813c7-cf1a-4ff1-93bc-af749304eb0d?action=delete-account', {
        method: 'DELETE',
        headers: {
          'X-Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('userRole');
        
        toast({
          title: 'Аккаунт удалён',
          description: 'Ваш аккаунт успешно удалён из системы'
        });
        
        navigate('/');
      } else {
        const data = await response.json();
        toast({
          title: 'Ошибка',
          description: data.error || 'Не удалось удалить аккаунт',
          variant: 'destructive'
        });
      }
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось подключиться к серверу',
        variant: 'destructive'
      });
    } finally {
      setDeleting(false);
    }
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
          avatar_url: profileData.photo,
          service_descriptions: profileData.serviceDescriptions
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

  const toggleVisibility = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://functions.poehali.dev/bf27da5d-a5ee-4dc7-b5bb-fcc474598d37', {
        method: 'PUT',
        headers: {
          'X-Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ is_visible: !isVisible })
      });
      
      if (response.ok) {
        setIsVisible(!isVisible);
        toast({
          title: isVisible ? 'Карточка скрыта' : 'Карточка опубликована',
          description: isVisible 
            ? 'Ваш профиль больше не отображается в каталоге'
            : 'Ваш профиль теперь виден в каталоге специалистов'
        });
      }
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось изменить видимость профиля',
        variant: 'destructive'
      });
    }
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
            <ProfileBasicInfo 
              profileData={profileData} 
              setProfileData={setProfileData} 
            />

            <ProfileWorkFormats
              profileData={profileData}
              setProfileData={setProfileData}
              workFormatOptions={workFormatOptions}
              defaultDescriptions={defaultDescriptions}
              toggleWorkFormat={toggleWorkFormat}
              updateServiceDescription={updateServiceDescription}
            />

            <ProfileContacts 
              profileData={profileData} 
              setProfileData={setProfileData} 
            />

            <ProfileVerificationCard
              deleting={deleting}
              isVisible={isVisible}
              toggleVisibility={toggleVisibility}
              handleDeleteAccount={handleDeleteAccount}
            />

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