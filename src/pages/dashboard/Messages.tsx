import { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';

interface Message {
  id: number;
  text: string;
  timestamp: string;
  isOwn: boolean;
}

interface Chat {
  id: number;
  name: string;
  role: 'client' | 'masseur' | 'salon';
  lastMessage: string;
  timestamp: string;
  unread: number;
  avatar?: string;
  verified?: boolean;
}

export default function Messages() {
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [messageText, setMessageText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const [chats] = useState<Chat[]>([
    {
      id: 1,
      name: 'Анна Смирнова',
      role: 'client',
      lastMessage: 'Спасибо за сеанс! Когда можно записаться на следующий?',
      timestamp: '14:30',
      unread: 2,
      verified: false
    },
    {
      id: 2,
      name: 'Салон "Гармония"',
      role: 'salon',
      lastMessage: 'Добрый день! Мы ищем массажиста для работы по графику 2/2',
      timestamp: '12:15',
      unread: 1,
      verified: true
    },
    {
      id: 3,
      name: 'Иван Петров',
      role: 'masseur',
      lastMessage: 'Привет! У меня освободилось время, могу взять твоего клиента',
      timestamp: 'Вчера',
      unread: 0,
      verified: true
    },
    {
      id: 4,
      name: 'Мария Иванова',
      role: 'client',
      lastMessage: 'Можно ли перенести запись на 19 января?',
      timestamp: '2 дня назад',
      unread: 0,
      verified: false
    },
    {
      id: 5,
      name: 'Салон "Релакс Центр"',
      role: 'salon',
      lastMessage: 'Вакансия ещё актуальна?',
      timestamp: '3 дня назад',
      unread: 0,
      verified: true
    },
  ]);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: 'Здравствуйте! Хотела записаться на массаж',
      timestamp: '14:20',
      isOwn: false
    },
    {
      id: 2,
      text: 'Здравствуйте! Конечно, какой день вам удобен?',
      timestamp: '14:22',
      isOwn: true
    },
    {
      id: 3,
      text: 'Может быть 15 января в 18:00?',
      timestamp: '14:25',
      isOwn: false
    },
    {
      id: 4,
      text: 'Отлично, записала вас. Адрес: ул. Примерная, 10. Жду!',
      timestamp: '14:27',
      isOwn: true
    },
    {
      id: 5,
      text: 'Спасибо за сеанс! Когда можно записаться на следующий?',
      timestamp: '14:30',
      isOwn: false
    },
  ]);

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'client':
        return <Badge variant="secondary" className="text-xs">Клиент</Badge>;
      case 'masseur':
        return <Badge variant="default" className="text-xs">Массажист</Badge>;
      case 'salon':
        return <Badge className="bg-purple-600 text-xs">Салон</Badge>;
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
      case 'salon':
        return 'Building2';
      default:
        return 'User';
    }
  };

  const handleSendMessage = () => {
    if (!messageText.trim()) return;

    const newMessage: Message = {
      id: messages.length + 1,
      text: messageText,
      timestamp: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
      isOwn: true
    };

    setMessages([...messages, newMessage]);
    setMessageText('');
  };

  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <Button variant="ghost" onClick={() => window.history.back()}>
              <Icon name="ArrowLeft" size={20} />
            </Button>
            <div className="flex-1">
              <h1 className="text-3xl font-bold">Сообщения</h1>
              <p className="text-muted-foreground">Общение с клиентами, коллегами и салонами</p>
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
                  <div className="space-y-2">
                    {filteredChats.map((chat) => (
                      <div
                        key={chat.id}
                        onClick={() => setSelectedChat(chat)}
                        className={`p-3 rounded-lg cursor-pointer transition-colors ${
                          selectedChat?.id === chat.id
                            ? 'bg-primary/10 border-primary/50'
                            : 'hover:bg-muted border-transparent'
                        } border`}
                      >
                        <div className="flex items-start gap-3">
                          <div className="relative">
                            <Avatar className="w-12 h-12">
                              <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                                <Icon name={getRoleIcon(chat.role) as any} className="text-primary" size={20} />
                              </div>
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
                                <p className="font-semibold text-sm truncate">{chat.name}</p>
                                {getRoleBadge(chat.role)}
                              </div>
                              {chat.unread > 0 && (
                                <Badge className="bg-primary text-primary-foreground rounded-full w-5 h-5 p-0 flex items-center justify-center text-xs">
                                  {chat.unread}
                                </Badge>
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground truncate">{chat.lastMessage}</p>
                            <p className="text-xs text-muted-foreground mt-1">{chat.timestamp}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
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
                          <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                            <Icon name={getRoleIcon(selectedChat.role) as any} className="text-primary" size={24} />
                          </div>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-semibold">{selectedChat.name}</p>
                            {selectedChat.verified && (
                              <Icon name="CheckCircle" className="text-primary" size={16} />
                            )}
                          </div>
                          {getRoleBadge(selectedChat.role)}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {selectedChat.role === 'client' && (
                          <>
                            <Button variant="outline" size="sm">
                              <Icon name="Calendar" size={16} className="mr-2" />
                              Записать
                            </Button>
                            <Button variant="outline" size="sm">
                              <Icon name="Phone" size={16} />
                            </Button>
                          </>
                        )}
                        {selectedChat.role === 'salon' && (
                          <Button variant="outline" size="sm">
                            <Icon name="Briefcase" size={16} className="mr-2" />
                            Вакансия
                          </Button>
                        )}
                        <Button variant="ghost" size="sm">
                          <Icon name="MoreVertical" size={16} />
                        </Button>
                      </div>
                    </div>
                  </div>

                  <ScrollArea className="h-[480px] p-4">
                    <div className="space-y-4">
                      {messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-[70%] rounded-lg p-3 ${
                              message.isOwn
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-muted'
                            }`}
                          >
                            <p className="text-sm">{message.text}</p>
                            <p className={`text-xs mt-1 ${
                              message.isOwn ? 'text-primary-foreground/70' : 'text-muted-foreground'
                            }`}>
                              {message.timestamp}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>

                  <div className="border-t p-4">
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon">
                        <Icon name="Paperclip" size={18} />
                      </Button>
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
                        className="min-h-[44px] max-h-[120px] resize-none"
                        rows={1}
                      />
                      <Button onClick={handleSendMessage} size="icon">
                        <Icon name="Send" size={18} />
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Enter — отправить, Shift+Enter — новая строка
                    </p>
                  </div>
                </CardContent>
              ) : (
                <CardContent className="p-12">
                  <div className="text-center">
                    <Icon name="MessageCircle" className="mx-auto text-muted-foreground mb-4" size={64} />
                    <h3 className="text-xl font-semibold mb-2">Выберите чат</h3>
                    <p className="text-muted-foreground">Выберите диалог из списка слева</p>
                  </div>
                </CardContent>
              )}
            </Card>
          </div>

          <Card className="mt-6 border-primary/20 bg-primary/5">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Icon name="Info" className="text-primary flex-shrink-0 mt-1" size={24} />
                <div className="space-y-2">
                  <h3 className="font-semibold">Кто может с вами связаться?</h3>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-start gap-2">
                      <Icon name="CheckCircle" className="text-green-600 flex-shrink-0 mt-0.5" size={16} />
                      <p><strong>Клиенты:</strong> Зарегистрированные пользователи могут написать вам через профиль в каталоге</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <Icon name="CheckCircle" className="text-green-600 flex-shrink-0 mt-0.5" size={16} />
                      <p><strong>Салоны:</strong> Проверенные салоны-партнёры могут предложить вакансии</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <Icon name="CheckCircle" className="text-green-600 flex-shrink-0 mt-0.5" size={16} />
                      <p><strong>Коллеги:</strong> Другие специалисты из сообщества для обмена опытом и рекомендаций</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}