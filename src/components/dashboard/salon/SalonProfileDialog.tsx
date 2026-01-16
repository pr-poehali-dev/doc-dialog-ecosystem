import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const SALON_API = 'https://functions.poehali.dev/01aa5a2f-6476-4fbc-ba10-6808960c8a21';

interface SalonFormData {
  name: string;
  description: string;
  logo_url: string;
  website: string;
  phone: string;
  email: string;
  city: string;
  address: string;
  photos: string[];
}

interface SalonProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  salonExists: boolean;
  formData: SalonFormData;
  setFormData: (data: SalonFormData) => void;
  onSaved: () => void;
}

export default function SalonProfileDialog({
  open,
  onOpenChange,
  salonExists,
  formData,
  setFormData,
  onSaved
}: SalonProfileDialogProps) {
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);
  const [photoInput, setPhotoInput] = useState('');

  const handleSave = async () => {
    if (!formData.name || !formData.description || !formData.city || !formData.address || !formData.phone) {
      toast({
        title: 'Ошибка',
        description: 'Заполните все обязательные поля',
        variant: 'destructive',
      });
      return;
    }

    setSaving(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${SALON_API}?action=update_salon`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        toast({
          title: 'Успешно',
          description: salonExists 
            ? 'Профиль обновлен и отправлен на модерацию'
            : 'Профиль создан и отправлен на модерацию',
        });
        onOpenChange(false);
        onSaved();
      } else {
        const error = await res.json();
        toast({
          title: 'Ошибка',
          description: error.error || 'Не удалось сохранить профиль',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Произошла ошибка при сохранении',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{salonExists ? 'Редактировать профиль салона' : 'Создать профиль салона'}</DialogTitle>
          <DialogDescription>
            {salonExists 
              ? 'Обновите информацию о вашем салоне. Изменения будут отправлены на повторную модерацию.'
              : 'Заполните информацию о салоне. После отправки профиль будет рассмотрен администратором.'
            }
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Название салона *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="Например: Салон массажа «Релакс»"
            />
          </div>

          <div>
            <Label htmlFor="description">Описание *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="Расскажите о вашем салоне, услугах, специализации..."
              rows={4}
            />
          </div>

          <div>
            <Label htmlFor="city">Город *</Label>
            <Input
              id="city"
              value={formData.city}
              onChange={(e) => setFormData({...formData, city: e.target.value})}
              placeholder="Например: Москва"
            />
          </div>

          <div>
            <Label htmlFor="address">Адрес *</Label>
            <Input
              id="address"
              value={formData.address}
              onChange={(e) => setFormData({...formData, address: e.target.value})}
              placeholder="Например: ул. Ленина, д. 10"
            />
          </div>

          <div>
            <Label htmlFor="phone">Телефон *</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              placeholder="+7 (999) 123-45-67"
            />
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              placeholder="salon@example.com"
            />
          </div>

          <div>
            <Label htmlFor="website">Сайт</Label>
            <Input
              id="website"
              value={formData.website}
              onChange={(e) => setFormData({...formData, website: e.target.value})}
              placeholder="https://example.com"
            />
          </div>

          <div>
            <Label htmlFor="logo_url">URL логотипа</Label>
            <Input
              id="logo_url"
              value={formData.logo_url}
              onChange={(e) => setFormData({...formData, logo_url: e.target.value})}
              placeholder="https://example.com/logo.png"
            />
          </div>

          <div>
            <Label>Фотографии салона</Label>
            <div className="space-y-2">
              <div className="flex gap-2">
                <Input
                  value={photoInput}
                  onChange={(e) => setPhotoInput(e.target.value)}
                  placeholder="URL фотографии"
                />
                <Button
                  type="button"
                  onClick={() => {
                    if (photoInput.trim()) {
                      setFormData({...formData, photos: [...formData.photos, photoInput.trim()]});
                      setPhotoInput('');
                    }
                  }}
                >
                  Добавить
                </Button>
              </div>
              {formData.photos.length > 0 && (
                <div className="space-y-1">
                  {formData.photos.map((photo, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <span className="flex-1 truncate">{photo}</span>
                      <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          setFormData({
                            ...formData,
                            photos: formData.photos.filter((_, i) => i !== index)
                          });
                        }}
                      >
                        Удалить
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button
              onClick={handleSave}
              disabled={saving}
            >
              {saving ? 'Сохранение...' : (salonExists ? 'Обновить профиль' : 'Создать профиль')}
            </Button>
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Отмена
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
