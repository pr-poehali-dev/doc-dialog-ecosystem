import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface Favorite {
  id: number;
  full_name: string;
  specialization: string;
  experience_years: number;
  avatar_url: string | null;
  city: string;
  avg_rating: number;
  reviews_count: number;
  favorited_at: string;
}

const FAVORITES_API = 'https://functions.poehali.dev/1babd863-d072-4116-9af2-df1166fc0f27';

export default function Favorites() {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    loadFavorites();
  }, [navigate]);

  const loadFavorites = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch(FAVORITES_API, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setFavorites(data.favorites || []);
      }
    } catch (error) {
      console.error('Ошибка загрузки избранного:', error);
    } finally {
      setLoading(false);
    }
  };

  const removeFromFavorites = async (masseurId: number) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${FAVORITES_API}?masseur_id=${masseurId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setFavorites(favorites.filter(f => f.id !== masseurId));
      }
    } catch (error) {
      console.error('Ошибка удаления из избранного:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50">
      <Navigation />
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <Button variant="ghost" onClick={() => navigate('/dashboard')}>
              <Icon name="ArrowLeft" size={20} />
            </Button>
            <div>
              <h1 className="text-4xl font-bold mb-2">Избранные специалисты</h1>
              <p className="text-gray-600">Массажисты, которых вы добавили в избранное</p>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <Icon name="Loader2" className="animate-spin mx-auto mb-4" size={48} />
              <p className="text-gray-600">Загрузка избранного...</p>
            </div>
          ) : favorites.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <Icon name="Heart" size={64} className="mx-auto mb-4 text-gray-300" />
                <h3 className="text-xl font-semibold mb-2">Нет избранных специалистов</h3>
                <p className="text-gray-600 mb-6">
                  Добавляйте массажистов в избранное, оставляя им положительные отзывы (4-5 звёзд)
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
            <div className="grid md:grid-cols-2 gap-6">
              {favorites.map((favorite) => (
                <Card key={favorite.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      {favorite.avatar_url ? (
                        <img
                          src={favorite.avatar_url}
                          alt={favorite.full_name}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white font-bold text-2xl">
                          {favorite.full_name.charAt(0)}
                        </div>
                      )}
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold mb-1">{favorite.full_name}</h3>
                        <Badge variant="secondary" className="mb-2">
                          {favorite.specialization}
                        </Badge>
                        <p className="text-sm text-gray-600">
                          {favorite.city} • {favorite.experience_years} {favorite.experience_years === 1 ? 'год' : 'лет'} опыта
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Icon name="Star" size={16} className="text-amber-500 fill-amber-500" />
                        <span className="font-semibold">{favorite.avg_rating.toFixed(1)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Icon name="MessageSquare" size={16} />
                        <span>{favorite.reviews_count} отзывов</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Link to={`/masseurs/${favorite.id}`} className="flex-1">
                        <Button className="w-full" size="sm">
                          <Icon name="ExternalLink" size={16} className="mr-2" />
                          Перейти к профилю
                        </Button>
                      </Link>
                      <Button
                        onClick={() => removeFromFavorites(favorite.id)}
                        variant="outline"
                        size="sm"
                      >
                        <Icon name="Heart" size={16} className="fill-current" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
