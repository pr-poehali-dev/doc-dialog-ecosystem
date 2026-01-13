import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface MarketingToolCardProps {
  tool: {
    id: string;
    title: string;
    description: string;
    icon: string;
    color: string;
    isLink?: boolean;
    linkTo?: string;
  };
  onClick: () => void;
}

export default function MarketingToolCard({ tool, onClick }: MarketingToolCardProps) {
  return (
    <Card
      className={`cursor-pointer hover:shadow-lg transition-all bg-gradient-to-br ${tool.color} border-none`}
      onClick={onClick}
    >
      <CardHeader>
        <div className="flex items-start gap-4">
          <div className="p-3 bg-white/50 rounded-xl">
            <Icon name={tool.icon as any} size={28} className="text-primary" />
          </div>
          <div className="flex-1">
            <CardTitle className="text-lg md:text-xl mb-2">{tool.title}</CardTitle>
            <CardDescription className="text-sm">{tool.description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Button variant="outline" className="w-full gap-2 bg-white/80 hover:bg-white">
          {tool.isLink ? 'Открыть' : 'Использовать'}
          <Icon name="ArrowRight" size={16} />
        </Button>
      </CardContent>
    </Card>
  );
}
