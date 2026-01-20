import { useCallback, useRef } from 'react';
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
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

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

  const selectAllText = useCallback(() => {
    if (textAreaRef.current) {
      textAreaRef.current.select();
    }
  }, []);

  const copyToClipboard = useCallback(() => {
    if (textAreaRef.current) {
      const textarea = textAreaRef.current;
      const selectedText = textarea.value.substring(textarea.selectionStart, textarea.selectionEnd);
      const textToCopy = selectedText || textarea.value;
      
      const tempArea = document.createElement('textarea');
      tempArea.value = textToCopy;
      tempArea.style.position = 'fixed';
      tempArea.style.opacity = '0';
      document.body.appendChild(tempArea);
      tempArea.select();
      
      const success = document.execCommand('copy');
      document.body.removeChild(tempArea);
      
      if (success) {
        toast({
          title: 'Скопировано',
          description: selectedText ? 'Выделенный текст скопирован' : 'Весь анамнез скопирован'
        });
      }
    }
  }, [toast]);

  return (
    <div className="space-y-4 py-4">
      <div className="p-3 sm:p-4 bg-blue-50 rounded-lg border border-blue-200">
        <div className="flex items-start gap-2 text-xs sm:text-sm text-blue-800">
          <Icon name="Info" size={16} className="flex-shrink-0 mt-0.5" />
          <p>
            Сервис не хранит данные запросов и диалогов. Нажмите кнопку "Выделить весь текст" и скопируйте через Ctrl+C (или Cmd+C на Mac).
          </p>
        </div>
      </div>

      <Card className="border-primary/20">
        <CardHeader className="p-3 sm:p-6">
          <CardTitle className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-base">
            <div className="flex items-center gap-2">
              <Icon name="Brain" className="text-primary flex-shrink-0" size={20} />
              <span className="truncate">Результат</span>
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <Button
                variant="outline"
                size="sm"
                onClick={selectAllText}
                className="flex-1 sm:flex-initial"
              >
                <Icon name="MousePointerClick" size={16} className="mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Выделить всё</span>
                <span className="sm:hidden">Выделить</span>
              </Button>
              <Button
                variant="default"
                size="sm"
                onClick={copyToClipboard}
                className="flex-1 sm:flex-initial"
              >
                <Icon name="Copy" size={16} className="mr-1 sm:mr-2" />
                Копировать
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-3 sm:p-6">
          <textarea
            ref={textAreaRef}
            value={anamnesisText}
            readOnly
            className="w-full h-64 sm:h-96 p-3 sm:p-4 border rounded-lg font-mono text-xs sm:text-sm resize-y focus:outline-none focus:ring-2 focus:ring-primary"
          />
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