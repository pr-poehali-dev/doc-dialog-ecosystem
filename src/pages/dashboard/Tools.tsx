import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';

interface Tool {
  id: number;
  name?: string;
  description: string;
  url: string;
  video_url?: string;
  icon?: string;
}

export default function Tools() {
  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadTools();
  }, []);

  const loadTools = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://functions.poehali.dev/41dbcf47-a8d5-45ff-bb56-f9754581a0d7', {
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (tools.length === 0) {
    return (
      <Card>
        <CardContent className="py-12">
          <div className="text-center">
            <Icon name="Wrench" size={48} className="mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Инструменты пока недоступны</h3>
            <p className="text-muted-foreground">
              Скоро здесь появятся полезные инструменты для вашей работы
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Инструменты</h2>
        <p className="text-muted-foreground">
          Полезные инструменты для автоматизации вашей работы
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {tools.map((tool) => (
          <Card key={tool.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start gap-3 mb-2">
                <div className="p-3 rounded-lg bg-primary/10 flex-shrink-0">
                  <Icon name="Link" size={24} className="text-primary" />
                </div>
                <div className="flex-1">
                  <CardDescription className="text-base text-foreground leading-relaxed">
                    {tool.description}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                className="w-full" 
                onClick={() => window.open(tool.url, '_blank')}
              >
                <Icon name="ExternalLink" size={18} className="mr-2" />
                Открыть инструмент
              </Button>
              
              {tool.video_url && (
                <Button 
                  variant="outline"
                  className="w-full" 
                  onClick={() => window.open(tool.video_url, '_blank')}
                >
                  <Icon name="Video" size={18} className="mr-2" />
                  Видеоинструкция
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
