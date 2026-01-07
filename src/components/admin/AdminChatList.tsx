import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import Icon from '@/components/ui/icon';
import { formatMoscowDateTime } from '@/utils/datetime';

interface Chat {
  other_user_id: number;
  name: string;
  role: string;
  last_message: string;
  last_message_time: string;
  unread_count: number;
  avatar?: string;
}

interface AdminChatListProps {
  chats: Chat[];
  selectedUserId: number | null;
  onChatSelect: (chat: Chat) => void;
}

export default function AdminChatList({ chats, selectedUserId, onChatSelect }: AdminChatListProps) {
  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'masseur': return 'User';
      case 'school': return 'GraduationCap';
      case 'salon': return 'Building2';
      default: return 'User';
    }
  };

  const getRoleName = (role: string) => {
    switch (role) {
      case 'masseur': return 'Массажист';
      case 'school': return 'Школа';
      case 'salon': return 'Салон';
      default: return 'Клиент';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon name="MessageSquare" size={20} />
          Активные чаты
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[500px]">
          {chats.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Icon name="MessageSquare" size={48} className="mx-auto mb-2 opacity-50" />
              <p>Нет активных чатов</p>
            </div>
          ) : (
            <div className="space-y-2">
              {chats.map((chat) => (
                <div
                  key={chat.other_user_id}
                  onClick={() => onChatSelect(chat)}
                  className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                    selectedUserId === chat.other_user_id
                      ? 'bg-primary/10 border-primary'
                      : 'hover:bg-muted'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0">
                      <Icon name={getRoleIcon(chat.role)} size={24} className="text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className="font-semibold truncate">{chat.name}</p>
                        {chat.unread_count > 0 && (
                          <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                            {chat.unread_count}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mb-1">{getRoleName(chat.role)}</p>
                      <p className="text-sm text-muted-foreground truncate">{chat.last_message}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {formatMoscowDateTime(chat.last_message_time)}
                      </p>
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