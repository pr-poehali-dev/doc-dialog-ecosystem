import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

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
              <div className="space-y-2">
                <Label htmlFor="file-upload">Загрузить из файла</Label>
                <Input
                  id="file-upload"
                  type="file"
                  accept=".json"
                  onChange={handleFileUpload}
                />
                <p className="text-sm text-muted-foreground">
                  Поддерживаются JSON файлы с массивом вакансий
                </p>
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
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
