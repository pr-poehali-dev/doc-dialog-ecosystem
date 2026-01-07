import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface Chat {
  other_user_id: number;
  name: string;
  role: 'client' | 'masseur' | 'school' | 'salon';
  last_message: string;
  last_message_time: string;
  unread_count: number;
  avatar?: string;
  verified?: boolean;
  booking_id: number;
}

interface ChatListItemProps {
  chat: Chat;
  isSelected: boolean;
  onSelect: (chat: Chat) => void;
  formatTime: (timestamp: string) => string;
}

const getRoleBadge = (role: string) => {
  switch (role) {
    case 'client':
      return <Badge variant="secondary" className="text-xs">Клиент</Badge>;
    case 'masseur':
      return <Badge variant="default" className="text-xs">Специалист</Badge>;
    case 'school':
      return <Badge variant="default" className="text-xs bg-purple-500">Школа</Badge>;
    case 'salon':
      return <Badge variant="default" className="text-xs bg-blue-500">Салон</Badge>;
    default:
      return null;
  }
};

const getRoleIcon = (role: string) => {
  switch (role) {
    case 'client':
      return 'User';
    case 'masseur':
      return 'Heart';
    case 'school':
      return 'GraduationCap';
    case 'salon':
      return 'Building2';
    default:
      return 'User';
  }
};

export default function ChatListItem({ chat, isSelected, onSelect, formatTime }: ChatListItemProps) {
  return (
    <div
      onClick={() => onSelect(chat)}
      className={`p-3 rounded-lg cursor-pointer transition-colors ${
        isSelected
          ? 'bg-primary/10 border-primary/50'
          : 'hover:bg-muted border-transparent'
      } border`}
    >
      <div className="flex items-start gap-3">
        <div className="relative">
          <Avatar className="w-12 h-12">
            {chat.avatar ? (
              <img src={chat.avatar} alt={chat.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                <Icon name={getRoleIcon(chat.role) as any} className="text-primary" size={20} />
              </div>
            )}
          </Avatar>
          {chat.verified && (
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
              <Icon name="CheckCircle" className="text-primary-foreground" size={12} />
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <p className="font-semibold text-sm truncate">{chat.name || 'Без имени'}</p>
              {getRoleBadge(chat.role)}
            </div>
            {chat.unread_count > 0 && (
              <Badge className="bg-primary text-primary-foreground rounded-full w-5 h-5 p-0 flex items-center justify-center text-xs">
                {chat.unread_count}
              </Badge>
            )}
          </div>
          <p className="text-xs text-muted-foreground truncate">
            {chat.last_message || 'Нет сообщений'}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {formatTime(chat.last_message_time)}
          </p>
        </div>
      </div>
    </div>
  );
}