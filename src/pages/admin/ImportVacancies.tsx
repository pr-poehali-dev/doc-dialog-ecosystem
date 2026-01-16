import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import * as XLSX from 'xlsx';
import ImportStats from '@/components/admin/ImportStats';
import FileUploadSection from '@/components/admin/FileUploadSection';
import JsonEditorSection from '@/components/admin/JsonEditorSection';

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
      "metroStation0": "Проспект Мира",
      "metroStation1": "Комсомольская",
      "workExperience": "От 1 до 3 лет",
      "workSchedule": "Полный день",
      "compensationFrequency": "monthly",
      "employer-hh-rating": 4.5,
      "employer-it-accreditation": true,
      "hrbrand": "Работодатель мечты"
    }
  ]
}`;

  const handleUseExample = () => {
    setJsonData(exampleJSON);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
                <Icon name="Database" size={32} />
                Импорт вакансий
              </h1>
              <p className="text-gray-600">
                Массовая загрузка вакансий из CSV, Excel или JSON файлов
              </p>
            </div>
            <Button variant="outline" onClick={() => navigate('/admin')}>
              <Icon name="ArrowLeft" size={18} className="mr-2" />
              Назад
            </Button>
          </div>

          <div className="space-y-6">
            {result && <ImportStats result={result} />}

            <FileUploadSection
              csvParsing={csvParsing}
              onCSVUpload={handleCSVUpload}
              onXLSXUpload={handleXLSXUpload}
              onFileUpload={handleFileUpload}
            />

            <JsonEditorSection
              jsonData={jsonData}
              loading={loading}
              exampleJSON={exampleJSON}
              onJsonChange={setJsonData}
              onImport={handleImport}
              onUseExample={handleUseExample}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
