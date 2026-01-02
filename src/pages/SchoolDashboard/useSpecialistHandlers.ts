import { Dispatch, SetStateAction } from 'react';
import { SpecialistRequest, SpecialistFormData, COURSE_API_URL, INITIAL_SPECIALIST_FORM } from './types';

interface UseSpecialistHandlersProps {
  schoolId: number;
  specialistForm: SpecialistFormData;
  setSpecialistForm: Dispatch<SetStateAction<SpecialistFormData>>;
  editingSpecialistId: number | null;
  setEditingSpecialistId: Dispatch<SetStateAction<number | null>>;
  setShowAddForm: Dispatch<SetStateAction<boolean>>;
  loadData: () => Promise<void>;
  toast: (params: { title: string; description: string; variant?: 'destructive' }) => void;
}

export function useSpecialistHandlers({
  schoolId,
  specialistForm,
  setSpecialistForm,
  editingSpecialistId,
  setEditingSpecialistId,
  setShowAddForm,
  loadData,
  toast
}: UseSpecialistHandlersProps) {
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
        setSpecialistForm(INITIAL_SPECIALIST_FORM);
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
        setSpecialistForm(INITIAL_SPECIALIST_FORM);
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

  return {
    handleAddSpecialist,
    handleEditSpecialist,
    handleUpdateSpecialist,
    handleDeleteSpecialist
  };
}
