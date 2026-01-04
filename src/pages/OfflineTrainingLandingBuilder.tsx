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

interface OfflineTrainingLandingData {
  title: string;
  shortDescription: string;
  heroTitle: string;
  heroSubtitle: string;
  eventDate: string;
  location: string;
  maxParticipants: string;
  currentParticipants: string;
  price: string;
  originalPrice: string;
  aboutTraining: string;
  whatYouGet: string[];
  trainingProgram: Array<{
    time: string;
    title: string;
    description: string;
  }>;
  instructor: {
    name: string;
    position: string;
    bio: string;
    photo: string;
    experience: string;
  };
  coInstructors: Array<{
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
  faq: Array<{
    question: string;
    answer: string;
  }>;
  ctaButtonText: string;
  ctaButtonUrl: string;
}

export default function OfflineTrainingLandingBuilder() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const editId = searchParams.get('id');
  const [step, setStep] = useState(1);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(!!editId);

  const [data, setData] = useState<OfflineTrainingLandingData>({
    title: 'Интенсивный курс классического массажа',
    shortDescription: 'Практическое обучение техникам классического массажа с получением сертификата',
    heroTitle: 'Освойте профессию массажиста за 2 недели',
    heroSubtitle: 'Интенсивное очное обучение с практикой на реальных клиентах и гарантией трудоустройства',
    eventDate: '2026-04-01',
    location: 'Москва, ул. Тверская, 10',
    maxParticipants: '12',
    currentParticipants: '0',
    price: '45000',
    originalPrice: '60000',
    aboutTraining: 'Это полноценный курс обучения массажу, где вы освоите все основные техники классического массажа. Программа включает теоретические занятия и максимум практики.\n\nВы научитесь работать с различными зонами тела, освоите анатомию и физиологию, получите навыки работы с клиентами.',
    whatYouGet: [
      'Сертификат государственного образца',
      '80 часов практики на реальных моделях',
      'Методические материалы и схемы массажа',
      'Поддержка преподавателя после окончания',
      'Помощь в трудоустройстве'
    ],
    trainingProgram: [
      { time: 'Неделя 1, дни 1-3', title: 'Теория и анатомия', description: 'Изучение анатомии, физиологии, противопоказаний. Базовые техники и приемы классического массажа.' },
      { time: 'Неделя 1, дни 4-5', title: 'Массаж спины и шеи', description: 'Детальная проработка техник массажа спины, воротниковой зоны, шеи. Практика на моделях.' },
      { time: 'Неделя 2, дни 1-3', title: 'Массаж конечностей', description: 'Техники массажа рук и ног, работа с суставами. Лимфодренажные приемы.' },
      { time: 'Неделя 2, дни 4-5', title: 'Итоговая аттестация', description: 'Проведение полноценного сеанса массажа, защита практической работы, получение сертификата.' }
    ],
    instructor: {
      name: 'Анна Сергеева',
      position: 'Массажист-реабилитолог, стаж 12 лет',
      bio: 'Преподаватель массажа с опытом работы более 12 лет. Сертифицированный специалист по классическому, спортивному и лечебному массажу. Обучила более 500 массажистов.',
      photo: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400',
      experience: '12 лет практики, 500+ выпускников'
    },
    coInstructors: [],
    benefits: [
      'Группы до 12 человек',
      'Практика на реальных клиентах',
      'Массажное оборудование в аренду',
      'Сертификат гос. образца',
      'Поддержка после обучения',
      'Помощь в трудоустройстве'
    ],
    testimonials: [
      { name: 'Мария Иванова', text: 'Отличный курс! За две недели освоила массаж и уже работаю в салоне. Преподаватели объясняют доступно, много практики.', rating: 5, photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100' },
      { name: 'Дмитрий Соколов', text: 'Прошёл курс для себя, но теперь подрабатываю массажистом. Очень довольн качеством обучения!', rating: 5, photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100' }
    ],
    faq: [
      { question: 'Нужна ли медицинская подготовка?', answer: 'Нет, курс подходит для новичков без медицинского образования. Мы даем всю необходимую теоретическую базу.' },
      { question: 'Что входит в стоимость?', answer: 'В стоимость входит обучение, методические материалы, практика на моделях, аренда массажного оборудования и сертификат.' },
      { question: 'Можно ли получить рассрочку?', answer: 'Да, возможна рассрочка на 3 месяца без процентов.' },
      { question: 'Как проходит аттестация?', answer: 'Итоговая аттестация — это проведение полноценного сеанса массажа перед преподавателем. После успешной сдачи выдается сертификат.' }
    ],
    ctaButtonText: 'Записаться на обучение',
    ctaButtonUrl: ''
  });

  const handleInputChange = (field: keyof OfflineTrainingLandingData, value: any) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const handleArrayItemChange = (arrayField: keyof OfflineTrainingLandingData, index: number, value: string) => {
    setData(prev => ({
      ...prev,
      [arrayField]: (prev[arrayField] as string[]).map((item, i) => i === index ? value : item)
    }));
  };

  const addArrayItem = (arrayField: keyof OfflineTrainingLandingData) => {
    setData(prev => ({
      ...prev,
      [arrayField]: [...(prev[arrayField] as any[]), '']
    }));
  };

  const removeArrayItem = (arrayField: keyof OfflineTrainingLandingData, index: number) => {
    setData(prev => ({
      ...prev,
      [arrayField]: (prev[arrayField] as any[]).filter((_, i) => i !== index)
    }));
  };

  useEffect(() => {
    if (editId) {
      loadTraining();
    }
  }, [editId]);

  const loadTraining = async () => {
    try {
      setLoading(true);
      const response = await fetch(`https://functions.poehali.dev/95b5e0a7-51f7-4fb1-b196-a49f5feff58f?action=offline_trainings&id=${editId}&skip_status_check=true`);
      if (response.ok) {
        const training = await response.json();
        setData({
          title: training.title || '',
          shortDescription: training.description || '',
          heroTitle: training.hero_title || '',
          heroSubtitle: training.hero_subtitle || '',
          eventDate: training.event_date ? new Date(training.event_date).toISOString().split('T')[0] : '',
          location: training.location || '',
          maxParticipants: training.max_participants?.toString() || '',
          currentParticipants: training.current_participants?.toString() || '0',
          price: training.discount_price?.toString() || training.price?.toString() || '',
          originalPrice: training.original_price?.toString() || '',
          aboutTraining: training.about_training || '',
          whatYouGet: training.what_you_get || [],
          trainingProgram: training.training_program || [],
          instructor: training.instructor || { name: '', position: '', bio: '', photo: '', experience: '' },
          coInstructors: training.co_instructors || [],
          benefits: training.benefits || [],
          testimonials: training.testimonials || [],
          faq: training.faq || [],
          ctaButtonText: training.cta_button_text || 'Записаться на обучение',
          ctaButtonUrl: training.external_url || ''
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

      const url = editId 
        ? `https://functions.poehali.dev/95b5e0a7-51f7-4fb1-b196-a49f5feff58f?action=offline_trainings&id=${editId}`
        : 'https://functions.poehali.dev/95b5e0a7-51f7-4fb1-b196-a49f5feff58f?type=offline_trainings';
      
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
          author_name: data.instructor.name,
          author_photo: data.instructor.photo,
          hero_title: data.heroTitle,
          hero_subtitle: data.heroSubtitle,
          about_training: data.aboutTraining,
          what_you_get: data.whatYouGet,
          training_program: data.trainingProgram,
          instructor: data.instructor,
          co_instructors: data.coInstructors,
          benefits: data.benefits,
          testimonials: data.testimonials,
          faq: data.faq,
          cta_button_text: data.ctaButtonText
        })
      });

      if (!response.ok) {
        throw new Error(editId ? 'Не удалось обновить обучение' : 'Не удалось создать обучение');
      }

      toast({ 
        title: 'Успешно!', 
        description: editId ? 'Обучение обновлено' : 'Обучение отправлено на модерацию' 
      });
      navigate('/school/dashboard');
    } catch (error) {
      console.error('Save error:', error);
      toast({ title: 'Ошибка', description: 'Не удалось сохранить обучение', variant: 'destructive' });
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
                <Label>Название обучения</Label>
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
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Дата начала</Label>
                  <Input type="date" value={data.eventDate} onChange={(e) => handleInputChange('eventDate', e.target.value)} />
                </div>
                <div>
                  <Label>Место проведения</Label>
                  <Input value={data.location} onChange={(e) => handleInputChange('location', e.target.value)} placeholder="Москва, ул. Тверская, 10" />
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
              <CardTitle>О курсе</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Описание курса (2-3 абзаца)</Label>
                <Textarea value={data.aboutTraining} onChange={(e) => handleInputChange('aboutTraining', e.target.value)} rows={6} />
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
              <CardTitle>Программа обучения</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {data.trainingProgram.map((module, idx) => (
                <div key={idx} className="border rounded-lg p-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">Блок {idx + 1}</h3>
                    <Button type="button" variant="destructive" size="sm" onClick={() => removeArrayItem('trainingProgram', idx)}>
                      <Icon name="Trash2" size={16} />
                    </Button>
                  </div>
                  <Input placeholder="Время (Неделя 1, дни 1-3)" value={module.time} onChange={(e) => {
                    const newProgram = [...data.trainingProgram];
                    newProgram[idx].time = e.target.value;
                    handleInputChange('trainingProgram', newProgram);
                  }} />
                  <Input placeholder="Название блока" value={module.title} onChange={(e) => {
                    const newProgram = [...data.trainingProgram];
                    newProgram[idx].title = e.target.value;
                    handleInputChange('trainingProgram', newProgram);
                  }} />
                  <Textarea placeholder="Описание блока" value={module.description} onChange={(e) => {
                    const newProgram = [...data.trainingProgram];
                    newProgram[idx].description = e.target.value;
                    handleInputChange('trainingProgram', newProgram);
                  }} rows={3} />
                </div>
              ))}
              <Button type="button" variant="outline" onClick={() => handleInputChange('trainingProgram', [...data.trainingProgram, { time: '', title: '', description: '' }])}>
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
              <CardTitle>Преподаватель</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Имя и фамилия</Label>
                <Input value={data.instructor.name} onChange={(e) => handleInputChange('instructor', { ...data.instructor, name: e.target.value })} />
              </div>
              <div>
                <Label>Должность / Специализация</Label>
                <Input value={data.instructor.position} onChange={(e) => handleInputChange('instructor', { ...data.instructor, position: e.target.value })} />
              </div>
              <div>
                <Label>Биография</Label>
                <Textarea value={data.instructor.bio} onChange={(e) => handleInputChange('instructor', { ...data.instructor, bio: e.target.value })} rows={4} />
              </div>
              <div>
                <Label>Опыт (краткая строка)</Label>
                <Input value={data.instructor.experience} onChange={(e) => handleInputChange('instructor', { ...data.instructor, experience: e.target.value })} />
              </div>
              <div>
                <Label>Ссылка на фото</Label>
                <Input value={data.instructor.photo} onChange={(e) => handleInputChange('instructor', { ...data.instructor, photo: e.target.value })} />
              </div>

              <div className="mt-6">
                <Label>Со-преподаватели (опционально)</Label>
                {data.coInstructors.map((coInstr, idx) => (
                  <div key={idx} className="border rounded-lg p-4 space-y-3 mb-3">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">Со-преподаватель {idx + 1}</h4>
                      <Button type="button" variant="destructive" size="sm" onClick={() => removeArrayItem('coInstructors', idx)}>
                        <Icon name="Trash2" size={16} />
                      </Button>
                    </div>
                    <Input placeholder="Имя" value={coInstr.name} onChange={(e) => {
                      const newCoInstr = [...data.coInstructors];
                      newCoInstr[idx].name = e.target.value;
                      handleInputChange('coInstructors', newCoInstr);
                    }} />
                    <Input placeholder="Должность" value={coInstr.position} onChange={(e) => {
                      const newCoInstr = [...data.coInstructors];
                      newCoInstr[idx].position = e.target.value;
                      handleInputChange('coInstructors', newCoInstr);
                    }} />
                    <Input placeholder="Ссылка на фото" value={coInstr.photo} onChange={(e) => {
                      const newCoInstr = [...data.coInstructors];
                      newCoInstr[idx].photo = e.target.value;
                      handleInputChange('coInstructors', newCoInstr);
                    }} />
                  </div>
                ))}
                <Button type="button" variant="outline" onClick={() => handleInputChange('coInstructors', [...data.coInstructors, { name: '', position: '', photo: '' }])}>
                  <Icon name="Plus" size={16} className="mr-2" />
                  Добавить со-преподавателя
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
                <Label>Преимущества обучения</Label>
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
              <h1 className="text-3xl font-bold mb-2">{editId ? 'Редактирование обучения' : 'Создание очного обучения'}</h1>
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
