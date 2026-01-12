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
      id: 'massage-program',
      title: 'Конструктор программы массажа',
      description: 'Создание персонализированного плана массажных сеансов для клиента',
      icon: 'Calendar',
      color: 'from-orange-500/10 to-orange-500/5',
      placeholder: 'Опишите клиента и цель работы:\n\nПример:\nПол: женский\nВозраст: 35 лет\nЗапрос: снять напряжение в шее и плечах после офисной работы\nОграничения: нет\nКоличество сеансов: 5-7',
      systemPrompt: `Ты — эксперт по составлению программ массажа и телесной терапии.
Твоя задача: создать профессиональный план массажных сеансов на основе запроса клиента.

Когда массажист описывает клиента и цель, составь подробную программу:

1. **Диагностика и анализ**
   - Оценка состояния клиента
   - Зоны повышенного внимания
   - Возможные причины проблемы

2. **План сеансов** (поэтапно, сеанс за сеансом)
   - Цель каждого сеанса
   - Техники и методы работы
   - Зоны воздействия
   - Длительность сеанса
   - Особенности работы

3. **Прогрессия нагрузки**
   - Как увеличивать интенсивность
   - Когда переходить к глубоким техникам
   - Контрольные точки прогресса

4. **Домашние задания клиенту**
   - Упражнения между сеансами
   - Самомассаж
   - Рекомендации по образу жизни

5. **Критерии успеха**
   - Как оценить эффективность программы
   - Что должно измениться

6. **Рекомендации по продолжению**
   - Поддерживающие сеансы
   - Профилактика

Отвечай профессионально, с конкретными техниками и понятной структурой программы.`
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
      <div className="space-y-4 md:space-y-6">
        <div className="flex flex-col sm:flex-row items-start gap-3 md:gap-4">
          <Button variant="ghost" onClick={() => setActiveToolId(null)} className="shrink-0 text-sm md:text-base">
            <Icon name="ArrowLeft" size={16} className="mr-2" />
            Назад
          </Button>
          <div className="px-2">
            <h2 className="text-xl md:text-2xl font-bold">{tool.title}</h2>
            <p className="text-sm md:text-base text-muted-foreground">{tool.description}</p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
              <Icon name={tool.icon as any} size={20} className="md:w-6 md:h-6" />
              Введите данные для анализа
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={tool.placeholder}
              className="min-h-[150px] md:min-h-[200px] text-sm md:text-base"
              disabled={loading}
            />
            <div className="flex flex-col sm:flex-row gap-2">
              <Button 
                onClick={() => handleAnalyze(activeToolId)} 
                disabled={loading || !inputText.trim()}
                className="flex-1 text-sm md:text-base"
              >
                {loading ? (
                  <>
                    <Icon name="Loader2" className="animate-spin mr-2" size={16} />
                    Анализирую...
                  </>
                ) : (
                  <>
                    <Icon name="Sparkles" size={16} className="mr-2" />
                    Получить анализ
                  </>
                )}
              </Button>
              <Button variant="outline" onClick={handleClear} disabled={loading} className="text-sm md:text-base">
                Очистить
              </Button>
            </div>
          </CardContent>
        </Card>

        {response && (
          <Card className="bg-blue-50/50 border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-900 text-lg md:text-xl">
                <Icon name="Lightbulb" size={20} className="md:w-6 md:h-6" />
                Результат анализа
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none">
                <div className="whitespace-pre-wrap text-sm md:text-base text-gray-900">{response}</div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="px-2">
          <h2 className="text-xl md:text-2xl font-bold mb-1 md:mb-2">AI Инструменты для специалистов</h2>
          <p className="text-sm md:text-base text-muted-foreground">
            Профессиональные инструменты на базе искусственного интеллекта
          </p>
        </div>
        <Button variant="outline" onClick={() => navigate('/dashboard')} className="shrink-0 text-sm md:text-base">
          <Icon name="ArrowLeft" size={16} className="mr-2" />
          В кабинет
        </Button>
      </div>

      <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
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
            <CardHeader className="pb-4">
              <Icon name={tool.icon as any} size={32} className="text-primary mb-2 md:w-10 md:h-10" />
              <CardTitle className="text-lg md:text-xl">{tool.title}</CardTitle>
              <CardDescription className="text-sm md:text-base">
                {tool.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <Button variant="ghost" className="w-full text-sm md:text-base">
                <Icon name="ArrowRight" size={16} className="ml-auto" />
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