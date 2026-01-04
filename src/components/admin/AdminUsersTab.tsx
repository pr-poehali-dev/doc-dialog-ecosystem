import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

interface User {
  id: number;
  email: string;
  role: string;
  is_admin: boolean;
  is_moderator: boolean;
  created_at: string;
}

interface AdminUsersTabProps {
  users: User[];
  loading: boolean;
  onUpdateUserRole: (userId: number, isAdmin: boolean, isModerator: boolean) => void;
}

export default function AdminUsersTab({ users, loading, onUpdateUserRole }: AdminUsersTabProps) {
  const navigate = useNavigate();

  const handleLoginAsUser = (user: User) => {
    // Сохраняем данные админа
    const adminUser = localStorage.getItem('user');
    const adminToken = localStorage.getItem('token');
    
    if (adminUser) {
      localStorage.setItem('admin_backup_user', adminUser);
    }
    if (adminToken) {
      localStorage.setItem('admin_backup_token', adminToken);
    }
    
    // Подменяем на данные выбранного пользователя
    const impersonatedUser = {
      id: user.id,
      email: user.email,
      role: user.role,
      is_admin: false, // Важно: убираем права админа при входе
      is_impersonating: true, // Флаг что это вход от имени
      original_admin_email: JSON.parse(adminUser || '{}').email
    };
    
    localStorage.setItem('user', JSON.stringify(impersonatedUser));
    
    // Создаем временный токен для подмененного пользователя
    // Формат: header.payload.signature (упрощенный, без реальной подписи)
    const payload = {
      user_id: user.id,
      email: user.email,
      role: user.role,
      exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60), // 24 часа
      is_impersonating: true
    };
    const fakeToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' + btoa(JSON.stringify(payload)) + '.impersonated';
    localStorage.setItem('token', fakeToken);
    
    // Переход в кабинет пользователя
    switch (user.role) {
      case 'school':
        navigate('/school/dashboard');
        break;
      case 'salon':
        navigate('/salon/cabinet');
        break;
      case 'masseur':
        navigate('/dashboard');
        break;
      default:
        navigate('/dashboard');
    }
    
    // Перезагружаем страницу чтобы применились изменения
    window.location.href = window.location.origin + (user.role === 'school' ? '/school/dashboard' : user.role === 'salon' ? '/salon/cabinet' : '/dashboard');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Icon name="Loader2" className="animate-spin" size={32} />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {users.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <Icon name="Users" className="mx-auto mb-4 text-muted-foreground" size={48} />
            <p className="text-lg font-medium mb-2">Нет пользователей</p>
          </CardContent>
        </Card>
      ) : (
        users.map((user) => (
          <Card key={user.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle>{user.email}</CardTitle>
                  <CardDescription>
                    Роль: {user.role} • Зарегистрирован: {new Date(user.created_at).toLocaleDateString('ru-RU')}
                  </CardDescription>
                  <div className="flex gap-2 mt-2">
                    {user.is_admin && <Badge>Администратор</Badge>}
                    {user.is_moderator && <Badge variant="secondary">Модератор</Badge>}
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2 flex-wrap">
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => handleLoginAsUser(user)}
                >
                  <Icon name="LogIn" size={16} className="mr-2" />
                  Войти в кабинет
                </Button>
                <Button
                  size="sm"
                  variant={user.is_admin ? "default" : "outline"}
                  onClick={() => onUpdateUserRole(user.id, !user.is_admin, user.is_moderator)}
                >
                  {user.is_admin ? "Убрать администратора" : "Сделать администратором"}
                </Button>
                <Button
                  size="sm"
                  variant={user.is_moderator ? "default" : "outline"}
                  onClick={() => onUpdateUserRole(user.id, user.is_admin, !user.is_moderator)}
                >
                  {user.is_moderator ? "Убрать модератора" : "Сделать модератором"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
}