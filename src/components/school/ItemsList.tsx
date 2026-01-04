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
  slug?: string;
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
  original_price?: number | null;
  discount_price?: number | null;
  view_count?: number;
  slug?: string;
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
  activeTab: 'courses' | 'masterminds' | 'offline-training' | 'specialists';
  courses: Course[];
  masterminds: Mastermind[];
  offlineTrainings?: any[];
  specialists: SpecialistRequest[];
  getStatusBadge: (status: string) => JSX.Element;
  onEditCourse?: (course: Course) => void;
  onDeleteCourse?: (courseId: number) => void;
  onPromoteCourse?: (courseId: number, title: string, category: string) => void;
  onEditMastermind?: (mastermind: Mastermind) => void;
  onDeleteMastermind?: (mastermindId: number) => void;
  onEditTraining?: (training: any) => void;
  onDeleteTraining?: (trainingId: number) => void;
  onEditSpecialist?: (specialist: SpecialistRequest) => void;
  onDeleteSpecialist?: (specialistId: number) => void;
}

export default function ItemsList({ activeTab, courses, masterminds, offlineTrainings = [], specialists, getStatusBadge, onEditCourse, onDeleteCourse, onPromoteCourse, onEditMastermind, onDeleteMastermind, onEditTraining, onDeleteTraining, onEditSpecialist, onDeleteSpecialist }: ItemsListProps) {
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
                {course.status === 'approved' && course.slug && (
                  <a
                    href={`/course/landing/${course.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 px-3 py-2 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors font-medium"
                  >
                    <Icon name="ExternalLink" size={16} />
                    Открыть лендинг
                  </a>
                )}
                {course.status === 'approved' && (
                  <button
                    onClick={() => onPromoteCourse?.(course.id, course.title, course.category)}
                    className="w-full flex items-center justify-center gap-2 px-3 py-2 text-sm bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-md hover:from-amber-600 hover:to-orange-600 transition-colors font-medium"
                  >
                    <Icon name="TrendingUp" size={16} />
                    Поднять в топ
                  </button>
                )}
                <div className="flex gap-2">
                  <button
                    onClick={() => onEditCourse?.(course)}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                  >
                    <Icon name="Pencil" size={16} />
                    Редактировать
                  </button>
                  <button
                    onClick={() => onDeleteCourse?.(course.id)}
                    className="flex items-center justify-center gap-2 px-3 py-2 text-sm bg-destructive text-destructive-foreground rounded-md hover:bg-destructive/90 transition-colors"
                  >
                    <Icon name="Trash2" size={16} />
                  </button>
                </div>
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
                <div className="flex gap-2">
                  <a
                    href={`/mastermind/landing/builder?id=${mm.id}`}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                  >
                    <Icon name="Pencil" size={16} />
                    Редактировать
                  </a>
                  <button
                    onClick={() => onDeleteMastermind?.(mm.id)}
                    className="flex items-center justify-center gap-2 px-3 py-2 text-sm bg-destructive text-destructive-foreground rounded-md hover:bg-destructive/90 transition-colors"
                  >
                    <Icon name="Trash2" size={16} />
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {activeTab === 'offline-training' && offlineTrainings.map((training) => (
          <Card key={training.id}>
            <CardHeader>
              <div className="flex justify-between items-start mb-2">
                <CardTitle className="text-lg">{training.title}</CardTitle>
                <span className={`px-2 py-1 rounded text-xs font-medium ${training.is_moderated ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                  {training.is_moderated ? 'Одобрено' : 'На модерации'}
                </span>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2">{training.description}</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Icon name="Calendar" size={16} className="text-primary" />
                  <span>{new Date(training.event_date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
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
              </div>
              <div className="flex gap-2 mt-4 pt-4 border-t">
                <button
                  onClick={() => onEditTraining?.(training)}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                >
                  <Icon name="Pencil" size={16} />
                  Редактировать
                </button>
                <button
                  onClick={() => onDeleteTraining?.(training.id)}
                  className="flex items-center justify-center gap-2 px-3 py-2 text-sm bg-destructive text-destructive-foreground rounded-md hover:bg-destructive/90 transition-colors"
                >
                  <Icon name="Trash2" size={16} />
                </button>
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
              <div className="flex gap-2 mt-4 pt-4 border-t">
                <button
                  onClick={() => onEditSpecialist?.(spec)}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                >
                  <Icon name="Pencil" size={16} />
                  Редактировать
                </button>
                <button
                  onClick={() => onDeleteSpecialist?.(spec.id)}
                  className="flex items-center justify-center gap-2 px-3 py-2 text-sm bg-destructive text-destructive-foreground rounded-md hover:bg-destructive/90 transition-colors"
                >
                  <Icon name="Trash2" size={16} />
                </button>
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