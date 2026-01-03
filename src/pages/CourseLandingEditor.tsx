import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';

const LANDING_API_URL = 'https://functions.poehali.dev/428c2825-cfd3-4c2c-9666-df1320295ced';

interface LandingFormData {
  school_id: number;
  title: string;
  short_description: string;
  format: string;
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
  format: 'онлайн',
  category: '',
  cover_url: '',
  cta_button_text: 'Записаться на курс',
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
    }
  }, [id]);

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
            <Button variant="outline" onClick={() => navigate('/school-dashboard')}>
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
          {/* Навигация по секциям */}
          <div className="col-span-3">
            <div className="bg-card rounded-lg p-4 sticky top-4">
              <h3 className="font-semibold mb-3">Разделы</h3>
              <div className="space-y-1">
                {sections.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSection(s.id as any)}
                    className={`w-full text-left px-3 py-2 rounded-md flex items-center gap-2 transition-colors ${
                      section === s.id ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
                    }`}
                  >
                    <Icon name={s.icon as any} size={16} />
                    <span className="text-sm">{s.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Контент секций */}
          <div className="col-span-9">
            <div className="bg-card rounded-lg p-6">
              {section === 'main' && (
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold mb-4">Основная информация</h2>
                  <div>
                    <label className="block text-sm font-medium mb-1">Название курса *</label>
                    <Input
                      value={form.title}
                      onChange={(e) => setForm({ ...form, title: e.target.value })}
                      placeholder="Например: Профессиональный массаж за 2 месяца"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Краткое описание</label>
                    <Textarea
                      value={form.short_description}
                      onChange={(e) => setForm({ ...form, short_description: e.target.value })}
                      placeholder="Краткое описание курса"
                      rows={3}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Формат</label>
                      <select
                        value={form.format}
                        onChange={(e) => setForm({ ...form, format: e.target.value })}
                        className="w-full px-3 py-2 border rounded-md"
                      >
                        <option value="онлайн">Онлайн</option>
                        <option value="офлайн">Офлайн</option>
                        <option value="гибрид">Гибрид</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Направление</label>
                      <Input
                        value={form.category}
                        onChange={(e) => setForm({ ...form, category: e.target.value })}
                        placeholder="Например: Массаж"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Ссылка на обложку</label>
                    <Input
                      value={form.cover_url}
                      onChange={(e) => setForm({ ...form, cover_url: e.target.value })}
                      placeholder="https://..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Текст кнопки CTA</label>
                    <Input
                      value={form.cta_button_text}
                      onChange={(e) => setForm({ ...form, cta_button_text: e.target.value })}
                      placeholder="Записаться на курс"
                    />
                  </div>
                </div>
              )}

              {section === 'author' && (
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold mb-4">Автор курса</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Имя и фамилия</label>
                      <Input
                        value={form.author_name}
                        onChange={(e) => setForm({ ...form, author_name: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Должность</label>
                      <Input
                        value={form.author_position}
                        onChange={(e) => setForm({ ...form, author_position: e.target.value })}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Фото автора (URL)</label>
                    <Input
                      value={form.author_photo_url}
                      onChange={(e) => setForm({ ...form, author_photo_url: e.target.value })}
                      placeholder="https://..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Описание автора</label>
                    <Textarea
                      value={form.author_description}
                      onChange={(e) => setForm({ ...form, author_description: e.target.value })}
                      rows={3}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Опыт</label>
                    <Textarea
                      value={form.author_experience}
                      onChange={(e) => setForm({ ...form, author_experience: e.target.value })}
                      rows={2}
                    />
                  </div>
                </div>
              )}

              {section === 'audience' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold">Для кого курс</h2>
                    <Button size="sm" onClick={addTargetAudience}>
                      <Icon name="Plus" className="mr-2" size={16} />
                      Добавить
                    </Button>
                  </div>
                  {form.target_audience.map((item, idx) => (
                    <div key={idx} className="p-4 border rounded-lg space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Блок {idx + 1}</span>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setForm({ ...form, target_audience: form.target_audience.filter((_, i) => i !== idx) })}
                        >
                          <Icon name="Trash2" size={16} />
                        </Button>
                      </div>
                      <Input
                        value={item.title}
                        onChange={(e) => {
                          const updated = [...form.target_audience];
                          updated[idx].title = e.target.value;
                          setForm({ ...form, target_audience: updated });
                        }}
                        placeholder="Заголовок"
                      />
                      <Textarea
                        value={item.description}
                        onChange={(e) => {
                          const updated = [...form.target_audience];
                          updated[idx].description = e.target.value;
                          setForm({ ...form, target_audience: updated });
                        }}
                        placeholder="Описание"
                        rows={2}
                      />
                      <Input
                        value={item.icon_url}
                        onChange={(e) => {
                          const updated = [...form.target_audience];
                          updated[idx].icon_url = e.target.value;
                          setForm({ ...form, target_audience: updated });
                        }}
                        placeholder="Ссылка на иконку"
                      />
                    </div>
                  ))}
                </div>
              )}

              {section === 'results' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold">Результаты обучения</h2>
                    <Button size="sm" onClick={addResult}>
                      <Icon name="Plus" className="mr-2" size={16} />
                      Добавить
                    </Button>
                  </div>
                  {form.results.map((result, idx) => (
                    <div key={idx} className="flex gap-2">
                      <Input
                        value={result}
                        onChange={(e) => {
                          const updated = [...form.results];
                          updated[idx] = e.target.value;
                          setForm({ ...form, results: updated });
                        }}
                        placeholder={`Результат ${idx + 1}`}
                      />
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setForm({ ...form, results: form.results.filter((_, i) => i !== idx) })}
                      >
                        <Icon name="Trash2" size={16} />
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              {section === 'program' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold">Программа курса</h2>
                    <Button size="sm" onClick={addProgramModule}>
                      <Icon name="Plus" className="mr-2" size={16} />
                      Добавить модуль
                    </Button>
                  </div>
                  {form.program.map((module, idx) => (
                    <div key={idx} className="p-4 border rounded-lg space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Модуль {idx + 1}</span>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setForm({ ...form, program: form.program.filter((_, i) => i !== idx) })}
                        >
                          <Icon name="Trash2" size={16} />
                        </Button>
                      </div>
                      <Input
                        value={module.module_name}
                        onChange={(e) => {
                          const updated = [...form.program];
                          updated[idx].module_name = e.target.value;
                          setForm({ ...form, program: updated });
                        }}
                        placeholder="Название модуля"
                      />
                      <Textarea
                        value={module.description}
                        onChange={(e) => {
                          const updated = [...form.program];
                          updated[idx].description = e.target.value;
                          setForm({ ...form, program: updated });
                        }}
                        placeholder="Описание"
                        rows={2}
                      />
                    </div>
                  ))}
                </div>
              )}

              {section === 'format' && (
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold mb-4">Формат обучения</h2>
                  {(form.format === 'онлайн' || form.format === 'гибрид') && (
                    <>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">Длительность</label>
                          <Input
                            value={form.duration}
                            onChange={(e) => setForm({ ...form, duration: e.target.value })}
                            placeholder="Например: 8 недель"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Срок доступа</label>
                          <Input
                            value={form.access_period}
                            onChange={(e) => setForm({ ...form, access_period: e.target.value })}
                            placeholder="Например: 6 месяцев"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Формат уроков</label>
                        <Textarea
                          value={form.lesson_format}
                          onChange={(e) => setForm({ ...form, lesson_format: e.target.value })}
                          rows={2}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Поддержка</label>
                        <Textarea
                          value={form.support_info}
                          onChange={(e) => setForm({ ...form, support_info: e.target.value })}
                          rows={2}
                        />
                      </div>
                    </>
                  )}
                  {(form.format === 'офлайн' || form.format === 'гибрид') && (
                    <>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">Город</label>
                          <Input
                            value={form.city}
                            onChange={(e) => setForm({ ...form, city: e.target.value })}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Количество дней</label>
                          <Input
                            type="number"
                            value={form.days_count || ''}
                            onChange={(e) => setForm({ ...form, days_count: Number(e.target.value) || null })}
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Место проведения</label>
                        <Input
                          value={form.location}
                          onChange={(e) => setForm({ ...form, location: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Даты</label>
                        <Input
                          value={form.event_dates}
                          onChange={(e) => setForm({ ...form, event_dates: e.target.value })}
                          placeholder="Например: 15-17 марта 2024"
                        />
                      </div>
                    </>
                  )}
                </div>
              )}

              {section === 'bonuses' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold">Бонусы</h2>
                    <Button size="sm" onClick={addBonus}>
                      <Icon name="Plus" className="mr-2" size={16} />
                      Добавить
                    </Button>
                  </div>
                  {form.bonuses.map((bonus, idx) => (
                    <div key={idx} className="p-4 border rounded-lg space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Бонус {idx + 1}</span>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setForm({ ...form, bonuses: form.bonuses.filter((_, i) => i !== idx) })}
                        >
                          <Icon name="Trash2" size={16} />
                        </Button>
                      </div>
                      <Input
                        value={bonus.bonus_name}
                        onChange={(e) => {
                          const updated = [...form.bonuses];
                          updated[idx].bonus_name = e.target.value;
                          setForm({ ...form, bonuses: updated });
                        }}
                        placeholder="Название бонуса"
                      />
                      <Textarea
                        value={bonus.description}
                        onChange={(e) => {
                          const updated = [...form.bonuses];
                          updated[idx].description = e.target.value;
                          setForm({ ...form, bonuses: updated });
                        }}
                        placeholder="Описание"
                        rows={2}
                      />
                    </div>
                  ))}
                </div>
              )}

              {section === 'pricing' && (
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold mb-4">Стоимость и условия</h2>
                  <div>
                    <label className="block text-sm font-medium mb-1">Цена (текст)</label>
                    <Input
                      value={form.price_text}
                      onChange={(e) => setForm({ ...form, price_text: e.target.value })}
                      placeholder="Например: 50 000 ₽"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Формат оплаты</label>
                    <Textarea
                      value={form.payment_format}
                      onChange={(e) => setForm({ ...form, payment_format: e.target.value })}
                      placeholder="Например: Рассрочка 0-0-12"
                      rows={2}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Информация о скидках</label>
                    <Textarea
                      value={form.discount_info}
                      onChange={(e) => setForm({ ...form, discount_info: e.target.value })}
                      rows={2}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Партнёрская ссылка (необязательно)</label>
                    <Input
                      value={form.partner_link}
                      onChange={(e) => setForm({ ...form, partner_link: e.target.value })}
                      placeholder="https://..."
                    />
                  </div>
                </div>
              )}

              {section === 'promo' && (
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold mb-4">Промокод</h2>
                  <div>
                    <label className="block text-sm font-medium mb-1">Описание механики</label>
                    <Textarea
                      value={form.promo_description}
                      onChange={(e) => setForm({ ...form, promo_description: e.target.value })}
                      rows={3}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Email для уведомлений</label>
                    <Input
                      type="email"
                      value={form.notification_email}
                      onChange={(e) => setForm({ ...form, notification_email: e.target.value })}
                      placeholder="school@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Текст письма</label>
                    <Textarea
                      value={form.notification_text}
                      onChange={(e) => setForm({ ...form, notification_text: e.target.value })}
                      rows={4}
                    />
                  </div>
                </div>
              )}

              {section === 'seo' && (
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold mb-4">SEO и публикация</h2>
                  <div>
                    <label className="block text-sm font-medium mb-1">SEO Title</label>
                    <Input
                      value={form.seo_title}
                      onChange={(e) => setForm({ ...form, seo_title: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">SEO Description</label>
                    <Textarea
                      value={form.seo_description}
                      onChange={(e) => setForm({ ...form, seo_description: e.target.value })}
                      rows={3}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">URL (slug) *</label>
                    <Input
                      value={form.slug}
                      onChange={(e) => setForm({ ...form, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-') })}
                      placeholder="professional-massage-course"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Статус публикации</label>
                    <select
                      value={form.status}
                      onChange={(e) => setForm({ ...form, status: e.target.value })}
                      className="w-full px-3 py-2 border rounded-md"
                    >
                      <option value="draft">Черновик</option>
                      <option value="published">Опубликован</option>
                      <option value="hidden">Скрыт</option>
                    </select>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
