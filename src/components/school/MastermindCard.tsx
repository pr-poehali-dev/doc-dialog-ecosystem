import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface Mastermind {
  id: number;
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
  status: string;
  moderation_comment?: string;
  original_price?: number | null;
  discount_price?: number | null;
  view_count?: number;
  slug?: string;
  created_at: string;
  promoted_until?: string | null;
  promotion_type?: string | null;
  category?: 'technique' | 'business' | 'soft_skills' | 'health' | 'digital';
}

interface MastermindCardProps {
  mastermind: Mastermind;
  canPromoteToTop: boolean;
  getStatusBadge: (status: string) => JSX.Element;
  onEdit?: (mastermind: Mastermind) => void;
  onDelete?: (mastermindId: number) => void;
  onPromote?: (mastermindId: number, title: string) => void;
}

export default function MastermindCard({ mastermind: mm, canPromoteToTop, getStatusBadge, onEdit, onDelete, onPromote }: MastermindCardProps) {
  return (
    <Card key={mm.id}>
      <CardHeader>
        <div className="flex justify-between items-start mb-2">
          <CardTitle className="text-lg">{mm.title}</CardTitle>
          {getStatusBadge(mm.status)}
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">{mm.description}</p>
        {mm.promoted_until && new Date(mm.promoted_until) > new Date() && (
          <div className="mt-2 p-2 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-300 rounded text-xs">
            <div className="flex items-center gap-1 font-semibold text-amber-800">
              <Icon name="TrendingUp" size={14} />
              <span>В топе {mm.promotion_type === 'all_categories' ? 'во всех категориях' : 'в своей категории'}</span>
            </div>
            <div className="text-amber-700 mt-1">
              До {new Date(mm.promoted_until).toLocaleString('ru-RU', { 
                day: 'numeric', 
                month: 'long', 
                hour: '2-digit', 
                minute: '2-digit',
                timeZone: 'Europe/Moscow'
              })}
            </div>
          </div>
        )}
        {mm.status === 'rejected' && mm.moderation_comment && (
          <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded text-xs text-red-800">
            <strong>Причина отклонения:</strong> {mm.moderation_comment}
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <Icon name="Tag" size={16} className="text-primary" />
            <span>
              {mm.category === 'technique' && 'Массажные техники'}
              {mm.category === 'business' && 'Бизнес и маркетинг'}
              {mm.category === 'soft_skills' && 'Общение и психология'}
              {mm.category === 'health' && 'Здоровье и безопасность'}
              {mm.category === 'digital' && 'Цифровые навыки'}
              {!mm.category && 'Массажные техники'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Icon name="Calendar" size={16} className="text-primary" />
            <span>{new Date(mm.event_date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
          </div>
          {mm.location && (
            <div className="flex items-center gap-2">
              <Icon name="MapPin" size={16} className="text-primary" />
              <span>{mm.location}</span>
            </div>
          )}
          {mm.max_participants && (
            <div className="flex items-center gap-2">
              <Icon name="Users" size={16} className="text-primary" />
              <span>{mm.current_participants}/{mm.max_participants} участников</span>
            </div>
          )}
          {(mm.original_price || mm.discount_price) ? (
            <div className="flex items-center gap-2">
              <Icon name="Coins" size={16} className="text-primary" />
              <div className="flex items-center gap-2">
                {mm.original_price && (
                  <span className="line-through text-muted-foreground">{mm.original_price.toLocaleString()} {mm.currency}</span>
                )}
                {mm.discount_price && (
                  <span className="text-red-600 font-semibold">{mm.discount_price.toLocaleString()} {mm.currency}</span>
                )}
              </div>
            </div>
          ) : mm.price ? (
            <div className="flex items-center gap-2">
              <Icon name="Coins" size={16} className="text-primary" />
              <span>{mm.price.toLocaleString()} {mm.currency}</span>
            </div>
          ) : null}
          {mm.view_count !== undefined && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Icon name="Eye" size={16} className="text-primary" />
              <span>{mm.view_count} просмотров</span>
            </div>
          )}
        </div>
        <div className="space-y-2 mt-4 pt-4 border-t">
          {mm.status === 'approved' && mm.slug && (
            <a
              href={`/mastermind/landing/${mm.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 px-3 py-2 text-sm bg-purple-500 text-white rounded-md hover:bg-purple-600 transition-colors font-medium"
            >
              <Icon name="ExternalLink" size={16} />
              Открыть лендинг
            </a>
          )}
          {mm.status === 'approved' && (
            <button
              onClick={() => canPromoteToTop && onPromote?.(mm.id, mm.title)}
              disabled={!canPromoteToTop}
              className={`w-full flex items-center justify-center gap-2 px-3 py-2 text-sm rounded-md font-medium ${
                canPromoteToTop 
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600 transition-colors' 
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
              }`}
              title={!canPromoteToTop ? 'Недоступно на базовом тарифе. Обновите тариф в разделе "Подписка"' : ''}
            >
              <Icon name="TrendingUp" size={16} />
              Поднять в топ
            </button>
          )}
          <div className="flex gap-2">
            <a
              href={`/mastermind/landing/builder?id=${mm.id}`}
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            >
              <Icon name="Pencil" size={16} />
              Редактировать
            </a>
            <button
              onClick={() => onDelete?.(mm.id)}
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