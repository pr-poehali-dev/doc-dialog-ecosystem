import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface Stats {
  total_users: number;
  total_masseurs: number;
  total_appointments: number;
  pending_reviews: number;
  pending_moderations: number;
  pending_courses: number;
  pending_masterminds: number;
  pending_offline_trainings: number;
  pending_verifications: number;
}

interface User {
  id: number;
  email: string;
  role: string;
  is_admin: boolean;
  is_moderator: boolean;
  created_at: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
}

interface ModerationItem {
  id: number;
  user_id: number;
  user_email: string;
  action_type: string;
  entity_type: string;
  entity_id: number;
  new_data: any;
  status: string;
  created_at: string;
}

export function useAdminData(activeTab: string) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState<Stats | null>(null);
  const [pendingVerifications, setPendingVerifications] = useState(0);
  const [users, setUsers] = useState<User[]>([]);
  const [moderationItems, setModerationItems] = useState<ModerationItem[]>([]);

  const loadVerificationCount = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://functions.poehali.dev/f94ccac9-1077-4744-892a-ab95e9e41ecb', {
        headers: { 'X-Authorization': `Bearer ${token}` }
      });
      
      if (response.ok) {
        const data = await response.json();
        setPendingVerifications(data.length);
      }
    } catch (error) {
      console.error('Failed to load verification count', error);
    }
  };

  const loadDashboardStats = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://functions.poehali.dev/d9ed333b-313d-40b6-8ca2-016db5854f7c', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      } else {
        const error = await response.json();
        toast({
          title: "Ошибка доступа",
          description: error.error || "У вас нет прав администратора",
          variant: "destructive"
        });
        navigate('/dashboard');
      }
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось загрузить данные",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const loadUsers = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://functions.poehali.dev/d9ed333b-313d-40b6-8ca2-016db5854f7c?action=users', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      }
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось загрузить пользователей",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const loadModerationItems = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://functions.poehali.dev/d9ed333b-313d-40b6-8ca2-016db5854f7c?action=moderation', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setModerationItems(data);
      }
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось загрузить задачи модерации",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardStats();
    loadVerificationCount();
  }, []);

  useEffect(() => {
    if (activeTab === 'users') {
      loadUsers();
    } else if (activeTab === 'moderation') {
      loadModerationItems();
    }
  }, [activeTab]);

  return {
    loading,
    stats,
    pendingVerifications,
    users,
    moderationItems,
    loadDashboardStats,
    loadVerificationCount,
    loadUsers,
    loadModerationItems
  };
}