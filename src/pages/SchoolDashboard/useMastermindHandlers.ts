import { Dispatch, SetStateAction } from 'react';
import { Mastermind, MastermindFormData, COURSE_API_URL, INITIAL_MASTERMIND_FORM } from './types';

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
      const response = await fetch(`${COURSE_API_URL}?type=masterminds`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          school_id: schoolId,
          ...mastermindForm,
          price: mastermindForm.price ? parseFloat(mastermindForm.price) : null,
          max_participants: mastermindForm.max_participants ? parseInt(mastermindForm.max_participants) : null,
          original_price: mastermindForm.original_price ? parseFloat(mastermindForm.original_price) : null,
          discount_price: mastermindForm.discount_price ? parseFloat(mastermindForm.discount_price) : null
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
      school_name: mastermind.school_name || '',
      title: mastermind.title,
      description: mastermind.description,
      event_date: mastermind.event_date?.slice(0, 16) || '',
      location: mastermind.location || '',
      max_participants: mastermind.max_participants?.toString() || '',
      price: mastermind.price?.toString() || '',
      image_url: mastermind.image_url || '',
      external_url: mastermind.external_url,
      original_price: mastermind.original_price?.toString() || '',
      discount_price: mastermind.discount_price?.toString() || '',
      category: mastermind.category || 'technique'
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
          discount_price: mastermindForm.discount_price ? parseFloat(mastermindForm.discount_price) : null
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

  const handleSubmitDraftMastermind = async (mastermindId: number) => {
    try {
      const response = await fetch(`${COURSE_API_URL}?type=masterminds&id=${mastermindId}&action=submit_draft`, {
        method: 'POST'
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