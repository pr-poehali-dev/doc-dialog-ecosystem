import { INITIAL_OFFLINE_TRAINING_FORM } from './types';
import { getUserId } from '@/utils/auth';

export function useOfflineTrainingHandlers({ schoolId, trainingForm, setTrainingForm, editingTrainingId, setEditingTrainingId, setShowAddForm, loadData, toast }: any) {
  const TRAINING_API_URL = 'https://functions.poehali.dev/95b5e0a7-51f7-4fb1-b196-a49f5feff58f';

  const handleAddTraining = async () => {
    try {
      const userId = getUserId();
      const response = await fetch(`${TRAINING_API_URL}?type=offline_trainings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-User-Id': userId
        },
        body: JSON.stringify({
          school_id: schoolId,
          school_name: '',
          event_date: trainingForm.event_date || new Date().toISOString(),
          title: trainingForm.title,
          course_type: trainingForm.course_type,
          category: trainingForm.category,
          description: trainingForm.description,
          has_certificate: trainingForm.has_certificate,
          duration_hours: trainingForm.duration_hours ? parseInt(trainingForm.duration_hours) : null,
          image_url: trainingForm.image_url,
          external_url: trainingForm.external_url,
          price: trainingForm.price ? parseFloat(trainingForm.price) : null,
          currency: 'RUB'
        })
      });
      
      if (response.ok) {
        toast({ title: 'Успех', description: 'Очное обучение добавлено и отправлено на модерацию' });
        setShowAddForm(false);
        setTrainingForm(INITIAL_OFFLINE_TRAINING_FORM);
        loadData();
      } else {
        const errorData = await response.json();
        toast({ title: 'Ошибка', description: errorData.error || 'Не удалось создать обучение', variant: 'destructive' });
      }
    } catch (error) {
      console.error('Error adding training:', error);
      toast({ title: 'Ошибка', description: 'Не удалось добавить обучение', variant: 'destructive' });
    }
  };

  const handleEditTraining = (training: any) => {
    const eventDate = training.event_date ? new Date(training.event_date).toISOString().slice(0, 16) : '';
    setTrainingForm({
      title: training.title,
      course_type: training.course_type || 'offline',
      category: training.category || 'technique',
      description: training.description || '',
      has_certificate: (training as any).has_certificate || false,
      duration_hours: training.duration_hours?.toString() || '',
      image_url: training.image_url || '',
      external_url: training.external_url || '',
      price: training.price?.toString() || '',
      event_date: eventDate
    });
    setEditingTrainingId(training.id);
    setShowAddForm(true);
  };

  const handleUpdateTraining = async () => {
    if (!editingTrainingId) return;
    
    try {
      const userId = getUserId();
      const response = await fetch(`${TRAINING_API_URL}?type=offline_trainings&id=${editingTrainingId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-User-Id': userId
        },
        body: JSON.stringify({
          school_name: '',
          event_date: trainingForm.event_date || new Date().toISOString(),
          title: trainingForm.title,
          course_type: trainingForm.course_type,
          category: trainingForm.category,
          description: trainingForm.description,
          has_certificate: trainingForm.has_certificate,
          duration_hours: trainingForm.duration_hours ? parseInt(trainingForm.duration_hours) : null,
          image_url: trainingForm.image_url,
          external_url: trainingForm.external_url,
          price: trainingForm.price ? parseFloat(trainingForm.price) : null,
          currency: 'RUB'
        })
      });
      
      if (response.ok) {
        toast({ title: 'Успех', description: 'Обучение обновлено' });
        setShowAddForm(false);
        setEditingTrainingId(null);
        setTrainingForm(INITIAL_OFFLINE_TRAINING_FORM);
        loadData();
      } else {
        const errorData = await response.json();
        toast({ title: 'Ошибка', description: errorData.error || 'Не удалось обновить обучение', variant: 'destructive' });
      }
    } catch (error) {
      console.error('Error updating training:', error);
      toast({ title: 'Ошибка', description: 'Не удалось обновить обучение', variant: 'destructive' });
    }
  };

  const handleDeleteTraining = async (trainingId: number) => {
    if (!confirm('Вы уверены, что хотите удалить это обучение?')) return;
    
    try {
      const userId = getUserId();
      const response = await fetch(`${TRAINING_API_URL}?type=offline_trainings&id=${trainingId}`, {
        method: 'DELETE',
        headers: { 'X-User-Id': userId }
      });
      
      if (response.ok) {
        toast({ title: 'Успех', description: 'Обучение удалено' });
        loadData();
      } else {
        const errorData = await response.json();
        toast({ title: 'Ошибка', description: errorData.error || 'Не удалось удалить обучение', variant: 'destructive' });
      }
    } catch (error) {
      console.error('Error deleting training:', error);
      toast({ title: 'Ошибка', description: 'Не удалось удалить обучение', variant: 'destructive' });
    }
  };

  const handleSubmitDraftTraining = async (trainingId: number) => {
    try {
      const userId = getUserId();
      const response = await fetch(`${TRAINING_API_URL}?type=offline_trainings&id=${trainingId}&action=submit_draft`, {
        method: 'POST',
        headers: { 'X-User-Id': userId }
      });
      
      const data = await response.json();
      
      if (response.ok) {
        if (data.status === 'pending') {
          toast({ title: 'Обучение отправлено на модерацию', description: 'Ваше обучение будет проверено модераторами' });
        } else if (data.status === 'draft') {
          toast({ 
            title: 'Превышен лимит публикаций', 
            description: 'Обновите тариф для увеличения лимита публикаций',
            variant: 'destructive'
          });
        }
        loadData();
      } else {
        toast({ title: 'Ошибка', description: data.error || 'Не удалось отправить на модерацию', variant: 'destructive' });
      }
    } catch (error) {
      toast({ title: 'Ошибка', description: 'Не удалось отправить на модерацию', variant: 'destructive' });
    }
  };

  return {
    handleAddTraining,
    handleEditTraining,
    handleUpdateTraining,
    handleDeleteTraining,
    handleSubmitDraftTraining
  };
}