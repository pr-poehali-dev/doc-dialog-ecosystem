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
    { name: 'Классический массаж', duration: '60 мин', price: '3500', description: 'Глубокая проработка всех групп мышц' },
    { name: 'Релаксационный массаж', duration: '90 мин', price: '4800', description: 'Снятие напряжения и полное расслабление' },
    { name: 'Спортивный массаж', duration: '60 мин', price: '4000', description: 'Восстановление после тренировок' },
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
  colorTheme: 'gradient',
};

export default function PageBuilder() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [pageData, setPageData] = useState(defaultPageData);

  const [isPublished, setIsPublished] = useState(false);

  useEffect(() => {
    const savedData = localStorage.getItem('pageBuilderData');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setPageData({ ...defaultPageData, ...parsed });
      } catch (e) {
        console.error('Failed to load saved data', e);
      }
    }
  }, []);
  const [uploadingHero, setUploadingHero] = useState(false);
  const [uploadingProfile, setUploadingProfile] = useState(false);
  const [uploadingGallery, setUploadingGallery] = useState(false);
  const [uploadingCert, setUploadingCert] = useState(false);
  const [uploadingBlog, setUploadingBlog] = useState(false);
  const [uploadingOffer, setUploadingOffer] = useState(false);
  const [newReview, setNewReview] = useState({ name: '', rating: 5, text: '' });
  const [newBlogPost, setNewBlogPost] = useState({ title: '', content: '', image: '' });
  const [newOffer, setNewOffer] = useState({ title: '', description: '', discount: '', image: '' });
  const [isPremiumDialogOpen, setIsPremiumDialogOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState('');

  const handleImageUpload = async (file: File, type: 'hero' | 'profile' | 'gallery' | 'certificate') => {
    if (!file) return;

    const setLoading = type === 'hero' ? setUploadingHero : 
                       type === 'profile' ? setUploadingProfile :
                       type === 'gallery' ? setUploadingGallery : setUploadingCert;
    
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

  const handleSave = () => {
    localStorage.setItem('pageBuilderData', JSON.stringify(pageData));
    toast({
      title: "Черновик сохранен",
      description: "Ваши изменения сохранены",
    });
  };

  const handlePublish = () => {
    localStorage.setItem('pageBuilderData', JSON.stringify(pageData));
    setIsPublished(true);
    toast({
      title: "Страница опубликована!",
      description: "Теперь клиенты могут увидеть ваш лендинг",
    });
  };

  const copyPageLink = () => {
    const link = `https://dokdialog.ru/masseur/${pageData.heroTitle.toLowerCase().replace(/\s+/g, '-')}`;
    navigator.clipboard.writeText(link);
    toast({
      title: "Ссылка скопирована",
      description: "Поделитесь с клиентами",
    });
  };

  const addService = () => {
    setPageData({
      ...pageData,
      services: [...pageData.services, { name: '', duration: '', price: '', description: '' }]
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

  const handlePurchaseTemplate = () => {
    // Здесь будет логика оплаты
    setPageData({
      ...pageData,
      template: selectedTemplate,
    });
    setIsPremiumDialogOpen(false);
    applyTemplate(selectedTemplate as 'premium' | 'luxury');
    toast({
      title: "Шаблон приобретен!",
      description: "Теперь вам доступны все возможности выбранного шаблона",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <Button variant="ghost" onClick={() => navigate('/dashboard')}>
              <Icon name="ArrowLeft" size={20} />
            </Button>
            <div className="flex-1">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Конструктор премиум-лендинга
              </h1>
              <p className="text-muted-foreground">Создайте страницу, которая привлекает клиентов</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => {
                localStorage.setItem('pageBuilderData', JSON.stringify(pageData));
                window.open('/dashboard/page-preview', '_blank');
              }}>
                <Icon name="Eye" size={18} className="mr-2" />
                Предпросмотр
              </Button>
              {isPublished && (
                <Button variant="secondary" onClick={copyPageLink}>
                  <Icon name="Copy" size={18} className="mr-2" />
                  Ссылка
                </Button>
              )}
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {/* Hero Section */}
              <Card className="border-2 border-blue-100 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center">
                      <Icon name="Sparkles" className="text-white" size={20} />
                    </div>
                    <div>
                      <CardTitle>Главный экран</CardTitle>
                      <CardDescription>Первое впечатление решает всё</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4 pt-6">
                  <div className="space-y-2">
                    <Label className="text-base font-semibold">Фоновое фото Hero-блока</Label>
                    <p className="text-xs text-muted-foreground mb-3">
                      Загрузите атмосферное фото массажного кабинета или spa-зоны
                    </p>
                    {pageData.heroImage ? (
                      <div className="relative group">
                        <img 
                          src={pageData.heroImage} 
                          alt="Hero" 
                          className="w-full h-48 object-cover rounded-lg"
                        />
                        <Button
                          size="sm"
                          variant="destructive"
                          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => setPageData({ ...pageData, heroImage: '' })}
                        >
                          <Icon name="Trash2" size={16} />
                        </Button>
                      </div>
                    ) : (
                      <label className="flex flex-col items-center justify-center h-48 border-2 border-dashed border-blue-300 rounded-lg cursor-pointer hover:border-blue-500 transition-colors bg-blue-50/50">
                        <Icon name="Upload" size={32} className="text-blue-400 mb-2" />
                        <span className="text-sm text-blue-600 font-medium">Загрузить фото</span>
                        <span className="text-xs text-muted-foreground mt-1">JPG, PNG до 5MB</span>
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
                    <Label className="text-base font-semibold">Ваше фото (профиль)</Label>
                    {pageData.profilePhoto ? (
                      <div className="flex items-center gap-4">
                        <img 
                          src={pageData.profilePhoto} 
                          alt="Profile" 
                          className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                        />
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setPageData({ ...pageData, profilePhoto: '' })}
                        >
                          <Icon name="Trash2" size={16} className="mr-2" />
                          Удалить
                        </Button>
                      </div>
                    ) : (
                      <label className="flex items-center gap-4 p-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition-colors">
                        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center">
                          <Icon name="User" size={32} className="text-white" />
                        </div>
                        <div>
                          <span className="text-sm font-medium text-blue-600">Загрузить фото</span>
                          <p className="text-xs text-muted-foreground">Профессиональное фото специалиста</p>
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
                    <Label className="text-base font-semibold">Заголовок</Label>
                    <Input
                      placeholder="Массаж, который возвращает энергию"
                      value={pageData.heroTitle}
                      onChange={(e) => setPageData({ ...pageData, heroTitle: e.target.value })}
                      className="text-lg"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-base font-semibold">Подзаголовок</Label>
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
                      <Input
                        placeholder="Название услуги"
                        value={service.name}
                        onChange={(e) => updateService(index, 'name', e.target.value)}
                      />
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
                      <Textarea
                        placeholder="Краткое описание услуги (необязательно)"
                        value={service.description}
                        onChange={(e) => updateService(index, 'description', e.target.value)}
                        rows={2}
                      />
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

              {/* Reviews */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Icon name="Star" size={20} className="text-amber-500" />
                      <div>
                        <CardTitle>Отзывы клиентов</CardTitle>
                        <CardDescription>Добавьте отзывы о работе</CardDescription>
                      </div>
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
                    <Input
                      placeholder="Имя клиента"
                      value={newReview.name}
                      onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                    />
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
                    <Textarea
                      placeholder="Текст отзыва"
                      value={newReview.text}
                      onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}
                      rows={3}
                    />
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
                </CardContent>
              </Card>

              {/* Blog Section - Premium/Luxury only */}
              {(pageData.template === 'premium' || pageData.template === 'luxury') && (
                <Card>
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
                      <Input
                        placeholder="Заголовок поста"
                        value={newBlogPost.title}
                        onChange={(e) => setNewBlogPost({ ...newBlogPost, title: e.target.value })}
                      />
                      <Textarea
                        placeholder="Текст поста"
                        value={newBlogPost.content}
                        onChange={(e) => setNewBlogPost({ ...newBlogPost, content: e.target.value })}
                        rows={4}
                      />
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
              )}

              {/* Offers Section - Super Premium only */}
              {pageData.template === 'luxury' && (
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <Icon name="Tag" size={20} className="text-rose-500" />
                      <div className="flex-1">
                        <CardTitle>Скидки и сертификаты</CardTitle>
                        <CardDescription>Специальные предложения с формой заказа</CardDescription>
                      </div>
                      <Badge className="bg-gradient-to-r from-purple-500 to-pink-500">Супер Премиум</Badge>
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
                      <Input
                        placeholder="Название (например: Скидка 20% на первый сеанс)"
                        value={newOffer.title}
                        onChange={(e) => setNewOffer({ ...newOffer, title: e.target.value })}
                      />
                      <Input
                        placeholder="Размер скидки (например: -20% или -1000₽)"
                        value={newOffer.discount}
                        onChange={(e) => setNewOffer({ ...newOffer, discount: e.target.value })}
                      />
                      <Textarea
                        placeholder="Описание предложения и условий"
                        value={newOffer.description}
                        onChange={(e) => setNewOffer({ ...newOffer, description: e.target.value })}
                        rows={3}
                      />
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
              )}
            </div>

            {/* Right Sidebar */}
            <div className="space-y-6">
              {/* Templates */}
              <Card className="border-2 border-purple-100 bg-gradient-to-br from-purple-50 to-pink-50">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Icon name="Wand2" size={20} className="text-purple-500" />
                    <CardTitle>Готовые шаблоны</CardTitle>
                  </div>
                  <CardDescription>Применить профессиональный дизайн</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
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
                        <p className="text-xs font-bold text-blue-600">2990 ₽</p>
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
                        <p className="text-xs text-muted-foreground mb-1">+ Блог + Скидки/Сертификаты</p>
                        <p className="text-xs font-bold text-purple-600">4990 ₽</p>
                      </div>
                      <Icon name="ChevronRight" size={20} className="text-gray-400" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Publish */}
              <Card className="border-2 border-green-100 bg-gradient-to-br from-green-50 to-emerald-50">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Icon name="Rocket" size={20} className="text-green-600" />
                    <CardTitle>Публикация</CardTitle>
                  </div>
                  <CardDescription>Сделайте лендинг доступным</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {isPublished && (
                    <div className="p-3 bg-green-100 border border-green-200 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Icon name="CheckCircle2" size={16} className="text-green-600" />
                        <span className="text-sm font-semibold text-green-900">Опубликовано</span>
                      </div>
                      <p className="text-xs text-green-700">Ваш лендинг доступен клиентам</p>
                    </div>
                  )}
                  <Button
                    onClick={handlePublish}
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                  >
                    <Icon name="Rocket" size={18} className="mr-2" />
                    {isPublished ? 'Обновить публикацию' : 'Опубликовать'}
                  </Button>
                  <Button
                    onClick={handleSave}
                    variant="outline"
                    className="w-full"
                  >
                    <Icon name="Save" size={18} className="mr-2" />
                    Сохранить черновик
                  </Button>
                </CardContent>
              </Card>

              {/* Tips */}
              <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-amber-100">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Icon name="Lightbulb" size={20} className="text-amber-600" />
                    <CardTitle className="text-base">Советы</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
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