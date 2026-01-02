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
  created_at: string;
}

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
  created_at: string;
}

interface SpecialistRequest {
  id: number;
  title: string;
  description: string;
  specialty: string;
  budget_from: number | null;
  budget_to: number | null;
  currency: string;
  location: string | null;
  deadline_date: string | null;
  status: string;
  created_at: string;
}

interface ItemsListProps {
  activeTab: 'courses' | 'masterminds' | 'specialists';
  courses: Course[];
  masterminds: Mastermind[];
  specialists: SpecialistRequest[];
  getStatusBadge: (status: string) => JSX.Element;
}

export default function ItemsList({ activeTab, courses, masterminds, specialists, getStatusBadge }: ItemsListProps) {
  return (
    <>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activeTab === 'courses' && courses.map((course) => (
          <Card key={course.id}>
            <CardHeader>
              <div className="flex justify-between items-start mb-2">
                <CardTitle className="text-lg">{course.title}</CardTitle>
                {getStatusBadge(course.status)}
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2">{course.description}</p>
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
                {course.price && (
                  <div className="flex items-center gap-2">
                    <Icon name="Coins" size={16} className="text-primary" />
                    <span>{course.price.toLocaleString()} {course.currency}</span>
                  </div>
                )}
                {course.duration_hours && (
                  <div className="flex items-center gap-2">
                    <Icon name="Clock" size={16} className="text-primary" />
                    <span>{course.duration_hours} часов</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}

        {activeTab === 'masterminds' && masterminds.map((mm) => (
          <Card key={mm.id}>
            <CardHeader>
              <div className="flex justify-between items-start mb-2">
                <CardTitle className="text-lg">{mm.title}</CardTitle>
                {getStatusBadge(mm.status)}
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2">{mm.description}</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
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
                {mm.price && (
                  <div className="flex items-center gap-2">
                    <Icon name="DollarSign" size={16} className="text-primary" />
                    <span>{mm.price.toLocaleString()} {mm.currency}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}

        {activeTab === 'specialists' && specialists.map((spec) => (
          <Card key={spec.id}>
            <CardHeader>
              <div className="flex justify-between items-start mb-2">
                <CardTitle className="text-lg">{spec.title}</CardTitle>
                {getStatusBadge(spec.status)}
              </div>
              <p className="text-sm text-muted-foreground line-clamp-3">{spec.description}</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Icon name="Briefcase" size={16} className="text-primary" />
                  <span>{spec.specialty}</span>
                </div>
                {(spec.budget_from || spec.budget_to) && (
                  <div className="flex items-center gap-2">
                    <Icon name="DollarSign" size={16} className="text-primary" />
                    <span>
                      {spec.budget_from && spec.budget_to 
                        ? `${spec.budget_from.toLocaleString()}-${spec.budget_to.toLocaleString()}`
                        : spec.budget_from 
                          ? `от ${spec.budget_from.toLocaleString()}`
                          : `до ${spec.budget_to?.toLocaleString()}`
                      } {spec.currency}
                    </span>
                  </div>
                )}
                {spec.location && (
                  <div className="flex items-center gap-2">
                    <Icon name="MapPin" size={16} className="text-primary" />
                    <span>{spec.location}</span>
                  </div>
                )}
                {spec.deadline_date && (
                  <div className="flex items-center gap-2">
                    <Icon name="Calendar" size={16} className="text-primary" />
                    <span>До {new Date(spec.deadline_date).toLocaleDateString('ru-RU')}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {activeTab === 'courses' && courses.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <Icon name="BookOpen" size={48} className="mx-auto mb-4 opacity-50" />
          <p>Пока нет курсов. Добавьте первый курс!</p>
        </div>
      )}

      {activeTab === 'masterminds' && masterminds.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <Icon name="Users" size={48} className="mx-auto mb-4 opacity-50" />
          <p>Пока нет мастермайндов. Добавьте первое мероприятие!</p>
        </div>
      )}

      {activeTab === 'specialists' && specialists.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <Icon name="Search" size={48} className="mx-auto mb-4 opacity-50" />
          <p>Пока нет запросов. Создайте первое объявление!</p>
        </div>
      )}
    </>
  );
}