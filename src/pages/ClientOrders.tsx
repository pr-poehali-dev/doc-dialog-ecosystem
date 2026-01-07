import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { formatRelativeTime } from '@/utils/datetime';

const API_URL = 'https://functions.poehali.dev/04d0b538-1cf5-4941-9c06-8d1bef5854ec';

interface ServiceOrder {
  id: number;
  masseur_id: number;
  masseur_name: string;
  masseur_avatar: string | null;
  service_name: string;
  service_description: string;
  duration: string;
  price: string;
  status: string;
  message: string;
  created_at: string;
}

export default function ClientOrders() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<ServiceOrder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return;
      }

      const response = await fetch(`${API_URL}?action=get-client-orders`, {
        headers: { 
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setOrders(data.orders || []);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const statusConfig = {
    pending: { label: 'Ожидает', color: 'bg-amber-100 text-amber-800', icon: 'Clock' },
    accepted: { label: 'Принят', color: 'bg-blue-100 text-blue-800', icon: 'CheckCircle2' },
    completed: { label: 'Завершён', color: 'bg-green-100 text-green-800', icon: 'Check' },
    cancelled: { label: 'Отменён', color: 'bg-gray-100 text-gray-800', icon: 'XCircle' }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Icon name="ShoppingBag" className="text-primary" size={32} />
          <h1 className="text-3xl font-bold">Мои заказы</h1>
        </div>
        <Button
          onClick={() => navigate('/dashboard')}
          variant="outline"
        >
          <Icon name="ArrowLeft" size={16} className="mr-2" />
          В личный кабинет
        </Button>
      </div>

      {orders.length === 0 ? (
        <div className="bg-white rounded-xl p-12 text-center shadow-sm border border-gray-100">
          <Icon name="ShoppingBag" className="mx-auto text-gray-300 mb-4" size={64} />
          <h3 className="text-xl font-semibold mb-2">Нет заказов</h3>
          <p className="text-gray-600 mb-4">Вы ещё не записывались ни на одну услугу</p>
          <Button onClick={() => navigate('/masseurs')}>
            <Icon name="Search" size={16} className="mr-2" />
            Найти массажиста
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => {
            const config = statusConfig[order.status as keyof typeof statusConfig] || statusConfig.pending;
            
            return (
              <div key={order.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    {order.masseur_avatar ? (
                      <img src={order.masseur_avatar} alt={order.masseur_name} className="w-full h-full rounded-full object-cover" />
                    ) : (
                      <Icon name="User" className="text-primary" size={24} />
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-lg mb-1">{order.masseur_name}</h3>
                        <span className="text-sm text-gray-500">{formatRelativeTime(order.created_at)}</span>
                      </div>
                      <Badge className={config.color}>
                        <Icon name={config.icon as any} size={12} className="mr-1" />
                        {config.label}
                      </Badge>
                    </div>

                    <div className="bg-gradient-to-br from-primary/5 to-purple-50 rounded-lg p-4 mb-4">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold text-lg">{order.service_name}</h4>
                        <div className="flex gap-2">
                          <Badge variant="secondary" className="text-xs">
                            <Icon name="Clock" size={12} className="mr-1" />
                            {order.duration}
                          </Badge>
                          <Badge variant="outline" className="text-xs font-semibold">
                            {order.price}
                          </Badge>
                        </div>
                      </div>
                      <p className="text-sm text-gray-700">{order.service_description}</p>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        onClick={() => {
                          if (order.status === 'pending') {
                            const serviceInfo = encodeURIComponent(JSON.stringify({
                              name: order.service_name,
                              description: order.service_description,
                              duration: order.duration,
                              price: order.price
                            }));
                            navigate(`/dashboard/messages?chat=${order.masseur_id}&service=${serviceInfo}`);
                          } else {
                            navigate(`/dashboard/messages?chat=${order.masseur_id}`);
                          }
                        }}
                        variant="outline"
                        size="sm"
                      >
                        <Icon name="MessageCircle" size={16} className="mr-2" />
                        Написать массажисту
                      </Button>
                      {order.status === 'completed' && (
                        <Button
                          onClick={() => navigate(`/masseurs/${order.masseur_id}`)}
                          variant="outline"
                          size="sm"
                        >
                          <Icon name="Star" size={16} className="mr-2" />
                          Оставить отзыв
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}