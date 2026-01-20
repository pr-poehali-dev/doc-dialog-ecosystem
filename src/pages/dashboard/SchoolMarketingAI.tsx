import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { MARKETING_TOOLS } from '@/components/marketing/MarketingToolsConfig';
import MarketingToolCard from '@/components/marketing/MarketingToolCard';
import MarketingToolView from '@/components/marketing/MarketingToolView';

const AI_TOOLS_URL = 'https://functions.poehali.dev/7c4b9e29-6778-42e7-9ac9-c30966d1765e';

export default function SchoolMarketingAI() {
  const [activeToolId, setActiveToolId] = useState<string | null>(null);
  const [inputText, setInputText] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [showLimitModal, setShowLimitModal] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const getUserId = () => {
    const token = localStorage.getItem('token');
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.user_id || payload.userId || payload.sub;
    } catch {
      return null;
    }
  };

  const handleAnalyze = async (toolId: string) => {
    if (!inputText.trim()) {
      toast({ title: 'Ошибка', description: 'Введите текст для анализа', variant: 'destructive' });
      return;
    }

    setLoading(true);
    setResponse('');

    try {
      const userId = getUserId();
      if (!userId) {
        toast({ title: 'Ошибка', description: 'Необходима авторизация', variant: 'destructive' });
        return;
      }

      const tool = MARKETING_TOOLS.find(t => t.id === toolId);
      if (!tool || tool.isLink) return;

      const createResponse = await fetch(AI_TOOLS_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-User-Id': userId
        },
        body: JSON.stringify({
          action: 'analyze_tool',
          tool_type: toolId,
          text: inputText,
          system_prompt: tool.systemPrompt
        })
      });

      if (createResponse.status === 403) {
        const errorData = await createResponse.json();
        toast({
          title: 'Недостаточно средств',
          description: `${errorData.error || 'Недостаточно средств на балансе'}. Пополните баланс.`,
          variant: 'destructive'
        });
        return;
      }

      if (!createResponse.ok) {
        const errorData = await createResponse.json();
        throw new Error(errorData.error || 'Ошибка анализа');
      }

      const data = await createResponse.json();
      setResponse(data.analysis);
      
    } catch (error) {
      toast({ 
        title: 'Ошибка', 
        description: error instanceof Error ? error.message : 'Не удалось получить анализ',
        variant: 'destructive' 
      });
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setInputText('');
    setResponse('');
  };

  const handleToolClick = (toolId: string) => {
    const tool = MARKETING_TOOLS.find(t => t.id === toolId);
    if (tool?.isLink && tool.linkTo) {
      navigate(tool.linkTo);
    } else {
      setActiveToolId(toolId);
    }
  };

  if (activeToolId && !MARKETING_TOOLS.find(t => t.id === activeToolId)?.isLink) {
    const tool = MARKETING_TOOLS.find(t => t.id === activeToolId);
    if (!tool) return null;

    return (
      <MarketingToolView
        tool={tool}
        inputText={inputText}
        response={response}
        loading={loading}
        onInputChange={setInputText}
        onAnalyze={() => handleAnalyze(tool.id)}
        onClear={handleClear}
        onBack={() => setActiveToolId(null)}
      />
    );
  }

  return (
    <div className="space-y-4 md:space-y-6">
      <Button 
        variant="ghost" 
        onClick={() => navigate('/dashboard')}
        className="gap-2"
      >
        <Icon name="ArrowLeft" size={18} />
        Назад в кабинет
      </Button>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Маркетинговые AI-инструменты</h1>
          <p className="text-gray-600 mt-1">Анализ аудитории и создание востребованных курсов — 15₽ за анализ</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {MARKETING_TOOLS.map((tool) => (
          <MarketingToolCard
            key={tool.id}
            tool={tool}
            onClick={() => handleToolClick(tool.id)}
          />
        ))}
      </div>

      <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Info" size={20} />
            Как это работает
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-gray-700">
          <p>
            <strong>15₽ за анализ</strong> — списывается с баланса школы
          </p>
          <p>
            Все рекомендации основаны на анализе реальных потребностей массажистов на платформе Док диалог
          </p>
          <Button 
            variant="default" 
            className="mt-2"
            onClick={() => navigate('/dashboard/balance')}
          >
            Пополнить баланс
          </Button>
        </CardContent>
      </Card>

      <Dialog open={showLimitModal} onOpenChange={setShowLimitModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Icon name="AlertCircle" className="text-primary" />
              Лимит запросов исчерпан
            </DialogTitle>
            <DialogDescription className="space-y-4 pt-4">
              <p>
                Недостаточно средств на балансе для анализа.
              </p>
              <p>
                Стоимость одного анализа: <strong>15₽</strong>
              </p>
              <p>
                Пополните баланс школы, чтобы продолжить использовать AI-инструменты.
              </p>
              <div className="flex gap-2 pt-2">
                <Button 
                  onClick={() => {
                    setShowLimitModal(false);
                    navigate('/dashboard/balance');
                  }}
                  className="flex-1"
                >
                  Пополнить баланс
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => setShowLimitModal(false)}
                  className="flex-1"
                >
                  Закрыть
                </Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}