import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';

interface FileUploadSectionProps {
  csvParsing: boolean;
  onCSVUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onXLSXUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function FileUploadSection({
  csvParsing,
  onCSVUpload,
  onXLSXUpload,
  onFileUpload
}: FileUploadSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Загрузка файлов</CardTitle>
        <CardDescription>
          Загрузите CSV, Excel или JSON файл с вакансиями
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="csv-upload" className="flex items-center gap-2 mb-2">
            <Icon name="FileSpreadsheet" size={18} />
            CSV файл (табуляция)
          </Label>
          <Input
            id="csv-upload"
            type="file"
            accept=".csv,.txt"
            onChange={onCSVUpload}
            disabled={csvParsing}
          />
          <p className="text-xs text-gray-500 mt-1">
            Файл должен быть с разделителями табуляции (TSV)
          </p>
        </div>

        <div>
          <Label htmlFor="xlsx-upload" className="flex items-center gap-2 mb-2">
            <Icon name="FileSpreadsheet" size={18} />
            Excel файл (.xlsx)
          </Label>
          <Input
            id="xlsx-upload"
            type="file"
            accept=".xlsx,.xls"
            onChange={onXLSXUpload}
            disabled={csvParsing}
          />
          <p className="text-xs text-gray-500 mt-1">
            Первая строка должна содержать заголовки столбцов
          </p>
        </div>

        <div>
          <Label htmlFor="json-upload" className="flex items-center gap-2 mb-2">
            <Icon name="FileJson" size={18} />
            JSON файл
          </Label>
          <Input
            id="json-upload"
            type="file"
            accept=".json"
            onChange={onFileUpload}
          />
        </div>
      </CardContent>
    </Card>
  );
}
