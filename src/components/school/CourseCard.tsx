import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface Course {
  id: number;
  title: string;
  description: string;
  category: string;
  course_type: string;
  price: number | null;
  currency: string;
  duration_hours: number | null;
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
}

interface CourseCardProps {
  course: Course;
  getStatusBadge: (status: string) => JSX.Element;
  onEdit?: (course: Course) => void;
  onDelete?: (courseId: number) => void;
  onPromote?: (courseId: number, title: string, category: string) => void;
}

export default function CourseCard({ course, getStatusBadge, onEdit, onDelete, onPromote }: CourseCardProps) {
  return (
    <Card key={course.id}>
      <CardHeader>
        <div className="flex justify-between items-start mb-2">
          <CardTitle className="text-lg">{course.title}</CardTitle>
          {getStatusBadge(course.status)}
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">{course.description}</p>
        {course.promoted_until && new Date(course.promoted_until) > new Date() && (
          <div className="mt-2 p-2 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-300 rounded text-xs">
            <div className="flex items-center gap-1 font-semibold text-amber-800">
              <Icon name="TrendingUp" size={14} />
              <span>В топе {course.promotion_type === 'all_categories' ? 'во всех категориях' : 'в своей категории'}</span>
            </div>
            <div className="text-amber-700 mt-1">
              До {new Date(course.promoted_until).toLocaleString('ru-RU', { 
                day: 'numeric', 
                month: 'long', 
                hour: '2-digit', 
                minute: '2-digit',
                timeZone: 'Europe/Moscow'
              })}
            </div>
          </div>
        )}
        {course.status === 'rejected' && course.moderation_comment && (
          <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded text-xs text-red-800">
            <strong>Причина отклонения:</strong> {course.moderation_comment}
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <Icon name="Tag" size={16} className="text-primary" />
            <span>{course.category}</span>
          </div>
          <div className="flex items-center gap-2">
            <Icon name="Monitor" size={16} className="text-primary" />
            <span>{course.course_type === 'online' ? 'Онлайн' : course.course_type === 'offline' ? 'Офлайн' : 'Бесплатный'}</span>
          </div>
          {(course.original_price || course.discount_price) ? (
            <div className="flex items-center gap-2">
              <Icon name="Coins" size={16} className="text-primary" />
              <div className="flex items-center gap-2">
                {course.original_price && (
                  <span className="line-through text-muted-foreground">{course.original_price.toLocaleString()} {course.currency}</span>
                )}
                {course.discount_price && (
                  <span className="text-red-600 font-semibold">{course.discount_price.toLocaleString()} {course.currency}</span>
                )}
              </div>
            </div>
          ) : course.price ? (
            <div className="flex items-center gap-2">
              <Icon name="Coins" size={16} className="text-primary" />
              <span>{course.price.toLocaleString()} {course.currency}</span>
            </div>
          ) : null}
          {course.duration_hours && (
            <div className="flex items-center gap-2">
              <Icon name="Clock" size={16} className="text-primary" />
              <span>{course.duration_hours} часов</span>
            </div>
          )}
          {course.view_count !== undefined && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Icon name="Eye" size={16} className="text-primary" />
              <span>{course.view_count} просмотров</span>
            </div>
          )}
        </div>
        <div className="space-y-2 mt-4 pt-4 border-t">
          {(course.status === 'approved' || course.status === 'moderation') && course.slug && (
            <a
              href={`/course/landing/${course.slug}?preview=true`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 px-3 py-2 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors font-medium"
            >
              <Icon name="ExternalLink" size={16} />
              {course.status === 'moderation' ? 'Предпросмотр' : 'Открыть лендинг'}
            </a>
          )}
          {course.status === 'approved' && (
            <button
              onClick={() => onPromote?.(course.id, course.title, course.category)}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 text-sm bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-md hover:from-amber-600 hover:to-orange-600 transition-colors font-medium"
            >
              <Icon name="TrendingUp" size={16} />
              Поднять в топ (от 100 ₽)
            </button>
          )}
          <div className="flex gap-2">
            <button
              onClick={() => onEdit?.(course)}
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            >
              <Icon name="Pencil" size={16} />
              Редактировать
            </button>
            <button
              onClick={() => onDelete?.(course.id)}
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