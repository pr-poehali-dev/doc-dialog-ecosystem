import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import VacancyForm from '@/components/VacancyForm';

interface Vacancy {
  id?: number;
  specializations: string[];
  schedule: string;
  salary_from: number | null;
  salary_to: number | null;
  salary_currency: string;
  requirements: string;
  requires_partner_courses: boolean;
  is_active?: boolean;
}

interface SalonProfileFormProps {
  formData: {
    name: string;
    description: string;
    city: string;
    phone: string;
    address: string;
    email: string;
    website: string;
    photos: string[];
    vacancies: Vacancy[];
  };
  photoInput: string;
  setFormData: (data: any) => void;
  setPhotoInput: (value: string) => void;
  onSubmit: () => void;
  onCancel: () => void;
}

export default function SalonProfileForm({
  formData,
  photoInput,
  setFormData,
  setPhotoInput,
  onSubmit,
  onCancel,
}: SalonProfileFormProps) {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="edit-name">Название салона</Label>
        <Input
          id="edit-name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      </div>
      <div>
        <Label htmlFor="edit-description">Описание</Label>
        <Textarea
          id="edit-description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={4}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="edit-city">Город</Label>
          <Input
            id="edit-city"
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="edit-phone">Телефон</Label>
          <Input
            id="edit-phone"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
        </div>
      </div>
      <div>
        <Label htmlFor="edit-address">Адрес</Label>
        <Input
          id="edit-address"
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
        />
      </div>
      <div>
        <Label htmlFor="edit-email">Email</Label>
        <Input
          id="edit-email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
      </div>
      <div>
        <Label htmlFor="edit-website">Сайт</Label>
        <Input
          id="edit-website"
          value={formData.website}
          onChange={(e) => setFormData({ ...formData, website: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label>Фото салона</Label>
        <div className="flex gap-2">
          <Input
            value={photoInput}
            onChange={(e) => setPhotoInput(e.target.value)}
            placeholder="Ссылка на фото"
          />
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              if (photoInput.trim()) {
                setFormData({ ...formData, photos: [...formData.photos, photoInput.trim()] });
                setPhotoInput('');
              }
            }}
          >
            <Icon name="Plus" size={16} />
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {formData.photos.map((photo, idx) => (
            <div key={idx} className="relative group">
              <img src={photo} alt="" className="w-20 h-20 object-cover rounded" />
              <button
                type="button"
                onClick={() =>
                  setFormData({ ...formData, photos: formData.photos.filter((_, i) => i !== idx) })
                }
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Icon name="X" size={12} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <VacancyForm
        vacancies={formData.vacancies}
        onChange={(vacancies) => setFormData({ ...formData, vacancies })}
      />

      <div className="flex gap-2">
        <Button onClick={onSubmit}>Сохранить</Button>
        <Button variant="outline" onClick={onCancel}>
          Отмена
        </Button>
      </div>
    </div>
  );
}
