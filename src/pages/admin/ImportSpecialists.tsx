import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';
import { Alert, AlertDescription } from '@/components/ui/alert';
import * as XLSX from 'xlsx';

interface SpecialistRow {
  name: string;
  specialization: string;
  experience: string;
  description: string;
  photo_url?: string;
  location?: string;
  phone?: string;
  email?: string;
  price?: string;
  schedule?: string;
  rating?: number;
  reviews_count?: number;
}

export default function ImportSpecialists() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [preview, setPreview] = useState<SpecialistRow[]>([]);
  const [importResults, setImportResults] = useState<{ success: number; errors: string[] } | null>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    const validTypes = [
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-excel',
      'text/csv'
    ];

    if (!validTypes.includes(selectedFile.type)) {
      toast({
        title: 'Неверный формат файла',
        description: 'Загрузите файл Excel (.xlsx, .xls) или CSV',
        variant: 'destructive'
      });
      return;
    }

    setFile(selectedFile);
    
    try {
      const data = await selectedFile.arrayBuffer();
      const workbook = XLSX.read(data);
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json<SpecialistRow>(worksheet);

      const requiredFields = ['name', 'specialization', 'experience', 'description'];
      const hasRequiredFields = jsonData.length > 0 && 
        requiredFields.every(field => field in jsonData[0]);

      if (!hasRequiredFields) {
        toast({
          title: 'Ошибка формата',
          description: 'Файл должен содержать обязательные столбцы: name, specialization, experience, description',
          variant: 'destructive'
        });
        setFile(null);
        return;
      }

      setPreview(jsonData.slice(0, 5));
      
      toast({
        title: 'Файл загружен',
        description: `Найдено ${jsonData.length} записей. Проверьте предпросмотр.`
      });
    } catch (error) {
      toast({
        title: 'Ошибка чтения файла',
        description: 'Не удалось прочитать файл. Проверьте формат.',
        variant: 'destructive'
      });
      setFile(null);
    }
  };

  const handleImport = async () => {
    if (!file) return;

    setIsProcessing(true);
    setImportResults(null);

    try {
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data);
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json<SpecialistRow>(worksheet);

      const token = localStorage.getItem('token');
      const response = await fetch('https://functions.poehali.dev/9da994a5-6308-436a-955e-2708f96084b4', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ specialists: jsonData })
      });

      if (response.ok) {
        const result = await response.json();
        setImportResults({
          success: result.imported || 0,
          errors: result.errors || []
        });
        
        toast({
          title: 'Импорт завершен',
          description: `Успешно добавлено ${result.imported} специалистов. Пропущено: ${result.skipped || 0}`
        });
      } else {
        throw new Error('Failed to import');
      }
    } catch (error) {
      toast({
        title: 'Ошибка импорта',
        description: 'Не удалось импортировать данные. Проверьте подключение к интернету.',
        variant: 'destructive'
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadTemplate = () => {
    const template = [
      {
        name: 'Анна Соколова',
        specialization: 'Массажист',
        experience: '5 лет',
        description: 'Профессиональный массажист с опытом работы 5 лет. Специализируюсь на классическом и расслабляющем массаже.',
        photo_url: 'https://example.com/photo.jpg',
        location: 'Москва',
        phone: '+7 900 123-45-67',
        email: 'anna@example.com',
        price: '3000 ₽/час',
        schedule: 'Пн-Пт 10:00-18:00',
        rating: 4.8,
        reviews_count: 25
      },
      {
        name: 'Дмитрий Иванов',
        specialization: 'Психолог',
        experience: '8 лет',
        description: 'Клинический психолог. Работаю с тревожными расстройствами и депрессией.',
        photo_url: '',
        location: 'Санкт-Петербург',
        phone: '+7 900 987-65-43',
        email: 'dmitry@example.com',
        price: '4500 ₽/сеанс',
        schedule: 'Вт-Сб 12:00-20:00',
        rating: 4.9,
        reviews_count: 42
      }
    ];

    const ws = XLSX.utils.json_to_sheet(template);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Специалисты');
    XLSX.writeFile(wb, 'template_specialists.xlsx');

    toast({
      title: 'Шаблон скачан',
      description: 'Заполните шаблон и загрузите обратно'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate('/admin')}>
              <Icon name="ArrowLeft" size={20} />
            </Button>
            <div>
              <h1 className="text-3xl font-bold">Импорт специалистов</h1>
              <p className="text-muted-foreground">Массовая загрузка из Excel-файла</p>
            </div>
          </div>
          <Button variant="outline" onClick={() => navigate('/admin/imported-specialists')}>
            <Icon name="Users" size={18} className="mr-2" />
            Просмотр импортированных
          </Button>
        </div>

        <Alert className="mb-6 bg-blue-50 border-blue-200">
          <Icon name="Info" size={16} className="text-blue-600" />
          <AlertDescription className="text-sm">
            <strong className="text-blue-900">Обязательные столбцы:</strong> name, specialization, experience, description<br />
            <strong className="text-blue-900">Опциональные:</strong> photo_url, location, phone, email, price, schedule, rating, reviews_count
          </AlertDescription>
        </Alert>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Download" size={20} className="text-green-600" />
                Шаг 1: Скачайте шаблон
              </CardTitle>
              <CardDescription>
                Используйте готовый шаблон с примерами данных и всеми необходимыми столбцами
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={downloadTemplate} variant="outline" className="w-full" size="lg">
                <Icon name="FileSpreadsheet" size={18} className="mr-2" />
                Скачать шаблон Excel
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Upload" size={20} className="text-blue-600" />
                Шаг 2: Загрузите заполненный файл
              </CardTitle>
              <CardDescription>
                Поддерживаются форматы: .xlsx, .xls, .csv (до 10 MB)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <label className="flex flex-col items-center justify-center h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition-colors bg-gray-50/50">
                <Icon name="Upload" size={40} className="text-gray-400 mb-3" />
                <span className="text-sm font-medium text-gray-700">
                  {file ? file.name : 'Нажмите для выбора файла'}
                </span>
                <span className="text-xs text-gray-400 mt-1">
                  Excel (.xlsx, .xls) или CSV
                </span>
                <input
                  type="file"
                  accept=".xlsx,.xls,.csv"
                  className="hidden"
                  onChange={handleFileSelect}
                />
              </label>

              {file && preview.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <Icon name="Eye" size={16} />
                    Предпросмотр (первые 5 записей):
                  </div>
                  <div className="overflow-x-auto border rounded-lg">
                    <table className="w-full text-xs">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="p-2 text-left font-semibold">Имя</th>
                          <th className="p-2 text-left font-semibold">Специализация</th>
                          <th className="p-2 text-left font-semibold">Опыт</th>
                          <th className="p-2 text-left font-semibold">Описание</th>
                          <th className="p-2 text-left font-semibold">Локация</th>
                        </tr>
                      </thead>
                      <tbody>
                        {preview.map((row, idx) => (
                          <tr key={idx} className="border-t">
                            <td className="p-2">{row.name}</td>
                            <td className="p-2">{row.specialization}</td>
                            <td className="p-2">{row.experience}</td>
                            <td className="p-2 max-w-xs truncate">{row.description}</td>
                            <td className="p-2">{row.location || '-'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Database" size={20} className="text-purple-600" />
                Шаг 3: Запустите импорт
              </CardTitle>
              <CardDescription>
                Все записи из файла будут добавлены в систему как специалисты
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button 
                onClick={handleImport} 
                disabled={!file || isProcessing}
                className="w-full"
                size="lg"
              >
                {isProcessing ? (
                  <>
                    <Icon name="Loader2" size={18} className="mr-2 animate-spin" />
                    Импортируем специалистов...
                  </>
                ) : (
                  <>
                    <Icon name="Upload" size={18} className="mr-2" />
                    Импортировать специалистов
                  </>
                )}
              </Button>

              {importResults && (
                <Alert className={importResults.errors.length > 0 ? 'border-amber-500 bg-amber-50' : 'border-green-500 bg-green-50'}>
                  <Icon name={importResults.errors.length > 0 ? 'AlertCircle' : 'CheckCircle'} size={16} className={importResults.errors.length > 0 ? 'text-amber-600' : 'text-green-600'} />
                  <AlertDescription>
                    <div className="font-semibold mb-2">Импорт завершен:</div>
                    <div className="space-y-1 text-sm">
                      <div className="flex items-center gap-2">
                        <Icon name="CheckCircle" size={14} className="text-green-600" />
                        <span>Успешно добавлено: <strong>{importResults.success}</strong></span>
                      </div>
                      {importResults.errors.length > 0 && (
                        <>
                          <div className="flex items-center gap-2">
                            <Icon name="AlertTriangle" size={14} className="text-amber-600" />
                            <span>Ошибок: <strong>{importResults.errors.length}</strong></span>
                          </div>
                          <div className="mt-3 max-h-40 overflow-y-auto bg-white rounded p-2 text-xs space-y-1">
                            {importResults.errors.map((err, idx) => (
                              <div key={idx} className="text-amber-800">• {err}</div>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-900">
                <Icon name="Lightbulb" size={20} />
                Подсказки
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-blue-800">
              <div className="flex items-start gap-2">
                <Icon name="Check" size={14} className="mt-0.5 flex-shrink-0" />
                <span>Обязательные поля: имя, специализация, опыт, описание</span>
              </div>
              <div className="flex items-start gap-2">
                <Icon name="Check" size={14} className="mt-0.5 flex-shrink-0" />
                <span>Опыт работы можно указать числом (лет) или текстом</span>
              </div>
              <div className="flex items-start gap-2">
                <Icon name="Check" size={14} className="mt-0.5 flex-shrink-0" />
                <span>Рейтинг указывается числом от 0 до 5 (например: 4.8)</span>
              </div>
              <div className="flex items-start gap-2">
                <Icon name="Check" size={14} className="mt-0.5 flex-shrink-0" />
                <span>Все пустые опциональные поля будут заполнены значениями по умолчанию</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}