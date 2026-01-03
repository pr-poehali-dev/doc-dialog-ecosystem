import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

interface SchoolEditorBasicInfoProps {
  formData: any;
  setFormData: (data: any) => void;
}

export function SchoolEditorBasicInfo({ formData, setFormData }: SchoolEditorBasicInfoProps) {
  const updateField = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="name">Название школы *</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => updateField('name', e.target.value)}
            placeholder="Школа массажа"
          />
        </div>

        <div>
          <Label htmlFor="slug">URL-адрес (slug) *</Label>
          <Input
            id="slug"
            value={formData.slug}
            onChange={(e) => updateField('slug', e.target.value)}
            placeholder="shkola-massazha"
          />
          <p className="text-xs text-gray-500 mt-1">Будет: /school/{formData.slug || 'slug'}</p>
        </div>
      </div>

      <div>
        <Label htmlFor="short_description">Краткое описание</Label>
        <Textarea
          id="short_description"
          value={formData.short_description}
          onChange={(e) => updateField('short_description', e.target.value)}
          placeholder="Профессиональная школа массажа с лицензией"
          rows={2}
        />
      </div>

      <div>
        <Label htmlFor="description">Полное описание</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => updateField('description', e.target.value)}
          placeholder="Подробное описание школы..."
          rows={4}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="logo_url">URL логотипа</Label>
          <Input
            id="logo_url"
            value={formData.logo_url}
            onChange={(e) => updateField('logo_url', e.target.value)}
            placeholder="https://example.com/logo.png"
          />
        </div>

        <div>
          <Label htmlFor="cover_url">URL обложки</Label>
          <Input
            id="cover_url"
            value={formData.cover_url}
            onChange={(e) => updateField('cover_url', e.target.value)}
            placeholder="https://example.com/cover.jpg"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="city">Город</Label>
          <Input
            id="city"
            value={formData.city}
            onChange={(e) => updateField('city', e.target.value)}
            placeholder="Москва"
          />
        </div>

        <div>
          <Label htmlFor="address">Адрес</Label>
          <Input
            id="address"
            value={formData.address}
            onChange={(e) => updateField('address', e.target.value)}
            placeholder="ул. Ленина, д. 1"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 pt-4 border-t">
        <Checkbox
          id="is_author_school"
          checked={formData.is_author_school}
          onCheckedChange={(checked) => updateField('is_author_school', checked)}
        />
        <Label htmlFor="is_author_school" className="cursor-pointer">
          Авторская школа (не требуется лицензия)
        </Label>
      </div>

      {!formData.is_author_school && (
        <div>
          <Label htmlFor="license_number">Номер лицензии</Label>
          <Input
            id="license_number"
            value={formData.license_number}
            onChange={(e) => updateField('license_number', e.target.value)}
            placeholder="№ 12345"
          />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <Label htmlFor="founded_year">Год основания</Label>
          <Input
            id="founded_year"
            type="number"
            value={formData.founded_year || ''}
            onChange={(e) => updateField('founded_year', parseInt(e.target.value) || null)}
            placeholder="2020"
          />
        </div>

        <div>
          <Label htmlFor="students_count">Количество студентов</Label>
          <Input
            id="students_count"
            type="number"
            value={formData.students_count || ''}
            onChange={(e) => updateField('students_count', parseInt(e.target.value) || null)}
            placeholder="500"
          />
        </div>

        <div>
          <Label htmlFor="teachers_count">Количество преподавателей</Label>
          <Input
            id="teachers_count"
            type="number"
            value={formData.teachers_count || ''}
            onChange={(e) => updateField('teachers_count', parseInt(e.target.value) || null)}
            placeholder="10"
          />
        </div>
      </div>
    </div>
  );
}
