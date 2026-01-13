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
import BuyExtraRequestsDialog from '@/components/tools/BuyExtraRequestsDialog';

const USER_TOOLS_URL = 'https://functions.poehali.dev/41dbcf47-a8d5-45ff-bb56-f9754581a0d7';

interface UsageData {
  limit: number;
  dialogs_used: number;
  tools_used: number;
  total_used: number;
  extra_requests?: number;
}

interface Tool {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  placeholder?: string;
  isMedicalTool?: boolean;
  systemPrompt?: string;
  isLink?: boolean;
  linkTo?: string;
}

export default function Tools() {
  const [activeToolId, setActiveToolId] = useState<string | null>(null);
  const [inputText, setInputText] = useState('');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [usageData, setUsageData] = useState<UsageData | null>(null);
  const [showLimitModal, setShowLimitModal] = useState(false);
  const [showBuyDialog, setShowBuyDialog] = useState(false);
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

  const tools: Tool[] = [
    {
      id: 'medical-analysis',
      title: 'Расшифровка заключений',
      description: 'Анализ медицинских заключений: МРТ, рентген, УЗИ простым языком',
      icon: 'FileSearch',
      color: 'from-blue-500/10 to-blue-500/5',
      placeholder: 'Вставьте текст заключения или загрузите фото...',
      isMedicalTool: true,
      systemPrompt: `Ты — медицинский консультант. Твоя задача: расшифровать медицинское заключение простым языком.

Проанализируй заключение и дай:
1. Объяснение простым языком — что означают медицинские термины
2. К какому врачу идти (терапевт, невролог, ортопед и т.д.)
3. Нужен ли массаж (да/нет/с осторожностью)
4. Можно ли остеопатию и мануальную терапию (да/нет/с ограничениями)
5. Насколько это серьёзно и срочно (1-10 баллов)
6. Что делать дальше (рекомендации)

Отвечай структурированно, понятно, без паники. НЕ используй жирный текст (звёздочки **), пиши обычным текстом.`
    },
    {
      id: 'pain-analysis',
      title: 'Анализ боли',
      description: 'Узнайте причину боли и получите рекомендации',
      icon: 'Activity',
      color: 'from-red-500/10 to-red-500/5',
      placeholder: 'Опишите боль: где болит, как давно, характер боли (острая/тупая), когда усиливается...',
      systemPrompt: `Ты — консультант по здоровью. Помоги понять причину боли и что делать.

Когда пользователь описывает боль, дай:
1. Возможные причины боли (3-5 вариантов от наиболее вероятного)
2. К какому врачу обратиться в первую очередь
3. Что можно сделать сейчас (первая помощь, облегчение)
4. Поможет ли массаж (да/нет/какой именно)
5. Нужна ли остеопатия или мануальная терапия
6. Красные флаги — когда срочно к врачу
7. Домашние рекомендации (упражнения, позы, что избегать)

Отвечай понятно, структурированно, с заботой о безопасности. НЕ используй жирный текст (звёздочки **), пиши обычным текстом.`
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

      const response = await fetch(`${USER_TOOLS_URL}?action=usage`, {
        headers: { 'X-User-Id': userId }
      });

      if (!response.ok) return;
      
      const data = await response.json();
      setUsageData({
        limit: data.limit,
        dialogs_used: data.dialogs_used,
        tools_used: data.tools_used,
        total_used: data.total_used,
        extra_requests: data.extra_requests || 0
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

      const apiResponse = await fetch(USER_TOOLS_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-User-Id': userId
        },
        body: JSON.stringify(requestBody)
      });

      const data = await apiResponse.json();

      if (apiResponse.status === 429 && data.limit_reached) {
        setShowLimitModal(true);
        return;
      }

      if (!apiResponse.ok) {
        throw new Error(data.error || 'Ошибка анализа');
      }

      const cleanResponse = (data.response || data.analysis || '')
        .replace(/\*\*/g, '')
        .trim();
      
      setResponse(cleanResponse);
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

  const handleBuyExtraRequests = async (count: number) => {
    try {
      const userId = getUserId();
      if (!userId) {
        toast({ title: 'Ошибка', description: 'Необходима авторизация', variant: 'destructive' });
        return;
      }

      const amount = count * 25;
      
      const response = await fetch(USER_TOOLS_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-User-Id': userId
        },
        body: JSON.stringify({
          action: 'buy_extra_requests',
          count: count,
          amount: amount
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Ошибка создания платежа');
      }

      if (data.payment_url) {
        window.location.href = data.payment_url;
      }
    } catch (error: any) {
      toast({
        title: 'Ошибка',
        description: error.message || 'Не удалось создать платёж',
        variant: 'destructive'
      });
    }
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
                onBuyExtraClick={() => setShowBuyDialog(true)}
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
          isMedicalTool={activeTool.isMedicalTool || false}
        />
      )}

      <ToolLimitModal
        open={showLimitModal}
        onOpenChange={setShowLimitModal}
        onUpgradeClick={handleUpgradeClick}
      />

      <BuyExtraRequestsDialog
        open={showBuyDialog}
        onOpenChange={setShowBuyDialog}
        onBuyRequests={handleBuyExtraRequests}
      />
    </div>
  );
}