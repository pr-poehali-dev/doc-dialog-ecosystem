import { useRef, useCallback, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface MarketingToolViewProps {
  tool: {
    id: string;
    title: string;
    description: string;
    icon: string;
    color: string;
    placeholder: string;
  };
  inputText: string;
  response: string;
  loading: boolean;
  onInputChange: (value: string) => void;
  onAnalyze: () => void;
  onClear: () => void;
  onBack: () => void;
}

export default function MarketingToolView({
  tool,
  inputText,
  response,
  loading,
  onInputChange,
  onAnalyze,
  onClear,
  onBack
}: MarketingToolViewProps) {
  const copyTextAreaRef = useRef<HTMLTextAreaElement>(null);
  const { toast } = useToast();

  const resultText = useMemo(() => `Запрос:\n${inputText}\n\nРезультат:\n${response}`, [inputText, response]);

  const selectAllText = useCallback(() => {
    if (copyTextAreaRef.current) {
      copyTextAreaRef.current.select();
    }
  }, []);

  const copyToClipboard = useCallback(() => {
    if (copyTextAreaRef.current) {
      const textarea = copyTextAreaRef.current;
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
          description: selectedText ? 'Выделенный текст скопирован' : 'Весь текст скопирован'
        });
      }
    }
  }, [toast]);

  const formatResponse = (text: string) => {
    return text.split('\n').map((line, index) => {
      const trimmed = line.trim();
      
      if (/^#{1,3}\s+/.test(trimmed)) {
        const text = trimmed.replace(/^#{1,3}\s+/, '');
        return (
          <h2 key={index} className="text-xl font-bold text-gray-900 mt-8 mb-3 pb-2 border-b border-gray-200">
            {text}
          </h2>
        );
      }
      
      if (/^\d+\.\s+\*\*/.test(trimmed)) {
        const text = trimmed.replace(/^\d+\.\s+\*\*([^*]+)\*\*:?\s*(.*)/, (_, title, rest) => {
          return `${title}${rest ? ': ' + rest : ''}`;
        });
        return (
          <h3 key={index} className="text-lg font-bold text-gray-900 mt-6 mb-2">
            {text}
          </h3>
        );
      }
      
      if (/^\d+\.\s+[А-Яа-яA-Za-z]/.test(trimmed)) {
        return (
          <h3 key={index} className="text-lg font-bold text-gray-900 mt-6 mb-2">
            {trimmed}
          </h3>
        );
      }
      
      if (/^[-—–]\s*\*\*/.test(trimmed)) {
        const cleanText = trimmed
          .replace(/^[-—–]\s*/, '')
          .replace(/\*\*([^*]+)\*\*/g, '$1');
        return (
          <h4 key={index} className="text-base font-semibold text-gray-800 mt-4 mb-2">
            {cleanText}
          </h4>
        );
      }
      
      if (/^[-—–*•]\s+/.test(trimmed)) {
        const cleanText = trimmed
          .replace(/^[-—–*•]\s+/, '')
          .replace(/\*\*([^*]+)\*\*/g, '$1');
        return (
          <div key={index} className="flex gap-3 my-2">
            <span className="text-primary mt-1 flex-shrink-0">•</span>
            <p className="flex-1 leading-relaxed text-gray-700">{cleanText}</p>
          </div>
        );
      }
      
      if (trimmed.includes('**')) {
        const parts = trimmed.split(/(\*\*[^*]+\*\*)/g);
        return (
          <p key={index} className="leading-relaxed text-gray-700 my-2">
            {parts.map((part, i) => {
              if (part.startsWith('**') && part.endsWith('**')) {
                return (
                  <span key={i} className="font-semibold text-gray-900">
                    {part.slice(2, -2)}
                  </span>
                );
              }
              return part;
            })}
          </p>
        );
      }
      
      if (!trimmed) {
        return <div key={index} className="h-3" />;
      }
      
      return (
        <p key={index} className="leading-relaxed text-gray-700 my-2">
          {trimmed}
        </p>
      );
    });
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row items-start gap-3 md:gap-4">
        <Button 
          variant="ghost" 
          onClick={onBack}
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
              onChange={(e) => onInputChange(e.target.value)}
              placeholder={tool.placeholder}
              className="min-h-[200px] resize-y bg-white"
              disabled={loading}
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <Button 
              onClick={onAnalyze} 
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
              onClick={onClear} 
              variant="outline"
              disabled={loading}
            >
              Очистить
            </Button>
          </div>

          {response && (
            <>
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-start gap-2 text-sm text-blue-800">
                  <Icon name="Info" size={16} className="flex-shrink-0 mt-0.5" />
                  <p>
                    Сервис не хранит данные запросов и диалогов. Нажмите кнопку "Скопировать" чтобы сохранить результат.
                  </p>
                </div>
              </div>

              <div className="mt-6 p-6 md:p-8 bg-white rounded-lg border shadow-sm">
                <div className="flex items-start justify-between gap-3 mb-6 pb-4 border-b-2 border-gray-200">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Icon name="FileText" size={24} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">Результат анализа</h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {new Date().toLocaleDateString('ru-RU', { 
                          day: 'numeric', 
                          month: 'long', 
                          year: 'numeric' 
                        })}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="default"
                    size="sm"
                    onClick={copyToClipboard}
                    className="flex-shrink-0"
                  >
                    <Icon name="Copy" size={16} className="mr-2" />
                    Копировать
                  </Button>
                </div>
                <div className="space-y-4 text-[15px] leading-relaxed">
                  {formatResponse(response)}
                </div>
              </div>
              
              <textarea
                ref={copyTextAreaRef}
                value={resultText}
                readOnly
                className="sr-only"
                aria-hidden="true"
              />
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}