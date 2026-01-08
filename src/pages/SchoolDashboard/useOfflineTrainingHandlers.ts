export function useOfflineTrainingHandlers({ schoolId, trainingForm, setTrainingForm, editingTrainingId, setEditingTrainingId, setShowAddForm, loadData, toast }: any) {
  const TRAINING_API_URL = 'https://functions.poehali.dev/95b5e0a7-51f7-4fb1-b196-a49f5feff58f';

  const handleAddTraining = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${TRAINING_API_URL}?type=offline_trainings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          school_id: schoolId,
          school_name: trainingForm.school_name,
          title: trainingForm.title,
          description: trainingForm.description,
          event_date: trainingForm.event_date,
          location: trainingForm.location,
          max_participants: trainingForm.max_participants ? parseInt(trainingForm.max_participants) : null,
          price: trainingForm.price ? parseFloat(trainingForm.price) : null,
          image_url: trainingForm.image_url,
          external_url: trainingForm.external_url,
          original_price: trainingForm.original_price ? parseFloat(trainingForm.original_price) : null,
          discount_price: trainingForm.discount_price ? parseFloat(trainingForm.discount_price) : null,
          author_name: trainingForm.author_name,
          author_photo: trainingForm.author_photo,
          event_content: trainingForm.event_content,
          category: trainingForm.category || 'technique'
        })
      });
      
      if (response.ok) {
        toast({ title: 'Успех', description: 'Очное обучение добавлено и отправлено на модерацию' });
        setShowAddForm(false);
        setTrainingForm({
          school_name: '',
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
          event_content: '',
          category: 'technique'
        });
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
    setTrainingForm({
      school_name: training.school_name,
      title: training.title,
      description: training.description || '',
      event_date: training.event_date?.slice(0, 16) || '',
      location: training.location || '',
      max_participants: training.max_participants?.toString() || '',
      price: training.price?.toString() || '',
      image_url: training.image_url || '',
      external_url: training.external_url || '',
      original_price: training.original_price?.toString() || '',
      discount_price: training.discount_price?.toString() || '',
      author_name: training.author_name || '',
      author_photo: training.author_photo || '',
      event_content: training.event_content || '',
      category: training.category || 'technique'
    });
    setEditingTrainingId(training.id);
    setShowAddForm(true);
  };

  const handleUpdateTraining = async () => {
    if (!editingTrainingId) return;
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${TRAINING_API_URL}?type=offline_trainings&id=${editingTrainingId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          school_name: trainingForm.school_name,
          title: trainingForm.title,
          description: trainingForm.description,
          event_date: trainingForm.event_date,
          location: trainingForm.location,
          max_participants: trainingForm.max_participants ? parseInt(trainingForm.max_participants) : null,
          price: trainingForm.price ? parseFloat(trainingForm.price) : null,
          image_url: trainingForm.image_url,
          external_url: trainingForm.external_url,
          original_price: trainingForm.original_price ? parseFloat(trainingForm.original_price) : null,
          discount_price: trainingForm.discount_price ? parseFloat(trainingForm.discount_price) : null,
          author_name: trainingForm.author_name,
          author_photo: trainingForm.author_photo,
          event_content: trainingForm.event_content,
          category: trainingForm.category || 'technique'
        })
      });
      
      if (response.ok) {
        toast({ title: 'Успех', description: 'Обучение обновлено' });
        setShowAddForm(false);
        setEditingTrainingId(null);
        setTrainingForm({
          school_name: '',
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
          event_content: '',
          category: 'technique'
        });
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
      const response = await fetch(`${TRAINING_API_URL}?type=offline_trainings&id=${trainingId}`, {
        method: 'DELETE'
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
      const response = await fetch(`${TRAINING_API_URL}?action=offline_trainings&id=${trainingId}&submit_draft=true`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      
      if (response.ok) {
        toast({ title: 'Успех', description: 'Обучение отправлено на модерацию' });
        loadData();
      } else {
        const errorData = await response.json();
        toast({ title: 'Ошибка', description: errorData.error || 'Не удалось отправить на модерацию', variant: 'destructive' });
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