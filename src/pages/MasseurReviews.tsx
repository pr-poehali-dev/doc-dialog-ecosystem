import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { formatRelativeTime } from '@/utils/datetime';
import { useNewReviews } from '@/hooks/useNewReviews';

const API_URL = 'https://functions.poehali.dev/04d0b538-1cf5-4941-9c06-8d1bef5854ec';

interface Review {
  id: number;
  author_name: string;
  author_avatar: string | null;
  rating: number;
  comment: string;
  massage_type: string | null;
  created_at: string;
  masseur_reply: string | null;
  masseur_reply_at: string | null;
}

export default function MasseurReviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [replyText, setReplyText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { markReviewsAsViewed } = useNewReviews();

  useEffect(() => {
    fetchReviews();
    markReviewsAsViewed();
  }, []);

  const fetchReviews = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return;
      }

      const response = await fetch(`${API_URL}?action=get-reviews`, {
        headers: { 
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        const approvedReviews = data.reviews?.filter((r: Review) => r.moderation_status === 'approved') || [];
        setReviews(approvedReviews);
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleReplySubmit = async (reviewId: number) => {
    if (!replyText.trim()) return;

    setSubmitting(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}?action=reply-review`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          reviewId,
          reply: replyText.trim()
        })
      });

      if (response.ok) {
        setReplyText('');
        setReplyingTo(null);
        await fetchReviews();
      } else {
        const error = await response.json();
        console.error('Error submitting reply:', error);
        alert(error.error || 'Ошибка отправки ответа');
      }
    } catch (error) {
      console.error('Error submitting reply:', error);
      alert('Ошибка отправки ответа');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="flex items-center gap-3 mb-6">
        <Icon name="Star" className="text-primary" size={32} />
        <h1 className="text-3xl font-bold">Мои отзывы</h1>
      </div>

      {reviews.length === 0 ? (
        <div className="bg-white rounded-xl p-12 text-center shadow-sm border border-gray-100">
          <Icon name="Star" className="mx-auto text-gray-300 mb-4" size={64} />
          <h3 className="text-xl font-semibold mb-2">Пока нет отзывов</h3>
          <p className="text-gray-600">Отзывы появятся после прохождения модерации</p>
        </div>
      ) : (
        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  {review.author_avatar ? (
                    <img src={review.author_avatar} alt={review.author_name} className="w-full h-full rounded-full object-cover" />
                  ) : (
                    <Icon name="User" className="text-primary" size={24} />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-lg">{review.author_name}</h3>
                    <span className="text-sm text-gray-500">{formatRelativeTime(review.created_at)}</span>
                  </div>
                  <div className="flex items-center gap-1 mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Icon
                        key={star}
                        name="Star"
                        size={16}
                        className={star <= review.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}
                      />
                    ))}
                    {review.massage_type && (
                      <span className="ml-2 text-sm text-gray-600">• {review.massage_type}</span>
                    )}
                  </div>
                  <p className="text-gray-700 mb-3">{review.comment}</p>

                  {review.masseur_reply ? (
                    <div className="bg-gray-50 rounded-lg p-4 mt-4 border-l-4 border-primary">
                      <div className="flex items-center gap-2 mb-2">
                        <Icon name="MessageCircle" className="text-primary" size={16} />
                        <span className="font-medium text-sm">Ваш ответ</span>
                        <span className="text-xs text-gray-500">• {formatRelativeTime(review.masseur_reply_at!)}</span>
                      </div>
                      <p className="text-gray-700">{review.masseur_reply}</p>
                    </div>
                  ) : (
                    <div>
                      {replyingTo === review.id ? (
                        <div className="mt-4 space-y-3">
                          <textarea
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            placeholder="Напишите ответ на отзыв..."
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 min-h-[100px]"
                            disabled={submitting}
                          />
                          <div className="flex gap-2">
                            <Button
                              onClick={() => handleReplySubmit(review.id)}
                              disabled={submitting || !replyText.trim()}
                              size="sm"
                            >
                              {submitting ? 'Отправка...' : 'Отправить ответ'}
                            </Button>
                            <Button
                              onClick={() => {
                                setReplyingTo(null);
                                setReplyText('');
                              }}
                              variant="outline"
                              size="sm"
                              disabled={submitting}
                            >
                              Отмена
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <Button
                          onClick={() => setReplyingTo(review.id)}
                          variant="outline"
                          size="sm"
                          className="mt-2"
                        >
                          <Icon name="MessageCircle" size={16} className="mr-2" />
                          Ответить на отзыв
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}