import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';
import { EditorSidebar } from '@/components/landing-editor/EditorSidebar';
import { EditorSectionMain } from '@/components/landing-editor/EditorSectionMain';
import { EditorSectionContent } from '@/components/landing-editor/EditorSectionContent';
import { EditorSectionMeta } from '@/components/landing-editor/EditorSectionMeta';

const LANDING_API_URL = 'https://functions.poehali.dev/a81dd7cd-c267-4f44-85f5-0da8353dc741';

interface LandingFormData {
  school_id: number;
  title: string;
  short_description: string;
  type: string;
  category: string;
  cover_url: string;
  cta_button_text: string;
  author_name: string;
  author_photo_url: string;
  author_position: string;
  author_description: string;
  author_experience: string;
  duration: string;
  lesson_format: string;
  support_info: string;
  access_period: string;
  city: string;
  location: string;
  event_dates: string;
  days_count: number | null;
  price_text: string;
  payment_format: string;
  discount_info: string;
  partner_link: string;
  promo_description: string;
  notification_email: string;
  notification_text: string;
  seo_title: string;
  seo_description: string;
  slug: string;
  status: string;
  target_audience: Array<{ title: string; description: string; icon_url: string; sort_order: number }>;
  results: string[];
  program: Array<{ module_name: string; description: string; sort_order: number }>;
  bonuses: Array<{ bonus_name: string; description: string; sort_order: number }>;
}

const INITIAL_FORM: LandingFormData = {
  school_id: 1,
  title: '',
  short_description: '',
  type: 'онлайн',
  category: '',
  cover_url: '',
  cta_button_text: 'Запросить промокод',
  author_name: '',
  author_photo_url: '',
  author_position: '',
  author_description: '',
  author_experience: '',
  duration: '',
  lesson_format: '',
  support_info: '',
  access_period: '',
  city: '',
  location: '',
  event_dates: '',
  days_count: null,
  price_text: '',
  payment_format: '',
  discount_info: '',
  partner_link: '',
  promo_description: '',
  notification_email: '',
  notification_text: '',
  seo_title: '',
  seo_description: '',
  slug: '',
  status: 'draft',
  target_audience: [],
  results: [],
  program: [],
  bonuses: []
};

export default function CourseLandingEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [form, setForm] = useState<LandingFormData>(INITIAL_FORM);
  const [loading, setLoading] = useState(false);
  const [section, setSection] = useState<'main' | 'author' | 'audience' | 'results' | 'program' | 'format' | 'bonuses' | 'pricing' | 'promo' | 'seo'>('main');

  useEffect(() => {
    if (id) {
      loadLanding();
    } else {
      loadUserSchool();
    }
  }, [id]);

  const loadUserSchool = async () => {
    try {
      const userId = localStorage.getItem('userId');
      const response = await fetch(`https://functions.poehali.dev/6ac6b552-624e-4960-a4f1-94f540394c86?action=my_schools`, {
        headers: { 'X-User-Id': userId || '' }
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data.schools && data.schools.length > 0) {
          const school = data.schools[0];
          setForm(prev => ({
            ...prev,
            school_id: school.id
          }));
        }
      }
    } catch (error) {
      console.log('Не удалось загрузить школу');
    }
  };

  const loadLanding = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${LANDING_API_URL}?id=${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (response.ok) {
        const data = await response.json();
        setForm(data);
      }
    } catch (error) {
      toast({ title: 'Ошибка', description: 'Не удалось загрузить лендинг', variant: 'destructive' });
    }
  };

  const handleSave = async () => {
    if (!form.title || !form.slug) {
      toast({ title: 'Ошибка', description: 'Заполните название и URL', variant: 'destructive' });
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const url = id ? `${LANDING_API_URL}?id=${id}` : LANDING_API_URL;
      const method = id ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      });

      if (response.ok) {
        toast({ title: 'Успех', description: 'Лендинг сохранён' });
        navigate('/school-dashboard');
      } else {
        toast({ title: 'Ошибка', description: 'Не удалось сохранить', variant: 'destructive' });
      }
    } catch (error) {
      toast({ title: 'Ошибка', description: 'Ошибка сохранения', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const handleFormChange = (updates: Partial<LandingFormData>) => {
    setForm({ ...form, ...updates });
  };

  const addTargetAudience = () => {
    setForm({
      ...form,
      target_audience: [...form.target_audience, { title: '', description: '', icon_url: '', sort_order: form.target_audience.length }]
    });
  };

  const addResult = () => {
    setForm({ ...form, results: [...form.results, ''] });
  };

  const addProgramModule = () => {
    setForm({
      ...form,
      program: [...form.program, { module_name: '', description: '', sort_order: form.program.length }]
    });
  };

  const addBonus = () => {
    setForm({
      ...form,
      bonuses: [...form.bonuses, { bonus_name: '', description: '', sort_order: form.bonuses.length }]
    });
  };

  const sections = [
    { id: 'main', label: 'Основная информация', icon: 'Info' },
    { id: 'author', label: 'Автор курса', icon: 'User' },
    { id: 'audience', label: 'Для кого курс', icon: 'Users' },
    { id: 'results', label: 'Результаты обучения', icon: 'Target' },
    { id: 'program', label: 'Программа курса', icon: 'BookOpen' },
    { id: 'format', label: 'Формат обучения', icon: 'Calendar' },
    { id: 'bonuses', label: 'Бонусы', icon: 'Gift' },
    { id: 'pricing', label: 'Стоимость', icon: 'DollarSign' },
    { id: 'promo', label: 'Промокод', icon: 'Tag' },
    { id: 'seo', label: 'SEO', icon: 'Search' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">{id ? 'Редактировать лендинг' : 'Создать лендинг'}</h1>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => navigate('/school/dashboard')}>
              <Icon name="X" className="mr-2" size={16} />
              Отмена
            </Button>
            <Button onClick={handleSave} disabled={loading}>
              <Icon name="Save" className="mr-2" size={16} />
              Сохранить
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-3">
            <EditorSidebar
              sections={sections}
              currentSection={section}
              onSectionChange={(sectionId) => setSection(sectionId as any)}
            />
          </div>

          <div className="col-span-9">
            <div className="bg-card rounded-lg p-6">
              <EditorSectionMain
                section={section}
                form={form}
                onFormChange={handleFormChange}
              />
              <EditorSectionContent
                section={section}
                form={form}
                onFormChange={handleFormChange}
                onAddTargetAudience={addTargetAudience}
                onAddResult={addResult}
                onAddProgramModule={addProgramModule}
                onAddBonus={addBonus}
              />
              <EditorSectionMeta
                section={section}
                form={form}
                onFormChange={handleFormChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}