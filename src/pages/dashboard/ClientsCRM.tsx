import { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface Client {
  id: number;
  name: string;
  phone: string;
  lastVisit: string;
  nextVisit?: string;
  sessions: number;
  notes: string;
  status: 'active' | 'inactive' | 'pending';
}

export default function ClientsCRM() {
  const { toast } = useToast();
  const [clients, setClients] = useState<Client[]>([
    {
      id: 1,
      name: 'Анна Смирнова',
      phone: '+7 (999) 123-45-67',
      lastVisit: '2026-01-03',
      nextVisit: '2026-01-17',
      sessions: 5,
      notes: 'Предпочитает релакс-массаж',
      status: 'active'
    },
    {
      id: 2,
      name: 'Иван Петров',
      phone: '+7 (999) 234-56-78',
      lastVisit: '2025-12-28',
      sessions: 3,
      notes: 'Работа с напряжением спины',
      status: 'pending'
    },
  ]);

  const [isAddingClient, setIsAddingClient] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  const [newClient, setNewClient] = useState({
    name: '',
    phone: '',
    notes: '',
  });

  const handleAddClient = () => {
    const client: Client = {
      id: Date.now(),
      name: newClient.name,
      phone: newClient.phone,
      lastVisit: new Date().toISOString().split('T')[0],
      sessions: 0,
      notes: newClient.notes,
      status: 'active'
    };
    setClients([...clients, client]);
    setNewClient({ name: '', phone: '', notes: '' });
    setIsAddingClient(false);
    toast({
      title: "Клиент добавлен",
      description: "Новый клиент успешно добавлен в базу",
    });
  };

  const sendReminder = (client: Client) => {
    toast({
      title: "Напоминание отправлено",
      description: `Напоминание о записи отправлено клиенту ${client.name}`,
    });
  };

  const scheduleNextVisit = (client: Client) => {
    const nextDate = new Date();
    nextDate.setDate(nextDate.getDate() + 14);
    const updatedClients = clients.map(c =>
      c.id === client.id ? { ...c, nextVisit: nextDate.toISOString().split('T')[0] } : c
    );
    setClients(updatedClients);
    toast({
      title: "Следующий визит запланирован",
      description: `Следующая встреча с ${client.name} назначена на ${nextDate.toLocaleDateString('ru-RU')}`,
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="default">Активный</Badge>;
      case 'inactive':
        return <Badge variant="secondary">Неактивный</Badge>;
      case 'pending':
        return <Badge variant="outline">Ожидает записи</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={() => window.history.back()}>
                <Icon name="ArrowLeft" size={20} />
              </Button>
              <div>
                <h1 className="text-3xl font-bold">База клиентов</h1>
                <p className="text-muted-foreground">Управление клиентами и повторными записями</p>
              </div>
            </div>
            <Dialog open={isAddingClient} onOpenChange={setIsAddingClient}>
              <DialogTrigger asChild>
                <Button>
                  <Icon name="Plus" size={18} className="mr-2" />
                  Добавить клиента
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Новый клиент</DialogTitle>
                  <DialogDescription>Добавьте информацию о клиенте</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Имя</Label>
                    <Input
                      placeholder="Имя Фамилия"
                      value={newClient.name}
                      onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Телефон</Label>
                    <Input
                      placeholder="+7 (999) 123-45-67"
                      value={newClient.phone}
                      onChange={(e) => setNewClient({ ...newClient, phone: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Заметки</Label>
                    <Textarea
                      placeholder="Особенности, предпочтения"
                      value={newClient.notes}
                      onChange={(e) => setNewClient({ ...newClient, notes: e.target.value })}
                      rows={3}
                    />
                  </div>
                  <Button onClick={handleAddClient} className="w-full">Добавить</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-6 mb-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="TrendingUp" className="text-primary" size={24} />
                  Статистика
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-primary/5 rounded-lg">
                    <p className="text-3xl font-bold text-primary">{clients.length}</p>
                    <p className="text-sm text-muted-foreground">Всего клиентов</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <p className="text-3xl font-bold text-green-600">
                      {clients.filter(c => c.status === 'active').length}
                    </p>
                    <p className="text-sm text-muted-foreground">Активные</p>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <p className="text-3xl font-bold text-orange-600">
                      {clients.filter(c => c.status === 'pending').length}
                    </p>
                    <p className="text-sm text-muted-foreground">Ожидают записи</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Автоматические напоминания</CardTitle>
                <CardDescription>Настройте автоматическую отправку напоминаний</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <Icon name="Bell" className="text-primary" size={24} />
                    <div>
                      <p className="font-medium">За 3 дня до записи</p>
                      <p className="text-sm text-muted-foreground">SMS или Telegram напоминание</p>
                    </div>
                  </div>
                  <Badge>Включено</Badge>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <Icon name="Calendar" className="text-primary" size={24} />
                    <div>
                      <p className="font-medium">Через 2 недели после сеанса</p>
                      <p className="text-sm text-muted-foreground">Предложение повторной записи</p>
                    </div>
                  </div>
                  <Badge variant="secondary">Выключено</Badge>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <Icon name="Heart" className="text-primary" size={24} />
                    <div>
                      <p className="font-medium">Благодарность после сеанса</p>
                      <p className="text-sm text-muted-foreground">Автоматическое сообщение с заботой</p>
                    </div>
                  </div>
                  <Badge>Включено</Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4">
            {clients.map((client) => (
              <Card key={client.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <Icon name="User" className="text-primary" size={24} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-lg">{client.name}</h3>
                          {getStatusBadge(client.status)}
                        </div>
                        <p className="text-sm text-muted-foreground">{client.phone}</p>
                        <div className="flex items-center gap-4 mt-2 text-sm">
                          <span className="flex items-center gap-1">
                            <Icon name="Calendar" size={14} />
                            Последний визит: {new Date(client.lastVisit).toLocaleDateString('ru-RU')}
                          </span>
                          <span className="flex items-center gap-1">
                            <Icon name="Hash" size={14} />
                            Сеансов: {client.sessions}
                          </span>
                        </div>
                        {client.nextVisit && (
                          <div className="mt-2 p-2 bg-primary/5 rounded inline-block">
                            <span className="text-sm font-medium text-primary">
                              Следующий визит: {new Date(client.nextVisit).toLocaleDateString('ru-RU')}
                            </span>
                          </div>
                        )}
                        {client.notes && (
                          <p className="text-sm text-muted-foreground mt-2 italic">{client.notes}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => sendReminder(client)}
                      >
                        <Icon name="Send" size={16} className="mr-2" />
                        Напомнить
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => scheduleNextVisit(client)}
                      >
                        <Icon name="CalendarPlus" size={16} className="mr-2" />
                        Записать
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setSelectedClient(client)}
                      >
                        <Icon name="MoreHorizontal" size={16} />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {clients.length === 0 && (
            <Card>
              <CardContent className="p-12 text-center">
                <Icon name="Users" className="mx-auto text-muted-foreground mb-4" size={48} />
                <h3 className="text-xl font-semibold mb-2">Пока нет клиентов</h3>
                <p className="text-muted-foreground mb-4">Добавьте первого клиента, чтобы начать работу</p>
                <Button onClick={() => setIsAddingClient(true)}>
                  <Icon name="Plus" size={18} className="mr-2" />
                  Добавить клиента
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
