import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface Booking {
  id: number;
  masseur_id: number;
  masseur_name: string;
  masseur_avatar?: string;
  date: string;
  time: string;
  service: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
  created_at: string;
}

const API_URL = 'https://functions.poehali.dev/d70b63ec-1cf9-43fe-ab45-8638fcdf9687';

export default function Bookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    fetchBookings();
  }, [navigate]);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      const response = await fetch(`${API_URL}?action=get-bookings`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setBookings(data.bookings || []);
      } else {
        console.error('Failed to fetch bookings');
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { label: 'Ожидает', variant: 'default' as const },
      confirmed: { label: 'Подтверждена', variant: 'secondary' as const },
      completed: { label: 'Завершена', variant: 'default' as const },
      cancelled: { label: 'Отменена', variant: 'destructive' as const },
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const openChat = (bookingId: number, masseurId: number) => {
    navigate(`/dashboard/messages?booking=${bookingId}&masseur=${masseurId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white to-blue-50">
        <Navigation />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">Загрузка...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50">
      <Navigation />
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <Button variant="ghost" onClick={() => navigate('/dashboard')}>
              <Icon name="ArrowLeft" size={20} />
            </Button>
            <h1 className="text-4xl font-bold">Мои записи</h1>
          </div>

          {bookings.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <Icon name="Calendar" size={48} className="mx-auto mb-4 text-gray-400" />
                <p className="text-gray-600 mb-6">У вас пока нет записей</p>
                <Button onClick={() => navigate('/masseurs')}>
                  <Icon name="Search" size={18} className="mr-2" />
                  Найти специалиста
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {bookings.map((booking) => (
                <Card key={booking.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        {booking.masseur_avatar ? (
                          <img 
                            src={booking.masseur_avatar} 
                            alt={booking.masseur_name}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                            <Icon name="User" size={24} className="text-primary" />
                          </div>
                        )}
                        <div>
                          <CardTitle className="text-xl">{booking.masseur_name}</CardTitle>
                          <p className="text-sm text-gray-600">{booking.service}</p>
                        </div>
                      </div>
                      {getStatusBadge(booking.status)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Icon name="Calendar" size={18} />
                        <span>{new Date(booking.date).toLocaleDateString('ru-RU')}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Icon name="Clock" size={18} />
                        <span>{booking.time}</span>
                      </div>
                    </div>
                    
                    {booking.notes && (
                      <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-700">{booking.notes}</p>
                      </div>
                    )}

                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        onClick={() => openChat(booking.id, booking.masseur_id)}
                        className="flex-1"
                      >
                        <Icon name="MessageSquare" size={18} className="mr-2" />
                        Написать специалисту
                      </Button>
                      <Button 
                        variant="outline"
                        onClick={() => navigate(`/masseurs/${booking.masseur_id}`)}
                      >
                        <Icon name="ExternalLink" size={18} />
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