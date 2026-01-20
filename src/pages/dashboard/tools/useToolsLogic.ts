import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { AnamnesisFormData } from '@/components/tools/AnamnesisTool';
import { USER_TOOLS_URL, UsageData, tools } from './toolsConfig';

export function useToolsLogic() {
  const [activeToolId, setActiveToolId] = useState<string | null>(null);
  const [inputText, setInputText] = useState('');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [usageData, setUsageData] = useState<UsageData | null>(null);
  const [showLimitModal, setShowLimitModal] = useState(false);
  const [showBuyDialog, setShowBuyDialog] = useState(false);
  const [showAnamnesisTool, setShowAnamnesisTool] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const getUserRole = () => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      return user.role;
    }
    return null;
  };

  const getDashboardRoute = () => {
    return '/dashboard';
  };

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

  useEffect(() => {
    loadUsageData();
  }, []);

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

      if (apiResponse.status === 403 && data.error) {
        toast({
          title: 'Недостаточно средств',
          description: `${data.error}. Пополните баланс на странице тарифов.`,
          variant: 'destructive'
        });
        return;
      }

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

    if (toolId === 'anamnesis') {
      setShowAnamnesisTool(true);
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

  const handleBuyExtraRequests = async (count: number) => {
    try {
      const userId = getUserId();
      if (!userId) {
        toast({ title: 'Ошибка', description: 'Необходима авторизация', variant: 'destructive' });
        return;
      }

      setLoading(true);
      
      const response = await fetch(USER_TOOLS_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-User-Id': userId
        },
        body: JSON.stringify({
          action: 'buy_extra_requests',
          count: count
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Ошибка создания платежа');
      }

      if (data.payment_url && data.payment_id) {
        // Сохраняем payment_id для проверки после возврата
        localStorage.setItem('pending_payment_id', data.payment_id);
        localStorage.setItem('pending_payment_type', 'extra_requests');
        window.location.href = data.payment_url;
      } else {
        throw new Error('Не получена ссылка для оплаты');
      }
    } catch (error: any) {
      toast({
        title: 'Ошибка',
        description: error.message || 'Не удалось создать платёж',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAnamnesisAnalyze = async (formData: AnamnesisFormData) => {
    setLoading(true);
    setResponse('');

    try {
      const userId = getUserId();
      if (!userId) {
        toast({ title: 'Ошибка', description: 'Необходима авторизация', variant: 'destructive' });
        return;
      }

      const anamnesisText = `
АНАМНЕЗ КЛИЕНТА

Общая информация:
- ФИО: ${formData.fullName}
- Возраст: ${formData.age} лет
- Пол: ${formData.gender === 'male' ? 'Мужской' : formData.gender === 'female' ? 'Женский' : 'Не указан'}

Жалобы и симптомы:
- Основная жалоба: ${formData.mainComplaint}
- Длительность: ${formData.complaintDuration || 'Не указана'}
- Локализация: ${formData.painLocation || 'Не указана'}
- Интенсивность боли: ${formData.painIntensity || 'Не указана'}/10
- Характер боли: ${formData.painCharacter || 'Не указан'}

Медицинская история:
- Хронические заболевания: ${formData.chronicDiseases || 'Нет'}
- Принимаемые препараты: ${formData.medications || 'Нет'}
- Травмы: ${formData.injuries || 'Нет'}
- Операции: ${formData.surgeries || 'Нет'}

Образ жизни:
- Профессия: ${formData.lifestyle || 'Не указана'}
- Физическая активность: ${formData.physicalActivity || 'Не указана'}
- Качество сна: ${formData.sleep || 'Не указано'}
- Уровень стресса: ${formData.stress || 'Не указан'}

Цели и ограничения:
- Цели клиента: ${formData.goals || 'Не указаны'}
- Противопоказания: ${formData.contraindications || 'Нет'}
- Дополнительная информация: ${formData.additionalInfo || 'Нет'}
      `;

      const systemPrompt = `Ты — опытный специалист по физической терапии и массажу. Твоя задача: проанализировать анамнез клиента и дать профессиональные рекомендации.

Проанализируй анамнез и дай:
1. Общая оценка состояния клиента
2. Ключевые факторы риска и противопоказания
3. Возможные причины жалоб на основе анамнеза
4. Рекомендуемые виды массажа и мануальных техник
5. Противопоказанные техники и манипуляции
6. Рекомендации по работе с клиентом (интенсивность, частота, длительность сеансов)
7. Дополнительные рекомендации (упражнения, образ жизни, консультации врачей)
8. Прогноз и ожидаемые результаты

Отвечай структурированно, профессионально, с учётом безопасности клиента. НЕ используй жирный текст (звёздочки **), пиши обычным текстом.`;

      const apiResponse = await fetch(USER_TOOLS_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-User-Id': userId
        },
        body: JSON.stringify({
          action: 'analyze_tool',
          tool_type: 'anamnesis',
          text: anamnesisText,
          system_prompt: systemPrompt
        })
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
        description: 'AI проанализировал анамнез клиента'
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

  return {
    activeToolId,
    inputText,
    setInputText,
    uploadedImage,
    setUploadedImage,
    response,
    loading,
    usageData,
    showLimitModal,
    setShowLimitModal,
    showBuyDialog,
    setShowBuyDialog,
    showAnamnesisTool,
    setShowAnamnesisTool,
    getDashboardRoute,
    getUserRole,
    handleImageUpload,
    handleAnalyze,
    handleToolClick,
    handleCloseDialog,
    handleBuyExtraRequests,
    handleAnamnesisAnalyze,
    navigate
  };
}