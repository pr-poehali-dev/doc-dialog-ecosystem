import { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { useToast } from '@/hooks/use-toast';
import DashboardHeader from './SchoolDashboard/DashboardHeader';
import DashboardTabs from './SchoolDashboard/DashboardTabs';
import DashboardForms from './SchoolDashboard/DashboardForms';
import DashboardContent from './SchoolDashboard/DashboardContent';
import DashboardPromoteDialogs from './SchoolDashboard/DashboardPromoteDialogs';
import {
  INITIAL_COURSE_FORM,
  INITIAL_MASTERMIND_FORM,
  INITIAL_OFFLINE_TRAINING_FORM
} from './SchoolDashboard/types';
import { useCourseHandlers } from './SchoolDashboard/useCourseHandlers';
import { useMastermindHandlers } from './SchoolDashboard/useMastermindHandlers';
import { useOfflineTrainingHandlers } from './SchoolDashboard/useOfflineTrainingHandlers';

import { useDashboardState } from './SchoolDashboard/DashboardState';

export default function SchoolDashboard() {
  const { toast } = useToast();
  
  const {
    activeTab,
    showAddForm,
    setShowAddForm,
    editingCourseId,
    setEditingCourseId,
    editingMastermindId,
    setEditingMastermindId,
    editingTrainingId,
    setEditingTrainingId,
    courses,
    masterminds,
    offlineTrainings,
    landings,
    schoolId,
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
    pendingPromoRequestsCount,
    setPendingPromoRequestsCount,
    canPromoteToTop,
    loadData,
    handleTabChange
  } = useDashboardState(toast);

  const [courseForm, setCourseForm] = useState(INITIAL_COURSE_FORM);
  const [mastermindForm, setMastermindForm] = useState(INITIAL_MASTERMIND_FORM);
  const [trainingForm, setTrainingForm] = useState(INITIAL_OFFLINE_TRAINING_FORM);

  const {
    handleAddCourse,
    handleEditCourse,
    handleUpdateCourse,
    handleDeleteCourse,
    handleSubmitDraftCourse
  } = useCourseHandlers({
    schoolId,
    courseForm,
    setCourseForm,
    editingCourseId,
    setEditingCourseId,
    setShowAddForm,
    loadData,
    toast
  });

  const {
    handleAddMastermind,
    handleEditMastermind,
    handleUpdateMastermind,
    handleDeleteMastermind,
    handleSubmitDraftMastermind
  } = useMastermindHandlers({
    schoolId,
    mastermindForm,
    setMastermindForm,
    editingMastermindId,
    setEditingMastermindId,
    setShowAddForm,
    loadData,
    toast
  });

  const {
    handleAddTraining,
    handleEditTraining,
    handleUpdateTraining,
    handleDeleteTraining,
    handleSubmitDraftTraining
  } = useOfflineTrainingHandlers({
    schoolId,
    trainingForm,
    setTrainingForm,
    editingTrainingId,
    setEditingTrainingId,
    setShowAddForm,
    loadData,
    toast
  });



  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/5">
      <Navigation />
      
      <div className="container mx-auto px-4 py-12">
        <DashboardHeader />

        <DashboardTabs 
          activeTab={activeTab} 
          onTabChange={handleTabChange} 
          pendingPromoRequestsCount={pendingPromoRequestsCount} 
        />

        <DashboardForms
          activeTab={activeTab}
          showAddForm={showAddForm}
          setShowAddForm={setShowAddForm}
          editingCourseId={editingCourseId}
          setEditingCourseId={setEditingCourseId}
          editingMastermindId={editingMastermindId}
          setEditingMastermindId={setEditingMastermindId}
          editingTrainingId={editingTrainingId}
          setEditingTrainingId={setEditingTrainingId}

          courseForm={courseForm}
          setCourseForm={setCourseForm}
          mastermindForm={mastermindForm}
          setMastermindForm={setMastermindForm}
          trainingForm={trainingForm}
          setTrainingForm={setTrainingForm}

          handleAddCourse={handleAddCourse}
          handleUpdateCourse={handleUpdateCourse}
          handleAddMastermind={handleAddMastermind}
          handleUpdateMastermind={handleUpdateMastermind}
          handleAddTraining={handleAddTraining}
          handleUpdateTraining={handleUpdateTraining}

        />

        <DashboardContent
          activeTab={activeTab}
          showAddForm={showAddForm}
          courses={courses}
          masterminds={masterminds}
          offlineTrainings={offlineTrainings}
          canPromoteToTop={canPromoteToTop}
          onEditCourse={handleEditCourse}
          onPromoteCourse={(id, title, category) => {
            setPromoteCourseId(id);
            setPromoteCourseTitle(title);
            setPromoteCourseCategory(category);
          }}
          onDeleteCourse={handleDeleteCourse}
          onPromoteMastermind={(id, title) => {
            setPromoteMastermindId(id);
            setPromoteMastermindTitle(title);
          }}
          onPromoteTraining={(id, title) => {
            setPromoteTrainingId(id);
            setPromoteTrainingTitle(title);
          }}
          onEditMastermind={handleEditMastermind}
          onDeleteMastermind={handleDeleteMastermind}
          onEditTraining={handleEditTraining}
          onDeleteTraining={handleDeleteTraining}
          onSubmitDraftCourse={handleSubmitDraftCourse}
          onSubmitDraftMastermind={handleSubmitDraftMastermind}
          onSubmitDraftTraining={handleSubmitDraftTraining}
          setPendingPromoRequestsCount={setPendingPromoRequestsCount}
        />
      </div>

      <DashboardPromoteDialogs
        promoteCourseId={promoteCourseId}
        setPromoteCourseId={setPromoteCourseId}
        promoteCourseTitle={promoteCourseTitle}
        setPromoteCourseTitle={setPromoteCourseTitle}
        promoteCourseCategory={promoteCourseCategory}
        setPromoteCourseCategory={setPromoteCourseCategory}
        promoteMastermindId={promoteMastermindId}
        setPromoteMastermindId={setPromoteMastermindId}
        promoteMastermindTitle={promoteMastermindTitle}
        setPromoteMastermindTitle={setPromoteMastermindTitle}
        promoteTrainingId={promoteTrainingId}
        setPromoteTrainingId={setPromoteTrainingId}
        promoteTrainingTitle={promoteTrainingTitle}
        setPromoteTrainingTitle={setPromoteTrainingTitle}
        onSuccess={loadData}
      />
    </div>
  );
}