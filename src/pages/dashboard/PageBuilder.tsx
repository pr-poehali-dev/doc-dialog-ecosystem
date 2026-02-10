import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const defaultPageData = {
  heroTitle: 'Массаж, который возвращает энергию',
  heroSubtitle: 'Индивидуальный подход к каждому клиенту. Опыт работы 7+ лет',
  heroImage: '',
  profilePhoto: '',
  aboutTitle: 'Обо мне',
  aboutText: 'Я практикующий массажист с 7-летним опытом. Специализируюсь на восстановительных техниках и работе с мышечным напряжением. Помогаю людям избавиться от стресса и вернуть телу легкость.',
  services: [
    { name: 'Классический массаж', duration: '60 мин', price: '3500', description: 'Глубокая проработка всех групп мышц', image: '' },
    { name: 'Релаксационный массаж', duration: '90 мин', price: '4800', description: 'Снятие напряжения и полное расслабление', image: '' },
    { name: 'Спортивный массаж', duration: '60 мин', price: '4000', description: 'Восстановление после тренировок', image: '' },
  ],
  processTitle: 'Как проходит сеанс',
  processSteps: [
    { title: 'Знакомство', description: 'Обсуждаем ваши пожелания и проблемные зоны', icon: 'Users' },
    { title: 'Подготовка', description: 'Создаю комфортную атмосферу для расслабления', icon: 'Sparkles' },
    { title: 'Сеанс', description: 'Применяю индивидуально подобранные техники', icon: 'Heart' },
    { title: 'Рекомендации', description: 'Даю советы по уходу за телом', icon: 'MessageCircle' },
  ],
  gallery: [] as string[],
  certificates: [] as string[],
  reviews: [] as Array<{
    name: string;
    rating: number;
    text: string;
    date: string;
  }>,
  blog: [] as Array<{
    title: string;
    content: string;
    image: string;
    date: string;
  }>,
  videos: [] as string[],
  offers: [] as Array<{
    title: string;
    description: string;
    discount: string;
    image: string;
  }>,
  template: 'minimal',
  showPhone: true,
  showTelegram: true,
  showMaxMessenger: true,
  colorTheme: 'gradient',
};

function PageBuilder() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [pageData, setPageData] = useState(defaultPageData);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPublished, setIsPublished] = useState(false);
  const [landingUrl, setLandingUrl] = useState('');
  const [templateSubscription, setTemplateSubscription] = useState<{
    has_subscription: boolean;
    template_type?: string;
    expires_at?: string;
    days_left?: number;
  } | null>(null);

  useEffect(() => {
    const loadPageData = async () => {
      try {
        const token = localStorage.getItem('token');
        
        // Load profile to get user ID
        const profileResponse = await fetch('https://functions.poehali.dev/bf27da5d-a5ee-4dc7-b5bb-fcc474598d37', {
          headers: { 'X-Authorization': `Bearer ${token}` }
        });
        
        if (profileResponse.ok) {
          const profile = await profileResponse.json();
          const userId = profile.user_id;
          if (userId) {
            setLandingUrl(`https://docdialog.su/specialist-landing/${userId}`);
          }
        }
        
        // Load landing data
        const response = await fetch('https://functions.poehali.dev/ea735e68-a4b3-4d19-bb7a-4f720bd82568', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          console.log('[LOAD] Loaded landing data:', {
            gallery: data.gallery?.length || 0,
            certificates: data.certificates?.length || 0,
            blog: data.blog?.length || 0,
            offers: data.offers?.length || 0,
            reviews: data.reviews?.length || 0,
            rawData: data
          });
          
          // Check template subscription
          const subResponse = await fetch('https://functions.poehali.dev/aa8340a4-6315-4ab9-a4f9-8043f792f3ee', {
            headers: { 'X-Authorization': `Bearer ${token}` }
          });
          
          if (subResponse.ok) {
            const subData = await subResponse.json();
            setTemplateSubscription(subData);
            
            // Auto-revert to minimal if subscription expired
            if (!subData.has_subscription && (data.template === 'premium' || data.template === 'luxury')) {
              data.template = 'minimal';
            }
          }
          
          setPageData(data);
          setIsPublished(true);
        } else if (response.status === 404) {
          // Landing not found - keep default data
          console.log('[LOAD] Landing not found, using defaults');
        } else {
          console.error('[LOAD] Failed to load:', response.status, response.statusText);
        }
      } catch (e) {
        console.error('Failed to load landing data', e);
      } finally {
        setIsLoaded(true);
      }
    };
    
    loadPageData();
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    
    const saveTimer = setTimeout(async () => {
      try {
        const token = localStorage.getItem('token');
        console.log('[AUTOSAVE] Starting autosave...', {
          hasToken: !!token,
          dataSize: JSON.stringify(pageData).length
        });
        
        const response = await fetch('https://functions.poehali.dev/ea735e68-a4b3-4d19-bb7a-4f720bd82568', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(pageData)
        });
        
        console.log('[AUTOSAVE] Response:', {
          status: response.status,
          ok: response.ok
        });
        
        if (response.ok) {
          console.log('[AUTOSAVE] ✅ Saved successfully');
          toast({
            title: "Автосохранение",
            description: "Изменения сохранены",
          });
        } else {
          const error = await response.text();
          console.error('[AUTOSAVE] Failed:', error);
        }
      } catch (e) {
        console.error('[AUTOSAVE] ❌ Error:', e);
      }
    }, 2000);

    return () => clearTimeout(saveTimer);
  }, [pageData, isLoaded, toast]);
  const [uploadingHero, setUploadingHero] = useState(false);
  const [uploadingProfile, setUploadingProfile] = useState(false);
  const [uploadingGallery, setUploadingGallery] = useState(false);
  const [uploadingCert, setUploadingCert] = useState(false);
  const [uploadingBlog, setUploadingBlog] = useState(false);
  const [uploadingOffer, setUploadingOffer] = useState(false);
  const [uploadingService, setUploadingService] = useState<number | null>(null);
  const [newReview, setNewReview] = useState({ name: '', rating: 5, text: '' });
  const [newBlogPost, setNewBlogPost] = useState({ title: '', content: '', image: '' });
  const [newOffer, setNewOffer] = useState({ title: '', description: '', discount: '', image: '' });
  const [isPremiumDialogOpen, setIsPremiumDialogOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState('');

  const handleImageUpload = async (file: File, type: 'hero' | 'profile' | 'gallery' | 'certificate' | 'service', serviceIndex?: number) => {
    if (!file) return;

    const setLoading = type === 'hero' ? setUploadingHero : 
                       type === 'profile' ? setUploadingProfile :
                       type === 'gallery' ? setUploadingGallery : 
                       type === 'service' ? () => setUploadingService(serviceIndex ?? null) : setUploadingCert;
    
    setLoading(true);
    
    try {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        
        if (type === 'hero') {
          setPageData({ ...pageData, heroImage: base64 });
        } else if (type === 'profile') {
          setPageData({ ...pageData, profilePhoto: base64 });
        } else if (type === 'gallery') {
          setPageData({ ...pageData, gallery: [...pageData.gallery, base64] });
        } else if (type === 'certificate') {
          setPageData({ ...pageData, certificates: [...pageData.certificates, base64] });
        } else if (type === 'service' && serviceIndex !== undefined) {
          const updatedServices = [...pageData.services];
          updatedServices[serviceIndex] = { ...updatedServices[serviceIndex], image: base64 };
          setPageData({ ...pageData, services: updatedServices });
        }
        
        toast({
          title: "Фото загружено",
          description: "Изображение успешно добавлено",
        });
      };
      reader.readAsDataURL(file);
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось загрузить фото",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const removeGalleryImage = (index: number) => {
    setPageData({
      ...pageData,
      gallery: pageData.gallery.filter((_, i) => i !== index)
    });
  };

  const removeCertificate = (index: number) => {
    setPageData({
      ...pageData,
      certificates: pageData.certificates.filter((_, i) => i !== index)
    });
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://functions.poehali.dev/ea735e68-a4b3-4d19-bb7a-4f720bd82568', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(pageData)
      });
      
      if (response.ok) {
        localStorage.setItem('pageBuilderData', JSON.stringify(pageData));
        toast({
          title: "Черновик сохранен",
          description: "Ваши изменения сохранены на всех устройствах",
        });
      } else {
        throw new Error('Failed to save');
      }
    } catch (error) {
      localStorage.setItem('pageBuilderData', JSON.stringify(pageData));
      toast({
        title: "Черновик сохранен локально",
        description: "Изменения будут синхронизированы при подключении",
      });
    }
  };

  const handlePublish = async () => {
    try {
      const token = localStorage.getItem('token');
      
      // Проверяем наличие ИНН в профиле
      const profileResponse = await fetch('https://functions.poehali.dev/bf27da5d-a5ee-4dc7-b5bb-fcc474598d37', {
        headers: { 'X-Authorization': `Bearer ${token}` }
      });
      
      if (profileResponse.ok) {
        const profile = await profileResponse.json();
        if (!profile.inn || profile.inn.length < 10) {
          toast({
            title: "Заполните ИНН",
            description: "Для публикации лендинга необходимо указать ИНН в профиле специалиста",
            variant: "destructive"
          });
          setTimeout(() => navigate('/dashboard/public-profile'), 1000);
          return;
        }
      }
      
      const response = await fetch('https://functions.poehali.dev/ea735e68-a4b3-4d19-bb7a-4f720bd82568', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(pageData)
      });
      
      if (response.ok) {
        setIsPublished(true);
        toast({
          title: "Страница опубликована!",
          description: "Теперь клиенты могут увидеть ваш лендинг на всех устройствах",
        });
      } else {
        throw new Error('Failed to publish');
      }
    } catch (error) {
      toast({
        title: "Ошибка публикации",
        description: "Проверьте подключение к интернету",
        variant: "destructive"
      });
    }
  };

  const copyPageLink = () => {
    if (!landingUrl) {
      toast({
        title: "Ошибка",
        description: "Ссылка на лендинг не готова",
        variant: "destructive"
      });
      return;
    }
    navigator.clipboard.writeText(landingUrl);
    toast({
      title: "Ссылка скопирована",
      description: "Поделитесь с клиентами",
    });
  };

  const addService = () => {
    setPageData({
      ...pageData,
      services: [...pageData.services, { name: '', duration: '', price: '', description: '', image: '' }]
    });
  };

  const removeService = (index: number) => {
    setPageData({
      ...pageData,
      services: pageData.services.filter((_, i) => i !== index)
    });
  };

  const updateService = (index: number, field: string, value: string) => {
    const updatedServices = [...pageData.services];
    updatedServices[index] = { ...updatedServices[index], [field]: value };
    setPageData({ ...pageData, services: updatedServices });
  };

  const applyTemplate = (templateType: 'premium' | 'minimal' | 'luxury') => {
    // Проверяем, платный ли шаблон и оплачен ли он
    if ((templateType === 'premium' || templateType === 'luxury') && pageData.template === 'minimal') {
      setSelectedTemplate(templateType);
      setIsPremiumDialogOpen(true);
      return;
    }

    const templates = {
      premium: {
        heroTitle: 'Массаж мирового уровня в вашем городе',
        heroSubtitle: 'Сертифицированный специалист. Индивидуальный подход. Результат с первого сеанса',
        aboutText: 'Я сертифицированный массажист с международным образованием. Прошла обучение в ведущих школах Европы и Азии. Работаю с профессиональными спортсменами, бизнесменами и людьми, ценящими качество.',
        colorTheme: 'gradient',
        template: 'premium',
      },
      minimal: {
        heroTitle: 'Оздоровительный массаж',
        heroSubtitle: 'Забота о вашем теле и здоровье',
        aboutText: 'Практикующий массажист. Помогаю людям восстановить силы и избавиться от напряжения. Работаю в спокойной, расслабляющей обстановке.',
        colorTheme: 'blue',
        template: 'minimal',
      },
      luxury: {
        heroTitle: 'Эксклюзивный массаж премиум-класса',
        heroSubtitle: 'Индивидуальные программы. VIP-сервис. Максимальный результат',
        aboutText: 'Предлагаю эксклюзивные массажные программы с использованием авторских техник и натуральных масел премиум-класса. Создаю атмосферу полного релакса и заботы о каждой детали вашего комфорта.',
        colorTheme: 'purple',
        template: 'luxury',
      },
    };

    const selected = templates[templateType];
    setPageData({
      ...pageData,
      heroTitle: selected.heroTitle,
      heroSubtitle: selected.heroSubtitle,
      aboutText: selected.aboutText,
      colorTheme: selected.colorTheme,
      template: selected.template,
    });

    toast({
      title: "Шаблон применен",
      description: "Вы можете отредактировать текст под себя",
    });
  };

  const handlePurchaseTemplate = async () => {
    const templatePrice = selectedTemplate === 'premium' ? 2990 : 4990;
    const templateName = selectedTemplate === 'premium' ? 'Premium' : 'Супер Premium';
    
    try {
      const token = localStorage.getItem('token');
      const userId = token ? JSON.parse(atob(token.split('.')[1])).user_id : null;
      
      if (!userId) {
        toast({
          title: "Ошибка",
          description: "Требуется авторизация",
          variant: "destructive",
        });
        return;
      }
      
      // Списываем с баланса
      const response = await fetch('https://functions.poehali.dev/619d5197-066f-4380-8bef-994c71c76fa0', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-User-Id': userId
        },
        body: JSON.stringify({
          amount: templatePrice,
          service_type: 'landing_template_subscription',
          description: `Подписка на шаблон "${templateName}" на 3 месяца`
        })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        toast({
          title: "Недостаточно средств",
          description: `На вашем балансе ${data.balance?.toFixed(2) || 0} ₽, а требуется ${templatePrice} ₽. Пополните баланс.`,
          variant: "destructive",
        });
        setIsPremiumDialogOpen(false);
        setTimeout(() => navigate('/dashboard/ai-subscription'), 500);
        return;
      }
      
      // Создаем подписку на 3 месяца
      const subResponse = await fetch('https://functions.poehali.dev/aa8340a4-6315-4ab9-a4f9-8043f792f3ee', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          template_type: selectedTemplate,
          amount: templatePrice
        })
      });
      
      if (subResponse.ok) {
        const subData = await subResponse.json();
        setTemplateSubscription({
          has_subscription: true,
          template_type: selectedTemplate,
          expires_at: subData.expires_at,
          days_left: 90
        });
        
        setPageData({
          ...pageData,
          template: selectedTemplate,
        });
        setIsPremiumDialogOpen(false);
        applyTemplate(selectedTemplate as 'premium' | 'luxury');
        
        const expiresDate = new Date(subData.expires_at).toLocaleDateString('ru-RU');
        toast({
          title: "Подписка оформлена!",
          description: `Шаблон "${templateName}" активен до ${expiresDate}. Списано ${templatePrice} ₽`,
        });
      }
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось обработать покупку",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Navigation />
      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate('/dashboard')}
              className="self-start"
            >
              <Icon name="ArrowLeft" size={20} />
            </Button>
            <div className="flex-1">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Конструктор премиум-лендинга
              </h1>
              <p className="text-sm sm:text-base text-muted-foreground">Создайте страницу, которая привлекает клиентов</p>
            </div>
            <div className="flex gap-2 flex-wrap">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  localStorage.setItem('pageBuilderData', JSON.stringify(pageData));
                  window.open('/dashboard/page-preview', '_blank');
                }}
                className="flex-1 sm:flex-initial"
              >
                <Icon name="Eye" size={16} className="sm:mr-2" />
                <span className="hidden sm:inline">Предпросмотр</span>
              </Button>
              {isPublished && (
                <Button 
                  variant="secondary" 
                  size="sm"
                  onClick={copyPageLink}
                  className="flex-1 sm:flex-initial"
                >
                  <Icon name="Copy" size={16} className="sm:mr-2" />
                  <span className="hidden sm:inline">Ссылка</span>
                </Button>
              )}
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-4 sm:gap-6">
            <div className="lg:col-span-2 space-y-4 sm:space-y-6">
              {/* Hero Section */}
              <Card className="border-2 border-blue-100 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 sm:p-6">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center flex-shrink-0">
                      <Icon name="Sparkles" className="text-white" size={16} />
                    </div>
                    <div className="min-w-0">
                      <CardTitle className="text-base sm:text-lg">Главный экран</CardTitle>
                      <CardDescription className="text-xs sm:text-sm">Первое впечатление решает всё</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4 pt-4 sm:pt-6 p-4 sm:p-6">
                  <div className="space-y-2">
                    <Label className="text-sm sm:text-base font-semibold">Фоновое фото Hero-блока</Label>
                    <p className="text-xs text-muted-foreground mb-2 sm:mb-3">
                      Загрузите атмосферное фото массажного кабинета или spa-зоны
                    </p>
                    {pageData.heroImage ? (
                      <div className="relative group">
                        <img 
                          src={pageData.heroImage} 
                          alt="Hero" 
                          className="w-full h-40 sm:h-48 object-cover rounded-lg"
                        />
                        <Button
                          size="sm"
                          variant="destructive"
                          className="absolute top-2 right-2 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity"
                          onClick={() => setPageData({ ...pageData, heroImage: '' })}
                        >
                          <Icon name="Trash2" size={14} />
                        </Button>
                      </div>
                    ) : (
                      <label className="flex flex-col items-center justify-center h-32 sm:h-48 border-2 border-dashed border-blue-300 rounded-lg cursor-pointer hover:border-blue-500 transition-colors bg-blue-50/50 active:bg-blue-100/50">
                        <Icon name="Upload" size={24} className="text-blue-400 mb-2" />
                        <span className="text-xs sm:text-sm text-blue-600 font-medium px-2 text-center">Загрузить фото</span>
                        <span className="text-[10px] sm:text-xs text-muted-foreground mt-1">JPG, PNG до 5MB</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => e.target.files && handleImageUpload(e.target.files[0], 'hero')}
                          disabled={uploadingHero}
                        />
                      </label>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm sm:text-base font-semibold">Ваше фото (профиль)</Label>
                    {pageData.profilePhoto ? (
                      <div className="flex items-center gap-3 sm:gap-4">
                        <img 
                          src={pageData.profilePhoto} 
                          alt="Profile" 
                          className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-4 border-white shadow-lg flex-shrink-0"
                        />
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setPageData({ ...pageData, profilePhoto: '' })}
                        >
                          <Icon name="Trash2" size={14} className="mr-1 sm:mr-2" />
                          <span className="text-xs sm:text-sm">Удалить</span>
                        </Button>
                      </div>
                    ) : (
                      <label className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition-colors active:bg-blue-50/50">
                        <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center flex-shrink-0">
                          <Icon name="User" size={24} className="text-white" />
                        </div>
                        <div className="min-w-0">
                          <span className="text-xs sm:text-sm font-medium text-blue-600 block">Загрузить фото</span>
                          <p className="text-[10px] sm:text-xs text-muted-foreground">Профессиональное фото специалиста</p>
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => e.target.files && handleImageUpload(e.target.files[0], 'profile')}
                          disabled={uploadingProfile}
                        />
                      </label>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm sm:text-base font-semibold">Заголовок</Label>
                    <Input
                      placeholder="Массаж, который возвращает энергию"
                      value={pageData.heroTitle}
                      onChange={(e) => setPageData({ ...pageData, heroTitle: e.target.value })}
                      className="text-sm sm:text-base"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm sm:text-base font-semibold">Подзаголовок</Label>
                    <Input
                      placeholder="Индивидуальный подход к каждому клиенту"
                      value={pageData.heroSubtitle}
                      onChange={(e) => setPageData({ ...pageData, heroSubtitle: e.target.value })}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* About Section */}
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Icon name="User" size={20} className="text-blue-500" />
                    <div>
                      <CardTitle>Обо мне</CardTitle>
                      <CardDescription>Расскажите о своём опыте и подходе</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Заголовок</Label>
                    <Input
                      value={pageData.aboutTitle}
                      onChange={(e) => setPageData({ ...pageData, aboutTitle: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Текст о себе</Label>
                    <Textarea
                      placeholder="Расскажите о квалификации, опыте, философии работы..."
                      value={pageData.aboutText}
                      onChange={(e) => setPageData({ ...pageData, aboutText: e.target.value })}
                      rows={6}
                      className="resize-none"
                    />
                    <p className="text-xs text-amber-600 flex items-center gap-1">
                      <Icon name="AlertCircle" size={12} />
                      Избегайте медицинских терминов. Используйте: оздоровление, релакс, восстановление
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Services */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Icon name="Sparkles" size={20} className="text-purple-500" />
                      <div>
                        <CardTitle>Услуги и цены</CardTitle>
                        <CardDescription>Покажите, что вы предлагаете</CardDescription>
                      </div>
                    </div>
                    <Button size="sm" onClick={addService}>
                      <Icon name="Plus" size={16} className="mr-2" />
                      Добавить
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {pageData.services.map((service, index) => (
                    <div key={index} className="p-4 border-2 border-gray-100 rounded-lg space-y-3 hover:border-blue-200 transition-colors">
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary">Услуга {index + 1}</Badge>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => removeService(index)}
                        >
                          <Icon name="Trash2" size={16} />
                        </Button>
                      </div>
                      <div className="space-y-1">
                        <Input
                          placeholder="Название услуги"
                          value={service.name}
                          onChange={(e) => updateService(index, 'name', e.target.value)}
                          maxLength={50}
                        />
                        <p className="text-xs text-gray-500">{service.name.length}/50 символов</p>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <Input
                          placeholder="60 мин"
                          value={service.duration}
                          onChange={(e) => updateService(index, 'duration', e.target.value)}
                        />
                        <Input
                          placeholder="3500 ₽"
                          value={service.price}
                          onChange={(e) => updateService(index, 'price', e.target.value)}
                        />
                      </div>
                      <div className="space-y-1">
                        <Textarea
                          placeholder="Краткое описание услуги (необязательно)"
                          value={service.description}
                          onChange={(e) => updateService(index, 'description', e.target.value)}
                          rows={2}
                          maxLength={150}
                        />
                        <p className="text-xs text-gray-500">{service.description.length}/150 символов</p>
                      </div>
                      {pageData.template === 'luxury' && (
                        <div className="space-y-2">
                          <Label className="text-sm font-medium flex items-center gap-2">
                            <Icon name="Image" size={14} className="text-purple-500" />
                            Фото услуги (Super Premium)
                          </Label>
                          {service.image ? (
                            <div className="relative group">
                              <img 
                                src={service.image} 
                                alt={service.name} 
                                className="w-full h-32 object-cover rounded-lg"
                              />
                              <Button
                                size="sm"
                                variant="destructive"
                                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={() => {
                                  const updatedServices = [...pageData.services];
                                  updatedServices[index] = { ...updatedServices[index], image: '' };
                                  setPageData({ ...pageData, services: updatedServices });
                                }}
                              >
                                <Icon name="X" size={14} />
                              </Button>
                            </div>
                          ) : (
                            <label className="flex flex-col items-center justify-center h-24 border-2 border-dashed border-purple-300 rounded-lg cursor-pointer hover:border-purple-500 transition-colors">
                              <Icon name="Plus" size={20} className="text-purple-400 mb-1" />
                              <span className="text-xs text-gray-500">Добавить фото</span>
                              <input
                                type="file"
                                className="hidden"
                                accept="image/*"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) handleImageUpload(file, 'service', index);
                                }}
                                disabled={uploadingService === index}
                              />
                            </label>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Gallery */}
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Icon name="Image" size={20} className="text-green-500" />
                    <div>
                      <CardTitle>Галерея фотографий</CardTitle>
                      <CardDescription>Покажите ваш кабинет и атмосферу</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    {pageData.gallery.map((img, index) => (
                      <div key={index} className="relative group">
                        <img 
                          src={img} 
                          alt={`Gallery ${index + 1}`} 
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <Button
                          size="sm"
                          variant="destructive"
                          className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => removeGalleryImage(index)}
                        >
                          <Icon name="X" size={14} />
                        </Button>
                      </div>
                    ))}
                    <label className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-green-500 transition-colors">
                      <Icon name="Plus" size={24} className="text-gray-400 mb-1" />
                      <span className="text-xs text-gray-500">Добавить фото</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => e.target.files && handleImageUpload(e.target.files[0], 'gallery')}
                        disabled={uploadingGallery}
                      />
                    </label>
                  </div>
                </CardContent>
              </Card>

              {/* Certificates */}
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Icon name="Award" size={20} className="text-amber-500" />
                    <div>
                      <CardTitle>Сертификаты и дипломы</CardTitle>
                      <CardDescription>Подтвердите квалификацию</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    {pageData.certificates.map((cert, index) => (
                      <div key={index} className="relative group">
                        <img 
                          src={cert} 
                          alt={`Certificate ${index + 1}`} 
                          className="w-full h-40 object-cover rounded-lg border-2 border-amber-100"
                        />
                        <Button
                          size="sm"
                          variant="destructive"
                          className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => removeCertificate(index)}
                        >
                          <Icon name="X" size={14} />
                        </Button>
                      </div>
                    ))}
                    <label className="flex flex-col items-center justify-center h-40 border-2 border-dashed border-amber-300 rounded-lg cursor-pointer hover:border-amber-500 transition-colors bg-amber-50/50">
                      <Icon name="Upload" size={24} className="text-amber-400 mb-1" />
                      <span className="text-xs text-amber-600">Загрузить сертификат</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => e.target.files && handleImageUpload(e.target.files[0], 'certificate')}
                        disabled={uploadingCert}
                      />
                    </label>
                  </div>
                </CardContent>
              </Card>

              {/* Process Steps */}
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Icon name="ListChecks" size={20} className="text-indigo-500" />
                    <div>
                      <CardTitle>Как проходит сеанс</CardTitle>
                      <CardDescription>Расскажите о процессе работы</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {pageData.processSteps.map((step, index) => (
                    <div key={index} className="p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
                      <p className="font-semibold text-sm mb-1">{step.title}</p>
                      <p className="text-xs text-muted-foreground">{step.description}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Reviews - Super Premium only */}
              <Card className={pageData.template !== 'luxury' ? 'opacity-60 pointer-events-none relative' : ''}>
                {pageData.template !== 'luxury' && (
                  <div className="absolute inset-0 bg-gray-100/50 backdrop-blur-[2px] z-10 flex items-center justify-center rounded-lg">
                    <div className="bg-white p-6 rounded-xl shadow-xl text-center max-w-sm">
                      <Icon name="Lock" size={32} className="mx-auto mb-3 text-purple-600" />
                      <p className="font-bold text-lg mb-2">Доступно в Super Premium</p>
                      <p className="text-sm text-gray-600 mb-4">Активируйте тариф Super Premium для доступа</p>
                    </div>
                  </div>
                )}
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Icon name="Star" size={20} className="text-amber-500" />
                      <div className="flex-1">
                        <CardTitle>Отзывы клиентов</CardTitle>
                        <CardDescription>Добавьте отзывы о работе</CardDescription>
                      </div>
                      <Badge className="bg-gradient-to-r from-purple-500 to-pink-500">Super Premium</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {pageData.reviews && pageData.reviews.length > 0 && (
                    <div className="space-y-3 mb-4">
                      {pageData.reviews.map((review, index) => (
                        <div key={index} className="p-3 bg-amber-50 rounded-lg border border-amber-100">
                          <div className="flex items-center justify-between mb-2">
                            <p className="font-semibold text-sm">{review.name}</p>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => {
                                setPageData({
                                  ...pageData,
                                  reviews: pageData.reviews.filter((_, i) => i !== index)
                                });
                              }}
                            >
                              <Icon name="Trash2" size={14} />
                            </Button>
                          </div>
                          <div className="flex items-center gap-1 mb-2">
                            {[...Array(5)].map((_, i) => (
                              <Icon
                                key={i}
                                name="Star"
                                size={12}
                                className={i < review.rating ? 'text-amber-500 fill-amber-500' : 'text-gray-300'}
                              />
                            ))}
                          </div>
                          <p className="text-xs text-gray-600">{review.text}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm font-semibold">Добавить отзыв</p>
                    <div className="space-y-1">
                      <Input
                        placeholder="Имя клиента"
                        value={newReview.name}
                        onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                        maxLength={40}
                      />
                      <p className="text-xs text-gray-500">{newReview.name.length}/40 символов</p>
                    </div>
                    <div className="space-y-2">
                      <Label>Рейтинг</Label>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setNewReview({ ...newReview, rating: star })}
                            className="focus:outline-none"
                          >
                            <Icon
                              name="Star"
                              size={24}
                              className={star <= newReview.rating ? 'text-amber-500 fill-amber-500' : 'text-gray-300'}
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <Textarea
                        placeholder="Текст отзыва"
                        value={newReview.text}
                        onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}
                        rows={3}
                        maxLength={200}
                      />
                      <p className="text-xs text-gray-500">{newReview.text.length}/200 символов</p>
                    </div>
                    <Button
                      size="sm"
                      className="w-full"
                      onClick={() => {
                        if (newReview.name && newReview.text) {
                          setPageData({
                            ...pageData,
                            reviews: [
                              ...pageData.reviews,
                              {
                                ...newReview,
                                date: new Date().toLocaleDateString('ru-RU')
                              }
                            ]
                          });
                          setNewReview({ name: '', rating: 5, text: '' });
                          toast({
                            title: 'Отзыв добавлен',
                            description: 'Отзыв появится на лендинге',
                          });
                        }
                      }}
                      disabled={!newReview.name || !newReview.text}
                    >
                      <Icon name="Plus" size={16} className="mr-2" />
                      Добавить отзыв
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Contacts */}
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Icon name="Phone" size={20} className="text-green-500" />
                    <div>
                      <CardTitle>Контакты</CardTitle>
                      <CardDescription>Способы связи с вами</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
                    <p className="text-xs text-blue-700 flex items-center gap-2">
                      <Icon name="Info" size={14} />
                      Контакты подтягиваются из вашего профиля. Укажите телефон, Telegram и MAX мессенджер в настройках профиля.
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Показывать телефон</Label>
                    <Switch
                      checked={pageData.showPhone}
                      onCheckedChange={(checked) => setPageData({ ...pageData, showPhone: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Показывать Telegram</Label>
                    <Switch
                      checked={pageData.showTelegram}
                      onCheckedChange={(checked) => setPageData({ ...pageData, showTelegram: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Показывать MAX мессенджер</Label>
                    <Switch
                      checked={pageData.showMaxMessenger}
                      onCheckedChange={(checked) => setPageData({ ...pageData, showMaxMessenger: checked })}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Blog Section - Premium/Luxury only */}
              <Card className={pageData.template === 'minimal' ? 'opacity-60 pointer-events-none relative' : ''}>
                {pageData.template === 'minimal' && (
                  <div className="absolute inset-0 bg-gray-100/50 backdrop-blur-[2px] z-10 flex items-center justify-center rounded-lg">
                    <div className="bg-white p-6 rounded-xl shadow-xl text-center max-w-sm">
                      <Icon name="Lock" size={32} className="mx-auto mb-3 text-blue-600" />
                      <p className="font-bold text-lg mb-2">Доступно в Premium</p>
                      <p className="text-sm text-gray-600 mb-4">Активируйте тариф Premium или Super Premium</p>
                    </div>
                  </div>
                )}
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Icon name="FileText" size={20} className="text-indigo-500" />
                    <div className="flex-1">
                      <CardTitle>Блог / Новости</CardTitle>
                      <CardDescription>Делитесь полезными материалами</CardDescription>
                    </div>
                    <Badge className="bg-gradient-to-r from-blue-500 to-indigo-500">Premium</Badge>
                  </div>
                </CardHeader>
                  <CardContent className="space-y-4">
                    {pageData.blog && pageData.blog.length > 0 && (
                      <div className="space-y-3 mb-4">
                        {pageData.blog.map((post, index) => (
                          <div key={index} className="p-3 bg-indigo-50 rounded-lg border border-indigo-100">
                            <div className="flex items-start justify-between mb-2">
                              <p className="font-semibold text-sm">{post.title}</p>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => {
                                  setPageData({
                                    ...pageData,
                                    blog: pageData.blog.filter((_, i) => i !== index)
                                  });
                                }}
                              >
                                <Icon name="Trash2" size={14} />
                              </Button>
                            </div>
                            {post.image && (
                              <img src={post.image} alt={post.title} className="w-full h-20 object-cover rounded mb-2" />
                            )}
                            <p className="text-xs text-gray-600 line-clamp-2">{post.content}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm font-semibold">Добавить пост</p>
                      <div className="space-y-1">
                        <Input
                          placeholder="Заголовок поста"
                          value={newBlogPost.title}
                          onChange={(e) => setNewBlogPost({ ...newBlogPost, title: e.target.value })}
                          maxLength={60}
                        />
                        <p className="text-xs text-gray-500">{newBlogPost.title.length}/60 символов</p>
                      </div>
                      <div className="space-y-1">
                        <Textarea
                          placeholder="Текст поста"
                          value={newBlogPost.content}
                          onChange={(e) => setNewBlogPost({ ...newBlogPost, content: e.target.value })}
                          rows={4}
                          maxLength={500}
                        />
                        <p className="text-xs text-gray-500">{newBlogPost.content.length}/500 символов</p>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs">Обложка поста (необязательно)</Label>
                        {newBlogPost.image ? (
                          <div className="relative">
                            <img src={newBlogPost.image} alt="Preview" className="w-full h-32 object-cover rounded" />
                            <Button
                              size="sm"
                              variant="destructive"
                              className="absolute top-1 right-1"
                              onClick={() => setNewBlogPost({ ...newBlogPost, image: '' })}
                            >
                              <Icon name="X" size={14} />
                            </Button>
                          </div>
                        ) : (
                          <label className="flex items-center justify-center h-24 border-2 border-dashed rounded cursor-pointer hover:border-indigo-400">
                            <Icon name="Upload" size={20} className="text-gray-400 mr-2" />
                            <span className="text-sm text-gray-500">Загрузить</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  const reader = new FileReader();
                                  reader.onloadend = () => {
                                    setNewBlogPost({ ...newBlogPost, image: reader.result as string });
                                  };
                                  reader.readAsDataURL(file);
                                }
                              }}
                            />
                          </label>
                        )}
                      </div>
                      <Button
                        size="sm"
                        className="w-full"
                        onClick={() => {
                          if (newBlogPost.title && newBlogPost.content) {
                            setPageData({
                              ...pageData,
                              blog: [
                                ...pageData.blog,
                                {
                                  ...newBlogPost,
                                  date: new Date().toLocaleDateString('ru-RU')
                                }
                              ]
                            });
                            setNewBlogPost({ title: '', content: '', image: '' });
                            toast({
                              title: 'Пост добавлен',
                              description: 'Пост появится на лендинге',
                            });
                          }
                        }}
                        disabled={!newBlogPost.title || !newBlogPost.content}
                      >
                        <Icon name="Plus" size={16} className="mr-2" />
                        Добавить пост
                      </Button>
                    </div>
                  </CardContent>
                </Card>

              {/* Offers Section - Super Premium only */}
              <Card className={pageData.template !== 'luxury' ? 'opacity-60 pointer-events-none relative' : ''}>
                {pageData.template !== 'luxury' && (
                  <div className="absolute inset-0 bg-gray-100/50 backdrop-blur-[2px] z-10 flex items-center justify-center rounded-lg">
                    <div className="bg-white p-6 rounded-xl shadow-xl text-center max-w-sm">
                      <Icon name="Lock" size={32} className="mx-auto mb-3 text-purple-600" />
                      <p className="font-bold text-lg mb-2">Доступно в Super Premium</p>
                      <p className="text-sm text-gray-600 mb-4">Активируйте тариф Super Premium для доступа</p>
                    </div>
                  </div>
                )}
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Icon name="Tag" size={20} className="text-rose-500" />
                    <div className="flex-1">
                      <CardTitle>Скидки и сертификаты</CardTitle>
                      <CardDescription>Специальные предложения с формой заказа</CardDescription>
                    </div>
                    <Badge className="bg-gradient-to-r from-purple-500 to-pink-500">Super Premium</Badge>
                  </div>
                </CardHeader>
                  <CardContent className="space-y-4">
                    {pageData.offers && pageData.offers.length > 0 && (
                      <div className="space-y-3 mb-4">
                        {pageData.offers.map((offer, index) => (
                          <div key={index} className="p-3 bg-rose-50 rounded-lg border border-rose-100">
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex-1">
                                <p className="font-semibold text-sm">{offer.title}</p>
                                <p className="text-xs text-rose-600 font-bold mt-1">{offer.discount}</p>
                              </div>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => {
                                  setPageData({
                                    ...pageData,
                                    offers: pageData.offers.filter((_, i) => i !== index)
                                  });
                                }}
                              >
                                <Icon name="Trash2" size={14} />
                              </Button>
                            </div>
                            {offer.image && (
                              <img src={offer.image} alt={offer.title} className="w-full h-20 object-cover rounded mb-2" />
                            )}
                            <p className="text-xs text-gray-600 line-clamp-2">{offer.description}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm font-semibold">Добавить предложение</p>
                      <div className="space-y-1">
                        <Input
                          placeholder="Название (например: Скидка 20% на первый сеанс)"
                          value={newOffer.title}
                          onChange={(e) => setNewOffer({ ...newOffer, title: e.target.value })}
                          maxLength={60}
                        />
                        <p className="text-xs text-gray-500">{newOffer.title.length}/60 символов</p>
                      </div>
                      <div className="space-y-1">
                        <Input
                          placeholder="Размер скидки (например: -20% или -1000₽)"
                          value={newOffer.discount}
                          onChange={(e) => setNewOffer({ ...newOffer, discount: e.target.value })}
                          maxLength={20}
                        />
                        <p className="text-xs text-gray-500">{newOffer.discount.length}/20 символов</p>
                      </div>
                      <div className="space-y-1">
                        <Textarea
                          placeholder="Описание предложения и условий"
                          value={newOffer.description}
                          onChange={(e) => setNewOffer({ ...newOffer, description: e.target.value })}
                          rows={3}
                          maxLength={200}
                        />
                        <p className="text-xs text-gray-500">{newOffer.description.length}/200 символов</p>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs">Изображение (необязательно)</Label>
                        {newOffer.image ? (
                          <div className="relative">
                            <img src={newOffer.image} alt="Preview" className="w-full h-32 object-cover rounded" />
                            <Button
                              size="sm"
                              variant="destructive"
                              className="absolute top-1 right-1"
                              onClick={() => setNewOffer({ ...newOffer, image: '' })}
                            >
                              <Icon name="X" size={14} />
                            </Button>
                          </div>
                        ) : (
                          <label className="flex items-center justify-center h-24 border-2 border-dashed rounded cursor-pointer hover:border-rose-400">
                            <Icon name="Upload" size={20} className="text-gray-400 mr-2" />
                            <span className="text-sm text-gray-500">Загрузить</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  const reader = new FileReader();
                                  reader.onloadend = () => {
                                    setNewOffer({ ...newOffer, image: reader.result as string });
                                  };
                                  reader.readAsDataURL(file);
                                }
                              }}
                            />
                          </label>
                        )}
                      </div>
                      <Button
                        size="sm"
                        className="w-full"
                        onClick={() => {
                          if (newOffer.title && newOffer.discount && newOffer.description) {
                            setPageData({
                              ...pageData,
                              offers: [
                                ...pageData.offers,
                                { ...newOffer }
                              ]
                            });
                            setNewOffer({ title: '', description: '', discount: '', image: '' });
                            toast({
                              title: 'Предложение добавлено',
                              description: 'Предложение появится на лендинге',
                            });
                          }
                        }}
                        disabled={!newOffer.title || !newOffer.discount || !newOffer.description}
                      >
                        <Icon name="Plus" size={16} className="mr-2" />
                        Добавить предложение
                      </Button>
                    </div>
                  </CardContent>
                </Card>
            </div>

            {/* Right Sidebar */}
            <div className="space-y-4 sm:space-y-6">
              {/* Templates */}
              <Card className="border-2 border-purple-100 bg-gradient-to-br from-purple-50 to-pink-50">
                <CardHeader className="p-4 sm:p-6">
                  <div className="flex items-center gap-2">
                    <Icon name="Wand2" size={18} className="text-purple-500" />
                    <CardTitle className="text-base sm:text-lg">Готовые шаблоны</CardTitle>
                  </div>
                  <CardDescription className="text-xs sm:text-sm">
                    {templateSubscription?.has_subscription 
                      ? `Подписка активна до ${new Date(templateSubscription.expires_at!).toLocaleDateString('ru-RU')} (${templateSubscription.days_left} дней)`
                      : 'Подписка на 3 месяца'}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 p-4 sm:p-6">
                  <div className="relative">
                    <Button
                      variant="outline"
                      className={`w-full justify-between h-auto p-4 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 ${pageData.template === 'premium' ? 'border-2 border-blue-500 bg-blue-50' : ''}`}
                      onClick={() => applyTemplate('premium')}
                    >
                      <div className="text-left flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Icon name="Crown" size={16} className="text-amber-500" />
                          <span className="font-semibold">Premium</span>
                          {pageData.template === 'premium' && (
                            <Badge className="ml-2 bg-blue-500">Активен</Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground mb-1">+ Блог/Новости</p>
                        <p className="text-xs font-bold text-blue-600">2990 ₽ / 3 месяца</p>
                      </div>
                      <Icon name="ChevronRight" size={20} className="text-gray-400" />
                    </Button>
                  </div>

                  <Button
                    variant="outline"
                    className={`w-full justify-between h-auto p-4 hover:bg-blue-50 ${pageData.template === 'minimal' ? 'border-2 border-green-500 bg-green-50' : ''}`}
                    onClick={() => applyTemplate('minimal')}
                  >
                    <div className="text-left flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Icon name="Minimize2" size={16} className="text-blue-500" />
                        <span className="font-semibold">Minimalism</span>
                        {pageData.template === 'minimal' && (
                          <Badge className="ml-2 bg-green-500">Активен</Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mb-1">Базовые блоки</p>
                      <p className="text-xs font-bold text-green-600">Бесплатно</p>
                    </div>
                    <Icon name="ChevronRight" size={20} className="text-gray-400" />
                  </Button>

                  <div className="relative">
                    <Button
                      variant="outline"
                      className={`w-full justify-between h-auto p-4 hover:bg-purple-50 ${pageData.template === 'luxury' ? 'border-2 border-purple-500 bg-purple-50' : ''}`}
                      onClick={() => applyTemplate('luxury')}
                    >
                      <div className="text-left flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Icon name="Sparkles" size={16} className="text-purple-500" />
                          <span className="font-semibold">Super Premium</span>
                          {pageData.template === 'luxury' && (
                            <Badge className="ml-2 bg-purple-500">Активен</Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground mb-1">+ Блог + Скидки/Сертификаты + Фото к услугам</p>
                        <p className="text-xs font-bold text-purple-600">4990 ₽ / 3 месяца</p>
                      </div>
                      <Icon name="ChevronRight" size={20} className="text-gray-400" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Publish */}
              <Card className="border-2 border-green-100 bg-gradient-to-br from-green-50 to-emerald-50">
                <CardHeader className="p-4 sm:p-6">
                  <div className="flex items-center gap-2">
                    <Icon name="Rocket" size={18} className="text-green-600" />
                    <CardTitle className="text-base sm:text-lg">Публикация</CardTitle>
                  </div>
                  <CardDescription className="text-xs sm:text-sm">Сделайте лендинг доступным</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 p-4 sm:p-6">
                  {isPublished && (
                    <div className="p-3 bg-green-100 border border-green-200 rounded-lg space-y-3">
                      <div className="flex items-center gap-2">
                        <Icon name="CheckCircle2" size={16} className="text-green-600" />
                        <span className="text-sm font-semibold text-green-900">Опубликовано</span>
                      </div>
                      
                      {landingUrl && (
                        <div className="space-y-2">
                          <p className="text-xs font-medium text-green-800">Ссылка на лендинг:</p>
                          <div className="flex items-center gap-2 p-2 bg-white rounded border border-green-300">
                            <input
                              type="text"
                              value={landingUrl}
                              readOnly
                              className="flex-1 text-xs text-gray-700 bg-transparent border-none outline-none cursor-text"
                              onClick={(e) => {
                                e.currentTarget.select();
                                copyPageLink();
                              }}
                            />
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={copyPageLink}
                              className="h-7 px-2 hover:bg-green-50 flex-shrink-0"
                            >
                              <Icon name="Copy" size={14} className="text-green-600" />
                            </Button>
                          </div>
                          <p className="text-xs text-green-700">Используйте эту ссылку для рекламы</p>
                        </div>
                      )}
                    </div>
                  )}
                  <div className="space-y-2">
                    <p className="text-xs text-muted-foreground text-center">
                      Изменения автоматически сохраняются
                    </p>
                    <Button
                      onClick={handlePublish}
                      size="sm"
                      className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-sm"
                    >
                      <Icon name="Rocket" size={16} className="mr-2" />
                      {isPublished ? 'Обновить публикацию' : 'Опубликовать'}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Tips */}
              <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-amber-100">
                <CardHeader className="p-4 sm:p-6">
                  <div className="flex items-center gap-2">
                    <Icon name="Lightbulb" size={18} className="text-amber-600" />
                    <CardTitle className="text-sm sm:text-base">Советы</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3 p-4 sm:p-6">
                  <div className="flex items-start gap-2">
                    <Icon name="Check" size={14} className="text-amber-600 mt-0.5" />
                    <p className="text-xs text-gray-700">Используйте качественные фото</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Icon name="Check" size={14} className="text-amber-600 mt-0.5" />
                    <p className="text-xs text-gray-700">Укажите реальные цены</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Icon name="Check" size={14} className="text-amber-600 mt-0.5" />
                    <p className="text-xs text-gray-700">Добавьте сертификаты</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Icon name="Check" size={14} className="text-amber-600 mt-0.5" />
                    <p className="text-xs text-gray-700">Заполните галерею (3-6 фото)</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Purchase Template Dialog */}
      <Dialog open={isPremiumDialogOpen} onOpenChange={setIsPremiumDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {selectedTemplate === 'premium' ? (
                <>
                  <Icon name="Crown" size={24} className="text-amber-500" />
                  Premium шаблон
                </>
              ) : (
                <>
                  <Icon name="Sparkles" size={24} className="text-purple-500" />
                  Супер Премиум шаблон
                </>
              )}
            </DialogTitle>
            <DialogDescription>
              Разблокируйте дополнительные возможности для вашего лендинга
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg">
              <p className="font-semibold mb-3">Что входит:</p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Icon name="Check" size={16} className="text-green-600" />
                  <span className="text-sm">Все возможности базового шаблона</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Check" size={16} className="text-green-600" />
                  <span className="text-sm">Блок новостей и статей (блог)</span>
                </div>
                {selectedTemplate === 'luxury' && (
                  <>
                    <div className="flex items-center gap-2">
                      <Icon name="Check" size={16} className="text-green-600" />
                      <span className="text-sm">Блок "Скидки и сертификаты" с формой заказа</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="Check" size={16} className="text-green-600" />
                      <span className="text-sm">Прием заявок на email</span>
                    </div>
                  </>
                )}
                <div className="flex items-center gap-2">
                  <Icon name="Check" size={16} className="text-green-600" />
                  <span className="text-sm">Приоритетная поддержка</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm text-gray-600">Единоразовый платеж</p>
                <p className="text-2xl font-bold">
                  {selectedTemplate === 'premium' ? '2 990' : '4 990'} ₽
                </p>
              </div>
              <Badge className="bg-green-500">Навсегда</Badge>
            </div>

            <p className="text-xs text-gray-500">
              После покупки шаблон остается у вас навсегда. Никаких подписок.
            </p>
          </div>

          <DialogFooter className="sm:flex-row gap-2">
            <Button
              variant="outline"
              onClick={() => setIsPremiumDialogOpen(false)}
              className="flex-1"
            >
              Отмена
            </Button>
            <Button
              onClick={handlePurchaseTemplate}
              className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
            >
              <Icon name="CreditCard" size={16} className="mr-2" />
              Купить
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default PageBuilder;