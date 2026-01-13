import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';

export default function CreateTestMasseurs() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const createTestMasseurs = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://functions.poehali.dev/d9ed333b-313d-40b6-8ca2-016db5854f7c?action=create_test_masseurs', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        toast({
          title: "Успешно!",
          description: `Создано ${data.users?.length || 10} тестовых массажистов. Пароль: ${data.default_password}`
        });
      } else {
        const error = await response.json();
        throw new Error(error.error || 'Ошибка создания');
      }
    } catch (error) {
      toast({
        title: "Ошибка",
        description: error instanceof Error ? error.message : "Не удалось создать тестовых массажистов",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Создать тестовых массажистов</CardTitle>
        <CardDescription>
          Создаст 10 карточек массажистов с полной информацией и фотографиями
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button 
          onClick={createTestMasseurs} 
          disabled={loading}
          className="w-full"
        >
          {loading ? (
            <>
              <Icon name="Loader2" className="animate-spin mr-2" size={18} />
              Создаю массажистов...
            </>
          ) : (
            <>
              <Icon name="UserPlus" size={18} className="mr-2" />
              Создать 10 тестовых массажистов
            </>
          )}
        </Button>
        <div className="mt-4 p-4 bg-muted rounded-lg text-sm">
          <p className="font-semibold mb-2">Будут созданы:</p>
          <ul className="space-y-1 text-muted-foreground">
            <li>• 10 пользователей с ролью "массажист"</li>
            <li>• Полные профили с фото, опытом, специализациями</li>
            <li>• Все поля заполнены (имя, город, адрес, образование)</li>
            <li>• Виды массажа и сертификаты добавлены</li>
            <li>• Телефон и Telegram не указаны</li>
            <li>• Готовы к просмотру и модерации</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}