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
import CreateTestMasseurs from '@/components/admin/CreateTestMasseurs';
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
  name?: string;
  description: string;
  url: string;
  video_url?: string;
  icon?: string;
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

export default function Tools() {
  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingTool, setEditingTool] = useState<Tool | null>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    description: '',
    url: '',
    video_url: '',
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
          'X-Authorization': `Bearer ${token}`
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
        description: tool.description,
        url: tool.url,
        video_url: tool.video_url || '',
        target_role: tool.target_role,
        is_active: tool.is_active,
        display_order: tool.display_order
      });
    } else {
      setEditingTool(null);
      setFormData({
        description: '',
        url: '',
        video_url: '',
        target_role: 'school',
        is_active: true,
        display_order: 0
      });
    }
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!formData.description || !formData.url) {
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
          'X-Authorization': `Bearer ${token}`,
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
          'X-Authorization': `Bearer ${token}`
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
        <CreateTestMasseurs />
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
                          <Icon name="Link" size={24} className={tool.is_active ? 'text-primary' : 'text-muted-foreground'} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            {!tool.is_active && (
                              <span className="text-xs px-2 py-1 bg-muted text-muted-foreground rounded">
                                Неактивен
                              </span>
                            )}
                          </div>
                          <p className="text-sm font-medium mb-1">{tool.description}</p>
                          <div className="space-y-1">
                            <a
                              href={tool.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-primary hover:underline inline-flex items-center gap-1"
                            >
                              Ссылка на инструмент
                              <Icon name="ExternalLink" size={12} />
                            </a>
                            {tool.video_url && (
                              <div>
                                <a
                                  href={tool.video_url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-xs text-muted-foreground hover:underline inline-flex items-center gap-1"
                                >
                                  Видеоинструкция
                                  <Icon name="Video" size={12} />
                                </a>
                              </div>
                            )}
                          </div>
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
                  <div className="text-center py-8">
                    <Icon name="Package" size={48} className="mx-auto text-muted-foreground mb-3" />
                    <p className="text-muted-foreground">
                      Инструменты для этой категории еще не добавлены
                    </p>
                  </div>
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
              Укажите ссылку, описание и видео из Кинескопа
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="url">Ссылка на инструмент *</Label>
              <Input
                id="url"
                type="url"
                value={formData.url}
                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                placeholder="https://t.me/your_bot"
              />
              <p className="text-xs text-muted-foreground">Ссылка на сторонний сайт или сервис</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Описание *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Опишите, для чего нужен этот инструмент и как он поможет пользователям..."
                rows={4}
              />
              <p className="text-xs text-muted-foreground">Расширенное описание для чего нужен инструмент</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="video_url">Ссылка на видео из Кинескопа</Label>
              <Input
                id="video_url"
                type="url"
                value={formData.video_url}
                onChange={(e) => setFormData({ ...formData, video_url: e.target.value })}
                placeholder="https://kinescope.io/..."
              />
              <p className="text-xs text-muted-foreground">Опционально: видеоинструкция по использованию</p>
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

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="space-y-0.5">
                <Label>Активность</Label>
                <p className="text-sm text-muted-foreground">
                  Показывать инструмент пользователям
                </p>
              </div>
              <Switch
                checked={formData.is_active}
                onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="display_order">Порядок отображения</Label>
              <Input
                id="display_order"
                type="number"
                value={formData.display_order}
                onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })}
                placeholder="0"
              />
              <p className="text-xs text-muted-foreground">Меньшее число = выше в списке</p>
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