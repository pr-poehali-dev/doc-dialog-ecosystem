import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import Icon from "@/components/ui/icon";
import CourseModerationTab from "@/components/CourseModerationTab";
import MastermindModerationTab from "@/components/MastermindModerationTab";
import OfflineTrainingModerationTab from "@/components/OfflineTrainingModerationTab";
import ReviewsModerationTab from "@/components/ReviewsModerationTab";
import AdminDashboardTab from "@/components/admin/AdminDashboardTab";
import AdminUsersTab from "@/components/admin/AdminUsersTab";
import AdminModerationTab from "@/components/admin/AdminModerationTab";
import AdminSchoolsTab from "@/components/admin/AdminSchoolsTab";
import KnowledgeBaseManagement from "@/components/admin/KnowledgeBaseManagement";

interface Stats {
  total_users: number;
  total_masseurs: number;
  total_appointments: number;
  pending_reviews: number;
  pending_moderations: number;
  pending_courses: number;
  pending_masterminds: number;
  pending_offline_trainings: number;
}

interface User {
  id: number;
  email: string;
  role: string;
  is_admin: boolean;
  is_moderator: boolean;
  created_at: string;
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

export default function AdminPanel() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'users' | 'moderation' | 'courses' | 'masterminds' | 'offline-training' | 'reviews' | 'schools' | 'knowledge'>('dashboard');
  const [loading, setLoading] = useState(false);
  
  const [stats, setStats] = useState<Stats | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [moderationItems, setModerationItems] = useState<ModerationItem[]>([]);

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
    
    loadDashboardStats();
  }, [navigate, toast]);

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

  useEffect(() => {
    if (activeTab === 'users') {
      loadUsers();
    } else if (activeTab === 'moderation') {
      loadModerationItems();
    }
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50">
      <Navigation />
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">Панель администратора</h1>
              <p className="text-sm sm:text-base text-muted-foreground">Управление пользователями и модерация контента</p>
            </div>
            <Button onClick={() => navigate('/dashboard')} variant="outline" className="w-full sm:w-auto">
              <Icon name="ArrowLeft" size={18} className="mr-2" />
              В личный кабинет
            </Button>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-6 sm:mb-8 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
            <Button 
              variant={activeTab === 'dashboard' ? 'default' : 'outline'}
              onClick={() => setActiveTab('dashboard')}
              className="whitespace-nowrap flex-shrink-0 text-xs sm:text-sm"
            >
              <Icon name="LayoutDashboard" size={16} className="sm:mr-2" />
              <span className="hidden sm:inline">Статистика</span>
            </Button>
            <Button 
              variant={activeTab === 'users' ? 'default' : 'outline'}
              onClick={() => setActiveTab('users')}
              className="whitespace-nowrap flex-shrink-0 text-xs sm:text-sm"
            >
              <Icon name="Users" size={16} className="sm:mr-2" />
              <span className="hidden sm:inline">Пользователи</span>
            </Button>
            <Button 
              variant={activeTab === 'moderation' ? 'default' : 'outline'}
              onClick={() => setActiveTab('moderation')}
              className="whitespace-nowrap flex-shrink-0 text-xs sm:text-sm"
            >
              <Icon name="Shield" size={16} className="sm:mr-2" />
              <span className="hidden sm:inline">Модерация</span>
              {stats && stats.pending_moderations > 0 && (
                <Badge className="ml-1 sm:ml-2" variant="destructive">{stats.pending_moderations}</Badge>
              )}
            </Button>
            <Button 
              variant={activeTab === 'courses' ? 'default' : 'outline'}
              onClick={() => setActiveTab('courses')}
              className="whitespace-nowrap flex-shrink-0 text-xs sm:text-sm"
            >
              <Icon name="BookOpen" size={16} className="sm:mr-2" />
              <span className="hidden sm:inline">Курсы</span>
              {stats && stats.pending_courses > 0 && (
                <Badge className="ml-1 sm:ml-2" variant="destructive">{stats.pending_courses}</Badge>
              )}
            </Button>
            <Button 
              variant={activeTab === 'masterminds' ? 'default' : 'outline'}
              onClick={() => setActiveTab('masterminds')}
              className="whitespace-nowrap flex-shrink-0 text-xs sm:text-sm"
            >
              <Icon name="Users" size={16} className="sm:mr-2" />
              <span className="hidden sm:inline">Мастермайнды</span>
              {stats && stats.pending_masterminds > 0 && (
                <Badge className="ml-1 sm:ml-2" variant="destructive">{stats.pending_masterminds}</Badge>
              )}
            </Button>
            <Button 
              variant={activeTab === 'offline-training' ? 'default' : 'outline'}
              onClick={() => setActiveTab('offline-training')}
              className="whitespace-nowrap flex-shrink-0 text-xs sm:text-sm"
            >
              <Icon name="GraduationCap" size={16} className="sm:mr-2" />
              <span className="hidden sm:inline">Очное обучение</span>
              {stats && stats.pending_offline_trainings > 0 && (
                <Badge className="ml-1 sm:ml-2" variant="destructive">{stats.pending_offline_trainings}</Badge>
              )}
            </Button>
            <Button 
              variant={activeTab === 'reviews' ? 'default' : 'outline'}
              onClick={() => setActiveTab('reviews')}
              className="whitespace-nowrap flex-shrink-0 text-xs sm:text-sm"
            >
              <Icon name="MessageSquare" size={16} className="sm:mr-2" />
              <span className="hidden sm:inline">Отзывы</span>
              {stats && stats.pending_reviews > 0 && (
                <Badge className="ml-1 sm:ml-2" variant="destructive">{stats.pending_reviews}</Badge>
              )}
            </Button>
            <Button 
              variant={activeTab === 'schools' ? 'default' : 'outline'}
              onClick={() => setActiveTab('schools')}
              className="whitespace-nowrap flex-shrink-0 text-xs sm:text-sm"
            >
              <Icon name="Building2" size={16} className="sm:mr-2" />
              <span className="hidden sm:inline">Школы</span>
            </Button>
            <Button 
              variant={activeTab === 'knowledge' ? 'default' : 'outline'}
              onClick={() => setActiveTab('knowledge')}
              className="whitespace-nowrap flex-shrink-0 text-xs sm:text-sm"
            >
              <Icon name="BookOpen" size={16} className="sm:mr-2" />
              <span className="hidden sm:inline">База знаний</span>
            </Button>
          </div>

          {/* Dashboard Tab */}
          {activeTab === 'dashboard' && <AdminDashboardTab stats={stats} />}

          {/* Users Tab */}
          {activeTab === 'users' && (
            <AdminUsersTab 
              users={users} 
              loading={loading} 
              onUpdateUserRole={updateUserRole} 
            />
          )}

          {/* Moderation Tab */}
          {activeTab === 'moderation' && (
            <AdminModerationTab 
              moderationItems={moderationItems} 
              loading={loading} 
              onModerate={moderateItem} 
            />
          )}

          {/* Courses Moderation Tab */}
          {activeTab === 'courses' && <CourseModerationTab onModerationComplete={loadDashboardStats} />}

          {/* Masterminds Moderation Tab */}
          {activeTab === 'masterminds' && <MastermindModerationTab onModerationComplete={loadDashboardStats} />}

          {/* Offline Training Moderation Tab */}
          {activeTab === 'offline-training' && <OfflineTrainingModerationTab onModerationComplete={loadDashboardStats} />}

          {/* Reviews Moderation Tab */}
          {activeTab === 'reviews' && <ReviewsModerationTab />}

          {/* Schools Tab */}
          {activeTab === 'schools' && <AdminSchoolsTab />}

          {/* Knowledge Base Tab */}
          {activeTab === 'knowledge' && <KnowledgeBaseManagement />}
        </div>
      </div>
    </div>
  );
}