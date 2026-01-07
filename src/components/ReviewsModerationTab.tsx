import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';

interface Review {
  id: number;
  entity_type?: string;
  entity_id?: number;
  masseur_id?: number;
  masseur_name?: string;
  massage_type?: string;
  user_id: number | null;
  user_email: string | null;
  user_name: string;
  rating: number;
  comment: string;
  is_auto_generated?: boolean;
  status: string;
  created_at: string;
  review_type: 'course' | 'masseur';
}

const COURSE_REVIEWS_API_URL = 'https://functions.poehali.dev/dacb9e9b-c76e-4430-8ed9-362ffc8b9566';
const MASSEUR_REVIEWS_API_URL = 'https://functions.poehali.dev/8b4cf7f3-28ec-45d5-9c69-5d586d0f96c1';

export default function ReviewsModerationTab() {
  const { toast } = useToast();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('pending');

  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = async () => {
    setLoading(true);
    try {
      // Загружаем отзывы к курсам/мастермайндам
      const courseReviewsResponse = await fetch(`${COURSE_REVIEWS_API_URL}?action=moderation`);
      const courseReviews = courseReviewsResponse.ok ? await courseReviewsResponse.json() : [];
      
      // Загружаем отзывы массажистам
      const masseurReviewsResponse = await fetch(`${MASSEUR_REVIEWS_API_URL}?action=moderation`);
      const masseurReviewsData = masseurReviewsResponse.ok ? await masseurReviewsResponse.json() : { reviews: [] };
      const masseurReviews = masseurReviewsData.reviews || [];
      
      // Объединяем и помечаем типом
      const allReviews: Review[] = [
        ...courseReviews.map((r: any) => ({ ...r, review_type: 'course' as const })),
        ...masseurReviews.map((r: any) => ({ ...r, review_type: 'masseur' as const }))
      ];
      
      // Сортируем: сначала pending, потом по дате
      allReviews.sort((a, b) => {
        if (a.status === 'pending' && b.status !== 'pending') return -1;
        if (a.status !== 'pending' && b.status === 'pending') return 1;
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      });
      
      setReviews(allReviews);
    } catch (error) {
      toast({ title: 'Ошибка', description: 'Не удалось загрузить отзывы', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const updateReviewStatus = async (review: Review, status: 'approved' | 'rejected') => {
    try {
      const apiUrl = review.review_type === 'course' ? COURSE_REVIEWS_API_URL : MASSEUR_REVIEWS_API_URL;
      const action = review.review_type === 'masseur' ? '?action=moderate' : '';
      
      const response = await fetch(`${apiUrl}${action}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ review_id: review.id, status })
      });

      if (response.ok) {
        toast({ 
          title: status === 'approved' ? 'Отзыв одобрен' : 'Отзыв отклонён',
          description: status === 'approved' ? 'Отзыв опубликован на сайте' : 'Отзыв скрыт от пользователей'
        });
        loadReviews();
      } else {
        toast({ title: 'Ошибка', description: 'Не удалось обновить статус', variant: 'destructive' });
      }
    } catch (error) {
      toast({ title: 'Ошибка', description: 'Не удалось обновить статус', variant: 'destructive' });
    }
  };

  const renderStars = (count: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Icon
            key={star}
            name="Star"
            size={16}
            className={star <= count ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
          />
        ))}
      </div>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filteredReviews = reviews.filter(r => filter === 'all' || r.status === filter);

  const statusCounts = {
    all: reviews.length,
    pending: reviews.filter(r => r.status === 'pending').length,
    approved: reviews.filter(r => r.status === 'approved').length,
    rejected: reviews.filter(r => r.status === 'rejected').length
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Icon name="Loader2" className="animate-spin" size={32} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex gap-2 flex-wrap">
        <Button 
          variant={filter === 'all' ? 'default' : 'outline'} 
          onClick={() => setFilter('all')}
        >
          Все ({statusCounts.all})
        </Button>
        <Button 
          variant={filter === 'pending' ? 'default' : 'outline'} 
          onClick={() => setFilter('pending')}
        >
          На модерации ({statusCounts.pending})
        </Button>
        <Button 
          variant={filter === 'approved' ? 'default' : 'outline'} 
          onClick={() => setFilter('approved')}
        >
          Одобренные ({statusCounts.approved})
        </Button>
        <Button 
          variant={filter === 'rejected' ? 'default' : 'outline'} 
          onClick={() => setFilter('rejected')}
        >
          Отклонённые ({statusCounts.rejected})
        </Button>
      </div>

      {filteredReviews.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <Icon name="MessageSquare" className="mx-auto mb-4 text-muted-foreground" size={48} />
            <p className="text-lg font-medium mb-2">Нет отзывов</p>
            <p className="text-muted-foreground">
              {filter === 'pending' && 'Все отзывы обработаны'}
              {filter === 'approved' && 'Нет одобренных отзывов'}
              {filter === 'rejected' && 'Нет отклонённых отзывов'}
              {filter === 'all' && 'Отзывы ещё не добавлены'}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredReviews.map((review) => (
            <Card key={review.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <p className="font-semibold">{review.user_name}</p>
                      {review.is_auto_generated && (
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                          Автоотзыв
                        </span>
                      )}
                      <span className={`text-xs px-2 py-1 rounded ${
                        review.status === 'approved' ? 'bg-green-100 text-green-700' :
                        review.status === 'rejected' ? 'bg-red-100 text-red-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {review.status === 'approved' ? 'Одобрен' :
                         review.status === 'rejected' ? 'Отклонён' : 'На модерации'}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {review.user_email || 'Без email'} • {formatDate(review.created_at)}
                    </p>
                    <p className="text-sm text-muted-foreground mb-3">
                      {review.review_type === 'course' 
                        ? `${review.entity_type === 'course' ? 'Курс' : 'Мастермайнд'} ID: ${review.entity_id}`
                        : `Массажист: ${review.masseur_name} • ${review.massage_type}`
                      }
                    </p>
                    {renderStars(review.rating)}
                  </div>
                  <div className="flex gap-2">
                    {review.status === 'pending' && (
                      <>
                        <Button 
                          size="sm" 
                          variant="default"
                          onClick={() => updateReviewStatus(review, 'approved')}
                        >
                          <Icon name="Check" size={16} className="mr-1" />
                          Одобрить
                        </Button>
                        <Button 
                          size="sm" 
                          variant="destructive"
                          onClick={() => updateReviewStatus(review, 'rejected')}
                        >
                          <Icon name="X" size={16} className="mr-1" />
                          Отклонить
                        </Button>
                      </>
                    )}
                    {review.status === 'approved' && (
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => updateReviewStatus(review, 'rejected')}
                      >
                        <Icon name="X" size={16} className="mr-1" />
                        Отклонить
                      </Button>
                    )}
                    {review.status === 'rejected' && (
                      <Button 
                        size="sm" 
                        variant="default"
                        onClick={() => updateReviewStatus(review, 'approved')}
                      >
                        <Icon name="Check" size={16} className="mr-1" />
                        Одобрить
                      </Button>
                    )}
                  </div>
                </div>
                <p className="text-muted-foreground whitespace-pre-line bg-muted p-4 rounded">
                  {review.comment}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}