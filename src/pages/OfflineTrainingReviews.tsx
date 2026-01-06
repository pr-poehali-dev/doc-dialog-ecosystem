import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { Navigation } from '@/components/Navigation';

interface Review {
  id: number;
  user_name: string;
  rating: number;
  comment: string;
  created_at: string;
}

const TRAINING_API_URL = 'https://functions.poehali.dev/95b5e0a7-51f7-4fb1-b196-a49f5feff58f';

export default function OfflineTrainingReviews() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [trainingTitle, setTrainingTitle] = useState('');
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadReviews();
  }, [slug]);

  const loadReviews = async () => {
    try {
      setLoading(true);
      
      const trainingResponse = await fetch(`${TRAINING_API_URL}?action=offline_trainings&slug=${slug}`);
      if (trainingResponse.ok) {
        const trainingData = await trainingResponse.json();
        setTrainingTitle(trainingData.title);
        
        const reviewsResponse = await fetch(`${TRAINING_API_URL}?action=get_reviews&item_type=offline_training&item_id=${trainingData.id}`);
        if (reviewsResponse.ok) {
          const reviewsData = await reviewsResponse.json();
          setReviews(reviewsData);
        }
      }
    } catch (error) {
      console.error('Load error:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Icon name="Loader2" size={48} className="animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <div className="container mx-auto px-4 py-12">
        <Button
          variant="outline"
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          <Icon name="ArrowLeft" size={20} className="mr-2" />
          Назад
        </Button>

        <h1 className="text-3xl sm:text-4xl font-bold mb-2">{trainingTitle}</h1>
        <h2 className="text-xl text-gray-600 mb-8">Все отзывы ({reviews.length})</h2>

        {reviews.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <Icon name="MessageSquare" size={48} className="mx-auto mb-4 text-gray-400" />
              <p className="text-gray-600">Пока нет отзывов</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {reviews.map((review) => (
              <Card key={review.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="font-semibold text-lg">{review.user_name}</div>
                      <div className="flex gap-1 mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Icon
                            key={i}
                            name="Star"
                            size={16}
                            className={i < review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">{formatDate(review.created_at)}</div>
                  </div>
                  <p className="text-gray-700 whitespace-pre-wrap">{review.comment}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
