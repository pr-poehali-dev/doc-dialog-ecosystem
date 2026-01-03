import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface SchoolEditorMetaProps {
  formData: any;
  setFormData: (data: any) => void;
}

export function SchoolEditorMeta({ formData, setFormData }: SchoolEditorMetaProps) {
  const updateField = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">SEO настройки</h3>
        <div className="space-y-4">
          <div>
            <Label htmlFor="seo_title">SEO заголовок</Label>
            <Input
              id="seo_title"
              value={formData.seo_title}
              onChange={(e) => updateField('seo_title', e.target.value)}
              placeholder="Название школы — Лучшие курсы массажа"
            />
          </div>

          <div>
            <Label htmlFor="seo_description">SEO описание</Label>
            <Textarea
              id="seo_description"
              value={formData.seo_description}
              onChange={(e) => updateField('seo_description', e.target.value)}
              placeholder="Описание для поисковых систем..."
              rows={3}
            />
          </div>
        </div>
      </div>

      <div className="pt-6 border-t">
        <h3 className="text-lg font-semibold mb-4">Контактная информация</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="phone">Телефон</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => updateField('phone', e.target.value)}
              placeholder="+7 (999) 123-45-67"
            />
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => updateField('email', e.target.value)}
              placeholder="info@school.ru"
            />
          </div>

          <div>
            <Label htmlFor="website">Веб-сайт</Label>
            <Input
              id="website"
              value={formData.website}
              onChange={(e) => updateField('website', e.target.value)}
              placeholder="https://school.ru"
            />
          </div>

          <div>
            <Label htmlFor="whatsapp">WhatsApp</Label>
            <Input
              id="whatsapp"
              value={formData.whatsapp}
              onChange={(e) => updateField('whatsapp', e.target.value)}
              placeholder="79991234567"
            />
          </div>

          <div>
            <Label htmlFor="telegram">Telegram</Label>
            <Input
              id="telegram"
              value={formData.telegram}
              onChange={(e) => updateField('telegram', e.target.value)}
              placeholder="https://t.me/username"
            />
          </div>

          <div>
            <Label htmlFor="vk">VK</Label>
            <Input
              id="vk"
              value={formData.vk}
              onChange={(e) => updateField('vk', e.target.value)}
              placeholder="https://vk.com/school"
            />
          </div>

          <div>
            <Label htmlFor="instagram">Instagram</Label>
            <Input
              id="instagram"
              value={formData.instagram}
              onChange={(e) => updateField('instagram', e.target.value)}
              placeholder="https://instagram.com/school"
            />
          </div>
        </div>
      </div>

      <div className="pt-6 border-t">
        <h3 className="text-lg font-semibold mb-4">Призыв к действию (CTA)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="cta_button_text">Текст кнопки</Label>
            <Input
              id="cta_button_text"
              value={formData.cta_button_text}
              onChange={(e) => updateField('cta_button_text', e.target.value)}
              placeholder="Оставить заявку"
            />
          </div>

          <div>
            <Label htmlFor="cta_button_url">Ссылка кнопки</Label>
            <Input
              id="cta_button_url"
              value={formData.cta_button_url}
              onChange={(e) => updateField('cta_button_url', e.target.value)}
              placeholder="https://forms.yandex.ru/..."
            />
          </div>
        </div>
      </div>
    </div>
  );
}
