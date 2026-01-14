import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';

interface BodyAnalysisDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onLimitReached: () => void;
  onUsageUpdate: () => void;
}

const BODY_ANALYSIS_URL = 'https://functions.poehali.dev/ffadf75f-b3b4-4629-8cb2-7c39ad1a30f2';

export default function BodyAnalysisDialog({ open, onOpenChange, onLimitReached, onUsageUpdate }: BodyAnalysisDialogProps) {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState('');
  const { toast } = useToast();

  const getUserId = () => {
    const token = localStorage.getItem('token');
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.user_id || payload.userId || payload.sub;
    } catch {
      return null;
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast({
        title: 'Ошибка',
        description: 'Пожалуйста, загрузите изображение',
        variant: 'destructive'
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setUploadedImage(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleAnalyze = async () => {
    if (!uploadedImage) {
      toast({
        title: 'Ошибка',
        description: 'Загрузите фото для анализа',
        variant: 'destructive'
      });
      return;
    }

    if (!gender || !age || !height || !weight) {
      toast({
        title: 'Ошибка',
        description: 'Заполните все поля',
        variant: 'destructive'
      });
      return;
    }

    setLoading(true);
    setResponse('');

    try {
      const userId = getUserId();
      if (!userId) {
        toast({
          title: 'Ошибка',
          description: 'Необходима авторизация',
          variant: 'destructive'
        });
        return;
      }

      const apiResponse = await fetch(BODY_ANALYSIS_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-User-Id': userId
        },
        body: JSON.stringify({
          image: uploadedImage,
          gender,
          age,
          height,
          weight
        })
      });

      const data = await apiResponse.json();

      if (apiResponse.status === 403 && data.limit_exceeded) {
        onLimitReached();
        return;
      }

      if (!apiResponse.ok) {
        throw new Error(data.error || 'Ошибка при анализе');
      }

      setResponse(data.analysis);
      onUsageUpdate();

      toast({
        title: 'Анализ завершён',
        description: 'Программа трансформации готова!'
      });
    } catch (error: any) {
      toast({
        title: 'Ошибка',
        description: error.message || 'Не удалось выполнить анализ',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setUploadedImage(null);
    setGender('');
    setAge('');
    setHeight('');
    setWeight('');
    setResponse('');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Icon name="User" size={24} className="text-purple-500" />
            Анализ фигуры и программа трансформации
          </DialogTitle>
          <DialogDescription>
            Загрузите фото в полный рост и заполните параметры для получения индивидуальной программы
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {!response ? (
            <>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="photo">Фото в полный рост *</Label>
                  <div className="mt-2">
                    {uploadedImage ? (
                      <div className="relative">
                        <img 
                          src={uploadedImage} 
                          alt="Uploaded" 
                          className="w-full max-h-64 object-contain rounded-lg border"
                        />
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => setUploadedImage(null)}
                          className="absolute top-2 right-2"
                        >
                          <Icon name="X" size={16} />
                        </Button>
                      </div>
                    ) : (
                      <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer bg-secondary/20 hover:bg-secondary/40 transition-colors">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Icon name="Upload" size={32} className="mb-3 text-muted-foreground" />
                          <p className="mb-2 text-sm text-muted-foreground">
                            <span className="font-semibold">Нажмите для загрузки</span> или перетащите файл
                          </p>
                          <p className="text-xs text-muted-foreground">PNG, JPG (макс. 10MB)</p>
                        </div>
                        <input
                          id="photo"
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={handleImageUpload}
                        />
                      </label>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Для лучшего анализа: фото в облегающей одежде, хорошее освещение, нейтральный фон
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="gender">Пол *</Label>
                    <Select value={gender} onValueChange={setGender}>
                      <SelectTrigger id="gender" className="mt-2">
                        <SelectValue placeholder="Выберите пол" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="мужской">Мужской</SelectItem>
                        <SelectItem value="женский">Женский</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="age">Возраст *</Label>
                    <Input
                      id="age"
                      type="number"
                      placeholder="30"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      className="mt-2"
                      min="16"
                      max="100"
                    />
                  </div>

                  <div>
                    <Label htmlFor="height">Рост (см) *</Label>
                    <Input
                      id="height"
                      type="number"
                      placeholder="175"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      className="mt-2"
                      min="140"
                      max="220"
                    />
                  </div>

                  <div>
                    <Label htmlFor="weight">Вес (кг) *</Label>
                    <Input
                      id="weight"
                      type="number"
                      placeholder="70"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      className="mt-2"
                      min="40"
                      max="200"
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={handleAnalyze}
                  disabled={loading || !uploadedImage || !gender || !age || !height || !weight}
                  className="flex-1"
                >
                  {loading ? (
                    <>
                      <Icon name="Loader2" size={16} className="mr-2 animate-spin" />
                      Анализирую...
                    </>
                  ) : (
                    <>
                      <Icon name="Zap" size={16} className="mr-2" />
                      Получить программу
                    </>
                  )}
                </Button>
                <Button variant="outline" onClick={() => onOpenChange(false)}>
                  Отмена
                </Button>
              </div>
            </>
          ) : (
            <>
              <div className="prose prose-sm max-w-none">
                <div className="p-4 bg-secondary/20 rounded-lg whitespace-pre-wrap">
                  {response}
                </div>
              </div>

              <div className="flex gap-3">
                <Button onClick={handleReset} className="flex-1">
                  <Icon name="RefreshCw" size={16} className="mr-2" />
                  Новый анализ
                </Button>
                <Button variant="outline" onClick={() => onOpenChange(false)}>
                  Закрыть
                </Button>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}