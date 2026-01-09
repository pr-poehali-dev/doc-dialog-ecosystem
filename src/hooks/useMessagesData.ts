import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

export interface Message {
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

export interface Chat {
  other_user_id: number;
  name: string;
  role: 'client' | 'masseur' | 'school' | 'salon' | 'admin';
  last_message: string;
  last_message_time: string;
  unread_count: number;
  avatar?: string;
  verified?: boolean;
  booking_id: number;
}

const API_URL = 'https://functions.poehali.dev/04d0b538-1cf5-4941-9c06-8d1bef5854ec';

export function useMessagesData() {
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
  const [userRole, setUserRole] = useState<string>('');
  const [messagesLimit, setMessagesLimit] = useState<number | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');
    
    if (!token || !userStr) {
      navigate('/login');
      return;
    }
    
    const user = JSON.parse(userStr);
    setCurrentUserId(user.id);
    setUserRole(user.role || '');
    
    fetchChats();
    
    if (user.role === 'school' || user.role === 'salon') {
      loadSchoolMessagesLimit(user.id);
    }
  }, [navigate]);

  useEffect(() => {
    const masseurId = searchParams.get('masseur') || searchParams.get('chat');
    const isBooking = searchParams.get('booking') === 'true';
    const serviceParam = searchParams.get('service');
    
    if (masseurId) {
      const parsedMasseurId = parseInt(masseurId);
      const existingChat = chats.find(c => c.other_user_id === parsedMasseurId);
      
      if (existingChat) {
        setSelectedChat(existingChat);
        fetchMessages(existingChat.other_user_id);
        
        if (serviceParam && messageText === '') {
          try {
            const service = JSON.parse(decodeURIComponent(serviceParam));
            setMessageText(`Здравствуйте! Интересует услуга:\n\n${service.name}\n${service.duration} • ${service.price}\n\n${service.description}\n\nКогда можно записаться?`);
          } catch (e) {
            console.error('Error parsing service:', e);
          }
        } else if (isBooking && messageText === '') {
          setMessageText('Здравствуйте! Хочу записаться на сеанс массажа.');
        }
      } else if (chats.length >= 0) {
        loadMasseurAndCreateChat(parsedMasseurId, isBooking, serviceParam);
      }
    }
  }, [chats, searchParams]);

  const loadMasseurAndCreateChat = async (masseurId: number, isBooking: boolean = false, serviceParam: string | null = null) => {
    try {
      console.log('🔍 Loading masseur with ID:', masseurId);
      const response = await fetch('https://functions.poehali.dev/49394b85-90a2-40ca-a843-19e551c6c436');
      if (response.ok) {
        const data = await response.json();
        console.log('📦 API response:', data);
        
        // API может вернуть { masseurs: [...] } или просто массив
        const masseursList = data.masseurs || data;
        const masseur = masseursList.find((m: any) => m.id === masseurId);
        
        console.log('👤 Found masseur:', masseur);
        
        if (masseur) {
          const alreadyExists = chats.some(c => c.other_user_id === masseur.user_id);
          console.log('✅ Chat already exists:', alreadyExists);
          
          if (!alreadyExists) {
            const virtualChat: Chat = {
              other_user_id: masseur.user_id,
              name: masseur.full_name,
              role: 'masseur',
              last_message: 'Начните общение',
              last_message_time: new Date().toISOString(),
              unread_count: 0,
              avatar: masseur.avatar_url,
              verified: true,
              booking_id: 0
            };
            
            console.log('➕ Creating virtual chat:', virtualChat);
            setChats(prevChats => [virtualChat, ...prevChats]);
            setSelectedChat(virtualChat);
          } else {
            const existingChat = chats.find(c => c.other_user_id === masseur.user_id);
            if (existingChat) {
              console.log('📌 Selecting existing chat:', existingChat);
              setSelectedChat(existingChat);
            }
          }
          
          fetchMessages(masseur.user_id);
          
          if (serviceParam) {
            try {
              const service = JSON.parse(decodeURIComponent(serviceParam));
              setMessageText(`Здравствуйте! Интересует услуга:\n\n${service.name}\n${service.duration} • ${service.price}\n\n${service.description}\n\nКогда можно записаться?`);
            } catch (e) {
              console.error('Error parsing service:', e);
            }
          } else if (isBooking) {
            setMessageText('Здравствуйте! Хочу записаться на сеанс массажа.');
          } else {
            // Для салонов - пустое сообщение или приглашение
            const userStr = localStorage.getItem('user');
            if (userStr) {
              const user = JSON.parse(userStr);
              if (user.role === 'salon') {
                setMessageText('Здравствуйте! Мы салон, ищем специалистов.');
              }
            }
          }
        } else {
          console.error('❌ Masseur not found in list');
        }
      }
    } catch (error) {
      console.error('Error loading masseur:', error);
    }
  };

  const loadSchoolMessagesLimit = async (userId: string) => {
    try {
      const response = await fetch(`https://functions.poehali.dev/f81f82f7-d9c7-4858-87bc-6701c67f2187?action=my_subscription`, {
        headers: { 'X-User-Id': userId }
      });
      if (response.ok) {
        const data = await response.json();
        const limit = data.subscription?.plan?.messages_limit_per_day;
        setMessagesLimit(limit === undefined ? null : limit);
      }
    } catch (error) {
      console.error('Error loading messages limit:', error);
    }
  };

  const fetchChats = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const userStr = localStorage.getItem('user');
      const user = userStr ? JSON.parse(userStr) : null;
      
      const response = await fetch(`${API_URL}?action=get-chats`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        let allChats = data.chats || [];
        
        if (user?.role === 'salon') {
          try {
            const adminsResponse = await fetch('https://functions.poehali.dev/49394b85-90a2-40ca-a843-19e551c6c436');
            
            if (adminsResponse.ok) {
              const responseData = await adminsResponse.json();
              const allMasseurs = responseData.masseurs || [];
              
              const admins = allMasseurs.filter((m: any) => 
                m.full_name && m.full_name.toLowerCase().includes('админ')
              );
              
              if (admins.length > 0) {
                const adminChats = admins.map((admin: any) => ({
                  other_user_id: admin.user_id,
                  name: admin.full_name,
                  role: 'admin' as const,
                  last_message: 'Поддержка Док диалог',
                  last_message_time: new Date().toISOString(),
                  unread_count: 0,
                  avatar: admin.avatar_url,
                  verified: true,
                  booking_id: 0
                }));
                
                const existingIds = allChats.map((c: Chat) => c.other_user_id);
                const newAdminChats = adminChats.filter((ac: Chat) => !existingIds.includes(ac.other_user_id));
                allChats = [...newAdminChats, ...allChats];
              }
            }
          } catch (error) {
            console.error('Error loading admins:', error);
          }
        }
        
        setChats(allChats);
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

    if (userRole === 'salon' && messagesLimit !== null && messagesLimit <= 0) {
      toast({
        title: '⚠️ Лимит сообщений исчерпан',
        description: 'Вы достигли лимита в 10 сообщений в сутки. Попробуйте завтра.',
        variant: 'destructive',
      });
      return;
    }

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
        
        if (userRole === 'salon' && messagesLimit !== null) {
          setMessagesLimit(messagesLimit - 1);
        }
      } else if (response.status === 403) {
        const errorData = await response.json();
        
        if (errorData.error === 'content_blocked') {
          toast({
            title: errorData.is_final_warning ? '⛔ ПОСЛЕДНЕЕ ПРЕДУПРЕЖДЕНИЕ' : '⚠️ Нарушение правил',
            description: errorData.warning,
            variant: 'destructive',
            duration: 10000,
          });
        } else {
          toast({
            title: '❌ Аккаунт заблокирован',
            description: errorData.error || 'Ваш аккаунт заблокирован за нарушение правил',
            variant: 'destructive',
            duration: 10000,
          });
        }
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
          action,
        }),
      });

      if (response.ok) {
        if (selectedChat) {
          await fetchMessages(selectedChat.other_user_id);
          await fetchChats();
        }
        
        toast({
          title: action === 'accept' ? '✅ Заявка принята' : 'Заявка отклонена',
          description: action === 'accept' 
            ? 'Клиент получит уведомление' 
            : 'Заявка была отклонена',
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

  const handleDeleteChat = () => {
    setSelectedChat(null);
    setMessages([]);
  };

  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return {
    selectedChat,
    messageText,
    setMessageText,
    searchQuery,
    setSearchQuery,
    chats: filteredChats,
    messages,
    loading,
    sending,
    currentUserId,
    userRole,
    messagesLimit,
    handleSelectChat,
    handleSendMessage,
    handleBookingResponse,
    handleDeleteChat,
  };
}