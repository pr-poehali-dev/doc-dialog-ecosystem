import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface SchoolEditorContentProps {
  formData: any;
  setFormData: (data: any) => void;
}

export function SchoolEditorContent({ formData, setFormData }: SchoolEditorContentProps) {
  const updateField = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  const addAchievement = () => {
    setFormData({
      ...formData,
      achievements: [
        ...formData.achievements,
        { title: '', description: '', icon_name: '', sort_order: formData.achievements.length }
      ]
    });
  };

  const updateAchievement = (index: number, field: string, value: string) => {
    const updated = [...formData.achievements];
    updated[index][field] = value;
    setFormData({ ...formData, achievements: updated });
  };

  const removeAchievement = (index: number) => {
    const updated = formData.achievements.filter((_: any, i: number) => i !== index);
    setFormData({ ...formData, achievements: updated });
  };

  return (
    <div className="space-y-8">
      <div>
        <Label htmlFor="mission">Миссия школы</Label>
        <Textarea
          id="mission"
          value={formData.mission}
          onChange={(e) => updateField('mission', e.target.value)}
          placeholder="Наша миссия — обучить профессиональных массажистов..."
          rows={3}
        />
      </div>

      <div>
        <Label htmlFor="about_school">О школе (подробно)</Label>
        <Textarea
          id="about_school"
          value={formData.about_school}
          onChange={(e) => updateField('about_school', e.target.value)}
          placeholder="История школы, особенности обучения..."
          rows={6}
        />
      </div>

      <div>
        <Label htmlFor="why_choose_us">Почему выбирают нас</Label>
        <Textarea
          id="why_choose_us"
          value={formData.why_choose_us}
          onChange={(e) => updateField('why_choose_us', e.target.value)}
          placeholder="Преимущества нашей школы..."
          rows={4}
        />
      </div>

      <div className="pt-6 border-t">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Достижения и цифры</h3>
          <Button onClick={addAchievement} size="sm" variant="outline">
            <Icon name="Plus" size={16} className="mr-2" />
            Добавить достижение
          </Button>
        </div>

        <div className="space-y-4">
          {formData.achievements.map((achievement: any, index: number) => (
            <div key={index} className="border rounded-lg p-4 bg-gray-50">
              <div className="flex items-start gap-4">
                <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Input
                    value={achievement.title}
                    onChange={(e) => updateAchievement(index, 'title', e.target.value)}
                    placeholder="Заголовок"
                  />
                  <Input
                    value={achievement.description}
                    onChange={(e) => updateAchievement(index, 'description', e.target.value)}
                    placeholder="Описание"
                  />
                  <Input
                    value={achievement.icon_name}
                    onChange={(e) => updateAchievement(index, 'icon_name', e.target.value)}
                    placeholder="Название иконки (Award, Star)"
                  />
                </div>
                <Button
                  onClick={() => removeAchievement(index)}
                  variant="ghost"
                  size="sm"
                  className="text-red-600 hover:text-red-700"
                >
                  <Icon name="Trash2" size={18} />
                </Button>
              </div>
            </div>
          ))}

          {formData.achievements.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Icon name="Award" size={48} className="mx-auto mb-2 opacity-30" />
              <p>Нет добавленных достижений</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
