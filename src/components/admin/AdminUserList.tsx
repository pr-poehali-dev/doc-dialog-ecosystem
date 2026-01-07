import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import Icon from '@/components/ui/icon';

interface User {
  id: number;
  user_id: number;
  name: string;
  email: string;
  role: string;
  avatar_url?: string;
  phone?: string;
  city?: string;
}

interface AdminUserListProps {
  users: User[];
  searchQuery: string;
  selectedUserId: number | null;
  onSearchChange: (query: string) => void;
  onUserSelect: (user: User) => void;
}

export default function AdminUserList({ 
  users, 
  searchQuery, 
  selectedUserId, 
  onSearchChange, 
  onUserSelect 
}: AdminUserListProps) {
  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'masseur': return 'User';
      case 'school': return 'GraduationCap';
      case 'salon': return 'Building2';
      case 'client': return 'UserCircle';
      default: return 'User';
    }
  };

  const getRoleName = (role: string) => {
    switch (role) {
      case 'masseur': return 'Массажист';
      case 'school': return 'Школа';
      case 'salon': return 'Салон';
      case 'client': return 'Клиент';
      default: return 'Пользователь';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon name="Users" size={20} />
          Все пользователи ({users.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="relative">
            <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Поиск по имени, email, роли..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <ScrollArea className="h-[500px]">
          {users.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Icon name="Users" size={48} className="mx-auto mb-2 opacity-50" />
              <p>Пользователи не найдены</p>
            </div>
          ) : (
            <div className="space-y-2">
              {users.map((user) => (
                <div
                  key={user.user_id}
                  onClick={() => onUserSelect(user)}
                  className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                    selectedUserId === user.user_id
                      ? 'bg-primary/10 border-primary'
                      : 'hover:bg-muted'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0">
                      <Icon name={getRoleIcon(user.role)} size={24} className="text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold truncate">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{getRoleName(user.role)}</p>
                      <p className="text-sm text-muted-foreground truncate">{user.email}</p>
                      {user.phone && (
                        <p className="text-xs text-muted-foreground">{user.phone}</p>
                      )}
                      {user.city && (
                        <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                          <Icon name="MapPin" size={12} />
                          {user.city}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
