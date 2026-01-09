import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import { ScrollArea } from '@/components/ui/scroll-area';
import ChatListItem from '@/components/messages/ChatListItem';
import { formatRelativeTime } from '@/utils/datetime';
import type { Chat } from '@/hooks/useMessagesData';

interface MessagesSidebarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  chats: Chat[];
  selectedChat: Chat | null;
  onSelectChat: (chat: Chat) => void;
  loading: boolean;
}

export default function MessagesSidebar({
  searchQuery,
  onSearchChange,
  chats,
  selectedChat,
  onSelectChat,
  loading,
}: MessagesSidebarProps) {
  return (
    <div className="w-full lg:w-96 border-r border-border bg-background flex flex-col h-full">
      <div className="p-4 border-b border-border">
        <h2 className="text-xl font-bold mb-3">Сообщения</h2>
        <div className="relative">
          <Icon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
          <Input
            placeholder="Поиск чатов..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>
      
      <ScrollArea className="flex-1">
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : chats.length === 0 ? (
          <div className="p-6 text-center text-muted-foreground">
            <Icon name="MessageSquare" size={48} className="mx-auto mb-3 opacity-50" />
            <p>Нет чатов</p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {chats.map((chat) => (
              <ChatListItem
                key={chat.other_user_id}
                chat={chat}
                isSelected={selectedChat?.other_user_id === chat.other_user_id}
                onSelect={onSelectChat}
                formatTime={formatRelativeTime}
              />
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  );
}