import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';
import MessageItem from './MessageItem';

interface Message {
  id: number;
  sender_id: number;
  receiver_id: number;
  message_text: string;
  is_read: boolean;
  created_at: string;
  message_type?: string;
  booking_data?: {
    status: string;
    client_id: number;
  };
}

interface Chat {
  other_user_id: number;
  name: string;
  role: 'client' | 'masseur' | 'admin' | 'school' | 'salon';
  last_message: string;
  last_message_time: string;
  unread_count: number;
  avatar?: string;
  verified?: boolean;
  booking_id: number;
}

interface ChatWindowProps {
  selectedChat: Chat | null;
  messages: Message[];
  messageText: string;
  sending: boolean;
  currentUserId: number;
  userRole?: string;
  messagesLimit?: number | null;
  onMessageTextChange: (text: string) => void;
  onSendMessage: () => void;
  onBookingResponse: (messageId: number, action: 'accept' | 'decline') => void;
  onDeleteChat: () => void;
}

const getRoleBadge = (role: string) => {
  switch (role) {
    case 'client':
      return <Badge variant="secondary" className="text-xs">Клиент</Badge>;
    case 'masseur':
      return <Badge variant="default" className="text-xs">Специалист</Badge>;
    case 'admin':
      return <Badge variant="destructive" className="text-xs">Поддержка</Badge>;
    case 'school':
      return <Badge variant="outline" className="text-xs">Школа</Badge>;
    case 'salon':
      return <Badge variant="outline" className="text-xs">Салон</Badge>;
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
    case 'admin':
      return 'ShieldCheck';
    case 'school':
      return 'GraduationCap';
    case 'salon':
      return 'Store';
    default:
      return 'User';
  }
};

export default function ChatWindow({
  selectedChat,
  messages,
  messageText,
  sending,
  currentUserId,
  userRole,
  messagesLimit,
  onMessageTextChange,
  onSendMessage,
  onBookingResponse,
  onDeleteChat
}: ChatWindowProps) {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    onMessageTextChange(messageText + emojiData.emoji);
  };

  // Подсчёт отправленных сообщений админу сегодня (для школ)
  const isAdminChat = selectedChat?.role === 'admin' || selectedChat?.other_user_id === 2;
  const hasMessageLimit = messagesLimit !== null && messagesLimit !== undefined;
  
  const messagesTodayCount = isAdminChat && userRole === 'school' && hasMessageLimit
    ? messages.filter(m => {
        const messageDate = new Date(m.created_at);
        const today = new Date();
        return m.sender_id === currentUserId && 
               messageDate.toDateString() === today.toDateString();
      }).length
    : 0;
  
  const messagesLeft = hasMessageLimit ? Math.max(0, (messagesLimit || 5) - messagesTodayCount) : Infinity;
  const isLimitReached = hasMessageLimit && messagesTodayCount >= (messagesLimit || 5);
  if (!selectedChat) {
    return (
      <Card className="lg:col-span-2">
        <CardContent className="flex items-center justify-center h-[650px]">
          <div className="text-center text-muted-foreground">
            <Icon name="MessageSquare" size={64} className="mx-auto mb-4 opacity-30" />
            <p className="text-lg">Выберите чат для начала общения</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="lg:col-span-2">
      <CardContent className="p-0">
        <div className="border-b p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="w-12 h-12">
                {selectedChat.avatar ? (
                  <img src={selectedChat.avatar} alt={selectedChat.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                    <Icon name={getRoleIcon(selectedChat.role) as any} className="text-primary" size={24} />
                  </div>
                )}
              </Avatar>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">{selectedChat.name || 'Без имени'}</h3>
                  {selectedChat.verified && (
                    <Icon name="CheckCircle" className="text-primary" size={16} />
                  )}
                </div>
                {getRoleBadge(selectedChat.role)}
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onDeleteChat}
              className="text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              <Icon name="Trash2" size={18} />
            </Button>
          </div>
        </div>

        <ScrollArea className="h-[500px] p-4">
          <div className="space-y-4">
            {messages.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <Icon name="MessageCircle" size={48} className="mx-auto mb-4 opacity-50" />
                <p>Начните разговор</p>
              </div>
            ) : (
              messages.map((message) => (
                <MessageItem
                  key={message.id}
                  message={message}
                  isOwn={message.sender_id === currentUserId}
                  onBookingResponse={onBookingResponse}
                />
              ))
            )}
          </div>
        </ScrollArea>

        <div className="border-t p-4">
          {isAdminChat && userRole === 'school' && hasMessageLimit && (
            <div className={`mb-3 p-3 rounded-lg border ${
              isLimitReached 
                ? 'bg-red-50 border-red-200' 
                : messagesLeft <= 2 
                ? 'bg-yellow-50 border-yellow-200' 
                : 'bg-blue-50 border-blue-200'
            }`}>
              <div className="flex items-center gap-2">
                <Icon 
                  name={isLimitReached ? 'AlertCircle' : messagesLeft <= 2 ? 'AlertTriangle' : 'Info'} 
                  size={18} 
                  className={
                    isLimitReached 
                      ? 'text-red-600' 
                      : messagesLeft <= 2 
                      ? 'text-yellow-600' 
                      : 'text-blue-600'
                  }
                />
                <div className="flex-1">
                  <p className={`text-sm font-medium ${
                    isLimitReached 
                      ? 'text-red-900' 
                      : messagesLeft <= 2 
                      ? 'text-yellow-900' 
                      : 'text-blue-900'
                  }`}>
                    {isLimitReached 
                      ? `❌ Лимит сообщений исчерпан (${messagesLimit}/${messagesLimit})` 
                      : `💬 Доступно сообщений: ${messagesLeft}/${messagesLimit}`
                    }
                  </p>
                  <p className={`text-xs mt-1 ${
                    isLimitReached 
                      ? 'text-red-700' 
                      : messagesLeft <= 2 
                      ? 'text-yellow-700' 
                      : 'text-blue-700'
                  }`}>
                    {isLimitReached 
                      ? `По вашему тарифу доступно ${messagesLimit} сообщений в сутки администратору. Лимит обновится завтра. Для неограниченного общения обновите тариф до "Безлимит".`
                      : `По вашему тарифу доступно до ${messagesLimit} сообщений в сутки администратору. Лимит обновляется каждый день.`
                    }
                  </p>
                </div>
              </div>
            </div>
          )}
          
          <div className="flex gap-2 items-end">
            <Popover open={showEmojiPicker} onOpenChange={setShowEmojiPicker}>
              <PopoverTrigger asChild>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="self-end mb-1"
                  disabled={isLimitReached}
                >
                  <Icon name="Smile" size={20} />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0 border-0" align="start" side="top">
                <EmojiPicker 
                  onEmojiClick={handleEmojiClick}
                  width={350}
                  height={400}
                />
              </PopoverContent>
            </Popover>
            
            <Textarea
              placeholder={isLimitReached ? "Лимит сообщений исчерпан. Попробуйте завтра." : "Введите сообщение..."}
              value={messageText}
              onChange={(e) => onMessageTextChange(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  if (!isLimitReached) {
                    onSendMessage();
                    setShowEmojiPicker(false);
                  }
                }
              }}
              className="min-h-[60px] resize-none flex-1"
              disabled={isLimitReached}
            />
            <Button
              onClick={() => {
                onSendMessage();
                setShowEmojiPicker(false);
              }}
              disabled={!messageText.trim() || sending || isLimitReached}
              size="lg"
              className="self-end"
            >
              <Icon name="Send" size={20} />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}