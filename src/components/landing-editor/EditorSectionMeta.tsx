import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface LandingFormData {
  format: string;
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
}

interface EditorSectionMetaProps {
  section: string;
  form: LandingFormData;
  onFormChange: (updates: Partial<LandingFormData>) => void;
}

export function EditorSectionMeta({ section, form, onFormChange }: EditorSectionMetaProps) {
  if (section === 'format') {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold mb-4">Формат обучения</h2>
        {(form.format === 'онлайн' || form.format === 'гибрид') && (
          <>
            <div>
              <label className="block text-sm font-medium mb-1">Длительность</label>
              <Input
                value={form.duration}
                onChange={(e) => onFormChange({ duration: e.target.value })}
                placeholder="Например: 2 месяца"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Формат уроков</label>
              <Textarea
                value={form.lesson_format}
                onChange={(e) => onFormChange({ lesson_format: e.target.value })}
                placeholder="Видеоуроки, вебинары и т.д."
                rows={2}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Информация о поддержке</label>
              <Textarea
                value={form.support_info}
                onChange={(e) => onFormChange({ support_info: e.target.value })}
                placeholder="Поддержка куратора в чате"
                rows={2}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Срок доступа к материалам</label>
              <Input
                value={form.access_period}
                onChange={(e) => onFormChange({ access_period: e.target.value })}
                placeholder="Например: 6 месяцев"
              />
            </div>
          </>
        )}
        {(form.format === 'офлайн' || form.format === 'гибрид') && (
          <>
            <div>
              <label className="block text-sm font-medium mb-1">Город</label>
              <Input
                value={form.city}
                onChange={(e) => onFormChange({ city: e.target.value })}
                placeholder="Москва"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Место проведения</label>
              <Input
                value={form.location}
                onChange={(e) => onFormChange({ location: e.target.value })}
                placeholder="Адрес или название места"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Даты проведения</label>
              <Input
                value={form.event_dates}
                onChange={(e) => onFormChange({ event_dates: e.target.value })}
                placeholder="15-17 марта 2024"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Количество дней</label>
              <Input
                type="number"
                value={form.days_count || ''}
                onChange={(e) => onFormChange({ days_count: e.target.value ? parseInt(e.target.value) : null })}
                placeholder="3"
              />
            </div>
          </>
        )}
      </div>
    );
  }

  if (section === 'pricing') {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold mb-4">Стоимость</h2>
        <div>
          <label className="block text-sm font-medium mb-1">Цена (текст)</label>
          <Input
            value={form.price_text}
            onChange={(e) => onFormChange({ price_text: e.target.value })}
            placeholder="Например: 25 000 ₽"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Формат оплаты</label>
          <Input
            value={form.payment_format}
            onChange={(e) => onFormChange({ payment_format: e.target.value })}
            placeholder="Например: Можно в рассрочку"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Информация о скидке</label>
          <Input
            value={form.discount_info}
            onChange={(e) => onFormChange({ discount_info: e.target.value })}
            placeholder="Например: Скидка 20% до конца месяца"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Ссылка на страницу курса (партнёрская)</label>
          <Input
            value={form.partner_link}
            onChange={(e) => onFormChange({ partner_link: e.target.value })}
            placeholder="https://..."
          />
        </div>
      </div>
    );
  }

  if (section === 'promo') {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold mb-4">Промокод и уведомления</h2>
        <div>
          <label className="block text-sm font-medium mb-1">Описание промокода</label>
          <Textarea
            value={form.promo_description}
            onChange={(e) => onFormChange({ promo_description: e.target.value })}
            placeholder="Информация о промокоде"
            rows={3}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email для уведомлений</label>
          <Input
            type="email"
            value={form.notification_email}
            onChange={(e) => onFormChange({ notification_email: e.target.value })}
            placeholder="email@example.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Текст уведомления</label>
          <Textarea
            value={form.notification_text}
            onChange={(e) => onFormChange({ notification_text: e.target.value })}
            placeholder="Текст письма при регистрации"
            rows={4}
          />
        </div>
      </div>
    );
  }

  if (section === 'seo') {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold mb-4">SEO настройки</h2>
        <div>
          <label className="block text-sm font-medium mb-1">URL (slug) *</label>
          <Input
            value={form.slug}
            onChange={(e) => onFormChange({ slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '') })}
            placeholder="massage-course-2024"
          />
          <p className="text-xs text-muted-foreground mt-1">
            Адрес лендинга: /landing/{form.slug || 'your-slug'}
          </p>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">SEO заголовок</label>
          <Input
            value={form.seo_title}
            onChange={(e) => onFormChange({ seo_title: e.target.value })}
            placeholder="Заголовок для поисковиков"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">SEO описание</label>
          <Textarea
            value={form.seo_description}
            onChange={(e) => onFormChange({ seo_description: e.target.value })}
            placeholder="Описание для поисковиков"
            rows={3}
          />
        </div>
      </div>
    );
  }

  return null;
}
