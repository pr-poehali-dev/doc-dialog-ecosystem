import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface Request {
  id: number;
  school_id: number;
  school_name: string;
  title: string;
  description: string;
  specialty: string;
  budget_from: number;
  budget_to: number;
  currency: string;
  location: string;
  deadline_date: string;
  status: string;
  created_at: string;
}

interface SalonRequestsListProps {
  requests: Request[];
}

export default function SalonRequestsList({ requests }: SalonRequestsListProps) {
  if (requests.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <Icon name="Inbox" size={48} className="mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">Пока нет активных заявок</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {requests.map((req) => (
        <Card key={req.id}>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle>{req.title}</CardTitle>
                <CardDescription>
                  {req.school_name} • {req.location}
                </CardDescription>
              </div>
              <Badge>{req.specialty}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm mb-4">{req.description}</p>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Icon name="Coins" size={16} />
                <span>
                  {req.budget_from.toLocaleString()} - {req.budget_to.toLocaleString()} {req.currency}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Icon name="Calendar" size={16} />
                <span>{new Date(req.deadline_date).toLocaleDateString('ru-RU')}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}