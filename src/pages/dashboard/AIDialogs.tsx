import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import AIDialogChat from '@/components/ai-dialog/AIDialogChat';

interface Dialog {
  id: number;
  title: string;
  dialog_type: string;
  created_at: string;
  updated_at: string;
}

interface DialogsData {
  dialogs: Dialog[];
  limit: number;
  used: number;
}

const AI_DIALOG_URL = 'https://functions.poehali.dev/7c4b9e29-6778-42e7-9ac9-c30966d1765e';

const AIDialogs = () => {
  const [dialogsData, setDialogsData] = useState<DialogsData>({ dialogs: [], limit: 3, used: 0 });
  const [activeDialog, setActiveDialog] = useState<Dialog | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const dialogTypes = [
    { id: 'supervision', label: 'Супервизия', icon: 'Users', color: 'from-blue-500/10 to-blue-500/5' },
    { id: 'case_analysis', label: 'Разбор случая', icon: 'FileText', color: 'from-purple-500/10 to-purple-500/5' },
    { id: 'boundaries', label: 'Границы', icon: 'Shield', color: 'from-green-500/10 to-green-500/5' },
    { id: 'burnout', label: 'Выгорание', icon: 'Heart', color: 'from-pink-500/10 to-pink-500/5' },
    { id: 'growth', label: 'Развитие', icon: 'TrendingUp', color: 'from-orange-500/10 to-orange-500/5' }
  ];

  useEffect(() => {
    loadDialogs();
  }, []);

  const loadDialogs = async () => {
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        toast({ title: 'Ошибка', description: 'Необходима авторизация', variant: 'destructive' });
        return;
      }

      const response = await fetch(`${AI_DIALOG_URL}?action=list_dialogs`, {
        headers: { 'X-User-Id': userId }
      });

      if (!response.ok) throw new Error('Failed to load dialogs');
      
      const data = await response.json();
      setDialogsData(data);
    } catch (error) {
      toast({ title: 'Ошибка', description: 'Не удалось загрузить диалоги', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const createDialog = async (type: string, title: string) => {
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) return;

      const response = await fetch(AI_DIALOG_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-User-Id': userId
        },
        body: JSON.stringify({
          action: 'create_dialog',
          title,
          type
        })
      });

      if (!response.ok) throw new Error('Failed to create dialog');
      
      const data = await response.json();
      setActiveDialog(data.dialog);
      loadDialogs();
      
      toast({ title: 'Диалог создан', description: 'Можете начать беседу' });
    } catch (error) {
      toast({ title: 'Ошибка', description: 'Не удалось создать диалог', variant: 'destructive' });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Icon name="Loader2" className="animate-spin" size={32} />
      </div>
    );
  }

  if (activeDialog) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => setActiveDialog(null)}
          className="mb-4"
        >
          <Icon name="ArrowLeft" size={20} className="mr-2" />
          Вернуться к списку
        </Button>
        <AIDialogChat dialog={activeDialog} />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">AI Диалоги</h1>
          <p className="text-muted-foreground">
            Профессиональная супервизия и поддержка для специалистов
          </p>
          <div className="mt-4 p-4 bg-secondary/50 rounded-lg border">
            <div className="flex items-center justify-between">
              <span className="text-sm">Использовано диалогов в этом месяце:</span>
              <span className="font-semibold">{dialogsData.used} / {dialogsData.limit}</span>
            </div>
          </div>
        </div>

        <Tabs defaultValue="new" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="new">Новый диалог</TabsTrigger>
            <TabsTrigger value="history">История ({dialogsData.dialogs.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="new" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {dialogTypes.map((type) => (
                <Card 
                  key={type.id}
                  className={`cursor-pointer hover:shadow-lg transition-all hover:-translate-y-1 bg-gradient-to-br ${type.color} border-2`}
                  onClick={() => createDialog(type.id, type.label)}
                >
                  <CardHeader>
                    <Icon name={type.icon as any} size={32} className="text-primary mb-2" />
                    <CardTitle className="text-xl">{type.label}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {type.id === 'supervision' && 'Разбор сложных ситуаций с клиентами'}
                      {type.id === 'case_analysis' && 'Анализ клиентских случаев'}
                      {type.id === 'boundaries' && 'Работа с профессиональными границами'}
                      {type.id === 'burnout' && 'Профилактика выгорания'}
                      {type.id === 'growth' && 'Профессиональное развитие'}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="bg-secondary/30 p-6 rounded-xl border">
              <h3 className="font-semibold mb-3">Что даёт AI-диалог?</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <Icon name="Check" size={16} className="mt-0.5 text-primary" />
                  <span>Конфиденциальное пространство для разбора сложных случаев</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="Check" size={16} className="mt-0.5 text-primary" />
                  <span>Помощь в анализе ситуации с разных углов</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="Check" size={16} className="mt-0.5 text-primary" />
                  <span>Поддержка в принятии профессиональных решений</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="Check" size={16} className="mt-0.5 text-primary" />
                  <span>Доступно 24/7 без записи и ожидания</span>
                </li>
              </ul>
            </div>
          </TabsContent>

          <TabsContent value="history">
            {dialogsData.dialogs.length === 0 ? (
              <div className="text-center py-12">
                <Icon name="MessageSquare" size={48} className="mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-semibold mb-2">Пока нет диалогов</h3>
                <p className="text-muted-foreground mb-4">Начните новый диалог, чтобы получить поддержку</p>
              </div>
            ) : (
              <div className="grid gap-4">
                {dialogsData.dialogs.map((dialog) => {
                  const dialogType = dialogTypes.find(t => t.id === dialog.dialog_type);
                  return (
                    <Card 
                      key={dialog.id}
                      className="cursor-pointer hover:shadow-lg transition-all"
                      onClick={() => setActiveDialog(dialog)}
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <Icon name={dialogType?.icon as any || 'MessageSquare'} size={24} className="text-primary" />
                            <div>
                              <CardTitle className="text-lg">{dialog.title}</CardTitle>
                              <p className="text-sm text-muted-foreground mt-1">
                                {dialogType?.label || dialog.dialog_type}
                              </p>
                            </div>
                          </div>
                          <Icon name="ChevronRight" size={20} className="text-muted-foreground" />
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="text-xs text-muted-foreground">
                          Обновлено: {new Date(dialog.updated_at).toLocaleDateString('ru-RU', {
                            day: 'numeric',
                            month: 'long',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AIDialogs;
