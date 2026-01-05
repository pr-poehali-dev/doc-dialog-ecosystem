import { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Progress } from '@/components/ui/progress';

interface Course {
  id: number;
  title: string;
  description: string;
  duration: string;
  lessons: number;
  completed: boolean;
  progress: number;
  level: 'beginner' | 'intermediate' | 'advanced';
}

export default function ClientEducation() {
  const [courses] = useState<Course[]>([
    {
      id: 1,
      title: 'Как говорить о массаже без медицинских терминов',
      description: 'Правильные формулировки для общения с клиентами, которые не нарушают закон',
      duration: '1 час',
      lessons: 5,
      completed: true,
      progress: 100,
      level: 'beginner'
    },
    {
      id: 2,
      title: 'Как объяснять ценность массажа',
      description: 'Учимся донести до клиента пользу услуг и обосновать стоимость',
      duration: '2 часа',
      lessons: 8,
      completed: false,
      progress: 60,
      level: 'beginner'
    },
    {
      id: 3,
      title: 'Как не бояться цены',
      description: 'Психология ценообразования и уверенность в своей работе',
      duration: '1.5 часа',
      lessons: 6,
      completed: false,
      progress: 0,
      level: 'intermediate'
    },
    {
      id: 4,
      title: 'Построение потока клиентов',
      description: 'Стратегии привлечения и удержания клиентов без рекламы',
      duration: '3 часа',
      lessons: 12,
      completed: false,
      progress: 0,
      level: 'advanced'
    },
    {
      id: 5,
      title: 'Работа с возражениями',
      description: 'Как отвечать на частые вопросы и сомнения клиентов',
      duration: '2 часа',
      lessons: 7,
      completed: false,
      progress: 20,
      level: 'intermediate'
    },
    {
      id: 6,
      title: 'Личный бренд массажиста',
      description: 'Как выделиться среди конкурентов и быть узнаваемым',
      duration: '2.5 часа',
      lessons: 10,
      completed: false,
      progress: 0,
      level: 'advanced'
    },
  ]);

  const getLevelBadge = (level: string) => {
    switch (level) {
      case 'beginner':
        return <Badge variant="secondary">Начальный</Badge>;
      case 'intermediate':
        return <Badge variant="default">Средний</Badge>;
      case 'advanced':
        return <Badge className="bg-purple-600">Продвинутый</Badge>;
      default:
        return null;
    }
  };

  const completedCourses = courses.filter(c => c.completed).length;
  const totalCourses = courses.length;
  const overallProgress = Math.round((completedCourses / totalCourses) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <Button variant="ghost" onClick={() => window.history.back()}>
              <Icon name="ArrowLeft" size={20} />
            </Button>
            <div className="flex-1">
              <h1 className="text-3xl font-bold">Обучение работе с клиентами</h1>
              <p className="text-muted-foreground">Курсы про привлечение клиентов и построение практики</p>
            </div>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Ваш прогресс обучения</CardTitle>
              <CardDescription>Завершено {completedCourses} из {totalCourses} курсов</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Progress value={overallProgress} className="h-3" />
                <p className="text-sm text-muted-foreground text-right">{overallProgress}% завершено</p>
              </div>
              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <p className="text-3xl font-bold text-green-600">{completedCourses}</p>
                  <p className="text-sm text-muted-foreground">Завершено</p>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <p className="text-3xl font-bold text-blue-600">
                    {courses.filter(c => c.progress > 0 && !c.completed).length}
                  </p>
                  <p className="text-sm text-muted-foreground">В процессе</p>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <p className="text-3xl font-bold text-orange-600">
                    {courses.filter(c => c.progress === 0).length}
                  </p>
                  <p className="text-sm text-muted-foreground">Не начаты</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6 border-primary/20 bg-primary/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Lightbulb" className="text-primary" size={24} />
                Почему эти курсы важны?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-3">
                <Icon name="Target" className="text-primary flex-shrink-0 mt-1" size={20} />
                <div>
                  <p className="font-medium">Закрывают главную боль</p>
                  <p className="text-sm text-muted-foreground">"Где брать клиентов стабильно и безопасно"</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Icon name="Shield" className="text-primary flex-shrink-0 mt-1" size={20} />
                <div>
                  <p className="font-medium">Юридическая безопасность</p>
                  <p className="text-sm text-muted-foreground">Учат говорить о массаже законно и правильно</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Icon name="TrendingUp" className="text-primary flex-shrink-0 mt-1" size={20} />
                <div>
                  <p className="font-medium">Рост дохода</p>
                  <p className="text-sm text-muted-foreground">Помогают выстроить стабильный поток клиентов</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            {courses.map((course) => (
              <Card key={course.id} className={course.completed ? 'border-green-200 bg-green-50/50' : ''}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0 ${
                      course.completed ? 'bg-green-100' : course.progress > 0 ? 'bg-blue-100' : 'bg-gray-100'
                    }`}>
                      {course.completed ? (
                        <Icon name="CheckCircle" className="text-green-600" size={32} />
                      ) : course.progress > 0 ? (
                        <Icon name="PlayCircle" className="text-blue-600" size={32} />
                      ) : (
                        <Icon name="BookOpen" className="text-gray-400" size={32} />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-lg">{course.title}</h3>
                            {getLevelBadge(course.level)}
                            {course.completed && <Badge variant="default" className="bg-green-600">Завершён</Badge>}
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">{course.description}</p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Icon name="Clock" size={14} />
                              {course.duration}
                            </span>
                            <span className="flex items-center gap-1">
                              <Icon name="BookOpen" size={14} />
                              {course.lessons} уроков
                            </span>
                          </div>
                        </div>
                      </div>
                      {!course.completed && course.progress > 0 && (
                        <div className="space-y-2 mt-4">
                          <Progress value={course.progress} className="h-2" />
                          <p className="text-xs text-muted-foreground">Пройдено {course.progress}%</p>
                        </div>
                      )}
                      <div className="flex gap-2 mt-4">
                        {course.completed ? (
                          <Button variant="outline" size="sm">
                            <Icon name="RotateCcw" size={16} className="mr-2" />
                            Пройти ещё раз
                          </Button>
                        ) : course.progress > 0 ? (
                          <Button size="sm">
                            <Icon name="Play" size={16} className="mr-2" />
                            Продолжить
                          </Button>
                        ) : (
                          <Button size="sm">
                            <Icon name="Play" size={16} className="mr-2" />
                            Начать курс
                          </Button>
                        )}
                        <Button variant="ghost" size="sm">
                          <Icon name="Info" size={16} className="mr-2" />
                          Подробнее
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Users" className="text-primary" size={24} />
                Живые мастермайнды
              </CardTitle>
              <CardDescription>Офлайн-встречи для обсуждения вопросов работы с клиентами</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4 p-4 border rounded-lg hover:border-primary transition-colors cursor-pointer">
                <Icon name="Calendar" className="text-primary" size={24} />
                <div className="flex-1">
                  <p className="font-medium">Мастермайнд: "Как выстроить поток клиентов"</p>
                  <p className="text-sm text-muted-foreground">15 января 2026, 19:00 • Онлайн</p>
                </div>
                <Button size="sm">Записаться</Button>
              </div>
              <div className="flex items-center gap-4 p-4 border rounded-lg hover:border-primary transition-colors cursor-pointer">
                <Icon name="Calendar" className="text-primary" size={24} />
                <div className="flex-1">
                  <p className="font-medium">Мастермайнд: "Работа с возражениями клиентов"</p>
                  <p className="text-sm text-muted-foreground">22 января 2026, 19:00 • Онлайн</p>
                </div>
                <Button size="sm">Записаться</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
