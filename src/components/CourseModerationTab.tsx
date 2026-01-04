import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';

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
  short_description?: string;
  hero_title?: string;
  hero_subtitle?: string;
  about_course?: string;
  what_you_learn?: string[];
  program_modules?: any[];
  author_name?: string;
  author_position?: string;
  author_bio?: string;
  author_experience?: string;
  benefits?: string[];
  testimonials?: any[];
  faq?: any[];
  duration_text?: string;
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
  const [viewDetailsId, setViewDetailsId] = useState<number | null>(null);
  const [detailsCourse, setDetailsCourse] = useState<Course | null>(null);

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

  const loadCourseDetails = async (courseId: number) => {
    try {
      // Добавляем skip_status_check=true для загрузки курсов на модерации
      const response = await fetch(`${COURSE_API_URL}?id=${courseId}&skip_status_check=true`);
      if (response.ok) {
        const data = await response.json();
        setDetailsCourse(data);
        setViewDetailsId(courseId);
      } else {
        toast({ title: 'Ошибка', description: 'Не удалось загрузить детали курса', variant: 'destructive' });
      }
    } catch (error) {
      toast({ title: 'Ошибка', description: 'Не удалось загрузить детали курса', variant: 'destructive' });
    }
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

              <div className="flex gap-2 pt-2 border-t flex-wrap">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => loadCourseDetails(course.id)}
                >
                  <Icon name="Eye" size={16} className="mr-2" />
                  Посмотреть детали
                </Button>
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

      <Dialog open={viewDetailsId !== null} onOpenChange={(open) => !open && setViewDetailsId(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{detailsCourse?.title}</DialogTitle>
            <DialogDescription>Полная информация о курсе для модерации</DialogDescription>
          </DialogHeader>

          {detailsCourse && (
            <div className="space-y-6">
              {/* Герой секция */}
              {(detailsCourse.hero_title || detailsCourse.hero_subtitle) && (
                <div className="border-l-4 border-primary pl-4">
                  <h3 className="font-semibold mb-1">Герой-секция</h3>
                  {detailsCourse.hero_title && <p className="text-lg font-bold">{detailsCourse.hero_title}</p>}
                  {detailsCourse.hero_subtitle && <p className="text-muted-foreground">{detailsCourse.hero_subtitle}</p>}
                </div>
              )}

              {/* Краткое описание */}
              {detailsCourse.short_description && (
                <div>
                  <h3 className="font-semibold mb-2">Краткое описание</h3>
                  <p className="text-sm">{detailsCourse.short_description}</p>
                </div>
              )}

              {/* О курсе */}
              {detailsCourse.about_course && (
                <div>
                  <h3 className="font-semibold mb-2">О курсе</h3>
                  <p className="text-sm whitespace-pre-wrap">{detailsCourse.about_course}</p>
                </div>
              )}

              {/* Что изучите */}
              {detailsCourse.what_you_learn && detailsCourse.what_you_learn.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-2">Что вы изучите</h3>
                  <ul className="list-disc list-inside space-y-1">
                    {detailsCourse.what_you_learn.map((item, idx) => (
                      <li key={idx} className="text-sm">{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Программа курса */}
              {detailsCourse.program_modules && detailsCourse.program_modules.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-2">Программа курса</h3>
                  <div className="space-y-3">
                    {detailsCourse.program_modules.map((module, idx) => (
                      <div key={idx} className="border rounded-lg p-3 bg-secondary/20">
                        <h4 className="font-medium">{module.title}</h4>
                        {module.duration && <p className="text-xs text-muted-foreground mb-2">Длительность: {module.duration}</p>}
                        {module.topics && module.topics.length > 0 && (
                          <ul className="list-disc list-inside text-sm space-y-1 mt-2">
                            {module.topics.map((topic: string, topicIdx: number) => (
                              <li key={topicIdx}>{topic}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Преподаватель */}
              {(detailsCourse.author_name || detailsCourse.author_bio) && (
                <div className="border rounded-lg p-4 bg-secondary/10">
                  <h3 className="font-semibold mb-2">Преподаватель</h3>
                  {detailsCourse.author_name && <p className="font-medium">{detailsCourse.author_name}</p>}
                  {detailsCourse.author_position && <p className="text-sm text-muted-foreground">{detailsCourse.author_position}</p>}
                  {detailsCourse.author_bio && <p className="text-sm mt-2">{detailsCourse.author_bio}</p>}
                  {detailsCourse.author_experience && <p className="text-sm text-muted-foreground mt-1">Опыт: {detailsCourse.author_experience}</p>}
                </div>
              )}

              {/* Преимущества */}
              {detailsCourse.benefits && detailsCourse.benefits.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-2">Что вы получите</h3>
                  <ul className="grid grid-cols-2 gap-2">
                    {detailsCourse.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <Icon name="CheckCircle2" size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Отзывы */}
              {detailsCourse.testimonials && detailsCourse.testimonials.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-2">Отзывы студентов</h3>
                  <div className="space-y-2">
                    {detailsCourse.testimonials.map((testimonial, idx) => (
                      <div key={idx} className="border rounded p-3 bg-secondary/5">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-sm">{testimonial.author}</span>
                          {testimonial.rating && (
                            <div className="flex">
                              {[...Array(testimonial.rating)].map((_, i) => (
                                <Icon key={i} name="Star" size={12} className="text-yellow-500 fill-yellow-500" />
                              ))}
                            </div>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{testimonial.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* FAQ */}
              {detailsCourse.faq && detailsCourse.faq.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-2">Часто задаваемые вопросы</h3>
                  <div className="space-y-3">
                    {detailsCourse.faq.map((item, idx) => (
                      <div key={idx} className="border-l-2 pl-3">
                        <p className="font-medium text-sm">{item.question}</p>
                        <p className="text-sm text-muted-foreground mt-1">{item.answer}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Цена и длительность */}
              <div className="border-t pt-4 flex gap-4 flex-wrap">
                {detailsCourse.price && (
                  <div>
                    <span className="text-sm text-muted-foreground">Цена:</span>
                    <p className="font-semibold">{detailsCourse.price.toLocaleString()} {detailsCourse.currency}</p>
                  </div>
                )}
                {detailsCourse.duration_text && (
                  <div>
                    <span className="text-sm text-muted-foreground">Длительность:</span>
                    <p className="font-semibold">{detailsCourse.duration_text}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}