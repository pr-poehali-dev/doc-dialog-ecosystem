import { useToast } from '@/hooks/use-toast';

export function useAdminActions(loadUsers: () => Promise<void>, loadModerationItems: () => Promise<void>) {
  const { toast } = useToast();

  const updateUserRole = async (userId: number, isAdmin: boolean, isModerator: boolean) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://functions.poehali.dev/d9ed333b-313d-40b6-8ca2-016db5854f7c?action=update_user', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ user_id: userId, is_admin: isAdmin, is_moderator: isModerator })
      });
      
      if (response.ok) {
        toast({
          title: "Успешно",
          description: "Роли пользователя обновлены"
        });
        loadUsers();
      } else {
        throw new Error('Failed to update');
      }
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось обновить роли",
        variant: "destructive"
      });
    }
  };

  const deleteUser = async (userId: number, userEmail: string) => {
    if (!confirm(`Вы уверены, что хотите удалить пользователя ${userEmail}?\n\nЭто действие необратимо и удалит все связанные данные: профиль, курсы, отзывы и т.д.`)) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://functions.poehali.dev/d9ed333b-313d-40b6-8ca2-016db5854f7c?action=delete_user', {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ user_id: userId })
      });
      
      if (response.ok) {
        toast({
          title: "Успешно",
          description: `Пользователь ${userEmail} удалён`
        });
        loadUsers();
      } else {
        throw new Error('Failed to delete');
      }
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось удалить пользователя",
        variant: "destructive"
      });
    }
  };

  const moderateItem = async (itemId: number, approve: boolean, comment: string = '') => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://functions.poehali.dev/d9ed333b-313d-40b6-8ca2-016db5854f7c?action=moderate', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ log_id: itemId, approve, comment })
      });
      
      if (response.ok) {
        toast({
          title: "Успешно",
          description: approve ? "Изменение одобрено" : "Изменение отклонено"
        });
        loadModerationItems();
      } else {
        throw new Error('Failed to moderate');
      }
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось обработать запрос",
        variant: "destructive"
      });
    }
  };

  return {
    updateUserRole,
    deleteUser,
    moderateItem
  };
}
