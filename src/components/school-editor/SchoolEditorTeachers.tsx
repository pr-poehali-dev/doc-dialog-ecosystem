import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface SchoolEditorTeachersProps {
  formData: any;
  setFormData: (data: any) => void;
}

export function SchoolEditorTeachers({ formData, setFormData }: SchoolEditorTeachersProps) {
  const addTeacher = () => {
    setFormData({
      ...formData,
      teachers: [
        ...formData.teachers,
        { name: '', position: '', bio: '', photo_url: '', experience_years: null, specialization: '', sort_order: formData.teachers.length }
      ]
    });
  };

  const updateTeacher = (index: number, field: string, value: any) => {
    const updated = [...formData.teachers];
    updated[index][field] = value;
    setFormData({ ...formData, teachers: updated });
  };

  const removeTeacher = (index: number) => {
    const updated = formData.teachers.filter((_: any, i: number) => i !== index);
    setFormData({ ...formData, teachers: updated });
  };

  const addGalleryImage = () => {
    setFormData({
      ...formData,
      gallery: [
        ...formData.gallery,
        { image_url: '', caption: '', sort_order: formData.gallery.length }
      ]
    });
  };

  const updateGalleryImage = (index: number, field: string, value: string) => {
    const updated = [...formData.gallery];
    updated[index][field] = value;
    setFormData({ ...formData, gallery: updated });
  };

  const removeGalleryImage = (index: number) => {
    const updated = formData.gallery.filter((_: any, i: number) => i !== index);
    setFormData({ ...formData, gallery: updated });
  };

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Преподаватели</h3>
          <Button onClick={addTeacher} size="sm" variant="outline">
            <Icon name="Plus" size={16} className="mr-2" />
            Добавить преподавателя
          </Button>
        </div>

        <div className="space-y-6">
          {formData.teachers.map((teacher: any, index: number) => (
            <div key={index} className="border rounded-lg p-6 bg-gray-50">
              <div className="flex items-start justify-between mb-4">
                <h4 className="font-semibold text-gray-700">Преподаватель #{index + 1}</h4>
                <Button
                  onClick={() => removeTeacher(index)}
                  variant="ghost"
                  size="sm"
                  className="text-red-600 hover:text-red-700"
                >
                  <Icon name="Trash2" size={18} />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Имя</Label>
                  <Input
                    value={teacher.name}
                    onChange={(e) => updateTeacher(index, 'name', e.target.value)}
                    placeholder="Иван Иванов"
                  />
                </div>

                <div>
                  <Label>Должность</Label>
                  <Input
                    value={teacher.position}
                    onChange={(e) => updateTeacher(index, 'position', e.target.value)}
                    placeholder="Преподаватель массажа"
                  />
                </div>

                <div>
                  <Label>URL фото</Label>
                  <Input
                    value={teacher.photo_url}
                    onChange={(e) => updateTeacher(index, 'photo_url', e.target.value)}
                    placeholder="https://example.com/photo.jpg"
                  />
                </div>

                <div>
                  <Label>Опыт работы (лет)</Label>
                  <Input
                    type="number"
                    value={teacher.experience_years || ''}
                    onChange={(e) => updateTeacher(index, 'experience_years', parseInt(e.target.value) || null)}
                    placeholder="5"
                  />
                </div>

                <div className="md:col-span-2">
                  <Label>Специализация</Label>
                  <Input
                    value={teacher.specialization}
                    onChange={(e) => updateTeacher(index, 'specialization', e.target.value)}
                    placeholder="Классический, спортивный массаж"
                  />
                </div>

                <div className="md:col-span-2">
                  <Label>Биография</Label>
                  <Textarea
                    value={teacher.bio}
                    onChange={(e) => updateTeacher(index, 'bio', e.target.value)}
                    placeholder="Краткая информация о преподавателе..."
                    rows={3}
                  />
                </div>
              </div>
            </div>
          ))}

          {formData.teachers.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Icon name="Users" size={48} className="mx-auto mb-2 opacity-30" />
              <p>Нет добавленных преподавателей</p>
            </div>
          )}
        </div>
      </div>

      <div className="pt-6 border-t">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Галерея</h3>
          <Button onClick={addGalleryImage} size="sm" variant="outline">
            <Icon name="Plus" size={16} className="mr-2" />
            Добавить фото
          </Button>
        </div>

        <div className="space-y-4">
          {formData.gallery.map((img: any, index: number) => (
            <div key={index} className="border rounded-lg p-4 bg-gray-50">
              <div className="flex items-start gap-4">
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    value={img.image_url}
                    onChange={(e) => updateGalleryImage(index, 'image_url', e.target.value)}
                    placeholder="URL изображения"
                  />
                  <Input
                    value={img.caption}
                    onChange={(e) => updateGalleryImage(index, 'caption', e.target.value)}
                    placeholder="Подпись (необязательно)"
                  />
                </div>
                <Button
                  onClick={() => removeGalleryImage(index)}
                  variant="ghost"
                  size="sm"
                  className="text-red-600 hover:text-red-700"
                >
                  <Icon name="Trash2" size={18} />
                </Button>
              </div>
            </div>
          ))}

          {formData.gallery.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Icon name="Image" size={48} className="mx-auto mb-2 opacity-30" />
              <p>Нет добавленных фотографий</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
