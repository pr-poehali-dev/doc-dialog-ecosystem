import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';

const AI_TOOLS_URL = 'https://functions.poehali.dev/7c4b9e29-6778-42e7-9ac9-c30966d1765e';

export default function Tools() {
  const [activeToolId, setActiveToolId] = useState<string | null>(null);
  const [inputText, setInputText] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const tools = [
    {
      id: 'medical-analysis',
      title: 'Расшифровка медицинских заключений',
      description: 'Анализ МРТ, рентгена, УЗИ и других медицинских исследований',
      icon: 'FileText',
      color: 'from-blue-500/10 to-blue-500/5',
      placeholder: 'Вставьте текст заключения МРТ, рентгена, УЗИ или другого медицинского исследования...',
      systemPrompt: `Ты — медицинский консультант для массажистов и телесных терапевтов.
Твоя задача: проанализировать медицинское заключение (МРТ, рентген, УЗИ и т.д.) и дать рекомендации:

1. **Объясни простым языком**, что означают медицинские термины в заключении
2. **Можно ли делать массаж** при данном состоянии (да/нет/с ограничениями)
3. **Какие массажные техники безопасны**, а какие противопоказаны
4. **Можно ли применять остеопатические техники** и какие именно
5. **К какому врачу направить клиента** (если нужна консультация специалиста)
6. **Важные предостережения** и меры предосторожности

Отвечай структурированно, профессионально, с акцентом на безопасность клиента.`
    },
    {
      id: 'symptoms-analysis',
      title: 'Анализ жалоб и симптомов',
      description: 'Помощь в понимании жалоб клиента и составлении плана работы',
      icon: 'Stethoscope',
      color: 'from-purple-500/10 to-purple-500/5',
      placeholder: 'Опишите жалобы и симптомы клиента (боли, дискомфорт, ограничения движений и т.д.)...',
      systemPrompt: `Ты — эксперт по телесной терапии и массажу.
Твоя задача: помочь массажисту понять жалобы клиента и составить план работы.

Когда массажист описывает жалобы/симптомы клиента, проанализируй и предоставь:

1. **Возможные причины** данных симптомов (физиологические, постуральные, психосоматические)
2. **На что обратить внимание** при осмотре и работе с клиентом
3. **Какие зоны тела проверить** (триггерные точки, напряжения, дисбалансы)
4. **Рекомендуемые техники массажа** для данного случая
5. **Домашние рекомендации клиенту** (упражнения, растяжки, самомассаж)
6. **Противопоказания** и ограничения в работе
7. **Когда необходима консультация врача** (red flags)

Отвечай профессионально, структурированно, с заботой о безопасности клиента.`
    },
    {
      id: 'ai-dialogs',
      title: 'Профессиональная супервизия',
      description: 'AI-диалоги для разбора сложных случаев и профессионального роста',
      icon: 'MessageSquare',
      color: 'from-green-500/10 to-green-500/5',
      isLink: true,
      linkTo: '/dashboard/ai-dialogs'
    }
  ];

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

      const tool = tools.find(t => t.id === toolId);
      if (!tool || tool.isLink) return;

      // Создаём временный диалог для получения ответа
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

  if (activeToolId && !tools.find(t => t.id === activeToolId)?.isLink) {
    const tool = tools.find(t => t.id === activeToolId);
    if (!tool) return null;

    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => setActiveToolId(null)}>
            <Icon name="ArrowLeft" size={18} className="mr-2" />
            Назад
          </Button>
          <div>
            <h2 className="text-2xl font-bold">{tool.title}</h2>
            <p className="text-muted-foreground">{tool.description}</p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name={tool.icon as any} size={24} />
              Введите данные для анализа
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={tool.placeholder}
              className="min-h-[200px]"
              disabled={loading}
            />
            <div className="flex gap-2">
              <Button 
                onClick={() => handleAnalyze(activeToolId)} 
                disabled={loading || !inputText.trim()}
                className="flex-1"
              >
                {loading ? (
                  <>
                    <Icon name="Loader2" className="animate-spin mr-2" size={18} />
                    Анализирую...
                  </>
                ) : (
                  <>
                    <Icon name="Sparkles" size={18} className="mr-2" />
                    Получить анализ
                  </>
                )}
              </Button>
              <Button variant="outline" onClick={handleClear} disabled={loading}>
                Очистить
              </Button>
            </div>
          </CardContent>
        </Card>

        {response && (
          <Card className="bg-blue-50/50 border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-900">
                <Icon name="Lightbulb" size={24} />
                Результат анализа
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none">
                <div className="whitespace-pre-wrap text-gray-900">{response}</div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-2">AI Инструменты для специалистов</h2>
          <p className="text-muted-foreground">
            Профессиональные инструменты на базе искусственного интеллекта
          </p>
        </div>
        <Button variant="outline" onClick={() => navigate('/dashboard')}>
          <Icon name="ArrowLeft" size={18} className="mr-2" />
          В кабинет
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => (
          <Card 
            key={tool.id}
            className={`cursor-pointer hover:shadow-xl transition-all hover:-translate-y-1 bg-gradient-to-br ${tool.color} border-2`}
            onClick={() => {
              if (tool.isLink && tool.linkTo) {
                navigate(tool.linkTo);
              } else {
                setActiveToolId(tool.id);
              }
            }}
          >
            <CardHeader>
              <Icon name={tool.icon as any} size={40} className="text-primary mb-3" />
              <CardTitle className="text-xl">{tool.title}</CardTitle>
              <CardDescription className="text-base">
                {tool.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="ghost" className="w-full">
                <Icon name="ArrowRight" size={18} className="ml-auto" />
                Открыть инструмент
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-secondary/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Info" size={20} />
            Важная информация
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <p>• AI-инструменты предоставляют информационную поддержку, но не заменяют медицинскую консультацию</p>
          <p>• Всегда консультируйте клиентов с серьёзными заболеваниями с врачом</p>
          <p>• Анализ медицинских заключений помогает понять противопоказания для массажа</p>
          <p>• При сомнениях в безопасности техник — откажитесь от работы или направьте к врачу</p>
        </CardContent>
      </Card>
    </div>
  );
}
