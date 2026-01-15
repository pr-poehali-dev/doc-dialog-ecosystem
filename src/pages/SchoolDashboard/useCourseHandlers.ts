import { Dispatch, SetStateAction } from 'react';
import { Course, CourseFormData, COURSE_API_URL, INITIAL_COURSE_FORM } from './types';
import { getUserId } from '@/utils/auth';

interface UseCourseHandlersProps {
  schoolId: number;
  courseForm: CourseFormData;
  setCourseForm: Dispatch<SetStateAction<CourseFormData>>;
  editingCourseId: number | null;
  setEditingCourseId: Dispatch<SetStateAction<number | null>>;
  setShowAddForm: Dispatch<SetStateAction<boolean>>;
  loadData: () => Promise<void>;
  toast: (params: { title: string; description: string; variant?: 'destructive' }) => void;
}

export function useCourseHandlers({
  schoolId,
  courseForm,
  setCourseForm,
  editingCourseId,
  setEditingCourseId,
  setShowAddForm,
  loadData,
  toast
}: UseCourseHandlersProps) {
  const handleAddCourse = async () => {
    try {
      const userId = getUserId();
      const response = await fetch(`${COURSE_API_URL}?type=courses`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'X-User-Id': userId
        },
        body: JSON.stringify({
          school_id: schoolId,
          title: courseForm.title,
          course_type: courseForm.course_type,
          category: courseForm.category,
          description: courseForm.description,
          has_certificate: courseForm.has_certificate,
          duration_hours: courseForm.duration_hours ? parseInt(courseForm.duration_hours) : null,
          image_url: courseForm.image_url,
          external_url: courseForm.external_url
        })
      });
      
      if (response.ok) {
        toast({ title: 'Курс добавлен', description: 'Курс отправлен на модерацию' });
        setShowAddForm(false);
        setCourseForm(INITIAL_COURSE_FORM);
        loadData();
      }
    } catch (error) {
      toast({ title: 'Ошибка', description: 'Не удалось добавить курс', variant: 'destructive' });
    }
  };

  const handleEditCourse = (course: Course) => {
    setCourseForm({
      title: course.title,
      course_type: course.course_type,
      category: course.category,
      description: course.description,
      has_certificate: (course as any).has_certificate || false,
      duration_hours: course.duration_hours?.toString() || '',
      image_url: course.image_url || '',
      external_url: course.external_url || ''
    });
    setEditingCourseId(course.id);
    setShowAddForm(true);
  };

  const handleUpdateCourse = async () => {
    if (!editingCourseId) return;
    
    try {
      const userId = getUserId();
      const response = await fetch(`${COURSE_API_URL}?type=courses&id=${editingCourseId}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'X-User-Id': userId
        },
        body: JSON.stringify({
          title: courseForm.title,
          course_type: courseForm.course_type,
          category: courseForm.category,
          description: courseForm.description,
          has_certificate: courseForm.has_certificate,
          duration_hours: courseForm.duration_hours ? parseInt(courseForm.duration_hours) : null,
          image_url: courseForm.image_url,
          external_url: courseForm.external_url
        })
      });
      
      if (response.ok) {
        toast({ title: 'Курс обновлен', description: 'Курс отправлен на модерацию' });
        setShowAddForm(false);
        setEditingCourseId(null);
        setCourseForm(INITIAL_COURSE_FORM);
        loadData();
      }
    } catch (error) {
      toast({ title: 'Ошибка', description: 'Не удалось обновить курс', variant: 'destructive' });
    }
  };

  const handleDeleteCourse = async (courseId: number) => {
    if (!confirm('Вы уверены, что хотите удалить этот курс?')) return;
    
    try {
      const userId = getUserId();
      const response = await fetch(`${COURSE_API_URL}?type=courses&id=${courseId}`, {
        method: 'DELETE',
        headers: { 'X-User-Id': userId }
      });
      
      if (response.ok) {
        toast({ title: 'Курс удален', description: 'Курс успешно удален' });
        loadData();
      }
    } catch (error) {
      toast({ title: 'Ошибка', description: 'Не удалось удалить курс', variant: 'destructive' });
    }
  };

  const handleSubmitDraftCourse = async (courseId: number) => {
    try {
      const userId = getUserId();
      const response = await fetch(`${COURSE_API_URL}?type=courses&id=${courseId}&action=submit_draft`, {
        method: 'POST',
        headers: { 'X-User-Id': userId }
      });
      
      const data = await response.json();
      
      if (response.ok) {
        if (data.status === 'pending') {
          toast({ title: 'Курс отправлен на модерацию', description: 'Ваш курс будет проверен модераторами' });
        } else if (data.status === 'draft') {
          toast({ 
            title: 'Превышен лимит публикаций', 
            description: 'Обновите тариф для увеличения лимита публикаций',
            variant: 'destructive'
          });
        }
        loadData();
      } else {
        toast({ title: 'Ошибка', description: data.error || 'Не удалось отправить курс на модерацию', variant: 'destructive' });
      }
    } catch (error) {
      toast({ title: 'Ошибка', description: 'Не удалось отправить курс на модерацию', variant: 'destructive' });
    }
  };

  return {
    handleAddCourse,
    handleEditCourse,
    handleUpdateCourse,
    handleDeleteCourse,
    handleSubmitDraftCourse
  };
}