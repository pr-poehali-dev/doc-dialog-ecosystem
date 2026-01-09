import Icon from '@/components/ui/icon';
import ChatWindow from '@/components/messages/ChatWindow';
import type { Chat, Message } from '@/hooks/useMessagesData';

interface MessagesContentProps {
  selectedChat: Chat | null;
  messages: Message[];
  currentUserId: number;
  messageText: string;
  onMessageTextChange: (text: string) => void;
  onSendMessage: () => void;
  onBookingResponse: (messageId: number, action: 'accept' | 'decline') => void;
  sending: boolean;
  userRole: string;
  messagesLimit: number | null;
}

export default function MessagesContent({
  selectedChat,
  messages,
  currentUserId,
  messageText,
  onMessageTextChange,
  onSendMessage,
  onBookingResponse,
  sending,
  userRole,
  messagesLimit,
}: MessagesContentProps) {
  if (!selectedChat) {
    return (
      <div className="flex-1 flex items-center justify-center bg-muted/20">
        <div className="text-center">
          <Icon name="MessageCircle" size={64} className="mx-auto mb-4 text-muted-foreground opacity-50" />
          <h3 className="text-xl font-semibold text-muted-foreground mb-2">
            Выберите чат
          </h3>
          <p className="text-sm text-muted-foreground">
            Начните общение, выбрав чат из списка слева
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col">
      <ChatWindow
        chat={selectedChat}
        messages={messages}
        currentUserId={currentUserId}
        messageText={messageText}
        onMessageTextChange={onMessageTextChange}
        onSendMessage={onSendMessage}
        onBookingResponse={onBookingResponse}
        sending={sending}
        userRole={userRole}
        messagesLimit={messagesLimit}
      />
    </div>
  );
}
