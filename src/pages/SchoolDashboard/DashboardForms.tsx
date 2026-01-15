import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import CourseForm from '@/components/school/CourseForm';
import MastermindForm from '@/components/school/MastermindForm';
import OfflineTrainingForm from '@/components/school/OfflineTrainingForm';
import { INITIAL_COURSE_FORM, INITIAL_MASTERMIND_FORM, INITIAL_OFFLINE_TRAINING_FORM } from './types';

interface DashboardFormsProps {
  activeTab: 'courses' | 'masterminds' | 'offline-training' | 'promo-requests' | 'subscription';
  showAddForm: boolean;
  setShowAddForm: (show: boolean) => void;
  editingCourseId: number | null;
  setEditingCourseId: (id: number | null) => void;
  editingMastermindId: number | null;
  setEditingMastermindId: (id: number | null) => void;
  editingTrainingId: number | null;
  setEditingTrainingId: (id: number | null) => void;
  courseForm: any;
  setCourseForm: (form: any) => void;
  mastermindForm: any;
  setMastermindForm: (form: any) => void;
  trainingForm: any;
  setTrainingForm: (form: any) => void;
  handleAddCourse: () => void;
  handleUpdateCourse: () => void;
  handleAddMastermind: () => void;
  handleUpdateMastermind: () => void;
  handleAddTraining: () => void;
  handleUpdateTraining: () => void;
}

export default function DashboardForms({
  activeTab,
  showAddForm,
  setShowAddForm,
  editingCourseId,
  setEditingCourseId,
  editingMastermindId,
  setEditingMastermindId,
  editingTrainingId,
  setEditingTrainingId,
  courseForm,
  setCourseForm,
  mastermindForm,
  setMastermindForm,
  trainingForm,
  setTrainingForm,
  handleAddCourse,
  handleUpdateCourse,
  handleAddMastermind,
  handleUpdateMastermind,
  handleAddTraining,
  handleUpdateTraining
}: DashboardFormsProps) {
  if (activeTab === 'promo-requests' || activeTab === 'subscription') {
    return null;
  }

  return (
    <>
      <div className="mb-6">
        <Button onClick={() => setShowAddForm(!showAddForm)}>
          <Icon name="Plus" size={18} className="mr-2" />
          {activeTab === 'courses' && 'Добавить курс'}
          {activeTab === 'masterminds' && 'Добавить мастермайнд'}
          {activeTab === 'offline-training' && 'Добавить очное обучение'}
        </Button>
      </div>

      {showAddForm && activeTab === 'courses' && (
        <CourseForm
          courseForm={courseForm}
          setCourseForm={setCourseForm}
          onSubmit={editingCourseId ? handleUpdateCourse : handleAddCourse}
          onCancel={() => {
            setShowAddForm(false);
            setEditingCourseId(null);
            setCourseForm(INITIAL_COURSE_FORM);
          }}
          isEditing={!!editingCourseId}
        />
      )}

      {showAddForm && activeTab === 'masterminds' && (
        <MastermindForm
          mastermindForm={mastermindForm}
          setMastermindForm={setMastermindForm}
          onSubmit={editingMastermindId ? handleUpdateMastermind : handleAddMastermind}
          onCancel={() => {
            setShowAddForm(false);
            setEditingMastermindId(null);
            setMastermindForm(INITIAL_MASTERMIND_FORM);
          }}
          isEditing={!!editingMastermindId}
        />
      )}

      {showAddForm && activeTab === 'offline-training' && (
        <OfflineTrainingForm
          trainingForm={trainingForm}
          setTrainingForm={setTrainingForm}
          onSubmit={editingTrainingId ? handleUpdateTraining : handleAddTraining}
          onCancel={() => {
            setShowAddForm(false);
            setEditingTrainingId(null);
            setTrainingForm(INITIAL_OFFLINE_TRAINING_FORM);
          }}
          isEditing={!!editingTrainingId}
        />
      )}
    </>
  );
}