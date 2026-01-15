import Icon from '@/components/ui/icon';
import CourseCard from './CourseCard';
import MastermindCard from './MastermindCard';
import OfflineTrainingCard from './OfflineTrainingCard';
import SpecialistCard from './SpecialistCard';

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
  promoted_until?: string | null;
  promotion_type?: string | null;
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
  activeTab: 'courses' | 'masterminds' | 'offline-training';
  courses: Course[];
  masterminds: Mastermind[];
  offlineTrainings?: any[];
  canPromoteToTop: boolean;
  getStatusBadge: (status: string) => JSX.Element;
  onEditCourse?: (course: Course) => void;
  onDeleteCourse?: (courseId: number) => void;
  onPromoteCourse?: (courseId: number, title: string, category: string) => void;
  onPromoteMastermind?: (mastermindId: number, title: string) => void;
  onPromoteTraining?: (trainingId: number, title: string) => void;
  onEditMastermind?: (mastermind: Mastermind) => void;
  onDeleteMastermind?: (mastermindId: number) => void;
  onEditTraining?: (training: any) => void;
  onDeleteTraining?: (trainingId: number) => void;
  onSubmitDraftCourse?: (courseId: number) => void;
  onSubmitDraftMastermind?: (mastermindId: number) => void;
  onSubmitDraftTraining?: (trainingId: number) => void;
}

export default function ItemsList({ activeTab, courses, masterminds, offlineTrainings = [], canPromoteToTop, getStatusBadge, onEditCourse, onDeleteCourse, onPromoteCourse, onPromoteMastermind, onPromoteTraining, onEditMastermind, onDeleteMastermind, onEditTraining, onDeleteTraining, onSubmitDraftCourse, onSubmitDraftMastermind, onSubmitDraftTraining }: ItemsListProps) {
  return (
    <>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activeTab === 'courses' && courses.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            canPromoteToTop={canPromoteToTop}
            getStatusBadge={getStatusBadge}
            onEdit={onEditCourse}
            onDelete={onDeleteCourse}
            onPromote={onPromoteCourse}
            onSubmitDraft={onSubmitDraftCourse}
          />
        ))}

        {activeTab === 'masterminds' && masterminds.map((mm) => (
          <MastermindCard
            key={mm.id}
            mastermind={mm}
            canPromoteToTop={canPromoteToTop}
            getStatusBadge={getStatusBadge}
            onEdit={onEditMastermind}
            onDelete={onDeleteMastermind}
            onPromote={onPromoteMastermind}
            onSubmitDraft={onSubmitDraftMastermind}
          />
        ))}

        {activeTab === 'offline-training' && offlineTrainings.map((training) => (
          <OfflineTrainingCard
            key={training.id}
            training={training}
            canPromoteToTop={canPromoteToTop}
            getStatusBadge={getStatusBadge}
            onEdit={onEditTraining}
            onDelete={onDeleteTraining}
            onPromote={onPromoteTraining}
            onSubmitDraft={onSubmitDraftTraining}
          />
        ))}
          />
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
    </>
  );
}