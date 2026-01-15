import { Dispatch, SetStateAction } from 'react';
import { Course, CourseFormData, COURSE_API_URL, INITIAL_COURSE_FORM } from './types';

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
      const response = await fetch(`${COURSE_API_URL}?type=courses`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          school_id: schoolId,
          ...courseForm,
          price: courseForm.price ? parseFloat(courseForm.price) : null,
          duration_hours: courseForm.duration_hours ? parseInt(courseForm.duration_hours) : null,
          original_price: courseForm.original_price ? parseFloat(courseForm.original_price) : null,
          discount_price: courseForm.discount_price ? parseFloat(courseForm.discount_price) : null
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
      school_name: course.school_name || '',
      title: course.title,
      description: course.description,
      category: course.category,
      course_type: course.course_type,
      price: course.price?.toString() || '',
      duration_hours: course.duration_hours?.toString() || '',
      image_url: course.image_url || '',
      external_url: course.external_url || '',
      original_price: course.original_price?.toString() || '',
      discount_price: course.discount_price?.toString() || '',
      has_certificate: (course as any).has_certificate || false,
      has_employment: (course as any).has_employment || false,
      has_practice: (course as any).has_practice || false
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
          discount_price: courseForm.discount_price ? parseFloat(courseForm.discount_price) : null
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

  const handleSubmitDraftCourse = async (courseId: number) => {
    try {
      const response = await fetch(`${COURSE_API_URL}?type=courses&id=${courseId}&action=submit_draft`, {
        method: 'POST'
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