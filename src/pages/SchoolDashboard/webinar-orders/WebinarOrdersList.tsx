import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { SavedWebinarOrder, PACKAGE_PRICES } from './WebinarOrderTypes';

interface WebinarOrdersListProps {
  orders: SavedWebinarOrder[];
  onCreateClick: () => void;
  onDelete: (orderId: number) => void;
}

export default function WebinarOrdersList({ orders, onCreateClick, onDelete }: WebinarOrdersListProps) {
  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { label: string; className: string }> = {
      pending: { label: 'В обработке', className: 'bg-yellow-100 text-yellow-800' },
      processing: { label: 'В работе', className: 'bg-blue-100 text-blue-800' },
      completed: { label: 'Готово', className: 'bg-green-100 text-green-800' },
      cancelled: { label: 'Отменено', className: 'bg-gray-100 text-gray-800' }
    };
    
    const config = statusMap[status] || statusMap.pending;
    return <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.className}`}>{config.label}</span>;
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold">Мои заявки на автовебинары</h3>
        <Button onClick={onCreateClick}>
          <Icon name="Plus" size={20} className="mr-2" />
          Новая заявка
        </Button>
      </div>

      <div className="grid gap-4">
        {orders.map((order) => (
          <Card key={order.id} className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h4 className="text-lg font-bold mb-1">{order.webinarTopic}</h4>
                <p className="text-sm text-gray-600">
                  {new Date(order.created_at).toLocaleDateString('ru-RU', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </p>
              </div>
              <div className="flex items-center gap-2">
                {getStatusBadge(order.status)}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDelete(order.id)}
                >
                  <Icon name="Trash2" size={16} />
                </Button>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Школа:</p>
                <p className="font-medium">{order.schoolName}</p>
              </div>
              <div>
                <p className="text-gray-600">Тариф:</p>
                <p className="font-medium">
                  {PACKAGE_PRICES[order.packageType].label} — {PACKAGE_PRICES[order.packageType].price} ₽
                </p>
              </div>
              <div>
                <p className="text-gray-600">Цель:</p>
                <p className="font-medium">{order.webinarGoal}</p>
              </div>
              <div>
                <p className="text-gray-600">Контакт:</p>
                <p className="font-medium">{order.contactEmail}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}
