import { Dispatch, SetStateAction } from 'react';
import { Mastermind, MastermindFormData, COURSE_API_URL, INITIAL_MASTERMIND_FORM } from './types';
import { getUserId } from '@/utils/auth';

interface UseMastermindHandlersProps {
  schoolId: number;
  mastermindForm: MastermindFormData;
  setMastermindForm: Dispatch<SetStateAction<MastermindFormData>>;
  editingMastermindId: number | null;
  setEditingMastermindId: Dispatch<SetStateAction<number | null>>;
  setShowAddForm: Dispatch<SetStateAction<boolean>>;
  loadData: () => Promise<void>;
  toast: (params: { title: string; description: string; variant?: 'destructive' }) => void;
}

export function useMastermindHandlers({
  schoolId,
  mastermindForm,
  setMastermindForm,
  editingMastermindId,
  setEditingMastermindId,
  setShowAddForm,
  loadData,
  toast
}: UseMastermindHandlersProps) {
  const handleAddMastermind = async () => {
    try {
      const userId = getUserId();
      const response = await fetch(`${COURSE_API_URL}?type=masterminds`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'X-User-Id': userId
        },
        body: JSON.stringify({
          school_id: schoolId,
          school_name: '',
          event_date: new Date().toISOString().split('T')[0],
          title: mastermindForm.title,
          course_type: mastermindForm.course_type,
          category: mastermindForm.category,
          description: mastermindForm.description,
          has_certificate: mastermindForm.has_certificate,
          duration_hours: mastermindForm.duration_hours ? parseInt(mastermindForm.duration_hours) : null,
          image_url: mastermindForm.image_url,
          external_url: mastermindForm.external_url,
          price: mastermindForm.price ? parseFloat(mastermindForm.price) : null,
          currency: 'RUB'
        })
      });
      
      if (response.ok) {
        toast({ title: 'Мастермайнд добавлен', description: 'Мастермайнд отправлен на модерацию' });
        setShowAddForm(false);
        setMastermindForm(INITIAL_MASTERMIND_FORM);
        loadData();
      }
    } catch (error) {
      toast({ title: 'Ошибка', description: 'Не удалось добавить мастермайнд', variant: 'destructive' });
    }
  };

  const handleEditMastermind = (mastermind: any) => {
    setMastermindForm({
      title: mastermind.title,
      course_type: mastermind.course_type || 'online',
      category: mastermind.category || 'technique',
      description: mastermind.description,
      has_certificate: (mastermind as any).has_certificate || false,
      duration_hours: mastermind.duration_hours?.toString() || '',
      image_url: mastermind.image_url || '',
      external_url: mastermind.external_url || '',
      price: mastermind.price?.toString() || ''
    });
    setEditingMastermindId(mastermind.id);
    setShowAddForm(true);
  };

  const handleUpdateMastermind = async () => {
    if (!editingMastermindId) return;
    
    try {
      const userId = getUserId();
      const response = await fetch(`${COURSE_API_URL}?type=masterminds&id=${editingMastermindId}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'X-User-Id': userId
        },
        body: JSON.stringify({
          school_name: '',
          event_date: new Date().toISOString().split('T')[0],
          title: mastermindForm.title,
          course_type: mastermindForm.course_type,
          category: mastermindForm.category,
          description: mastermindForm.description,
          has_certificate: mastermindForm.has_certificate,
          duration_hours: mastermindForm.duration_hours ? parseInt(mastermindForm.duration_hours) : null,
          image_url: mastermindForm.image_url,
          external_url: mastermindForm.external_url,
          price: mastermindForm.price ? parseFloat(mastermindForm.price) : null,
          currency: 'RUB'
        })
      });
      
      if (response.ok) {
        toast({ title: 'Мастермайнд обновлен', description: 'Мастермайнд отправлен на модерацию' });
        setShowAddForm(false);
        setEditingMastermindId(null);
        setMastermindForm(INITIAL_MASTERMIND_FORM);
        loadData();
      }
    } catch (error) {
      toast({ title: 'Ошибка', description: 'Не удалось обновить мастермайнд', variant: 'destructive' });
    }
  };

  const handleDeleteMastermind = async (mastermindId: number) => {
    if (!confirm('Вы уверены, что хотите удалить этот мастермайнд?')) return;
    
    try {
      const userId = getUserId();
      const response = await fetch(`${COURSE_API_URL}?type=masterminds&id=${mastermindId}`, {
        method: 'DELETE',
        headers: { 'X-User-Id': userId }
      });
      
      if (response.ok) {
        toast({ title: 'Мастермайнд удален', description: 'Мастермайнд успешно удален' });
        loadData();
      }
    } catch (error) {
      toast({ title: 'Ошибка', description: 'Не удалось удалить мастермайнд', variant: 'destructive' });
    }
  };

  const handleSubmitDraftMastermind = async (mastermindId: number) => {
    try {
      const userId = getUserId();
      const response = await fetch(`${COURSE_API_URL}?type=masterminds&id=${mastermindId}&action=submit_draft`, {
        method: 'POST',
        headers: { 'X-User-Id': userId }
      });
      
      const data = await response.json();
      
      if (response.ok) {
        if (data.status === 'pending') {
          toast({ title: 'Мастермайнд отправлен на модерацию', description: 'Ваш мастермайнд будет проверен модераторами' });
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
    handleAddMastermind,
    handleEditMastermind,
    handleUpdateMastermind,
    handleDeleteMastermind,
    handleSubmitDraftMastermind
  };
}