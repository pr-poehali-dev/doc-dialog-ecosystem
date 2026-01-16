import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import * as XLSX from 'xlsx';

const IMPORT_URL = 'https://functions.poehali.dev/118c8db6-1484-4b84-8398-e7f4eb8ab9ee';

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

export default function ImportVacancies() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [jsonData, setJsonData] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ImportResult | null>(null);
  const [csvParsing, setCsvParsing] = useState(false);

  const handleImport = async () => {
    if (!jsonData.trim()) {
      toast({
        title: 'Ошибка',
        description: 'Введите JSON данные для импорта',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const data = JSON.parse(jsonData);
      
      if (!data.vacancies || !Array.isArray(data.vacancies)) {
        throw new Error('JSON должен содержать массив "vacancies"');
      }

      const response = await fetch(IMPORT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (response.ok) {
        setResult(responseData);
        toast({
          title: 'Импорт завершён',
          description: `Добавлено: ${responseData.inserted}, Обновлено: ${responseData.updated}`,
        });
      } else {
        throw new Error(responseData.error || 'Ошибка импорта');
      }
    } catch (error: any) {
      toast({
        title: 'Ошибка импорта',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const parseCSVLine = (line: string): string[] => {
    const result: string[] = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      const nextChar = line[i + 1];

      if (char === '"' && inQuotes && nextChar === '"') {
        current += '"';
        i++;
      } else if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === '\t' && !inQuotes) {
        result.push(current);
        current = '';
      } else {
        current += char;
      }
    }
    result.push(current);
    return result;
  };

  const handleCSVUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setCsvParsing(true);

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        const lines = text.split('\n').filter(line => line.trim());
        
        if (lines.length < 2) {
          throw new Error('CSV файл пустой или содержит только заголовки');
        }

        const headers = parseCSVLine(lines[0]);
        const vacancies = [];

        for (let i = 1; i < lines.length; i++) {
          const values = parseCSVLine(lines[i]);
          const vacancy: any = {};

          headers.forEach((header, index) => {
            const value = values[index]?.trim() || '';
            
            if (header === 'compensationFrom' || header === 'compensationTo') {
              vacancy[header] = value ? parseInt(value) : null;
            } else if (header === 'gross' || header === 'online' || header === 'companyApproved' || 
                       header === 'itAccreditation' || header === 'withoutResume' || 
                       header === 'employer-it-accreditation') {
              vacancy[header] = value.toLowerCase() === 'true' || value === '1';
            } else if (header === 'employer-hh-rating') {
              vacancy[header] = value ? parseFloat(value) : null;
            } else {
              vacancy[header] = value;
            }
          });

          if (vacancy['Название'] && vacancy['companyName']) {
            vacancies.push(vacancy);
          }
        }

        const jsonOutput = JSON.stringify({ vacancies }, null, 2);
        setJsonData(jsonOutput);

        toast({
          title: 'CSV обработан',
          description: `Распознано ${vacancies.length} вакансий`,
        });
      } catch (error: any) {
        toast({
          title: 'Ошибка парсинга CSV',
          description: error.message,
          variant: 'destructive',
        });
      } finally {
        setCsvParsing(false);
      }
    };
    reader.readAsText(file, 'UTF-8');
  };

  const handleXLSXUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setCsvParsing(true);

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = event.target?.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { 
          raw: false,
          defval: ''
        });

        if (jsonData.length === 0) {
          throw new Error('Excel файл пустой');
        }

        const vacancies = jsonData.map((row: any) => {
          const vacancy: any = {};

          Object.keys(row).forEach((key) => {
            const value = row[key]?.toString().trim() || '';
            
            if (key === 'compensationFrom' || key === 'compensationTo') {
              vacancy[key] = value ? parseInt(value.replace(/\D/g, '')) : null;
            } else if (key === 'gross' || key === 'online' || key === 'companyApproved' || 
                       key === 'itAccreditation' || key === 'withoutResume' || 
                       key === 'employer-it-accreditation') {
              vacancy[key] = value.toLowerCase() === 'true' || value === '1' || value.toLowerCase() === 'да';
            } else if (key === 'employer-hh-rating') {
              vacancy[key] = value ? parseFloat(value.replace(',', '.')) : null;
            } else {
              vacancy[key] = value;
            }
          });

          return vacancy;
        }).filter((v: any) => v['Название'] && v['companyName']);

        const jsonOutput = JSON.stringify({ vacancies }, null, 2);
        setJsonData(jsonOutput);

        toast({
          title: 'Excel обработан',
          description: `Распознано ${vacancies.length} вакансий`,
        });
      } catch (error: any) {
        toast({
          title: 'Ошибка парсинга Excel',
          description: error.message,
          variant: 'destructive',
        });
      } finally {
        setCsvParsing(false);
      }
    };
    reader.readAsBinaryString(file);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      setJsonData(text);
    };
    reader.readAsText(file);
  };

  const exampleJSON = `{
  "vacancies": [
    {
      "Название": "Frontend Developer",
      "compensationFrom": 150000,
      "compensationTo": 250000,
      "gross": false,
      "companyName": "Tech Corp",
      "city": "Москва",
      "online": true,
      "vacancyLink": "https://hh.ru/vacancy/12345",
      "companyLink": "https://hh.ru/employer/6789",
      "companyApproved": true,
      "itAccreditation": true,
      "withoutResume": false,
      "companyLogo": "https://example.com/logo.png",
      "Станция метро0": "Маяковская",
      "Станция метро1": "Тверская",
      "workExperience": "От 1 до 3 лет",
      "График работы": "Полный день",
      "compensationFrequency": "monthly",
      "employer-hh-rating": 4.5,
      "employer-it-accreditation": true,
      "hrbrand": "Tech Corp HR"
    }
  ]
}`;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6 flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => navigate('/admin')}
            >
              <Icon name="ArrowLeft" size={18} className="mr-2" />
              Назад в админку
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate('/vacancies-import')}
            >
              <Icon name="Eye" size={18} className="mr-2" />
              Посмотреть вакансии
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Icon name="Briefcase" size={28} />
                Импорт вакансий
              </CardTitle>
              <CardDescription>
                Загрузите вакансии в формате JSON для добавления в базу данных
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="xlsx-upload" className="flex items-center gap-2">
                    <Icon name="FileSpreadsheet" size={18} className="text-green-600" />
                    Загрузить Excel (XLSX)
                  </Label>
                  <Input
                    id="xlsx-upload"
                    type="file"
                    accept=".xlsx,.xls"
                    onChange={handleXLSXUpload}
                    disabled={csvParsing}
                  />
                  <p className="text-sm text-muted-foreground">
                    {csvParsing ? 'Обрабатываю Excel...' : 'Excel файлы (.xlsx, .xls)'}
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="csv-upload" className="flex items-center gap-2">
                    <Icon name="FileText" size={18} className="text-emerald-600" />
                    Загрузить CSV/TSV
                  </Label>
                  <Input
                    id="csv-upload"
                    type="file"
                    accept=".csv,.tsv,.txt"
                    onChange={handleCSVUpload}
                    disabled={csvParsing}
                  />
                  <p className="text-sm text-muted-foreground">
                    {csvParsing ? 'Обрабатываю...' : 'Текстовые файлы CSV/TSV'}
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="file-upload" className="flex items-center gap-2">
                    <Icon name="FileJson" size={18} className="text-blue-600" />
                    Загрузить JSON
                  </Label>
                  <Input
                    id="file-upload"
                    type="file"
                    accept=".json"
                    onChange={handleFileUpload}
                  />
                  <p className="text-sm text-muted-foreground">
                    JSON с готовыми данными
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="json-data">JSON данные</Label>
                <Textarea
                  id="json-data"
                  value={jsonData}
                  onChange={(e) => setJsonData(e.target.value)}
                  placeholder={exampleJSON}
                  className="font-mono text-sm h-96"
                />
                <p className="text-sm text-muted-foreground">
                  Вставьте JSON с массивом вакансий или загрузите файл выше
                </p>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={handleImport}
                  disabled={loading || !jsonData.trim()}
                  className="flex-1"
                  size="lg"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Импортирую...
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
                  onClick={() => setJsonData(exampleJSON)}
                  disabled={loading}
                >
                  <Icon name="FileCode" size={18} className="mr-2" />
                  Пример
                </Button>
              </div>

              {result && (
                <Card className="border-emerald-200 bg-emerald-50">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Icon name="CheckCircle" size={20} className="text-emerald-600" />
                      Результат импорта
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white rounded-lg p-4">
                        <p className="text-sm text-muted-foreground mb-1">Добавлено</p>
                        <p className="text-2xl font-bold text-emerald-600">{result.inserted}</p>
                      </div>
                      <div className="bg-white rounded-lg p-4">
                        <p className="text-sm text-muted-foreground mb-1">Обновлено</p>
                        <p className="text-2xl font-bold text-blue-600">{result.updated}</p>
                      </div>
                    </div>

                    <div className="bg-white rounded-lg p-4">
                      <p className="text-sm text-muted-foreground mb-1">Всего обработано</p>
                      <p className="text-lg font-semibold">{result.total_processed}</p>
                    </div>

                    {result.errors && result.errors.length > 0 && (
                      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                        <p className="font-semibold text-red-900 mb-2 flex items-center gap-2">
                          <Icon name="AlertCircle" size={18} />
                          Ошибки ({result.errors.length})
                        </p>
                        <div className="space-y-2 text-sm">
                          {result.errors.map((error, idx) => (
                            <div key={idx} className="bg-white rounded p-2">
                              <p className="font-medium text-gray-900">{error.vacancy_title}</p>
                              <p className="text-red-600">{error.error}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="bg-blue-50 border-blue-200">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Icon name="Info" size={20} className="text-blue-600" />
                      Формат данных
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <p className="font-semibold">Обязательные поля:</p>
                      <ul className="list-disc list-inside space-y-1 ml-4">
                        <li><code className="bg-white px-2 py-0.5 rounded">Название</code> — название вакансии</li>
                        <li><code className="bg-white px-2 py-0.5 rounded">companyName</code> — название компании</li>
                      </ul>

                      <p className="font-semibold mt-4">Опциональные поля:</p>
                      <ul className="list-disc list-inside space-y-1 ml-4 text-xs">
                        <li>compensationFrom, compensationTo, gross, city, online</li>
                        <li>vacancyLink, companyLink, companyLogo</li>
                        <li>companyApproved, itAccreditation, withoutResume</li>
                        <li>Станция метро0-3, workExperience, График работы</li>
                        <li>compensationFrequency, employer-hh-rating, hrbrand</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-emerald-50 border-emerald-200">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Icon name="FileSpreadsheet" size={20} className="text-emerald-600" />
                      Импорт из HH.ru
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 text-sm">
                      <p className="font-semibold">Как экспортировать с HH.ru:</p>
                      <ol className="list-decimal list-inside space-y-1 ml-2">
                        <li>Откройте поиск вакансий на hh.ru</li>
                        <li>Настройте нужные фильтры</li>
                        <li>Используйте расширение для экспорта</li>
                        <li>Сохраните как Excel (.xlsx) или CSV</li>
                        <li>Загрузите файл в форму выше</li>
                      </ol>
                      <p className="text-xs font-semibold text-emerald-700 mt-3">
                        Поддерживаемые форматы:
                      </p>
                      <ul className="text-xs space-y-1 ml-4">
                        <li>✓ Excel (.xlsx, .xls) — рекомендуется</li>
                        <li>✓ CSV с любым разделителем</li>
                        <li>✓ TSV (табуляция)</li>
                        <li>✓ Автоматическая кодировка UTF-8</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}