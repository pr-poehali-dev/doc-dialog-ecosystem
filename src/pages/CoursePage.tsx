import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface CoAuthor {
  name: string;
  position?: string;
  photo?: string;
}

interface CourseDetails {
  id: number;
  school_id: number;
  school_name: string;
  title: string;
  description: string;
  category: string;
  course_type: string;
  price: number | null;
  currency: string;
  duration_hours: number | null;
  image_url: string | null;
  external_url: string;
  original_price?: number | null;
  discount_price?: number | null;
  author_name?: string;
  author_photo?: string;
  author_position?: string;
  course_content?: string;
  co_authors?: CoAuthor[];
  view_count?: number;
  created_at: string;
}

const COURSE_API_URL = 'https://functions.poehali.dev/95b5e0a7-51f7-4fb1-b196-a49f5feff58f';

export default function CoursePage() {
  const { id } = useParams<{ id: string }>();
  const [course, setCourse] = useState<CourseDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCourse();
  }, [id]);

  const loadCourse = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${COURSE_API_URL}?id=${id}`);
      if (response.ok) {
        const data = await response.json();
        setCourse(data);
      }
    } catch (error) {
      console.error('Load error:', error);
    } finally {
      setLoading(false);
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

  const getCourseTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      online: 'bg-blue-100 text-blue-800',
      offline: 'bg-purple-100 text-purple-800',
      free: 'bg-green-100 text-green-800'
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-secondary/5">
        <Navigation />
        <div className="container mx-auto px-4 py-12 text-center">
          <Icon name="Loader2" size={48} className="mx-auto mb-4 animate-spin text-primary" />
          <p className="text-muted-foreground">Загрузка курса...</p>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-secondary/5">
        <Navigation />
        <div className="container mx-auto px-4 py-12 text-center">
          <Icon name="AlertCircle" size={48} className="mx-auto mb-4 text-destructive" />
          <h2 className="text-2xl font-bold mb-2">Курс не найден</h2>
          <p className="text-muted-foreground mb-6">Курс был удален или не существует</p>
          <Button onClick={() => window.location.href = '/courses'}>
            Вернуться к каталогу
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/5">
      <Navigation />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          {course.image_url && (
            <div className="w-full h-[400px] rounded-xl overflow-hidden mb-8 shadow-lg">
              <img 
                src={course.image_url} 
                alt={course.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = 'https://placehold.co/1200x400/e2e8f0/64748b?text=Курс';
                }}
              />
            </div>
          )}

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Badge className={getCourseTypeColor(course.course_type)}>
                    {getCourseTypeLabel(course.course_type)}
                  </Badge>
                  <Badge variant="outline">{course.category}</Badge>
                </div>
                <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
                <p className="text-lg text-muted-foreground">{course.description}</p>
              </div>

              {course.author_name && (
                <Card>
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-center gap-4">
                      {course.author_photo ? (
                        <img 
                          src={course.author_photo} 
                          alt={course.author_name}
                          className="w-16 h-16 rounded-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(course.author_name);
                          }}
                        />
                      ) : (
                        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                          <Icon name="User" size={32} className="text-primary" />
                        </div>
                      )}
                      <div>
                        <p className="text-sm text-muted-foreground">Автор курса</p>
                        <p className="text-lg font-semibold">{course.author_name}</p>
                        {course.author_position && (
                          <p className="text-sm text-muted-foreground">{course.author_position}</p>
                        )}
                      </div>
                    </div>
                    
                    {course.co_authors && course.co_authors.length > 0 && (
                      <div className="pt-4 border-t space-y-3">
                        <p className="text-sm font-medium text-muted-foreground">Преподаватели:</p>
                        {course.co_authors.map((coAuthor, index) => (
                          <div key={index} className="flex items-center gap-3">
                            {coAuthor.photo ? (
                              <img 
                                src={coAuthor.photo} 
                                alt={coAuthor.name}
                                className="w-12 h-12 rounded-full object-cover"
                                onError={(e) => {
                                  e.currentTarget.src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(coAuthor.name);
                                }}
                              />
                            ) : (
                              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                                <Icon name="User" size={24} className="text-primary" />
                              </div>
                            )}
                            <div>
                              <p className="font-medium">{coAuthor.name}</p>
                              {coAuthor.position && (
                                <p className="text-sm text-muted-foreground">{coAuthor.position}</p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {course.course_content && (
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold mb-4">Содержание курса</h2>
                    <div className="prose prose-sm max-w-none">
                      <p className="whitespace-pre-line text-muted-foreground">{course.course_content}</p>
                    </div>
                  </CardContent>
                </Card>
              )}

              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">О курсе</h2>
                  <div className="space-y-3">
                    {course.duration_hours && (
                      <div className="flex items-center gap-3">
                        <Icon name="Clock" size={20} className="text-primary" />
                        <span>Длительность: <strong>{course.duration_hours} часов</strong></span>
                      </div>
                    )}
                    <div className="flex items-center gap-3">
                      <Icon name="Building2" size={20} className="text-primary" />
                      <span>Школа: <strong>{course.school_name}</strong></span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Icon name="Tag" size={20} className="text-primary" />
                      <span>Категория: <strong>{course.category}</strong></span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-1">
              <Card className="sticky top-4">
                <CardContent className="p-6 space-y-6">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Стоимость курса</p>
                    {course.discount_price ? (
                      <div>
                        <p className="text-lg text-muted-foreground line-through mb-1">
                          {course.original_price?.toLocaleString()} {course.currency}
                        </p>
                        <p className="text-4xl font-bold text-red-600">
                          {course.discount_price.toLocaleString()} {course.currency}
                        </p>
                        <div className="inline-block mt-2 px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
                          Скидка {course.original_price && Math.round((1 - course.discount_price / course.original_price) * 100)}%
                        </div>
                      </div>
                    ) : course.price ? (
                      <p className="text-4xl font-bold text-primary">
                        {course.price.toLocaleString()} {course.currency}
                      </p>
                    ) : (
                      <p className="text-4xl font-bold text-green-600">Бесплатно</p>
                    )}
                  </div>

                  <a href={course.external_url} target="_blank" rel="noopener noreferrer" className="block">
                    <Button size="lg" className="w-full">
                      <Icon name="ShoppingCart" size={20} className="mr-2" />
                      Получить доступ
                    </Button>
                  </a>

                  <div className="pt-4 border-t space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Icon name="Shield" size={16} />
                      <span>Безопасная оплата</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Icon name="Award" size={16} />
                      <span>Сертификат по окончанию</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Icon name="HeadphonesIcon" size={16} />
                      <span>Поддержка 24/7</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}