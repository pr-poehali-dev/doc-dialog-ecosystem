import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const AI_TOOLS_URL = 'https://functions.poehali.dev/7c4b9e29-6778-42e7-9ac9-c30966d1765e';

interface UsageData {
  limit: number;
  dialogs_used: number;
  tools_used: number;
  total_used: number;
}

export default function SchoolMarketingAI() {
  const [activeToolId, setActiveToolId] = useState<string | null>(null);
  const [inputText, setInputText] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [usageData, setUsageData] = useState<UsageData | null>(null);
  const [showLimitModal, setShowLimitModal] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    loadUsageData();
  }, []);

  const tools = [
    {
      id: 'market-analysis',
      title: 'Анализ интересов аудитории',
      description: 'Узнайте, какие курсы и темы интересуют массажистов на платформе',
      icon: 'TrendingUp',
      color: 'from-blue-500/10 to-blue-500/5',
      placeholder: 'Опишите направление или тему курса, по которой хотите получить аналитику:\n\nНапример:\n- Миофасциальный массаж\n- Работа с беременными\n- Лимфодренажные техники',
      systemPrompt: `Ты — маркетинговый аналитик образовательной платформы для массажистов "Док диалог".
Твоя задача: на основе данных о потребностях и интересах массажистов на платформе дать школам рекомендации по курсам.

Когда школа запрашивает анализ по определённой теме, предоставь:

1. Актуальность темы
   - Насколько востребована эта тема среди массажистов
   - Текущие тренды и запросы аудитории
   - Сезонность интереса (если применимо)

2. Портрет целевой аудитории
   - Кто будет интересоваться этим курсом (опыт, специализация)
   - Уровень подготовки слушателей
   - Средний чек, который готовы платить за такие курсы

3. Конкурентный анализ
   - Есть ли похожие курсы на платформе
   - Чего не хватает в существующих предложениях
   - Как выделиться

4. Рекомендации по контенту курса
   - Какие модули и темы включить
   - Какой формат предпочтителен (онлайн/офлайн/гибрид)
   - Оптимальная длительность и структура

5. Маркетинговые рекомендации
   - Как позиционировать курс
   - Ключевые боли аудитории, которые решает курс
   - Какие УТП выделить в описании

6. Прогноз интереса
   - Ожидаемый спрос на курс
   - Рекомендуемая цена
   - Потенциальное количество студентов

Используй данные о том, что массажисты чаще всего ищут на платформе:
- Практические техники и протоколы работы
- Работу со сложными случаями (боли, ограничения)
- Специализации (спорт, беременность, лицо, лимфодренаж)
- Анатомию и физиологию
- Развитие практики и повышение чека
- Юридические и бизнес-аспекты

Отвечай на основе реальных потребностей аудитории массажистов. Будь конкретным и практичным.`
    },
    {
      id: 'course-positioning',
      title: 'Позиционирование курса',
      description: 'Помощь в создании продающего описания и УТП курса',
      icon: 'Target',
      color: 'from-purple-500/10 to-purple-500/5',
      placeholder: 'Опишите ваш курс:\n\n- Тема курса\n- Формат (онлайн/офлайн)\n- Длительность\n- Для кого предназначен\n- Что даёт курс студентам',
      systemPrompt: `Ты — копирайтер-маркетолог для образовательных продуктов в сфере массажа и телесной терапии.
Твоя задача: помочь школе создать сильное позиционирование и продающее описание курса.

Когда школа описывает свой курс, предоставь:

1. Анализ текущего позиционирования
   - Что сильно в описании
   - Что можно улучшить
   - Какие боли аудитории не раскрыты

2. Уникальное торговое предложение (УТП)
   - 3-5 вариантов УТП для курса
   - Почему этот курс лучше аналогов
   - Главное преимущество одним предложением

3. Структура продающего описания
   - Заголовок (привлекает внимание)
   - Боль аудитории (с чем приходят)
   - Решение (что даёт курс)
   - Программа (краткое содержание)
   - Результаты (что получат студенты)
   - Преподаватель (почему ему можно доверять)
   - Призыв к действию

4. Готовый текст описания
   - Напиши полное описание курса для платформы
   - Используй триггеры и эмоции
   - Пиши просто и убедительно

5. Ключевые фразы для продвижения
   - Хештеги и ключевые слова
   - Фразы для рекламы
   - Что писать в постах о курсе

6. Ценовая стратегия
   - Рекомендуемая цена курса
   - Варианты тарифов (если применимо)
   - Идеи для акций и бонусов

Целевая аудитория — массажисты и телесные терапевты, которые хотят:
- Повысить квалификацию
- Освоить новые техники
- Работать с более сложными случаями
- Увеличить доход
- Расти профессионально

Пиши убедительно, честно, без манипуляций. Фокус на реальной пользе для студентов.`
    },
    {
      id: 'student-feedback',
      title: 'Анализ запросов студентов',
      description: 'Что спрашивают и ищут массажисты — инсайты для создания курсов',
      icon: 'Users',
      color: 'from-green-500/10 to-green-500/5',
      placeholder: 'Задайте вопрос:\n\n- Какие темы сейчас интересуют массажистов?\n- Что они чаще всего ищут на платформе?\n- Какие боли и проблемы хотят решить?',
      systemPrompt: `Ты — аналитик образовательной платформы "Док диалог", который знает все запросы и потребности массажистов.
Твоя задача: делиться инсайтами о том, что ищут и чего хотят массажисты на платформе.

Предоставляй информацию по категориям:

1. Топ запросов массажистов
   - Самые популярные темы обучения
   - Какие техники хотят освоить
   - Какие специализации интересуют

2. Боли и проблемы профессионалов
   - С какими сложностями сталкиваются в работе
   - Какие случаи вызывают затруднения
   - Чего не хватает в знаниях

3. Запросы по развитию практики
   - Как привлекать клиентов
   - Как повышать средний чек
   - Как позиционировать себя
   - Юридические вопросы

4. Тренды в профессии
   - Что становится популярным
   - Новые направления массажа
   - Изменения в запросах клиентов

5. Пробелы в образовании
   - Каких курсов не хватает на рынке
   - Какие темы плохо раскрыты
   - Где есть спрос, но нет предложения

6. Рекомендации школам
   - Какие курсы точно найдут свою аудиторию
   - В каком формате лучше обучать
   - Какие дополнительные материалы ценятся

Основывай ответы на реальных данных:
- Массажисты работают с клиентами 1-1
- Часто сталкиваются со сложными случаями (боли, ограничения)
- Хотят быстро применять знания на практике
- Ценят конкретику и протоколы работы
- Заинтересованы в повышении дохода
- Нуждаются в супервизии и разборе случаев

Давай конкретные, практичные инсайты, которые помогут школам создавать востребованные курсы.`
    },
    {
      id: 'ai-dialogs',
      title: 'Маркетинговая супервизия',
      description: 'AI-диалоги для глубокой проработки маркетинговой стратегии школы',
      icon: 'MessageSquare',
      color: 'from-orange-500/10 to-orange-500/5',
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

  const loadUsageData = async () => {
    try {
      const userId = getUserId();
      if (!userId) return;

      const response = await fetch(`${AI_TOOLS_URL}?action=list_dialogs`, {
        headers: { 'X-User-Id': userId }
      });

      if (!response.ok) return;
      
      const data = await response.json();
      setUsageData({
        limit: data.limit,
        dialogs_used: data.dialogs_used,
        tools_used: data.tools_used,
        total_used: data.total_used
      });
    } catch (error) {
      console.error('Failed to load usage data:', error);
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

      if (createResponse.status === 403) {
        setShowLimitModal(true);
        return;
      }

      const data = await createResponse.json();
      setResponse(data.analysis);
      loadUsageData();
      
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
          <Button 
            variant="ghost" 
            onClick={() => setActiveToolId(null)}
            className="gap-2"
          >
            <Icon name="ArrowLeft" size={18} />
            Назад к инструментам
          </Button>
        </div>

        <Card className={`bg-gradient-to-br ${tool.color} border-none`}>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/50 rounded-lg">
                <Icon name={tool.icon as any} size={24} className="text-primary" />
              </div>
              <div>
                <CardTitle className="text-xl md:text-2xl">{tool.title}</CardTitle>
                <CardDescription className="mt-1">{tool.description}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Ваш запрос</label>
              <Textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={tool.placeholder}
                className="min-h-[200px] resize-y bg-white"
                disabled={loading}
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <Button 
                onClick={() => handleAnalyze(tool.id)} 
                disabled={loading || !inputText.trim()}
                className="gap-2 flex-1"
              >
                {loading ? (
                  <>
                    <Icon name="Loader2" size={18} className="animate-spin" />
                    Анализирую...
                  </>
                ) : (
                  <>
                    <Icon name="Sparkles" size={18} />
                    Получить анализ
                  </>
                )}
              </Button>
              <Button 
                onClick={handleClear} 
                variant="outline"
                disabled={loading}
              >
                Очистить
              </Button>
            </div>

            {response && (
              <div className="mt-6 p-4 md:p-6 bg-white rounded-lg border shadow-sm">
                <div className="flex items-start gap-3 mb-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Icon name="Sparkles" size={20} className="text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold">Результат анализа</h3>
                </div>
                <div className="space-y-4 text-gray-700">
                  {response.split('\n').map((line, index) => {
                    const trimmed = line.trim();
                    
                    // Главный заголовок (цифра с точкой в начале)
                    if (/^\d+\.\s+[А-Яа-яA-Za-z]/.test(trimmed)) {
                      return (
                        <h3 key={index} className="text-lg font-bold text-gray-900 mt-6 mb-2">
                          {trimmed}
                        </h3>
                      );
                    }
                    
                    // Подзаголовок (тире в начале с жирным текстом)
                    if (/^[-—–]\s*\*\*/.test(trimmed)) {
                      const text = trimmed.replace(/^[-—–]\s*\*\*([^*]+)\*\*:?\s*/, '$1');
                      return (
                        <h4 key={index} className="text-base font-semibold text-gray-800 mt-4 mb-1 pl-4">
                          {text}
                        </h4>
                      );
                    }
                    
                    // Списки (тире, звездочка или дефис в начале)
                    if (/^[-—–*•]\s+/.test(trimmed)) {
                      const text = trimmed.replace(/^[-—–*•]\s+/, '');
                      return (
                        <div key={index} className="flex gap-2 pl-4">
                          <span className="text-primary mt-1.5">•</span>
                          <p className="flex-1 leading-relaxed">{text}</p>
                        </div>
                      );
                    }
                    
                    // Жирный текст в строке
                    if (trimmed.includes('**')) {
                      const parts = trimmed.split(/(\*\*[^*]+\*\*)/g);
                      return (
                        <p key={index} className="leading-relaxed">
                          {parts.map((part, i) => {
                            if (part.startsWith('**') && part.endsWith('**')) {
                              return (
                                <strong key={i} className="font-semibold text-gray-900">
                                  {part.slice(2, -2)}
                                </strong>
                              );
                            }
                            return part;
                          })}
                        </p>
                      );
                    }
                    
                    // Пустые строки
                    if (!trimmed) {
                      return <div key={index} className="h-2" />;
                    }
                    
                    // Обычный текст
                    return (
                      <p key={index} className="leading-relaxed">
                        {trimmed}
                      </p>
                    );
                  })}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Маркетинговые AI-инструменты</h1>
          <p className="text-gray-600 mt-1">Анализ аудитории и создание востребованных курсов</p>
        </div>
        {usageData && (
          <Card className="w-full md:w-auto">
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {usageData.total_used} / {usageData.limit}
                </div>
                <div className="text-xs text-gray-600 mt-1">
                  Использовано запросов
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {tools.map((tool) => (
          <Card
            key={tool.id}
            className={`cursor-pointer hover:shadow-lg transition-all bg-gradient-to-br ${tool.color} border-none`}
            onClick={() => {
              if (tool.isLink && tool.linkTo) {
                navigate(tool.linkTo);
              } else {
                setActiveToolId(tool.id);
              }
            }}
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
            <strong>5 бесплатных запросов</strong> — попробуйте AI-инструменты без оплаты
          </p>
          <p>
            После использования бесплатных запросов доступ к инструментам предоставляется по подписке
          </p>
          <p>
            Все рекомендации основаны на анализе реальных потребностей массажистов на платформе Док диалог
          </p>
          <Button 
            variant="default" 
            className="mt-2"
            onClick={() => navigate('/dashboard/ai-subscription')}
          >
            Посмотреть тарифы
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
                Вы использовали все бесплатные запросы к AI-инструментам.
              </p>
              <p>
                Оформите подписку, чтобы продолжить использовать маркетинговые инструменты для анализа аудитории и создания востребованных курсов.
              </p>
              <div className="flex gap-2 pt-2">
                <Button 
                  onClick={() => {
                    setShowLimitModal(false);
                    navigate('/dashboard/ai-subscription');
                  }}
                  className="flex-1"
                >
                  Посмотреть тарифы
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