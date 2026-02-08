import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { EmojiClickData } from 'emoji-picker-react';
import AdminChatList from '@/components/admin/AdminChatList';
import AdminUserList from '@/components/admin/AdminUserList';
import AdminChatMessages from '@/components/admin/AdminChatMessages';

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
      
      // Загружаем всех пользователей из базы через admin API
      const allUsersResponse = await fetch('https://functions.poehali.dev/d9ed333b-313d-40b6-8ca2-016db5854f7c?action=users', {
        headers: { 'X-Authorization': `Bearer ${token}` }
      });
      
      if (!allUsersResponse.ok) {
        throw new Error('Failed to load users from admin API');
      }
      
      const allUsersData = await allUsersResponse.json();
      
      // Загружаем массажистов для получения дополнительной информации (аватары, города)
      const masseursResponse = await fetch('https://functions.poehali.dev/49394b85-90a2-40ca-a843-19e551c6c436', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const masseursData = masseursResponse.ok ? await masseursResponse.json() : { masseurs: [] };
      const masseurs = masseursData.masseurs || masseursData || [];
      
      // Создаем карту массажистов для быстрого поиска
      const masseursMap = new Map(
        masseurs.map((m: Record<string, unknown>) => [m.user_id as number, m])
      );

      // Загружаем школы для дополнительной информации
      let schools: unknown[] = [];
      try {
        const schoolsResponse = await fetch('https://functions.poehali.dev/a81dd7cd-c267-4f44-85f5-0da8353dc741?action=get-schools', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (schoolsResponse.ok) {
          const schoolsData = await schoolsResponse.json();
          schools = schoolsData.schools || schoolsData || [];
        }
      } catch (e) {
        console.log('Schools not loaded:', e);
      }
      
      const schoolsMap = new Map(
        schools.map((s: Record<string, unknown>) => [s.user_id as number, s])
      );

      // Загружаем салоны для дополнительной информации
      let salons: unknown[] = [];
      try {
        const salonsResponse = await fetch('https://functions.poehali.dev/3beac6d8-19b3-4f7f-b7c1-63e60e8afc66?action=get-salons', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (salonsResponse.ok) {
          const salonsData = await salonsResponse.json();
          salons = salonsData.salons || salonsData || [];
        }
      } catch (e) {
        console.log('Salons not loaded:', e);
      }
      
      const salonsMap = new Map(
        salons.map((s: Record<string, unknown>) => [s.user_id as number, s])
      );

      // Объединяем данные всех пользователей с дополнительной информацией
      const users: User[] = allUsersData
        .filter((u: Record<string, unknown>) => u.id !== 1 && u.id !== 2) // Исключаем тестовых пользователей
        .map((u: Record<string, unknown>) => {
          const userId = u.id as number;
          const role = u.role as string;
          
          // Ищем дополнительные данные в зависимости от роли
          const masseurData = masseursMap.get(userId);
          const schoolData = schoolsMap.get(userId);
          const salonData = salonsMap.get(userId);
          
          let name = `${u.first_name || ''} ${u.last_name || ''}`.trim();
          let avatar_url = undefined;
          let city = undefined;
          
          if (role === 'masseur' && masseurData) {
            name = (masseurData.full_name as string) || name || 'Массажист';
            avatar_url = masseurData.avatar_url as string | undefined;
            city = masseurData.city as string | undefined;
          } else if (role === 'school' && schoolData) {
            name = (schoolData.school_name as string) || name || 'Школа';
            avatar_url = schoolData.logo_url as string | undefined;
          } else if (role === 'salon' && salonData) {
            name = (salonData.name as string) || name || 'Салон';
            avatar_url = salonData.logo_url as string | undefined;
            city = salonData.city as string | undefined;
          } else if (!name) {
            name = u.email as string || 'Пользователь';
          }
          
          return {
            id: userId,
            user_id: userId,
            name,
            email: u.email as string,
            role,
            avatar_url,
            phone: u.phone as string | undefined,
            city
          };
        });

      console.log('Loaded users:', users.length);
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
    }
  };

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    setMessageText(prev => prev + emojiData.emoji);
  };

  const handleTemplateSelect = (template: string) => {
    setMessageText(template);
    setShowTemplates(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <Navigation />
      <div className="max-w-7xl mx-auto p-4 pt-24">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Чаты с пользователями</h1>
          <p className="text-muted-foreground">
            Управление сообщениями со всеми пользователями платформы
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'chats' | 'users')}>
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="chats">Активные чаты</TabsTrigger>
                <TabsTrigger value="users">Все пользователи</TabsTrigger>
              </TabsList>
              
              <TabsContent value="chats">
                <AdminChatList
                  chats={chats}
                  selectedUserId={selectedUser?.user_id || null}
                  onChatSelect={handleChatSelect}
                />
              </TabsContent>
              
              <TabsContent value="users">
                <AdminUserList
                  users={filteredUsers}
                  searchQuery={searchQuery}
                  selectedUserId={selectedUser?.user_id || null}
                  onSearchChange={setSearchQuery}
                  onUserSelect={handleUserSelect}
                />
              </TabsContent>
            </Tabs>
          </div>

          <div className="lg:col-span-2">
            <AdminChatMessages
              selectedUser={selectedUser}
              messages={messages}
              currentUserId={currentUserId}
              messageText={messageText}
              sending={sending}
              showEmojiPicker={showEmojiPicker}
              showTemplates={showTemplates}
              quickTemplates={quickTemplates}
              onMessageTextChange={setMessageText}
              onSendMessage={handleSendMessage}
              onEmojiClick={handleEmojiClick}
              onToggleEmojiPicker={setShowEmojiPicker}
              onToggleTemplates={setShowTemplates}
              onTemplateSelect={handleTemplateSelect}
            />
          </div>
        </div>
      </div>
    </div>
  );
}