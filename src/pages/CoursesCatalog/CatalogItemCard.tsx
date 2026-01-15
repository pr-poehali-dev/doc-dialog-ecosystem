import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';
import RatingDisplay from '@/components/RatingDisplay';
import { CatalogItem } from './types';

interface CatalogItemCardProps {
  item: CatalogItem;
}

const PROMO_API_URL = 'https://functions.poehali.dev/0e44bf6d-cb4d-404e-832f-02070e6e8b13';

const getCourseTypeLabel = (type: string) => {
  const labels: Record<string, string> = {
    online: 'Онлайн',
    offline: 'Офлайн',
    free: 'Бесплатный'
  };
  return labels[type] || type;
};

const getCourseTypeColor = (type: string) => {
  const colors: Record<string, string> = {
    online: 'bg-blue-100 text-blue-800',
    offline: 'bg-purple-100 text-purple-800',
    free: 'bg-green-100 text-green-800'
  };
  return colors[type] || 'bg-gray-100 text-gray-800';
};

export default function CatalogItemCard({ item }: CatalogItemCardProps) {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [requesting, setRequesting] = useState(false);
  const isPromoted = item.has_promotion && item.promoted_until && new Date(item.promoted_until) > new Date();
  
  const userData = localStorage.getItem('user');
  const token = localStorage.getItem('token');
  const user = userData ? JSON.parse(userData) : null;
  const isMasseur = user?.role === 'masseur';
  
  const handleClick = () => {
    // Открываем external_url напрямую
    if (item.external_url) {
      window.open(item.external_url, '_blank');
    }
  };

  const handleRequestDiscount = async (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (!user || !token) {
      toast({ 
        title: 'Требуется авторизация', 
        description: 'Войдите в аккаунт, чтобы запросить скидку',
        variant: 'destructive',
        action: {
          label: 'Войти',
          onClick: () => navigate('/login')
        }
      });
      return;
    }
    
    setRequesting(true);
    try {
      const response = await fetch(PROMO_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          school_id: item.school_id,
          course_id: item.id,
          course_title: item.title,
          entity_type: item.itemType === 'mastermind' ? 'mastermind' : item.itemType === 'offline_training' ? 'offline_training' : 'course'
        })
      });
      
      if (response.ok) {
        toast({ 
          title: 'Запрос отправлен', 
          description: 'Школа получит ваш запрос и ответит в ближайшее время' 
        });
      } else {
        const error = await response.json();
        toast({ title: 'Ошибка', description: error.error || 'Не удалось отправить запрос', variant: 'destructive' });
      }
    } catch (error) {
      toast({ title: 'Ошибка', description: 'Не удалось отправить запрос', variant: 'destructive' });
    } finally {
      setRequesting(false);
    }
  };

  return (
    <Card 
      className={`hover:shadow-xl transition-all duration-300 flex flex-col group overflow-visible ${ 
        isPromoted 
          ? 'ring-4 ring-amber-400 shadow-2xl shadow-amber-200/50 relative' 
          : 'overflow-hidden'
      }`}
    >
      {isPromoted && (
        <div className="absolute -top-3 -right-3 z-20">
          <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg flex items-center gap-1.5 animate-pulse">
            <Icon name="Crown" size={16} />
            ТОП
          </div>
        </div>
      )}
      <div className={`w-full h-56 overflow-hidden relative ${isPromoted ? 'ring-2 ring-amber-300' : ''}`}>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 opacity-90"></div>
        <img 
          src={item.image_url || 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800'} 
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          onError={(e) => {
            e.currentTarget.src = 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800';
          }}
        />
        <div className="absolute top-4 right-4">
          <Badge className={getCourseTypeColor(item.course_type) + ' shadow-lg'}>
            {item.itemType === 'mastermind' ? 'Мастермайнд' : item.itemType === 'offline_training' ? 'Очное обучение' : getCourseTypeLabel(item.course_type)}
          </Badge>
        </div>
      </div>
      <CardHeader className="flex-1 pb-3">
        {isPromoted && (
          <div className="mb-3 px-3 py-1.5 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-300 rounded-lg text-xs text-amber-800 font-semibold flex items-center gap-1.5 shadow-sm">
            <Icon name="Award" size={14} />
            <span>
              Рекомендуем
            </span>
          </div>
        )}
        <CardTitle className="text-xl mb-3 line-clamp-2 group-hover:text-primary transition-colors">{item.title}</CardTitle>
        <div className="mb-3">
          <RatingDisplay 
            rating={item.rating || 0} 
            reviewCount={item.review_count || 0} 
            size="sm" 
          />
        </div>
        <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">{item.description || 'Профессиональное обучение массажу с практикой и поддержкой опытных наставников.'}</p>
      </CardHeader>
      <CardContent className="space-y-3 pt-3">
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="flex items-center gap-1.5 bg-blue-50 dark:bg-blue-950 px-2 py-1.5 rounded-lg">
            <Icon name="Tag" size={14} className="text-blue-600 dark:text-blue-400 flex-shrink-0" />
            <span className="text-blue-700 dark:text-blue-300 truncate">{item.category}</span>
          </div>
          {item.itemType === 'mastermind' || item.itemType === 'offline_training' ? (
            <div className="flex items-center gap-1.5 bg-purple-50 dark:bg-purple-950 px-2 py-1.5 rounded-lg">
              <Icon name="Calendar" size={14} className="text-purple-600 dark:text-purple-400 flex-shrink-0" />
              <span className="text-purple-700 dark:text-purple-300 truncate">
                {new Date(item.event_date).toLocaleDateString('ru-RU', { 
                  day: 'numeric', 
                  month: 'short'
                })}
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 bg-green-50 dark:bg-green-950 px-2 py-1.5 rounded-lg">
              <Icon name="Clock" size={14} className="text-green-600 dark:text-green-400 flex-shrink-0" />
              <span className="text-green-700 dark:text-green-300 truncate">
                {item.duration_hours ? `${item.duration_hours} ч` : '3 месяца'}
              </span>
            </div>
          )}
        </div>
        
        {(item.itemType === 'mastermind' || item.itemType === 'offline_training') && item.location && (
          <div className="flex items-center gap-2 text-xs bg-amber-50 dark:bg-amber-950 px-2 py-1.5 rounded-lg">
            <Icon name="MapPin" size={14} className="text-amber-600 dark:text-amber-400 flex-shrink-0" />
            <span className="text-amber-700 dark:text-amber-300 truncate">{item.location}</span>
          </div>
        )}

        <div className="space-y-2 pt-3 border-t mt-3">
          <div className="flex items-center justify-between">
            <div>
              {item.discount_price ? (
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground line-through">
                    {item.original_price?.toLocaleString()} ₽
                  </span>
                  <span className="text-2xl font-bold text-red-600">
                    {item.discount_price.toLocaleString()} ₽
                  </span>
                </div>
              ) : item.price ? (
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {item.price.toLocaleString()} ₽
                </span>
              ) : (
                <span className="text-2xl font-bold text-green-600">Бесплатно</span>
              )}
            </div>
            <Button 
              size="sm" 
              className="group-hover:bg-primary group-hover:shadow-lg transition-all"
              onClick={handleClick}
            >
              Подробнее
              <Icon name="ArrowRight" size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
          
          {isMasseur && item.promo_requests_allowed !== false && (item.price || item.discount_price) && (item.price > 0 || (item.discount_price && item.discount_price > 0)) && (
            <Button 
              size="sm" 
              variant="outline"
              className="w-full text-xs gap-1"
              onClick={handleRequestDiscount}
              disabled={requesting}
            >
              <Icon name="Tag" size={14} />
              {requesting ? 'Отправка...' : 'Запросить скидку'}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}