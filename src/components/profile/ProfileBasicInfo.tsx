import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface ProfileData {
  fullName: string;
  city: string;
  address: string;
  specialization: string;
  workFormats: string[];
  experience: string;
  education: string;
  about: string;
  phone: string;
  telegram: string;
  whatsapp: string;
  photo: string;
  serviceDescriptions: Record<string, string>;
}

interface ProfileBasicInfoProps {
  profileData: ProfileData;
  setProfileData: (data: ProfileData) => void;
}

export default function ProfileBasicInfo({ profileData, setProfileData }: ProfileBasicInfoProps) {
  const { toast } = useToast();
  const [uploading, setUploading] = useState(false);

  const compressImage = async (file: File): Promise<File> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          
          // Максимальные размеры
          const MAX_WIDTH = 800;
          const MAX_HEIGHT = 800;
          
          let width = img.width;
          let height = img.height;
          
          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }
          
          canvas.width = width;
          canvas.height = height;
          ctx?.drawImage(img, 0, 0, width, height);
          
          canvas.toBlob(
            (blob) => {
              if (blob) {
                resolve(new File([blob], file.name, {
                  type: 'image/jpeg',
                  lastModified: Date.now()
                }));
              } else {
                reject(new Error('Ошибка сжатия'));
              }
            },
            'image/jpeg',
            0.85 // Качество 85%
          );
        };
      };
      reader.onerror = reject;
    });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Проверка типа файла
    if (!file.type.startsWith('image/')) {
      toast({
        title: 'Ошибка',
        description: 'Пожалуйста, выберите изображение',
        variant: 'destructive'
      });
      return;
    }

    // Проверка размера (макс 10MB перед сжатием)
    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: 'Ошибка',
        description: 'Размер файла не должен превышать 10MB',
        variant: 'destructive'
      });
      return;
    }

    setUploading(true);
    try {
      // Сжимаем изображение
      const compressedFile = await compressImage(file);
      
      // Конвертируем в base64
      const reader = new FileReader();
      reader.readAsDataURL(compressedFile);
      reader.onload = async () => {
        try {
          const base64Image = reader.result as string;
          
          // Загружаем на сервер
          const response = await fetch('https://functions.poehali.dev/9d51dd9c-c74a-4527-b00b-2a1e1ef5878b', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              image: base64Image,
              fileName: file.name
            })
          });

          if (response.ok) {
            const data = await response.json();
            console.log('Uploaded photo URL:', data.url);
            setProfileData({ ...profileData, photo: data.url });
            toast({
              title: 'Успешно',
              description: 'Фото загружено и сжато'
            });
          } else {
            const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
            console.error('Upload failed:', errorData);
            throw new Error(errorData.error || 'Upload failed');
          }
        } catch (error) {
          console.error('Upload error:', error);
          toast({
            title: 'Ошибка',
            description: 'Не удалось загрузить фото. Попробуйте позже.',
            variant: 'destructive'
          });
        } finally {
          setUploading(false);
        }
      };
      
      reader.onerror = () => {
        toast({
          title: 'Ошибка',
          description: 'Не удалось прочитать файл',
          variant: 'destructive'
        });
        setUploading(false);
      };
    } catch (error) {
      console.error('Compression error:', error);
      toast({
        title: 'Ошибка',
        description: 'Не удалось обработать изображение',
        variant: 'destructive'
      });
      setUploading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Основная информация</CardTitle>
        <CardDescription>Заполните данные о себе как о специалисте</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Фото профиля</Label>
          <div className="flex items-center gap-4">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white text-3xl overflow-hidden">
              {profileData.photo ? (
                <img src={profileData.photo} alt="Аватар" className="w-full h-full object-cover" />
              ) : (
                <span>{profileData.fullName.charAt(0) || 'М'}</span>
              )}
            </div>
            <div className="flex-1 space-y-2">
              <div className="flex gap-2">
                <input
                  type="file"
                  id="photo-upload"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => document.getElementById('photo-upload')?.click()}
                  disabled={uploading}
                  className="flex-1"
                >
                  {uploading ? (
                    <>
                      <Icon name="Loader2" size={16} className="mr-2 animate-spin" />
                      Загрузка...
                    </>
                  ) : (
                    <>
                      <Icon name="Upload" size={16} className="mr-2" />
                      Загрузить фото
                    </>
                  )}
                </Button>
              </div>
              <Input
                type="url"
                placeholder="Или вставьте ссылку (https://...)"
                value={profileData.photo}
                onChange={(e) => setProfileData({ ...profileData, photo: e.target.value })}
                className="text-sm"
              />
              <p className="text-xs text-muted-foreground">
                Фото автоматически сжимается для быстрой загрузки
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Полное имя</Label>
            <Input
              placeholder="Иван Иванов"
              value={profileData.fullName}
              onChange={(e) => setProfileData({ ...profileData, fullName: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label>Город</Label>
            <Input
              placeholder="Москва"
              value={profileData.city}
              onChange={(e) => setProfileData({ ...profileData, city: e.target.value })}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Адрес приёма</Label>
          <Input
            placeholder="ул. Пушкина, д. 10, офис 5"
            value={profileData.address}
            onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
          />
          <p className="text-xs text-muted-foreground">
            💡 Укажите полный адрес для показа на Яндекс.Картах
          </p>
        </div>

        <div className="space-y-2">
          <Label>Специализация</Label>
          <Input
            placeholder="Классический массаж, релаксация"
            value={profileData.specialization}
            onChange={(e) => setProfileData({ ...profileData, specialization: e.target.value })}
          />
          <p className="text-xs text-muted-foreground">
            ⚠️ Используйте формулировки: "оздоровительные практики", "релакс", "восстановление" (не медицинские услуги)
          </p>
        </div>

        <div className="space-y-2">
          <Label>Опыт работы</Label>
          <Input
            placeholder="5 лет"
            value={profileData.experience}
            onChange={(e) => setProfileData({ ...profileData, experience: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label>Образование</Label>
          <Textarea
            placeholder="Укажите пройденные курсы и образование"
            value={profileData.education}
            onChange={(e) => setProfileData({ ...profileData, education: e.target.value })}
            rows={3}
          />
        </div>

        <div className="space-y-2">
          <Label>О себе</Label>
          <Textarea
            placeholder="Расскажите о своём подходе к работе"
            value={profileData.about}
            onChange={(e) => setProfileData({ ...profileData, about: e.target.value })}
            rows={4}
          />
        </div>
      </CardContent>
    </Card>
  );
}