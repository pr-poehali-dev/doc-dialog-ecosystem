import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface SpecialistRequest {
  id: number;
  title: string;
  description: string;
  specialty: string;
  budget_from: number | null;
  budget_to: number | null;
  currency: string;
  location: string | null;
  deadline_date: string | null;
  status: string;
  created_at: string;
}

interface SpecialistCardProps {
  specialist: SpecialistRequest;
  getStatusBadge: (status: string) => JSX.Element;
  onEdit?: (specialist: SpecialistRequest) => void;
  onDelete?: (specialistId: number) => void;
}

export default function SpecialistCard({ specialist: spec, getStatusBadge, onEdit, onDelete }: SpecialistCardProps) {
  return (
    <Card key={spec.id}>
      <CardHeader>
        <div className="flex justify-between items-start mb-2">
          <CardTitle className="text-lg">{spec.title}</CardTitle>
          {getStatusBadge(spec.status)}
        </div>
        <p className="text-sm text-muted-foreground line-clamp-3">{spec.description}</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <Icon name="Briefcase" size={16} className="text-primary" />
            <span>{spec.specialty}</span>
          </div>
          {(spec.budget_from || spec.budget_to) && (
            <div className="flex items-center gap-2">
              <Icon name="DollarSign" size={16} className="text-primary" />
              <span>
                {spec.budget_from && spec.budget_to 
                  ? `${spec.budget_from.toLocaleString()}-${spec.budget_to.toLocaleString()}`
                  : spec.budget_from 
                    ? `от ${spec.budget_from.toLocaleString()}`
                    : `до ${spec.budget_to?.toLocaleString()}`
                } {spec.currency}
              </span>
            </div>
          )}
          {spec.location && (
            <div className="flex items-center gap-2">
              <Icon name="MapPin" size={16} className="text-primary" />
              <span>{spec.location}</span>
            </div>
          )}
          {spec.deadline_date && (
            <div className="flex items-center gap-2">
              <Icon name="Calendar" size={16} className="text-primary" />
              <span>До {new Date(spec.deadline_date).toLocaleDateString('ru-RU')}</span>
            </div>
          )}
        </div>
        <div className="flex gap-2 mt-4 pt-4 border-t">
          <button
            onClick={() => onEdit?.(spec)}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            <Icon name="Pencil" size={16} />
            Редактировать
          </button>
          <button
            onClick={() => onDelete?.(spec.id)}
            className="flex items-center justify-center gap-2 px-3 py-2 text-sm bg-destructive text-destructive-foreground rounded-md hover:bg-destructive/90 transition-colors"
          >
            <Icon name="Trash2" size={16} />
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
