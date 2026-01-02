import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';

interface Course {
  id: number;
  school_id: number;
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
  created_at: string;
}

const COURSE_API_URL = 'https://functions.poehali.dev/95b5e0a7-51f7-4fb1-b196-a49f5feff58f';
const ADMIN_API_URL = 'https://functions.poehali.dev/d9ed333b-313d-40b6-8ca2-016db5854f7c';
const REVIEWS_API_URL = 'https://functions.poehali.dev/dacb9e9b-c76e-4430-8ed9-362ffc8b9566';

interface CourseModerationTabProps {
  onModerationComplete?: () => void;
}

export default function CourseModerationTab({ onModerationComplete }: CourseModerationTabProps) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<number | null>(null);
  const [moderationComment, setModerationComment] = useState('');

  useEffect(() => {
    loadPendingCourses();
  }, []);

  const loadPendingCourses = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${ADMIN_API_URL}?action=courses`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      setCourses(data);
    } catch (error) {
      toast({ title: 'Ошибка', description: 'Не удалось загрузить курсы', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const approveCourse = async (courseId: number) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${ADMIN_API_URL}?action=moderate_course`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          course_id: courseId,
          approve: true,
          comment: moderationComment
        })
      });

      if (response.ok) {
        // Generate auto reviews after approval
        try {
          await fetch(`${REVIEWS_API_URL}?action=generate_auto`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ entity_type: 'course', entity_id: courseId })
          });
        } catch (err) {
          console.error('Failed to generate auto reviews:', err);
        }
        
        toast({ title: 'Курс одобрен', description: 'Курс опубликован в каталоге с автоматическими отзывами' });
        setModerationComment('');
        setSelectedCourse(null);
        loadPendingCourses();
        if (onModerationComplete) onModerationComplete();
      } else {
        toast({ title: 'Ошибка', description: 'Не удалось одобрить курс', variant: 'destructive' });
      }
    } catch (error) {
      toast({ title: 'Ошибка', description: 'Не удалось одобрить курс', variant: 'destructive' });
    }
  };

  const rejectCourse = async (courseId: number) => {
    if (!moderationComment.trim()) {
      toast({ title: 'Укажите причину', description: 'Необходимо указать причину отклонения', variant: 'destructive' });
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${ADMIN_API_URL}?action=moderate_course`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          course_id: courseId,
          approve: false,
          comment: moderationComment
        })
      });

      if (response.ok) {
        toast({ title: 'Курс отклонен', description: 'Школа получит уведомление об отклонении' });
        setModerationComment('');
        setSelectedCourse(null);
        loadPendingCourses();
        if (onModerationComplete) onModerationComplete();
      } else {
        toast({ title: 'Ошибка', description: 'Не удалось отклонить курс', variant: 'destructive' });
      }
    } catch (error) {
      toast({ title: 'Ошибка', description: 'Не удалось отклонить курс', variant: 'destructive' });
    }
  };

  const getCourseTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      online: 'Онлайн',
      offline: 'Офлайн',
      free: 'Бесплатный'
    };
    return labels[type] || type;
  };

  return (
    <div className="space-y-4">
      {loading ? (
        <Card>
          <CardContent className="p-8 text-center">
            <Icon name="Loader2" className="animate-spin mx-auto mb-4" size={32} />
            <p>Загрузка курсов на модерации...</p>
          </CardContent>
        </Card>
      ) : courses.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <Icon name="CheckCircle" className="mx-auto mb-4 text-green-500" size={48} />
            <p className="text-lg font-medium">Нет курсов на модерации</p>
            <p className="text-muted-foreground">Все курсы обработаны</p>
          </CardContent>
        </Card>
      ) : (
        courses.map(course => (
          <Card key={course.id}>
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <CardTitle className="mb-2">{course.title}</CardTitle>
                  <CardDescription>
                    <div className="space-y-1">
                      <div>Категория: {course.category}</div>
                      <div>Тип: {getCourseTypeLabel(course.course_type)}</div>
                      {course.price && <div>Цена: {course.price.toLocaleString()} {course.currency}</div>}
                      {course.duration_hours && <div>Длительность: {course.duration_hours} часов</div>}
                      <div>Добавлен: {new Date(course.created_at).toLocaleString('ru-RU')}</div>
                    </div>
                  </CardDescription>
                </div>
                <Badge variant="secondary">На модерации</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium mb-2">Описание:</p>
                <p className="text-sm text-muted-foreground">{course.description || 'Нет описания'}</p>
              </div>

              {course.image_url && (
                <div>
                  <p className="text-sm font-medium mb-2">Изображение:</p>
                  <img 
                    src={course.image_url} 
                    alt={course.title}
                    className="w-full max-w-md h-48 object-cover rounded-lg"
                    onError={(e) => {
                      e.currentTarget.src = 'https://placehold.co/600x400/e2e8f0/64748b?text=Ошибка+загрузки';
                    }}
                  />
                </div>
              )}

              <div>
                <p className="text-sm font-medium mb-2">Ссылка на курс:</p>
                <a href={course.external_url} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline flex items-center gap-2">
                  {course.external_url}
                  <Icon name="ExternalLink" size={14} />
                </a>
              </div>

              {selectedCourse === course.id && (
                <div className="space-y-2">
                  <p className="text-sm font-medium">Комментарий к модерации:</p>
                  <Textarea
                    value={moderationComment}
                    onChange={(e) => setModerationComment(e.target.value)}
                    placeholder="Укажите причину отклонения или комментарий (необязательно для одобрения)"
                    rows={3}
                  />
                </div>
              )}

              <div className="flex gap-2 pt-2 border-t">
                {selectedCourse === course.id ? (
                  <>
                    <Button onClick={() => approveCourse(course.id)} className="bg-green-600 hover:bg-green-700">
                      <Icon name="Check" size={18} className="mr-2" />
                      Подтвердить одобрение
                    </Button>
                    <Button onClick={() => rejectCourse(course.id)} variant="destructive">
                      <Icon name="X" size={18} className="mr-2" />
                      Подтвердить отклонение
                    </Button>
                    <Button onClick={() => { setSelectedCourse(null); setModerationComment(''); }} variant="outline">
                      Отмена
                    </Button>
                  </>
                ) : (
                  <>
                    <Button onClick={() => setSelectedCourse(course.id)} className="bg-green-600 hover:bg-green-700">
                      <Icon name="Check" size={18} className="mr-2" />
                      Одобрить
                    </Button>
                    <Button onClick={() => setSelectedCourse(course.id)} variant="destructive">
                      <Icon name="X" size={18} className="mr-2" />
                      Отклонить
                    </Button>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
}