import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface MastermindDetails {
  id: number;
  school_id: number;
  school_name: string;
  title: string;
  description: string;
  event_date: string;
  location: string | null;
  max_participants: number | null;
  current_participants: number;
  price: number | null;
  currency: string;
  image_url: string | null;
  external_url: string;
  original_price?: number | null;
  discount_price?: number | null;
  author_name?: string;
  author_photo?: string;
  event_content?: string;
  view_count?: number;
  created_at: string;
}

const COURSE_API_URL = 'https://functions.poehali.dev/95b5e0a7-51f7-4fb1-b196-a49f5feff58f';

export default function MastermindPage() {
  const { id } = useParams<{ id: string }>();
  const [mastermind, setMastermind] = useState<MastermindDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMastermind();
  }, [id]);

  const loadMastermind = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${COURSE_API_URL}?action=masterminds&id=${id}`);
      if (response.ok) {
        const data = await response.json();
        setMastermind(data);
      }
    } catch (error) {
      console.error('Load error:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatEventDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      weekday: 'long'
    });
  };

  const formatEventTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('ru-RU', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-secondary/5">
        <Navigation />
        <div className="container mx-auto px-4 py-12 text-center">
          <Icon name="Loader2" size={48} className="mx-auto mb-4 animate-spin text-primary" />
          <p className="text-muted-foreground">Загрузка мастермайнда...</p>
        </div>
      </div>
    );
  }

  if (!mastermind) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-secondary/5">
        <Navigation />
        <div className="container mx-auto px-4 py-12 text-center">
          <Icon name="AlertCircle" size={48} className="mx-auto mb-4 text-destructive" />
          <h2 className="text-2xl font-bold mb-2">Мастермайнд не найден</h2>
          <p className="text-muted-foreground mb-6">Мероприятие было удалено или не существует</p>
          <Button onClick={() => window.location.href = '/courses'}>
            Вернуться к каталогу
          </Button>
        </div>
      </div>
    );
  }

  const availableSpots = mastermind.max_participants 
    ? mastermind.max_participants - mastermind.current_participants 
    : null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/5">
      <Navigation />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          {mastermind.image_url && (
            <div className="w-full h-[400px] rounded-xl overflow-hidden mb-8 shadow-lg">
              <img 
                src={mastermind.image_url} 
                alt={mastermind.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = 'https://placehold.co/1200x400/e2e8f0/64748b?text=Мастермайнд';
                }}
              />
            </div>
          )}

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Badge className="bg-purple-100 text-purple-800">
                    Мастермайнд
                  </Badge>
                  <Badge variant="outline">Офлайн мероприятия</Badge>
                </div>
                <h1 className="text-4xl font-bold mb-4">{mastermind.title}</h1>
                <p className="text-lg text-muted-foreground">{mastermind.description}</p>
              </div>

              {mastermind.author_name && (
                <Card>
                  <CardContent className="flex items-center gap-4 p-6">
                    {mastermind.author_photo ? (
                      <img 
                        src={mastermind.author_photo} 
                        alt={mastermind.author_name}
                        className="w-16 h-16 rounded-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(mastermind.author_name);
                        }}
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                        <Icon name="User" size={32} className="text-primary" />
                      </div>
                    )}
                    <div>
                      <p className="text-sm text-muted-foreground">Ведущий</p>
                      <p className="text-lg font-semibold">{mastermind.author_name}</p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {mastermind.event_content && (
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold mb-4">Программа мастермайнда</h2>
                    <div className="prose prose-sm max-w-none">
                      <p className="whitespace-pre-line text-muted-foreground">{mastermind.event_content}</p>
                    </div>
                  </CardContent>
                </Card>
              )}

              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">Детали мероприятия</h2>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Icon name="Calendar" size={20} className="text-primary" />
                      <span>Дата: <strong>{formatEventDate(mastermind.event_date)}</strong></span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Icon name="Clock" size={20} className="text-primary" />
                      <span>Время: <strong>{formatEventTime(mastermind.event_date)}</strong></span>
                    </div>
                    {mastermind.location && (
                      <div className="flex items-center gap-3">
                        <Icon name="MapPin" size={20} className="text-primary" />
                        <span>Адрес: <strong>{mastermind.location}</strong></span>
                      </div>
                    )}
                    <div className="flex items-center gap-3">
                      <Icon name="Building2" size={20} className="text-primary" />
                      <span>Школа: <strong>{mastermind.school_name}</strong></span>
                    </div>
                    {mastermind.max_participants && (
                      <div className="flex items-center gap-3">
                        <Icon name="Users" size={20} className="text-primary" />
                        <span>
                          Участников: <strong>{mastermind.current_participants} / {mastermind.max_participants}</strong>
                          {availableSpots !== null && availableSpots > 0 && (
                            <span className="ml-2 text-green-600">
                              (осталось {availableSpots} {availableSpots === 1 ? 'место' : availableSpots < 5 ? 'места' : 'мест'})
                            </span>
                          )}
                          {availableSpots === 0 && (
                            <span className="ml-2 text-red-600">(мест нет)</span>
                          )}
                        </span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-1">
              <Card className="sticky top-4">
                <CardContent className="p-6 space-y-6">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Стоимость участия</p>
                    {mastermind.discount_price ? (
                      <div>
                        <p className="text-lg text-muted-foreground line-through mb-1">
                          {mastermind.original_price?.toLocaleString()} {mastermind.currency}
                        </p>
                        <p className="text-4xl font-bold text-red-600">
                          {mastermind.discount_price.toLocaleString()} {mastermind.currency}
                        </p>
                        <div className="inline-block mt-2 px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
                          Скидка {mastermind.original_price && Math.round((1 - mastermind.discount_price / mastermind.original_price) * 100)}%
                        </div>
                      </div>
                    ) : mastermind.price ? (
                      <p className="text-4xl font-bold text-primary">
                        {mastermind.price.toLocaleString()} {mastermind.currency}
                      </p>
                    ) : (
                      <p className="text-4xl font-bold text-green-600">Бесплатно</p>
                    )}
                  </div>

                  <Button 
                    size="lg" 
                    className="w-full text-lg py-6"
                    onClick={() => window.open(mastermind.external_url, '_blank')}
                    disabled={availableSpots === 0}
                  >
                    {availableSpots === 0 ? (
                      <>
                        <Icon name="XCircle" size={20} className="mr-2" />
                        Мест нет
                      </>
                    ) : (
                      <>
                        <Icon name="Calendar" size={20} className="mr-2" />
                        Записаться
                      </>
                    )}
                  </Button>

                  {mastermind.view_count !== undefined && (
                    <div className="pt-4 border-t text-center">
                      <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                        <Icon name="Eye" size={16} />
                        <span>{mastermind.view_count} просмотров</span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Button variant="outline" onClick={() => window.location.href = '/courses'}>
              <Icon name="ArrowLeft" size={18} className="mr-2" />
              Вернуться к каталогу
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
