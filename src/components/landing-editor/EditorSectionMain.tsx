import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface LandingFormData {
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
}

interface EditorSectionMainProps {
  section: string;
  form: LandingFormData;
  onFormChange: (updates: Partial<LandingFormData>) => void;
}

export function EditorSectionMain({ section, form, onFormChange }: EditorSectionMainProps) {
  if (section === 'main') {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold mb-4">Основная информация</h2>
        <div>
          <label className="block text-sm font-medium mb-1">Название курса *</label>
          <Input
            value={form.title}
            onChange={(e) => onFormChange({ title: e.target.value })}
            placeholder="Например: Профессиональный массаж за 2 месяца"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Краткое описание</label>
          <Textarea
            value={form.short_description}
            onChange={(e) => onFormChange({ short_description: e.target.value })}
            placeholder="Краткое описание курса"
            rows={3}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Формат</label>
            <select
              value={form.format}
              onChange={(e) => onFormChange({ format: e.target.value })}
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
              onChange={(e) => onFormChange({ category: e.target.value })}
              placeholder="Например: Массаж"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Ссылка на обложку</label>
          <Input
            value={form.cover_url}
            onChange={(e) => onFormChange({ cover_url: e.target.value })}
            placeholder="https://..."
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Текст кнопки CTA</label>
          <Input
            value={form.cta_button_text}
            onChange={(e) => onFormChange({ cta_button_text: e.target.value })}
            placeholder="Записаться на курс"
          />
        </div>
      </div>
    );
  }

  if (section === 'author') {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold mb-4">Автор курса</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Имя и фамилия</label>
            <Input
              value={form.author_name}
              onChange={(e) => onFormChange({ author_name: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Должность</label>
            <Input
              value={form.author_position}
              onChange={(e) => onFormChange({ author_position: e.target.value })}
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Фото автора (URL)</label>
          <Input
            value={form.author_photo_url}
            onChange={(e) => onFormChange({ author_photo_url: e.target.value })}
            placeholder="https://..."
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Описание автора</label>
          <Textarea
            value={form.author_description}
            onChange={(e) => onFormChange({ author_description: e.target.value })}
            rows={3}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Опыт</label>
          <Textarea
            value={form.author_experience}
            onChange={(e) => onFormChange({ author_experience: e.target.value })}
            rows={2}
          />
        </div>
      </div>
    );
  }

  return null;
}
