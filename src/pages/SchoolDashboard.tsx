import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
import BalanceCard from '@/components/school/BalanceCard';
import PromoteCourseDialog from '@/components/school/PromoteCourseDialog';
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

  useEffect(() => {
    loadUserSchool();
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
        const response = await fetch(`${COURSE_API_URL}?school_id=${schoolId}&status=all`);
        const data = await response.json();
        setCourses(data);
      } else if (activeTab === 'masterminds') {
        const response = await fetch(`${COURSE_API_URL}?action=masterminds&school_id=${schoolId}&status=all`);
        const data = await response.json();
        setMasterminds(data);
      } else if (activeTab === 'offline-training') {
        const token = localStorage.getItem('token');
        const response = await fetch('https://functions.poehali.dev/3dbad6d0-7948-4c83-ac47-fa9e9e92bf26', {
          headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
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
      approved: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
      active: 'bg-blue-100 text-blue-800',
      closed: 'bg-gray-100 text-gray-800'
    };
    
    const labels: Record<string, string> = {
      pending: 'На модерации',
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/5">
      <Navigation />
      
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Кабинет школы</h1>
          <p className="text-muted-foreground">Управление курсами, мастермайндами и поиском специалистов</p>
        </div>

        <div className="mb-8">
          <BalanceCard />
        </div>

        <div className="flex gap-2 mb-6 border-b">
          <button
            onClick={() => { setActiveTab('courses'); setShowAddForm(false); }}
            className={`px-4 py-2 font-medium transition-colors ${activeTab === 'courses' ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground hover:text-foreground'}`}
          >
            <Icon name="BookOpen" size={18} className="inline mr-2" />
            Курсы
          </button>
          <button
            onClick={() => { setActiveTab('masterminds'); setShowAddForm(false); }}
            className={`px-4 py-2 font-medium transition-colors ${activeTab === 'masterminds' ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground hover:text-foreground'}`}
          >
            <Icon name="Users" size={18} className="inline mr-2" />
            Мастермайнды
          </button>
          <button
            onClick={() => { setActiveTab('offline-training'); setShowAddForm(false); }}
            className={`px-4 py-2 font-medium transition-colors ${activeTab === 'offline-training' ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground hover:text-foreground'}`}
          >
            <Icon name="GraduationCap" size={18} className="inline mr-2" />
            Очное обучение
          </button>
          <button
            onClick={() => { setActiveTab('specialists'); setShowAddForm(false); }}
            className={`px-4 py-2 font-medium transition-colors ${activeTab === 'specialists' ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground hover:text-foreground'}`}
          >
            <Icon name="Search" size={18} className="inline mr-2" />
            Найти специалиста
          </button>
          <button
            onClick={() => { setActiveTab('landings'); setShowAddForm(false); }}
            className={`px-4 py-2 font-medium transition-colors ${activeTab === 'landings' ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground hover:text-foreground'}`}
          >
            <Icon name="Layout" size={18} className="inline mr-2" />
            Лендинг школы
          </button>
        </div>

        {activeTab !== 'landings' && (
          <div className="mb-6">
            <Button onClick={() => {
              if (activeTab === 'courses') {
                navigate('/course/landing/builder');
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
            onEditMastermind={handleEditMastermind}
            onDeleteMastermind={handleDeleteMastermind}
            onEditTraining={handleEditTraining}
            onDeleteTraining={handleDeleteTraining}
            onEditSpecialist={handleEditSpecialist}
            onDeleteSpecialist={handleDeleteSpecialist}
          />
        )}

        {activeTab === 'landings' && (
          <div className="space-y-4">
            {landings.length === 0 ? (
              <div className="text-center py-12 bg-card rounded-lg">
                <Icon name="Layout" size={48} className="mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">Нет лендинга школы</h3>
                <p className="text-muted-foreground mb-4">Создайте профессиональный лендинг для вашей школы</p>
                <Button onClick={() => navigate('/school/landing/builder')} className="bg-blue-600 hover:bg-blue-700">
                  <Icon name="Plus" size={18} className="mr-2" />
                  Создать лендинг школы
                </Button>
              </div>
            ) : (
              landings.map((landing) => (
                <div key={landing.id} className="bg-card rounded-lg p-6 flex items-start justify-between">
                  <div className="flex gap-4 flex-1">
                    {landing.logo_url && (
                      <img
                        src={landing.logo_url}
                        alt={landing.name}
                        className="w-24 h-24 object-cover rounded"
                      />
                    )}
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-1">{landing.name}</h3>
                      {landing.short_description && (
                        <p className="text-sm text-muted-foreground mb-2">{landing.short_description}</p>
                      )}
                      <div className="flex gap-2 items-center">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          landing.is_verified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {landing.is_verified ? 'Опубликован' : 'На модерации'}
                        </span>
                        {landing.city && <span className="text-xs text-muted-foreground">{landing.city}</span>}
                        {landing.slug && (
                          <a
                            href={`/school/${landing.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-primary hover:underline"
                          >
                            Открыть →
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => navigate(`/school/landing/${landing.id}`)}
                    >
                      <Icon name="Pencil" size={16} />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={async () => {
                        if (confirm('Вы уверены, что хотите удалить лендинг школы?\n\nБудут удалены:\n• Все преподаватели\n• Все достижения\n• Галерея фотографий\n• Отзывы\n\nКурсы останутся, но будут отвязаны от школы.\n\nЭто действие нельзя отменить!')) {
                          try {
                            const token = localStorage.getItem('token');
                            const userId = getUserId();
                            
                            if (!userId) {
                              toast({ 
                                title: 'Требуется авторизация', 
                                description: 'Пожалуйста, войдите в систему заново',
                                variant: 'destructive' 
                              });
                              navigate('/login');
                              return;
                            }
                            
                            const response = await fetch(`https://functions.poehali.dev/6ac6b552-624e-4960-a4f1-94f540394c86?id=${landing.id}`, {
                              method: 'DELETE',
                              headers: { 
                                'Authorization': `Bearer ${token}`,
                                'X-User-Id': userId
                              }
                            });
                            if (response.ok) {
                              toast({ title: 'Успех', description: 'Лендинг удалён' });
                              loadData();
                            } else {
                              const error = await response.text();
                              console.error('Delete error:', error);
                              toast({ title: 'Ошибка', description: 'Не удалось удалить', variant: 'destructive' });
                            }
                          } catch (error) {
                            console.error('Delete error:', error);
                            toast({ title: 'Ошибка', description: 'Не удалось удалить', variant: 'destructive' });
                          }
                        }
                      }}
                    >
                      <Icon name="Trash2" size={16} />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
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
    </div>
  );
}