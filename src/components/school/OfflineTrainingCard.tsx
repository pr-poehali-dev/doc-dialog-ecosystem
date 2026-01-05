import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface OfflineTrainingCardProps {
  training: any;
  getStatusBadge: (status: string) => JSX.Element;
  onEdit?: (training: any) => void;
  onDelete?: (trainingId: number) => void;
  onPromote?: (trainingId: number, title: string) => void;
}

export default function OfflineTrainingCard({ training, getStatusBadge, onEdit, onDelete, onPromote }: OfflineTrainingCardProps) {
  return (
    <Card key={training.id}>
      <CardHeader>
        <div className="flex justify-between items-start mb-2">
          <CardTitle className="text-lg">{training.title}</CardTitle>
          {getStatusBadge(training.status)}
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">{training.description}</p>
        {training.promoted_until && new Date(training.promoted_until) > new Date() && (
          <div className="mt-2 p-2 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-300 rounded text-xs">
            <div className="flex items-center gap-1 font-semibold text-amber-800">
              <Icon name="TrendingUp" size={14} />
              <span>В топе {training.promotion_type === 'all_categories' ? 'во всех категориях' : 'в своей категории'}</span>
            </div>
            <div className="text-amber-700 mt-1">
              До {new Date(training.promoted_until).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
        )}
        {training.status === 'rejected' && training.moderation_comment && (
          <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded text-xs text-red-800">
            <strong>Причина отклонения:</strong> {training.moderation_comment}
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <Icon name="Tag" size={16} className="text-primary" />
            <span>
              {training.category === 'technique' && 'Массажные техники'}
              {training.category === 'business' && 'Бизнес и маркетинг'}
              {training.category === 'soft_skills' && 'Общение и психология'}
              {training.category === 'health' && 'Здоровье и безопасность'}
              {training.category === 'digital' && 'Цифровые навыки'}
              {!training.category && 'Массажные техники'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Icon name="Calendar" size={16} className="text-primary" />
            <span>{new Date(training.event_date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
          </div>
          {training.location && (
            <div className="flex items-center gap-2">
              <Icon name="MapPin" size={16} className="text-primary" />
              <span>{training.location}</span>
            </div>
          )}
          {training.max_participants && (
            <div className="flex items-center gap-2">
              <Icon name="Users" size={16} className="text-primary" />
              <span>Макс. {training.max_participants} участников</span>
            </div>
          )}
          {(training.original_price || training.discount_price) ? (
            <div className="flex items-center gap-2">
              <Icon name="Coins" size={16} className="text-primary" />
              <div className="flex items-center gap-2">
                {training.original_price && (
                  <span className="line-through text-muted-foreground">{training.original_price.toLocaleString()} ₽</span>
                )}
                {training.discount_price && (
                  <span className="text-red-600 font-semibold">{training.discount_price.toLocaleString()} ₽</span>
                )}
              </div>
            </div>
          ) : training.price ? (
            <div className="flex items-center gap-2">
              <Icon name="Coins" size={16} className="text-primary" />
              <span>{training.price.toLocaleString()} ₽</span>
            </div>
          ) : null}
          {training.view_count !== undefined && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Icon name="Eye" size={16} className="text-primary" />
              <span>{training.view_count} просмотров</span>
            </div>
          )}
        </div>
        <div className="space-y-2 mt-4 pt-4 border-t">
          {training.status === 'approved' && training.slug && (
            <a
              href={`/offline-training/landing/${training.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 px-3 py-2 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors font-medium"
            >
              <Icon name="ExternalLink" size={16} />
              Открыть лендинг
            </a>
          )}
          {training.status === 'approved' && (
            <button
              onClick={() => onPromote?.(training.id, training.title)}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 text-sm bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-md hover:from-amber-600 hover:to-orange-600 transition-colors font-medium"
            >
              <Icon name="TrendingUp" size={16} />
              Поднять в топ (от 100 ₽)
            </button>
          )}
          <div className="flex gap-2">
            <a
              href={`/offline-training/landing/builder?id=${training.id}`}
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            >
              <Icon name="Pencil" size={16} />
              Редактировать
            </a>
            <button
              onClick={() => onDelete?.(training.id)}
              className="flex items-center justify-center gap-2 px-3 py-2 text-sm bg-destructive text-destructive-foreground rounded-md hover:bg-destructive/90 transition-colors"
            >
              <Icon name="Trash2" size={16} />
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}