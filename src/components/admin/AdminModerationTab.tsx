import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

interface ModerationItem {
  id: number;
  user_id: number;
  user_email: string;
  action_type: string;
  entity_type: string;
  entity_id: number;
  new_data: any;
  status: string;
  created_at: string;
}

interface AdminModerationTabProps {
  moderationItems: ModerationItem[];
  loading: boolean;
  onModerate: (itemId: number, approve: boolean, comment?: string) => void;
}

export default function AdminModerationTab({ moderationItems, loading, onModerate }: AdminModerationTabProps) {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Icon name="Loader2" className="animate-spin" size={32} />
      </div>
    );
  }

  const pendingItems = moderationItems.filter(item => item.status === 'pending');

  return (
    <div className="space-y-4">
      {pendingItems.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <Icon name="Shield" className="mx-auto mb-4 text-muted-foreground" size={48} />
            <p className="text-lg font-medium mb-2">Нет задач на модерации</p>
            <p className="text-muted-foreground">Все изменения обработаны</p>
          </CardContent>
        </Card>
      ) : (
        pendingItems.map((item) => (
          <Card key={item.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {item.action_type === 'create' && 'Создание'}
                    {item.action_type === 'update' && 'Изменение'}
                    {item.action_type === 'delete' && 'Удаление'}
                    {' '}
                    {item.entity_type}
                    <Badge>{item.status}</Badge>
                  </CardTitle>
                  <CardDescription>
                    От: {item.user_email} • {new Date(item.created_at).toLocaleString('ru-RU')}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="bg-muted p-4 rounded mb-4">
                <pre className="text-sm overflow-x-auto">
                  {JSON.stringify(item.new_data, null, 2)}
                </pre>
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={() => onModerate(item.id, true)}
                >
                  <Icon name="Check" size={16} className="mr-2" />
                  Одобрить
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => onModerate(item.id, false)}
                >
                  <Icon name="X" size={16} className="mr-2" />
                  Отклонить
                </Button>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
}
