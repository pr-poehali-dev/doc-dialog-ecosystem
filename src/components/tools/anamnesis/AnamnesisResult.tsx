import { useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import { AnamnesisFormData } from '../AnamnesisTool';

interface AnamnesisResultProps {
  formData: AnamnesisFormData;
  response: string;
  onReset: () => void;
  onClose: () => void;
}

export default function AnamnesisResult({ formData, response, onReset, onClose }: AnamnesisResultProps) {
  const { toast } = useToast();

  const copyAnamnesisToClipboard = useCallback(() => {
    const anamnesisText = `АНАМНЕЗ КЛИЕНТА

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

---

AI-АНАЛИЗ:

${response}`;
    
    const textArea = document.createElement('textarea');
    textArea.value = anamnesisText;
    textArea.style.position = 'absolute';
    textArea.style.left = '-9999px';
    textArea.style.top = '0';
    textArea.setAttribute('readonly', '');
    
    document.body.appendChild(textArea);
    
    if (navigator.userAgent.match(/ipad|iphone/i)) {
      const range = document.createRange();
      range.selectNodeContents(textArea);
      const selection = window.getSelection();
      if (selection) {
        selection.removeAllRanges();
        selection.addRange(range);
      }
      textArea.setSelectionRange(0, anamnesisText.length);
    } else {
      textArea.select();
    }
    
    try {
      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      
      if (successful) {
        toast({
          title: 'Скопировано',
          description: 'Анамнез и анализ скопированы в буфер обмена'
        });
      } else {
        toast({
          title: 'Ошибка',
          description: 'Не удалось скопировать',
          variant: 'destructive'
        });
      }
    } catch (err) {
      document.body.removeChild(textArea);
      toast({
        title: 'Ошибка',
        description: 'Не удалось скопировать',
        variant: 'destructive'
      });
    }
  }, [formData, response, toast]);

  return (
    <div className="space-y-4 py-4">
      <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
        <div className="flex items-start gap-2 text-sm text-blue-800">
          <Icon name="Info" size={16} className="flex-shrink-0 mt-0.5" />
          <p>
            Сервис не хранит данные запросов и диалогов. Вы можете скопировать их и сохранить в любое удобное место.
          </p>
        </div>
      </div>

      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-base">
            <div className="flex items-center gap-2">
              <Icon name="Brain" className="text-primary flex-shrink-0" size={20} />
              <span className="truncate">AI-анализ анамнеза</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={copyAnamnesisToClipboard}
            >
              <Icon name="Copy" size={16} className="mr-2" />
              Копировать диалог
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose prose-sm max-w-none whitespace-pre-wrap break-words overflow-wrap-anywhere text-sm">
            {response}
          </div>
        </CardContent>
      </Card>
      
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Button variant="outline" onClick={onReset} className="sm:w-auto">
          <Icon name="Plus" size={16} className="mr-2" />
          Новый анамнез
        </Button>
        <Button variant="outline" onClick={onClose} className="sm:w-auto">
          Закрыть
        </Button>
      </div>
    </div>
  );
}