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
          discount_price: courseForm.discount_price ? parseFloat(courseForm.discount_price) : null,
          author_name: courseForm.author_name,
          author_photo: courseForm.author_photo,
          course_content: courseForm.course_content
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

  return {
    handleAddCourse,
    handleEditCourse,
    handleUpdateCourse,
    handleDeleteCourse
  };
}
