import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

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
  const formatResponse = (text: string) => {
    return text.split('\n').map((line, index) => {
      const trimmed = line.trim();
      
      if (/^\d+\.\s+[А-Яа-яA-Za-z]/.test(trimmed)) {
        return (
          <h3 key={index} className="text-lg font-bold text-gray-900 mt-6 mb-2">
            {trimmed}
          </h3>
        );
      }
      
      if (/^[-—–]\s*\*\*/.test(trimmed)) {
        const text = trimmed.replace(/^[-—–]\s*\*\*([^*]+)\*\*:?\s*/, '$1');
        return (
          <h4 key={index} className="text-base font-semibold text-gray-800 mt-4 mb-1 pl-4">
            {text}
          </h4>
        );
      }
      
      if (/^[-—–*•]\s+/.test(trimmed)) {
        const text = trimmed.replace(/^[-—–*•]\s+/, '');
        return (
          <div key={index} className="flex gap-2 pl-4">
            <span className="text-primary mt-1.5">•</span>
            <p className="flex-1 leading-relaxed">{text}</p>
          </div>
        );
      }
      
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
      
      if (!trimmed) {
        return <div key={index} className="h-2" />;
      }
      
      return (
        <p key={index} className="leading-relaxed">
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
            <div className="mt-6 p-4 md:p-6 bg-white rounded-lg border shadow-sm">
              <div className="flex items-start gap-3 mb-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Icon name="Sparkles" size={20} className="text-primary" />
                </div>
                <h3 className="text-lg font-semibold">Результат анализа</h3>
              </div>
              <div className="space-y-4 text-gray-700">
                {formatResponse(response)}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
