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
  role: 'client' | 'masseur';
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
  onMessageTextChange,
  onSendMessage,
  onBookingResponse,
  onDeleteChat
}: ChatWindowProps) {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    onMessageTextChange(messageText + emojiData.emoji);
  };
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
          <div className="flex gap-2 items-end">
            <Popover open={showEmojiPicker} onOpenChange={setShowEmojiPicker}>
              <PopoverTrigger asChild>
                <Button variant="outline" size="icon" className="self-end mb-1">
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
              placeholder="Введите сообщение..."
              value={messageText}
              onChange={(e) => onMessageTextChange(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  onSendMessage();
                  setShowEmojiPicker(false);
                }
              }}
              className="min-h-[60px] resize-none flex-1"
            />
            <Button
              onClick={() => {
                onSendMessage();
                setShowEmojiPicker(false);
              }}
              disabled={!messageText.trim() || sending}
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