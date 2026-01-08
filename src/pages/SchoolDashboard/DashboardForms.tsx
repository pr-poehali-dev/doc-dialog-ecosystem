import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import CourseForm from '@/components/school/CourseForm';
import MastermindForm from '@/components/school/MastermindForm';
import OfflineTrainingForm from '@/components/school/OfflineTrainingForm';
import SpecialistForm from '@/components/school/SpecialistForm';
import { INITIAL_COURSE_FORM, INITIAL_MASTERMIND_FORM, INITIAL_SPECIALIST_FORM } from './types';

interface DashboardFormsProps {
  activeTab: 'courses' | 'masterminds' | 'offline-training' | 'specialists' | 'landings' | 'knowledge' | 'promo-requests' | 'subscription';
  showAddForm: boolean;
  setShowAddForm: (show: boolean) => void;
  editingCourseId: number | null;
  setEditingCourseId: (id: number | null) => void;
  editingMastermindId: number | null;
  setEditingMastermindId: (id: number | null) => void;
  editingTrainingId: number | null;
  setEditingTrainingId: (id: number | null) => void;
  editingSpecialistId: number | null;
  setEditingSpecialistId: (id: number | null) => void;
  courseForm: any;
  setCourseForm: (form: any) => void;
  mastermindForm: any;
  setMastermindForm: (form: any) => void;
  trainingForm: any;
  setTrainingForm: (form: any) => void;
  specialistForm: any;
  setSpecialistForm: (form: any) => void;
  handleAddCourse: () => void;
  handleUpdateCourse: () => void;
  handleAddMastermind: () => void;
  handleUpdateMastermind: () => void;
  handleAddTraining: () => void;
  handleUpdateTraining: () => void;
  handleAddSpecialist: () => void;
  handleUpdateSpecialist: () => void;
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
  editingSpecialistId,
  setEditingSpecialistId,
  courseForm,
  setCourseForm,
  mastermindForm,
  setMastermindForm,
  trainingForm,
  setTrainingForm,
  specialistForm,
  setSpecialistForm,
  handleAddCourse,
  handleUpdateCourse,
  handleAddMastermind,
  handleUpdateMastermind,
  handleAddTraining,
  handleUpdateTraining,
  handleAddSpecialist,
  handleUpdateSpecialist
}: DashboardFormsProps) {
  const navigate = useNavigate();

  if (activeTab === 'landings' || activeTab === 'knowledge' || activeTab === 'promo-requests' || activeTab === 'subscription') {
    return null;
  }

  return (
    <>
      <div className="mb-6">
        <Button onClick={() => {
          if (activeTab === 'courses') {
            navigate('/course/landing/builder');
          } else if (activeTab === 'masterminds') {
            navigate('/mastermind/landing/builder');
          } else if (activeTab === 'offline-training') {
            navigate('/offline-training/landing/builder');
          } else {
            setShowAddForm(!showAddForm);
          }
        }}>
          <Icon name="Plus" size={18} className="mr-2" />
          {activeTab === 'courses' && 'Добавить курс'}
          {activeTab === 'masterminds' && 'Добавить мастермайнд'}
          {activeTab === 'offline-training' && 'Добавить очное обучение'}
          {activeTab === 'specialists' && 'Найти специалиста'}
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
            setTrainingForm(INITIAL_MASTERMIND_FORM);
          }}
          isEditing={!!editingTrainingId}
        />
      )}

      {showAddForm && activeTab === 'specialists' && (
        <SpecialistForm
          specialistForm={specialistForm}
          setSpecialistForm={setSpecialistForm}
          onSubmit={editingSpecialistId ? handleUpdateSpecialist : handleAddSpecialist}
          onCancel={() => {
            setShowAddForm(false);
            setEditingSpecialistId(null);
            setSpecialistForm(INITIAL_SPECIALIST_FORM);
          }}
          isEditing={!!editingSpecialistId}
        />
      )}
    </>
  );
}
