import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';
import { Alert, AlertDescription } from '@/components/ui/alert';
import * as XLSX from 'xlsx';

interface SalonRow {
  name: string;
  description: string;
  city: string;
  address: string;
  phone: string;
  email?: string;
  website?: string;
  logo_url?: string;
  photos?: string;
  is_verified?: boolean;
  subscription_type?: string;
}

export default function ImportSalons() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [preview, setPreview] = useState<SalonRow[]>([]);
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
      const jsonData = XLSX.utils.sheet_to_json<SalonRow>(worksheet);

      const requiredFields = ['name', 'description', 'city', 'address', 'phone'];
      const hasRequiredFields = jsonData.length > 0 && 
        requiredFields.every(field => field in jsonData[0]);

      if (!hasRequiredFields) {
        toast({
          title: 'Ошибка формата',
          description: 'Файл должен содержать обязательные столбцы: name, description, city, address, phone',
          variant: 'destructive'
        });
        setFile(null);
        return;
      }

      setPreview(jsonData.slice(0, 5));
      
      toast({
        title: 'Файл загружен',
        description: `Найдено ${jsonData.length} салонов. Проверьте предпросмотр.`
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
      const jsonData = XLSX.utils.sheet_to_json<SalonRow>(worksheet);

      const token = localStorage.getItem('token');
      const response = await fetch('https://functions.poehali.dev/import-salons-endpoint', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ salons: jsonData })
      });

      if (response.ok) {
        const result = await response.json();
        setImportResults({
          success: result.created_count || jsonData.length,
          errors: result.errors || []
        });
        
        toast({
          title: 'Импорт завершен',
          description: `Успешно добавлено ${result.created_count} салонов`
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
        name: 'Spa-Салон "Релакс"',
        description: 'Премиальный spa-салон в центре города. Предлагаем широкий спектр массажных и косметологических услуг. Работаем с 2010 года. Команда из 15 сертифицированных специалистов.',
        city: 'Москва',
        address: 'ул. Тверская, д. 12, корп. 1',
        phone: '+7 (495) 123-45-67',
        email: 'info@relax-spa.ru',
        website: 'https://relax-spa.ru',
        logo_url: 'https://example.com/logo.jpg',
        photos: 'https://example.com/photo1.jpg, https://example.com/photo2.jpg, https://example.com/photo3.jpg',
        is_verified: true,
        subscription_type: 'premium'
      },
      {
        name: 'Массажный салон "Здоровье+"',
        description: 'Специализируемся на лечебном и оздоровительном массаже. Индивидуальный подход к каждому клиенту. Опытные массажисты с медицинским образованием.',
        city: 'Санкт-Петербург',
        address: 'Невский проспект, 85',
        phone: '+7 (812) 987-65-43',
        email: 'salon@zdorove-plus.ru',
        website: '',
        logo_url: '',
        photos: 'https://example.com/salon-photo1.jpg',
        is_verified: false,
        subscription_type: 'free'
      },
      {
        name: 'Beauty & Spa Центр',
        description: 'Комплексный подход к красоте и здоровью. Массаж, косметология, SPA-программы. Современное оборудование и профессиональная косметика.',
        city: 'Казань',
        address: 'ул. Баумана, д. 30',
        phone: '+7 (843) 555-12-34',
        email: 'contact@beauty-spa.ru',
        website: 'https://beauty-spa.ru',
        logo_url: 'https://example.com/beauty-logo.png',
        photos: '',
        is_verified: true,
        subscription_type: 'standard'
      }
    ];

    const ws = XLSX.utils.json_to_sheet(template);
    
    const colWidths = [
      { wch: 30 },
      { wch: 80 },
      { wch: 20 },
      { wch: 40 },
      { wch: 20 },
      { wch: 30 },
      { wch: 30 },
      { wch: 40 },
      { wch: 100 },
      { wch: 15 },
      { wch: 20 }
    ];
    ws['!cols'] = colWidths;

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Салоны');
    XLSX.writeFile(wb, 'template_salons.xlsx');

    toast({
      title: 'Шаблон скачан',
      description: 'Заполните данные салонов и загрузите файл обратно'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" onClick={() => navigate('/admin')}>
            <Icon name="ArrowLeft" size={20} />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Импорт салонов</h1>
            <p className="text-muted-foreground">Массовая загрузка салонов из Excel-файла</p>
          </div>
        </div>

        <Alert className="mb-6 bg-purple-50 border-purple-200">
          <Icon name="Info" size={16} className="text-purple-600" />
          <AlertDescription className="text-sm">
            <strong className="text-purple-900">Обязательные столбцы:</strong> name, description, city, address, phone<br />
            <strong className="text-purple-900">Опциональные:</strong> email, website, logo_url, photos (через запятую), is_verified, subscription_type
          </AlertDescription>
        </Alert>

        <div className="space-y-6">
          <Card className="border-2 border-purple-100">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
              <CardTitle className="flex items-center gap-2">
                <Icon name="Download" size={20} className="text-purple-600" />
                Шаг 1: Скачайте шаблон
              </CardTitle>
              <CardDescription>
                В шаблоне 3 примера салонов с заполненными полями для понимания формата
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <Button onClick={downloadTemplate} variant="outline" className="w-full" size="lg">
                <Icon name="FileSpreadsheet" size={18} className="mr-2" />
                Скачать шаблон Excel с примерами
              </Button>
            </CardContent>
          </Card>

          <Card className="border-2 border-blue-100">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardTitle className="flex items-center gap-2">
                <Icon name="Upload" size={20} className="text-blue-600" />
                Шаг 2: Загрузите заполненный файл
              </CardTitle>
              <CardDescription>
                Поддерживаются форматы: .xlsx, .xls, .csv (до 10 MB)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <label className="flex flex-col items-center justify-center h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-purple-500 transition-colors bg-gradient-to-br from-gray-50 to-purple-50/30">
                <Icon name="Building" size={40} className="text-purple-400 mb-3" />
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
                    Предпросмотр (первые 5 салонов):
                  </div>
                  <div className="space-y-3">
                    {preview.map((salon, idx) => (
                      <div key={idx} className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
                        <div className="flex items-start gap-3">
                          <div className="w-12 h-12 rounded-lg bg-purple-200 flex items-center justify-center flex-shrink-0">
                            <Icon name="Building" size={24} className="text-purple-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-gray-900">{salon.name}</h3>
                            <p className="text-sm text-gray-600 mt-1 line-clamp-2">{salon.description}</p>
                            <div className="flex flex-wrap gap-3 mt-2 text-xs text-gray-500">
                              <span className="flex items-center gap-1">
                                <Icon name="MapPin" size={12} />
                                {salon.city}
                              </span>
                              <span className="flex items-center gap-1">
                                <Icon name="Phone" size={12} />
                                {salon.phone}
                              </span>
                              {salon.website && (
                                <span className="flex items-center gap-1">
                                  <Icon name="Globe" size={12} />
                                  {salon.website}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="border-2 border-green-100">
            <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
              <CardTitle className="flex items-center gap-2">
                <Icon name="Database" size={20} className="text-green-600" />
                Шаг 3: Запустите импорт
              </CardTitle>
              <CardDescription>
                Все салоны из файла будут добавлены в систему
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <Button 
                onClick={handleImport} 
                disabled={!file || isProcessing}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                size="lg"
              >
                {isProcessing ? (
                  <>
                    <Icon name="Loader2" size={18} className="mr-2 animate-spin" />
                    Импортируем салоны...
                  </>
                ) : (
                  <>
                    <Icon name="Upload" size={18} className="mr-2" />
                    Импортировать салоны
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

          <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-900">
                <Icon name="Lightbulb" size={20} />
                Подсказки по заполнению
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-purple-800">
              <div className="flex items-start gap-2">
                <Icon name="Check" size={14} className="mt-0.5 flex-shrink-0 text-purple-600" />
                <span><strong>Описание:</strong> 2-3 предложения о салоне, услугах и преимуществах</span>
              </div>
              <div className="flex items-start gap-2">
                <Icon name="Check" size={14} className="mt-0.5 flex-shrink-0 text-purple-600" />
                <span><strong>Фото:</strong> несколько ссылок через запятую (интерьер, массажные кабинеты)</span>
              </div>
              <div className="flex items-start gap-2">
                <Icon name="Check" size={14} className="mt-0.5 flex-shrink-0 text-purple-600" />
                <span><strong>is_verified:</strong> true/false (верифицированный салон получает бейдж)</span>
              </div>
              <div className="flex items-start gap-2">
                <Icon name="Check" size={14} className="mt-0.5 flex-shrink-0 text-purple-600" />
                <span><strong>subscription_type:</strong> free, standard, premium</span>
              </div>
              <div className="flex items-start gap-2">
                <Icon name="Check" size={14} className="mt-0.5 flex-shrink-0 text-purple-600" />
                <span>Для каждого салона автоматически создается аккаунт с email из поля email</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
