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
  first_name?: string;
  last_name?: string;
  phone?: string;
}

interface AdminUsersTabProps {
  users: User[];
  loading: boolean;
  onUpdateUserRole: (userId: number, isAdmin: boolean, isModerator: boolean) => void;
  onDeleteUser: (userId: number, userEmail: string) => void;
}

export default function AdminUsersTab({ users, loading, onUpdateUserRole, onDeleteUser }: AdminUsersTabProps) {
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
    // Формат: header.payload.signature.impersonated
    const payload = {
      user_id: user.id,
      email: user.email,
      role: user.role,
      exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60), // 24 часа
      is_impersonating: true
    };
    
    // Base64URL encoding (без паддинга = и с URL-safe символами)
    const base64url = (str: string) => {
      return btoa(str)
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '');
    };
    
    // JWT формат: header.payload.signature
    // Для impersonated токенов добавляем fake signature и маркер .impersonated
    const fakeSignature = 'fake_signature_for_impersonation';
    const fakeToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' + base64url(JSON.stringify(payload)) + '.' + fakeSignature + '.impersonated';
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
                <div className="space-y-2">
                  <CardTitle className="text-lg">
                    {user.first_name || user.last_name ? (
                      <span>{user.first_name} {user.last_name}</span>
                    ) : (
                      <span className="text-muted-foreground">Имя не указано</span>
                    )}
                  </CardTitle>
                  <div className="space-y-1 text-sm">
                    <div className="flex items-center gap-2">
                      <Icon name="Mail" size={14} className="text-muted-foreground" />
                      <span>{user.email}</span>
                    </div>
                    {user.phone && (
                      <div className="flex items-center gap-2">
                        <Icon name="Phone" size={14} className="text-muted-foreground" />
                        <span>{user.phone}</span>
                      </div>
                    )}
                  </div>
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
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => onDeleteUser(user.id, user.email)}
                >
                  <Icon name="Trash2" size={16} className="mr-2" />
                  Удалить пользователя
                </Button>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
}