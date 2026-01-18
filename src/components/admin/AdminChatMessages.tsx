import { useRef, useEffect, lazy, Suspense } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import Icon from '@/components/ui/icon';
import { EmojiClickData } from 'emoji-picker-react';

const EmojiPicker = lazy(() => import('emoji-picker-react').then(m => ({ default: m.default })));
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { formatMoscowDateTime } from '@/utils/datetime';

interface Message {
  id: number;
  sender_id: number;
  receiver_id: number;
  message_text: string;
  is_read: boolean;
  created_at: string;
}

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

interface AdminChatMessagesProps {
  selectedUser: User | null;
  messages: Message[];
  currentUserId: number;
  messageText: string;
  sending: boolean;
  showEmojiPicker: boolean;
  showTemplates: boolean;
  quickTemplates: string[];
  onMessageTextChange: (text: string) => void;
  onSendMessage: () => void;
  onEmojiClick: (emojiData: EmojiClickData) => void;
  onToggleEmojiPicker: (show: boolean) => void;
  onToggleTemplates: (show: boolean) => void;
  onTemplateSelect: (template: string) => void;
}

export default function AdminChatMessages({
  selectedUser,
  messages,
  currentUserId,
  messageText,
  sending,
  showEmojiPicker,
  showTemplates,
  quickTemplates,
  onMessageTextChange,
  onSendMessage,
  onEmojiClick,
  onToggleEmojiPicker,
  onToggleTemplates,
  onTemplateSelect
}: AdminChatMessagesProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (selectedUser) {
      inputRef.current?.focus();
    }
  }, [selectedUser]);

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

  if (!selectedUser) {
    return (
      <Card className="h-[600px] flex items-center justify-center">
        <div className="text-center text-muted-foreground">
          <Icon name="MessageSquare" size={64} className="mx-auto mb-4 opacity-50" />
          <p className="text-lg">Выберите пользователя или чат</p>
          <p className="text-sm mt-2">Перейдите на вкладку "Активные чаты" или "Все пользователи"</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="h-[600px] flex flex-col">
      <CardHeader className="border-b">
        <div className="flex items-center gap-3">
          <Icon name={getRoleIcon(selectedUser.role)} size={24} className="text-primary" />
          <div>
            <CardTitle>{selectedUser.name}</CardTitle>
            <p className="text-sm text-muted-foreground">{getRoleName(selectedUser.role)}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col p-0">
        <ScrollArea className="flex-1 p-4">
          {messages.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Icon name="MessageCircle" size={48} className="mx-auto mb-2 opacity-50" />
              <p>Нет сообщений</p>
              <p className="text-sm mt-2">Начните диалог первым</p>
            </div>
          ) : (
            <div className="space-y-3">
              {messages.map((msg) => {
                const isMyMessage = msg.sender_id === currentUserId;
                return (
                  <div
                    key={msg.id}
                    className={`flex ${isMyMessage ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[70%] p-3 rounded-lg ${
                        isMyMessage
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted'
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap break-words">{msg.message_text}</p>
                      <p className={`text-xs mt-1 ${
                        isMyMessage ? 'text-primary-foreground/70' : 'text-muted-foreground'
                      }`}>
                        {formatMoscowDateTime(msg.created_at)}
                      </p>
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>
          )}
        </ScrollArea>
        <div className="border-t p-4 space-y-2">
          <div className="flex gap-2">
            <Popover open={showTemplates} onOpenChange={onToggleTemplates}>
              <PopoverTrigger asChild>
                <Button variant="outline" size="icon" title="Быстрые ответы">
                  <Icon name="Zap" size={20} />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80" align="start">
                <div className="space-y-2">
                  <p className="text-sm font-semibold mb-2">Быстрые ответы</p>
                  {quickTemplates.map((template, index) => (
                    <button
                      key={index}
                      onClick={() => onTemplateSelect(template)}
                      className="w-full text-left p-2 text-sm rounded hover:bg-muted transition-colors"
                    >
                      {template}
                    </button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
            
            <Popover open={showEmojiPicker} onOpenChange={onToggleEmojiPicker}>
              <PopoverTrigger asChild>
                <Button variant="outline" size="icon" title="Добавить эмодзи">
                  <Icon name="Smile" size={20} />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0 border-0" align="start">
                <Suspense fallback={<div className="w-[350px] h-[400px] flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>}>
                  <EmojiPicker 
                    onEmojiClick={onEmojiClick}
                    width={350}
                    height={400}
                  />
                </Suspense>
              </PopoverContent>
            </Popover>

            <Input
              ref={inputRef}
              placeholder="Напишите сообщение..."
              value={messageText}
              onChange={(e) => onMessageTextChange(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  onSendMessage();
                }
              }}
              className="flex-1"
            />
            <Button 
              onClick={onSendMessage} 
              disabled={!messageText.trim() || sending}
            >
              <Icon name="Send" size={18} className="mr-2" />
              {sending ? 'Отправка...' : 'Отправить'}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}