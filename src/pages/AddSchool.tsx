import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const BACKEND_URL = 'https://functions.poehali.dev/6ac6b552-624e-4960-a4f1-94f540394c86';

export default function AddSchool() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    short_description: '',
    description: '',
    logo_url: '',
    cover_url: '',
    learning_direction: '',
    format: 'hybrid',
    city: '',
    phone: '',
    email: '',
    website: ''
  });

  const updateField = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name) {
      alert('Укажите название школы');
      return;
    }

    setLoading(true);
    try {
      const userId = localStorage.getItem('userId');
      
      const res = await fetch(BACKEND_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-User-Id': userId || ''
        },
        body: JSON.stringify(formData)
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Ошибка создания школы');
      }

      const result = await res.json();
      alert('Школа успешно создана! Ожидайте модерации.');
      navigate(`/school/landing/edit/${result.id}`);
    } catch (error: any) {
      console.error('Ошибка:', error);
      alert(error.message || 'Не удалось создать школу');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mb-4"
          >
            <Icon name="ArrowLeft" size={20} className="mr-2" />
            Назад
          </Button>
          <h1 className="text-3xl font-bold">Добавить школу</h1>
          <p className="text-gray-600 mt-2">
            Создайте страницу вашей школы. После модерации она появится в каталоге.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Основная информация</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name">Название школы *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  placeholder="Школа массажа Релакс"
                  required
                />
              </div>

              <div>
                <Label htmlFor="short_description">Краткое описание</Label>
                <Input
                  id="short_description"
                  value={formData.short_description}
                  onChange={(e) => updateField('short_description', e.target.value)}
                  placeholder="Профессиональное обучение массажу с 2010 года"
                />
              </div>

              <div>
                <Label htmlFor="description">Полное описание</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => updateField('description', e.target.value)}
                  placeholder="Подробная информация о школе, преимущества, достижения..."
                  rows={5}
                />
              </div>

              <div>
                <Label htmlFor="learning_direction">Направление обучения</Label>
                <Input
                  id="learning_direction"
                  value={formData.learning_direction}
                  onChange={(e) => updateField('learning_direction', e.target.value)}
                  placeholder="Классический массаж, СПА, лечебный массаж"
                />
              </div>

              <div>
                <Label htmlFor="format">Формат обучения</Label>
                <select
                  id="format"
                  value={formData.format}
                  onChange={(e) => updateField('format', e.target.value)}
                  className="w-full px-3 py-2 border rounded-md"
                >
                  <option value="online">Онлайн</option>
                  <option value="offline">Офлайн</option>
                  <option value="hybrid">Гибридный</option>
                </select>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Визуальное оформление</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="logo_url">URL логотипа</Label>
                <Input
                  id="logo_url"
                  value={formData.logo_url}
                  onChange={(e) => updateField('logo_url', e.target.value)}
                  placeholder="https://example.com/logo.png"
                />
                {formData.logo_url && (
                  <img
                    src={formData.logo_url}
                    alt="Logo preview"
                    className="mt-2 w-24 h-24 object-cover rounded border"
                  />
                )}
              </div>

              <div>
                <Label htmlFor="cover_url">URL обложки (Hero блок)</Label>
                <Input
                  id="cover_url"
                  value={formData.cover_url}
                  onChange={(e) => updateField('cover_url', e.target.value)}
                  placeholder="https://example.com/cover.jpg"
                />
                {formData.cover_url && (
                  <img
                    src={formData.cover_url}
                    alt="Cover preview"
                    className="mt-2 w-full h-48 object-cover rounded border"
                  />
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Контактная информация</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate(-1)}
              disabled={loading}
            >
              Отмена
            </Button>
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? (
                <>
                  <Icon name="Loader2" size={20} className="mr-2 animate-spin" />
                  Создание...
                </>
              ) : (
                <>
                  <Icon name="Plus" size={20} className="mr-2" />
                  Создать школу
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
