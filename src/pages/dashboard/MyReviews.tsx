import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface Review {
  id: number;
  masseur_name: string;
  masseur_id: number;
  rating: number;
  massage_type: string;
  comment: string;
  created_at: string;
  masseur_avatar?: string;
}

export default function MyReviews() {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    loadReviews();
  }, [navigate]);

  const loadReviews = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch(
        'https://functions.poehali.dev/8b4cf7f3-28ec-45d5-9c69-5d586d0f96c1?action=my-reviews',
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setReviews(data.reviews || []);
      } else {
        console.error('Ошибка загрузки отзывов');
      }
    } catch (error) {
      console.error('Ошибка загрузки отзывов:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50">
      <Navigation />
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <Button variant="ghost" onClick={() => navigate('/dashboard')}>
              <Icon name="ArrowLeft" size={20} />
            </Button>
            <div>
              <h1 className="text-4xl font-bold mb-2">Мои отзывы</h1>
              <p className="text-gray-600">Отзывы о посещенных специалистах</p>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <Icon name="Loader2" className="animate-spin mx-auto mb-4" size={48} />
              <p className="text-gray-600">Загрузка отзывов...</p>
            </div>
          ) : reviews.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <Icon name="Star" size={64} className="mx-auto mb-4 text-gray-300" />
                <h3 className="text-xl font-semibold mb-2">Нет отзывов</h3>
                <p className="text-gray-600 mb-6">
                  Вы еще не оставили ни одного отзыва о специалистах
                </p>
                <Link to="/masseurs">
                  <Button>
                    <Icon name="Search" size={18} className="mr-2" />
                    Найти специалиста
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {reviews.map((review) => (
                <Card key={review.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white font-bold text-lg">
                          {review.masseur_name.charAt(0)}
                        </div>
                        <div>
                          <CardTitle className="text-xl">{review.masseur_name}</CardTitle>
                          <Badge variant="secondary" className="mt-1">
                            {review.massage_type}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Icon
                            key={i}
                            name="Star"
                            size={20}
                            className={
                              i < review.rating
                                ? 'text-amber-500 fill-amber-500'
                                : 'text-gray-300'
                            }
                          />
                        ))}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 leading-relaxed mb-4">{review.comment}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>{new Date(review.created_at).toLocaleDateString('ru-RU')}</span>
                      <Link to={`/masseurs/${review.masseur_id}`}>
                        <Button variant="ghost" size="sm">
                          <Icon name="ExternalLink" size={16} className="mr-2" />
                          Перейти к профилю
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          <Card className="mt-8 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-100">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Info" size={20} className="text-blue-600" />
                О системе отзывов
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-gray-700">
              <p>• Вы можете оставить отзыв только после записи к специалисту</p>
              <p>• Отзывы проходят модерацию перед публикацией</p>
              <p>• Отзывы влияют на рейтинг специалиста в каталоге</p>
              <p>• Вы можете редактировать свой отзыв в течение 24 часов</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}