import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

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

interface MessageItemProps {
  message: Message;
  isOwn: boolean;
  onBookingResponse?: (messageId: number, action: 'accept' | 'decline') => void;
}

export default function MessageItem({ message, isOwn, onBookingResponse }: MessageItemProps) {
  const isBookingRequest = message.message_type === 'booking_request';
  const isBookingResponse = message.message_type === 'booking_response';

  if (isBookingRequest) {
    const bookingStatus = message.booking_data?.status || 'pending';
    return (
      <div className="flex justify-center my-4">
        <Card className="w-full max-w-md border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-blue-50">
          <CardContent className="pt-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Icon name="Calendar" size={24} className="text-primary" />
              </div>
              <div>
                <h4 className="font-semibold">Заявка на запись</h4>
                <p className="text-sm text-muted-foreground">{message.message_text}</p>
              </div>
            </div>

            {bookingStatus === 'pending' && !isOwn && onBookingResponse && (
              <div className="flex gap-2">
                <Button 
                  onClick={() => onBookingResponse(message.id, 'accept')}
                  className="flex-1"
                >
                  <Icon name="Check" size={18} className="mr-2" />
                  Принять
                </Button>
                <Button 
                  onClick={() => onBookingResponse(message.id, 'decline')}
                  variant="outline"
                  className="flex-1"
                >
                  <Icon name="X" size={18} className="mr-2" />
                  Отклонить
                </Button>
              </div>
            )}

            {bookingStatus === 'accepted' && (
              <div className="flex items-center gap-2 text-green-600 text-sm">
                <Icon name="CheckCircle" size={16} />
                <span>Заявка принята</span>
              </div>
            )}

            {bookingStatus === 'declined' && (
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <Icon name="XCircle" size={16} />
                <span>Заявка отклонена</span>
              </div>
            )}

            {bookingStatus === 'pending' && isOwn && (
              <div className="flex items-center gap-2 text-amber-600 text-sm">
                <Icon name="Clock" size={16} />
                <span>Ожидает ответа специалиста</span>
              </div>
            )}

            <p className="text-xs text-muted-foreground text-center">
              {new Date(message.created_at).toLocaleString('ru-RU', { 
                day: '2-digit', 
                month: '2-digit', 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isBookingResponse) {
    return (
      <div className="flex justify-center my-3">
        <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-2 text-sm text-center max-w-md">
          <Icon name="Info" size={16} className="inline mr-2 text-blue-600" />
          {message.message_text}
        </div>
      </div>
    );
  }

  return (
    <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[70%] rounded-2xl px-4 py-2 ${
          isOwn
            ? 'bg-primary text-primary-foreground'
            : 'bg-muted'
        }`}
      >
        <p className="text-sm break-words">{message.message_text}</p>
        <p className={`text-xs mt-1 ${isOwn ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
          {new Date(message.created_at).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
    </div>
  );
}
