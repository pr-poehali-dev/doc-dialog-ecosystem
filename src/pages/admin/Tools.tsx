import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface Tool {
  id: number;
  name: string;
  description: string;
  url: string;
  icon: string;
  target_role: 'school' | 'salon' | 'specialist';
  is_active: boolean;
  display_order: number;
  created_at: string;
}

const ROLE_LABELS = {
  school: 'Школы',
  salon: 'Салоны',
  specialist: 'Специалисты'
};

const AVAILABLE_ICONS = [
  'Wrench', 'Bot', 'MessageSquare', 'Zap', 'Calendar', 'Users',
  'GraduationCap', 'Scissors', 'User', 'Send', 'Phone', 'Mail'
];

export default function Tools() {
  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingTool, setEditingTool] = useState<Tool | null>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    url: '',
    icon: 'Wrench',
    target_role: 'school' as 'school' | 'salon' | 'specialist',
    is_active: true,
    display_order: 0
  });

  useEffect(() => {
    loadTools();
  }, []);

  const loadTools = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://functions.poehali.dev/f1ae4f5d-1d5b-4adc-a4c9-1b97ab27ee6e', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) throw new Error('Ошибка загрузки инструментов');
      
      const data = await response.json();
      setTools(data);
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: error instanceof Error ? error.message : 'Не удалось загрузить инструменты',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (tool?: Tool) => {
    if (tool) {
      setEditingTool(tool);
      setFormData({
        name: tool.name,
        description: tool.description,
        url: tool.url,
        icon: tool.icon,
        target_role: tool.target_role,
        is_active: tool.is_active,
        display_order: tool.display_order
      });
    } else {
      setEditingTool(null);
      setFormData({
        name: '',
        description: '',
        url: '',
        icon: 'Wrench',
        target_role: 'school',
        is_active: true,
        display_order: 0
      });
    }
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!formData.name || !formData.description || !formData.url) {
      toast({
        title: 'Ошибка',
        description: 'Заполните все обязательные поля',
        variant: 'destructive'
      });
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const method = editingTool ? 'PUT' : 'POST';
      const body = editingTool 
        ? { ...formData, id: editingTool.id }
        : formData;

      const response = await fetch('https://functions.poehali.dev/f1ae4f5d-1d5b-4adc-a4c9-1b97ab27ee6e', {
        method,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });

      if (!response.ok) throw new Error('Ошибка сохранения');

      toast({
        title: 'Успешно',
        description: editingTool ? 'Инструмент обновлен' : 'Инструмент создан'
      });

      setDialogOpen(false);
      loadTools();
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: error instanceof Error ? error.message : 'Не удалось сохранить инструмент',
        variant: 'destructive'
      });
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Удалить этот инструмент?')) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`https://functions.poehali.dev/f1ae4f5d-1d5b-4adc-a4c9-1b97ab27ee6e?id=${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) throw new Error('Ошибка удаления');

      toast({
        title: 'Успешно',
        description: 'Инструмент удален'
      });

      loadTools();
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: error instanceof Error ? error.message : 'Не удалось удалить инструмент',
        variant: 'destructive'
      });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const groupedTools = tools.reduce((acc, tool) => {
    if (!acc[tool.target_role]) acc[tool.target_role] = [];
    acc[tool.target_role].push(tool);
    return acc;
  }, {} as Record<string, Tool[]>);

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Инструменты</h1>
          <p className="text-muted-foreground">Управление инструментами для пользователей</p>
        </div>
        <Button onClick={() => handleOpenDialog()}>
          <Icon name="Plus" size={20} className="mr-2" />
          Добавить инструмент
        </Button>
      </div>

      <div className="space-y-6">
        {Object.entries(ROLE_LABELS).map(([role, label]) => (
          <Card key={role}>
            <CardHeader>
              <CardTitle>{label}</CardTitle>
              <CardDescription>
                Инструменты для пользователей с ролью "{label}"
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {groupedTools[role]?.length > 0 ? (
                  groupedTools[role].map((tool) => (
                    <div
                      key={tool.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                    >
                      <div className="flex items-center gap-4 flex-1">
                        <div className={`p-2 rounded-lg ${tool.is_active ? 'bg-primary/10' : 'bg-muted'}`}>
                          <Icon name={tool.icon} size={24} className={tool.is_active ? 'text-primary' : 'text-muted-foreground'} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">{tool.name}</h3>
                            {!tool.is_active && (
                              <span className="text-xs px-2 py-1 bg-muted text-muted-foreground rounded">
                                Неактивен
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">{tool.description}</p>
                          <a
                            href={tool.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-primary hover:underline inline-flex items-center gap-1 mt-1"
                          >
                            {tool.url}
                            <Icon name="ExternalLink" size={12} />
                          </a>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleOpenDialog(tool)}
                        >
                          <Icon name="Pencil" size={16} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(tool.id)}
                        >
                          <Icon name="Trash2" size={16} />
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-muted-foreground py-8">
                    Нет инструментов для этой категории
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingTool ? 'Редактировать инструмент' : 'Добавить инструмент'}
            </DialogTitle>
            <DialogDescription>
              Заполните информацию об инструменте для пользователей
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Название *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Telegram-бот для школ"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="target_role">Для кого *</Label>
                <Select
                  value={formData.target_role}
                  onValueChange={(value) => setFormData({ ...formData, target_role: value as any })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(ROLE_LABELS).map(([value, label]) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Описание *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Автоматизируйте запись на курсы..."
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="url">Ссылка *</Label>
              <Input
                id="url"
                type="url"
                value={formData.url}
                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                placeholder="https://t.me/your_bot"
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="icon">Иконка</Label>
                <Select
                  value={formData.icon}
                  onValueChange={(value) => setFormData({ ...formData, icon: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {AVAILABLE_ICONS.map((icon) => (
                      <SelectItem key={icon} value={icon}>
                        <div className="flex items-center gap-2">
                          <Icon name={icon} size={16} />
                          {icon}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="display_order">Порядок</Label>
                <Input
                  id="display_order"
                  type="number"
                  value={formData.display_order}
                  onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="is_active">Активен</Label>
                <div className="flex items-center h-10">
                  <Switch
                    id="is_active"
                    checked={formData.is_active}
                    onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                  />
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Отмена
            </Button>
            <Button onClick={handleSave}>
              {editingTool ? 'Сохранить' : 'Создать'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
