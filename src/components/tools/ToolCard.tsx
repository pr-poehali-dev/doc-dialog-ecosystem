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
      <CardHeader className="p-4 sm:p-6">
        <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-2`}>
          <Icon name={icon as any} size={20} className="text-primary sm:w-6 sm:h-6" />
        </div>
        <CardTitle className="text-base sm:text-lg">{title}</CardTitle>
        <CardDescription className="line-clamp-2 text-xs sm:text-sm">{description}</CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-0 sm:px-6 sm:pb-6">
        <div className="flex items-center gap-2 text-xs sm:text-sm text-primary font-medium">
          {isLink ? 'Открыть' : 'Анализировать'}
          <Icon name="ArrowRight" size={14} className="sm:w-4 sm:h-4" />
        </div>
      </CardContent>
    </Card>
  );
}