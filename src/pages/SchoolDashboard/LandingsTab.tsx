import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import { getUserId } from '@/utils/auth';

interface Landing {
  id: number;
  name: string;
  short_description?: string;
  logo_url?: string;
  city?: string;
  slug?: string;
  is_verified: boolean;
}

interface LandingsTabProps {
  landings: Landing[];
  onReload: () => void;
}

export default function LandingsTab({ landings, onReload }: LandingsTabProps) {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleDelete = async (landing: Landing) => {
    if (confirm('Вы уверены, что хотите удалить лендинг школы?\n\nБудут удалены:\n• Все преподаватели\n• Все достижения\n• Галерея фотографий\n• Отзывы\n\nКурсы останутся, но будут отвязаны от школы.\n\nЭто действие нельзя отменить!')) {
      try {
        const token = localStorage.getItem('token');
        const userId = getUserId();
        
        if (!userId) {
          toast({ 
            title: 'Требуется авторизация', 
            description: 'Пожалуйста, войдите в систему заново',
            variant: 'destructive' 
          });
          navigate('/login');
          return;
        }
        
        const response = await fetch(`https://functions.poehali.dev/6ac6b552-624e-4960-a4f1-94f540394c86?id=${landing.id}`, {
          method: 'DELETE',
          headers: { 
            'Authorization': `Bearer ${token}`,
            'X-User-Id': userId
          }
        });
        
        if (response.ok) {
          toast({ title: 'Успех', description: 'Лендинг удалён' });
          onReload();
        } else {
          const error = await response.text();
          console.error('Delete error:', error);
          toast({ title: 'Ошибка', description: 'Не удалось удалить', variant: 'destructive' });
        }
      } catch (error) {
        console.error('Delete error:', error);
        toast({ title: 'Ошибка', description: 'Не удалось удалить', variant: 'destructive' });
      }
    }
  };

  return (
    <div className="space-y-4">
      {landings.length === 0 ? (
        <div className="text-center py-12 bg-card rounded-lg">
          <Icon name="Layout" size={48} className="mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-semibold mb-2">Нет лендинга школы</h3>
          <p className="text-muted-foreground mb-4">Создайте профессиональный лендинг для вашей школы</p>
          <Button onClick={() => navigate('/school/landing/builder')} className="bg-blue-600 hover:bg-blue-700">
            <Icon name="Plus" size={18} className="mr-2" />
            Создать лендинг школы
          </Button>
        </div>
      ) : (
        landings.map((landing) => (
          <div key={landing.id} className="bg-card rounded-lg p-6 flex items-start justify-between">
            <div className="flex gap-4 flex-1">
              {landing.logo_url && (
                <img
                  src={landing.logo_url}
                  alt={landing.name}
                  className="w-24 h-24 object-cover rounded"
                />
              )}
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-1">{landing.name}</h3>
                {landing.short_description && (
                  <p className="text-sm text-muted-foreground mb-2">{landing.short_description}</p>
                )}
                <div className="flex gap-2 items-center">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    landing.is_verified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {landing.is_verified ? 'Опубликован' : 'На модерации'}
                  </span>
                  {landing.city && <span className="text-xs text-muted-foreground">{landing.city}</span>}
                  {landing.slug && (
                    <a
                      href={`/school/${landing.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-primary hover:underline"
                    >
                      Открыть →
                    </a>
                  )}
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => navigate(`/school/landing/${landing.id}`)}
              >
                <Icon name="Pencil" size={16} />
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => handleDelete(landing)}
              >
                <Icon name="Trash2" size={16} />
              </Button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
