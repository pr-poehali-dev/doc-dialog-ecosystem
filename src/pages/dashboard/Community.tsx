import { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';

interface Post {
  id: number;
  author: string;
  authorRole: string;
  avatar: string;
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
  isLiked: boolean;
}

interface Event {
  id: number;
  title: string;
  date: string;
  type: 'online' | 'offline';
  location: string;
  participants: number;
  maxParticipants: number;
}

export default function Community() {
  const { toast } = useToast();
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      author: 'Анна Смирнова',
      authorRole: 'Массажист • 5 лет опыта',
      avatar: '',
      content: 'Коллеги, делюсь опытом: начала использовать CRM из экосистемы для напоминаний клиентам. Повторные записи выросли на 40%! Советую всем попробовать.',
      timestamp: '2 часа назад',
      likes: 24,
      comments: 8,
      isLiked: false
    },
    {
      id: 2,
      author: 'Иван Петров',
      authorRole: 'Массажист • 3 года опыта',
      avatar: '',
      content: 'Вопрос к опытным коллегам: как вы объясняете клиентам разницу между релаксационным и восстановительным массажем без медицинских терминов?',
      timestamp: '5 часов назад',
      likes: 15,
      comments: 12,
      isLiked: true
    },
  ]);

  const [events] = useState<Event[]>([
    {
      id: 1,
      title: 'Мастермайнд: Работа с возражениями',
      date: '15 января 2026, 19:00',
      type: 'online',
      location: 'Онлайн в Zoom',
      participants: 12,
      maxParticipants: 20
    },
    {
      id: 2,
      title: 'Встреча массажистов Москвы',
      date: '20 января 2026, 18:00',
      type: 'offline',
      location: 'Москва, ул. Примерная, 10',
      participants: 8,
      maxParticipants: 15
    },
  ]);

  const toggleLike = (postId: number) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, isLiked: !post.isLiked, likes: post.isLiked ? post.likes - 1 : post.likes + 1 }
        : post
    ));
  };

  const handleJoinEvent = (eventTitle: string) => {
    toast({
      title: "Вы записаны на мероприятие",
      description: `Вы успешно записались на "${eventTitle}"`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <Button variant="ghost" onClick={() => window.history.back()}>
              <Icon name="ArrowLeft" size={20} />
            </Button>
            <div className="flex-1">
              <h1 className="text-3xl font-bold">Сообщество массажистов</h1>
              <p className="text-muted-foreground">Обмен опытом, взаимопомощь и рекомендации</p>
            </div>
          </div>

          <Tabs defaultValue="feed" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="feed">Лента</TabsTrigger>
              <TabsTrigger value="events">Мероприятия</TabsTrigger>
              <TabsTrigger value="recommendations">Рекомендации</TabsTrigger>
            </TabsList>

            <TabsContent value="feed" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="PenSquare" size={24} />
                    Поделиться с сообществом
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Textarea placeholder="Задайте вопрос или поделитесь опытом..." rows={3} />
                  <div className="flex justify-end">
                    <Button>
                      <Icon name="Send" size={16} className="mr-2" />
                      Опубликовать
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {posts.map((post) => (
                <Card key={post.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Avatar className="w-12 h-12">
                        <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                          <Icon name="User" className="text-primary" size={24} />
                        </div>
                      </Avatar>
                      <div className="flex-1">
                        <div className="mb-2">
                          <p className="font-semibold">{post.author}</p>
                          <p className="text-sm text-muted-foreground">{post.authorRole} • {post.timestamp}</p>
                        </div>
                        <p className="text-sm mb-4">{post.content}</p>
                        <div className="flex items-center gap-4">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleLike(post.id)}
                            className={post.isLiked ? 'text-red-500' : ''}
                          >
                            <Icon name={post.isLiked ? 'Heart' : 'Heart'} size={16} className="mr-2" />
                            {post.likes}
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Icon name="MessageCircle" size={16} className="mr-2" />
                            {post.comments}
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Icon name="Share2" size={16} className="mr-2" />
                            Поделиться
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="events" className="space-y-6">
              <Card className="border-primary/20 bg-primary/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Calendar" className="text-primary" size={24} />
                    Предстоящие мероприятия
                  </CardTitle>
                  <CardDescription>Онлайн и офлайн встречи сообщества</CardDescription>
                </CardHeader>
              </Card>

              {events.map((event) => (
                <Card key={event.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4 flex-1">
                        <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                          event.type === 'online' ? 'bg-blue-100' : 'bg-green-100'
                        }`}>
                          <Icon 
                            name={event.type === 'online' ? 'Video' : 'MapPin'} 
                            className={event.type === 'online' ? 'text-blue-600' : 'text-green-600'} 
                            size={28} 
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-lg">{event.title}</h3>
                            <Badge variant={event.type === 'online' ? 'default' : 'secondary'}>
                              {event.type === 'online' ? 'Онлайн' : 'Офлайн'}
                            </Badge>
                          </div>
                          <div className="space-y-1 text-sm text-muted-foreground mb-3">
                            <p className="flex items-center gap-2">
                              <Icon name="Clock" size={14} />
                              {event.date}
                            </p>
                            <p className="flex items-center gap-2">
                              <Icon name="MapPin" size={14} />
                              {event.location}
                            </p>
                            <p className="flex items-center gap-2">
                              <Icon name="Users" size={14} />
                              {event.participants} / {event.maxParticipants} участников
                            </p>
                          </div>
                          <Button size="sm" onClick={() => handleJoinEvent(event.title)}>
                            <Icon name="UserPlus" size={16} className="mr-2" />
                            Записаться
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              <Card>
                <CardContent className="p-6 text-center">
                  <Icon name="Calendar" className="mx-auto text-muted-foreground mb-3" size={48} />
                  <h3 className="font-semibold mb-2">Предложите своё мероприятие</h3>
                  <p className="text-sm text-muted-foreground mb-4">Организуйте встречу для обмена опытом</p>
                  <Button variant="outline">
                    <Icon name="Plus" size={16} className="mr-2" />
                    Создать мероприятие
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="recommendations" className="space-y-6">
              <Card className="border-primary/20 bg-primary/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Handshake" className="text-primary" size={24} />
                    Система рекомендаций
                  </CardTitle>
                  <CardDescription>
                    Рекомендуйте коллег клиентам и получайте рекомендации от других массажистов
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Icon name="CheckCircle" className="text-green-600" size={20} />
                      <p className="text-sm">Не биржа клиентов — взаимопомощь профессионалов</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Icon name="Shield" className="text-green-600" size={20} />
                      <p className="text-sm">Рекомендуйте только проверенных коллег</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Icon name="Heart" className="text-green-600" size={20} />
                      <p className="text-sm">Помогайте развиваться экосистеме</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Запросы на рекомендацию</CardTitle>
                  <CardDescription>Коллеги ищут специалистов для своих клиентов</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-start gap-4">
                      <Avatar className="w-10 h-10">
                        <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                          <Icon name="User" className="text-primary" size={20} />
                        </div>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-medium mb-1">Мария Иванова ищет массажиста</p>
                        <p className="text-sm text-muted-foreground mb-2">
                          Нужен специалист по спортивному массажу в районе Арбата, Москва
                        </p>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Icon name="MessageCircle" size={14} className="mr-2" />
                            Откликнуться
                          </Button>
                          <Button size="sm" variant="ghost">
                            Рекомендовать коллегу
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-start gap-4">
                      <Avatar className="w-10 h-10">
                        <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                          <Icon name="User" className="text-primary" size={20} />
                        </div>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-medium mb-1">Дмитрий Сидоров ищет массажиста</p>
                        <p className="text-sm text-muted-foreground mb-2">
                          Релаксационный массаж, выезд на дом, Санкт-Петербург
                        </p>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Icon name="MessageCircle" size={14} className="mr-2" />
                            Откликнуться
                          </Button>
                          <Button size="sm" variant="ghost">
                            Рекомендовать коллегу
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Ваши рекомендации</CardTitle>
                  <CardDescription>Вы получили рекомендации от коллег</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <Icon name="UserCheck" className="mx-auto text-muted-foreground mb-3" size={48} />
                    <p className="text-muted-foreground">У вас пока нет рекомендаций</p>
                    <p className="text-sm text-muted-foreground mt-1">Активно участвуйте в сообществе, чтобы получать рекомендации</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
