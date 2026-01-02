import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

interface AdminDashboardTabProps {
  stats: Stats | null;
}

export default function AdminDashboardTab({ stats }: AdminDashboardTabProps) {
  if (!stats) {
    return null;
  }

  return (
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
  );
}
