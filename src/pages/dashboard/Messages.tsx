import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: number;
  sender_id: number;
  receiver_id: number;
  message_text: string;
  is_read: boolean;
  created_at: string;
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
    
    const masseurId = searchParams.get('masseur');
    if (masseurId) {
      const chat = chats.find(c => c.other_user_id === parseInt(masseurId));
      if (chat) {
        setSelectedChat(chat);
        fetchMessages(chat.other_user_id);
      }
    }
  }, [navigate, searchParams]);

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
          message: messageText,
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
                        <div
                          key={chat.other_user_id}
                          onClick={() => handleSelectChat(chat)}
                          className={`p-3 rounded-lg cursor-pointer transition-colors ${
                            selectedChat?.other_user_id === chat.other_user_id
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
                      ))}
                    </div>
                  )}
                </ScrollArea>
              </CardContent>
            </Card>

            <Card className="lg:col-span-2">
              {selectedChat ? (
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
                        messages.map((message) => {
                          const isOwn = message.sender_id === currentUserId;
                          return (
                            <div
                              key={message.id}
                              className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
                            >
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
                        })
                      )}
                    </div>
                  </ScrollArea>

                  <div className="border-t p-4">
                    <div className="flex gap-2">
                      <Textarea
                        placeholder="Введите сообщение..."
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSendMessage();
                          }
                        }}
                        className="min-h-[60px] resize-none"
                      />
                      <Button
                        onClick={handleSendMessage}
                        disabled={!messageText.trim() || sending}
                        size="lg"
                        className="self-end"
                      >
                        <Icon name="Send" size={20} />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              ) : (
                <CardContent className="flex items-center justify-center h-[650px]">
                  <div className="text-center text-muted-foreground">
                    <Icon name="MessageSquare" size={64} className="mx-auto mb-4 opacity-30" />
                    <p className="text-lg">Выберите чат для начала общения</p>
                  </div>
                </CardContent>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
