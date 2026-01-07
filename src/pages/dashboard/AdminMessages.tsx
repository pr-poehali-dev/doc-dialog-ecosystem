import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

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

interface Chat {
  other_user_id: number;
  name: string;
  role: string;
  last_message: string;
  last_message_time: string;
  unread_count: number;
  avatar?: string;
}

const API_URL = 'https://functions.poehali.dev/04d0b538-1cf5-4941-9c06-8d1bef5854ec';

export default function AdminMessages() {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [messageText, setMessageText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [chats, setChats] = useState<Chat[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<'chats' | 'users'>('chats');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const quickTemplates = [
    'Здравствуйте! Чем могу помочь?',
    'Спасибо за обращение! Рассмотрим ваш вопрос.',
    'Ваш запрос принят в обработку.',
    'Если возникнут вопросы, пишите!',
    'Отличного дня! 😊'
  ];

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');
    const userRole = localStorage.getItem('userRole');
    
    if (!token || !userStr || userRole !== 'admin') {
      navigate('/login');
      return;
    }
    
    const user = JSON.parse(userStr);
    setCurrentUserId(user.id);
    
    loadChats();
    loadAllUsers();
  }, [navigate]);

  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = allUsers.filter(u => 
        u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.role.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers(allUsers);
    }
  }, [searchQuery, allUsers]);

  const loadChats = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}?action=get-chats`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        const data = await response.json();
        setChats(data.chats || []);
      }
    } catch (error) {
      console.error('Error loading chats:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadAllUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      
      const [clients, masseurs, schools, salons] = await Promise.all([
        fetch('https://functions.poehali.dev/49394b85-90a2-40ca-a843-19e551c6c436', {
          headers: { 'Authorization': `Bearer ${token}` }
        }).then(r => r.ok ? r.json() : []).catch(() => []),
        
        fetch('https://functions.poehali.dev/49394b85-90a2-40ca-a843-19e551c6c436', {
          headers: { 'Authorization': `Bearer ${token}` }
        }).then(r => r.ok ? r.json() : []).catch(() => []),
        
        fetch('https://functions.poehali.dev/a81dd7cd-c267-4f44-85f5-0da8353dc741?action=get-schools', {
          headers: { 'Authorization': `Bearer ${token}` }
        }).then(r => r.ok ? r.json() : []).catch(() => []),
        
        fetch('https://functions.poehali.dev/3beac6d8-19b3-4f7f-b7c1-63e60e8afc66?action=get-salons', {
          headers: { 'Authorization': `Bearer ${token}` }
        }).then(r => r.ok ? r.json() : []).catch(() => [])
      ]);

      const users: User[] = [
        ...masseurs.map((m: any) => ({
          id: m.id,
          user_id: m.user_id,
          name: m.full_name,
          email: m.email || 'Нет email',
          role: 'masseur',
          avatar_url: m.avatar_url,
          phone: m.phone,
          city: m.city
        })),
        ...schools.map((s: any) => ({
          id: s.id,
          user_id: s.user_id,
          name: s.school_name,
          email: s.contact_email || 'Нет email',
          role: 'school',
          avatar_url: s.logo_url,
          phone: s.contact_phone
        })),
        ...salons.map((s: any) => ({
          id: s.id,
          user_id: s.user_id,
          name: s.name,
          email: s.contact_email || 'Нет email',
          role: 'salon',
          phone: s.contact_phone,
          city: s.city
        }))
      ];

      setAllUsers(users);
      setFilteredUsers(users);
    } catch (error) {
      console.error('Error loading users:', error);
      toast({
        title: 'Ошибка',
        description: 'Не удалось загрузить список пользователей',
        variant: 'destructive'
      });
    }
  };

  const loadMessages = async (userId: number) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}?action=get-messages&chat_id=${userId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        const data = await response.json();
        setMessages(data.messages || []);
      }
    } catch (error) {
      console.error('Error loading messages:', error);
    }
  };

  const handleUserSelect = (user: User) => {
    setSelectedUser(user);
    loadMessages(user.user_id);
    setActiveTab('chats');
  };

  const handleChatSelect = (chat: Chat) => {
    const user = allUsers.find(u => u.user_id === chat.other_user_id);
    if (user) {
      handleUserSelect(user);
    } else {
      setSelectedUser({
        id: 0,
        user_id: chat.other_user_id,
        name: chat.name,
        email: '',
        role: chat.role,
        avatar_url: chat.avatar
      });
      loadMessages(chat.other_user_id);
    }
  };

  const handleSendMessage = async () => {
    if (!messageText.trim() || !selectedUser) return;

    setSending(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}?action=send-message`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          receiver_id: selectedUser.user_id,
          message_text: messageText
        })
      });

      if (response.ok) {
        setMessageText('');
        setShowEmojiPicker(false);
        loadMessages(selectedUser.user_id);
        loadChats();
        setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
      } else {
        const error = await response.json();
        toast({
          title: 'Ошибка',
          description: error.error || 'Не удалось отправить сообщение',
          variant: 'destructive'
        });
      }
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось отправить сообщение',
        variant: 'destructive'
      });
    } finally {
      setSending(false);
      inputRef.current?.focus();
    }
  };

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    setMessageText(prev => prev + emojiData.emoji);
    inputRef.current?.focus();
  };

  const handleTemplateClick = (template: string) => {
    setMessageText(template);
    setShowTemplates(false);
    inputRef.current?.focus();
  };

  const getRoleBadge = (role: string) => {
    const badges: Record<string, { label: string; color: string }> = {
      client: { label: 'Клиент', color: 'bg-blue-100 text-blue-700' },
      masseur: { label: 'Массажист', color: 'bg-green-100 text-green-700' },
      school: { label: 'Школа', color: 'bg-purple-100 text-purple-700' },
      salon: { label: 'Салон', color: 'bg-orange-100 text-orange-700' }
    };
    const badge = badges[role] || { label: role, color: 'bg-gray-100 text-gray-700' };
    return <span className={`text-xs px-2 py-1 rounded ${badge.color}`}>{badge.label}</span>;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-96">
            <Icon name="Loader2" className="animate-spin" size={32} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Чат с пользователями</h1>
          <p className="text-muted-foreground">Администраторская панель для общения с клиентами, массажистами, школами и салонами</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-1">
            <CardHeader>
              <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'chats' | 'users')}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="chats">
                    <Icon name="MessageSquare" size={16} className="mr-2" />
                    Активные чаты
                  </TabsTrigger>
                  <TabsTrigger value="users">
                    <Icon name="Users" size={16} className="mr-2" />
                    Все пользователи
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            <CardContent>
              <Input
                placeholder="Поиск..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="mb-4"
              />

              <ScrollArea className="h-[600px]">
                {activeTab === 'chats' ? (
                  <div className="space-y-2">
                    {chats.length === 0 ? (
                      <p className="text-center text-muted-foreground py-8">Нет активных чатов</p>
                    ) : (
                      chats
                        .filter(c => 
                          !searchQuery.trim() || 
                          c.name.toLowerCase().includes(searchQuery.toLowerCase())
                        )
                        .map((chat) => (
                          <div
                            key={chat.other_user_id}
                            onClick={() => handleChatSelect(chat)}
                            className={`p-3 rounded-lg cursor-pointer transition-colors ${
                              selectedUser?.user_id === chat.other_user_id
                                ? 'bg-primary text-primary-foreground'
                                : 'hover:bg-muted'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-purple-600 text-white flex items-center justify-center font-semibold">
                                {chat.name.charAt(0)}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                  <p className="font-semibold truncate">{chat.name}</p>
                                  {getRoleBadge(chat.role)}
                                </div>
                                <p className="text-sm truncate opacity-75">{chat.last_message}</p>
                              </div>
                              {chat.unread_count > 0 && (
                                <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                  {chat.unread_count}
                                </span>
                              )}
                            </div>
                          </div>
                        ))
                    )}
                  </div>
                ) : (
                  <div className="space-y-2">
                    {filteredUsers.length === 0 ? (
                      <p className="text-center text-muted-foreground py-8">Пользователи не найдены</p>
                    ) : (
                      filteredUsers.map((user) => (
                        <div
                          key={`${user.role}-${user.user_id}`}
                          onClick={() => handleUserSelect(user)}
                          className={`p-3 rounded-lg cursor-pointer transition-colors ${
                            selectedUser?.user_id === user.user_id
                              ? 'bg-primary text-primary-foreground'
                              : 'hover:bg-muted'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-purple-600 text-white flex items-center justify-center font-semibold">
                              {user.name.charAt(0)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <p className="font-semibold truncate">{user.name}</p>
                                {getRoleBadge(user.role)}
                              </div>
                              <p className="text-xs truncate opacity-75">{user.email}</p>
                              {user.city && <p className="text-xs truncate opacity-75">{user.city}</p>}
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </ScrollArea>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            {selectedUser ? (
              <>
                <CardHeader className="border-b">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-purple-600 text-white flex items-center justify-center font-semibold text-lg">
                      {selectedUser.name.charAt(0)}
                    </div>
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {selectedUser.name}
                        {getRoleBadge(selectedUser.role)}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">{selectedUser.email}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <ScrollArea className="h-[500px] p-4">
                    <div className="space-y-4">
                      {messages.length === 0 ? (
                        <p className="text-center text-muted-foreground py-8">Нет сообщений</p>
                      ) : (
                        messages.map((msg) => {
                          const isFromMe = msg.sender_id === currentUserId;
                          return (
                            <div key={msg.id} className={`flex ${isFromMe ? 'justify-end' : 'justify-start'}`}>
                              <div
                                className={`max-w-[70%] p-3 rounded-lg ${
                                  isFromMe
                                    ? 'bg-primary text-primary-foreground'
                                    : 'bg-muted'
                                }`}
                              >
                                <p className="whitespace-pre-wrap break-words">{msg.message_text}</p>
                                <p className={`text-xs mt-1 ${isFromMe ? 'opacity-75' : 'text-muted-foreground'}`}>
                                  {new Date(msg.created_at).toLocaleString('ru-RU', {
                                    day: 'numeric',
                                    month: 'short',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                  })}
                                </p>
                              </div>
                            </div>
                          );
                        })
                      )}
                      <div ref={messagesEndRef} />
                    </div>
                  </ScrollArea>

                  <div className="p-4 border-t space-y-2">
                    {showTemplates && (
                      <div className="flex flex-wrap gap-2 mb-2">
                        {quickTemplates.map((template, idx) => (
                          <Button
                            key={idx}
                            size="sm"
                            variant="outline"
                            onClick={() => handleTemplateClick(template)}
                            className="text-xs"
                          >
                            {template}
                          </Button>
                        ))}
                      </div>
                    )}
                    
                    <div className="flex gap-2">
                      <Popover open={showTemplates} onOpenChange={setShowTemplates}>
                        <PopoverTrigger asChild>
                          <Button variant="outline" size="icon">
                            <Icon name="Zap" size={20} />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-80" align="start">
                          <div className="space-y-2">
                            <p className="text-sm font-medium mb-2">Быстрые ответы</p>
                            {quickTemplates.map((template, idx) => (
                              <Button
                                key={idx}
                                variant="ghost"
                                className="w-full justify-start text-left h-auto py-2"
                                onClick={() => handleTemplateClick(template)}
                              >
                                {template}
                              </Button>
                            ))}
                          </div>
                        </PopoverContent>
                      </Popover>

                      <Popover open={showEmojiPicker} onOpenChange={setShowEmojiPicker}>
                        <PopoverTrigger asChild>
                          <Button variant="outline" size="icon">
                            <Icon name="Smile" size={20} />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0 border-0" align="start">
                          <EmojiPicker 
                            onEmojiClick={handleEmojiClick}
                            width={350}
                            height={400}
                          />
                        </PopoverContent>
                      </Popover>

                      <Input
                        ref={inputRef}
                        placeholder="Введите сообщение..."
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSendMessage();
                          }
                        }}
                        disabled={sending}
                        className="flex-1"
                      />
                      
                      <Button onClick={handleSendMessage} disabled={sending || !messageText.trim()}>
                        {sending ? (
                          <Icon name="Loader2" className="animate-spin" size={20} />
                        ) : (
                          <Icon name="Send" size={20} />
                        )}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </>
            ) : (
              <CardContent className="flex items-center justify-center h-[600px]">
                <div className="text-center">
                  <Icon name="MessageSquare" size={64} className="mx-auto mb-4 text-muted-foreground" />
                  <p className="text-lg font-medium mb-2">Выберите пользователя</p>
                  <p className="text-muted-foreground">Выберите чат или пользователя слева, чтобы начать общение</p>
                </div>
              </CardContent>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}