import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { SavedSpecialistOrder } from './SpecialistLandingOrderTypes';

interface Props {
  orders: SavedSpecialistOrder[];
  onCreateClick: () => void;
  onDelete: (id: number) => void;
}

const STATUS_LABELS: Record<string, { text: string; color: string }> = {
  pending: { text: 'В обработке', color: 'bg-yellow-100 text-yellow-800' },
  in_progress: { text: 'В работе', color: 'bg-blue-100 text-blue-800' },
  completed: { text: 'Готово', color: 'bg-green-100 text-green-800' },
  cancelled: { text: 'Отменено', color: 'bg-gray-100 text-gray-800' }
};

export default function SpecialistLandingOrdersList({ orders, onCreateClick, onDelete }: Props) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Мои заявки на лендинг</h2>
          <p className="text-gray-600 mt-1">История ваших заявок</p>
        </div>
        <Button onClick={onCreateClick}>
          <Icon name="Plus" className="mr-2" size={18} />
          Новая заявка
        </Button>
      </div>

      <div className="space-y-3">
        {orders.map((order) => (
          <div 
            key={order.id}
            className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:border-primary/50 transition-colors"
          >
            <div className="flex items-start justify-between gap-4 mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-semibold text-lg">{order.name}</h3>
                  <Badge className={STATUS_LABELS[order.status]?.color || 'bg-gray-100 text-gray-800'}>
                    {STATUS_LABELS[order.status]?.text || order.status}
                  </Badge>
                </div>
                <p className="text-sm text-gray-500">
                  {new Date(order.created_at).toLocaleDateString('ru-RU', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
              
              {order.status === 'pending' && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDelete(order.id)}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Icon name="Trash2" size={18} />
                </Button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-gray-500">Email:</span>
                <p className="font-medium">{order.email}</p>
              </div>
              <div>
                <span className="text-gray-500">Телефон:</span>
                <p className="font-medium">{order.phone}</p>
              </div>
              <div className="sm:col-span-2">
                <span className="text-gray-500">Специализация:</span>
                <p className="font-medium">{order.specialization}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
