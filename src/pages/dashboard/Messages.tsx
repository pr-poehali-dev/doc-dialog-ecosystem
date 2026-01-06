import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import ChatListItem from '@/components/messages/ChatListItem';
import ChatWindow from '@/components/messages/ChatWindow';

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

const API_URL = 'https://functions.poehali.dev/04d0b538-1cf5-4941-9c06-8d1bef5854ec';

export default function Messages() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [messageText, setMessageText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [chats, setChats] = useState<Chat[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<number>(0);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');
    
    if (!token || !userStr) {
      navigate('/login');
      return;
    }
    
    const user = JSON.parse(userStr);
    setCurrentUserId(user.id);
    
    fetchChats();
  }, [navigate]);

  useEffect(() => {
    const masseurId = searchParams.get('masseur');
    if (masseurId) {
      const parsedMasseurId = parseInt(masseurId);
      const existingChat = chats.find(c => c.other_user_id === parsedMasseurId);
      
      if (existingChat) {
        setSelectedChat(existingChat);
        fetchMessages(existingChat.other_user_id);
      } else if (chats.length >= 0) {
        loadMasseurAndCreateChat(parsedMasseurId);
      }
    }
  }, [chats, searchParams]);

  const loadMasseurAndCreateChat = async (masseurId: number) => {
    try {
      const response = await fetch('https://functions.poehali.dev/49394b85-90a2-40ca-a843-19e551c6c436');
      if (response.ok) {
        const masseurs = await response.json();
        const masseur = masseurs.find((m: any) => m.id === masseurId);
        
        if (masseur) {
          const virtualChat: Chat = {
            other_user_id: masseur.user_id,
            name: masseur.full_name,
            role: 'masseur',
            last_message: '',
            last_message_time: new Date().toISOString(),
            unread_count: 0,
            avatar: masseur.avatar_url,
            verified: true,
            booking_id: 0
          };
          
          setChats(prevChats => [virtualChat, ...prevChats]);
          setSelectedChat(virtualChat);
          fetchMessages(masseur.id);
        }
      }
    } catch (error) {
      console.error('Error loading masseur:', error);
    }
  };

  const fetchChats = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      const response = await fetch(`${API_URL}?action=get-chats`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setChats(data.chats || []);
      }
    } catch (error) {
      console.error('Error fetching chats:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = async (otherUserId: number) => {
    try {
      const token = localStorage.getItem('token');
      
      const response = await fetch(`${API_URL}?action=get-messages&chat_id=${otherUserId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setMessages(data.messages || []);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const handleSelectChat = (chat: Chat) => {
    setSelectedChat(chat);
    fetchMessages(chat.other_user_id);
  };

  const handleSendMessage = async () => {
    if (!messageText.trim() || !selectedChat || sending) return;

    try {
      setSending(true);
      const token = localStorage.getItem('token');

      const response = await fetch(`${API_URL}?action=send-message`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          receiver_id: selectedChat.other_user_id,
          message_text: messageText,
        }),
      });

      if (response.ok) {
        setMessageText('');
        await fetchMessages(selectedChat.other_user_id);
        await fetchChats();
      } else {
        toast({
          title: 'Ошибка',
          description: 'Не удалось отправить сообщение',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: 'Ошибка',
        description: 'Не удалось отправить сообщение',
        variant: 'destructive',
      });
    } finally {
      setSending(false);
    }
  };

  const handleBookingResponse = async (messageId: number, action: 'accept' | 'decline') => {
    try {
      const token = localStorage.getItem('token');
      
      const response = await fetch(`${API_URL}?action=respond-booking`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message_id: messageId,
          action: action,
        }),
      });

      if (response.ok) {
        toast({
          title: action === 'accept' ? 'Заявка принята' : 'Заявка отклонена',
          description: action === 'accept' 
            ? 'Клиент получил уведомление. Обсудите детали записи в чате.'
            : 'Клиент получил уведомление об отказе.',
        });
        
        if (selectedChat) {
          await fetchMessages(selectedChat.other_user_id);
          await fetchChats();
        }
      } else {
        toast({
          title: 'Ошибка',
          description: 'Не удалось ответить на заявку',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Error responding to booking:', error);
      toast({
        title: 'Ошибка',
        description: 'Не удалось ответить на заявку',
        variant: 'destructive',
      });
    }
  };

  const handleDeleteChat = async () => {
    if (!selectedChat) return;

    if (!confirm(`Удалить переписку с ${selectedChat.name}? Это действие нельзя отменить.`)) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      
      const response = await fetch(`${API_URL}?action=delete-chat`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          other_user_id: selectedChat.other_user_id,
        }),
      });

      if (response.ok) {
        toast({
          title: 'Переписка удалена',
          description: 'Все сообщения с этим пользователем были удалены',
        });
        
        setSelectedChat(null);
        setMessages([]);
        await fetchChats();
      } else {
        toast({
          title: 'Ошибка',
          description: 'Не удалось удалить переписку',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Error deleting chat:', error);
      toast({
        title: 'Ошибка',
        description: 'Не удалось удалить переписку',
        variant: 'destructive',
      });
    }
  };

  const filteredChats = chats.filter(chat =>
    chat.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatTime = (timestamp: string) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) {
      return date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
    } else if (days === 1) {
      return 'Вчера';
    } else if (days < 7) {
      return `${days} дня назад`;
    } else {
      return date.toLocaleDateString('ru-RU');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white to-blue-50">
        <Navigation />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">Загрузка...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <Button variant="ghost" onClick={() => navigate('/dashboard')}>
              <Icon name="ArrowLeft" size={20} />
            </Button>
            <div className="flex-1">
              <h1 className="text-3xl font-bold">Сообщения</h1>
              <p className="text-muted-foreground">Общение с клиентами и специалистами</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-1">
              <CardContent className="p-4">
                <div className="mb-4">
                  <div className="relative">
                    <Icon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                    <Input
                      placeholder="Поиск..."
                      className="pl-10"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>

                <ScrollArea className="h-[600px]">
                  {filteredChats.length === 0 ? (
                    <div className="text-center py-12 text-gray-500">
                      <Icon name="MessageSquare" size={48} className="mx-auto mb-4 opacity-50" />
                      <p>Нет сообщений</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {filteredChats.map((chat) => (
                        <ChatListItem
                          key={chat.other_user_id}
                          chat={chat}
                          isSelected={selectedChat?.other_user_id === chat.other_user_id}
                          onSelect={handleSelectChat}
                          formatTime={formatTime}
                        />
                      ))}
                    </div>
                  )}
                </ScrollArea>
              </CardContent>
            </Card>

            <ChatWindow
              selectedChat={selectedChat}
              messages={messages}
              messageText={messageText}
              sending={sending}
              currentUserId={currentUserId}
              onMessageTextChange={setMessageText}
              onSendMessage={handleSendMessage}
              onBookingResponse={handleBookingResponse}
              onDeleteChat={handleDeleteChat}
            />
          </div>
        </div>
      </div>
    </div>
  );
}