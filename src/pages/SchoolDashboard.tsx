import { useState, useEffect } from 'react';
import { Navigation } from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import CourseForm from '@/components/school/CourseForm';
import MastermindForm from '@/components/school/MastermindForm';
import SpecialistForm from '@/components/school/SpecialistForm';
import ItemsList from '@/components/school/ItemsList';

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
  view_count?: number;
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

const COURSE_API_URL = 'https://functions.poehali.dev/95b5e0a7-51f7-4fb1-b196-a49f5feff58f';

export default function SchoolDashboard() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'courses' | 'masterminds' | 'specialists'>('courses');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingCourseId, setEditingCourseId] = useState<number | null>(null);
  const [editingMastermindId, setEditingMastermindId] = useState<number | null>(null);
  const [editingSpecialistId, setEditingSpecialistId] = useState<number | null>(null);
  
  const [courses, setCourses] = useState<Course[]>([]);
  const [masterminds, setMasterminds] = useState<Mastermind[]>([]);
  const [specialists, setSpecialists] = useState<SpecialistRequest[]>([]);
  
  const schoolId = 1;
  
  const [courseForm, setCourseForm] = useState({
    title: '',
    description: '',
    category: 'Классический массаж',
    course_type: 'online',
    price: '',
    duration_hours: '',
    image_url: '',
    external_url: '',
    original_price: '',
    discount_price: '',
    author_name: '',
    author_photo: '',
    course_content: ''
  });
  
  const [mastermindForm, setMastermindForm] = useState({
    title: '',
    description: '',
    event_date: '',
    location: '',
    max_participants: '',
    price: '',
    image_url: '',
    external_url: '',
    original_price: '',
    discount_price: '',
    author_name: '',
    author_photo: '',
    event_content: ''
  });
  
  const [specialistForm, setSpecialistForm] = useState({
    title: '',
    description: '',
    specialty: 'Видеооператор',
    budget_from: '',
    budget_to: '',
    location: '',
    deadline_date: ''
  });

  useEffect(() => {
    loadData();
  }, [activeTab]);

  const loadData = async () => {
    try {
      if (activeTab === 'courses') {
        const response = await fetch(`${COURSE_API_URL}?school_id=${schoolId}&status=all`);
        const data = await response.json();
        setCourses(data);
      } else if (activeTab === 'masterminds') {
        const response = await fetch(`${COURSE_API_URL}?action=masterminds&school_id=${schoolId}&status=all`);
        const data = await response.json();
        setMasterminds(data);
      } else if (activeTab === 'specialists') {
        const response = await fetch(`${COURSE_API_URL}?action=specialists&school_id=${schoolId}&status=all`);
        const data = await response.json();
        setSpecialists(data);
      }
    } catch (error) {
      console.error('Load error:', error);
      toast({ title: 'Ошибка загрузки', description: 'Не удалось загрузить данные', variant: 'destructive' });
    }
  };

  const handleAddCourse = async () => {
    try {
      const response = await fetch(`${COURSE_API_URL}?type=courses`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          school_id: schoolId,
          ...courseForm,
          price: courseForm.price ? parseFloat(courseForm.price) : null,
          duration_hours: courseForm.duration_hours ? parseInt(courseForm.duration_hours) : null,
          original_price: courseForm.original_price ? parseFloat(courseForm.original_price) : null,
          discount_price: courseForm.discount_price ? parseFloat(courseForm.discount_price) : null,
          author_name: courseForm.author_name,
          author_photo: courseForm.author_photo,
          course_content: courseForm.course_content
        })
      });
      
      if (response.ok) {
        toast({ title: 'Курс добавлен', description: 'Курс отправлен на модерацию' });
        setShowAddForm(false);
        setCourseForm({ title: '', description: '', category: 'Классический массаж', course_type: 'online', price: '', duration_hours: '', image_url: '', external_url: '', original_price: '', discount_price: '', author_name: '', author_photo: '', course_content: '' });
        loadData();
      }
    } catch (error) {
      toast({ title: 'Ошибка', description: 'Не удалось добавить курс', variant: 'destructive' });
    }
  };

  const handleEditCourse = (course: Course) => {
    setCourseForm({
      title: course.title,
      description: course.description,
      category: course.category,
      course_type: course.course_type,
      price: course.price?.toString() || '',
      duration_hours: course.duration_hours?.toString() || '',
      image_url: course.image_url || '',
      external_url: course.external_url,
      original_price: course.original_price?.toString() || '',
      discount_price: course.discount_price?.toString() || '',
      author_name: '',
      author_photo: '',
      course_content: ''
    });
    setEditingCourseId(course.id);
    setShowAddForm(true);
  };

  const handleUpdateCourse = async () => {
    if (!editingCourseId) return;
    
    try {
      const response = await fetch(`${COURSE_API_URL}?type=courses&id=${editingCourseId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...courseForm,
          price: courseForm.price ? parseFloat(courseForm.price) : null,
          duration_hours: courseForm.duration_hours ? parseInt(courseForm.duration_hours) : null,
          original_price: courseForm.original_price ? parseFloat(courseForm.original_price) : null,
          discount_price: courseForm.discount_price ? parseFloat(courseForm.discount_price) : null,
          author_name: courseForm.author_name,
          author_photo: courseForm.author_photo,
          course_content: courseForm.course_content
        })
      });
      
      if (response.ok) {
        toast({ title: 'Курс обновлен', description: 'Курс отправлен на модерацию' });
        setShowAddForm(false);
        setEditingCourseId(null);
        setCourseForm({ title: '', description: '', category: 'Классический массаж', course_type: 'online', price: '', duration_hours: '', image_url: '', external_url: '', original_price: '', discount_price: '', author_name: '', author_photo: '', course_content: '' });
        loadData();
      }
    } catch (error) {
      toast({ title: 'Ошибка', description: 'Не удалось обновить курс', variant: 'destructive' });
    }
  };

  const handleDeleteCourse = async (courseId: number) => {
    if (!confirm('Вы уверены, что хотите удалить этот курс?')) return;
    
    try {
      const response = await fetch(`${COURSE_API_URL}?type=courses&id=${courseId}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        toast({ title: 'Курс удален', description: 'Курс успешно удален' });
        loadData();
      }
    } catch (error) {
      toast({ title: 'Ошибка', description: 'Не удалось удалить курс', variant: 'destructive' });
    }
  };

  const handleAddMastermind = async () => {
    try {
      const response = await fetch(`${COURSE_API_URL}?type=masterminds`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          school_id: schoolId,
          ...mastermindForm,
          price: mastermindForm.price ? parseFloat(mastermindForm.price) : null,
          max_participants: mastermindForm.max_participants ? parseInt(mastermindForm.max_participants) : null,
          original_price: mastermindForm.original_price ? parseFloat(mastermindForm.original_price) : null,
          discount_price: mastermindForm.discount_price ? parseFloat(mastermindForm.discount_price) : null,
          author_name: mastermindForm.author_name,
          author_photo: mastermindForm.author_photo,
          event_content: mastermindForm.event_content
        })
      });
      
      if (response.ok) {
        toast({ title: 'Мастермайнд добавлен', description: 'Мастермайнд отправлен на модерацию' });
        setShowAddForm(false);
        setMastermindForm({ title: '', description: '', event_date: '', location: '', max_participants: '', price: '', image_url: '', external_url: '', original_price: '', discount_price: '', author_name: '', author_photo: '', event_content: '' });
        loadData();
      }
    } catch (error) {
      toast({ title: 'Ошибка', description: 'Не удалось добавить мастермайнд', variant: 'destructive' });
    }
  };

  const handleEditMastermind = (mastermind: Mastermind) => {
    setMastermindForm({
      title: mastermind.title,
      description: mastermind.description,
      event_date: mastermind.event_date,
      location: mastermind.location || '',
      max_participants: mastermind.max_participants?.toString() || '',
      price: mastermind.price?.toString() || '',
      image_url: mastermind.image_url || '',
      external_url: mastermind.external_url,
      original_price: mastermind.original_price?.toString() || '',
      discount_price: mastermind.discount_price?.toString() || '',
      author_name: '',
      author_photo: '',
      event_content: ''
    });
    setEditingMastermindId(mastermind.id);
    setShowAddForm(true);
  };

  const handleUpdateMastermind = async () => {
    if (!editingMastermindId) return;
    
    try {
      const response = await fetch(`${COURSE_API_URL}?type=masterminds&id=${editingMastermindId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...mastermindForm,
          price: mastermindForm.price ? parseFloat(mastermindForm.price) : null,
          max_participants: mastermindForm.max_participants ? parseInt(mastermindForm.max_participants) : null,
          original_price: mastermindForm.original_price ? parseFloat(mastermindForm.original_price) : null,
          discount_price: mastermindForm.discount_price ? parseFloat(mastermindForm.discount_price) : null,
          author_name: mastermindForm.author_name,
          author_photo: mastermindForm.author_photo,
          event_content: mastermindForm.event_content
        })
      });
      
      if (response.ok) {
        toast({ title: 'Мастермайнд обновлен', description: 'Мастермайнд отправлен на модерацию' });
        setShowAddForm(false);
        setEditingMastermindId(null);
        setMastermindForm({ title: '', description: '', event_date: '', location: '', max_participants: '', price: '', image_url: '', external_url: '', original_price: '', discount_price: '', author_name: '', author_photo: '', event_content: '' });
        loadData();
      }
    } catch (error) {
      toast({ title: 'Ошибка', description: 'Не удалось обновить мастермайнд', variant: 'destructive' });
    }
  };

  const handleDeleteMastermind = async (mastermindId: number) => {
    if (!confirm('Вы уверены, что хотите удалить этот мастермайнд?')) return;
    
    try {
      const response = await fetch(`${COURSE_API_URL}?type=masterminds&id=${mastermindId}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        toast({ title: 'Мастермайнд удален', description: 'Мастермайнд успешно удален' });
        loadData();
      }
    } catch (error) {
      toast({ title: 'Ошибка', description: 'Не удалось удалить мастермайнд', variant: 'destructive' });
    }
  };

  const handleAddSpecialist = async () => {
    try {
      const response = await fetch(`${COURSE_API_URL}?type=specialists`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          school_id: schoolId,
          ...specialistForm,
          budget_from: specialistForm.budget_from ? parseFloat(specialistForm.budget_from) : null,
          budget_to: specialistForm.budget_to ? parseFloat(specialistForm.budget_to) : null
        })
      });
      
      if (response.ok) {
        toast({ title: 'Запрос создан', description: 'Объявление о поиске специалиста опубликовано' });
        setShowAddForm(false);
        setSpecialistForm({ title: '', description: '', specialty: 'Видеооператор', budget_from: '', budget_to: '', location: '', deadline_date: '' });
        loadData();
      }
    } catch (error) {
      toast({ title: 'Ошибка', description: 'Не удалось создать запрос', variant: 'destructive' });
    }
  };

  const handleEditSpecialist = (specialist: SpecialistRequest) => {
    setSpecialistForm({
      title: specialist.title,
      description: specialist.description,
      specialty: specialist.specialty,
      budget_from: specialist.budget_from?.toString() || '',
      budget_to: specialist.budget_to?.toString() || '',
      location: specialist.location || '',
      deadline_date: specialist.deadline_date || ''
    });
    setEditingSpecialistId(specialist.id);
    setShowAddForm(true);
  };

  const handleUpdateSpecialist = async () => {
    if (!editingSpecialistId) return;
    
    try {
      const response = await fetch(`${COURSE_API_URL}?type=specialists&id=${editingSpecialistId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...specialistForm,
          budget_from: specialistForm.budget_from ? parseFloat(specialistForm.budget_from) : null,
          budget_to: specialistForm.budget_to ? parseFloat(specialistForm.budget_to) : null
        })
      });
      
      if (response.ok) {
        toast({ title: 'Запрос обновлен', description: 'Объявление успешно обновлено' });
        setShowAddForm(false);
        setEditingSpecialistId(null);
        setSpecialistForm({ title: '', description: '', specialty: 'Видеооператор', budget_from: '', budget_to: '', location: '', deadline_date: '' });
        loadData();
      }
    } catch (error) {
      toast({ title: 'Ошибка', description: 'Не удалось обновить запрос', variant: 'destructive' });
    }
  };

  const handleDeleteSpecialist = async (specialistId: number) => {
    if (!confirm('Вы уверены, что хотите удалить этот запрос?')) return;
    
    try {
      const response = await fetch(`${COURSE_API_URL}?type=specialists&id=${specialistId}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        toast({ title: 'Запрос удален', description: 'Запрос успешно удален' });
        loadData();
      }
    } catch (error) {
      toast({ title: 'Ошибка', description: 'Не удалось удалить запрос', variant: 'destructive' });
    }
  };

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
            onClick={() => { setActiveTab('specialists'); setShowAddForm(false); }}
            className={`px-4 py-2 font-medium transition-colors ${activeTab === 'specialists' ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground hover:text-foreground'}`}
          >
            <Icon name="Search" size={18} className="inline mr-2" />
            Найти специалиста
          </button>
        </div>

        <div className="mb-6">
          <Button onClick={() => setShowAddForm(!showAddForm)}>
            <Icon name="Plus" size={18} className="mr-2" />
            {activeTab === 'courses' && 'Добавить курс'}
            {activeTab === 'masterminds' && 'Добавить мастермайнд'}
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
              setCourseForm({ title: '', description: '', category: 'Классический массаж', course_type: 'online', price: '', duration_hours: '', image_url: '', external_url: '', original_price: '', discount_price: '', author_name: '', author_photo: '', course_content: '' });
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
              setMastermindForm({ title: '', description: '', event_date: '', location: '', max_participants: '', price: '', image_url: '', external_url: '', original_price: '', discount_price: '', author_name: '', author_photo: '', event_content: '' });
            }}
            isEditing={!!editingMastermindId}
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
              setSpecialistForm({ title: '', description: '', specialty: 'Видеооператор', budget_from: '', budget_to: '', location: '', deadline_date: '' });
            }}
            isEditing={!!editingSpecialistId}
          />
        )}

        {!showAddForm && (
          <ItemsList
            activeTab={activeTab}
            courses={courses}
            masterminds={masterminds}
            specialists={specialists}
            getStatusBadge={getStatusBadge}
            onEditCourse={handleEditCourse}
            onDeleteCourse={handleDeleteCourse}
            onEditMastermind={handleEditMastermind}
            onDeleteMastermind={handleDeleteMastermind}
            onEditSpecialist={handleEditSpecialist}
            onDeleteSpecialist={handleDeleteSpecialist}
          />
        )}
      </div>
    </div>
  );
}