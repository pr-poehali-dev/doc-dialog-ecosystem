import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';
import { Progress } from '@/components/ui/progress';

const IMPORT_URL = 'https://functions.poehali.dev/9da994a5-6308-436a-955e-2708f96084b4';

interface ParsedSpecialist {
  id: string;
  name: string;
  url: string;
  specialization: string;
  experience: string;
  address: string;
  phones: string;
}

export default function ImportSpecialists() {
  const [excelData, setExcelData] = useState('');
  const [parsedData, setParsedData] = useState<ParsedSpecialist[]>([]);
  const [loading, setLoading] = useState(false);
  const [importResult, setImportResult] = useState<any>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const parseExcelData = () => {
    try {
      const lines = excelData.trim().split('\n');
      
      // Пропускаем заголовок
      const dataLines = lines.slice(1);
      
      const specialists: ParsedSpecialist[] = dataLines
        .filter(line => line.trim())
        .map(line => {
          // Разделяем по табуляции
          const parts = line.split('\t');
          
          return {
            id: parts[0]?.trim() || '',
            name: parts[1]?.trim() || '',
            url: parts[2]?.trim() || '',
            specialization: parts[3]?.trim() || '',
            experience: parts[4]?.trim() || '',
            address: parts[5]?.trim() || '',
            phones: parts[6]?.trim() || '',
          };
        })
        .filter(s => s.name); // Только записи с именем

      setParsedData(specialists);
      toast({
        title: 'Данные распознаны',
        description: `Найдено ${specialists.length} специалистов`,
      });
    } catch (error) {
      toast({
        title: 'Ошибка парсинга',
        description: 'Проверьте формат данных',
        variant: 'destructive',
      });
    }
  };

  const handleImport = async () => {
    if (!parsedData.length) {
      toast({
        title: 'Нет данных',
        description: 'Сначала вставьте и распознайте данные из Excel',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    setImportResult(null);

    try {
      const response = await fetch(IMPORT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          specialists: parsedData,
        }),
      });

      if (!response.ok) {
        throw new Error('Import request failed');
      }

      const result = await response.json();
      setImportResult(result);

      toast({
        title: 'Импорт завершён',
        description: `Импортировано: ${result.imported}, Пропущено: ${result.skipped}`,
      });
    } catch (error) {
      toast({
        title: 'Ошибка импорта',
        description: error instanceof Error ? error.message : 'Не удалось импортировать данные',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <Button
        variant="ghost"
        onClick={() => navigate('/admin')}
        className="mb-6 gap-2"
      >
        <Icon name="ArrowLeft" size={18} />
        Назад в админку
      </Button>

      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Импорт специалистов</h1>
          <p className="text-gray-600 mt-2">
            Массовое добавление специалистов из Excel таблицы
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="FileSpreadsheet" size={20} />
              Шаг 1: Вставьте данные из Excel
            </CardTitle>
            <CardDescription>
              Скопируйте строки из Excel (с заголовками) и вставьте в поле ниже
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              value={excelData}
              onChange={(e) => setExcelData(e.target.value)}
              placeholder="ID	Имя	Ссылка	Специализация	Опыт/Инфо	Адреса	Телефоны
749448	сальков вячеслав сергеевич	https://...	массажист		Москва...	+7 (495) ..."
              className="font-mono text-sm min-h-[200px]"
            />
            <Button onClick={parseExcelData} disabled={!excelData.trim()}>
              <Icon name="CheckCircle" size={18} className="mr-2" />
              Распознать данные
            </Button>
          </CardContent>
        </Card>

        {parsedData.length > 0 && (
          <>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Users" size={20} />
                  Шаг 2: Проверьте распознанные данные
                </CardTitle>
                <CardDescription>
                  Найдено {parsedData.length} специалистов
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-[300px] overflow-y-auto">
                  {parsedData.slice(0, 10).map((specialist, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-gray-50 rounded-lg text-sm space-y-1"
                    >
                      <div className="font-semibold">{specialist.name}</div>
                      <div className="text-gray-600">
                        {specialist.specialization}
                      </div>
                      {specialist.phones && (
                        <div className="text-gray-500 text-xs">
                          {specialist.phones.split('|')[0]}
                        </div>
                      )}
                    </div>
                  ))}
                  {parsedData.length > 10 && (
                    <div className="text-center text-gray-500 text-sm py-2">
                      ... и ещё {parsedData.length - 10} специалистов
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Upload" size={20} />
                  Шаг 3: Импортировать в базу данных
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {loading && (
                  <div className="space-y-2">
                    <Progress value={50} />
                    <p className="text-sm text-gray-600 text-center">
                      Импортируем специалистов...
                    </p>
                  </div>
                )}

                {!loading && !importResult && (
                  <Button onClick={handleImport} size="lg" className="w-full">
                    <Icon name="Database" size={18} className="mr-2" />
                    Импортировать {parsedData.length} специалистов
                  </Button>
                )}

                {importResult && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <Card className="bg-green-50 border-green-200">
                        <CardContent className="pt-6 text-center">
                          <div className="text-3xl font-bold text-green-700">
                            {importResult.imported}
                          </div>
                          <div className="text-sm text-green-600">
                            Импортировано
                          </div>
                        </CardContent>
                      </Card>
                      <Card className="bg-orange-50 border-orange-200">
                        <CardContent className="pt-6 text-center">
                          <div className="text-3xl font-bold text-orange-700">
                            {importResult.skipped}
                          </div>
                          <div className="text-sm text-orange-600">
                            Пропущено
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {importResult.errors && importResult.errors.length > 0 && (
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-sm flex items-center gap-2">
                            <Icon name="AlertCircle" size={16} />
                            Ошибки импорта
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-1 text-xs text-gray-600 max-h-[200px] overflow-y-auto">
                            {importResult.errors.map((error: string, idx: number) => (
                              <div key={idx}>{error}</div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    <div className="flex gap-2">
                      <Button
                        onClick={() => {
                          setExcelData('');
                          setParsedData([]);
                          setImportResult(null);
                        }}
                        className="flex-1"
                      >
                        Импортировать ещё
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => navigate('/admin')}
                        className="flex-1"
                      >
                        Вернуться в админку
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </>
        )}

        <Card className="bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-sm flex items-center gap-2">
              <Icon name="Info" size={16} />
              Формат данных
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm space-y-2">
            <p>
              <strong>Обязательные колонки:</strong> ID, Имя, Ссылка,
              Специализация, Опыт/Инфо, Адреса, Телефоны
            </p>
            <p>
              <strong>Как использовать:</strong> Скопируйте строки из Excel
              вместе с заголовком и вставьте в текстовое поле выше.
            </p>
            <p className="text-xs text-gray-600">
              Для каждого специалиста будет создан аккаунт с временным email
              вида: имя.фамилия@imported.prodoctorov.ru
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
