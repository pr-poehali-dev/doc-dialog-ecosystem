import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { getUserId } from '@/utils/auth';
import { toast } from 'sonner';

interface PromoOffer {
  id: number;
  school_name: string;
  course_title: string;
  discount_percentage: number;
  created_at: string;
  status: string;
}

export default function MasseurPromoOffers() {
  const navigate = useNavigate();
  const [offers, setOffers] = useState<PromoOffer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOffers();
  }, []);

  const loadOffers = async () => {
    try {
      const userId = getUserId();
      if (!userId) {
        navigate('/login');
        return;
      }

      const response = await fetch('https://functions.poehali.dev/37ab5361-b533-43f4-9320-864016746e8c?action=masseur_promo_offers', {
        headers: { 'X-User-Id': userId }
      });

      if (response.ok) {
        const data = await response.json();
        setOffers(data.offers || []);
      }
    } catch (error) {
      console.error('Failed to load promo offers:', error);
      toast.error('Не удалось загрузить предложения');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center py-12">
            <Icon name="Loader2" className="animate-spin" size={48} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Button variant="ghost" onClick={() => navigate('/dashboard')}>
            <Icon name="ArrowLeft" size={16} className="mr-2" />
            Назад в кабинет
          </Button>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Промо-предложения от школ</h1>
          <p className="text-gray-600">
            Специальные предложения на курсы со скидками для вас
          </p>
        </div>

        <Card className="mb-8 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="Gift" size={20} className="text-purple-600" />
              О промо-предложениях
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-gray-700 space-y-2">
            <p>
              🎁 Школы отправляют вам эксклюзивные предложения на свои курсы со скидками
            </p>
            <p>
              💰 Воспользуйтесь специальными условиями для массажистов нашей платформы
            </p>
            <p>
              📚 Повышайте квалификацию и развивайте навыки с выгодой
            </p>
          </CardContent>
        </Card>

        {offers.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center text-gray-500">
              <Icon name="Tag" size={48} className="mx-auto mb-4 opacity-50" />
              <p className="text-lg mb-2">Пока нет промо-предложений</p>
              <p className="text-sm">Школы пришлют вам специальные предложения на курсы</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {offers.map((offer) => (
              <Card key={offer.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2">{offer.course_title}</CardTitle>
                      <CardDescription className="flex items-center gap-2">
                        <Icon name="Building2" size={14} />
                        {offer.school_name}
                      </CardDescription>
                    </div>
                    <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-lg px-3 py-1">
                      -{offer.discount_percentage}%
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-500">
                      <Icon name="Calendar" size={14} className="inline mr-1" />
                      {new Date(offer.created_at).toLocaleDateString('ru-RU', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </p>
                    <Button size="sm">
                      <Icon name="ExternalLink" size={14} className="mr-2" />
                      Перейти к курсу
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
