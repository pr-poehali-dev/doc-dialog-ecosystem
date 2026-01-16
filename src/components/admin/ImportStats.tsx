import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface ImportResult {
  success: boolean;
  inserted: number;
  updated: number;
  errors: Array<{
    index: number;
    error: string;
    vacancy_title: string;
  }>;
  total_processed: number;
}

interface ImportStatsProps {
  result: ImportResult;
}

export default function ImportStats({ result }: ImportStatsProps) {
  return (
    <Card className="border-emerald-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-emerald-600">
          <Icon name="CheckCircle" size={24} />
          Результаты импорта
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{result.inserted}</div>
              <div className="text-sm text-gray-600">Добавлено</div>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{result.updated}</div>
              <div className="text-sm text-gray-600">Обновлено</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-gray-600">{result.total_processed}</div>
              <div className="text-sm text-gray-600">Всего обработано</div>
            </div>
          </div>

          {result.errors && result.errors.length > 0 && (
            <div className="mt-4">
              <h4 className="font-semibold text-red-600 mb-2 flex items-center gap-2">
                <Icon name="AlertCircle" size={18} />
                Ошибки ({result.errors.length})
              </h4>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {result.errors.map((err, idx) => (
                  <div key={idx} className="bg-red-50 p-3 rounded border border-red-200">
                    <div className="font-medium text-sm">
                      Строка {err.index}: {err.vacancy_title || 'Без названия'}
                    </div>
                    <div className="text-sm text-red-600">{err.error}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
