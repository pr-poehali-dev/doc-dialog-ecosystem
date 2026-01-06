import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';

interface Review {
  id: number;
  user_name: string;
  rating: number;
  comment: string;
  is_auto_generated: boolean;
  created_at: string;
}

interface ReviewsSectionProps {
  entityType: 'course' | 'mastermind' | 'offline_training';
  entityId: number;
  onRatingUpdate?: (rating: number, count: number) => void;
}

const REVIEWS_API_URL = 'https://functions.poehali.dev/dacb9e9b-c76e-4430-8ed9-362ffc8b9566';

export default function ReviewsSection({ entityType, entityId, onRatingUpdate }: ReviewsSectionProps) {
  const { toast } = useToast();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
    loadReviews();
  }, [entityType, entityId]);

  const loadReviews = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${REVIEWS_API_URL}?entity_type=${entityType}&entity_id=${entityId}`);
      if (response.ok) {
        const data = await response.json();
        setReviews(data);
        
        if (onRatingUpdate && data.length > 0) {
          const avgRating = data.reduce((sum: number, r: Review) => sum + r.rating, 0) / data.length;
          onRatingUpdate(avgRating, data.length);
        } else if (onRatingUpdate) {
          onRatingUpdate(0, 0);
        }
      }
    } catch (error) {
      console.error('Failed to load reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const submitReview = async () => {
    if (!comment.trim()) {
      toast({ title: 'Ошибка', description: 'Напишите отзыв', variant: 'destructive' });
      return;
    }

    setSubmitting(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(REVIEWS_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          entity_type: entityType,
          entity_id: entityId,
          rating,
          comment
        })
      });

      if (response.ok) {
        toast({ 
          title: 'Отзыв отправлен на модерацию', 
          description: 'Ваш отзыв появится на сайте после проверки администратором' 
        });
        setComment('');
        setRating(5);
        setShowForm(false);
        loadReviews();
      } else if (response.status === 401) {
        toast({ 
          title: 'Требуется авторизация', 
          description: 'Войдите в аккаунт, чтобы оставить отзыв', 
          variant: 'destructive' 
        });
      } else if (response.status === 403) {
        toast({ 
          title: 'Доступ запрещён', 
          description: 'Только зарегистрированные массажисты и школы могут оставлять отзывы', 
          variant: 'destructive' 
        });
      } else {
        toast({ title: 'Ошибка', description: 'Не удалось добавить отзыв', variant: 'destructive' });
      }
    } catch (error) {
      toast({ title: 'Ошибка', description: 'Не удалось добавить отзыв', variant: 'destructive' });
    } finally {
      setSubmitting(false);
    }
  };

  const renderStars = (count: number, interactive: boolean = false) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Icon
            key={star}
            name="Star"
            size={interactive ? 24 : 20}
            className={`${star <= count ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'} ${interactive ? 'cursor-pointer hover:scale-110 transition-transform' : ''}`}
            onClick={interactive ? () => setRating(star) : undefined}
          />
        ))}
      </div>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const averageRating = reviews.length > 0 
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : '0.0';

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">Отзывы</CardTitle>
              <div className="flex items-center gap-3 mt-2">
                {renderStars(Math.round(parseFloat(averageRating)))}
                <span className="text-lg font-semibold">{averageRating}</span>
                <span className="text-muted-foreground">({reviews.length} {reviews.length === 1 ? 'отзыв' : reviews.length < 5 ? 'отзыва' : 'отзывов'})</span>
              </div>
            </div>
            {isAuthenticated && !showForm && (
              <Button onClick={() => setShowForm(true)}>
                <Icon name="Plus" size={18} className="mr-2" />
                Оставить отзыв
              </Button>
            )}
            {!isAuthenticated && (
              <p className="text-sm text-muted-foreground">Войдите, чтобы оставить отзыв</p>
            )}
          </div>
        </CardHeader>

        {showForm && (
          <CardContent className="border-t pt-6">
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium mb-2">Ваша оценка:</p>
                {renderStars(rating, true)}
              </div>
              <div>
                <p className="text-sm font-medium mb-2">Ваш отзыв:</p>
                <Textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Поделитесь своим мнением о курсе..."
                  rows={4}
                  className="resize-none"
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={submitReview} disabled={submitting}>
                  {submitting ? 'Отправка...' : 'Опубликовать'}
                </Button>
                <Button variant="outline" onClick={() => { setShowForm(false); setComment(''); setRating(5); }}>
                  Отмена
                </Button>
              </div>
            </div>
          </CardContent>
        )}
      </Card>

      {loading ? (
        <Card>
          <CardContent className="p-8 text-center">
            <Icon name="Loader2" className="animate-spin mx-auto mb-4" size={32} />
            <p className="text-muted-foreground">Загрузка отзывов...</p>
          </CardContent>
        </Card>
      ) : reviews.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <Icon name="MessageSquare" className="mx-auto mb-4 text-muted-foreground" size={48} />
            <p className="text-lg font-medium mb-2">Пока нет отзывов</p>
            <p className="text-muted-foreground">Станьте первым, кто оставит отзыв!</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <Card key={review.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-semibold">{review.user_name}</p>
                    <p className="text-sm text-muted-foreground">{formatDate(review.created_at)}</p>
                  </div>
                  {renderStars(review.rating)}
                </div>
                <p className="text-muted-foreground whitespace-pre-line">{review.comment}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}