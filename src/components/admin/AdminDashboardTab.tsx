import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";

interface Stats {
  total_users: number;
  total_masseurs: number;
  total_appointments: number;
  pending_reviews: number;
  pending_moderations: number;
  pending_courses: number;
  pending_masterminds: number;
}

interface Course {
  id: number;
  title: string;
  school_id: number | null;
  school_name: string | null;
  school_email: string | null;
  status: string;
  created_at: string;
  view_count: number;
  category: string;
}

interface AdminDashboardTabProps {
  stats: Stats | null;
}

export default function AdminDashboardTab({ stats }: AdminDashboardTabProps) {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://functions.poehali.dev/d9ed333b-313d-40b6-8ca2-016db5854f7c?action=all_courses', {
        headers: { 'X-Authorization': `Bearer ${token}` }
      });
      
      if (response.ok) {
        const data = await response.json();
        setCourses(data);
      }
    } catch (error) {
      console.error('Failed to load courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCourse = async (courseId: number) => {
    if (!confirm('Вы уверены, что хотите удалить этот курс?')) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`https://functions.poehali.dev/d9ed333b-313d-40b6-8ca2-016db5854f7c?action=delete_course&id=${courseId}`, {
        method: 'DELETE',
        headers: { 'X-Authorization': `Bearer ${token}` }
      });
      
      if (response.ok) {
        toast({ title: 'Успешно', description: 'Курс удалён' });
        loadCourses();
      } else {
        throw new Error('Delete failed');
      }
    } catch (error) {
      toast({ title: 'Ошибка', description: 'Не удалось удалить курс', variant: 'destructive' });
    }
  };

  const handleMessageSchool = (schoolEmail: string | null) => {
    if (!schoolEmail) {
      toast({ title: 'Ошибка', description: 'У этой школы нет email', variant: 'destructive' });
      return;
    }
    navigate(`/admin/messages?email=${schoolEmail}`);
  };

  if (!stats) {
    return null;
  }

  return (
    <div>
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Users" className="text-primary" />
            Всего пользователей
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold">{stats.total_users}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="UserCheck" className="text-primary" />
            Массажистов
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold">{stats.total_masseurs}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Calendar" className="text-primary" />
            Записей
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold">{stats.total_appointments}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Star" className="text-primary" />
            Отзывов на модерации
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold">{stats.pending_reviews}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Shield" className="text-primary" />
            Задач модерации
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold">{stats.pending_moderations}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="BookOpen" className="text-primary" />
            Курсов на модерации
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold">{stats.pending_courses}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Users" className="text-primary" />
            Мастермайндов на модерации
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold">{stats.pending_masterminds}</div>
        </CardContent>
      </Card>
    </div>

    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon name="BookOpen" className="text-primary" />
          Все курсы в каталоге
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="text-center py-8 text-muted-foreground">Загрузка...</div>
        ) : courses.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">Курсов нет</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2 font-semibold">ID</th>
                  <th className="text-left p-2 font-semibold">Название</th>
                  <th className="text-left p-2 font-semibold">Школа</th>
                  <th className="text-left p-2 font-semibold">Категория</th>
                  <th className="text-left p-2 font-semibold">Статус</th>
                  <th className="text-left p-2 font-semibold">Просмотры</th>
                  <th className="text-right p-2 font-semibold">Действия</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course) => (
                  <tr key={course.id} className="border-b hover:bg-muted/50">
                    <td className="p-2">{course.id}</td>
                    <td className="p-2 font-medium">{course.title}</td>
                    <td className="p-2">
                      {course.school_name ? (
                        <div>
                          <div className="font-medium">{course.school_name}</div>
                          <div className="text-xs text-muted-foreground">{course.school_email}</div>
                        </div>
                      ) : (
                        <span className="text-muted-foreground">Нет школы</span>
                      )}
                    </td>
                    <td className="p-2">
                      <Badge variant="outline">{course.category}</Badge>
                    </td>
                    <td className="p-2">
                      <Badge variant={course.status === 'approved' ? 'default' : course.status === 'pending' ? 'secondary' : 'destructive'}>
                        {course.status === 'approved' ? 'Одобрен' : course.status === 'pending' ? 'На модерации' : 'Отклонён'}
                      </Badge>
                    </td>
                    <td className="p-2">{course.view_count}</td>
                    <td className="p-2">
                      <div className="flex items-center justify-end gap-2">
                        {course.school_email && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleMessageSchool(course.school_email)}
                          >
                            <Icon name="MessageSquare" size={16} className="mr-1" />
                            Написать
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDeleteCourse(course.id)}
                        >
                          <Icon name="Trash2" size={16} className="mr-1" />
                          Удалить
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  </div>
  );
}