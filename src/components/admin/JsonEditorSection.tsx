import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface JsonEditorSectionProps {
  jsonData: string;
  loading: boolean;
  exampleJSON: string;
  onJsonChange: (value: string) => void;
  onImport: () => void;
  onUseExample: () => void;
}

export default function JsonEditorSection({
  jsonData,
  loading,
  exampleJSON,
  onJsonChange,
  onImport,
  onUseExample
}: JsonEditorSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>JSON данные</CardTitle>
        <CardDescription>
          Вставьте JSON с массивом вакансий или загрузите файл выше
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          value={jsonData}
          onChange={(e) => onJsonChange(e.target.value)}
          placeholder={exampleJSON}
          className="font-mono text-sm min-h-[400px]"
        />
        
        <div className="flex gap-2">
          <Button
            onClick={onImport}
            disabled={loading || !jsonData.trim()}
            className="flex-1"
          >
            {loading ? (
              <>
                <Icon name="Loader2" size={18} className="mr-2 animate-spin" />
                Импорт...
              </>
            ) : (
              <>
                <Icon name="Upload" size={18} className="mr-2" />
                Импортировать вакансии
              </>
            )}
          </Button>
          
          <Button
            variant="outline"
            onClick={onUseExample}
            disabled={loading}
          >
            <Icon name="FileText" size={18} className="mr-2" />
            Пример
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
