import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import { getUserId } from '@/utils/auth';

interface MastermindLandingData {
  title: string;
  shortDescription: string;
  heroTitle: string;
  heroSubtitle: string;
  coverUrl: string;
  schoolLogoUrl: string;
  eventDate: string;
  location: string;
  maxParticipants: string;
  currentParticipants: string;
  price: string;
  originalPrice: string;
  aboutEvent: string;
  whatYouGet: string[];
  eventProgram: Array<{
    time: string;
    title: string;
    description: string;
  }>;
  host: {
    name: string;
    position: string;
    bio: string;
    photo: string;
    experience: string;
  };
  coHosts: Array<{
    name: string;
    position: string;
    photo: string;
  }>;
  benefits: string[];
  testimonials: Array<{
    name: string;
    text: string;
    rating: number;
    photo: string;
  }>;
  gallery: string[];
  faq: Array<{
    question: string;
    answer: string;
  }>;
  ctaButtonText: string;
  ctaButtonUrl: string;
}

export default function MastermindLandingBuilder() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const editId = searchParams.get('id');
  const [step, setStep] = useState(1);
  const [preview, setPreview] = useState(false);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(!!editId);

  const [data, setData] = useState<MastermindLandingData>({
    title: 'Мастермайнд по развитию массажного бизнеса',
    shortDescription: 'Двухдневное интенсивное погружение в стратегию развития и масштабирования массажной практики',
    heroTitle: 'Выведите свой массажный бизнес на новый уровень',
    heroSubtitle: 'Эксклюзивная встреча владельцев массажных школ и практик для обмена опытом и построения стратегии роста',
    coverUrl: '',
    schoolLogoUrl: '',
    eventDate: '2026-03-15',
    location: 'Москва, отель Метрополь',
    maxParticipants: '20',
    currentParticipants: '0',
    price: '150000',
    originalPrice: '200000',
    aboutEvent: 'Мастермайнд — это уникальный формат закрытой встречи успешных владельцев массажных школ и практик, где мы обмениваемся опытом, решаем бизнес-задачи и выстраиваем стратегии роста.\n\nЗа два дня интенсивной работы вы получите конкретные решения ваших задач, новые связи с коллегами по индустрии и четкий план действий на ближайший год.',
    whatYouGet: [
      'Персональный разбор вашего бизнеса',
      'Обмен опытом с владельцами успешных школ',
      'Готовые стратегии масштабирования',
      'Закрытое комьюнити единомышленников'
    ],
    eventProgram: [
      { time: 'День 1, 10:00-13:00', title: 'Знакомство и диагностика бизнеса', description: 'Представление участников, анализ текущих бизнес-моделей, выявление болевых точек и возможностей роста.' },
      { time: 'День 1, 14:00-18:00', title: 'Стратегии привлечения учеников', description: 'Работаем над маркетинговыми стратегиями: digital-продвижение, партнерства, сарафанное радио, SMM для массажных школ.' },
      { time: 'День 2, 10:00-13:00', title: 'Масштабирование и автоматизация', description: 'Системы управления, найм команды, автоматизация процессов, создание курсов и франшизы.' },
      { time: 'День 2, 14:00-17:00', title: 'Персональные консультации и план действий', description: 'Индивидуальная работа с каждым участником, создание roadmap на год, формирование стратегии роста.' }
    ],
    host: {
      name: 'Елена Петрова',
      position: 'Основатель сети массажных школ "Массаж PRO"',
      bio: 'Опыт в массажной индустрии 15 лет. Создала сеть из 5 школ в России, обучила более 2000 массажистов. Эксперт по построению и масштабированию образовательных проектов в индустрии красоты и здоровья.',
      photo: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=400',
      experience: '15 лет в индустрии, 5 школ, 2000+ выпускников'
    },
    coHosts: [
      { name: 'Александр Смирнов', position: 'Владелец массажной студии "Релакс Зона"', photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100' },
      { name: 'Марина Иванова', position: 'Основатель онлайн-школы массажа', photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100' }
    ],
    benefits: [
      'Закрытое мероприятие (макс. 20 участников)',
      'Персональный разбор каждого бизнеса',
      '2 дня интенсивной работы',
      'Нетворкинг с владельцами школ',
      'Кофе-брейки и ужины включены',
      'Доступ к закрытому комьюнити'
    ],
    testimonials: [
      { name: 'Ольга Кузнецова', text: 'После мастермайнда увеличила поток учеников на 40% за 3 месяца! Получила конкретные инструменты и познакомилась с классными коллегами.', rating: 5, photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100' },
      { name: 'Сергей Волков', text: 'Очень полезный формат. Обмен опытом с владельцами школ дал мне больше, чем годы самостоятельных проб и ошибок.', rating: 5, photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100' }
    ],
    gallery: ['', '', '', ''],
    faq: [
      { question: 'Для кого этот мастермайнд?', answer: 'Для владельцев массажных школ, студий и практик, которые хотят масштабировать свой бизнес и выйти на новый уровень дохода.' },
      { question: 'Что делать, если не смогу приехать?', answer: 'Мы не предоставляем записи мастермайнда, так как формат предполагает живое участие. Рекомендуем планировать поездку заранее.' },
      { question: 'Сколько стоит участие?', answer: 'Стандартная цена 200 000 ₽, но при ранней регистрации действует скидка — 150 000 ₽.' },
      { question: 'Входит ли проживание в стоимость?', answer: 'Нет, проживание оплачивается отдельно. Мы предоставим список рекомендованных отелей рядом с местом проведения.' }
    ],
    ctaButtonText: 'Зарегистрироваться на мастермайнд',
    ctaButtonUrl: ''
  });

  const handleInputChange = (field: keyof MastermindLandingData, value: any) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const handleArrayItemChange = (arrayField: keyof MastermindLandingData, index: number, value: string) => {
    setData(prev => ({
      ...prev,
      [arrayField]: (prev[arrayField] as string[]).map((item, i) => i === index ? value : item)
    }));
  };

  const addArrayItem = (arrayField: keyof MastermindLandingData) => {
    setData(prev => ({
      ...prev,
      [arrayField]: [...(prev[arrayField] as any[]), '']
    }));
  };

  const removeArrayItem = (arrayField: keyof MastermindLandingData, index: number) => {
    setData(prev => ({
      ...prev,
      [arrayField]: (prev[arrayField] as any[]).filter((_, i) => i !== index)
    }));
  };

  useEffect(() => {
    if (editId) {
      loadMastermind();
    }
  }, [editId]);

  const loadMastermind = async () => {
    try {
      setLoading(true);
      const response = await fetch(`https://functions.poehali.dev/95b5e0a7-51f7-4fb1-b196-a49f5feff58f?action=masterminds&id=${editId}&skip_status_check=true`);
      if (response.ok) {
        const mm = await response.json();
        setData({
          title: mm.title || '',
          shortDescription: mm.description || '',
          heroTitle: mm.hero_title || '',
          heroSubtitle: mm.hero_subtitle || '',
          coverUrl: mm.cover_url || '',
          schoolLogoUrl: mm.school_logo_url || '',
          eventDate: mm.event_date ? new Date(mm.event_date).toISOString().split('T')[0] : '',
          location: mm.location || '',
          maxParticipants: mm.max_participants?.toString() || '',
          currentParticipants: mm.current_participants?.toString() || '0',
          price: mm.discount_price?.toString() || mm.price?.toString() || '',
          originalPrice: mm.original_price?.toString() || '',
          aboutEvent: mm.about_event || '',
          whatYouGet: mm.what_you_get || [],
          eventProgram: mm.event_program || [],
          host: mm.host || { name: '', position: '', bio: '', photo: '', experience: '' },
          coHosts: mm.co_hosts || [],
          benefits: mm.benefits || [],
          testimonials: mm.testimonials || [],
          gallery: mm.gallery || [],
          faq: mm.faq || [],
          ctaButtonText: mm.cta_button_text || 'Зарегистрироваться',
          ctaButtonUrl: mm.external_url || ''
        });
      }
    } catch (error) {
      console.error('Load error:', error);
      toast({ title: 'Ошибка', description: 'Не удалось загрузить данные', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const userId = getUserId();
      if (!userId) {
        toast({ title: 'Требуется авторизация', variant: 'destructive' });
        navigate('/login');
        return;
      }

      // Получаем school_id
      const schoolsResponse = await fetch('https://functions.poehali.dev/6ac6b552-624e-4960-a4f1-94f540394c86?action=my_schools', {
        headers: { 'X-User-Id': userId }
      });
      
      if (!schoolsResponse.ok) {
        throw new Error('Не удалось получить данные школы');
      }

      const schoolsData = await schoolsResponse.json();
      const schoolId = schoolsData.schools?.[0]?.id;

      if (!schoolId) {
        toast({ title: 'Ошибка', description: 'Школа не найдена', variant: 'destructive' });
        return;
      }

      // Создаем или обновляем мастермайнд
      const url = editId 
        ? `https://functions.poehali.dev/95b5e0a7-51f7-4fb1-b196-a49f5feff58f?action=masterminds&id=${editId}`
        : 'https://functions.poehali.dev/95b5e0a7-51f7-4fb1-b196-a49f5feff58f?type=masterminds';
      
      const response = await fetch(url, {
        method: editId ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          school_id: schoolId,
          title: data.title,
          description: data.shortDescription,
          event_date: new Date(data.eventDate).toISOString(),
          location: data.location,
          max_participants: parseInt(data.maxParticipants) || null,
          current_participants: parseInt(data.currentParticipants) || 0,
          price: parseFloat(data.price) || null,
          currency: 'RUB',
          external_url: data.ctaButtonUrl,
          original_price: parseFloat(data.originalPrice) || null,
          discount_price: parseFloat(data.price) || null,
          author_name: data.host.name,
          author_photo: data.host.photo,
          author_position: data.host.position,
          event_content: data.aboutEvent,
          hero_title: data.heroTitle,
          hero_subtitle: data.heroSubtitle,
          about_event: data.aboutEvent,
          what_you_get: data.whatYouGet,
          event_program: data.eventProgram,
          host: data.host,
          co_hosts: data.coHosts,
          benefits: data.benefits,
          testimonials: data.testimonials,
          faq: data.faq,
          cta_button_text: data.ctaButtonText,
          coverUrl: data.coverUrl,
          schoolLogoUrl: data.schoolLogoUrl
        })
      });

      if (!response.ok) {
        throw new Error(editId ? 'Не удалось обновить мастермайнд' : 'Не удалось создать мастермайнд');
      }

      toast({ 
        title: 'Успешно!', 
        description: editId ? 'Мастермайнд обновлен' : 'Мастермайнд отправлен на модерацию' 
      });
      navigate('/school/dashboard');
    } catch (error) {
      console.error('Save error:', error);
      toast({ title: 'Ошибка', description: 'Не удалось сохранить мастермайнд', variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Основная информация</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Название мастермайнда</Label>
                <Input value={data.title} onChange={(e) => handleInputChange('title', e.target.value)} />
              </div>
              <div>
                <Label>Краткое описание (1-2 предложения)</Label>
                <Textarea value={data.shortDescription} onChange={(e) => handleInputChange('shortDescription', e.target.value)} rows={2} />
              </div>
              <div>
                <Label>Заголовок на главном экране</Label>
                <Input value={data.heroTitle} onChange={(e) => handleInputChange('heroTitle', e.target.value)} />
              </div>
              <div>
                <Label>Подзаголовок на главном экране</Label>
                <Textarea value={data.heroSubtitle} onChange={(e) => handleInputChange('heroSubtitle', e.target.value)} rows={2} />
              </div>
              <div>
                <Label>Ссылка на фото для шапки</Label>
                <Input value={data.coverUrl} onChange={(e) => handleInputChange('coverUrl', e.target.value)} placeholder="https://example.com/cover.jpg" type="url" />
                <p className="text-xs text-muted-foreground mt-1">Фон первого экрана (рекомендуем 1920x800px)</p>
              </div>
              <div>
                <Label>Ссылка на логотип школы</Label>
                <Input value={data.schoolLogoUrl} onChange={(e) => handleInputChange('schoolLogoUrl', e.target.value)} placeholder="https://example.com/logo.png" type="url" />
                <p className="text-xs text-muted-foreground mt-1">Отображается над заголовком</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Дата события</Label>
                  <Input type="date" value={data.eventDate} onChange={(e) => handleInputChange('eventDate', e.target.value)} />
                </div>
                <div>
                  <Label>Место проведения</Label>
                  <Input value={data.location} onChange={(e) => handleInputChange('location', e.target.value)} placeholder="Москва, отель Метрополь" />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label>Цена (₽)</Label>
                  <Input type="number" value={data.price} onChange={(e) => handleInputChange('price', e.target.value)} />
                </div>
                <div>
                  <Label>Старая цена (₽)</Label>
                  <Input type="number" value={data.originalPrice} onChange={(e) => handleInputChange('originalPrice', e.target.value)} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Макс. участников</Label>
                  <Input type="number" value={data.maxParticipants} onChange={(e) => handleInputChange('maxParticipants', e.target.value)} />
                </div>
                <div>
                  <Label>Текущее количество участников</Label>
                  <Input type="number" value={data.currentParticipants} onChange={(e) => handleInputChange('currentParticipants', e.target.value)} />
                </div>
              </div>
            </CardContent>
          </Card>
        );

      case 2:
        return (
          <Card>
            <CardHeader>
              <CardTitle>О мастермайнде</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Описание мастермайнда (2-3 абзаца)</Label>
                <Textarea value={data.aboutEvent} onChange={(e) => handleInputChange('aboutEvent', e.target.value)} rows={6} />
              </div>
              <div>
                <Label>Что получат участники</Label>
                {data.whatYouGet.map((item, idx) => (
                  <div key={idx} className="flex gap-2 mb-2">
                    <Input value={item} onChange={(e) => handleArrayItemChange('whatYouGet', idx, e.target.value)} />
                    <Button type="button" variant="destructive" size="sm" onClick={() => removeArrayItem('whatYouGet', idx)}>
                      <Icon name="Trash2" size={16} />
                    </Button>
                  </div>
                ))}
                <Button type="button" variant="outline" onClick={() => addArrayItem('whatYouGet')}>
                  <Icon name="Plus" size={16} className="mr-2" />
                  Добавить пункт
                </Button>
              </div>
            </CardContent>
          </Card>
        );

      case 3:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Программа мастермайнда</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {data.eventProgram.map((module, idx) => (
                <div key={idx} className="border rounded-lg p-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">Блок {idx + 1}</h3>
                    <Button type="button" variant="destructive" size="sm" onClick={() => removeArrayItem('eventProgram', idx)}>
                      <Icon name="Trash2" size={16} />
                    </Button>
                  </div>
                  <Input placeholder="Время (День 1, 10:00-13:00)" value={module.time} onChange={(e) => {
                    const newProgram = [...data.eventProgram];
                    newProgram[idx].time = e.target.value;
                    handleInputChange('eventProgram', newProgram);
                  }} />
                  <Input placeholder="Название блока" value={module.title} onChange={(e) => {
                    const newProgram = [...data.eventProgram];
                    newProgram[idx].title = e.target.value;
                    handleInputChange('eventProgram', newProgram);
                  }} />
                  <Textarea placeholder="Описание блока" value={module.description} onChange={(e) => {
                    const newProgram = [...data.eventProgram];
                    newProgram[idx].description = e.target.value;
                    handleInputChange('eventProgram', newProgram);
                  }} rows={3} />
                </div>
              ))}
              <Button type="button" variant="outline" onClick={() => handleInputChange('eventProgram', [...data.eventProgram, { time: '', title: '', description: '' }])}>
                <Icon name="Plus" size={16} className="mr-2" />
                Добавить блок программы
              </Button>
            </CardContent>
          </Card>
        );

      case 4:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Ведущий мастермайнда</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Имя и фамилия</Label>
                <Input value={data.host.name} onChange={(e) => handleInputChange('host', { ...data.host, name: e.target.value })} />
              </div>
              <div>
                <Label>Должность / Титул</Label>
                <Input value={data.host.position} onChange={(e) => handleInputChange('host', { ...data.host, position: e.target.value })} />
              </div>
              <div>
                <Label>Биография</Label>
                <Textarea value={data.host.bio} onChange={(e) => handleInputChange('host', { ...data.host, bio: e.target.value })} rows={4} />
              </div>
              <div>
                <Label>Опыт (краткая строка)</Label>
                <Input value={data.host.experience} onChange={(e) => handleInputChange('host', { ...data.host, experience: e.target.value })} />
              </div>
              <div>
                <Label>Ссылка на фото</Label>
                <Input value={data.host.photo} onChange={(e) => handleInputChange('host', { ...data.host, photo: e.target.value })} />
              </div>

              <div className="mt-6">
                <Label>Со-ведущие (опционально)</Label>
                {data.coHosts.map((coHost, idx) => (
                  <div key={idx} className="border rounded-lg p-4 space-y-3 mb-3">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">Со-ведущий {idx + 1}</h4>
                      <Button type="button" variant="destructive" size="sm" onClick={() => removeArrayItem('coHosts', idx)}>
                        <Icon name="Trash2" size={16} />
                      </Button>
                    </div>
                    <Input placeholder="Имя" value={coHost.name} onChange={(e) => {
                      const newCoHosts = [...data.coHosts];
                      newCoHosts[idx].name = e.target.value;
                      handleInputChange('coHosts', newCoHosts);
                    }} />
                    <Input placeholder="Должность" value={coHost.position} onChange={(e) => {
                      const newCoHosts = [...data.coHosts];
                      newCoHosts[idx].position = e.target.value;
                      handleInputChange('coHosts', newCoHosts);
                    }} />
                    <Input placeholder="Ссылка на фото" value={coHost.photo} onChange={(e) => {
                      const newCoHosts = [...data.coHosts];
                      newCoHosts[idx].photo = e.target.value;
                      handleInputChange('coHosts', newCoHosts);
                    }} />
                  </div>
                ))}
                <Button type="button" variant="outline" onClick={() => handleInputChange('coHosts', [...data.coHosts, { name: '', position: '', photo: '' }])}>
                  <Icon name="Plus" size={16} className="mr-2" />
                  Добавить со-ведущего
                </Button>
              </div>
            </CardContent>
          </Card>
        );

      case 5:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Преимущества и FAQ</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label>Преимущества участия</Label>
                {data.benefits.map((benefit, idx) => (
                  <div key={idx} className="flex gap-2 mb-2">
                    <Input value={benefit} onChange={(e) => handleArrayItemChange('benefits', idx, e.target.value)} />
                    <Button type="button" variant="destructive" size="sm" onClick={() => removeArrayItem('benefits', idx)}>
                      <Icon name="Trash2" size={16} />
                    </Button>
                  </div>
                ))}
                <Button type="button" variant="outline" onClick={() => addArrayItem('benefits')}>
                  <Icon name="Plus" size={16} className="mr-2" />
                  Добавить преимущество
                </Button>
              </div>

              <div>
                <Label>Часто задаваемые вопросы</Label>
                {data.faq.map((item, idx) => (
                  <div key={idx} className="border rounded-lg p-4 space-y-3 mb-3">
                    <div className="flex justify-between">
                      <h4 className="font-medium">Вопрос {idx + 1}</h4>
                      <Button type="button" variant="destructive" size="sm" onClick={() => removeArrayItem('faq', idx)}>
                        <Icon name="Trash2" size={16} />
                      </Button>
                    </div>
                    <Input placeholder="Вопрос" value={item.question} onChange={(e) => {
                      const newFaq = [...data.faq];
                      newFaq[idx].question = e.target.value;
                      handleInputChange('faq', newFaq);
                    }} />
                    <Textarea placeholder="Ответ" value={item.answer} onChange={(e) => {
                      const newFaq = [...data.faq];
                      newFaq[idx].answer = e.target.value;
                      handleInputChange('faq', newFaq);
                    }} rows={3} />
                  </div>
                ))}
                <Button type="button" variant="outline" onClick={() => handleInputChange('faq', [...data.faq, { question: '', answer: '' }])}>
                  <Icon name="Plus" size={16} className="mr-2" />
                  Добавить вопрос
                </Button>
              </div>

              <div>
                <Label>Текст кнопки регистрации</Label>
                <Input value={data.ctaButtonText} onChange={(e) => handleInputChange('ctaButtonText', e.target.value)} />
              </div>
              <div>
                <Label>Ссылка для регистрации (обязательно)</Label>
                <Input value={data.ctaButtonUrl} onChange={(e) => handleInputChange('ctaButtonUrl', e.target.value)} placeholder="https://..." />
              </div>
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-secondary/5 flex items-center justify-center">
        <Icon name="Loader2" size={48} className="animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/5">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">{editId ? 'Редактирование мастермайнда' : 'Создание мастермайнда'}</h1>
              <p className="text-muted-foreground">Шаг {step} из 5</p>
            </div>
            <Button variant="outline" onClick={() => navigate('/school/dashboard')}>
              <Icon name="ArrowLeft" size={18} className="mr-2" />
              Назад
            </Button>
          </div>

          <div className="mb-6">
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((s) => (
                <div key={s} className={`h-2 flex-1 rounded ${s <= step ? 'bg-primary' : 'bg-secondary'}`} />
              ))}
            </div>
          </div>

          {renderStep()}

          <div className="flex gap-4 mt-6">
            {step > 1 && (
              <Button variant="outline" onClick={() => setStep(step - 1)}>
                <Icon name="ChevronLeft" size={18} className="mr-2" />
                Назад
              </Button>
            )}
            
            {editId && (
              <Button 
                variant="secondary" 
                onClick={handleSave} 
                disabled={saving}
                className="ml-auto"
              >
                {saving ? (
                  <>
                    <Icon name="Loader2" size={18} className="mr-2 animate-spin" />
                    Сохранение...
                  </>
                ) : (
                  <>
                    <Icon name="Save" size={18} className="mr-2" />
                    Сохранить изменения
                  </>
                )}
              </Button>
            )}
            
            {step < 5 ? (
              <Button onClick={() => setStep(step + 1)} className={editId ? '' : 'ml-auto'}>
                Далее
                <Icon name="ChevronRight" size={18} className="ml-2" />
              </Button>
            ) : !editId ? (
              <Button onClick={handleSave} disabled={saving || !data.ctaButtonUrl} className="ml-auto">
                {saving ? (
                  <>
                    <Icon name="Loader2" size={18} className="mr-2 animate-spin" />
                    Сохранение...
                  </>
                ) : (
                  <>
                    <Icon name="Check" size={18} className="mr-2" />
                    Отправить на модерацию
                  </>
                )}
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}