import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import { getUserId } from '@/utils/auth';
import CourseForm from '@/components/school/CourseForm';
import MastermindForm from '@/components/school/MastermindForm';
import OfflineTrainingForm from '@/components/school/OfflineTrainingForm';
import SpecialistForm from '@/components/school/SpecialistForm';
import ItemsList from '@/components/school/ItemsList';
import PromoteCourseDialog from '@/components/school/PromoteCourseDialog';
import DashboardHeader from './SchoolDashboard/DashboardHeader';
import DashboardTabs from './SchoolDashboard/DashboardTabs';
import LandingsTab from './SchoolDashboard/LandingsTab';
import {
  Course,
  Mastermind,
  SpecialistRequest,
  COURSE_API_URL,
  INITIAL_COURSE_FORM,
  INITIAL_MASTERMIND_FORM,
  INITIAL_SPECIALIST_FORM
} from './SchoolDashboard/types';
import { useCourseHandlers } from './SchoolDashboard/useCourseHandlers';
import { useMastermindHandlers } from './SchoolDashboard/useMastermindHandlers';
import { useOfflineTrainingHandlers } from './SchoolDashboard/useOfflineTrainingHandlers';
import { useSpecialistHandlers } from './SchoolDashboard/useSpecialistHandlers';

export default function SchoolDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'courses' | 'masterminds' | 'offline-training' | 'specialists' | 'landings'>('courses');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingCourseId, setEditingCourseId] = useState<number | null>(null);
  const [editingMastermindId, setEditingMastermindId] = useState<number | null>(null);
  const [editingTrainingId, setEditingTrainingId] = useState<number | null>(null);
  const [editingSpecialistId, setEditingSpecialistId] = useState<number | null>(null);
  
  const [courses, setCourses] = useState<Course[]>([]);
  const [masterminds, setMasterminds] = useState<Mastermind[]>([]);
  const [offlineTrainings, setOfflineTrainings] = useState<any[]>([]);
  const [specialists, setSpecialists] = useState<SpecialistRequest[]>([]);
  const [landings, setLandings] = useState<any[]>([]);
  const [schoolId, setSchoolId] = useState<number | null>(null);
  
  const [courseForm, setCourseForm] = useState(INITIAL_COURSE_FORM);
  const [mastermindForm, setMastermindForm] = useState(INITIAL_MASTERMIND_FORM);
  const [trainingForm, setTrainingForm] = useState(INITIAL_MASTERMIND_FORM);
  const [specialistForm, setSpecialistForm] = useState(INITIAL_SPECIALIST_FORM);
  
  const [promoteCourseId, setPromoteCourseId] = useState<number | null>(null);
  const [promoteCourseTitle, setPromoteCourseTitle] = useState('');
  const [promoteCourseCategory, setPromoteCourseCategory] = useState('');
  
  const [promoteMastermindId, setPromoteMastermindId] = useState<number | null>(null);
  const [promoteMastermindTitle, setPromoteMastermindTitle] = useState('');
  
  const [promoteTrainingId, setPromoteTrainingId] = useState<number | null>(null);
  const [promoteTrainingTitle, setPromoteTrainingTitle] = useState('');

  useEffect(() => {
    loadUserSchool();
    
    // Показываем сообщение об успешной отправке курса на модерацию
    if (location.state?.successMessage) {
      toast({
        title: "✅ Успешно!",
        description: location.state.successMessage,
        duration: 5000
      });
      // Очищаем state после показа
      window.history.replaceState({}, document.title);
    }
  }, []);

  useEffect(() => {
    if (schoolId) {
      loadData();
    }
  }, [activeTab, schoolId]);

  const loadUserSchool = async () => {
    try {
      const userId = getUserId();

      if (!userId) {
        toast({ title: 'Требуется авторизация', variant: 'destructive' });
        navigate('/login');
        return;
      }

      const response = await fetch('https://functions.poehali.dev/6ac6b552-624e-4960-a4f1-94f540394c86?action=my_schools', {
        headers: { 'X-User-Id': userId }
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data.schools && data.schools.length > 0) {
          setSchoolId(data.schools[0].id);
        }
      }
    } catch (error) {
      console.error('Load school error:', error);
    }
  };

  const loadData = async () => {
    if (!schoolId) return;
    
    try {
      if (activeTab === 'courses') {
        const response = await fetch(`https://functions.poehali.dev/a81dd7cd-c267-4f44-85f5-0da8353dc741?school_id=${schoolId}`);
        const data = await response.json();
        // Маппинг данных из course-landings API в формат Course
        const mappedCourses = data.map((c: any) => ({
          id: c.id,
          title: c.title,
          description: c.short_description || '',
          category: c.category || '',
          course_type: c.type || 'online',
          price: null,
          currency: 'RUB',
          duration_hours: null,
          image_url: c.cover_url || null,
          external_url: '',
          status: c.status,
          slug: c.slug,
          created_at: c.created_at,
          view_count: 0
        }));
        setCourses(mappedCourses);
      } else if (activeTab === 'masterminds') {
        const response = await fetch(`${COURSE_API_URL}?action=masterminds&school_id=${schoolId}&status=all`);
        const data = await response.json();
        setMasterminds(data);
      } else if (activeTab === 'offline-training') {
        const response = await fetch(`${COURSE_API_URL}?action=offline_trainings&school_id=${schoolId}&status=all`);
        if (response.ok) {
          const data = await response.json();
          setOfflineTrainings(Array.isArray(data) ? data : []);
        } else {
          setOfflineTrainings([]);
        }
      } else if (activeTab === 'specialists') {
        const response = await fetch(`${COURSE_API_URL}?action=specialists&school_id=${schoolId}&status=all`);
        const data = await response.json();
        setSpecialists(data);
      } else if (activeTab === 'landings') {
        const userId = getUserId();
        const response = await fetch(`https://functions.poehali.dev/6ac6b552-624e-4960-a4f1-94f540394c86?action=my_schools`, {
          headers: { 'X-User-Id': userId }
        });
        if (response.ok) {
          const data = await response.json();
          setLandings(data.schools || []);
        } else {
          setLandings([]);
        }
      }
    } catch (error) {
      console.error('Load error:', error);
      toast({ title: 'Ошибка загрузки', description: 'Не удалось загрузить данные', variant: 'destructive' });
    }
  };

  const {
    handleAddCourse,
    handleEditCourse,
    handleUpdateCourse,
    handleDeleteCourse
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
    handleDeleteMastermind
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
    handleDeleteTraining
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

  const {
    handleAddSpecialist,
    handleEditSpecialist,
    handleUpdateSpecialist,
    handleDeleteSpecialist
  } = useSpecialistHandlers({
    schoolId,
    specialistForm,
    setSpecialistForm,
    editingSpecialistId,
    setEditingSpecialistId,
    setShowAddForm,
    loadData,
    toast
  });

  const getStatusBadge = (status: string) => {
    const colors: Record<string, string> = {
      pending: 'bg-yellow-100 text-yellow-800',
      moderation: 'bg-yellow-100 text-yellow-800',
      approved: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
      active: 'bg-blue-100 text-blue-800',
      closed: 'bg-gray-100 text-gray-800'
    };
    
    const labels: Record<string, string> = {
      pending: 'На модерации',
      moderation: 'На модерации',
      approved: 'Одобрено',
      rejected: 'Отклонено',
      active: 'Активно',
      closed: 'Закрыто'
    };
    
    return (
      <span className={`px-2 py-1 rounded text-xs font-medium ${colors[status] || 'bg-gray-100 text-gray-800'}`}>
        {labels[status] || status}
      </span>
    );
  };

  const handleTabChange = (tab: typeof activeTab) => {
    setActiveTab(tab);
    setShowAddForm(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/5">
      <Navigation />
      
      <div className="container mx-auto px-4 py-12">
        <DashboardHeader />

        <DashboardTabs activeTab={activeTab} onTabChange={handleTabChange} />

        {activeTab !== 'landings' && (
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
        )}

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

        {!showAddForm && activeTab !== 'landings' && (
          <ItemsList
            activeTab={activeTab}
            courses={courses}
            masterminds={masterminds}
            offlineTrainings={offlineTrainings}
            specialists={specialists}
            getStatusBadge={getStatusBadge}
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
            onEditSpecialist={handleEditSpecialist}
            onDeleteSpecialist={handleDeleteSpecialist}
          />
        )}

        {activeTab === 'landings' && (
          <LandingsTab landings={landings} onReload={loadData} />
        )}
      </div>

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
        onSuccess={() => {
          loadData();
        }}
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
        onSuccess={() => {
          loadData();
        }}
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
        onSuccess={() => {
          loadData();
        }}
      />
    </div>
  );
}