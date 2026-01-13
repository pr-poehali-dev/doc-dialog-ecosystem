import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface ToolCardProps {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  isLink?: boolean;
  onClick: (id: string) => void;
}

export default function ToolCard({ 
  id, 
  title, 
  description, 
  icon, 
  color, 
  isLink,
  onClick 
}: ToolCardProps) {
  return (
    <Card 
      className="cursor-pointer hover:shadow-lg transition-all hover:scale-[1.02]"
      onClick={() => onClick(id)}
    >
      <CardHeader>
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-2`}>
          <Icon name={icon as any} size={24} className="text-primary" />
        </div>
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription className="line-clamp-2">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2 text-sm text-primary font-medium">
          {isLink ? 'Открыть' : 'Анализировать'}
          <Icon name="ArrowRight" size={16} />
        </div>
      </CardContent>
    </Card>
  );
}
