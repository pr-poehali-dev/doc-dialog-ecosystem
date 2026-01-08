import PromoteCourseDialog from '@/components/school/PromoteCourseDialog';

interface DashboardPromoteDialogsProps {
  promoteCourseId: number | null;
  setPromoteCourseId: (id: number | null) => void;
  promoteCourseTitle: string;
  setPromoteCourseTitle: (title: string) => void;
  promoteCourseCategory: string;
  setPromoteCourseCategory: (category: string) => void;
  promoteMastermindId: number | null;
  setPromoteMastermindId: (id: number | null) => void;
  promoteMastermindTitle: string;
  setPromoteMastermindTitle: (title: string) => void;
  promoteTrainingId: number | null;
  setPromoteTrainingId: (id: number | null) => void;
  promoteTrainingTitle: string;
  setPromoteTrainingTitle: (title: string) => void;
  onSuccess: () => void;
}

export default function DashboardPromoteDialogs({
  promoteCourseId,
  setPromoteCourseId,
  promoteCourseTitle,
  setPromoteCourseTitle,
  promoteCourseCategory,
  setPromoteCourseCategory,
  promoteMastermindId,
  setPromoteMastermindId,
  promoteMastermindTitle,
  setPromoteMastermindTitle,
  promoteTrainingId,
  setPromoteTrainingId,
  promoteTrainingTitle,
  setPromoteTrainingTitle,
  onSuccess
}: DashboardPromoteDialogsProps) {
  return (
    <>
      <PromoteCourseDialog
        open={promoteCourseId !== null}
        onOpenChange={(open) => {
          if (!open) {
            setPromoteCourseId(null);
            setPromoteCourseTitle('');
            setPromoteCourseCategory('');
          }
        }}
        courseId={promoteCourseId || 0}
        courseTitle={promoteCourseTitle}
        courseCategory={promoteCourseCategory}
        onSuccess={onSuccess}
      />
      
      <PromoteCourseDialog
        open={promoteMastermindId !== null}
        onOpenChange={(open) => {
          if (!open) {
            setPromoteMastermindId(null);
            setPromoteMastermindTitle('');
          }
        }}
        courseId={promoteMastermindId || 0}
        courseTitle={promoteMastermindTitle}
        courseCategory="Офлайн мероприятия"
        onSuccess={onSuccess}
      />
      
      <PromoteCourseDialog
        open={promoteTrainingId !== null}
        onOpenChange={(open) => {
          if (!open) {
            setPromoteTrainingId(null);
            setPromoteTrainingTitle('');
          }
        }}
        courseId={promoteTrainingId || 0}
        courseTitle={promoteTrainingTitle}
        courseCategory="Офлайн мероприятия"
        onSuccess={onSuccess}
      />
    </>
  );
}
