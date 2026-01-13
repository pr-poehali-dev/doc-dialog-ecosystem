import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

export function useAdminAuth() {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (!token) {
      navigate('/login');
      return;
    }
    
    if (userData) {
      const user = JSON.parse(userData);
      const isAdminOrModerator = user.role === 'admin' || user.role === 'moderator';
      
      if (!isAdminOrModerator) {
        toast({
          title: "Доступ запрещен",
          description: "У вас нет прав для доступа к админ-панели",
          variant: "destructive"
        });
        navigate('/dashboard');
        return;
      }
    }
  }, [navigate, toast]);
}
