import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface SalonBooking {
  id: number;
  salon_id: number;
  salon_name: string;
  salon_address: string;
  service_name: string;
  booking_date: string;
  booking_time: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  price: string;
  created_at: string;
}

export default function SalonBookings() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<SalonBooking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    loadBookings();
  }, [navigate]);

  const loadBookings = async () => {
    try {
      setLoading(true);
      // TODO: Загрузка записей с бэкенда
      setBookings([]);
    } catch (error) {
      console.error('Ошибка загрузки записей:', error);
    } finally {
      setLoading(false);
    }
  };

  const statusConfig = {
    pending: { label: 'Ожидает', color: 'bg-yellow-100 text-yellow-800', icon: 'Clock' },
    confirmed: { label: 'Подтверждена', color: 'bg-blue-100 text-blue-800', icon: 'CheckCircle' },
    completed: { label: 'Завершена', color: 'bg-green-100 text-green-800', icon: 'Check' },
    cancelled: { label: 'Отменена', color: 'bg-gray-100 text-gray-800', icon: 'XCircle' }
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
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Icon name="Calendar" className="text-primary" size={32} />
          <h1 className="text-3xl font-bold">Мои записи в салоны</h1>
        </div>
        <Button onClick={() => navigate('/dashboard')} variant="outline">
          <Icon name="ArrowLeft" size={16} className="mr-2" />
          Назад
        </Button>
      </div>

      {bookings.length === 0 ? (
        <div className="bg-white rounded-xl p-12 text-center shadow-sm border border-gray-100">
          <Icon name="Calendar" className="mx-auto text-gray-300 mb-4" size={64} />
          <h3 className="text-xl font-semibold mb-2">Нет записей</h3>
          <p className="text-gray-600 mb-6">У вас пока нет записей в салоны</p>
          <Button onClick={() => navigate('/salons')}>
            <Icon name="MapPin" size={16} className="mr-2" />
            Найти салон
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => {
            const config = statusConfig[booking.status];
            
            return (
              <div key={booking.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Icon name="Store" className="text-primary" size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">{booking.salon_name}</h3>
                      <p className="text-sm text-gray-500 flex items-center gap-1">
                        <Icon name="MapPin" size={14} />
                        {booking.salon_address}
                      </p>
                    </div>
                  </div>
                  <Badge className={config.color}>
                    <Icon name={config.icon as any} size={12} className="mr-1" />
                    {config.label}
                  </Badge>
                </div>

                <div className="bg-gradient-to-br from-primary/5 to-purple-50 rounded-lg p-4 mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">{booking.service_name}</h4>
                    <span className="font-bold text-primary">{booking.price}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <Icon name="Calendar" size={14} />
                      {new Date(booking.booking_date).toLocaleDateString('ru-RU')}
                    </span>
                    <span className="flex items-center gap-1">
                      <Icon name="Clock" size={14} />
                      {booking.booking_time}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2">
                  {booking.status === 'confirmed' && (
                    <Button
                      onClick={() => navigate(`/salons/${booking.salon_id}`)}
                      variant="outline"
                      size="sm"
                    >
                      <Icon name="ExternalLink" size={16} className="mr-2" />
                      Перейти в салон
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
