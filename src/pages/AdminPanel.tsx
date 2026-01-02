import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import Icon from "@/components/ui/icon";
import CourseModerationTab from "@/components/CourseModerationTab";
import MastermindModerationTab from "@/components/MastermindModerationTab";

interface Stats {
  total_users: number;
  total_masseurs: number;
  total_appointments: number;
  pending_reviews: number;
  pending_moderations: number;
  pending_courses: number;
  pending_masterminds: number;
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
  const [activeTab, setActiveTab] = useState<'dashboard' | 'users' | 'moderation' | 'courses' | 'masterminds'>('dashboard');
  const [loading, setLoading] = useState(false);
  
  const [stats, setStats] = useState<Stats | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [moderationItems, setModerationItems] = useState<ModerationItem[]>([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    
    loadDashboardStats();
  }, [navigate]);

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
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold mb-2">Панель администратора</h1>
              <p className="text-muted-foreground">Управление пользователями и модерация контента</p>
            </div>
            <Button onClick={() => navigate('/dashboard')} variant="outline">
              <Icon name="ArrowLeft" size={18} className="mr-2" />
              В личный кабинет
            </Button>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-8">
            <Button 
              variant={activeTab === 'dashboard' ? 'default' : 'outline'}
              onClick={() => setActiveTab('dashboard')}
            >
              <Icon name="LayoutDashboard" size={18} className="mr-2" />
              Статистика
            </Button>
            <Button 
              variant={activeTab === 'users' ? 'default' : 'outline'}
              onClick={() => setActiveTab('users')}
            >
              <Icon name="Users" size={18} className="mr-2" />
              Пользователи
            </Button>
            <Button 
              variant={activeTab === 'moderation' ? 'default' : 'outline'}
              onClick={() => setActiveTab('moderation')}
            >
              <Icon name="Shield" size={18} className="mr-2" />
              Модерация
              {stats && stats.pending_moderations > 0 && (
                <Badge className="ml-2" variant="destructive">{stats.pending_moderations}</Badge>
              )}
            </Button>
            <Button 
              variant={activeTab === 'courses' ? 'default' : 'outline'}
              onClick={() => setActiveTab('courses')}
            >
              <Icon name="BookOpen" size={18} className="mr-2" />
              Курсы
              {stats && stats.pending_courses > 0 && (
                <Badge className="ml-2" variant="destructive">{stats.pending_courses}</Badge>
              )}
            </Button>
            <Button 
              variant={activeTab === 'masterminds' ? 'default' : 'outline'}
              onClick={() => setActiveTab('masterminds')}
            >
              <Icon name="Users" size={18} className="mr-2" />
              Мастермайнды
              {stats && stats.pending_masterminds > 0 && (
                <Badge className="ml-2" variant="destructive">{stats.pending_masterminds}</Badge>
              )}
            </Button>
          </div>

          {/* Dashboard Tab */}
          {activeTab === 'dashboard' && stats && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Users" className="text-primary" />
                    Всего пользователей
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold">{stats.total_users}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="UserCheck" className="text-primary" />
                    Массажистов
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold">{stats.total_masseurs}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Calendar" className="text-primary" />
                    Записей
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold">{stats.total_appointments}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="MessageSquare" className="text-orange-500" />
                    Отзывов на модерации
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold text-orange-500">{stats.pending_reviews}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="AlertCircle" className="text-red-500" />
                    Ожидают модерации
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold text-red-500">{stats.pending_moderations}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="BookOpen" className="text-blue-500" />
                    Курсов на модерации
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold text-blue-500">{stats.pending_courses}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Users" className="text-purple-500" />
                    Мастермайндов на модерации
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold text-purple-500">{stats.pending_masterminds}</div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Users Tab */}
          {activeTab === 'users' && (
            <div className="space-y-4">
              {loading ? (
                <Card>
                  <CardContent className="p-8 text-center">
                    <Icon name="Loader2" className="animate-spin mx-auto mb-4" size={32} />
                    <p>Загрузка пользователей...</p>
                  </CardContent>
                </Card>
              ) : (
                users.map(user => (
                  <Card key={user.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle>{user.email}</CardTitle>
                          <CardDescription>
                            ID: {user.id} • Роль: {user.role} • Создан: {new Date(user.created_at).toLocaleDateString()}
                          </CardDescription>
                        </div>
                        <div className="flex gap-2">
                          {user.is_admin && <Badge variant="destructive">Администратор</Badge>}
                          {user.is_moderator && <Badge variant="secondary">Модератор</Badge>}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant={user.is_admin ? "default" : "outline"}
                          onClick={() => updateUserRole(user.id, !user.is_admin, user.is_moderator)}
                        >
                          {user.is_admin ? "Убрать админа" : "Назначить админом"}
                        </Button>
                        <Button
                          size="sm"
                          variant={user.is_moderator ? "secondary" : "outline"}
                          onClick={() => updateUserRole(user.id, user.is_admin, !user.is_moderator)}
                        >
                          {user.is_moderator ? "Убрать модератора" : "Назначить модератором"}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          )}

          {/* Moderation Tab */}
          {activeTab === 'moderation' && (
            <div className="space-y-4">
              {loading ? (
                <Card>
                  <CardContent className="p-8 text-center">
                    <Icon name="Loader2" className="animate-spin mx-auto mb-4" size={32} />
                    <p>Загрузка задач модерации...</p>
                  </CardContent>
                </Card>
              ) : moderationItems.length === 0 ? (
                <Card>
                  <CardContent className="p-8 text-center">
                    <Icon name="CheckCircle" className="mx-auto mb-4 text-green-500" size={48} />
                    <p className="text-lg font-medium">Нет задач на модерацию</p>
                    <p className="text-muted-foreground">Все изменения обработаны</p>
                  </CardContent>
                </Card>
              ) : (
                moderationItems.map(item => (
                  <Card key={item.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle>
                            {item.action_type} - {item.entity_type}
                          </CardTitle>
                          <CardDescription>
                            Пользователь: {item.user_email} • {new Date(item.created_at).toLocaleString()}
                          </CardDescription>
                        </div>
                        <Badge>{item.status}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-4 p-4 bg-muted rounded-lg">
                        <pre className="text-sm overflow-auto">{JSON.stringify(item.new_data, null, 2)}</pre>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => moderateItem(item.id, true)}
                        >
                          <Icon name="Check" size={16} className="mr-2" />
                          Одобрить
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => moderateItem(item.id, false)}
                        >
                          <Icon name="X" size={16} className="mr-2" />
                          Отклонить
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          )}

          {/* Courses Moderation Tab */}
          {activeTab === 'courses' && <CourseModerationTab />}

          {/* Masterminds Moderation Tab */}
          {activeTab === 'masterminds' && <MastermindModerationTab />}
        </div>
      </div>
    </div>
  );
}