import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';
import ToolCard from '@/components/tools/ToolCard';
import ToolDialog from '@/components/tools/ToolDialog';
import ToolUsageStats from '@/components/tools/ToolUsageStats';
import ToolLimitModal from '@/components/tools/ToolLimitModal';

const AI_TOOLS_URL = 'https://functions.poehali.dev/7c4b9e29-6778-42e7-9ac9-c30966d1765e';

interface UsageData {
  limit: number;
  dialogs_used: number;
  tools_used: number;
  total_used: number;
}

export default function Tools() {
  const [activeToolId, setActiveToolId] = useState<string | null>(null);
  const [inputText, setInputText] = useState('');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [usageData, setUsageData] = useState<UsageData | null>(null);
  const [showLimitModal, setShowLimitModal] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const getDashboardRoute = () => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      if (user.role === 'salon') return '/salon/cabinet';
      if (user.role === 'school') return '/school/dashboard';
    }
    return '/dashboard';
  };

  useEffect(() => {
    loadUsageData();
  }, []);

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

1. Объясни простым языком, что означают медицинские термины в заключении
2. Можно ли делать массаж при данном состоянии (да/нет/с ограничениями)
3. Какие массажные техники безопасны, а какие противопоказаны
4. Можно ли применять остеопатические техники и какие именно
5. К какому врачу направить клиента (если нужна консультация специалиста)
6. Важные предостережения и меры предосторожности

Отвечай структурированно, профессионально, с акцентом на безопасность клиента.

ВАЖНО: НЕ упоминай Instagram и Facebook. Вместо них используй "социальные сети", "ВКонтакте", "Telegram".`
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

1. Возможные причины данных симптомов (физиологические, постуральные, психосоматические)
2. На что обратить внимание при осмотре и работе с клиентом
3. Какие зоны тела проверить (триггерные точки, напряжения, дисбалансы)
4. Рекомендуемые техники массажа для данного случая
5. Домашние рекомендации клиенту (упражнения, растяжки, самомассаж)
6. Противопоказания и ограничения в работе
7. Когда необходима консультация врача (red flags)

Отвечай профессионально, структурированно, с заботой о безопасности клиента.

ВАЖНО: НЕ упоминай Instagram и Facebook. Вместо них используй "социальные сети", "ВКонтакте", "Telegram".`
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

1. Диагностика и анализ
   - Оценка состояния клиента
   - Зоны повышенного внимания
   - Возможные причины проблемы

2. План сеансов (поэтапно, сеанс за сеансом)
   - Цель каждого сеанса
   - Техники и методы работы
   - Зоны воздействия
   - Длительность сеанса
   - Особенности работы

3. Прогрессия нагрузки
   - Как увеличивать интенсивность
   - Когда переходить к глубоким техникам
   - Контрольные точки прогресса

4. Домашние задания клиенту
   - Упражнения между сеансами
   - Самомассаж
   - Рекомендации по образу жизни

5. Критерии успеха
   - Как оценить эффективность программы
   - Что должно измениться

6. Рекомендации по продолжению
   - Поддерживающие сеансы
   - Профилактика

Отвечай профессионально, с конкретными техниками и понятной структурой программы.

ВАЖНО: НЕ упоминай Instagram и Facebook. Вместо них используй "социальные сети", "ВКонтакте", "Telegram".`
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

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast({
        title: 'Ошибка',
        description: 'Пожалуйста, загрузите изображение',
        variant: 'destructive'
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setUploadedImage(event.target?.result as string);
    };
    reader.readAsDataURL(file);
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
    if (!inputText.trim() && !uploadedImage) {
      toast({ title: 'Ошибка', description: 'Введите текст или загрузите изображение для анализа', variant: 'destructive' });
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

      const requestBody: any = {
        action: 'analyze_tool',
        tool_type: toolId,
        text: inputText,
        system_prompt: tool.systemPrompt
      };

      if (uploadedImage) {
        requestBody.image = uploadedImage;
      }

      const apiResponse = await fetch(AI_TOOLS_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-User-Id': userId
        },
        body: JSON.stringify(requestBody)
      });

      const data = await apiResponse.json();

      if (apiResponse.status === 403 && data.error === 'Limit exceeded') {
        setShowLimitModal(true);
        return;
      }

      if (!apiResponse.ok) {
        throw new Error(data.error || 'Ошибка анализа');
      }

      setResponse(data.analysis);
      await loadUsageData();
      
      toast({
        title: 'Анализ завершён',
        description: 'AI-инструмент обработал ваш запрос'
      });
    } catch (error: any) {
      toast({
        title: 'Ошибка',
        description: error.message || 'Не удалось выполнить анализ',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleToolClick = (toolId: string) => {
    const tool = tools.find(t => t.id === toolId);
    if (!tool) return;

    if (tool.isLink && tool.linkTo) {
      navigate(tool.linkTo);
      return;
    }

    setActiveToolId(toolId);
    setInputText('');
    setUploadedImage(null);
    setResponse('');
  };

  const handleCloseDialog = () => {
    setActiveToolId(null);
    setInputText('');
    setUploadedImage(null);
    setResponse('');
  };

  const handleUpgradeClick = () => {
    navigate('/dashboard/subscriptions');
  };

  const activeTool = tools.find(t => t.id === activeToolId);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <Button variant="ghost" onClick={() => navigate(getDashboardRoute())}>
              <Icon name="ArrowLeft" size={20} />
            </Button>
            <div>
              <h1 className="text-3xl font-bold">AI-инструменты</h1>
              <p className="text-muted-foreground">
                Профессиональные инструменты для анализа и планирования работы с клиентами
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2 grid md:grid-cols-2 gap-4">
              {tools.map((tool) => (
                <ToolCard
                  key={tool.id}
                  id={tool.id}
                  title={tool.title}
                  description={tool.description}
                  icon={tool.icon}
                  color={tool.color}
                  isLink={tool.isLink}
                  onClick={handleToolClick}
                />
              ))}
            </div>

            <div>
              <ToolUsageStats 
                usageData={usageData}
                onUpgradeClick={handleUpgradeClick}
              />
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-primary/10">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center flex-shrink-0">
                <Icon name="Lightbulb" size={24} className="text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">Как использовать инструменты?</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                    <span>Выберите нужный инструмент из списка выше</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                    <span>Опишите ситуацию или вставьте медицинское заключение</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                    <span>Получите профессиональные рекомендации от AI</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                    <span>Используйте полученные знания в работе с клиентами</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {activeTool && !activeTool.isLink && (
        <ToolDialog
          open={activeToolId !== null}
          onOpenChange={(open) => !open && handleCloseDialog()}
          toolTitle={activeTool.title}
          toolDescription={activeTool.description}
          placeholder={activeTool.placeholder || ''}
          inputText={inputText}
          setInputText={setInputText}
          uploadedImage={uploadedImage}
          setUploadedImage={setUploadedImage}
          response={response}
          loading={loading}
          onAnalyze={() => handleAnalyze(activeToolId!)}
          onImageUpload={handleImageUpload}
          isMedicalTool={activeToolId === 'medical-analysis'}
        />
      )}

      <ToolLimitModal
        open={showLimitModal}
        onOpenChange={setShowLimitModal}
        onUpgradeClick={handleUpgradeClick}
      />
    </div>
  );
}
